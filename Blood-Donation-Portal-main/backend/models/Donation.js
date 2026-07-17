const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema(
  {
    donorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    bloodGroup: {
      type: String,
      required: true,
    },

    donationDate: {
      type: Date,
      default: Date.now,
    },

    location: {
      type: String,
      required: true,
    },

    recipientName: {
      type: String,
      default: "Not Assigned",
    },

    status: {
      type: String,
      enum: ["completed", "pending"],
      default: "completed",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Donation", donationSchema);