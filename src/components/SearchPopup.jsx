import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/search.css";

export default function SearchPopup({ isOpen, onClose }) {
  const navigate = useNavigate();
  const popupRef = useRef();

  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (!isOpen || products.length > 0) return;

    setLoading(true);
    fetch("http://localhost:8000/api/getProducts.php")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setProducts(data.data);
      })
      .finally(() => setLoading(false));
  }, [isOpen, products.length]);

  useEffect(() => {
    if (isOpen) {
      setAnimate(true);
    } else {
      // pop-out animation
      setAnimate(false);
    }
  }, [isOpen]);

  const filteredProducts = products.filter((p) =>
    p.ProductName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBackdropClick = (e) => {
    if (popupRef.current && !popupRef.current.contains(e.target)) {
      onClose();
    }
  };

  const handleViewDetails = (id) => {
    onClose();
    navigate(`/product/${id}`);
  };

  if (!isOpen && !animate) return null;

  return (
    <div
      className={`search-overlay ${isOpen ? "open" : ""}`}
      onClick={handleBackdropClick}
    >
      <div
        className={`search-popup-container glass ${animate ? "pop-in" : "pop-out"}`}
        ref={popupRef}
        onAnimationEnd={() => {
          if (!isOpen) setAnimate(false);
        }}
      >
        <div className="search-input-wrapper">
          <input
            type="text"
            placeholder="Search for bouquets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input-field"
            autoFocus
          />
          <button className="search-close-btn" onClick={onClose}>
            <i className="bx bx-x"></i>
          </button>
        </div>

        <div className="search-results-list">
          {loading ? (
            <p className="search-loading">Loading products...</p>
          ) : filteredProducts.length > 0 ? (
            filteredProducts.slice(0, 10).map((p) => (
              <div key={p.ProductID} className="search-result-item">
                <img
                  src={`/products/${p.ProductID}.webp`}
                  alt={p.ProductName}
                  className="search-item-image"
                />
                <div className="search-item-details">
                  <h4 className="search-item-name">{p.ProductName}</h4>
                  <p className="search-item-price">${p.Price}</p>
                </div>
                <button
                  className="search-view-details-btn"
                  onClick={() => handleViewDetails(p.ProductID)}
                >
                  View Details
                </button>
              </div>
            ))
          ) : searchTerm ? (
            <p className="search-no-results">No products found.</p>
          ) : (
            <p className="search-placeholder">Start typing to search...</p>
          )}
        </div>
      </div>
    </div>
  );
}
