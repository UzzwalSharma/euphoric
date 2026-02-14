import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useState, useEffect } from "react";

export default function ScrollProgress() {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  
  // Smooth spring animation for the progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Transform progress to circle path (0 to 1 becomes 0 to 283 - circumference of circle)
  const pathLength = useTransform(smoothProgress, [0, 1], [0, 1]);

  // Show/hide based on scroll position
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (latest > 0.05) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0
      }}
      transition={{
        duration: 0.3,
        ease: "easeOut"
      }}
      className="fixed bottom-6 right-6 z-50"
      style={{
        pointerEvents: isVisible ? "auto" : "none"
      }}
    >
      <motion.button
        onClick={scrollToTop}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="relative w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-0.5 cursor-pointer shadow-lg hover:shadow-2xl transition-shadow group"
      >
        {/* Inner circle */}
        <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
          {/* Arrow up icon */}
          <motion.svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </motion.svg>
        </div>

        {/* Progress circle */}
        <svg
          className="absolute inset-0 w-full h-full -rotate-90"
          viewBox="0 0 50 50"
        >
          {/* Background circle */}
          <circle
            cx="25"
            cy="25"
            r="22"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="2"
            fill="none"
          />
          
          {/* Progress circle */}
   
<motion.circle
  cx="25"
  cy="25"
  r="22"
  stroke="url(#gradient)"
  strokeWidth="2.5"
  fill="none"
  strokeLinecap="round"
  strokeDasharray="138.23 138.23"
  strokeDashoffset={0}
  style={{
    pathLength: pathLength,
  }}
/>
          
          {/* Gradient definition */}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="50%" stopColor="#ec4899" />
              <stop offset="100%" stopColor="#ef4444" />
            </linearGradient>
          </defs>
        </svg>

        {/* Glow effect on hover */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 opacity-0 group-hover:opacity-50 blur-xl transition-opacity pointer-events-none"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.button>

      {/* Percentage text (optional) */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 10 }}
        transition={{ delay: 0.2 }}
        className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-sm px-2 py-1 rounded text-white text-xs belanosima-bold whitespace-nowrap"
      >
        {Math.round(smoothProgress.get() * 100)}%
      </motion.div>
    </motion.div>
  );
}