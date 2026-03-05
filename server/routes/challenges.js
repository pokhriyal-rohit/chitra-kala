const express = require("express");
const Challenge = require("../models/Challenge");
const Drawing = require("../models/Drawing");
const { protect } = require("../middleware/auth");
const upload = require("../middleware/upload");

const router = express.Router();

// Get list of challenges
router.get("/", async (req, res) => {
  try {
    const { status, limit = 20, sort = "endsAt" } = req.query;
    let query = {};
    if (status && status !== "all") query.status = status;

    const sortObj = sort === "endsAt" ? { endsAt: 1 } : { createdAt: -1 };

    const challenges = await Challenge.find(query)
      .populate("challenger", "name username avatar badge")
      .populate("challengee", "name username avatar badge")
      .populate("challengerDrawing", "title image views likes")
      .populate("challengeeDrawing", "title image views likes")
      .sort(sortObj)
      .limit(Number(limit))
      .lean();

    const enriched = challenges.map((ch) => ({
      ...ch,
      votesTotal: (ch.votes?.challenger || 0) + (ch.votes?.challengee || 0),
    }));

    res.json({
      success: true,
      data: enriched,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single challenge
router.get("/:id", async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id)
      .populate("challenger", "name username avatar")
      .populate("challengee", "name username avatar")
      .populate({
        path: "challengerDrawing",
        populate: { path: "artist", select: "username" },
      })
      .populate({
        path: "challengeeDrawing",
        populate: { path: "artist", select: "username" },
      });

    if (!challenge)
      return res.status(404).json({ message: "Challenge not found" });
    res.json(challenge);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create challenge
router.post("/", protect, upload.single("coverImage"), async (req, res) => {
  try {
    const { title, description, theme, category, endsAt, prize } = req.body;
    const coverImage = req.file ? `/uploads/${req.file.filename}` : "";

    const challenge = await Challenge.create({
      title,
      description,
      theme,
      category,
      endsAt,
      prize,
      coverImage,
      challenger: req.user._id,
      status: "open",
      participants: 1,
    });

    res.status(201).json(challenge);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Accept challenge
router.post("/:id/accept", protect, async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id);
    if (!challenge || challenge.status !== "open") {
      return res.status(400).json({ message: "Challenge not open" });
    }
    if (challenge.challenger.equals(req.user._id)) {
      return res
        .status(400)
        .json({ message: "Cannot accept your own challenge" });
    }

    challenge.challengee = req.user._id;
    challenge.status = "active";
    challenge.participants = 2;
    await challenge.save();

    res.json(challenge);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Submit drawing to challenge
router.post("/:id/submit", protect, async (req, res) => {
  try {
    const { drawingId } = req.body;
    const challenge = await Challenge.findById(req.params.id);

    if (!challenge)
      return res.status(404).json({ message: "Challenge not found" });
    if (challenge.status !== "active")
      return res.status(400).json({ message: "Challenge not active" });

    if (challenge.challenger.equals(req.user._id)) {
      challenge.challengerDrawing = drawingId;
    } else if (challenge.challengee.equals(req.user._id)) {
      challenge.challengeeDrawing = drawingId;
    } else {
      return res.status(403).json({ message: "Not a participant" });
    }

    // if both submitted, move to voting
    if (challenge.challengerDrawing && challenge.challengeeDrawing) {
      challenge.status = "voting";
    }

    await challenge.save();

    // Link drawing to challenge
    await Drawing.findByIdAndUpdate(drawingId, { challengeId: challenge._id });

    res.json(challenge);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Vote
router.post("/:id/vote", protect, async (req, res) => {
  try {
    const { side } = req.body; // 'challenger' or 'challengee'
    if (side !== "challenger" && side !== "challengee") {
      return res.status(400).json({ message: "Invalid side" });
    }

    const challenge = await Challenge.findById(req.params.id);
    if (!challenge)
      return res.status(404).json({ message: "Challenge not found" });
    if (challenge.status !== "voting")
      return res.status(400).json({ message: "Not in voting phase" });

    // Ensure they haven't voted already
    if (challenge.voterIds.includes(req.user._id)) {
      return res.status(400).json({ message: "Already voted" });
    }

    challenge.votes[side] += 1;
    challenge.voterIds.push(req.user._id);

    // Automatically complete challenge if it ends (could also be chron job)
    const now = new Date();
    if (challenge.endsAt < now) {
      challenge.status = "completed";
      // Determine winner, give badges, etc.
    }

    await challenge.save();
    res.json({ success: true, votes: challenge.votes });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
