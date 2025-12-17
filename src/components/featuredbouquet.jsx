import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/featuredbouquets.css";

export default function FeaturedBouquets() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("http://localhost:8000/api/getProducts.php");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.success && data.data) {
          const featuredIds = [2, 6, 59];
          const featuredProducts = data.data.filter(product =>
            featuredIds.includes(parseInt(product.ProductID))
          );

          console.log("Featured products found:", featuredProducts);
          setProducts(featuredProducts);
        } else {
          throw new Error(data.error || "Failed to fetch products");
        }
      } catch (error) {
        console.error("Error fetching featured products:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  const getBriefDescription = (description) => {
    if (!description) return "";
    const words = description.split(' ');
    if (words.length <= 8) return description;
    return words.slice(0, 8).join(' ') + '...';
  };

  if (loading) {
    return (
      <section className="featured-section">
        <div className="featured-container">
          <h2 className="featured-title">
            <div className="highlight"></div>
            Featured Bouquets
          </h2>
          <div className="featured-subtitle">
            <div className="highlight"></div>
            <span>Loading featured products...</span>
          </div>
          <div className="loading-spinner">Loading...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="featured-section">
        <div className="featured-container">
          <h2 className="featured-title">
            <div className="highlight"></div>
            Featured Bouquets
          </h2>
          <div className="featured-subtitle">
            <div className="highlight"></div>
            <span>Error loading featured products</span>
          </div>
          <div className="error-message">Error: {error}</div>
        </div>
      </section>
    );
  }

  return (
    <section className="featured-section">
      <div className="featured-container">
        <h2 className="featured-title">
          <div className="highlight"></div>
          Featured Bouquets
        </h2>
        <div className="featured-subtitle">
          <div className="highlight"></div>
          <span>Seasonal arrangements crafted with elegance and artistic detail.</span>
        </div>

        <div className="featured-grid">
          {products.length === 0 ? (
            <div className="no-products">No featured products found.</div>
          ) : (
            products.map((product) => (
              <div className="featured-card glass" key={product.ProductID}>
                <img
                  src={`/products/${product.ProductID}.webp`}
                  alt={product.ProductName}
                  className="featured-image"
                  onError={(e) => {
                    e.target.src = "/products/default.webp"; // Fallback image
                  }}
                />

                <div className="featured-info">
                  <h3>{product.ProductName}</h3>
                  <p>{getBriefDescription(product.Description)}</p>
                  <button
                    className="featured-btn"
                    onClick={() => navigate(`/product/${product.ProductID}`)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
