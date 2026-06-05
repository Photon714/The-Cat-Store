const express = require("express");
const router = express.Router();
const { getItems } = require("../Controller/cat-controller.js");

router.route("/").get(getItems);

module.exports = router;
