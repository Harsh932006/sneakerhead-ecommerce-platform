const mongoose = require("mongoose");
const {Schema} = require("mongoose");
const userModel = require("../models/user.model")

const reviewSchema = new Schema({
    review: {
        type: String,
        requried: true,
    },

    product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    }
})

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;