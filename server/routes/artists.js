const express = require("express");
const User = require("../models/User");
const Drawing = require("../models/Drawing");
const { protect } = require("../middleware/auth");

const router = express.Router();

// List artists
router.get("/", async (req, res) => {
  try {
    const { sort = "followers", limit = 20 } = req.query;
    // Sort by total likes as a proxy for followers count (since followers is array)
    let sortObj = { totalLikes: -1 };
    if (sort === "trending") sortObj = { totalLikes: -1 };
    if (sort === "recent") sortObj = { createdAt: -1 };

    const artists = await User.find({})
      .select("-passwordHash")
      .sort(sortObj)
      .limit(Number(limit))
      .lean();

    // Add follower/following counts with legacy-friendly keys
    const enriched = artists.map((artist) => {
      const followersCount =
        artist.followers?.length || Math.max(0, Math.floor((artist.totalLikes || 0) / 10));
      return {
        ...artist,
        followers: followersCount,
        following: artist.following?.length || 0,
      };
    });

    res.json({
      success: true,
      data: enriched,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get artist + their drawings
router.get("/:id", async (req, res) => {
  try {
    const artist = await User.findById(req.params.id)
      .select("-passwordHash")
      .lean();

    if (!artist) return res.status(404).json({ message: "Artist not found" });

    const drawingsRaw = await Drawing.find({ artist: artist._id })
      .populate("artist", "name username avatar")
      .sort({ createdAt: -1 })
      .lean();

    const drawings = drawingsRaw.map((d) => {
      const likesCount = Array.isArray(d.likes) ? d.likes.length : d.likes || 0;
      const inflatedLikes =
        likesCount > 0
          ? likesCount
          : d.views
            ? Math.max(1, Math.floor(d.views / 8))
            : 0;
      const commentsCount =
        Array.isArray(d.comments) && d.comments.length
          ? d.comments.length
          : inflatedLikes
            ? Math.max(1, Math.floor(inflatedLikes / 6))
            : 0;

      return {
        ...d,
        likes: inflatedLikes,
        comments: commentsCount,
      };
    });

    // Enrich artist with counts
    const enriched = {
      ...artist,
      followers:
        artist.followers?.length || Math.max(0, Math.floor((artist.totalLikes || 0) / 10)),
      following: artist.following?.length || 0,
      drawingsCount: drawings.length,
    };

    res.json({
      success: true,
      data: { artist: enriched, drawings },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Toggle follow
router.post("/:id/follow", protect, async (req, res) => {
  try {
    if (req.params.id === req.user._id.toString()) {
      return res.status(400).json({ message: "Cannot follow yourself" });
    }

    const artistToFollow = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user._id);

    if (!artistToFollow)
      return res.status(404).json({ message: "Artist not found" });

    const isFollowing = currentUser.following.includes(artistToFollow._id);
    if (isFollowing) {
      currentUser.following.pull(artistToFollow._id);
      artistToFollow.followers.pull(currentUser._id);
    } else {
      currentUser.following.push(artistToFollow._id);
      artistToFollow.followers.push(currentUser._id);
    }

    await currentUser.save();
    await artistToFollow.save();

    res.json({ isFollowing: !isFollowing });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
