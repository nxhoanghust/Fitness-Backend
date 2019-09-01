const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  voteStar: {
    type: Number,
    default: 0
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
  },
  likePeople: {
    type: [String],
    default: []
  },
  dislikePeople: {
    type: [String],
    default: []
  },
  createAt: {
    type: Date,
    required: true
  }
});

const commentModel = mongoose.model("comment", commentSchema);

module.exports = commentModel;
