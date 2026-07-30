const Cart = require("../models/Cart");
const Product = require("../models/Product");

// ================= GET CART =================
const getCart = async (req, res) => {
  try {
    const cart = await Cart.find().populate("product");

    res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= ADD TO CART =================
const addToCart = async (req, res) => {
  try {
    const { user, product, quantity } = req.body;

    // Check Product
    const productExists = await Product.findById(product);

    if (!productExists) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });
    }

    // Already in Cart?
    const cartItem = await Cart.findOne({
      user,
      product,
    });

    if (cartItem) {
      cartItem.quantity += quantity || 1;
      await cartItem.save();

      return res.status(200).json({
        success: true,
        message: "Cart Updated Successfully",
        cart: cartItem,
      });
    }

    // New Cart Item
    const cart = await Cart.create({
      user,
      product,
      quantity: quantity || 1,
    });

    res.status(201).json({
      success: true,
      message: "Product Added To Cart",
      cart,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= UPDATE CART =================
const updateCart = async (req, res) => {
  try {
    const { quantity } = req.body;

    const cart = await Cart.findByIdAndUpdate(
      req.params.id,
      { quantity },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart Item Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Cart Updated Successfully",
      cart,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= REMOVE CART ITEM =================
const removeCart = async (req, res) => {
  try {
    const cart = await Cart.findByIdAndDelete(req.params.id);

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart Item Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Item Removed From Cart",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= CLEAR CART =================
const clearCart = async (req, res) => {
  try {
    await Cart.deleteMany({ user: req.params.userId });

    res.status(200).json({
      success: true,
      message: "Cart Cleared Successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCart,
  removeCart,
  clearCart,
};