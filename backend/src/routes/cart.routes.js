const express = require("express");
const router = express.Router();
const {addToCart, getCart, deleteFromCart, clearCart} = require("../controllers/cart.controller");
const { verifyUserToken } = require("../middleware/auth.middleware");

router.post("/add", verifyUserToken, addToCart);
router.get("/", verifyUserToken, getCart);
router.delete("/", verifyUserToken, deleteFromCart);
router.delete("/clear", verifyUserToken, clearCart);

module.exports = router;