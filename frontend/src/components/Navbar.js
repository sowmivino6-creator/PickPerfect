import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    alert("Logout Successful");

    navigate("/login");
  };

  return (
    <nav
      style={{
        background: "#6C63FF",
        color: "#fff",
        padding: "15px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      {/* Logo */}
      <h2
        style={{
          margin: 0,
          cursor: "pointer",
        }}
        onClick={() => navigate("/")}
      >
        🛍 PickPerfect
      </h2>

      {/* Menu */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          alignItems: "center",
        }}
      >
        <Link style={linkStyle} to="/">
          Home
        </Link>

        <Link style={linkStyle} to="/products">
          Products
        </Link>

        <Link style={linkStyle} to="/cart">
          Cart
        </Link>

        <Link style={linkStyle} to="/orders">
          Orders
        </Link>

        {!token ? (
          <>
            <Link style={linkStyle} to="/login">
              Login
            </Link>

            <Link style={linkStyle} to="/signup">
              Signup
            </Link>
          </>
        ) : (
          <button
            onClick={logout}
            style={{
              background: "#ff4d4d",
              color: "#fff",
              border: "none",
              padding: "8px 18px",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

const linkStyle = {
  color: "#fff",
  textDecoration: "none",
  fontWeight: "bold",
  fontSize: "16px",
};

export default Navbar;