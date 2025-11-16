import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import "./app.css";
import Filters from "./components/Filters";
import Navbar from "./components/navbar.jsx";
import Home from "./pages/home.jsx";
import About from "./pages/about.jsx";
import Products from "./pages/products.jsx";
import Donate from "./pages/donate.jsx";
import Account from "./pages/account.jsx";

export default function App() {
  const location = useLocation();

  return (
    <>
      <div className="blackout"></div>
      <Filters />
      <Navbar />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}
