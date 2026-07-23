import { Link } from "react-router-dom";
import { FaShoppingCart, FaUserCircle, FaHeart, FaSearch } from "react-icons/fa";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">

      <div className="logo">
        🛍️ <span>PickPerfect</span>
      </div>

      <div className="search-bar">
        <input type="text" placeholder="Search products..." />
        <button>
          <FaSearch />
        </button>
      </div>

      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/products">Products</Link>
        </li>

        <li>
          <Link to="/cart">
            <FaShoppingCart />
            <span className="badge">0</span>
          </Link>
        </li>

        <li>
          <Link to="/wishlist">
            <FaHeart />
          </Link>
        </li>

        <li>
          <Link to="/login">
            <FaUserCircle />
          </Link>
        </li>

        <li>
          <Link to="/signup" className="signup-btn">
            Sign Up
          </Link>
        </li>
      </ul>

    </nav>
  );
}

export default Navbar;