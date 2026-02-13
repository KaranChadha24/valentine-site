import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import "./Celebrate.css";

export default function Celebrate({ onTimeline, onBirthday, onStats }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const audioRef = useRef(null);

  // Handle window resize for confetti
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-play celebration music
  useEffect(() => {
    audioRef.current = new Audio("/assets/music/celebrate-music.mp3");
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

  // Toggle music
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

  return (
    <div className="celebrate-container">
      {/* Confetti animation */}
      <Confetti
        width={windowSize.width}
        height={windowSize.height}
        recycle={true}
        numberOfPieces={200}
        colors={["#ff6b9d", "#ff8fab", "#ffc3d5", "#ffe0e9", "#c06c84"]}
      />

      {/* Music Toggle Button */}
      <button className="celebrate-music-btn" onClick={toggleMusic}>
        {isPlaying ? <FaVolumeUp /> : <FaVolumeMute />}
      </button>

      {/* Decorative floating hearts */}
      <div className="celebrate-heart-deco">💝</div>
      <div className="celebrate-heart-deco">❤️</div>
      <div className="celebrate-heart-deco">💗</div>
      <div className="celebrate-heart-deco">💓</div>

      {/* Main content */}
      <motion.div
        className="celebrate-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 120, delay: 0.2 }}
          className="celebrate-title"
        >
          YAYAYAYAYAYAYAY! 💖✨
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="celebrate-subtitle"
        >
         I knew you would say yes! 🎉
        </motion.p>

        {/* Button group */}
        <motion.div
          className="celebrate-buttons"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <motion.button
            className="celebrate-btn timeline-btn"
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={onTimeline}
          >
            <span className="btn-icon">📅</span>
            <span className="btn-text">Our Timeline</span>
          </motion.button>


          <motion.button
            className="celebrate-btn stats-btn"
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={onStats}
          >
            <span className="btn-icon">📊</span>
            <span className="btn-text">Our Stats</span>
          </motion.button>
          <motion.button
            className="celebrate-btn quiz-btn"
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBirthday}
          >
            <span className="btn-icon">🎂</span>
            <span className="btn-text">Birthday Surprise</span>
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}