const express = require("express");

const {
  getCart,
  addToCart,
  updateCart,
  removeCart,
  clearCart,
} = require("../controllers/cartController");

const router = express.Router();

// ================= GET =================

// Get All Cart Items
router.get("/", getCart);

// ================= POST =================

// Add Product To Cart
router.post("/add", addToCart);

// ================= PUT =================

// Update Cart Quantity
router.put("/update/:id", updateCart);

// ================= DELETE =================

// Remove Single Cart Item
router.delete("/:id", removeCart);

// Clear Entire Cart
router.delete("/clear/:userId", clearCart);

module.exports = router;