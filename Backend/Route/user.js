const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  currentUser,
} = require("../Controller/user-controller.js");
const validateToken = require("../Middleware/validateToken.js");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.get("/current", validateToken, currentUser);

module.exports = router;
