import { useEffect, useState, useCallback } from "react";
import "../styles/cart.css";
import VideoBackground from "../components/videobackground.jsx";
import back5 from "../assets/back5.mp4";
import { Link } from "react-router-dom";

export default function Cart() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [loading, setLoading] = useState(true);

  // Helper: truncate descriptions safely
  const truncateDescription = (text, maxLen = 100) => {
    if (!text && text !== 0) return ""; // handle null/undefined
    const str = String(text);
    return str.length > maxLen ? str.slice(0, maxLen - 1).trim() + "…" : str;
  };

  const checkLogin = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:8000/api/session_check.php", {
        credentials: "include",
      });
      const data = await res.json();
      setLoggedIn(data.logged_in);
      if (data.logged_in) {
        fetchCart();
        fetchAddresses();
      }
    } catch (error) {
      console.error("Login check failed:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkLogin();
  }, [checkLogin]);

  const fetchCart = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/getCart.php", {
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        setCartItems(data.items);
      }
    } catch (error) {
      console.error("Fetch cart failed:", error);
    }
  };

  const fetchAddresses = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/get_address.php", {
        credentials: "include",
      });
      const data = await res.json();
      if (data.success && data.address) {
        setAddresses([data.address]);
        setSelectedAddress(data.address.AddressID);
      }
    } catch (error) {
      console.error("Fetch addresses failed:", error);
    }
  };

  const removeFromCart = async (cartItemId) => {
    try {
      const res = await fetch("http://localhost:8000/api/removeFromCart.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        credentials: "include",
        body: new URLSearchParams({ cart_item_id: cartItemId }),
      });
      const data = await res.json();
      if (data.success) {
        fetchCart();
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Remove from cart failed:", error);
    }
  };

  const handleCheckout = async () => {
    if (!selectedAddress) {
      alert("Please select an address");
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/api/checkout.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        credentials: "include",
        body: new URLSearchParams({ address_id: selectedAddress }),
      });
      const data = await res.json();
      if (data.success) {
        alert("Order placed successfully!");
        setCartItems([]);
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Checkout failed:", error);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.Price * item.Quantity, 0);
  };

  if (loading) {
    return <div className="cart-page">Loading...</div>;
  }

  if (!loggedIn) {
    return (
      <div className="cart-page">
        <div className="empty-cart glass">Please log in to view your cart.</div>
        <VideoBackground src={back5} />
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <div className="cart-items">
          {cartItems.length === 0 ? (
            <div className="empty-cart glass">Your cart is empty.</div>
          ) : (
            cartItems.map((item) => (
              <div key={item.CartItemID} className="cart-item glass">
                <img src={`/products/${item.ProductID}.webp`} alt={item.ProductName} />
                <div className="cart-item-details">
                  <h3>{item.ProductName}</h3>
                  <p>{truncateDescription(item.Description, 90)}</p>
                  <Link to={`/product/${item.ProductID}`} className="view-details-link">
                    View Details
                  </Link>
                </div>
                <div className="cart-item-quantity">
                  <span>Qty: {item.Quantity}</span>
                </div>
                <div className="cart-item-price">${(item.Price * item.Quantity).toFixed(2)}</div>
                <button className="remove-btn" onClick={() => removeFromCart(item.CartItemID)}>
                  Remove
                </button>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-summary glass">
            <h2>Order Summary</h2>
            <div className="total">Total: ${calculateTotal().toFixed(2)}</div>

            <div className="checkout-form">
              <label>Select Address:</label>
              <select
                className="address-select"
                value={selectedAddress}
                onChange={(e) => setSelectedAddress(e.target.value)}
              >
                <option value="">Choose address</option>
                {addresses.map((addr) => (
                  <option key={addr.AddressID} value={addr.AddressID}>
                    {addr.AddressLine}, {addr.Area}, {addr.Province}
                  </option>
                ))}
              </select>
            </div>

            <button className="checkout-btn" onClick={handleCheckout}>
              Checkout (Pay on Delivery)
            </button>
          </div>
        )}
      </div>
      <VideoBackground src={back5} />
    </div>
  );
}
