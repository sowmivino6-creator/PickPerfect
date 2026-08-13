const express = require("express");

const router = express.Router();

const {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

// Get All Products
router.get("/", getProducts);

// Get Single Product
router.get("/:id", getProduct);

// Add Product
router.post("/add", addProduct);

// Update Product
router.put("/update/:id", updateProduct);

// Delete Product
router.delete("/delete/:id", deleteProduct);

module.exports = router;