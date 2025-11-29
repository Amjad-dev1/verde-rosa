import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/featuredbouquets.css";

export default function Plants() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/getProducts.php");
        const data = await res.json();
        if (data.success) {
          const categoryProducts = data.data.filter(p => p.Category === "Mixed Bouquets").slice(0, 3);
          setProducts(categoryProducts);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
      setLoading(false);
    };

    fetchCategoryProducts();
  }, []);

  const getBriefDescription = (desc) => {
    const words = desc.split(' ');
    return words.length > 10 ? words.slice(0, 10).join(' ') + '...' : desc;
  };

  if (loading) {
    return (
      <section className="featured-section green-theme">
        <div className="featured-container">
          <h2 className="featured-title">
            <div className="highlight"></div>
            Mixed Bouquets</h2>
          <div className="featured-subtitle">
            <div className="highlight"></div>
            <span>Loading products...</span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="featured-section green-theme">
      <div className="featured-container">
        <h2 className="featured-title">
          <div className="highlight"></div>
          Mixed Bouquets</h2>
        <div className="featured-subtitle">
          <div className="highlight"></div>
          <span>Beautiful combinations of flowers for every occasion.</span>
        </div>

        <div className="featured-grid">
          {products.map((p, i) => (
            <div className="featured-card glass" key={i}>
              <img src={`/products/${p.ProductID}.webp`} alt={p.ProductName} className="featured-image" />
              <div className="featured-info">
                <h3>{p.ProductName}</h3>
                <p>{getBriefDescription(p.Description)}</p>
                <button className="featured-btn" onClick={() => navigate(`/product/${p.ProductID}`)}>View Details</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
