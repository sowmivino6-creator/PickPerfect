const express = require("express");
const router = express.Router();

const {
  placeOrder,
  getOrders,
  getOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");

// Place Order
router.post("/add", placeOrder);

// Get All Orders
router.get("/", getOrders);

// Get Single Order
router.get("/:id", getOrder);

// Update Order
router.put("/:id", updateOrder);

// Delete Order
router.delete("/:id", deleteOrder);

module.exports = router;