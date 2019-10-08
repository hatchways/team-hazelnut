const mongoose = require("mongoose");
const Schema = mongoose.Schema;
import dbConnection from "./../db/mongoose";

const ProfileSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  photoUrl: {
    type: String
  },
  gender: {
    type: String,
    required: true
  },
  birthDate: {
    type: Date,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: Number
  },
  location: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

module.exports = dbConnection.model("Profile", ProfileSchema);
