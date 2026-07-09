const express = require("express");
const router = express.Router();
const {addReview, deleteReview, getReviews} = require("../controllers/review.controller");

router.post("/:id/review", addReview);
router.get("/reviews", getReviews);
router.delete("/:id/review/:reviewId", deleteReview);

module.exports = router;