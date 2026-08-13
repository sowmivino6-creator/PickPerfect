const mongoose = require("mongoose");
require("dotenv").config();

const Product = require("./models/Product");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log(err));

const products = [
  {
    name: "Women's Kurti",
    description: "Beautiful Cotton Kurti",
    price: 899,
    category: "Dress",
    image: "https://images.unsplash.com/photo-1583391733981-849840bd42f0?w=600",
    stock: 20,
  },
  {
    name: "Men's T-Shirt",
    description: "Premium Cotton T-Shirt",
    price: 599,
    category: "Dress",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600",
    stock: 30,
  },
  {
    name: "Silk Saree",
    description: "Traditional Silk Saree",
    price: 1999,
    category: "Dress",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600",
    stock: 15,
  },
  {
    name: "Mixer Grinder",
    description: "750W Mixer Grinder",
    price: 3499,
    category: "Kitchen",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600",
    stock: 10,
  },
  {
    name: "Pressure Cooker",
    description: "Stainless Steel Pressure Cooker",
    price: 1899,
    category: "Kitchen",
    image: "https://images.unsplash.com/photo-1603190287605-e6ade32fa852?w=600",
    stock: 20,
  },
  {
    name: "Dinner Set",
    description: "Ceramic Dinner Set",
    price: 1299,
    category: "Kitchen",
    image: "https://images.unsplash.com/photo-1516685018646-549198525c1b?w=600",
    stock: 18,
  },
  {
    name: "Apple iPhone 15",
    description: "Latest Apple Smartphone",
    price: 79999,
    category: "Mobiles",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600",
    stock: 8,
  },
  {
    name: "Samsung Galaxy S24",
    description: "Samsung Flagship Mobile",
    price: 74999,
    category: "Mobiles",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600",
    stock: 10,
  },
  {
    name: "Redmi Note 14",
    description: "Redmi 5G Smartphone",
    price: 18999,
    category: "Mobiles",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600",
    stock: 20,
  },
  {
    name: "HP Laptop 15",
    description: "Intel Core i5 Laptop",
    price: 55999,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600",
    stock: 7,
  },
];

async function seedProducts() {
  try {
    await Product.deleteMany();

    await Product.insertMany(products);

    console.log("✅ 10 Products Inserted Successfully");

    mongoose.connection.close();
  } catch (err) {
    console.log(err);
    mongoose.connection.close();
  }
}

seedProducts();