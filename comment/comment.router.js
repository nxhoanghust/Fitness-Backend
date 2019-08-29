const express = require("express");
const commentModel = require("./comment.model");

const commentRouter = express.Router();

commentRouter.post("/add-comment", (req, res) => {
  console.log(req.session.currentUser);
  if (!req.session.currentUser) {
    res.json({
      success: false,
      message: "No Current User"
    });
  } else {
    commentModel.create(
      {
        ...req.body,
        author: req.session.currentUser._id
      },
      (error, data) => {
        if (error) {
          res.status(500).json({
            success: false,
            message: error.message
          });
        } else {
          res.status(200).json({
            success: true,
            data: data
          });
        }
      }
    );
  }
});

module.exports = commentRouter;
