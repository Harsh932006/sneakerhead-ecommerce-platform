const mongoose = require("mongoose");
const {Schema} = require("mongoose");
const Joi = require("joi");

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

const AdminModel = mongoose.model("Admin", adminSchema);

const validateAdmin = (admin) => {
    const schema = Joi.object({
        username: Joi.string().required(),
        orgName: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
        address: Joi.string().required(),
    })

    return schema.validate(admin);
}

module.exports = {
    AdminModel,
    validateAdmin
};