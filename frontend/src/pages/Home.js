import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import "../App.css";

function Home() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="hero">

        <div className="hero-overlay">

          <div className="hero-content">

            <h1>PickPerfect</h1>

            <h2>Shop Smarter. Live Better.</h2>

            <p>
              Discover Premium Fashion, Electronics,
              Home Essentials and Amazing Deals
              Every Day.
            </p>

            <div className="hero-buttons">

              <Link to="/products">
                <button className="shop-btn">
                  🛒 Shop Now
                </button>
              </Link>

              <Link to="/signup">
                <button className="offer-btn">
                  🎁 Today's Offers
                </button>
              </Link>

            </div>

          </div>

        </div>

      </section>

      {/* Categories */}

      <section className="categories">

        <h1>🔥 Shop By Category</h1>

        <div className="category-container">

          <div className="card">
            <img
              src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300"
              alt=""
            />
            <h3>Mobiles</h3>
          </div>

          <div className="card">
            <img
              src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300"
              alt=""
            />
            <h3>Laptops</h3>
          </div>

          <div className="card">
            <img
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300"
              alt=""
            />
            <h3>Shoes</h3>
          </div>

          <div className="card">
            <img
              src="https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=300"
              alt=""
            />
            <h3>Watches</h3>
          </div>

        </div>

      </section>

      {/* Offer Banner */}

      <section className="offer-section">

        <h1>🎉 BIG SALE</h1>

        <h2>UP TO 70% OFF</h2>

        <p>Limited Time Offer</p>

        <Link to="/products">
          <button>Explore Deals</button>
        </Link>

      </section>

      <Footer />

    </>
  );
}

export default Home;