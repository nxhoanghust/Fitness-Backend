const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const cors = require("cors");
const usersRouter = require("./users/users.router");
const postsRouter = require("./posts/posts.router");
const uploadRouter = require("./upload/upload.router");

mongoose.connect("mongodb://localhost:27017/fitness", error => {
  if (error) {
    console.log(error);
  } else {
    console.log("Connect to mongodb success");
    const app = express();

    //cors
    app.use(
      cors({
        origin: "http://localhost:3000",
        credentials: true
      })
    );
    app.use(express.static("public"));
    app.options("*", cors());
    app.use(bodyParser.json());
    app.use(
      session({
        secret: "keyboard cat"
      })
    );
    //router
    app.use("/users", usersRouter);
    app.use("/posts", postsRouter);
    app.use("/upload", uploadRouter);
    //listen
    app.listen(3001, error => {
      if (error) {
        throw error;
      } else {
        console.log("Server listen on port 3001...");
      }
    });
  }
});
