const express = require("express");
const router = express.Router();
const {addProduct, showProducts, updateProduct, deleteProduct, showOneProduct, getAdminProducts} = require("../controllers/product.controller");

router.post("/", addProduct);
router.get("/admin-products", getAdminProducts);
router.get("/", showProducts);
router.get("/:id", showOneProduct);
router.patch("/:id", updateProduct);
router.delete("/:id", deleteProduct);


module.exports = router;