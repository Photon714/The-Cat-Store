const asyncHandler = require("express-async-handler"); // use it to avoid typing try and catch every time
const User = require("../models/userModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); //used to provide access to the logged in user or work with access token

function userAccessCode(userName, userId) {
  return jwt.sign(
    {
      username: userName,
      id: userId,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "60m", //access token validity
    },
  );
}

//@desc POST user
//@route POST/api/user/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400);
    throw new Error("Need every info about user");
  }
  const findExistance = await User.findOne({ username });
  if (findExistance) {
    res.status(400);
    throw new Error("This user already exists");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("The user hashed password is:", hashedPassword);
  const user = await User.create({
    username,
    password: hashedPassword,
  });
  if (user) {
    const accessToken = userAccessCode(user.username, user.id);
    res.status(200).json({ accessToken });
  } else {
    res.status(400);
    throw new Error("User entered data invalid");
  }
});

//@desc POST user
//@route POST/api/user/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400);
    throw new Error("please enter all the creaditals");
  }
  const user = await User.findOne({ username });
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = userAccessCode(user.username, user.id);
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("username or password is incorrect");
  }
});

//@desc GET CurrentUser
//@route GET/api/user/current
//@access private

const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = { registerUser, loginUser, currentUser };
