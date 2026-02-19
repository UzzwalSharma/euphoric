import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function About() {
  const sectionRef = useRef(null);

  // Scroll progress for parallax
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax transforms
  const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  const fadeUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 1, ease: "easeOut" },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full py-20 md:py-32 lg:py-40 overflow-hidden"
    >
      {/* Background Parallax */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 w-full h-[120%] -top-[10%]"
      >
        <img
          src="https://i.pinimg.com/736x/95/71/c7/9571c799aeacc2e141f47294e1f53161.jpg"
          alt="Background"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/85" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT CONTENT */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            className="lg:col-span-4 space-y-6"
          >
            <motion.div
              variants={fadeUp}
              className="p-6 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-2xl"
            >
              <h3 className="text-2xl md:text-3xl belanosima-bold text-white mb-3 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                What is Euphoric?
              </h3>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed belanosima-regular">
                Euphoric is the annual festival of Sanskar Educational Group that incorporates a wide range of dynamic events. It aims to ignite the competitive spirit among young minds.
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="p-6 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-2xl"
            >
              <h3 className="text-2xl md:text-3xl belanosima-bold text-white mb-3 bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
                Our Mission
              </h3>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed belanosima-regular">
                We provide a plethora of competitions and activities to help students sharpen their skills, enhance knowledge, aptitude and problem-solving abilities.
              </p>
            </motion.div>
          </motion.div>

          {/* CENTER - LARGE CHARACTER */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center">
            
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
              className="text-4xl md:text-5xl lg:text-6xl belanosima-bold text-white mb-8 text-center"
            >
              ABOUT <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">EUPHORIC</span>
            </motion.h2>

            <motion.div
              style={{ scale: imageScale }}
              animate={{ y: [0, -20, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
              className="relative w-80 h-80 md:w-96 md:h-96 lg:w-[500px] lg:h-[500px]"
            >
              <img
                src="/about.png"
                alt="Euphoric Character"
                className="w-full h-full object-contain drop-shadow-[0_0_50px_rgba(0,245,255,0.3)]"
              />
            </motion.div>
          </div>

          {/* RIGHT CONTENT */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            className="lg:col-span-4 space-y-6"
          >
            <motion.div
              variants={fadeUp}
              className="p-6 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-2xl"
            >
              <h3 className="text-2xl md:text-3xl belanosima-bold text-white mb-3 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Your Experience
              </h3>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed belanosima-regular">
                Our objective is to provide a fun and practical experience that helps participants improve their research and analytical thinking skills through hands-on learning.
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="p-6 bg-gradient-to-br from-red-500/20 to-orange-500/20 backdrop-blur-sm border-2 border-red-400/40 rounded-2xl"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                <h3 className="text-2xl md:text-3xl belanosima-bold text-white">
                  Last Date
                </h3>
              </div>
              <p className="text-red-300 text-xl md:text-2xl belanosima-bold mt-3">
                7th March, 2026
              </p>
              <p className="text-gray-300 text-sm mt-2 belanosima-regular">
                Don't miss your chance to participate!
              </p>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}