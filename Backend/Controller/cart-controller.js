const asyncHandler = require("express-async-handler"); // use it to avoid typing try and catch every time
const Cart = require("../models/cartModel.js"); //The structure of the cart

//@desc POST add cat to cart
//@route POST/api/cart/add
//@access private ie requires access token
const createItem = asyncHandler(async (req, res) => {
  const { catId, quantity } = req.body;
  if (!catId || !quantity) {
    res.status(400);
    throw new Error("Need CatId and quantity to add Item to Cart");
  }
  let cart = await Cart.findOne({ username: req.user.username }); //finding the cart of the user
  if (!cart) {
    //creating new one if not found
    cart = await Cart.create({
      username: req.user.username,
      items: [
        {
          catId,
          quantity,
        },
      ],
    });
    return res.status(200).json(cart);
  }
  const ItemCatIndex = cart.items.findIndex(
    (item) => item.catId.toString() == catId, //if the item already exists in cart then change quantity
  );
  if (ItemCatIndex > -1) {
    cart.items[ItemCatIndex].quantity += quantity;
  } else {
    cart.items.push({ catId, quantity });
  }
  await cart.save();
  res.status(200).json(cart);
});

//@desc GET cats from cart
//@route GET/api/cart
//@access private ie requires access token
const getItems = asyncHandler(async (req, res) => {
  const user = req.user.username;
  if (!user) {
    res.status(400);
    throw new Error("Need username to fetch the cart");
  }
  const cart = await Cart.findOne({ username: user }).populate("items.catId");
  if (!cart) {
    return res.status(200).json({ username: user, items: [] });
  }
  res.status(200).json(cart);
});

//@desc DELETE an cat from the cart
//@route DELETE/api/cart/remove
//@access private ie requires access token
const deleteItems = asyncHandler(async (req, res) => {
  const catId = req.body.catId;
  if (!catId) {
    res.status(400);
    throw new Error("Need catId to delete particular item from cart");
  }
  const user = req.user.username;
  if (!user) {
    res.status(400);
    throw new Error("Need username to delete particular item from cart");
  }
  const cart = await Cart.findOne({ username: user });
  if (!cart) {
    res.status(200);
    throw new Error("Cart does not exists");
  }
  const initialLength = cart.items.length;
  cart.items = cart.items.filter((item) => item.catId.toString() != catId);
  if (cart.items.length === initialLength) {
    res.status(404);
    throw new Error("Item does not exist in the cart");
  }

  await cart.save();
  res.status(200).json(cart);
});

//@desc PUT change quantity
//@route PUT/api/cart/change
//@access private ie requires access token
const quantityChange = asyncHandler(async (req, res) => {
  const { catId, quantity } = req.body;
  if (!catId || !quantity) {
    res.status(400);
    throw new Error(
      "Need catId and quantity to decrease particular item from cart",
    );
  }
  const user = req.user.username;
  if (!user) {
    res.status(400);
    throw new Error("Need username to delete particular item from cart");
  }
  const cart = await Cart.findOne({ username: user });
  if (!cart) {
    res.status(200);
    throw new Error("Cart does not exists");
  }
  const itemIndex = cart.items.findIndex(
    (item) => item.catId.toString() === catId,
  );

  if (itemIndex == -1) {
    res.status(400);
    throw new Error("Item doesnot exists in the cart");
  }
  const newQuan = cart.items[itemIndex].quantity + quantity;

  if (newQuan <= 0) {
    cart.items = cart.items.filter((item) => item.catId.toString() !== catId);
  } else {
    cart.items[itemIndex].quantity = newQuan;
  }
  await cart.save();
  res.status(200).json(cart);
});

//@desc DELETE the cart
//@route DELETE/api/cart/vanish
//@access private ie requires access token
const vanish = asyncHandler(async (req, res) => {
  const user = req.user.username;
  if (!user) {
    res.status(400);
    throw new Error("Need username to delete the cart");
  }
  const cart = await Cart.findOne({ username: user });
  if (!cart) {
    res.status(200);
    throw new Error("Cart does not exists");
  }
  cart.items = [];
  await cart.save();
  res.json(cart);
});

module.exports = { createItem, getItems, deleteItems, quantityChange, vanish };
