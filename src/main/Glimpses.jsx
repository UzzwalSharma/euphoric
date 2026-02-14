import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function GlimpsesCarousel() {
  const [scrollX, setScrollX] = useState(0);

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

  useEffect(() => {
    const interval = setInterval(() => {
      setScrollX((prev) => prev - 1);
    }, 0.2);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen w-full py-20 md:py-32 bg-black overflow-hidden flex items-center">
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
        <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-purple-500/10 to-transparent blur-3xl" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-pink-500/10 to-transparent blur-3xl" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-cyan-500/10 to-transparent blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.h2
            className="text-5xl md:text-7xl lg:text-8xl belanosima-bold text-white mb-4"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            Previous{" "}
            <span
              className="bg-gradient-to-r from-orange-500 via-pink-500 to-red-500
 bg-clip-text text-transparent"
            >
              Glimpses
            </span>
          </motion.h2>
          <motion.p
            className="text-xl md:text-2xl text-gray-400 belanosima-regular"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Relive the epic moments of Euphoric 2025
          </motion.p>
        </motion.div>

        <div className="relative h-[550px] md:h-[650px] flex items-center justify-center">
          {/* Phone Mockup - Behind (z-10) */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            whileInView={{ scale: 1, opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 1, delay: 0.3, type: "spring" }}
            className="absolute z-10"
          >
            <div className="relative w-[280px] h-[570px] md:w-[340px] md:h-[690px]">
              <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-br from-gray-800 to-gray-900 shadow-2xl p-3">
                <div className="w-full h-full bg-black rounded-[2.5rem] overflow-hidden relative">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-black rounded-b-3xl z-50" />
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800" />
                  <div className="absolute top-10 left-0 right-0 px-6 flex items-center justify-between z-50">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400">
                      <img
                        src="https://colleges18.s3.ap-south-1.amazonaws.com/Sanskar_Educational_Group_Seg_Ghaziabad_02da9d48e8.png"
                        className="rounded-full"
                        alt=""
                        srcset=""
                      />
                    </div>
                    <h3 className="text-white text-lg font-bold belanosima-bold">
                      EUPHORIC
                    </h3>
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-white"
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
                </div>
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-32 h-7 bg-white/5 rounded-full blur-xl" />
              </div>
              <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-r from-cyan-400/20 via-purple-400/20 to-pink-400/20 blur-2xl -z-10" />
            </div>
          </motion.div>

          {/* Scrolling Cards - In Front (z-20) */}
          <div className="absolute z-20 w-full overflow-hidden">
            <motion.div style={{ x: scrollX }} className="flex gap-6 py-8">
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
                  className="relative w-72 h-96 md:w-80 md:h-[450px] rounded-3xl overflow-hidden flex-shrink-0 group cursor-pointer"
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
                    className="absolute top-6 left-6"
                  >
                    <span className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-sm font-bold belanosima-bold shadow-lg">
                      {glimpse.category}
                    </span>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 + 0.3 }}
                    className="absolute top-6 right-6"
                  >
                    <span className="px-3 py-1.5 bg-black/30 backdrop-blur-sm border border-white/10 rounded-full text-white/70 text-xs belanosima-regular">
                      {glimpse.year}
                    </span>
                  </motion.div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <motion.h3
                      className="text-white text-2xl md:text-3xl font-bold belanosima-bold leading-tight"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 + 0.4 }}
                    >
                      {glimpse.title}
                    </motion.h3>
                  </div>
                  <motion.div
                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      boxShadow: `inset 0 0 40px rgba(255, 255, 255, 0.2)`,
                    }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
      <motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center sm:bottom-4"
>
  <p className="text-2xl md:text-base text-white/60 belanosima-regular tracking-wide flex items-center gap-2">
    Made with{" "}
    <motion.span
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ duration: 1.5, repeat: Infinity }}
      className="text-pink-500"
    >
      ❤️
    </motion.span>{" "}
    by{" "}
    <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-purple-600
 bg-clip-text text-transparent belanosima-bold text-3xl">
      Ujjwal
    </span>
  </p>
</motion.div>

    </section>
  );
}
