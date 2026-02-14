import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const gradientTextStyle = `
.curved-text-container {
  position: relative;
  width: 100%;
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
}

@media (min-width: 768px) {
  .curved-text-container {
    height: 300px;
  }
}

.euphoric-outline {
  color: transparent;
  -webkit-text-stroke: 2px rgba(255,255,255,0.6);
}

.euphoric-fill {
  color: white;
}
`;


export default function Welcome() {
  const [showIntro, setShowIntro] = useState(true);
  const [showEuphoric, setShowEuphoric] = useState(false);
  const [loading, setLoading] = useState(0);
  const [burstComplete, setBurstComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 2100);
    const euphoricTimer = setTimeout(() => setShowEuphoric(true), 3200);
    const burstTimer = setTimeout(() => setBurstComplete(true), 4200);
    return () => {
      clearTimeout(timer);
      clearTimeout(euphoricTimer);
      clearTimeout(burstTimer);
    };
  }, []);

  useEffect(() => {
    if (burstComplete) {
      setLoading(0);
      const interval = setInterval(() => {
        setLoading((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 100 / 28;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [burstComplete]);

  // Render EUPHORIC with professional burst-to-horizontal animation
  const renderEuphoric = () => {
    const text = "EUPHORIC";
    const letters = text.split("");
    const totalLetters = letters.length;
   const colors = ['#00f5ff', '#7b2ff7', '#f72585', '#ff6d00', '#ffd60a', '#00f5ff'];
    
    // Calculate spacing between letters for horizontal layout
    const letterSpacing = window.innerWidth < 768 ? 45 : 65; // Adjust based on screen size
    const totalWidth = (totalLetters - 1) * letterSpacing;
    
    return letters.map((letter, i) => {
      // Horizontal position calculation (centered)
      const xPos = (i * letterSpacing) - (totalWidth / 2);
      const yPos = 0; // Keep vertical center
      
      // Random burst position
      const burstAngle = (Math.random() - 0.5) * 360;
      const burstDistance = 150 + Math.random() * 100;
      const burstX = Math.cos(burstAngle * Math.PI / 180) * burstDistance;
      const burstY = Math.sin(burstAngle * Math.PI / 180) * burstDistance;
      
      const isFilled = (i / totalLetters) * 100 <= loading;
      const letterColor = colors[i % colors.length];

      return (
        <motion.span
          key={i}
          className={`bungee absolute text-6xl md:text-8xl ${isFilled ? 'euphoric-fill' : 'euphoric-outline'}

          }`}
          style={{
            left: '50%',
            top: '50%',
          }}
          initial={{ 
            x: 0,
            y: 0,
            scale: 0,
            opacity: 0,
            rotate: 0,
          }}
          animate={burstComplete ? {
            // Assemble into horizontal line
            x: xPos,
            y: yPos,
            scale: 1,
            opacity: 1,
            rotate: 0,
          } : {
            // Burst explosion effect
            x: burstX,
            y: burstY,
            scale: [0, 1.5, 1.2],
            opacity: 1,
            rotate: [0, (Math.random() - 0.5) * 360],
          }}
          transition={{
            duration: burstComplete ? 0.8 : 0.6,
            delay: burstComplete ? i * 0.05 : i * 0.08,
            type: "spring",
            stiffness: burstComplete ? 100 : 150,
            damping: burstComplete ? 15 : 10,
          }}
        >
          <motion.span
            animate={!burstComplete ? {
              textShadow: [
                `0 0 20px ${letterColor}`,
                `0 0 40px ${letterColor}`,
                `0 0 20px ${letterColor}`,
              ],
            } : {}}
            transition={{
              duration: 0.5,
              repeat: burstComplete ? 0 : Infinity,
              repeatType: "reverse",
            }}
          >
            {letter}
          </motion.span>
        </motion.span>
      );
    });
  };

  return (
    <div className="w-full h-screen bg-black p-2 md:p-4 lg:p-2">
      <div className="relative w-full h-full overflow-hidden border border-white/40 rounded-md md:rounded-md lg:rounded-md">
        <div className="absolute inset-0 md:rounded-2xl lg:rounded-3xl border border-white pointer-events-none"></div>
        <style>{gradientTextStyle}</style>

        {/* ---------------- INTRO GIF ---------------- */}
        <AnimatePresence>
          {showIntro && (
            <motion.div
              key="intro"
              className="absolute inset-0 z-50"
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 1 }}
            >
              <img
                src="/bowler.gif"
                alt="Bowler Throw"
                className="w-full h-full object-cover"
              />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className="absolute left-8 md:left-16 top-1/4 "
          initial={{ x: -100, opacity: 0 }}
          animate={{
            x: showIntro ? -100 : 0,
            opacity: showIntro ? 0 : 1,
          }}
          transition={{ delay: 0.4, duration: 1.2, ease: "easeOut" }}
        >
          {/* Subtle glow effect */}
          <motion.div
            className="absolute inset-0 bg-orange-400/30 rounded-full blur-2xl"
            animate={{
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* ---------------- MAIN TEXT ---------------- */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          {/* SGIT */}
          <motion.h1
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: showIntro ? 0 : 1, rotate: showIntro ? -10 : 0 }}
            transition={{ type: "spring", stiffness: 120, delay: 0.2 }}
            className="text-5xl md:text-7xl bungee tracking-wide gradient-text text-white"
            style={{ marginTop: '-80px' }}
          >
            SGIT's
          </motion.h1>

          {/* EUPHORIC - Curved Text with Burst Animation */}
          <AnimatePresence>
            {showEuphoric && (
              <motion.div
                className="curved-text-container"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {renderEuphoric()}
              </motion.div>
            )}
          </AnimatePresence>

          {/* WELCOME SUBTITLE — appears AFTER loading completes */}
          <AnimatePresence>
            {loading >= 100 && (
              <motion.p
                key="welcome"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                className="text-lg md:text-2xl text-gray-200 mt-4 tracking-wide font-light belanosima-semibold"
              >
                Welcome to the carnival of sound and sensations!
              </motion.p>
            )}
          </AnimatePresence>

          {/* LOADING BAR */}
          {burstComplete && loading < 100 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-64 md:w-80 mt-8"
            >
              <div className="text-[35px] text-white/80 mb-2 belanosima-semibold tracking-wide">
                <motion.span
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{
                    background: 'linear-gradient(90deg, #ff00cc, #ff4d00, #ffd60a, #00bbf9, #9b5de5, #f15bb5)',
                    backgroundSize: '200% 100%',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  LOADING
                </motion.span>
                <div className="text-white">{Math.round(loading)}%</div>
              </div>
            </motion.div>
          )}

          {/* ENTER BUTTON */}
          <AnimatePresence>
            {loading >= 100 && (
              <Link to="/home">
                <motion.button
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    scale: 1,
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 0 30px rgba(255, 255, 255, 0.3)",
                  }}
                  transition={{ duration: 0.6, type: "spring" }}
                  className="mt-8 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white rounded-sm text-white tracking-wider hover:bg-white/20 transition-all duration-300 belanosima-semibold cursor-pointer"
                >
                  ENTER FEST →
                </motion.button>
              </Link>
            )}
          </AnimatePresence>
        </div>

        {/* ---------------- CHEERING CROWD ---------------- */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: showIntro ? 0 : 1 }}
          transition={{ delay: 1.2, duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0 w-full h-full z-0 pointer-events-none"
        >
          <img
            src="https://i.pinimg.com/1200x/17/11/82/171182d06f9b24a182772580ea7fae2b.jpg"
            alt="Crowd"
            className="w-full h-full object-cover"
          />

          {/* Dark cinematic overlay for text visibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40"></div>
        </motion.div>
      </div>
    </div>
  );
}