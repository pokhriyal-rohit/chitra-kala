const express = require("express");
const Drawing = require("../models/Drawing");
const Comment = require("../models/Comment");
const User = require("../models/User");
const upload = require("../middleware/upload");
const { protect } = require("../middleware/auth");

const router = express.Router();

// Get list of drawings with filters
router.get("/", async (req, res) => {
  try {
    const { category, tag, sort, limit = 20, page = 1 } = req.query;
    let query = {};
    if (category && category !== "all")
      query.category = new RegExp(`^${category}$`, "i");
    if (tag) query.hashtags = new RegExp(`^${tag}$`, "i");

    let sortObj = { createdAt: -1 };
    if (sort === "popular") sortObj = { views: -1 };
    if (sort === "hof") {
      query.isHallOfFame = true;
      sortObj = { likes: -1 };
    }

    const skip = (Number(page) - 1) * Number(limit);
    const total = await Drawing.countDocuments(query);

    // Fetch lean objects for quick mapping
    const drawingsRaw = await Drawing.find(query)
      .populate("artist", "name username avatar badge")
      .sort(sortObj)
      .limit(Number(limit))
      .skip(skip)
      .lean();

    // Precompute comment counts
    const commentCountsAgg = await Comment.aggregate([
      { $group: { _id: "$drawing", count: { $sum: 1 } } },
    ]);
    const commentCounts = Object.fromEntries(
      commentCountsAgg.map((c) => [c._id.toString(), c.count]),
    );

    const drawings = drawingsRaw.map((d) => {
      const likesCount = Array.isArray(d.likes) ? d.likes.length : d.likes || 0;
      const inflatedLikes =
        likesCount > 0
          ? likesCount
          : d.views
            ? Math.max(1, Math.floor(d.views / 8))
            : 0;
      const commentsCount =
        commentCounts[d._id.toString()] ||
        (inflatedLikes ? Math.max(1, Math.floor(inflatedLikes / 6)) : 0);

      return {
        ...d,
        likes: inflatedLikes,
        comments: commentsCount,
      };
    });

    res.json({
      success: true,
      data: drawings,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single drawing
router.get("/:id", async (req, res) => {
  try {
    const drawing = await Drawing.findById(req.params.id)
      .populate(
        "artist",
        "name username avatar badge bio categories followers totalLikes totalDrawings",
      )
      .lean();

    if (!drawing) return res.status(404).json({ message: "Drawing not found" });

    // Get comments separately
    const comments = await Comment.find({ drawing: drawing._id })
      .populate("author", "name username avatar")
      .sort({ createdAt: -1 });

    // Add derived fields
    const likedIds = Array.isArray(drawing.likes) ? drawing.likes : [];
    const likesCount = likedIds.length || drawing.likes || 0;
    const inflatedLikes =
      likesCount > 0
        ? likesCount
        : drawing.views
          ? Math.max(1, Math.floor(drawing.views / 8))
          : 0;

    drawing.likes = inflatedLikes;
    drawing.commentsCount =
      comments.length || (inflatedLikes ? Math.max(1, Math.floor(inflatedLikes / 6)) : 0);
    drawing.isLiked = req.user ? likedIds.some((id) => id.equals(req.user._id)) : false;

    res.json({
      success: true,
      data: { drawing, comments },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Upload drawing
router.post("/", protect, upload.single("image"), async (req, res) => {
  try {
    const { title, description, category, hashtags } = req.body;
    if (!req.file)
      return res.status(400).json({ message: "No image uploaded" });

    const tagArray = hashtags ? hashtags.split(",").map((t) => t.trim()) : [];

    const drawing = await Drawing.create({
      title,
      description,
      category,
      hashtags: tagArray,
      image: `/uploads/${req.file.filename}`,
      artist: req.user._id,
    });

    await User.findByIdAndUpdate(req.user._id, { $inc: { totalDrawings: 1 } });

    res.status(201).json(drawing);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Like / unlike drawing
router.post("/:id/like", protect, async (req, res) => {
  try {
    const drawing = await Drawing.findById(req.params.id);
    if (!drawing) return res.status(404).json({ message: "Drawing not found" });

    const isLiked = drawing.likes.some((id) => id.equals(req.user._id));
    if (isLiked) {
      drawing.likes.pull(req.user._id);
      await User.findByIdAndUpdate(drawing.artist, {
        $inc: { totalLikes: -1 },
      });
    } else {
      drawing.likes.push(req.user._id);
      await User.findByIdAndUpdate(drawing.artist, { $inc: { totalLikes: 1 } });
    }
    await drawing.save();

    res.json({
      success: true,
      data: {
        isLiked: !isLiked,
        likesCount: drawing.likes.length,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Post comment
router.post("/:id/comments", protect, async (req, res) => {
  try {
    const { text } = req.body;
    if (!text?.trim())
      return res.status(400).json({ message: "Comment text required" });

    const comment = await Comment.create({
      drawing: req.params.id,
      author: req.user._id,
      text,
    });

    await comment.populate("author", "name username avatar");
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Increment views
router.post("/:id/view", async (req, res) => {
  try {
    await Drawing.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } });
    res.status(200).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
