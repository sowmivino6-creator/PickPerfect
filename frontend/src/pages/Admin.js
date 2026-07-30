import { useEffect, useState } from "react";
import API from "../api/api";

function Admin() {
  const [products, setProducts] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
    stock: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const addProduct = async () => {
    try {
      await API.post("/products/add", formData);

      alert("✅ Product Added Successfully");

      setFormData({
        name: "",
        description: "",
        price: "",
        category: "",
        image: "",
        stock: "",
      });

      fetchProducts();
    } catch (error) {
      console.log(error);
      alert("Failed");
    }
  };

  const deleteProduct = async (id) => {
    try {
      await API.delete(`/products/delete/${id}`);

      alert("Deleted Successfully");

      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        padding: "30px",
        background: "#f4f4f4",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#6C63FF",
        }}
      >
        Admin Dashboard
      </h1>

      <div
        style={{
          background: "#fff",
          padding: "25px",
          borderRadius: "12px",
          marginBottom: "30px",
        }}
      >
        <h2>Add Product</h2>

        <input
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          name="stock"
          placeholder="Stock"
          value={formData.stock}
          onChange={handleChange}
          style={inputStyle}
        />

        <button
          onClick={addProduct}
          style={{
            background: "#6C63FF",
            color: "#fff",
            padding: "12px 25px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Add Product
        </button>
      </div>

      <h2>All Products</h2>

      {products.map((product) => (
        <div
          key={product._id}
          style={{
            background: "#fff",
            marginBottom: "15px",
            padding: "15px",
            borderRadius: "10px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <h3>{product.name}</h3>
            <p>₹ {product.price}</p>
          </div>

          <button
            onClick={() => deleteProduct(product._id)}
            style={{
              background: "red",
              color: "#fff",
              border: "none",
              padding: "10px 18px",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  border: "1px solid #ccc",
  borderRadius: "6px",
  boxSizing: "border-box",
};

export default Admin;