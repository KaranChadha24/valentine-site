import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import "./Landing.css";

function Landing({ onYes }) {
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef(null);

  const moveNoButton = () => {
    const x = Math.random() * 300 - 150;
    const y = Math.random() * 200 - 100;
    setNoPosition({ x, y });
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying((prev) => !prev);
    }
  };

  useEffect(() => {
    audioRef.current = new Audio("/assets/music/bg-music.mp3");
    audioRef.current.loop = true;
    
    audioRef.current.play().catch((error) => {
      console.log("Autoplay was prevented:", error);
      setIsPlaying(false);
    });

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const handleYes = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    onYes();
  };

  return (
    <div className="landing-container">
      {/* Decorative floating hearts */}
      <div className="heart-deco">💝</div>
      <div className="heart-deco">❤️</div>
      <div className="heart-deco">💗</div>
      <div className="heart-deco">💓</div>
      
      {/* Music Toggle Button */}
      <button className="music-btn" onClick={toggleMusic}>
        {isPlaying ? <FaVolumeUp /> : <FaVolumeMute />}
      </button>

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        🎉 Happy Birthday ❤️
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        Will you remain my Valentine?
      </motion.p>

      <div className="button-group">
        <motion.button
          className="yes-btn"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleYes}
        >
          Yes 💖
        </motion.button>

        <motion.button
          className="no-btn"
          animate={{ x: noPosition.x, y: noPosition.y }}
          transition={{ type: "spring", stiffness: 300 }}
          onMouseEnter={moveNoButton}
        >
          No 😤
        </motion.button>
      </div>
    </div>
  );
}

export default Landing;