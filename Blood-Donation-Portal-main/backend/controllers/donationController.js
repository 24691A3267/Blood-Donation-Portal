const Donation = require("../models/Donation");


// ==========================
// Get Logged-in User Donations
// ==========================
exports.getMyDonations = async (req, res) => {
  try {

    const donations = await Donation.find({
      donorId: req.user.id
    }).sort({
      createdAt: -1
    });


    res.json({
      success: true,
      donations
    });


  } catch (error) {

    console.error("GET DONATIONS ERROR:", error);

    res.status(500).json({
      message: "Failed to fetch donations"
    });

  }
};



// ==========================
// Add Donation
// ==========================
exports.addDonation = async (req, res) => {
  try {

    const {
      bloodGroup,
      location,
      recipientName,
      status
    } = req.body;


    const donation = await Donation.create({

      donorId: req.user.id,

      bloodGroup,

      location,

      recipientName,

      status

    });


    res.status(201).json({

      success: true,

      message: "Donation added successfully",

      donation

    });


  } catch (error) {

    console.error("ADD DONATION ERROR:", error);

    res.status(500).json({
      message: "Failed to add donation"
    });

  }
};