const express = require("express");
const router = express.Router();
const {addProduct, showProducts, updateProduct, deleteProduct, showOneProduct, getAdminProducts} = require("../controllers/product.controller");
const upload = require("../middleware/upload");
const { verifyAdminToken } = require("../middleware/auth.middleware");


router.post("/", verifyAdminToken, upload.single("image") ,addProduct);
router.get("/admin-products", verifyAdminToken, getAdminProducts);
router.get("/", showProducts);
router.get("/:id", showOneProduct);
router.patch("/:id", verifyAdminToken, updateProduct);
router.delete("/:id", verifyAdminToken, deleteProduct);


module.exports = router;