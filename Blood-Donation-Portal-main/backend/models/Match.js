const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema({

    requestId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BloodRequest",
        required: true
    },

    donorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Donor",
        required: true
    },

    status: {
        type: String,
        enum: [
            "pending",
            "accepted",
            "rejected",
            "completed"
        ],
        default: "pending"
    },

    matchedAt:{
        type:Date,
        default:Date.now
    }

});


module.exports = mongoose.model(
    "Match",
    matchSchema
);