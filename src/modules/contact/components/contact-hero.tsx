// src/modules/contact/components/contact-hero.tsx

"use client";

import React from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { MapPin, Clock, Phone } from "lucide-react";
import { contactContent, isAtelierOpen } from "../data/contact-content";

export const ContactHero = () => {
  const { scrollY } = useScroll();

  // Parallax transforms - Same as BlogHero
  const backgroundY = useTransform(scrollY, [0, 1000], [0, 200]);
  const contentY = useTransform(scrollY, [0, 800], [0, -50]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0.3]);
  const scale = useTransform(scrollY, [0, 500], [1, 0.95]);

  const titleWords = contactContent.hero.title.split(" ");
  const isOpen = isAtelierOpen();

  const quickInfo = [
    {
      icon: MapPin,
      label: "Location",
      value: "Union Square, SF",
      link: `https://maps.google.com/?q=${contactContent.location.coordinates.lat},${contactContent.location.coordinates.lng}`,
    },
    {
      icon: Clock,
      label: "Status",
      value: isOpen ? "Open Now" : "Closed",
      highlight: isOpen,
    },
    {
      icon: Phone,
      label: "Call Us",
      value: "+1 (555) 123-4567",
      link: "tel:+15551234567",
    },
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
        className="relative z-10 w-full max-w-[95%] xl:max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24"
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

          <div className="relative p-8 sm:p-12 lg:p-16 xl:p-20">
            <div className="text-center max-w-5xl mx-auto">
              {/* Animated Title */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl [font-family:var(--font-playfair)] font-light leading-tight mb-6">
                {titleWords.map((word, index) => (
                  <motion.span
                    key={index}
                    className="inline-block mr-4 text-transparent bg-clip-text bg-gradient-to-br from-white via-amber-50/95 to-amber-100/90"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.8,
                      delay: index * 0.1,
                      ease: "easeOut",
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
              </h1>

              {/* Subtitle */}
              <motion.p
                className="text-xl sm:text-2xl lg:text-3xl [font-family:var(--font-playfair)] text-amber-200/80 mb-6 italic"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {contactContent.hero.subtitle}
              </motion.p>

              {/* Description */}
              <motion.p
                className="text-base sm:text-lg text-white/70 [font-family:var(--font-inter)] max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                {contactContent.hero.description}
              </motion.p>
            </div>

            {/* Quick Info Badges */}
            <motion.div
              className="flex flex-wrap justify-center gap-4 mt-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              {quickInfo.map((info, index) => {
                const Icon = info.icon;
                const content = (
                  <motion.div
                    key={info.label}
                    className={`
                      group relative bg-white/5 backdrop-blur-md border border-white/10 
                      rounded-2xl px-6 py-4 flex items-center gap-4 cursor-pointer
                      hover:bg-white/10 transition-all duration-300
                      ${info.highlight ? "ring-2 ring-amber-200/30" : ""}
                    `}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                  >
                    <div className="relative">
                      <Icon className="w-5 h-5 text-amber-200 relative z-10" />
                    </div>
                    <div className="text-left">
                      <p className="text-white/60 text-xs [font-family:var(--font-inter)] mb-1">
                        {info.label}
                      </p>
                      <p className="text-white text-sm font-medium [font-family:var(--font-inter)]">
                        {info.value}
                      </p>
                    </div>
                    {info.highlight && (
                      <motion.div
                        className="absolute -right-1 -top-1 w-3 h-3 bg-green-400 rounded-full"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [1, 0.6, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    )}
                  </motion.div>
                );

                if (info.link) {
                  return (
                    <a
                      key={info.label}
                      href={info.link}
                      target={info.link.startsWith("http") ? "_blank" : undefined}
                      rel={
                        info.link.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                    >
                      {content}
                    </a>
                  );
                }

                return content;
              })}
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              className="flex justify-center mt-12"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
            >
              <motion.div
                className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
                animate={{ y: [0, 10, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <motion.div
                  className="w-1 h-2 bg-amber-200 rounded-full mt-2"
                  animate={{ y: [0, 12, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};