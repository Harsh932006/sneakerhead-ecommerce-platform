const {Schema} = require("mongoose");
const mongoose = require("mongoose");

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;