"use client";
import React from "react";
import { motion } from "motion/react";
import { ArrowRight, Lock, Truck, Award, Sparkles, Package, ShoppingBag } from "lucide-react";

// Mock data
const shopContent = {
  externalUrl: "https://shop.chocolaterie.com",
  ctaButtonText: "Visit Our Boutique",
  redirectMessage: "Discover our exclusive online boutique where every chocolate tells a story of Swiss excellence and artisan craftsmanship"
};

export const ShopCTA: React.FC = () => {
  const trustIndicators = [
    { icon: Lock, text: "Secure Checkout", color: "#D4A574" },
    { icon: Truck, text: "Worldwide Shipping", color: "#E8B4B8" },
    { icon: Award, text: "Premium Quality", color: "#A67B5B" },
    { icon: Package, text: "Luxury Packaging", color: "#F4A460" }
  ];

  return (
    <section className="relative py-16 sm:py-20 lg:py-24 xl:py-32 overflow-hidden bg-gradient-to-b from-white to-[#FBFAF8]">
      {/* Premium background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated gradient orbs */}
        <motion.div 
          className="absolute top-1/4 -left-48 w-96 h-96 bg-gradient-to-br from-amber-200/15 to-transparent rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 -right-48 w-[500px] h-[500px] bg-gradient-to-tl from-amber-100/15 to-transparent rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="px-4 sm:px-6 lg:px-8 max-w-[91.666667%] mx-auto relative z-10">
        {/* Main CTA Container */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative"
        >
          {/* Gradient border effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-200/30 via-amber-300/20 to-amber-400/10 rounded-[3rem] blur-xl" />
          
          <div className="relative bg-gradient-to-br from-[#451C15] to-[#5A2419] rounded-[36px] shadow-3xl overflow-hidden">
            {/* Inner gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-amber-600/10" />
            
            {/* Animated accent */}
            <motion.div
              className="absolute -top-32 -right-32 w-64 h-64 rounded-full"
              style={{ background: "radial-gradient(circle, #D4A57430 0%, transparent 70%)" }}
              animate={{ rotate: 360 }}
              transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Sparkle effects */}
            <motion.div
              className="absolute top-20 left-20"
              animate={{
                opacity: [0, 1, 0],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0
              }}
            >
              <Sparkles className="w-6 h-6 text-amber-200/20" />
            </motion.div>
            <motion.div
              className="absolute bottom-20 right-32"
              animate={{
                opacity: [0, 1, 0],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.5
              }}
            >
              <Sparkles className="w-8 h-8 text-amber-300/20" />
            </motion.div>

            <div className="relative p-10 sm:p-14 lg:p-20 xl:p-24">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-center"
              >
                {/* Icon */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
                  className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md mb-8 shadow-2xl"
                >
                  <ShoppingBag className="w-8 h-8 sm:w-10 sm:h-10 text-amber-200" />
                </motion.div>

                {/* Headline */}
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extralight font-serif text-white mb-6 leading-[1.1] tracking-tight">
                  Experience Chocolate
                  <span className="block italic font-thin text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-400 mt-2">
                    Perfection
                  </span>
                </h2>

                {/* Subtext */}
                <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-white/60 max-w-3xl mx-auto mb-10 sm:mb-12 leading-relaxed font-light">
                  {shopContent.redirectMessage}
                </p>

                {/* Primary CTA Button */}
                <motion.a
                  href={shopContent.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-4 px-12 sm:px-16 py-5 sm:py-6 bg-gradient-to-r from-white to-amber-50 text-[#451C15] hover:from-amber-50 hover:to-white rounded-full transition-all group shadow-3xl hover:shadow-amber-200/40 text-lg sm:text-xl font-medium relative overflow-hidden"
                  style={{
                    boxShadow: "0 20px 50px rgba(212, 165, 116, 0.4)",
                  }}
                >
                  {/* Button shimmer */}
                  <div className="absolute inset-0 -top-4 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                  
                  <ShoppingBag className="relative z-10 w-6 h-6" />
                  <span className="relative z-10">{shopContent.ctaButtonText}</span>
                  <ArrowRight className="relative z-10 w-6 h-6 transition-transform group-hover:translate-x-2" />
                </motion.a>

                {/* Trust Indicators */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="flex flex-wrap justify-center gap-6 sm:gap-8 lg:gap-10 mt-10 sm:mt-12"
                >
                  {trustIndicators.map((indicator, index) => {
                    const Icon = indicator.icon;
                    return (
                      <motion.div
                        key={indicator.text}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + index * 0.05, duration: 0.4 }}
                        whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                        className="flex items-center gap-2 group"
                      >
                        <div 
                          className="p-2 rounded-lg bg-white/10 backdrop-blur-sm group-hover:bg-white/20 transition-all duration-300"
                          style={{ boxShadow: `0 4px 20px ${indicator.color}20` }}
                        >
                          <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-amber-200" />
                        </div>
                        <span className="text-xs sm:text-sm text-amber-100/70 font-light">
                          {indicator.text}
                        </span>
                      </motion.div>
                    );
                  })}
                </motion.div>

                {/* Additional Trust Text */}
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="text-xs sm:text-sm text-amber-200/40 mt-8 font-light"
                >
                  Established 1987 • Swiss Excellence • 100% Satisfaction Guaranteed
                </motion.p>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Bottom decorative element */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mt-16 sm:mt-20 flex flex-col items-center justify-center"
        >
          <div className="flex items-center gap-6">
            <div className="h-[1px] w-24 bg-gradient-to-r from-transparent to-[#D4A574]/50" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="w-3 h-3 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 shadow-lg shadow-amber-400/50"
            />
            <div className="h-[1px] w-24 bg-gradient-to-l from-transparent to-[#D4A574]/50" />
          </div>
          
          <p className="text-[#451C15]/40 text-sm font-light tracking-wider uppercase mt-6">
            A Legacy of Excellence
          </p>
        </motion.div>
      </div>
    </section>
  );
};