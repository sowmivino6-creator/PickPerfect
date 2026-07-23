const express = require("express");
const router = express.Router();

const {
  addToCart,
  getCart,
  removeCartItem,
} = require("../controllers/cartController");

// Add To Cart
router.post("/add", addToCart);

// Get Cart
router.get("/", getCart);

// Remove Cart Item
router.delete("/:id", removeCartItem);

module.exports = router;