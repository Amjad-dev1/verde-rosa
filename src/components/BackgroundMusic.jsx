import { useEffect, useRef, useState } from "react";
import { Play, Pause } from "lucide-react"; // optional icons
import music from "../assets/music/background.mp3";

export default function BackgroundMusic() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    audioRef.current = new Audio(music);
    audioRef.current.loop = true;

    return () => {
      audioRef.current.pause();
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        left: "20px",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        background: "rgba(0,0,0,0.4)",
        padding: "10px 14px",
        borderRadius: "50px",
        backdropFilter: "blur(6px)",
        cursor: "pointer",
      }}
      onClick={togglePlay}
    >
      {isPlaying ? <Pause size={22} color="white" /> : <Play size={22} color="white" />}
      <span style={{ color: "white", marginLeft: "8px" }}>
        {isPlaying ? "Pause" : "Play"}
      </span>
    </div>
  );
}
