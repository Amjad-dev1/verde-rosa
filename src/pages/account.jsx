import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "../styles/account.css";
import "../styles/index.css";
import "../styles/video.css";
import back6 from "../assets/back6.mp4";
import Login from "../components/login.jsx";

export default function Account() {
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const vid = document.createElement("video");
    vid.src = back6;
    vid.preload = "auto";

    vid.oncanplaythrough = () => {
      setVideoReady(true);
    };
  }, []);

  if (!videoReady) {
    return <div className="loading-screen">Loading...</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, backdropFilter: "blur(20px)" }}
      animate={{ opacity: 1, backdropFilter: "blur(0px)" }}
      exit={{ opacity: 0, backdropFilter: "blur(20px)" }}
      transition={{ duration: 0.3 }}
      className="page"
    >
      <Login />

      <div className="video-container">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="background-video"
        >
          <source src={back6} type="video/mp4" />
        </video>
      </div>
    </motion.div>
  );
}
