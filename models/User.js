const mongoose = require("mongoose");
const { Schema } = mongoose;

var validateEmail = function (email) {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(email);
};

const userSchema = new Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: [
      true,
      "Email already exists. Please use a different email address",
    ],
    validate: [validateEmail, "Please fill a valid email address"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
    lowercase: true,
    trim: true,
  },
  password: { type: String, required: true, minlength: 5 },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("user", userSchema);
