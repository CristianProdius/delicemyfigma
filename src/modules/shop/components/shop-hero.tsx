"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ChevronDown, ShoppingBag, Star, Sparkles, Award, Package } from "lucide-react";

// Mock data
const shopContent = {
  specialOffer: "Limited Edition Collection",
  heroTitle: "Artisan Chocolate Perfection",
  heroSubtitle: "Discover our handcrafted collection of premium Swiss chocolates, made with the finest ingredients and generations of expertise",
  externalUrl: "https://shop.chocolaterie.com",
  ctaButtonText: "Shop Collection"
};

export const ShopHero: React.FC = () => {
  const [scrollIndicatorVisible, setScrollIndicatorVisible] = useState(true);
  const { scrollY } = useScroll();
  
  // Parallax effects
  const backgroundY = useTransform(scrollY, [0, 500], [0, -100]);
  const contentY = useTransform(scrollY, [0, 300], [0, -50]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0.3]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollIndicatorVisible(window.scrollY < 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleExploreClick = () => {
    document
      .getElementById("featured-products")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const trustBadges = [
    { icon: Award, text: "Award Winning", color: "#D4A574" },
    { icon: Star, text: "Artisan Crafted", color: "#E8B4B8" },
    { icon: Package, text: "Swiss Quality", color: "#A67B5B" }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Animated background gradient */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-amber-50/50 via-white to-amber-50/30" />
      </motion.div>

      {/* Main Container with Glassmorphism */}
      <motion.div 
        className="relative w-full max-w-[91.666667%] mx-auto mt-32"
        style={{ y: contentY, opacity }}
      >
        {/* Gradient border effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-200/30 via-amber-300/20 to-amber-400/10 rounded-[3rem] blur-xl" />
        
        <div className="relative bg-gradient-to-br from-amber-950/50 via-amber-900/40 to-amber-950/50 backdrop-blur-2xl rounded-[3rem] border border-white/10 overflow-hidden">
          {/* Animated gradient orbs */}
          <motion.div
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-20 right-20 w-[500px] h-[500px] bg-gradient-radial from-amber-400/20 via-amber-500/10 to-transparent rounded-full blur-3xl pointer-events-none"
          />
          <motion.div
            animate={{
              x: [0, -100, 0],
              y: [0, 100, 0],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-20 left-20 w-[400px] h-[400px] bg-gradient-radial from-amber-600/15 via-amber-700/10 to-transparent rounded-full blur-3xl pointer-events-none"
          />

          {/* Subtle noise texture overlay */}
          <div
            className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none"
            style={{
              backgroundImage: 'url("/img/bg.jpg")',
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />

          <div className="relative p-16 sm:p-20 lg:p-24 xl:p-32">
            {/* Special offer badge */}
            {shopContent.specialOffer && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, type: "spring" }}
                className="flex justify-center mb-8"
              >
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-amber-400/20 to-amber-600/20 backdrop-blur-md rounded-full border border-amber-400/20">
                  <Sparkles className="w-5 h-5 text-amber-200" />
                  <span className="text-sm font-medium text-amber-200 tracking-[0.15em] uppercase">
                    {shopContent.specialOffer}
                  </span>
                  <Sparkles className="w-5 h-5 text-amber-200" />
                </div>
              </motion.div>
            )}

            {/* Main title with gradient */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.2,
                duration: 1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-center mb-8"
            >
              <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-extralight leading-[0.95] tracking-[-0.02em]">
                <span className="block text-transparent bg-clip-text bg-gradient-to-br from-white via-amber-50/95 to-amber-100/90 drop-shadow-2xl">
                  {shopContent.heroTitle.split(' ').slice(0, -1).join(' ')}
                </span>
                <span className="block mt-4 text-transparent bg-clip-text bg-gradient-to-br from-amber-100/90 via-amber-200/80 to-amber-300/70 italic font-thin">
                  {shopContent.heroTitle.split(' ').slice(-1)[0]}
                </span>
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-lg sm:text-xl lg:text-2xl text-amber-100/60 max-w-3xl mx-auto mb-12 font-light leading-relaxed text-center"
            >
              {shopContent.heroSubtitle}
            </motion.p>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex flex-wrap justify-center gap-6 sm:gap-8 lg:gap-12 mb-14"
            >
              {trustBadges.map((badge, index) => {
                const Icon = badge.icon;
                return (
                  <motion.div
                    key={badge.text}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                    className="flex items-center gap-2 group"
                  >
                    <div 
                      className="p-2 rounded-lg bg-white/10 backdrop-blur-sm group-hover:bg-white/20 transition-all duration-300"
                      style={{ boxShadow: `0 4px 20px ${badge.color}20` }}
                    >
                      <Icon className="w-5 h-5 text-amber-200" />
                    </div>
                    <span className="text-sm text-amber-100/70 font-light">{badge.text}</span>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.7, duration: 0.8, type: "spring" }}
              className="flex flex-col sm:flex-row gap-6 justify-center"
            >
              {/* Primary CTA */}
              <motion.a
                href={shopContent.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="group relative inline-flex items-center justify-center gap-3 px-10 sm:px-12 py-4 sm:py-5 bg-gradient-to-r from-amber-100 via-amber-50 to-white text-amber-950 hover:from-white hover:via-amber-50 hover:to-amber-100 rounded-full transition-all duration-500 shadow-2xl hover:shadow-amber-200/40 hover:shadow-3xl overflow-hidden text-base sm:text-lg lg:text-xl font-medium"
              >
                {/* Button shimmer effect */}
                <div className="absolute inset-0 -top-2 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                
                <ShoppingBag className="relative z-10 w-5 h-5 sm:w-6 sm:h-6" />
                <span className="relative z-10">{shopContent.ctaButtonText}</span>
              </motion.a>

              {/* Secondary CTA */}
              <motion.button
                onClick={handleExploreClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center px-10 sm:px-12 py-4 sm:py-5 text-amber-50 border border-amber-400/30 rounded-full hover:border-amber-400/50 hover:bg-amber-400/10 backdrop-blur transition-all text-base sm:text-lg lg:text-xl font-medium"
              >
                <span>Explore Collections</span>
              </motion.button>
            </motion.div>


          </div>
        </div>
      </motion.div>

      {/* Elegant scroll indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: scrollIndicatorVisible ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-3"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-amber-700/60 font-medium">Scroll</span>
          <ChevronDown className="w-5 h-5 text-amber-700/40" />
        </motion.div>
      </motion.div>
    </section>
  );
};