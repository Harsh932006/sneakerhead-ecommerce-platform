const express = require("express");
const router = express.Router();
const {addProduct, showProducts, updateProduct, deleteProduct, showOneProduct, getAdminProducts} = require("../controllers/product.controller");
const upload = require("../middleware/upload");

router.post("/", upload.single("image") ,addProduct);
router.get("/admin-products", getAdminProducts);
router.get("/", showProducts);
router.get("/:id", showOneProduct);
router.patch("/:id", updateProduct);
router.delete("/:id", deleteProduct);


module.exports = router;