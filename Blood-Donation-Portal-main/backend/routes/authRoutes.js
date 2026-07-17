const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const { authMiddleware } = require("../middleware/auth");

// ==========================
// Register
// ==========================
router.post("/register", authController.register);


// ==========================
// Login
// ==========================
router.post("/login", authController.login);


// ==========================
// Get Current Logged-in User
// ==========================
router.get("/me", authMiddleware, authController.getCurrentUser);


// ==========================
// Update Profile
// ==========================
router.put(
  "/profile",
  authMiddleware,
  authController.updateProfile
);


// ==========================
// Change Password
// ==========================
router.put(
  "/change-password",
  authMiddleware,
  authController.changePassword
);


module.exports = router;