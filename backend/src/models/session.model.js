const mongoose = require("mongoose");
const {Schema} = require("mongoose");

const sessionSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref :"users",
        required: true
    },

    refreshTokenHash: {
        type: String,
        required: true
    },

    ip: {
        type: String,
        required: true,
    },

    userAgent: {
        type: String,
        required: true
    },

    revoked: {
        type: String,
        default: false
    }
}, {
    timestamps: true
})

const sessionModel = mongoose.model("session", sessionSchema);

module.exports = sessionModel;