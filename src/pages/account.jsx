import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "../styles/account.css";
import VideoBackground from "../components/videobackground.jsx";
import back6 from "../assets/back6.mp4";
import Login from "../components/login.jsx";

export default function Account() {
  return (
    <>
      <Login />
      <VideoBackground src={back6} />
    </>
  );
}
