const mongoose = require("mongoose");
const {Schema} = require("mongoose");
const Joi = require("joi");

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true,
    },
    adminId: {
        type: Schema.Types.ObjectId,
        ref: "Admin",
    }
});

const ProductModel = mongoose.model("Product", productSchema);

const validateProduct = (product) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        desc: Joi.string().required(),
        price: Joi.number().required(),
    })

    return schema.validate(product);
}


module.exports = {
    ProductModel,
    validateProduct,
};