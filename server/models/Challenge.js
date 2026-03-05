const mongoose = require("mongoose");

const challengeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    theme: { type: String, required: true },
    category: { type: String, required: true },
    challenger: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    challengee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    challengerDrawing: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Drawing",
      default: null,
    },
    challengeeDrawing: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Drawing",
      default: null,
    },
    status: {
      type: String,
      enum: ["open", "active", "voting", "completed"],
      default: "open",
    },
    votes: {
      challenger: { type: Number, default: 0 },
      challengee: { type: Number, default: 0 },
    },
    voterIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    prize: { type: String, default: "" },
    coverImage: { type: String, default: "" },
    endsAt: { type: Date, required: true },
    participants: { type: Number, default: 1 },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Challenge", challengeSchema);
