const express = require("express");
const postsModel = require("./posts.model");
const commentModel = require("./comment.model");

const postsRouter = express();
function roundHalf(num) {
  return Math.round(num * 2) / 2;
}
postsRouter.get("/get", (req, res) => {
  //sort by
  const pageNumber = Number(req.query.pageNumber);
  const pageSize = Number(req.query.pageSize);
  //validate
  if (isNaN(pageNumber) || isNaN(pageSize)) {
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
  }
  //query db 1-inc -1-decrease
  else {
    postsModel
      .find({}, null)
      .sort({ createAt: -1 })
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .populate("author", "fullName avatar")
      .exec((error, data) => {
        if (error) {
          res.status(500).json({
            success: false,
            message: error.message
          });
        } else {
          postsModel
            .find({})
            .countDocuments()
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
  }
});

postsRouter.get("/:postId", (req, res) => {
  //console.log(req.session.currentUser);
  postsModel
    .findById(req.params.postId)
    .populate("author", "fullName avatar")
    .exec((error, data) => {
      if (error) {
        res.status(500).json({
          success: false,
          message: error.message
        });
      } else {
        commentModel
          .find({ post: req.params.postId })
          .populate("author", "fullName avatar")
          .exec((err, dataComment) => {
            if (err) {
              res.status(500).json({
                success: false,
                message: err.message
              });
            } else {
              res.status(200).json({
                success: true,
                dataComment: dataComment,
                data: {
                  ...data._doc,
                  vote: roundHalf(data.voteAvg / data.commentNumber)
                }
              });
            }
          });
      }
    });
});

postsRouter.get("/search/:searchKey", (req, res) => {
  postsModel
    .find({ title: { $regex: req.params.searchKey, $options: "i" } })
    .sort({ voteAvg: -1 })
    .limit(5)
    .populate("author", "fullName avatar")
    .exec((err, data) => {
      if (err) {
        res.status(500).json({
          success: false,
          message: err.message
        });
      }
      postsModel
        .find({
          tag: { $regex: req.params.searchKey, $options: "i" }
        })
        .sort({ voteAvg: -1 })
        .limit(5)
        .populate("author", "fullName avatar")
        .exec((error, data1) => {
          if (error) {
            res.status(500).json({
              success: false,
              message: error.message
            });
          } else {
            res.status(200).json({
              success: true,
              data: data,
              dataTag: data1
            });
          }
        });
    });
});

postsRouter.post("/create", (req, res) => {
  //console.log(req.session.currentUser);
  //console.log(req.body);
  if (req.session.currentUser && req.session.currentUser._id) {
    const newPost = {
      title: req.body.title,
      content: req.body.content,
      tag: req.body.tag,
      srcUrl: req.body.imageUrl,
      author: req.session.currentUser._id,
      createAt: new Date()
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
  if (!req.session.currentUser._id) {
    res.json({
      success: false,
      message: "No Current User"
    });
  } else {
    commentModel.create(
      {
        content: req.body.content,
        author: req.session.currentUser._id,
        post: req.params.postId,
        voteStar: req.body.voteStar,
        createAt: new Date()
      },
      (error, data) => {
        if (error) {
          res.status(500).json({
            success: false,
            message: error.message
          });
        } else {
          postsModel.findByIdAndUpdate(
            req.params.postId,
            {
              $inc: { commentNumber: 1, voteAvg: req.body.voteStar }
            },
            (err, data1) => {
              if (err) {
                res.status(500).json({
                  success: false,
                  message: err.message
                });
              } else {
                res.status(200).json({
                  success: true,
                  data: data,
                  cmt: data1
                });
              }
            }
          );
        }
      }
    );
  }
});

/*postsRouter.post("/:postId/update-comment", (req, res) => {
  if (!req.session.currentUser._id) {
    res.json({
      success: false,
      message: "No Current User"
    });
  } else {
    commentModel.findByIdAndUpdate({}, (error, data) => {
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
  }
});*/
module.exports = postsRouter;
