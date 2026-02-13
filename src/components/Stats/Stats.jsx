import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaVolumeUp, FaVolumeMute, FaArrowLeft, FaHeart, FaCalendar, FaStar, FaSmile } from "react-icons/fa";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./Stats.css";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Stats({ onBack }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [smileCount, setSmileCount] = useState(999999999);
  const [overthinkData, setOverthinkData] = useState([]);
  const audioRef = useRef(null);

  // Calculate days together (April 2022 to Feb 14, 2026)
  const startDate = new Date("2022-04-01");
  const currentDate = new Date("2026-02-14");
  const daysTogether = Math.floor((currentDate - startDate) / (1000 * 60 * 60 * 24));

  // Calculate days of love (April 2021 to Feb 14, 2026)
  const loveStartDate = new Date("2021-04-01");
  const daysOfLove = Math.floor((currentDate - loveStartDate) / (1000 * 60 * 60 * 24));

  // Generate random overthinking data for different hours of the day
  useEffect(() => {
    const generateOverthinkData = () => {
      const labels = ['12am', '3am', '6am', '9am', '12pm', '3pm', '6pm', '9pm', '11pm'];
      const aayurData = Array(9).fill(75); // Constant for Aayur
      // Kiki's wild overthinking pattern
      const kikiData = [30, 100, 70, 10, 100, 90, 100, 20, 80];
      return { labels, aayurData, kikiData };
    };

    setOverthinkData(generateOverthinkData());
  }, []);

  // Increment smile count by 1 every 2 seconds (FASTER!)
  useEffect(() => {
    const interval = setInterval(() => {
      setSmileCount((prev) => prev + 1);
    }, 2000); // Changed from 5000 to 2000

    return () => clearInterval(interval);
  }, []);

  // Auto-play stats music
  useEffect(() => {
    audioRef.current = new Audio("/assets/music/stats-music.mp3");
    audioRef.current.loop = true;

    audioRef.current.play().then(() => {
      setIsPlaying(true);
    }).catch((error) => {
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
      if (audioRef.current.paused) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch((error) => {
          console.log("Play failed:", error);
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  // Chart data configurations
  const wrongnessData = {
    labels: ['Kiki', 'Aayur'],
    datasets: [
      {
        label: 'Times Wrong',
        data: [100, 0],
        backgroundColor: ['#ff6b9d', '#c8b6b6'],
        borderColor: ['#ff4d6d', '#a89f9f'],
        borderWidth: 2,
      },
    ],
  };

  const loveData = {
    labels: ['YES', 'YES (in another shade)'],
    datasets: [
      {
        data: [75, 25],
        backgroundColor: ['#ff6b9d', '#ffc3d5'],
        borderColor: ['#ff4d6d', '#ffb3c6'],
        borderWidth: 2,
      },
    ],
  };

  const overthinkChartData = overthinkData.labels ? {
    labels: overthinkData.labels,
    datasets: [
      {
        label: 'Aayur\'s Overthinking',
        data: overthinkData.aayurData,
        borderColor: '#ff6b9d',
        backgroundColor: 'rgba(255, 107, 157, 0.2)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Kiki\'s Overthinking',
        data: overthinkData.kikiData,
        borderColor: '#c06c84',
        backgroundColor: 'rgba(192, 108, 132, 0.2)',
        tension: 0.4,
        fill: true,
      },
    ],
  } : null;

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          font: {
            family: "'Poppins', sans-serif",
            size: 10,
          },
          color: '#5c3d5c',
          padding: 8,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          font: {
            size: 10,
          },
        },
      },
      x: {
        ticks: {
          font: {
            size: 10,
          },
        },
      },
    },
  };

  return (
    <div className="stats-container">
      {/* Back Button */}
      <button className="stats-back-btn" onClick={onBack}>
        <FaArrowLeft /> Back
      </button>

      {/* Music Toggle Button */}
      <button className="stats-music-btn" onClick={toggleMusic}>
        {isPlaying ? <FaVolumeUp /> : <FaVolumeMute />}
      </button>

      {/* Header */}
      <motion.div
        className="stats-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="stats-title">Our Relationship Stats <span className="emoji-inline">💕</span></h1>
        <p className="stats-subtitle">The numbers don't lie... they're just extremely biased <span className="emoji-inline">😉</span></p>
      </motion.div>

      {/* KPI Section */}
      <motion.div
        className="kpi-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        {/* KPI 1: Days Together */}
        <motion.div
          className="kpi-card"
          whileHover={{ scale: 1.05, y: -5 }}
        >
          <div className="kpi-icon">
            <FaCalendar />
          </div>
          <div className="kpi-value">{daysTogether.toLocaleString()}</div>
          <div className="kpi-label">Days Together</div>
          <div className="kpi-note">& trillions more to come ∞</div>
        </motion.div>

        {/* KPI 2: Days of Love */}
        <motion.div
          className="kpi-card"
          whileHover={{ scale: 1.05, y: -5 }}
        >
          <div className="kpi-icon">
            <FaHeart />
          </div>
          <div className="kpi-value">{daysOfLove.toLocaleString()}</div>
          <div className="kpi-label">Days I've Loved You</div>
          <div className="kpi-note">in my head before we dated<br />mein sankee hu <span className="emoji-inline">🙈</span></div>
        </motion.div>

        {/* KPI 3: Rating */}
        <motion.div
          className="kpi-card"
          whileHover={{ scale: 1.05, y: -5 }}
        >
          <div className="kpi-icon">
            <FaStar />
          </div>
          <div className="kpi-value">11/10</div>
          <div className="kpi-label">Relationship Rating</div>
          <div className="kpi-note">Eleven <span className="emoji-inline">😉</span></div>
        </motion.div>

        {/* KPI 4: Smiles */}
        <motion.div
          className="kpi-card"
          whileHover={{ scale: 1.05, y: -5 }}
        >
          <div className="kpi-icon">
            <FaSmile />
          </div>
          <div className="kpi-value">{smileCount.toLocaleString()}</div>
          <div className="kpi-label">Number of Smiles</div>
          <div className="kpi-note">you're still smiling while looking at this <span className="emoji-inline">😊</span></div>
        </motion.div>
      </motion.div>

      {/* Charts Section */}
      <motion.div
        className="charts-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        {/* Chart 1: Who's Wrong */}
        <motion.div
          className="chart-card"
          whileHover={{ y: -10 }}
        >
          <h3 className="chart-title">Who Was Wrong? <span className="emoji-inline">🤔</span></h3>
          <div className="chart-wrapper">
            <Bar data={wrongnessData} options={chartOptions} />
          </div>
          <p className="chart-footnote">*Data collected with 100% accuracy and 0% bias</p>
        </motion.div>

        {/* Chart 2: Love Breakdown */}
        <motion.div
          className="chart-card"
          whileHover={{ y: -10 }}
        >
          <h3 className="chart-title">Do I Love You to the Moon & Back? <span className="emoji-inline">🌙</span></h3>
          <div className="chart-wrapper doughnut-wrapper">
            <Doughnut 
              data={loveData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom',
                    labels: {
                      font: {
                        family: "'Poppins', sans-serif",
                        size: 11,
                      },
                      color: '#5c3d5c',
                      padding: 8,
                    },
                  },
                },
              }} 
            />
          </div>
          <p className="chart-footnote">*100% YES, just in different shades of love</p>
        </motion.div>

        {/* Chart 3: Overthinking Levels */}
        <motion.div
          className="chart-card full-width"
          whileHover={{ y: -10 }}
        >
          <h3 className="chart-title">Overthinking Levels Throughout the Day <span className="emoji-inline">🧠</span></h3>
          <div className="chart-wrapper">
            {overthinkChartData && (
              <Line data={overthinkChartData} options={chartOptions} />
            )}
          </div>
          <p className="chart-footnote">*Overthinking Couple issa</p>
        </motion.div>
      </motion.div>
    </div>
  );
}