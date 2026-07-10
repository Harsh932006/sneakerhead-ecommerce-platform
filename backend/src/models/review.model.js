const mongoose = require("mongoose");
const {Schema} = require("mongoose");
const Joi = require("joi");

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

const validateReview = (review) => {
    const schema = Joi.object({
        review: Joi.string().required(),
    })

    return schema.validate(review);
}

module.exports = {
    Review,
    validateReview
};