const mongoose = require("mongoose");

const drawingSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    image: { type: String, required: true }, // filename or URL
    description: { type: String, default: "" },
    artist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: { type: String, required: true },
    hashtags: [{ type: String }],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    views: { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: false },
    isHallOfFame: { type: Boolean, default: false },
    challengeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Challenge",
      default: null,
    },
  },
  { timestamps: true },
);

// Virtual for likes count
drawingSchema.virtual("likesCount").get(function () {
  return this.likes.length;
});

// Virtual for comments count (resolved from Comment collection)
drawingSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Drawing", drawingSchema);
