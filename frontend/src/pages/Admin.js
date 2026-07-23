import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../api/api";

function Admin() {
  const [products, setProducts] = useState([]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data.products);
    } catch (err) {
      console.log(err);
    }
  };

  const addProduct = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/products/add", {
        name,
        price,
        image,
        category,
        description,
      });

      alert(res.data.message);

      setName("");
      setPrice("");
      setImage("");
      setCategory("");
      setDescription("");

      fetchProducts();
    } catch (err) {
      alert(err.response?.data?.message || "Failed To Add Product");
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await API.delete(`/products/${id}`);

      alert("✅ Product Deleted");

      fetchProducts();
    } catch (err) {
      alert("Delete Failed");
    }
  };

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "30px auto",
        padding: "20px",
      }}
    >
      <h1 style={{ textAlign: "center" }}>
        🛠 Admin Dashboard
      </h1>

      <form onSubmit={addProduct}>

        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={inputStyle}
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{
            ...inputStyle,
            height: "100px",
          }}
        />

        <button style={addButton}>
          ➕ Add Product
        </button>

      </form>

      <hr style={{ margin: "40px 0" }} />

      <h2>📦 Product List</h2>

      {products.length === 0 ? (
        <h3>No Products Available</h3>
      ) : (
        products.map((item) => (
          <div
            key={item._id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "15px",
              marginBottom: "15px",
            }}
          >
            <img
              src={item.image}
              alt={item.name}
              width="120"
              height="120"
              style={{
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />

            <div style={{ flex: 1 }}>
              <h3>{item.name}</h3>

              <h2>₹{item.price}</h2>

              <p>
                <b>Category:</b> {item.category}
              </p>

              <p>{item.description}</p>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <Link to={`/edit/${item._id}`}>
                <button style={editButton}>
                  ✏️ Edit
                </button>
              </Link>

              <button
                style={deleteButton}
                onClick={() => deleteProduct(item._id)}
              >
                ❌ Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  border: "1px solid #ccc",
  borderRadius: "8px",
  fontSize: "15px",
  boxSizing: "border-box",
};

const addButton = {
  width: "100%",
  padding: "14px",
  background: "#28a745",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "16px",
};

const editButton = {
  background: "#2196f3",
  color: "#fff",
  border: "none",
  padding: "10px 18px",
  borderRadius: "6px",
  cursor: "pointer",
};

const deleteButton = {
  background: "#f44336",
  color: "#fff",
  border: "none",
  padding: "10px 18px",
  borderRadius: "6px",
  cursor: "pointer",
};

export default Admin;