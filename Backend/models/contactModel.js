const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
  {
    user_id: {
      //Now for every contact related change the change will require log in and assosciate that change with the user Id ie now every contact method/action is private
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "please enter the name"],
    },
    email: {
      type: String,
      required: [true, "please enter the email adddress"],
    },
    phone: {
      type: Number,
      required: [true, "please enter the phone number"],
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Contact", contactSchema);
