import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function EventsBento() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentIndex, setCurrentIndex] = useState(0);

  const allEvents = [
    {
      name: "Badminton (Doubles)",
      category: "Sports",
      image:
        "https://i.pinimg.com/1200x/bf/20/5b/bf205bd3d90fa1b01781f74c678bc611.jpg",
    },
    {
      name: "Badminton (Single)",
      category: "Sports",
      image:
        "https://i.pinimg.com/1200x/bf/20/5b/bf205bd3d90fa1b01781f74c678bc611.jpg",
    },
    {
      name: "Basketball (Boys)",
      category: "Sports",
      image:
        "https://i.pinimg.com/736x/70/41/a1/7041a13359eae910bd83c390c4d8ff4a.jpg",
    },
    {
      name: "Basketball (Girls)",
      category: "Sports",
      image:
        "https://i.pinimg.com/736x/70/41/a1/7041a13359eae910bd83c390c4d8ff4a.jpg",
    },
    {
      name: "Carrom (Boys)",
      category: "Sports",
      image:
        "https://i.pinimg.com/736x/7c/05/09/7c05093f4f3d0d91de7c1cf9f7ed6878.jpg",
    },
    {
      name: "Carrom (Girls)",
      category: "Sports",
      image:
        "https://i.pinimg.com/736x/7c/05/09/7c05093f4f3d0d91de7c1cf9f7ed6878.jpg",
    },
    {
      name: "Chess (Boys)",
      category: "Sports",
      image:
        "https://i.pinimg.com/736x/0b/c3/6a/0bc36a847475077e9f6047b297ea6ed8.jpg",
    },
    {
      name: "Chess (Girls)",
      category: "Sports",
      image:
        "https://i.pinimg.com/736x/0b/c3/6a/0bc36a847475077e9f6047b297ea6ed8.jpg",
    },
    {
      name: "Cricket (Boys)",
      category: "Sports",
      image:
        "https://i.pinimg.com/736x/92/e6/ff/92e6ff4101fb80edc8cf44987d722b3a.jpg",
    },
    {
      name: "Cricket (Girls)",
      category: "Sports",
      image:
        "https://i.pinimg.com/1200x/17/04/fe/1704fe7f297e7569beaa5cf5d77da905.jpg",
    },
    {
      name: "Crossword Puzzle",
      category: "Technical",
      image:
        "https://i.pinimg.com/736x/a0/f4/f1/a0f4f13805c2d7ae9d2b6ee2941c7b4d.jpg",
    },
    {
      name: "Dance (Group)",
      category: "Cultural",
      image:
        "https://i.pinimg.com/1200x/c6/72/3d/c6723d4338f97481deaec427a2a7e047.jpg",
    },
    {
      name: "Dance (Solo)",
      category: "Cultural",
      image:
        "https://i.pinimg.com/1200x/d3/a1/36/d3a136c0e1ba45436dfe6d5ba176c8a9.jpg",
    },
    {
      name: "Debate",
      category: "Technical",
      image:
        "https://i.pinimg.com/1200x/15/6d/d1/156dd19f58d1b3303015f9c3fea2d0bd.jpg",
    },
    {
      name: "Extempore",
      category: "Technical",
      image:
        "https://i.pinimg.com/1200x/b4/aa/a0/b4aaa0eeb561fbab3d5fceae7b9d9985.jpg",
    },
    {
      name: "LAN Game",
      category: "Technical",
      image:
        "https://i.pinimg.com/1200x/40/30/50/403050c9891422c7cbc58b7ab59b0983.jpg",
    },
    {
      name: "Lemon Race (Boys)",
      category: "Sports",
      image:
        "https://i.pinimg.com/1200x/a0/d3/05/a0d30522a5670402825180a10380886f.jpg",
    },
    {
      name: "Lemon Race (Girls)",
      category: "Sports",
      image:
        "https://i.pinimg.com/736x/ce/c3/e6/cec3e6653abb22a7d3350df8ff1fd8f8.jpg",
    },
    {
      name: "Long Jump (Boys)",
      category: "Sports",
      image:
        "https://i.pinimg.com/736x/9f/58/51/9f5851c28186dcc19fb755d2cb9f6969.jpg",
    },
    {
      name: "Long Jump (Girls)",
      category: "Sports",
      image:
        "https://i.pinimg.com/736x/38/f2/d6/38f2d60bc083f877e36f7a6bddea35c1.jpg",
    },
    {
      name: "Mimicry (Solo)",
      category: "Cultural",
      image: "https://eventsweb.in/wp-content/uploads/2024/12/mim.webp",
    },
    {
      name: "Musical Instrument (Solo)",
      category: "Cultural",
      image:
        "https://i.pinimg.com/1200x/a5/a5/0e/a5a50e24380cd895395801569719c95a.jpg",
    },
    {
      name: "Nukkad Natak (Team)",
      category: "Cultural",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Nukkad_Natak.jpg/1280px-Nukkad_Natak.jpg",
    },
    {
      name: "Poetry (Solo)",
      category: "Cultural",
      image:
        "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80",
    },
    {
      name: "Race (100 M)",
      category: "Sports",
      image:
        "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&q=80",
    },
    {
      name: "Race (200 M)",
      category: "Sports",
      image:
        "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&q=80",
    },
    {
      name: "Rangoli Making",
      category: "Cultural",
      image:
        "https://images.unsplash.com/photo-1509023464722-18d996393ca8?w=800&q=80",
    },
    {
      name: "Relay Race (100x4 M)",
      category: "Sports",
      image:
        "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=800&q=80",
    },
    {
      name: "Shot Put (Boys)",
      category: "Sports",
      image:
        "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=800&q=80",
    },
    {
      name: "Shot Put (Girls)",
      category: "Sports",
      image:
        "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=800&q=80",
    },
    {
      name: "Singing (Group)",
      category: "Cultural",
      image:
        "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80",
    },
    {
      name: "Singing (Solo)",
      category: "Cultural",
      image:
        "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&q=80",
    },
    {
      name: "Skit (Team)",
      category: "Cultural",
      image:
        "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=800&q=80",
    },
    {
      name: "Table Tennis (Boys)",
      category: "Sports",
      image:
        "https://images.unsplash.com/photo-1534158914592-062992fbe900?w=800&q=80",
    },
    {
      name: "Table Tennis (Girls)",
      category: "Sports",
      image:
        "https://images.unsplash.com/photo-1534158914592-062992fbe900?w=800&q=80",
    },
    {
      name: "Tug of War (Boys)",
      category: "Sports",
      image:
        "https://i.pinimg.com/1200x/51/80/d5/5180d59a36d240cfd7e650ff76d13836.jpg",
    },
    {
      name: "Tug of War (Girls)",
      category: "Sports",
      image:
        "https://img.freepik.com/premium-photo/front-view-girl-playing-tug-war-park_23-2150417350.jpg",
    },
    {
      name: "Volleyball (Boys)",
      category: "Sports",
      image:
        "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=800&q=80",
    },
    {
      name: "Volleyball (Girls)",
      category: "Sports",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSddu-eS9saxh9mbFOif_gblg8PNStP2ukDbg&s",
    },
    {
      name: "AD Mad Show",
      category: "Technical",
      image:
        "https://images.unsplash.com/photo-1533750516457-a7f992034fec?w=800&q=80",
    },
  ];

  const categories = [
    { name: "all", label: "All Events", color: "from-white to-gray-300" },
    { name: "Sports", label: "Sports", color: "from-orange-400 to-red-500" },
    {
      name: "Cultural",
      label: "Cultural",
      color: "from-fuchsia-600 to-rose-500",
    },
    {
      name: "Technical",
      label: "Technical",
      color: "from-cyan-400 to-blue-500",
    },
  ];

  const filteredEvents =
    selectedCategory === "all"
      ? allEvents
      : allEvents.filter((e) => e.category === selectedCategory);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const maxIndex = Math.max(0, filteredEvents.length - 15);
        return prev >= maxIndex ? 0 : prev + 1;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [filteredEvents.length]);

  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedCategory]);

  const visibleEvents = filteredEvents.slice(currentIndex, currentIndex + 15);
  const layoutPattern = [
    "large",
    "medium",
    "small",
    "medium",
    "small",
    "large",
    "small",
    "medium",
    "small",
    "medium",
    "large",
    "small",
    "medium",
    "small",
    "medium",
  ];

  const eventsWithLayout = visibleEvents.map((event, index) => ({
    ...event,
    size: layoutPattern[index % layoutPattern.length],
    layoutId: `event-${event.name}`,
  }));

  const getCategoryColor = (category) => {
    switch (category) {
      case "Sports":
        return "from-green-400 via-emerald-500 to-teal-500";
      case "Cultural":
        return "from-violet-400 via-purple-500 to-fuchsia-500";
      case "Technical":
        return "from-yellow-400 via-orange-500 to-red-500";
      default:
        return "from-white to-gray-300";
    }
  };

  const getSizeClass = (size) => {
    switch (size) {
      case "large":
        return "md:col-span-2 md:row-span-2";
      case "medium":
        return "md:col-span-1 md:row-span-2";
      case "small":
        return "md:col-span-1 md:row-span-1";
      default:
        return "md:col-span-1 md:row-span-1";
    }
  };

  return (
    <section className="relative min-h-screen w-full py-20 md:py-32 bg-black overflow-hidden">
      <div className="absolute inset-0 bg-black" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.h2
            className="text-5xl md:text-7xl lg:text-8xl belanosima-bold text-white mb-4"
            initial={{ scale: 2, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            Events @
            <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
              Euphoric
            </span>
          </motion.h2>
          <motion.p
            className="text-xl md:text-2xl text-gray-400 belanosima-regular"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            40+ Exciting Competitions Across 3 Categories
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-3 mb-8"
        >
          {categories.map((cat) => (
            <motion.button
              key={cat.name}
              onClick={() => setSelectedCategory(cat.name)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-full font-bold text-sm md:text-base belanosima-bold transition-all duration-300 cursor-pointer
                ${selectedCategory === cat.name ? `bg-gradient-to-r ${cat.color} text-black shadow-lg` : "bg-white/5 text-white border border-white/20 hover:bg-white/10"}`}
            >
              {cat.label}
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex justify-center mb-16"
        >
          <motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className="relative overflow-hidden px-10 py-4 
  bg-gradient-to-r from-violet-600 via-fuchsia-500 to-purple-600
  text-white font-black text-base md:text-lg 
  rounded-sm belanosima-bold cursor-pointer 
  flex items-center gap-3 group"
>
  {/* Shine Sweep */}
  <span className="absolute inset-0 -translate-x-full 
  bg-gradient-to-r from-transparent via-white/40 to-transparent 
  group-hover:translate-x-full transition-transform duration-700 ease-out" />

  <span className="relative z-10 flex items-center gap-3">
    Register Now <span className="text-xl">→</span>
  </span>
</motion.button>

        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 auto-rows-[180px] gap-4">
            <AnimatePresence mode="popLayout">
              {eventsWithLayout.map((event) => (
                <motion.div
                  key={event.layoutId}
                  layoutId={event.layoutId}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{
                    layout: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                    opacity: { duration: 0.4 },
                    scale: { duration: 0.4 },
                  }}
                  whileHover={{ scale: 1.05, zIndex: 20 }}
                  className={`group relative cursor-pointer rounded-3xl overflow-hidden ${getSizeClass(event.size)}`}
                >
                  <div className="absolute inset-0">
                    <motion.img
                      src={event.image}
                      alt={event.name}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.4 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  </div>
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className={`absolute top-3 left-3 px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r ${getCategoryColor(event.category)} text-black shadow-lg`}
                  >
                    {event.category}
                  </motion.div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <motion.h3
                      className="text-white font-bold text-base md:text-lg belanosima-bold"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      {event.name}
                    </motion.h3>
                  </div>
                  <motion.div
                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      boxShadow: `inset 0 0 60px rgba(0, 245, 255, 0.2)`,
                    }}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="text-white/60 text-lg belanosima-regular">
            In total{" "}
            <span className="text-yellow-400 font-bold">40+ events</span>{" "}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
