import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg,#667eea,#764ba2)",
      }}
    >
      <div
        style={{
          textAlign: "center",
          background: "#fff",
          padding: "50px",
          borderRadius: "15px",
          boxShadow: "0 10px 25px rgba(0,0,0,.2)",
        }}
      >
        <h1
          style={{
            fontSize: "80px",
            color: "#6C63FF",
            marginBottom: "10px",
          }}
        >
          404
        </h1>

        <h2>Page Not Found</h2>

        <p>
          Sorry, the page you are looking for doesn't exist.
        </p>

        <button
          onClick={() => navigate("/")}
          style={{
            marginTop: "20px",
            padding: "12px 30px",
            background: "#6C63FF",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Go Home
        </button>
      </div>
    </div>
  );
}

export default NotFound;