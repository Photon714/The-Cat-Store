const express = require("express");
const router = express.Router();
const {
  createItem,
  getItems,
  deleteItems,
  quantityChange,
  vanish,
} = require("../Controller/cart-controller.js");

const validateToken = require("../Middleware/validateToken.js");

router.use(validateToken); //now every cart related change will require token validation and loggin

router.route("/").get(getItems);
router.route("/add").post(createItem);
router.route("/vanish").delete(vanish);
router.route("/change").put(quantityChange);
router.route("/remove").delete(deleteItems);

module.exports = router;
