import { motion } from "framer-motion";
import "../styles/nav.css";
import "../styles/glass.css";
import "../styles/about.css";
import "../styles/index.css";
import "../styles/video.css";
import back2 from "../assets/back2.mp4";
export default function About(){
    return(
         <motion.div
      initial={{ opacity: 0, backdropFilter: "blur(20px)" }}
      animate={{ opacity: 1, backdropFilter: "blur(0px)" }}
      exit={{ opacity: 0, backdropFilter: "blur(20px)" }}
      transition={{ duration: 0.3 }}
      className="page">
            <div className="video-container">
                <video autoPlay muted loop playsInline className="background-video">
                    <source src={back2} type="video/mp4" />
                </video>
            </div>
            <div className="about-card glass">
                <h1>Verde Rosa — Where Nature Meets Art</h1>
                <p>
                At Verde Rosa, we believe flowers are more than decoration—they are
                emotion, memory, and meaning wrapped in petals.
                </p>
                <p>
                Founded through a passion for botanical design, our shop blends modern
                floral artistry with natural beauty. Every arrangement tells a story.
                </p>
                <h2>What Makes Us Unique</h2>
                <ul>
                <li>Hand-picked daily flowers from local growers</li>
                <li>Custom arrangements for every mood and moment</li>
                <li>Eco-friendly packaging</li>
                <li>Signature Verde & Rosa palettes</li>
                </ul>
            </div>
        </motion.div>
    );
};



