const mongoose = require("mongoose");

const postsSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  createAt: {
    type: Date,
    default: new Date()
  },
  srcUrl: {
    type: [String],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  voteAvg: {
    type: Number,
    default: 0
  },
  voteNumber: {
    type: Number,
    default: 0
  },
  commentNumber: {
    type: Number,
    default: 0
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true
  },
  tag: { type: [String], required: true }
});

const postsModel = mongoose.model("posts", postsSchema);

module.exports = postsModel;
