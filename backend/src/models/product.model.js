const mongoose = require("mongoose");
const {Schema} = require("mongoose");

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
        ref: "admin",
        // required: true,
    }
});

const productModel = mongoose.model("Product", productSchema);
module.exports = productModel;