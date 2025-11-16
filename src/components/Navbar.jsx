import "../styles/nav.css";
import "../styles/glass.css";
import "../styles/index.css";
import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <>
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'></link>
    <div className="topbar">
        <div className="logo">
            <svg xmlns="http://www.w3.org/2000/svg" id="Layer_2" data-name="Layer 2" viewBox="0 0 412.8 412.8"><defs/><g id="Layer_1-2" data-name="Layer 1"><path d="M343 137c-75 0-137-62-137-137 0 75-61 137-136 137 75 0 136 61 136 136 0-75 62-136 137-136M0 206c0 114 92 207 206 207 0-114-92-207-206-207M413 206c-114 0-207 93-207 207 114 0 207-93 207-207" class="cls-1"/></g></svg>
            Verde Rosa
        </div>
        <nav className="glass">
        <div style={{ display: "flex", gap: "20px" }}>
            <Link to="/"><i class='bx  bxs-home'></i> Home</Link>
            <Link to="/about"><i class='bx  bxs-help-circle'></i> About</Link>
            <Link to="/products"><i class='bx  bxs-store'></i> Bouquets</Link>
            <Link to="/donate"><i class='bx  bxs-leaf'></i> Sustainability</Link>
            <Link to="/cart"><i class='bx  bxs-cart'></i> myCart</Link>
            <Link to="/account"><i class='bx  bxs-user-circle'></i> Account</Link>
        </div>
        </nav>
    </div>
    </>
  );
}