const express = require("express");
const router = express.Router();
const {addToCart, getCart, deleteFromCart, clearCart} = require("../controllers/cart.controller");

router.post("/add", addToCart);
router.get("/", getCart);
router.delete("/", deleteFromCart);
router.delete("/clear", clearCart);

module.exports = router;