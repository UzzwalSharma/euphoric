import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";

const FINAL_TEXT = "EUPHORIC";
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export default function Hero() {
  const [displayText, setDisplayText] = useState(
    Array(FINAL_TEXT.length).fill("")
  );
  const [isComplete, setIsComplete] = useState(false);
  const [gridOffset, setGridOffset] = useState({ x: 0, y: 0 });
  const [activeGridCells, setActiveGridCells] = useState(new Set());
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioData, setAudioData] = useState(Array(8).fill(0));
  
  const heroRef = useRef(null);
  const imageRef = useRef(null);
  const overlayRef = useRef(null);
  const audioRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);
  const animationFrameRef = useRef(null);

  // Initialize audio context and analyser
  const initAudio = () => {
    if (!audioContextRef.current && audioRef.current) {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const analyser = audioContext.createAnalyser();
      const source = audioContext.createMediaElementSource(audioRef.current);
      
      analyser.fftSize = 256;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      
      source.connect(analyser);
      analyser.connect(audioContext.destination);
      
      audioContextRef.current = audioContext;
      analyserRef.current = analyser;
      dataArrayRef.current = dataArray;
    }
  };

  // Analyze audio and update wave data
  const analyzeAudio = () => {
    if (analyserRef.current && dataArrayRef.current) {
      analyserRef.current.getByteFrequencyData(dataArrayRef.current);
      
      // Get 8 frequency bands for visualization
      const bands = 8;
      const bandSize = Math.floor(dataArrayRef.current.length / bands);
      const newAudioData = [];
      
      for (let i = 0; i < bands; i++) {
        const start = i * bandSize;
        const end = start + bandSize;
        const bandData = dataArrayRef.current.slice(start, end);
        const average = bandData.reduce((a, b) => a + b, 0) / bandData.length;
        newAudioData.push(average / 255); // Normalize to 0-1
      }
      
      setAudioData(newAudioData);
    }
    
    if (isPlaying) {
      animationFrameRef.current = requestAnimationFrame(analyzeAudio);
    }
  };

  // Toggle music playback
  const toggleMusic = async () => {
    if (!audioRef.current) return;
    
    if (!audioContextRef.current) {
      initAudio();
    }
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    } else {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
        analyzeAudio();
      } catch (err) {
        console.error("Audio play failed:", err);
      }
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  // GSAP Page Reveal Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      tl.fromTo(
        overlayRef.current,
        { 
          scaleY: 1,
          transformOrigin: "top"
        },
        {
          scaleY: 0,
          duration: 1.2,
          ease: "power4.inOut",
          delay: 0.2
        }
      )
      .fromTo(
        imageRef.current,
        {
          scale: 1.3,
          filter: "blur(20px)"
        },
        {
          scale: 1,
          filter: "blur(0px)",
          duration: 1.5,
          ease: "power3.out"
        },
        "-=0.8"
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Scramble effect for EUPHORIC
  useEffect(() => {
    let frame = 0;
    const maxFrames = 60;

    const interval = setInterval(() => {
      frame++;

      setDisplayText((prev) =>
        FINAL_TEXT.split("").map((letter, index) => {
          const startFrame = index * 4;
          const endFrame = startFrame + 35;

          if (frame < startFrame) {
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          }

          if (frame >= endFrame) {
            return letter;
          }

          const progress = (frame - startFrame) / (endFrame - startFrame);
          
          if (Math.random() < progress * progress) {
            return letter;
          }

          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
      );

      if (frame >= maxFrames) {
        clearInterval(interval);
        setDisplayText(FINAL_TEXT.split(""));
        setIsComplete(true);
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Playful grid animation
  useEffect(() => {
    const animateGrid = () => {
      setGridOffset({
        x: Math.sin(Date.now() / 2000) * 20,
        y: Math.cos(Date.now() / 3000) * 20,
      });
      requestAnimationFrame(animateGrid);
    };

    const rafId = requestAnimationFrame(animateGrid);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // Fast pixelate grid animation
  useEffect(() => {
    const interval = setInterval(() => {
      const numCellsToActivate = Math.floor(Math.random() * 15) + 10;
      const newActiveCells = new Set();
      
      for (let i = 0; i < numCellsToActivate; i++) {
        const cellId = `${Math.floor(Math.random() * 50)}-${Math.floor(Math.random() * 50)}`;
        newActiveCells.add(cellId);
      }
      
      setActiveGridCells(newActiveCells);
      
      setTimeout(() => {
        setActiveGridCells(new Set());
      }, 300);
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src="/m1.mp3" // Add your music file to public folder
        loop
        preload="auto"
      />

      {/* Background Illustration */}
      <div className="absolute inset-0">
        <img
          ref={imageRef}
          src="https://i.pinimg.com/1200x/09/43/76/094376618397bac0480bb1aa324cb346.jpg"
          alt="Euphoric Fest"
          className="w-full h-full object-cover"
        />
      </div>

      {/* GSAP Reveal Overlay */}
      <div 
        ref={overlayRef}
        className="absolute inset-0 bg-black z-50 pointer-events-none"
      />

      {/* Strong Cinematic Overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Playful Animated Grid Texture */}
      <div
        className="absolute inset-0 opacity-[0.06] transition-transform duration-300"
        style={{
          backgroundImage: `
            linear-gradient(to right, white 1px, transparent 1px),
            linear-gradient(to bottom, white 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          transform: `translate(${gridOffset.x}px, ${gridOffset.y}px)`,
        }}
      />

      {/* Fast Pixelate Grid Cells */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from(activeGridCells).map((cellId) => {
          const [row, col] = cellId.split('-').map(Number);
          return (
            <motion.div
              key={cellId}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.25, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute bg-white"
              style={{
                left: `${col * 80 + gridOffset.x}px`,
                top: `${row * 80 + gridOffset.y}px`,
                width: '80px',
                height: '80px',
              }}
            />
          );
        })}
      </div>

      {/* Music Visualizer - Top Right */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8 z-30"
      >
        <motion.button
          onClick={toggleMusic}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center cursor-pointer group"
        >
          {/* Center Play/Pause Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            {isPlaying ? (
              <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1H6a1 1 0 01-1-1V4zM11 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
              </svg>
            ) : (
              <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
              </svg>
            )}
          </div>

          {/* Circular Wave Visualizer */}
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
            {audioData.map((value, index) => {
              const angle = (index / audioData.length) * 360;
              const radius = 35 + value * 15; // Base radius + audio value
              const x = 50 + radius * Math.cos((angle * Math.PI) / 180);
              const y = 50 + radius * Math.sin((angle * Math.PI) / 180);
              
              return (
                <motion.circle
                  key={index}
                  cx={x}
                  cy={y}
                  r={isPlaying ? 1.5 + value * 2 : 1}
                  fill="white"
                  animate={{
                    opacity: isPlaying ? 0.6 + value * 0.4 : 0.3,
                    r: isPlaying ? 1.5 + value * 2 : 1,
                  }}
                  transition={{
                    duration: 0.1,
                    ease: "easeOut"
                  }}
                />
              );
            })}
            
            {/* Connecting lines between points */}
            <motion.path
              d={`M ${audioData.map((value, index) => {
                const angle = (index / audioData.length) * 360;
                const radius = 35 + value * 15;
                const x = 50 + radius * Math.cos((angle * Math.PI) / 180);
                const y = 50 + radius * Math.sin((angle * Math.PI) / 180);
                return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
              }).join(' ')} Z`}
              stroke="white"
              strokeWidth="0.5"
              fill="none"
              opacity={isPlaying ? 0.3 : 0.1}
            />
          </svg>

          {/* Pulse effect when playing */}
          {isPlaying && (
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-white/30"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          )}
        </motion.button>
      </motion.div>

      {/* Date - Top Left */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-4 left-4 sm:top-6 sm:left-6 md:top-8 md:left-8 lg:top-12 lg:left-12 z-20"
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-white/90">
          <span className="text-sm sm:text-base md:text-xl lg:text-2xl xl:text-3xl opacity-70 tracking-wider belanosima-bold">
            Upcoming
          </span>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <motion.span 
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold"
              whileHover={{ scale: 1.05, color: "#ffffff" }}
              transition={{ duration: 0.2 }}
            >
              Soon...
            </motion.span>
            <span className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl opacity-50">•</span>
          </div>
        </div>
      </motion.div>

      {/* Center Content */}
      <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center">

          {/* SGIT Presents */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 0.8, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="mb-4 sm:mb-6 md:mb-8"
          >
            <h2 className="text-white/80 text-xs sm:text-sm md:text-base lg:text-lg tracking-[0.4em] sm:tracking-[0.5em] md:tracking-[0.6em] uppercase belanosima-semibold">
              SGIT Presents
            </h2>
          </motion.div>

          {/* BIG TITLE with Scramble Effect */}
          <div className="relative w-full flex justify-center">
            <div className="relative inline-block">
              <h1 className="flex justify-center flex-wrap text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl 2xl:text-[10rem] belanosima-bold tracking-[0.1em] sm:tracking-[0.12em] md:tracking-[0.15em] text-white leading-none">
                {displayText.map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                      filter: "blur(0px)"
                    }}
                    transition={{ 
                      delay: 1.2 + i * 0.05,
                      duration: 0.6,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                    className="mx-0.5 sm:mx-1 inline-block"
                    style={{
                      textShadow: isComplete 
                        ? "0 0 30px rgba(255,255,255,0.3)" 
                        : "none"
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </h1>

              {/* 2026 - Positioned bottom right */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 2.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="absolute right-0 sm:right-1 md:right-2 top-full mt-1 sm:mt-2 md:mt-4"
              >
                <motion.span 
                  className="text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl belanosima-bold text-white/90"
                  whileHover={{ scale: 1.05, color: "#ffffff" }}
                  transition={{ duration: 0.2 }}
                >
                  2026
                </motion.span>
              </motion.div>
            </div>
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.1, duration: 0.8 }}
            className="belanosima-semibold mt-16 sm:mt-20 md:mt-24 lg:mt-32 xl:mt-40 text-gray-300 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl tracking-[0.2em] sm:tracking-[0.25em] md:tracking-[0.3em] uppercase"
          >
            A Sports & Cultural Festival
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5, duration: 0.8 }}
            className="mt-6 sm:mt-8 md:mt-10 flex justify-center gap-3 sm:gap-4 md:gap-5 flex-wrap"
          >
            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255,255,255,0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="px-6 sm:px-7 md:px-8 py-2.5 sm:py-3 md:py-3.5 bg-white text-black rounded-sm belanosima-regular hover:bg-gray-100 transition-colors text-xs sm:text-sm md:text-base cursor-pointer"
            >
              Explore Events
            </motion.button>
            <Link to="/register">
              <motion.button 
                whileHover={{ 
                  scale: 1.05, 
                  backgroundColor: "rgba(255,255,255,0.1)",
                  borderColor: "rgba(255,255,255,0.6)"
                }}
                whileTap={{ scale: 0.95 }}
                className="px-6 sm:px-7 md:px-8 py-2.5 sm:py-3 md:py-3.5 border-2 border-white/30 text-white rounded-sm belanosima-regular transition-colors text-xs sm:text-sm md:text-base cursor-pointer"
              >
                Register Now
              </motion.button>
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}