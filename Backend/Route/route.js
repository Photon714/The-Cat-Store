const express = require("express");
const router = express.Router();
const {
  getItems,
  createItems,
  changeItems,
  deleteItems,
  getSingleItem,
} = require("../Controller/UI-controller.js");

const validateToken = require("../ErrorHandler/validateToken.js");

router.use(validateToken); //now every contact related change will require token validation and loggin

router.route("/").get(getItems);
router.route("/:id").get(getSingleItem);
router.route("/").post(createItems);
router.route("/:id").put(changeItems);
router.route("/:id").delete(deleteItems);

module.exports = router;
