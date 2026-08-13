import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import "../App.css";

function Products() {
  const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: "₹2,499",
      image: "🎧",
    },
    {
      id: 2,
      name: "Smart Watch",
      price: "₹3,999",
      image: "⌚",
    },
    {
      id: 3,
      name: "Laptop",
      price: "₹54,999",
      image: "💻",
    },
    {
      id: 4,
      name: "Mobile",
      price: "₹19,999",
      image: "📱",
    },
    {
      id: 5,
      name: "Shoes",
      price: "₹2,199",
      image: "👟",
    },
    {
      id: 6,
      name: "T-Shirt",
      price: "₹799",
      image: "👕",
    },
  ];

  return (
    <>
      <Navbar />

      <div className="products-page">
        <h1>🛍️ Our Products</h1>

        <div className="product-grid">
          {products.map((item) => (
            <div className="product-card" key={item.id}>
              <div className="emoji">{item.image}</div>

              <h3>{item.name}</h3>

              <h2>{item.price}</h2>

              <p>⭐⭐⭐⭐⭐</p>

              <Link to="/cart">
                <button className="cart-btn">
                  Add to Cart
                </button>
              </Link>

              <Link to={`/product/${item.id}`}>
                <button className="details-btn">
                  View Details
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Products;