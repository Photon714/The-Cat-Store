const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "please enter the username"],
      unique: [true, "This username has been used already "],
    },
    password: {
      type: String,
      required: [true, "please Enter password to continue"],
    },
  },
  {
    timestamps: [true],
  },
);
module.exports = mongoose.model("User", userSchema);
