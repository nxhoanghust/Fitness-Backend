const express = require("express");
const bcryptjs = require("bcryptjs");
const usersModel = require("./users.model");
const mongoose = require("mongoose");
const usersRouter = express.Router();
const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const phoneRegex = /^0(1\d{9}|9\d{8})$/;

usersRouter.post("/test", (req, res) => {
  //console.log(req.session.currentUser);
  //console.log(req.body);
  if (req.session.currentUser !== undefined) {
    res.json({
      success: true,
      data: req.session.currentUser
    });
  } else if (req.body._id) {
    req.session.currentUser = {
      _id: req.body._id,
      email: req.body.email,
      fullName: req.body.fullName
    };
    res.json({
      success: true,
      data: req.session.currentUser
    });
  } else {
    res.json({
      success: false,
      message: "No Current User"
    });
  }
});

usersRouter.post("/login", (req, res) => {
  const { email, password } = req.body;
  usersModel.findOne({ email: email }, (error, data) => {
    if (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    } else if (!data) {
      res.status(400).json({
        success: false,
        message: "Email does not exist!!"
      });
    } else {
      if (bcryptjs.compareSync(password, data.password)) {
        req.session.currentUser = {
          _id: data._id,
          email: data.email,
          fullName: data.fullName
        };
        console.log(req.session.currentUser);
        res.status(200).json({
          success: true,
          message: "Login successful!!",
          data: { ...data._doc, password: "" }
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Password incorrect!!"
        });
      }
    }
  });
});
usersRouter.get("/logout", (req, res) => {
  req.session.destroy(error => {
    //console.log(req.session.currentUser);
    if (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Logout success"
      });
    }
  });
});

usersRouter.get("/statistic/get", (req, res) => {
    console.log(req.session.currentUser);
  if (!req.session.currentUser._id) {
    res.status(500).json({
      success: false,
      message: "No current User!"
    });
  } else {
    usersModel.findById(req.session.currentUser._id, (error, data) => {
      if (error) {
        res.status(500).json({
          success: false,
          message: error.message
        });
      } else {
        res.status(200).json({
          success: true,
          data: {
            ...data._doc,
            password: ""
          }
        });
      }
    });
  }
});
usersRouter.post("/statistic/update", (req, res) => {
  if (!req.session.currentUser._id) {
    res.status(500).json({
      success: false,
      message: "No current User!"
    });
  } else {
    usersModel.findByIdAndUpdate(
      req.session.currentUser._id,
      {
        weight: req.body.weight,
        height: req.body.height,
        waist: req.body.waist,
        hips: req.body.hips,
        BMI: req.body.BMI,
        WHR: req.body.WHR
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
            data: {
              ...data._doc,
              password: ""
            }
          });
        }
      }
    );
  }
});

usersRouter.post("/register", (req, res) => {
  const { email, password, fullName, address, phoneNumber, gender } = req.body;
  //console.log(req.body);
  if (!email || !emailRegex.test(email)) {
    res.status(400).json({
      success: false,
      message: "Invalid email address"
    });
  } else if (!password || password.length < 8 || password.length > 15) {
    res.status(400).json({
      success: false,
      message: "Password must be from 8-15 characters"
    });
  } else if (!fullName) {
    res.status(400).json({
      success: false,
      message: "Please input your Full Name"
    });
  } else if (!address) {
    res.status(400).json({
      success: false,
      message: "Please input your Adress"
    });
  } else if (!phoneNumber || !phoneRegex.test(phoneNumber)) {
    res.status(400).json({
      success: false,
      message: "Invalid phone number"
    });
  } else if (!gender) {
    res.status(400).json({
      success: false,
      message: "Invalid gender"
    });
  } else {
    usersModel.findOne({ email: email }, (error, data) => {
      if (error) {
        res.status(400).json({
          success: false,
          message: error.message
        });
      } else if (data) {
        res.status(400).json({
          success: false,
          message: "Email has been used"
        });
      } else {
        //hash password
        const hashPassword = bcryptjs.hashSync(password, 10);
        //save to db
        usersModel.create(
          {
            ...req.body,
            password: hashPassword
          },
          (err, newUser) => {
            if (err) {
              res.status(500).json({
                success: false,
                message: err.message
              });
            } else {
              res.status(201).json({
                success: true,
                data: {
                  ...newUser._doc,
                  password: ""
                }
              });
            }
          }
        );
      }
    });
  }
});

usersRouter.post("/update-profile", (req, res) => {
  //console.log(req.session.currentUser);
  if (!req.session.currentUser) {
    res.status(500).json({
      success: false,
      message: "No Current User"
    });
  } else {
    //console.log(req.body);
    usersModel.findOneAndUpdate(
      { _id: req.session.currentUser._id },
      {
        fullName: req.body.fullName,
        phoneNumber: req.body.phoneNumber,
        avatar: req.body.avatar
      },
      err => {
        if (err) {
          res.status(500).json({
            success: false,
            message: err.message
          });
        } else {
          res.status(200).json({
            success: true
          });
        }
      }
    );
  }
});

usersRouter.get("/profile/:usersId", (req, res) => {
  console.log(req.params.usersId);
  usersModel.findById(req.params.usersId, (error, data) => {
    if (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    } else {
      res.status(200).json({
        success: true,
        data: { ...data._doc, password: "" }
      });
    }
  });
});

module.exports = usersRouter;
