const express = require("express");

const {
  placeOrder,
  getOrders,
  getOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");

const router = express.Router();

// ================= POST =================

// Place Order
router.post("/add", placeOrder);

// ================= GET =================

// Get All Orders
router.get("/", getOrders);

// Get Single Order
router.get("/:id", getOrder);

// ================= PUT =================

// Update Order
router.put("/update/:id", updateOrder);

// ================= DELETE =================

// Delete Order
router.delete("/delete/:id", deleteOrder);

module.exports = router;