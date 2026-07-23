import { useEffect, useState } from "react";
import API from "../api/api";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import "./Products.css";

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data.products);
    } catch (error) {
      console.log(error);
      alert("Failed to load products");
    }
  };

  const addToCart = async (productId) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        alert("Please Login First");
        return;
      }

      await API.post("/cart/add", {
        user: user._id,
        product: productId,
        quantity: 1,
      });

      alert("✅ Product Added To Cart");
    } catch (error) {
      console.log(error);
      alert("Failed To Add Product");
    }
  };

  const filteredProducts = products.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "" || item.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <div className="products-page">
        <h1>🔥 Trending Products</h1>

        <div
          style={{
            display: "flex",
            gap: "15px",
            marginBottom: "25px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <input
            type="text"
            placeholder="🔍 Search Products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: "12px",
              width: "250px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{
              padding: "12px",
              borderRadius: "8px",
            }}
          >
            <option value="">All Categories</option>
            <option value="Mobiles">Mobiles</option>
            <option value="Electronics">Electronics</option>
            <option value="Fashion">Fashion</option>
            <option value="Shoes">Shoes</option>
          </select>
        </div>

        <div className="product-grid">
          {filteredProducts.map((item) => (
            <div className="product-card" key={item._id}>
              <img
                src={item.image}
                alt={item.name}
                className="product-image"
              />

              <h2>{item.name}</h2>

              <div className="price">
                <h3>₹{item.price}</h3>
              </div>

              <p>
                <strong>{item.category}</strong>
              </p>

              <p>{item.description}</p>

              <div className="button-group">
                <button
                  className="cart-btn"
                  onClick={() => addToCart(item._id)}
                >
                  🛒 Add to Cart
                </button>

                <Link to={`/product/${item._id}`}>
                  <button className="details-btn">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Products;