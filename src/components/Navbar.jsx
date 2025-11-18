import "../styles/nav.css";
import { NavLink, Link, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";

export default function Navbar() {
  const { pathname } = useLocation();
  const navRef = useRef();
  const indicatorRef = useRef();

  const rightNavRef = useRef();
  const rightIndicatorRef = useRef();


  // Determine if no active link
  const noActive =
  pathname !== "/" &&
    pathname !== "/products" &&
    pathname !== "/donate" &&
    pathname !== "/about";

  useEffect(() => {
  const indicator = indicatorRef.current;
  const nav = navRef.current;
  if (!indicator || !nav) return;

  const navWidth = nav.offsetWidth;

 if (noActive) {
    const width = navWidth * 0.6; // 50% of center div
    const offset = (navWidth - width) / 2; // center it
    indicator.style.width = `${width}px`;
    indicator.style.transform = `translateX(${offset}px)`;
    indicator.style.opacity = "0.4";
    indicator.style.background = "white";
}
 else {
    const activeLink = nav.querySelector(".nav-item.active");
    if (!activeLink) return;

    const linkRect = activeLink.getBoundingClientRect();
    const parentRect = nav.getBoundingClientRect();

    // offset relative to nav div
    const offset = linkRect.left - parentRect.left;
    indicator.style.width = `${linkRect.width}px`;
    indicator.style.transform = `translateX(${offset}px)`;
    indicator.style.opacity = "1";
    indicator.style.background = "rgb(211, 172, 117)";
  }
}, [pathname, noActive]);



useEffect(() => {
  const indicator = rightIndicatorRef.current;
  const nav = rightNavRef.current;
  if (!indicator || !nav) return;

  const activeLink = nav.querySelector(".right-item.active");

  if (!activeLink) {
    // default: 50% width of container, centered
    const navWidth = nav.offsetWidth;
    const width = navWidth * 0.5;
    const offset = (navWidth - width) / 2;
    indicator.style.width = `${width}px`;
    indicator.style.transform = `translateX(${offset}px)`;
    indicator.style.background = "white"; // grass green
    indicator.style.opacity = "0.4";
  } else {
    const linkRect = activeLink.getBoundingClientRect();
    const parentRect = nav.getBoundingClientRect();
    const offset = linkRect.left - parentRect.left;

    indicator.style.width = `${linkRect.width}px`;
    indicator.style.transform = `translateX(${offset}px)`;
    indicator.style.background = "green";
    indicator.style.opacity = "1";
  }
}, [pathname]);




  return (
    <>
      <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet' />
      <div className="topbar">
        
        <Link to="/" className="right">
          <div className="logo">
            <svg xmlns="http://www.w3.org/2000/svg" id="Layer_2" data-name="Layer 2" viewBox="0 0 412.8 412.8"><defs/><g id="Layer_1-2" data-name="Layer 1"><path d="M343 137c-75 0-137-62-137-137 0 75-61 137-136 137 75 0 136 61 136 136 0-75 62-136 137-136M0 206c0 114 92 207 206 207 0-114-92-207-206-207M413 206c-114 0-207 93-207 207 114 0 207-93 207-207" class="cls-1"/></g></svg>
            <span>Verde Rosa</span>
          </div>
        </Link>

        <div className="center glass nav-center" ref={navRef}>
          <NavLink to="/" className="nav-item"><i class='bx bxs-home'></i> Home</NavLink>
          <NavLink to="/about" className="nav-item"><i class='bx bxs-help-circle'></i> About</NavLink>
          <NavLink to="/products" className="nav-item"><i class='bx bxs-store'></i> Bouquets</NavLink>
          <NavLink to="/donate" className="nav-item"><i class='bx bxs-leaf'></i> Sustainability</NavLink>
          
          <span className="nav-indicator" ref={indicatorRef}></span>
        </div>

        <div className="right glass nav-right" ref={rightNavRef}>
          <NavLink to="/search" className="right-item"><i className='bx bx-search'></i></NavLink>
          <NavLink to="/cart" className="right-item"><i className='bx bxs-cart'></i></NavLink>
          <NavLink to="/account" className="right-item"><i className='bx bxs-user-circle'></i></NavLink>

          <span className="right-indicator" ref={rightIndicatorRef}></span>
        </div>

      </div>
    </>
  );
}
