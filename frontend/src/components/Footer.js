import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-box">
          <h2>🛍️ PickPerfect</h2>
          <p>
            Your one-stop destination for fashion,
            electronics and daily essentials.
          </p>
        </div>

        <div className="footer-box">
          <h2>Quick Links</h2>

          <p>Home</p>
          <p>Products</p>
          <p>Cart</p>
          <p>Login</p>
        </div>

        <div className="footer-box">
          <h2>Contact</h2>

          <p>📧 support@pickperfect.com</p>
          <p>📞 +91 9876543210</p>
          <p>📍 Coimbatore, Tamil Nadu</p>
        </div>

      </div>

      <hr />

      <p className="copyright">
        © 2026 PickPerfect | All Rights Reserved
      </p>

    </footer>
  );
}

export default Footer;