const express = require("express");
const router = express.Router();

const { createOrder } = require("../controllers/paymentController");
const { verifyPayment } = require("../controllers/paymentVerifyController");

// Create Razorpay Order
router.post("/create-order", createOrder);

// Verify Payment
router.post("/verify-payment", verifyPayment);

module.exports = router;