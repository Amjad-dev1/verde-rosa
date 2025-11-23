import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import FadePage from "./components/fadepage.jsx";
import "./app.css";
import Filters from "./components/Filters";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import About from "./pages/about";
import Products from "./pages/products";
import Donate from "./pages/donate";
import Account from "./pages/account";
import Cart from "./pages/cart";
import BouquetBuilder from "./pages/BouquetBuilder.jsx";

export default function App() {
  const location = useLocation();

  return (
    <>
      <div className="blackout"></div>
      <Filters />
      <Navbar />
      <div className="gradient"></div>
      <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            
            <Route path="/"        element={<FadePage><Home /></FadePage>} />
            <Route path="/about"   element={<FadePage><About /></FadePage>} />
            <Route path="/products"element={<FadePage><Products /></FadePage>} />
            <Route path="/donate"  element={<FadePage><Donate /></FadePage>} />
            <Route path="/cart"    element={<FadePage><Cart /></FadePage>} />
            <Route path="/account" element={<FadePage><Account /></FadePage>} />
            <Route path="/BouquetBuilder" element={<FadePage><BouquetBuilder/></FadePage>} />
          </Routes>
      </AnimatePresence>

    </>
  );
}
