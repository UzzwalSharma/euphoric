import { motion } from "framer-motion";

export default function InfoTapes() {
  const tapes = [
    {
      id: 1,
      messages: [
        "REGISTRATION IS LIVE",
        "20+ EXCITING EVENTS",
        "SPORTS • CULTURAL • TECH",
        "MARCH 10-12, 2026",
      ],
      bgColor: "bg-gradient-to-r from-cyan-400 to-blue-500",
      rotation: "3deg",
      speed: 30,
    },
    {
      id: 2,
      messages: [
        "JOIN 100+ PARTICIPANTS",
        "WIN AMAZING PRIZES",
        "LUCKY DRAW • TROPHIES • CERTIFICATIONS",
        "SHOWCASE YOUR TALENT",
        "REGISTER NOW",
      ],
      bgColor: "bg-gradient-to-r from-purple-500 to-pink-500",
      rotation: "-2deg",
      speed: 35,
    },
  ];

  return (
    <section className="relative w-full py-20 md:py-24 bg-black overflow-hidden">
      
      {/* Subtle background grid */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(to right, white 1px, transparent 1px),
            linear-gradient(to bottom, white 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative">
        {tapes.map((tape, index) => (
          <div
            key={tape.id}
            className={`relative w-full overflow-hidden ${
              index === 1
                ? "-mt-24 z-20 drop-shadow-2xl"
                : "z-10"
            }`}
            style={{
              transform: `rotate(${tape.rotation})`,
            }}
          >
            <div className={`${tape.bgColor} py-4 relative`}>
              
              {/* Animated scrolling container */}
              <motion.div
                className="flex whitespace-nowrap"
                animate={{ x: [0, -2000] }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: tape.speed,
                    ease: "linear",
                  },
                }}
              >
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="flex items-center">
                    {tape.messages.map((message, msgIndex) => (
                      <div key={msgIndex} className="flex items-center">
                        <span className="text-white font-black text-xl md:text-3xl lg:text-4xl px-8 belanosima-bold tracking-wider uppercase">
                          {message}
                        </span>
                        <span className="text-white text-2xl md:text-4xl px-4">
                          •
                        </span>
                      </div>
                    ))}
                  </div>
                ))}
              </motion.div>

              {/* Tape edges */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-white/20" />
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20" />

              {/* Tape texture overlay */}
              <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                  backgroundImage: `repeating-linear-gradient(
                    90deg,
                    transparent,
                    transparent 10px,
                    rgba(255,255,255,0.1) 10px,
                    rgba(255,255,255,0.1) 11px
                  )`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
