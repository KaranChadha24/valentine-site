import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { FaVolumeUp, FaVolumeMute, FaArrowLeft } from "react-icons/fa";
import "./Timeline.css";

export default function Timeline({ onBack }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [pageHeight, setPageHeight] = useState(7200);
  const audioRef = useRef(null);
  const contentRef = useRef(null);

  // Handle window resize and measure full page height
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      
      // Get the actual height of the timeline content
      if (contentRef.current) {
        setPageHeight(contentRef.current.scrollHeight);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    
    // Update page height after content loads
    const timer = setTimeout(handleResize, 100);
    
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer);
    };
  }, []);

  // Your love story timeline
  const memories = [
    {
      date: "April 2022",
      image: "/assets/images/timeline1.jpeg",
      description: "Our First Picture Together 📸",
      position: 50
    },
    {
      date: "May 2022",
      image: "/assets/images/timeline2.jpeg",
      description: "Our First Date 🌹",
      position: 750
    },
    {
      date: "Winter 2022",
      image: "/assets/images/timeline3.jpeg",
      description: "Farewell Day 🎓",
      position: 1450
    },
    {
      date: "Winter 2022",
      image: "/assets/images/timeline4.jpeg",
      description: "First Dinner Together 🍽️",
      position: 2150
    },
    {
      date: "Winter 2023",
      image: "/assets/images/timeline5.jpeg",
      description: "Long Distance Love 📱💌",
      position: 2850
    },
    {
      date: "Summer 2024",
      image: "/assets/images/timeline6.jpeg",
      description: "Summer Holidays (Peace) ☀️",
      position: 3550
    },
    {
      date: "Summer 2025",
      image: "/assets/images/timeline7.jpeg",
      description: "First Official Family Meeting 👨‍👩‍👧‍👦",
      position: 4250
    },
    {
      date: "Summer 2025",
      image: "/assets/images/timeline8.jpeg",
      description: "Summer Memories 🌺",
      position: 4950
    },
    {
      date: "Winter 2025",
      image: "/assets/images/timeline9.jpeg",
      description: "My fav days of our whole relationship ❄️",
      position: 5650
    },
    {
      date: "Winter 2025",
      image: "/assets/images/timeline10.jpeg",
      description: "Kiki's First Birthday Physically Together 🎂",
      position: 6350
    }
  ];

  // Auto-play timeline music
  useEffect(() => {
    audioRef.current = new Audio("/assets/music/timeline-music.mp3");
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
    <div className="timeline-container" ref={contentRef}>
      {/* Confetti effect - covers entire page height */}
      <Confetti
        width={windowSize.width}
        height={pageHeight}
        recycle={true}
        numberOfPieces={150}
        colors={["#ff6b9d", "#ff8fab", "#ffc3d5", "#ffe0e9", "#c06c84", "#8bc34a"]}
        gravity={0.08}
        style={{ position: 'absolute' }}
      />

      {/* Back Button */}
      <button className="timeline-back-btn" onClick={onBack}>
        <FaArrowLeft /> Back
      </button>

      {/* Music Toggle Button */}
      <button className="timeline-music-btn" onClick={toggleMusic}>
        {isPlaying ? <FaVolumeUp /> : <FaVolumeMute />}
      </button>

      {/* Header */}
      <motion.div
        className="timeline-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="timeline-title">Our Story 💕</h1>
      </motion.div>

      {/* Timeline Content */}
      <div className="timeline-content">
        {/* The wavy vine SVG */}
        <svg className="timeline-vine-svg" viewBox="0 0 400 7000" preserveAspectRatio="xMidYMin meet">
          <defs>
            <linearGradient id="vineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#8bc34a', stopOpacity: 1 }} />
              <stop offset="50%" style={{ stopColor: '#689f38', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#7cb342', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          <path
            d="M 200 0 
               Q 280 350, 200 700
               Q 120 1050, 200 1400
               Q 280 1750, 200 2100
               Q 120 2450, 200 2800
               Q 280 3150, 200 3500
               Q 120 3850, 200 4200
               Q 280 4550, 200 4900
               Q 120 5250, 200 5600
               Q 280 5950, 200 6300
               Q 120 6650, 200 7000"
            stroke="url(#vineGradient)"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
          />
        </svg>

        {/* Timeline items positioned at exact vine points */}
        {memories.map((memory, index) => (
          <motion.div
            key={index}
            className={`timeline-item ${index % 2 === 0 ? 'right' : 'left'}`}
            style={{ top: `${memory.position}px` }}
            initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Memory card */}
            <div className="timeline-card">
              <div className="timeline-image">
                <img src={memory.image} alt={memory.description} />
              </div>
              <span className="timeline-date">{memory.date}</span>
              <p className="timeline-description">{memory.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}