const asyncHandler = require("express-async-handler"); // use it to avoid typing try and catch every time
const Contact = require("../models/contactModel.js");
//@desc Get all items
//@route GET/api/UI
//@access private

const getItems = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  res.status(200).json(contacts);
});

//@desc Create items
//@route POST/api/UI
//@access private

const createItems = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("Need everything");
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });
  console.log(req.body);
  res.status(201).json(contact);
});

//@desc GET item
//@route GET/api/UI/:id
//@access private

const getSingleItem = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("The contact does not exists");
  }
  if (contact.user_id.toString() !== req.user.id) {
    //contact is made using Contacts which contains user_id of the one that is associated with the contacts(owner who made the contacts) while req.userid contains the id of the one requesting the change
    res.status(403);
    throw new Error(
      "Another Person cannot change the contacts of someone else",
    );
  }
  res.status(200).json(contact);
});

//@desc Change items
//@route PUT/api/UI/:id
//@access private

const changeItems = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("The contact does not exists");
  }
  if (contact.user_id.toString() !== req.user.id) {
    //contact is made using Contacts which contains user_id of the one that is associated with the contacts(owner who made the contacts) while req.userid contains the id of the one requesting the change
    res.status(403);
    throw new Error(
      "Another Person cannot change the contacts of someone else",
    );
  }
  const updateContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
  );
  console.log(req.body);
  res.status(201).json(updateContact);
});

//@desc Delete items
//@route DELETE/api/UI/:id
//@access private

const deleteItems = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("The contact does not exists");
  }
  if (contact.user_id.toString() !== req.user.id) {
    //contact is made using Contacts which contains user_id of the one that is associated with the contacts(owner who made the contacts) while req.userid contains the id of the one requesting the change
    res.status(403);
    throw new Error(
      "Another Person cannot change the contacts of someone else",
    );
  }
  await contact.deleteOne();
  res.status(200).json(contact);
});

module.exports = {
  getItems,
  createItems,
  getSingleItem,
  changeItems,
  deleteItems,
};
