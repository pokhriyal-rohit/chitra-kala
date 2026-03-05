const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    drawing: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Drawing",
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: { type: String, required: true, trim: true, maxlength: 1000 },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Comment", commentSchema);
