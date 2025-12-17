import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/featuredbouquets.css";

export default function BabiesNewborn() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("http://localhost:8000/api/getProducts.php");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.success && data.data) {
          const categoryProducts = data.data
            .filter(product => product.Category === "Baby & Newborn")
            .slice(0, 3);

          console.log("Baby & Newborn products found:", categoryProducts);
          setProducts(categoryProducts);
        } else {
          throw new Error(data.error || "Failed to fetch products");
        }
      } catch (error) {
        console.error("Error fetching Baby & Newborn products:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, []);

  const getBriefDescription = (description) => {
    if (!description) return "";
    const words = description.split(' ');
    if (words.length <= 10) return description;
    return words.slice(0, 10).join(' ') + '...';
  };

  if (loading) {
    return (
      <section className="featured-section pink-theme">
        <div className="featured-container">
          <h2 className="featured-title">
            <div className="highlight"></div>
            Babies and Newborn
          </h2>
          <div className="featured-subtitle">
            <div className="highlight"></div>
            <span>Loading products...</span>
          </div>
          <div className="loading-spinner">Loading...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="featured-section pink-theme">
        <div className="featured-container">
          <h2 className="featured-title">
            <div className="highlight"></div>
            Babies and Newborn
          </h2>
          <div className="featured-subtitle">
            <div className="highlight"></div>
            <span>Error loading products</span>
          </div>
          <div className="error-message">Error: {error}</div>
        </div>
      </section>
    );
  }

  return (
    <section className="featured-section pink-theme">
      <div className="featured-container">
        <h2 className="featured-title">
          <div className="highlight"></div>
          Babies and Newborn
        </h2>
        <div className="featured-subtitle">
          <div className="highlight"></div>
          <span>Delicate arrangements for the newest members of the family.</span>
        </div>

        <div className="featured-grid">
          {products.length === 0 ? (
            <div className="no-products">No products found in this category.</div>
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
