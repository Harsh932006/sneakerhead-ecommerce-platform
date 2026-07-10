const productModel = require("../models/product.model");
const {reviewModel, validateReview} = require("../models/review.model");

const addReview = async (req, res) => {
  try {
    
    const {error} = validateReview(req.body);

    if(error){
    return res.status(400).json({
      message: error.details[0].message,
    })
  }
    
    const {id} = req.params;
    const user = req.session.userId;
    const {review} = req.body;

    const product = await productModel.findById(id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    if (!user) {
      return res.status(401).json({
        message: "Please login to add review",
      });
    }

    if(!review){
      return res.status(400).json({
        message: "Please provide the desc."
      })
    }

    const userReview = reviewModel.create({
      review,
      product: product,
      user: user,
    });

    res.status(200).json({
      message: "Review added successfully",
      userReview: {
        review,
      }
    });
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const getReviews = async (req, res) => {
  const reviews = await reviewModel.find({}).populate("user");

  if(!reviews){
    return res.status(404).json({
      message: "No reviews found"
    })
  }

  res.status(200).json({
    message: "Reviews found successfully",
    reviews
  })
}

const deleteReview = async (req, res) => {

  const {reviewId} = req.params;

  const user = req.session.userId;

  if(!user){
    return res.status(401).json({
      message: "Please login to delete the review"
    })
  }

  const review = await reviewModel.findById(reviewId);

  if (!review) {
    return res.status(404).json({ message: "Review not found" });
  }

  if(review.user.toString() != user){
    return res.status(403).json({
      message: "You cannot delete this review because you have not created this review"
    })
  }

  const userReview = await reviewModel.findByIdAndDelete(reviewId);

  res.status(200).json({
    message: "Review deleted successfully",
    userReview
  })
}

module.exports = {
  addReview,
  getReviews,
  deleteReview
};
