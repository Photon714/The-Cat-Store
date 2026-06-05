const asyncHandler = require("express-async-handler"); // use it to avoid typing try and catch every time
const Cat = require("../models/catModel.js");

//@desc Get all cats
//@route GET/api/cat
//@access public
const getItems = asyncHandler(async (req, res) => {
  const cats = await Cat.find();
  res.status(200).json(cats);
});

module.exports = {
  getItems,
};
