const mongoose = require("mongoose");

const cartSchema = mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    items: [
      {
        catId: {
          //Now for every cat related change the change will require log in and assosciate that change with the user Id ie now every cat method/action is private
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Cat",
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Cart", cartSchema);
