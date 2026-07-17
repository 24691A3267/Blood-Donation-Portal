const express = require("express");
const router = express.Router();

const donationController = require("../controllers/donationController");
const { authMiddleware } = require("../middleware/auth");


// Get logged-in donor donations
router.get(
  "/my-donations",
  authMiddleware,
  donationController.getMyDonations
);


// Add donation
router.post(
  "/add",
  authMiddleware,
  donationController.addDonation
);


module.exports = router;