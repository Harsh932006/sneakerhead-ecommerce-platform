const express = require("express");
const router = express.Router();
const {addReview, deleteReview, getReviews} = require("../controllers/review.controller");
const { verifyUserToken } = require("../middleware/auth.middleware");

router.post("/:id/review", verifyUserToken, addReview);
router.get("/reviews", getReviews);
router.delete("/:id/review/:reviewId", verifyUserToken, deleteReview);

module.exports = router;