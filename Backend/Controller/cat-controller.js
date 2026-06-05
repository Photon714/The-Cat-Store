const asyncHandler = require("express-async-handler"); // use it to avoid typing try and catch every time
const Cat = require("../models/catModel.js");
const data = require("../Data/data.js");
//@desc Get all items
//@route GET/api/UI
//@access private

const getItems = asyncHandler(async (req, res) => {
  const cats = await Cat.find();
  res.status(200).json(cats);
});

module.exports = {
  getItems,
};
