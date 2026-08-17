import { useEffect, useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

function Products() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await API.get("/products");

      console.log("Products API Response:", res.data);

      if (Array.isArray(res.data.products)) {
        setProducts(res.data.products);
      } else {
        setProducts([]);
        console.log("Products data is not an array");
      }
    } catch (error) {
      console.log("Products Error:", error);
      alert("Failed to Load Products");
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId) => {
    if (!user) {
      alert("Please Login First");
      navigate("/login");
      return;
    }

    try {
      await API.post("/cart/add", {
        user: user._id,
        product: productId,
        quantity: 1,
      });

      alert("✅ Product Added To Cart");
    } catch (error) {
      console.log("Cart Error:", error);
      alert("Add To Cart Failed");
    }
  };

  const filteredProducts = products.filter((item) =>
    item.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f5f5",
        padding: "30px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#6C63FF",
          marginBottom: "25px",
        }}
      >
        🛍 PickPerfect Products
      </h1>

      <div
        style={{
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
        <input
          type="text"
          placeholder="Search Products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "350px",
            maxWidth: "90%",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid gray",
            fontSize: "16px",
          }}
        />
      </div>

      {loading ? (
        <h2 style={{ textAlign: "center" }}>
          Loading Products...
        </h2>
      ) : filteredProducts.length === 0 ? (
        <h2 style={{ textAlign: "center" }}>
          No Products Found
        </h2>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(280px,1fr))",
            gap: "25px",
          }}
        >
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              style={{
                background: "#fff",
                borderRadius: "12px",
                padding: "20px",
                textAlign: "center",
                boxShadow: "0 5px 15px rgba(0,0,0,.15)",
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                style={{
                  width: "220px",
                  height: "220px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />

              <h2>{product.name}</h2>

              <p>{product.description}</p>

              <h3 style={{ color: "green" }}>
                ₹ {product.price}
              </h3>

              <button
                onClick={() => addToCart(product._id)}
                style={{
                  padding: "10px 20px",
                  background: "#6C63FF",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  marginTop: "10px",
                }}
              >
                Add To Cart
              </button>

              <br />
              <br />

              <button
                onClick={() =>
                  navigate(`/product/${product._id}`)
                }
                style={{
                  padding: "10px 20px",
                  background: "#28a745",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;