const mongoose = require("mongoose");
const {Schema} = require("mongoose");

const adminSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    orgName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    }
});

const adminModel = mongoose.model("Admin", adminSchema);

module.exports = adminModel;