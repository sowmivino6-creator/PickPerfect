const Cart = require("../models/Cart");

// Add To Cart
const addToCart = async (req, res) => {
  try {
    const { user, product, quantity } = req.body;

    const cart = await Cart.create({
      user,
      product,
      quantity,
    });

    res.status(201).json({
      success: true,
      message: "Product Added To Cart",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Cart Items
const getCart = async (req, res) => {
  try {
    const cart = await Cart.find()
      .populate("user")
      .populate("product");

    res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Remove Cart Item
const removeCartItem = async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Cart Item Removed",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addToCart,
  getCart,
  removeCartItem,
};