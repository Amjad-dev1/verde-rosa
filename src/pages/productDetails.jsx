import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/productDetails.css";
import VideoBackground from "../components/videobackground.jsx";
import back3 from "../assets/back3.mp4";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // Check login status
    fetch("http://localhost:8000/api/session_check.php", {
      credentials: "include",
    })
      .then((r) => r.json())
      .then((data) => {
        setLoggedIn(data.logged_in);
      })
      .catch((err) => console.error(err));

    // Fetch product details
    fetch(`http://localhost:8000/api/getSingleProduct.php?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProduct(data.product);
        } else {
          console.error(data.error);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  const addToCart = async () => {
    if (!loggedIn) {
      alert("Please log in to add items to cart");
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/api/addToCart.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        credentials: "include",
        body: new URLSearchParams({ product_id: product.ProductID }),
      });
      const data = await res.json();
      if (data.success) {
        alert("Item added to cart!");
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Add to cart failed:", error);
    }
  };

  if (loading) {
    return (
      <div className="product-details-page">
        <VideoBackground src={back3} />
        <div className="loading">Loading product details...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-details-page">
        <VideoBackground src={back3} />
        <div className="error">Product not found</div>
      </div>
    );
  }

  return (
    <div className="product-details-page">
      <VideoBackground src={back3} />
      <button className="back-button glass" onClick={() => navigate(-1)}>
        <i className='bx bx-arrow-back'></i>
      </button>
      <div className="product-details-container">
        {/* Product Image */}
        <div className="product-image-section">
          <img
            src={`/products/${product.ProductID}.webp`}
            alt={product.ProductName}
            className="product-large-image"
          />
        </div>

        {/* Product Info */}
        <div className="product-info-section glass">
          <h1 className="product-title">{product.ProductName}</h1>
          <p className="product-description">{product.Description}</p>

          <div className="product-price-section">
            <span className="product-price">${product.Price}</span>
            <button className="add-to-cart-btn glass" onClick={addToCart}>
              Add to Cart
            </button>
          </div>

          <div className="product-meta">
            <p><strong>Category:</strong> {product.Category}</p>
            <p><strong>Stock:</strong> {product.Stock} available</p>
          </div>
        </div>
      </div>
    </div>
  );
}
