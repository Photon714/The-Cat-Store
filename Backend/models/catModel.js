const mongoose = require("mongoose");

const catSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please enter the name"],
    },
    breed: {
      type: String,
      required: [true, "please enter the email adddress"],
    },
    age: {
      type: Number,
      required: [true, "please the age of the cat"],
    },
    price: {
      type: Number,
      required: [true, "please enter the phone number"],
    },
    description: {
      type: String,
      required: [true, "Need Description"],
    },
    image: {
      type: String,
      required: [true, "Need image URL"],
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Cat", catSchema);
