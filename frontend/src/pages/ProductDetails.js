import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await API.get(`/products/${id}`);
      setProduct(res.data.product);
    } catch (error) {
      console.log(error);
    }
  };

  if (!product) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "50px auto",
        display: "flex",
        gap: "30px",
      }}
    >
      <img
        src={product.image}
        alt={product.name}
        width="350"
        style={{ borderRadius: "10px" }}
      />

      <div>
        <h1>{product.name}</h1>

        <h2>₹{product.price}</h2>

        <h3>{product.category}</h3>

        <p>{product.description}</p>

        <button
          style={{
            padding: "12px 25px",
            background: "#ff9800",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          🛒 Add To Cart
        </button>
      </div>
    </div>
  );
}

export default ProductDetails;