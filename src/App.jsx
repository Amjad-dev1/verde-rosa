import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import FadePage from "./components/fadepage.jsx";
import "./app.css";
import Filters from "./components/Filters";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/home";
import About from "./pages/about";
import Products1 from "./pages/products1.jsx";
import Donate from "./pages/donate";
import Account from "./pages/account";
import Cart from "./pages/cart";
import BouquetBuilder from "./pages/BouquetBuilder.jsx";

//component to test backend
function BackendTest() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/testConnection.php") // Adjust URL if needed
      .then(res => res.json())
      .then(json => setData(json))
      .catch(err => setData({ success: false, message: err.message }));
  }, []);

  return (
    <div style={{ padding: "20px", background: "#fff", color: "#000", position:"fixed", bottom:"0", right:"0", zIndex:"99" }}>
      <h2>Backend Test</h2>
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>Loading backend response...</p>
      )}
    </div>
  );
}



export default function App() {
  const location = useLocation();

  return (
    <>
      <div className="blackout"></div>
      <Filters />
      <Navbar />
      <BackendTest />
      <div className="gradient"></div>
      
      <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            
            <Route path="/"        element={<FadePage><Home /></FadePage>} />
            <Route path="/about"   element={<FadePage><About /></FadePage>} />
            <Route path="/products"element={<FadePage><Products1 /></FadePage>} />
            <Route path="/donate"  element={<FadePage><Donate /></FadePage>} />
            <Route path="/cart"    element={<FadePage><Cart /></FadePage>} />
            <Route path="/account" element={<FadePage><Account /></FadePage>} />
            <Route path="/BouquetBuilder" element={<FadePage><BouquetBuilder/></FadePage>} />
          </Routes>
      </AnimatePresence>
    </>
  );
}
