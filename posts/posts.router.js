const express = require("express");
const postsModel = require("./posts.model");
const commentModel = require("./comment.model");

const postsRouter = express();

postsRouter.get("/get", (req, res) => {
  //sort by
  //const pageNumber = Number(req.query.pageNumber);
  //const pageSize = Number(req.query.pageSize);
  //validate
  /*if (isNaN(pageNumber) || isNaN(pageSize)) {
    res.status(500).json({
      success: false,
      message: "Page Number and Page Size is invalid"
    });
  }
  if (pageNumber < 1 || pageSize < 1 || pageSize > 20) {
    res.status(500).json({
      success: false,
      message: "Page Number and Page Size is invalid"
    });
  }*/
  //query db 1-inc -1-decrease
  postsModel
    .find({}, null)
    .sort({ createAt: -1 })
    //.skip((pageNumber - 1) * pageSize)
    //.limit(pageSize)
    .populate("author", "fullName")
    .exec((error, data) => {
      if (error) {
        res.status(500).json({
          success: false,
          message: error.message
        });
      } else {
        postsModel
          .find({})
          //.countDocuments()
          .exec((error, total) => {
            if (error) {
              res.status(500).json({
                success: false,
                message: error.message
              });
            } else {
              res.status(200).json({
                success: true,
                data: data,
                total: total
              });
            }
          });
      }
    });
});

postsRouter.get("/:postId", (req, res) => {
  postsModel.findById(req.params.postId, (error, data) => {
    if (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    } else {
      commentModel.find({ post: req.params.postId }, (err, dataComment) => {
        if (err) {
          res.status(500).json({
            success: false,
            message: err.message
          });
        } else {
          res.status(200).json({
            success: true,
            dataComment: dataComment,
            data: data
          });
        }
      });
    }
  });
});
postsRouter.post("/create", (req, res) => {
  console.log(req.session.currentUser);
  console.log(req.body);
  if (req.session.currentUser && req.session.currentUser._id) {
    const newPost = {
      title: req.body.title,
      content: req.body.content,
      tag: req.body.tag,
      srcUrl: req.body.imageUrl,
      author: req.session.currentUser._id
    };
    postsModel.create(newPost, (error, data) => {
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
    });
  } else {
    res.status(500).json({
      success: false,
      message: "Unauthenticated"
    });
  }
});
postsRouter.post("/:postId/add-comment", (req, res) => {
  console.log(req.session.currentUser);
  if (!req.session.currentUser) {
    res.json({
      success: false,
      message: "No Current User"
    });
  } else {
    commentModel.create(
      {
        content: req.body.content,
        author: req.session.currentUser._id,
        post: req.params.postId
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
module.exports = postsRouter;
