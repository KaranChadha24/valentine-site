import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaVolumeUp, FaVolumeMute, FaArrowLeft, FaLightbulb } from "react-icons/fa";
import Confetti from "react-confetti";
import "./BirthdaySurprise.css";

export default function BirthdaySurprise({ onBack }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [lightsOn, setLightsOn] = useState(false);
  const [decorations, setDecorations] = useState(false);
  const [cakeOpen, setCakeOpen] = useState(false);
  const [candleLit, setCandleLit] = useState(false);
  const [wishMade, setWishMade] = useState(false);
  const [letterShown, setLetterShown] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const audioRef = useRef(null);

  // Handle window resize
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

  // Auto-play birthday music
  useEffect(() => {
    audioRef.current = new Audio("/assets/music/birthday-music.mp3");
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

  const handleLightsOn = () => {
    setLightsOn(true);
  };

  const handleDecorations = () => {
    setDecorations(true);
  };

  const handleOpenCake = () => {
    setCakeOpen(true);
  };

  const handleLightCandle = () => {
    setCandleLit(true);
  };

  const handleBlowCandle = () => {
    setCandleLit(false);
    setWishMade(true);
  };

  const handleShowLetter = () => {
    setLetterShown(true);
  };

  return (
    <div className={`birthday-container ${lightsOn ? 'lights-on' : 'lights-off'}`}>
      {/* Confetti when decorations are added */}
      {decorations && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={true}
          numberOfPieces={decorations ? 150 : 0}
          colors={["#ff6b9d", "#ff8fab", "#ffc3d5", "#e0b0ff", "#dda0dd"]}
        />
      )}

      {/* Back Button */}
      <button className="birthday-back-btn" onClick={onBack}>
        <FaArrowLeft /> Back
      </button>

      {/* Music Toggle Button */}
      <button className="birthday-music-btn" onClick={toggleMusic}>
        {isPlaying ? <FaVolumeUp /> : <FaVolumeMute />}
      </button>

      {/* Decorative hearts when decorations added */}
      {decorations && (
        <>
          <div className="birthday-heart-deco">💝</div>
          <div className="birthday-heart-deco">❤️</div>
          <div className="birthday-heart-deco">💗</div>
          <div className="birthday-heart-deco">💓</div>
          <div className="birthday-heart-deco">💕</div>
          <div className="birthday-heart-deco">💖</div>
        </>
      )}

      {/* Main Content */}
      <div className="birthday-content">
        {/* Step 0: Turn on lights */}
        {!lightsOn && (
          <motion.div
            className="birthday-step"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.h1 className="birthday-title dark-text">
              🎂 Birthday Surprise Room 🎂
            </motion.h1>
            <motion.p className="birthday-instruction dark-text">
              It's dark in here... Let's turn on the lights!
            </motion.p>
            <motion.button
              className="birthday-action-btn"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLightsOn}
            >
              <FaLightbulb /> Turn On Lights
            </motion.button>
          </motion.div>
        )}

        {/* Step 1: Add decorations */}
        {lightsOn && !decorations && (
          <motion.div
            className="birthday-step"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h1 className="birthday-title">
              Lights are on! ✨
            </motion.h1>
            <motion.p className="birthday-instruction">
              Now let's make this place festive!
            </motion.p>
            <motion.button
              className="birthday-action-btn"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDecorations}
            >
              🎈 Add Decorations
            </motion.button>
          </motion.div>
        )}

        {/* Step 2: Open cake box */}
        {decorations && !cakeOpen && (
          <motion.div
            className="birthday-step"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <motion.h1 className="birthday-title">
              So Beautiful! 💕
            </motion.h1>
            <motion.p className="birthday-instruction">
              There's a mysterious box here...
            </motion.p>
            <div className="cake-box closed">
              <div className="box-lid">🎁</div>
            </div>
            <motion.button
              className="birthday-action-btn"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpenCake}
            >
              📦 Open the Box
            </motion.button>
          </motion.div>
        )}

        {/* Step 3: Light the candle */}
        {cakeOpen && !candleLit && !wishMade && (
          <motion.div
            className="birthday-step"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <motion.h1 className="birthday-title">
              It's a Cake! 🎂
            </motion.h1>
            <motion.p className="birthday-instruction">
              Let's light the candle!
            </motion.p>
            <div className="cake-display">
              <div className="cake">
                🎂
                <div className="candle unlit">🕯️</div>
              </div>
            </div>
            <motion.button
              className="birthday-action-btn"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLightCandle}
            >
              🔥 Light the Candle
            </motion.button>
          </motion.div>
        )}

        {/* Step 4: Make a wish and blow */}
        {candleLit && !wishMade && (
          <motion.div
            className="birthday-step"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.h1 className="birthday-title">
              Make a Wish! ✨
            </motion.h1>
            <motion.p className="birthday-instruction">
              Close your eyes, make a wish, and blow the candle!
            </motion.p>
            <div className="cake-display">
              <div className="cake">
                🎂
                <motion.div 
                  className="candle lit"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 0.5 }}
                >
                  🕯️
                  <div className="flame">🔥</div>
                </motion.div>
              </div>
            </div>
            <motion.button
              className="birthday-action-btn"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBlowCandle}
            >
              💨 Blow the Candle
            </motion.button>
          </motion.div>
        )}

        {/* Step 5: Hug and Letter (shown together after wish) */}
        {wishMade && !letterShown && (
          <motion.div
            className="birthday-step"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <motion.h1 className="birthday-title">
              A Hug From Me! 🤗
            </motion.h1>
            <motion.div 
              className="polaroid"
              initial={{ rotate: -5, y: 50 }}
              animate={{ rotate: 0, y: 0 }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              <div className="polaroid-image">
                <img src="/assets/images/hug.jpeg" alt="Our Hug" />
              </div>
              <div className="polaroid-caption">
                Us 💕
              </div>
            </motion.div>
            <motion.button
              className="birthday-action-btn"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleShowLetter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              💌 Read My Message
            </motion.button>
          </motion.div>
        )}

        {/* Step 6: Letter */}
        {letterShown && (
          <motion.div
            className="birthday-step letter-step"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div 
              className="letter-container"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              <div className="letter-header">
                <h2>Dear Dharam Patni Ji 💕</h2>
              </div>
              <div className="letter-body">
                <p>
                  Happy Birthday to the most amazing person in my life! 🎂✨
                </p>
                <p>
                  From the moment we met, you've filled my days with laughter, 
                  love, and countless beautiful memories. Every moment with you 
                  feels like a gift, and I'm so grateful to have you by my side.
                </p>
                <p>
                  You make even the ordinary days extraordinary. Your smile 
                  brightens my darkest days, and your love gives me strength 
                  when I need it most.
                </p>
                <p>
                  On this special day, I want you to know how much you mean to me. 
                  You're not just my valentine, you're my best friend, my partner 
                  in crime, and my forever person.
                </p>
                <p>
                  Here's to another year of adventures, inside jokes, late-night 
                  conversations, and all the little moments that make us, US.
                </p>
                <p className="letter-closing">
                  I love you to the moon and back, and then some more! 🌙💖
                </p>
                <p className="letter-signature">
                  Forever yours,<br />
                  Kiki 💕
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}