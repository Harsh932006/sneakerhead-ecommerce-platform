const {Schema} = require("mongoose");
const mongoose = require("mongoose");
const Joi = require("joi");

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


const validateUser = (user) => {
    const schema = Joi.object({
        username: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
    })

    return schema.validate(user);
}
 
module.exports = {
    userModel,
    validateUser
}