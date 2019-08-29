const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  like: {
    type: Number,
    default: 0
  },
  dislike: {
    type: Number,
    default: 0
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "posts",
    required: true
  }
});

const commentModel = mongoose.model("comment", commentSchema);

module.exports = commentModel;
