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
  
  // Parallax transforms - Same as BlogHero
  const backgroundY = useTransform(scrollY, [0, 1000], [0, 200]);
  const contentY = useTransform(scrollY, [0, 800], [0, -50]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0.3]);
  const scale = useTransform(scrollY, [0, 500], [1, 0.95]);

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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax - Exactly like BlogHero */}
      <motion.div className="absolute inset-0" style={{ y: backgroundY }}>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/img/bg.jpg')" }}
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      </motion.div>

      {/* Glass Morphism Container - Same as BlogHero */}
      <motion.div
        style={{ opacity, scale, y: contentY }}
        className="relative z-10 w-full max-w-[91.666667%] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24"
      >
        <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl sm:rounded-[2rem] lg:rounded-[3rem] border border-white/20 shadow-2xl overflow-hidden">
          {/* Noise Texture Overlay - Same as BlogHero */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='3.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
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
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                  <Sparkles className="w-5 h-5 text-amber-200" />
                  <span className="text-sm font-medium text-amber-100 tracking-[0.15em] uppercase">
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
                <span className="block text-transparent bg-clip-text bg-gradient-to-br from-white via-amber-50/95 to-amber-100/90">
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
              className="text-lg sm:text-xl lg:text-2xl text-white/70 max-w-3xl mx-auto mb-12 font-light leading-relaxed text-center"
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
                    >
                      <Icon className="w-5 h-5 text-amber-200" />
                    </div>
                    <span className="text-sm text-white/70 font-light">{badge.text}</span>
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
          <span className="text-xs uppercase tracking-[0.2em] text-white/60 font-medium">Scroll</span>
          <ChevronDown className="w-5 h-5 text-white/40" />
        </motion.div>
      </motion.div>
    </section>
  );
};