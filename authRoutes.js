const express = require("express");

const {
  registerUser,
  loginUser,
  getProfile,
} = require("../controllers/authController");

const router = express.Router();

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Get User Profile
router.get("/profile/:id", getProfile);

module.exports = router;