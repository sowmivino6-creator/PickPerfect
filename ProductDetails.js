import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/api";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await API.get(`/products/${id}`);
      setProduct(res.data.product);
    } catch (error) {
      console.log(error);
      alert("Unable to Load Product");
    }
  };

  const addToCart = async () => {
    if (!user) {
      alert("Please Login First");
      navigate("/login");
      return;
    }

    try {
      await API.post("/cart/add", {
        user: user._id,
        product: product._id,
        quantity: 1,
      });

      alert("✅ Product Added To Cart");
    } catch (error) {
      console.log(error);
      alert("Add To Cart Failed");
    }
  };

  if (!product) {
    return (
      <h2
        style={{
          textAlign: "center",
          marginTop: "50px",
        }}
      >
        Loading...
      </h2>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f4f4",
        padding: "40px",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "auto",
          background: "#fff",
          borderRadius: "15px",
          padding: "30px",
          display: "flex",
          gap: "40px",
          flexWrap: "wrap",
          boxShadow: "0 8px 20px rgba(0,0,0,.15)",
        }}
      >
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: "350px",
            height: "350px",
            objectFit: "cover",
            borderRadius: "12px",
          }}
        />

        <div
          style={{
            flex: 1,
          }}
        >
          <h1>{product.name}</h1>

          <p
            style={{
              color: "#666",
              marginTop: "20px",
              lineHeight: "28px",
            }}
          >
            {product.description}
          </p>

          <h2
            style={{
              color: "green",
              marginTop: "20px",
            }}
          >
            ₹ {product.price}
          </h2>

          <h3
            style={{
              color: "#6C63FF",
            }}
          >
            Category : {product.category}
          </h3>

          <h3>
            Stock : {product.stock}
          </h3>

          <button
            onClick={addToCart}
            style={{
              marginTop: "30px",
              padding: "14px 30px",
              background: "#6C63FF",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Add To Cart
          </button>

          <button
            onClick={() => navigate("/cart")}
            style={{
              marginTop: "30px",
              marginLeft: "15px",
              padding: "14px 30px",
              background: "#28a745",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Go To Cart
          </button>

          <br />
          <br />

          <button
            onClick={() => navigate("/products")}
            style={{
              padding: "12px 25px",
              background: "#ff9800",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            ← Back To Products
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;