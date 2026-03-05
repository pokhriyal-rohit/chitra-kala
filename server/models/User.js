const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true },
    avatar: { type: String, default: "" },
    bio: { type: String, default: "" },
    categories: [{ type: String }],
    badge: {
      type: String,
      enum: ["legend", "rising", "champion", null],
      default: null,
    },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    totalLikes: { type: Number, default: 0 },
    totalDrawings: { type: Number, default: 0 },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
