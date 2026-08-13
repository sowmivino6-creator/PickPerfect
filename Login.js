import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/api";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
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
      const res = await API.post("/auth/login", formData);

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem(
          "user",
          JSON.stringify(res.data.user)
        );

        alert("✅ Login Successful");

        navigate("/products");
      }

    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Login Failed"
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
          width: "400px",
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
          Login
        </h1>

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
          {loading ? "Please Wait..." : "Login"}
        </button>

        <p
          style={{
            textAlign: "center",
            marginTop: "20px",
          }}
        >
          Don't have an account?
          <Link
            to="/signup"
            style={{
              textDecoration: "none",
              color: "#6C63FF",
              fontWeight: "bold",
              marginLeft: "5px",
            }}
          >
            Signup
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
  borderRadius: "6px",
  border: "1px solid #ccc",
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

export default Login;