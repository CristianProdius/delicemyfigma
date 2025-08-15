"use client";

import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { useState, useRef } from "react";
import { Eye, Heart, ArrowUpRight } from "lucide-react";

const portfolioContent = {
  title: "Portfolio",
  subtitle: "Artisan Creations",
  description:
    "Each piece tells a story of passion, precision, and the pursuit of chocolate perfection",
  categories: [
    { id: "all", label: "All Creations" },
    { id: "bonbons", label: "Bonbons" },
    { id: "sculptures", label: "Sculptures" },
    { id: "cakes", label: "Cakes" },
    { id: "seasonal", label: "Seasonal" },
  ],
  items: [
    {
      id: 1,
      title: "Ruby Chocolate Rose",
      category: "bonbons",
      description: "Delicate rose-infused ganache in ruby chocolate shell",
      image: "/logo.png",
      size: "normal" as const,
      accentColor: "#E8B4B8",
    },
    {
      id: 2,
      title: "Chocolate Swan Lake",
      category: "sculptures",
      description: "Life-sized chocolate swan sculpture for gala centerpiece",
      image: "/img/restaurant-service.jpg",
      size: "tall" as const,
      accentColor: "#D4A574",
    },
    {
      id: 3,
      title: "Midnight Truffle Collection",
      category: "bonbons",
      description: "Dark chocolate truffles with exotic flavor profiles",
      image: "/img/custom-desserts.jpg",
      size: "wide" as const,
      accentColor: "#451C15",
    },
    {
      id: 4,
      title: "Golden Anniversary Cake",
      category: "cakes",
      description: "Three-tier chocolate masterpiece with gold leaf details",
      image: "/img/parties-events.jpg",
      size: "tall" as const,
      accentColor: "#F4A460",
    },
    {
      id: 5,
      title: "Spring Blossom Bonbons",
      category: "seasonal",
      description: "Cherry blossom and yuzu chocolate delights",
      image: "/img/adult-classes.jpg",
      size: "normal" as const,
      accentColor: "#E8B4B8",
    },
    {
      id: 6,
      title: "Architectural Marvel",
      category: "sculptures",
      description: "Miniature chocolate Eiffel Tower - 2 feet tall",
      image: "/img/kids-classes.jpg",
      size: "normal" as const,
      accentColor: "#A67B5B",
    },
    {
      id: 7,
      title: "Velvet Dream Cake",
      category: "cakes",
      description: "Red velvet and dark chocolate fusion creation",
      image: "/logo.png",
      size: "wide" as const,
      accentColor: "#CD853F",
    },
    {
      id: 8,
      title: "Winter Wonderland",
      category: "seasonal",
      description: "White chocolate snowflakes with peppermint essence",
      image: "/img/adult-classes.jpg",
      size: "normal" as const,
      accentColor: "#E0D9C9",
    },
  ] as PortfolioItem[],
};

type PortfolioItem = {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  size: "normal" | "wide" | "tall";
  accentColor: string;
};

interface GalleryItemProps {
  item: PortfolioItem;
  index: number;
}

const GalleryItem = ({ item, index }: GalleryItemProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const baseLikes = 100 + ((item.id * 47) % 400);
  const [likes, setLikes] = useState(baseLikes);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  const getSizeClasses = (size: string) => {
    switch (size) {
      case "wide":
        return "col-span-1 min-[480px]:col-span-2 row-span-1";
      case "tall":
        return "col-span-1 row-span-1 sm:row-span-2";
      default:
        return "col-span-1 row-span-1";
    }
  };

  const getHeightClass = (size: string) => {
    switch (size) {
      case "tall":
        // Mobile gets single height, tablet and up get tall
        return "h-[280px] min-[480px]:h-[350px] sm:h-[516px] md:h-[624px] lg:h-[632px]";
      case "wide":
        return "h-[280px] min-[480px]:h-[350px] sm:h-[250px] md:h-[300px]";
      default:
        return "h-[280px] min-[480px]:h-[350px] sm:h-[250px] md:h-[300px]";
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{
        duration: 0.5,
        delay: index * 0.05,
        layout: { duration: 0.5, type: "spring" },
      }}
      className={`group relative cursor-pointer ${getSizeClasses(item.size)}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsHovered(!isHovered)} // Toggle on click for mobile
    >
      {/* Inner container with overflow hidden and hover transform */}
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative w-full h-full overflow-hidden rounded-xl sm:rounded-2xl md:rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-500"
      >
        {/* Background Image */}
        <div className={`relative w-full ${getHeightClass(item.size)}`}>
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={index < 4} // Priority load first 4 images
          />

          {/* Gradient Overlay - Always visible on mobile for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent sm:from-black/80 sm:via-black/20 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-500" />

          {/* Accent Color Glow */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500"
            style={{
              background: `radial-gradient(circle at center, ${item.accentColor}40 0%, transparent 70%)`,
            }}
          />
        </div>

        {/* Content Overlay - Always visible on mobile */}
        <div className="absolute inset-0 p-4 sm:p-6 md:p-8 flex flex-col justify-between z-10">
          {/* Top Actions - Mobile optimized */}
          <div
            className={`flex justify-between items-start transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0 sm:opacity-0"
            }`}
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                handleLike(e);
              }}
              className={`p-2 sm:p-3 rounded-full backdrop-blur-md transition-all duration-300 ${
                isLiked
                  ? "bg-red-500/80 text-white"
                  : "bg-white/20 text-white hover:bg-white/30"
              }`}
            >
              <Heart
                className={`w-4 h-4 sm:w-5 sm:h-5 ${
                  isLiked ? "fill-current" : ""
                }`}
              />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="p-2 sm:p-3 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-all duration-300"
            >
              <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.button>
          </div>

          {/* Bottom Content - Always visible on mobile */}
          <div
            className={`transition-all duration-300 ${
              isHovered
                ? "opacity-100 translate-y-0"
                : "opacity-100 sm:opacity-0 translate-y-0 sm:translate-y-4"
            }`}
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-xl sm:text-2xl md:text-3xl font-light text-white mb-1 sm:mb-2 [font-family:var(--font-playfair)] line-clamp-2">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-white/80 mb-2 sm:mb-4 [font-family:var(--font-inter)] font-light line-clamp-2 sm:line-clamp-none">
                {item.description}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`flex items-center justify-between transition-opacity duration-300 ${
                isHovered ? "opacity-100" : "opacity-0 sm:opacity-0"
              }`}
            >
              <div className="flex items-center gap-2 sm:gap-4">
                <span className="text-white/60 text-xs sm:text-sm flex items-center gap-1">
                  <Heart className="w-3 h-3 sm:w-4 sm:h-4" />
                  {likes}
                </span>
              </div>

              <motion.button
                whileHover={{ x: 5 }}
                className="flex items-center gap-1 sm:gap-2 text-white font-light text-xs sm:text-base"
                onClick={(e) => e.stopPropagation()}
              >
                <span className="hidden min-[480px]:inline">View Details</span>
                <span className="min-[480px]:hidden">View</span>
                <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4" />
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Category Badge - Mobile optimized */}
        <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 + 0.3 }}
            className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-white/90 backdrop-blur-sm text-[#451C15] text-[10px] sm:text-xs md:text-sm font-medium capitalize [font-family:var(--font-inter)]"
          >
            {item.category}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const PortfolioSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const sectionRef = useRef<HTMLDivElement>(null);

  const filteredItems =
    activeCategory === "all"
      ? portfolioContent.items
      : portfolioContent.items.filter(
          (item) => item.category === activeCategory
        );

  return (
    <>
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <section
        ref={sectionRef}
        className="relative w-full py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-white via-[#FFF9F5] to-white overflow-hidden"
      >
        {/* Enhanced Background - Matching CTA style */}
        <div className="absolute inset-0">
          {/* Base gradient - subtle transition from pure white to warm tones */}
          <div className="absolute inset-0 bg-gradient-to-b from-white via-[#FFFCFA] to-[#FFF9F5]" />

          {/* Noise texture overlay - same as CTA */}
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.5'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Geometric pattern - very subtle to not interfere with gallery */}
          <div
            className="absolute inset-0 opacity-[0.01]"
            style={{
              backgroundImage: `
                repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(69, 28, 21, 0.02) 40px, rgba(69, 28, 21, 0.02) 80px),
                repeating-linear-gradient(-45deg, transparent, transparent 40px, rgba(212, 165, 116, 0.02) 40px, rgba(212, 165, 116, 0.02) 80px)
              `,
            }}
          />

          {/* Radial glows - positioned to complement content */}
          <div className="absolute inset-0">
            {/* Top glow - subtle warm accent */}
            <motion.div
              className="absolute -top-40 left-1/3 w-[800px] h-[800px] rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(244, 164, 96, 0.06) 0%, transparent 60%)",
                filter: "blur(120px)",
              }}
              animate={{
                x: [0, 100, 0],
                y: [0, -50, 0],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Center-right glow */}
            <motion.div
              className="absolute top-1/2 -right-20 w-[600px] h-[600px] rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(212, 165, 116, 0.05) 0%, transparent 70%)",
                filter: "blur(100px)",
              }}
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Bottom-left glow - creates flow to CTA */}
            <motion.div
              className="absolute -bottom-40 left-1/4 w-[700px] h-[700px] rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(232, 180, 184, 0.07) 0%, transparent 60%)",
                filter: "blur(150px)",
              }}
              animate={{
                x: [-50, 50, -50],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 18,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>

          {/* Floating chocolate elements - subtle and elegant */}
          <div className="absolute inset-0 pointer-events-none hidden sm:block">
            {["🍫", "✨", "🌰"].map((emoji, index) => (
              <motion.div
                key={index}
                className="absolute hidden lg:block"
                style={{
                  left: `${20 + index * 30}%`,
                  top: `${15 + index * 25}%`,
                }}
              >
                <motion.div
                  className="text-2xl opacity-[0.04]"
                  animate={{
                    y: [0, -30, 0],
                    rotate: [0, 15, -15, 0],
                  }}
                  transition={{
                    duration: 12 + index * 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 1.5,
                  }}
                >
                  {emoji}
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Bottom transition gradient - smooth flow to CTA */}
          <div
            className="absolute bottom-0 left-0 right-0 h-40"
            style={{
              background:
                "linear-gradient(to bottom, transparent 0%, #FFF9F5 100%)",
            }}
          />
        </div>

        <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-[95%] xl:max-w-[90%] mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12 md:mb-16"
          >
            <span className="inline-block text-xs sm:text-sm md:text-base text-[#451C15]/70 tracking-[0.2em] sm:tracking-[0.3em] uppercase font-medium mb-2 sm:mb-4 [font-family:var(--font-inter)]">
              {portfolioContent.title}
            </span>
            <h2 className="text-3xl min-[480px]:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-[#451C15] mb-4 sm:mb-6 [font-family:var(--font-playfair)]">
              {portfolioContent.subtitle}
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[#451C15]/60 max-w-lg sm:max-w-2xl mx-auto font-light [font-family:var(--font-inter)] px-4 sm:px-0">
              {portfolioContent.description}
            </p>
          </motion.div>

          {/* Category Filter - Mobile optimized with horizontal scroll */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-8 sm:mb-12 md:mb-16 overflow-x-auto scrollbar-hide"
          >
            <div className="flex justify-start sm:justify-center gap-2 sm:gap-3 md:gap-4 min-w-max sm:min-w-0 px-4 sm:px-0">
              {portfolioContent.categories.map((category, index) => (
                <motion.button
                  key={category.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-full transition-all duration-300 text-xs sm:text-sm md:text-base font-light [font-family:var(--font-inter)] whitespace-nowrap ${
                    activeCategory === category.id
                      ? "bg-[#451C15] text-[#E0D9C9] shadow-lg"
                      : "bg-white/80 text-[#451C15] hover:bg-[#451C15]/10 border border-[#451C15]/20"
                  }`}
                >
                  {category.label}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Gallery Grid - Mobile optimized */}
          <motion.div
            layout
            className="grid grid-cols-1 min-[480px]:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 min-[480px]:gap-4 sm:gap-6 lg:gap-8 auto-rows-[280px] min-[480px]:auto-rows-[350px] sm:auto-rows-[250px] md:auto-rows-[300px]"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, index) => (
                <GalleryItem key={item.id} item={item} index={index} />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* View All CTA - Mobile optimized */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-12 sm:mt-16 md:mt-20"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="group relative px-8 sm:px-10 md:px-12 py-3.5 sm:py-4 md:py-5 bg-[#451C15] text-[#E0D9C9] rounded-full overflow-hidden transition-all duration-300 hover:shadow-2xl text-sm sm:text-base md:text-lg font-light [font-family:var(--font-inter)]"
            >
              <span className="relative z-10 flex items-center gap-2 sm:gap-3">
                <span className="hidden min-[480px]:inline">
                  Explore Full Portfolio
                </span>
                <span className="min-[480px]:hidden">View All</span>
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  →
                </motion.span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#5A241C] to-[#451C15] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>
          </motion.div>
        </div>
      </section>
    </>
  );
};
