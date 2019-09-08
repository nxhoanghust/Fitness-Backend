const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  fullName: {
    type: String,
    required: true
  },
  createAt: {
    type: Date,
    default: new Date()
  },
  address: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: Number,
    required: true
  },
  avatar: {
    type: String,
    default: ""
  },
  gender: {
    type: String,
    required: true
  },
  weight: {
    type: Number
  },
  height: {
    type: Number
  },
  waist: {
    type: Number
  },
  hips: {
    type: Number  
  }
});

const UsersModel = mongoose.model("Users", UsersSchema);

module.exports = UsersModel;
