import { motion } from "framer-motion";
import "../styles/nav.css";
import "../styles/glass.css";
import "../styles/index.css";
import "../styles/video.css";
import back from "../assets/back.mp4";

export default function Donate(){
    return(
        <motion.div
      initial={{ opacity: 0, backdropFilter: "blur(20px)" }}
      animate={{ opacity: 1, backdropFilter: "blur(0px)" }}
      exit={{ opacity: 0, backdropFilter: "blur(20px)" }}
      transition={{ duration: 0.3 }}
      className="page"
    >
        <div className="video-container">
            <video
                autoPlay
                muted
                loop
                playsInline
                className="background-video">
                <source src={back} type="video/mp4" />
            </video>
        </div>
        </motion.div>
    );
};

