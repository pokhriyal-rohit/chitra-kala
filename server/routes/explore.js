const express = require("express");
const Drawing = require("../models/Drawing");

const router = express.Router();

router.get("/trending-hashtags", async (req, res) => {
  try {
    // Basic aggregation: unwind hashtags, group and count
    const hashtags = await Drawing.aggregate([
      { $unwind: "$hashtags" },
      { $group: { _id: { $toLower: "$hashtags" }, count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 12 },
    ]);

    // Map to frontend shape
    const colors = [
      "from-pink-500 to-rose-500",
      "from-purple-500 to-pink-500",
      "from-indigo-500 to-purple-500",
      "from-blue-500 to-cyan-500",
      "from-cyan-500 to-teal-500",
      "from-emerald-500 to-teal-500",
      "from-amber-500 to-orange-500",
      "from-green-500 to-emerald-500",
      "from-gray-500 to-slate-500",
      "from-red-500 to-rose-500",
    ];

    const result = hashtags.map((h, i) => ({
      tag: h._id,
      count: h.count * 100, // inflate for visual effect
      color: colors[i % colors.length],
    }));

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/categories", async (req, res) => {
  try {
    const categoryCounts = await Drawing.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    const emojiMap = {
      Anime: "🎴",
      Manga: "🗻",
      Fantasy: "🐉",
      "Concept Art": "🛡️",
      Portrait: "🖌️",
      Watercolor: "💧",
      Nature: "🌲",
      Landscape: "🏞️",
      "Sci-Fi": "🔮",
      Cyberpunk: "🌌",
      Abstract: "🎨",
      Architecture: "🏛️",
      Kawaii: "✨",
      Chibi: "🐾",
    };

    const result = categoryCounts.map((c) => ({
      id: c._id.toLowerCase(),
      label: c._id,
      count: c.count * 200, // inflate for nicer bars
      emoji: emojiMap[c._id] || "✨",
    }));

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
