import { motion } from "framer-motion";
import "../styles/about.css";
import back2 from "../assets/back2.mp4";
import VideoBackground from "../components/videobackground.jsx";
export default function About(){
    return(
        <>
            <VideoBackground src={back2} />

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
        </>
    );
};



