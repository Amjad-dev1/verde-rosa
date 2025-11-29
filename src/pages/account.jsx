import React, { useState, useEffect } from "react";
import "../styles/account.css";
import VideoBackground from "../components/videobackground.jsx";
import back6 from "../assets/back6.mp4";
import Login from "../components/login.jsx";
import Register from "../components/register.jsx";
import UserDashboard from "../components/userdashboard.jsx";

export default function Account() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/api/session_check.php", {
      credentials: "include",
    })
      .then((r) => r.json())
      .then((data) => {
        setLoggedIn(data.logged_in);
      });
  }, []);

  return (
    <>
      <div className="content">
        {loggedIn ? (
          <UserDashboard />
        ) : showLogin ? (
          <Login onSwitch={() => setShowLogin(false)} />
        ) : (
          <Register onSwitch={() => setShowLogin(true)} />
        )}
      </div>

      <VideoBackground src={back6} />
    </>
  );
}
