import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/api";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await API.post("/auth/register", formData);

      if (res.data.success) {
        alert("✅ Registration Successful");

        localStorage.setItem("token", res.data.token);
        localStorage.setItem(
          "user",
          JSON.stringify(res.data.user)
        );

        navigate("/login");
      }
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Registration Failed"
      );
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg,#667eea,#764ba2)",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: "430px",
          background: "#fff",
          padding: "35px",
          borderRadius: "12px",
          boxShadow: "0 10px 30px rgba(0,0,0,.2)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#6C63FF",
            marginBottom: "25px",
          }}
        >
          Create Account
        </h1>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          style={inputStyle}
        />

        <textarea
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          rows="3"
          style={{
            ...inputStyle,
            resize: "none",
          }}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <button
          type="submit"
          disabled={loading}
          style={buttonStyle}
        >
          {loading ? "Creating..." : "Signup"}
        </button>

        <p
          style={{
            textAlign: "center",
            marginTop: "20px",
          }}
        >
          Already have an account?
          <Link
            to="/login"
            style={{
              textDecoration: "none",
              color: "#6C63FF",
              fontWeight: "bold",
              marginLeft: "5px",
            }}
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "18px",
  border: "1px solid #ccc",
  borderRadius: "6px",
  fontSize: "16px",
  boxSizing: "border-box",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  background: "#6C63FF",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "17px",
  fontWeight: "bold",
};

export default Signup;