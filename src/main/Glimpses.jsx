import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function GlimpsesCarousel() {
  const [scrollX, setScrollX] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const glimpses = [
    {
      id: 2,
      image: "/bball.png",
      title: "Basketball Finals",
      category: "Sports",
      year: "2025",
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: 3,
      image: "/volley.png",
      title: "Volley ball",
      category: "sports",
      year: "2025",
      color: "from-orange-500 to-red-500",
    },
    {
      id: 4,
      image: "/cricket.png",
      title: "Cricket Match",
      category: "Sports",
      year: "2025",
      color: "from-green-500 to-emerald-500",
    },
    {
      id: 5,
      image: "/pre.png",
      title: "Faculty games",
      category: "cultural",
      year: "2025",
      color: "from-yellow-500 to-orange-500",
    },
  ];

  // Preload images
  useEffect(() => {
    const imagePromises = glimpses.map((glimpse) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = glimpse.image;
        img.onload = resolve;
        img.onerror = reject;
      });
    });

    Promise.all(imagePromises)
      .then(() => setImagesLoaded(true))
      .catch(() => setImagesLoaded(true)); // Still show even if some fail
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setScrollX((prev) => prev - 1);
    }, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen w-full py-12 sm:py-16 md:py-20 lg:py-32 bg-black overflow-hidden flex flex-col items-center justify-between">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Base grid pattern */}
        <div className="absolute inset-0 opacity-20">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
              `,
              backgroundSize: "80px 80px",
            }}
          />
        </div>

        {/* Animated gradient overlay on grid */}
        <motion.div
          className="absolute inset-0"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 50%, rgba(236, 72, 153, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 50% 80%, rgba(34, 211, 238, 0.1) 0%, transparent 50%)
            `,
            backgroundSize: "200% 200%",
          }}
        />

        {/* Glowing grid lines */}
        <motion.div
          className="absolute inset-0"
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(139, 92, 246, 0.2) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(139, 92, 246, 0.2) 1px, transparent 1px)
              `,
              backgroundSize: "80px 80px",
            }}
          />
        </motion.div>

        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-gradient-to-br from-purple-500/10 to-transparent blur-3xl" />
        <div className="absolute bottom-0 right-0 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-gradient-to-tl from-pink-500/10 to-transparent blur-3xl" />
        <div className="absolute top-0 right-0 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-gradient-to-bl from-cyan-500/10 to-transparent blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 w-full flex-grow flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20"
        >
          <motion.h2
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl belanosima-bold text-white mb-2 sm:mb-4"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            Previous{" "}
            <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
              Glimpses
            </span>
          </motion.h2>
          <motion.p
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-400 belanosima-regular px-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Relive the epic moments of Euphoric 2025
          </motion.p>
        </motion.div>

        <div className="relative h-[450px] sm:h-[500px] md:h-[600px] lg:h-[650px] flex items-center justify-center flex-grow">
          {/* Phone Mockup - Behind (z-10) */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            whileInView={{ scale: 1, opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 1, delay: 0.3, type: "spring" }}
            className="absolute z-10"
          >
            <div className="relative w-[240px] h-[490px] sm:w-[280px] sm:h-[570px] md:w-[320px] md:h-[650px] lg:w-[340px] lg:h-[690px]">
              <div className="absolute inset-0 rounded-[2.5rem] sm:rounded-[3rem] bg-gradient-to-br from-gray-800 to-gray-900 shadow-2xl p-2 sm:p-3">
                <div className="w-full h-full bg-black rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden relative">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 sm:w-40 h-6 sm:h-7 bg-black rounded-b-3xl z-50" />
                  
                  {/* Phone Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800" />
                  
                  {/* Phone Header */}
                  <div className="absolute top-8 sm:top-10 left-0 right-0 px-4 sm:px-6 flex items-center justify-between z-50">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 overflow-hidden">
                      <img
                        src="https://colleges18.s3.ap-south-1.amazonaws.com/Sanskar_Educational_Group_Seg_Ghaziabad_02da9d48e8.png"
                        className="w-full h-full object-cover"
                        alt="Logo"
                      />
                    </div>
                    <h3 className="text-white text-base sm:text-lg font-bold belanosima-bold">
                      EUPHORIC
                    </h3>
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 flex items-center justify-center">
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Gallery Grid Inside Phone */}
                  <div className="absolute top-20 sm:top-24 left-0 right-0 bottom-0 px-3 sm:px-4 pt-4 pb-16 sm:pb-20 overflow-hidden">
                    <div className="grid grid-cols-3 gap-1.5 sm:gap-2 h-full">
                      {imagesLoaded && glimpses.concat(glimpses.slice(0, 5)).map((glimpse, idx) => (
                        <motion.div
                          key={`gallery-${idx}`}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.05, duration: 0.3 }}
                          className="relative rounded-lg sm:rounded-xl overflow-hidden bg-gray-800 aspect-square"
                        >
                          <img
                            src={glimpse.image}
                            alt={glimpse.title}
                            className="w-full h-full object-cover"
                          />
                          <div className={`absolute inset-0 bg-gradient-to-t ${glimpse.color} opacity-20`} />
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Phone Navigation Bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-14 sm:h-16 bg-black/50 backdrop-blur-md border-t border-white/10 flex items-center justify-around px-6 sm:px-8 z-50">
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-white/10 flex items-center justify-center">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white/70" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                      </svg>
                    </div>
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-white/10 flex items-center justify-center">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white/70" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="absolute top-2 sm:top-3 left-1/2 -translate-x-1/2 w-28 sm:w-32 h-6 sm:h-7 bg-white/5 rounded-full blur-xl" />
              </div>
              <div className="absolute inset-0 rounded-[2.5rem] sm:rounded-[3rem] bg-gradient-to-r from-cyan-400/20 via-purple-400/20 to-pink-400/20 blur-2xl -z-10" />
            </div>
          </motion.div>

          {/* Scrolling Cards - In Front (z-20) */}
          {imagesLoaded && (
            <div className="absolute z-20 w-full overflow-hidden">
              <motion.div style={{ x: scrollX }} className="flex gap-4 sm:gap-5 md:gap-6 py-6 sm:py-8">
                {[...glimpses, ...glimpses, ...glimpses].map((glimpse, index) => (
                  <motion.div
                    key={`${glimpse.id}-${index}`}
                    initial={{ opacity: 0, scale: 0.8, y: 50 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{
                      delay: index * 0.05,
                      duration: 0.6,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    whileHover={{
                      scale: 1.05,
                      y: -10,
                      transition: { duration: 0.2 },
                    }}
                    className="relative w-56 h-80 sm:w-64 sm:h-[350px] md:w-72 md:h-96 lg:w-80 lg:h-[450px] rounded-2xl sm:rounded-3xl overflow-hidden flex-shrink-0 group cursor-pointer"
                    style={{ boxShadow: `0 20px 60px rgba(0, 0, 0, 0.5)` }}
                  >
                    <img
                      src={glimpse.image}
                      alt={glimpse.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-t ${glimpse.color} opacity-30 group-hover:opacity-50 transition-opacity duration-300`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 + 0.2 }}
                      className="absolute top-4 sm:top-6 left-4 sm:left-6"
                    >
                      <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-xs sm:text-sm font-bold belanosima-bold shadow-lg">
                        {glimpse.category}
                      </span>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 + 0.3 }}
                      className="absolute top-4 sm:top-6 right-4 sm:right-6"
                    >
                      <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 bg-black/30 backdrop-blur-sm border border-white/10 rounded-full text-white/70 text-xs belanosima-regular">
                        {glimpse.year}
                      </span>
                    </motion.div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                      <motion.h3
                        className="text-white text-xl sm:text-2xl md:text-3xl font-bold belanosima-bold leading-tight"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 + 0.4 }}
                      >
                        {glimpse.title}
                      </motion.h3>
                    </div>
                    <motion.div
                      className="absolute inset-0 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{
                        boxShadow: `inset 0 0 40px rgba(255, 255, 255, 0.2)`,
                      }}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          )}
        </div>
      </div>

      {/* Footer - Properly positioned at bottom */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full text-center py-4 sm:py-6 px-4"
      >
        <p className="text-sm sm:text-base md:text-lg text-white/60 belanosima-regular tracking-wide flex items-center justify-center gap-2 flex-wrap">
          <span className="flex items-center gap-2">
            Made with{" "}
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-pink-500 inline-block"
            >
              ❤️
            </motion.span>{" "}
            by
          </span>{" "}
          <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-purple-600 bg-clip-text text-transparent belanosima-bold text-lg sm:text-xl md:text-2xl">
            Ujjwal
          </span>
        </p>
      </motion.div>
    </section>
  );
}