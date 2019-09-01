const express = require("express");
const multer = require("multer");
const fs = require("fs");
const uploadRouter = express.Router();
const upload = multer({
  dest: "public"
});
uploadRouter.post("/image", upload.array("images", 8), (req, res, next) => {
  //console.log(req.files);
  var arr = [];
  if (!req.session.currentUser) {
    res.json({
      success: false,
      message: "No Current User, Please logout and login again"
    });
  } else {
    for (let i = 0; i < req.files.length; i++) {
      var type = req.files[i].originalname.split(".").pop();
      var newNameFile = req.files[i].filename + "." + type;
      //console.log(newNameFile);
      fs.rename(
        `public/${req.files[i].filename}`,
        `public/${newNameFile}`,
        err => {
          if (err) {
            res.status(500).json({
              success: false,
              message: err.message
            });
          }
        }
      );
      arr.push(`http://localhost:3001/${newNameFile}`);
      //console.log(arr);
      if (arr.length === req.files.length) {
        res.status(200).json({
          success: true,
          imageUrl: arr
        });
      }
    }
  }
});
module.exports = uploadRouter;
