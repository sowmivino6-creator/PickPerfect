import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#667eea,#764ba2)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "30px",
      }}
    >
      <div
        style={{
          textAlign: "center",
          background: "#fff",
          padding: "50px",
          borderRadius: "15px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
          maxWidth: "700px",
          width: "100%",
        }}
      >
        <h1
          style={{
            fontSize: "45px",
            color: "#6C63FF",
            marginBottom: "20px",
          }}
        >
          🛍 PickPerfect
        </h1>

        <h2 style={{ color: "#444" }}>
          Smart Shopping Starts Here
        </h2>

        <p
          style={{
            color: "#666",
            marginTop: "20px",
            lineHeight: "30px",
            fontSize: "18px",
          }}
        >
          Welcome to PickPerfect E-Commerce Website.
          <br />
          Browse thousands of quality products,
          add them to your cart, make secure
          payments using Razorpay, and track
          your orders instantly.
        </p>

        <div
          style={{
            marginTop: "35px",
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={() => navigate("/products")}
            style={{
              padding: "15px 35px",
              background: "#6C63FF",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "18px",
              fontWeight: "bold",
            }}
          >
            Shop Now
          </button>

          <button
            onClick={() => navigate("/signup")}
            style={{
              padding: "15px 35px",
              background: "#28a745",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "18px",
              fontWeight: "bold",
            }}
          >
            Create Account
          </button>
        </div>

        <div
          style={{
            marginTop: "40px",
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          <div>
            <h2>🚚</h2>
            <h4>Fast Delivery</h4>
          </div>

          <div>
            <h2>🔒</h2>
            <h4>Secure Payment</h4>
          </div>

          <div>
            <h2>⭐</h2>
            <h4>Best Quality</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;