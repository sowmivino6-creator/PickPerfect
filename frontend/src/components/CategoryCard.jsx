import "./CategoryCard.css";

function CategoryCard() {
  const categories = [
    { icon: "📱", name: "Mobiles" },
    { icon: "💻", name: "Laptops" },
    { icon: "👕", name: "Fashion" },
    { icon: "👟", name: "Shoes" },
    { icon: "⌚", name: "Watches" },
    { icon: "🏠", name: "Home" },
    { icon: "💄", name: "Beauty" },
    { icon: "🎧", name: "Accessories" }
  ];

  return (
    <div className="category-section">
      <h2>🔥 Featured Categories</h2>

      <div className="category-container">
        {categories.map((item, index) => (
          <div className="category-card" key={index}>
            <div className="category-icon">{item.icon}</div>
            <h4>{item.name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryCard;