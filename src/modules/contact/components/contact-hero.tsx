// src/modules/contact/components/contact-hero.tsx

"use client";

import React from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { MapPin, Clock, Phone, Sparkles, Star, Heart } from "lucide-react";
import { contactContent, isAtelierOpen } from "../data/contact-content";

export const ContactHero = () => {
  const { scrollY } = useScroll();

  // Parallax transforms
  const backgroundY = useTransform(scrollY, [0, 1000], [0, 100]);
  const contentY = useTransform(scrollY, [0, 800], [0, 50]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

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

  // Floating decorative elements configuration
  const floatingElements = [
    { id: 1, size: 24, top: "10%", left: "5%", duration: 15, delay: 0 },
    { id: 2, size: 32, top: "20%", right: "10%", duration: 20, delay: 2 },
    { id: 3, size: 20, bottom: "30%", left: "8%", duration: 18, delay: 1 },
    { id: 4, size: 28, top: "40%", right: "5%", duration: 22, delay: 3 },
    { id: 5, size: 16, bottom: "20%", right: "15%", duration: 16, delay: 1.5 },
  ];

  const geometricShapes = [
    {
      id: 1,
      type: "circle",
      size: 120,
      top: "15%",
      left: "70%",
      opacity: 0.05,
    },
    {
      id: 2,
      type: "square",
      size: 80,
      bottom: "25%",
      left: "10%",
      opacity: 0.03,
    },
    {
      id: 3,
      type: "triangle",
      size: 100,
      top: "60%",
      right: "20%",
      opacity: 0.04,
    },
  ];

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Parallax Background */}
      <motion.div style={{ y: backgroundY }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#F8F6F3]" />
        <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] bg-cover bg-center bg-no-repeat" />
      </motion.div>

      {/* Dark Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#451C15]/80 via-[#451C15]/60 to-[#451C15]/80 z-10" />

      {/* Floating Decorative Elements */}
      {/* Sparkles */}
      {floatingElements.map((element) => (
        <motion.div
          key={`sparkle-${element.id}`}
          className="absolute z-20 text-[#D4A574]"
          style={{
            top: element.top,
            left: element.left,
            right: element.right,
            bottom: element.bottom,
          }}
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: element.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: element.delay,
          }}
        >
          <Sparkles size={element.size} />
        </motion.div>
      ))}

      {/* Geometric Shapes */}
      {geometricShapes.map((shape) => (
        <motion.div
          key={`shape-${shape.id}`}
          className="absolute z-5"
          style={{
            top: shape.top,
            left: shape.left,
            right: shape.right,
            bottom: shape.bottom,
            width: shape.size,
            height: shape.size,
          }}
          animate={{
            rotate: shape.type === "square" ? [0, 90, 180, 270, 360] : 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {shape.type === "circle" && (
            <div
              className="w-full h-full rounded-full"
              style={{
                background: `radial-gradient(circle, rgba(212, 165, 116, ${shape.opacity}) 0%, transparent 70%)`,
              }}
            />
          )}
          {shape.type === "square" && (
            <div
              className="w-full h-full"
              style={{
                background: `linear-gradient(45deg, rgba(232, 180, 184, ${shape.opacity}) 0%, transparent 70%)`,
              }}
            />
          )}
          {shape.type === "triangle" && (
            <div
              className="w-0 h-0"
              style={{
                borderLeft: `${shape.size / 2}px solid transparent`,
                borderRight: `${shape.size / 2}px solid transparent`,
                borderBottom: `${shape.size}px solid rgba(212, 165, 116, ${shape.opacity})`,
              }}
            />
          )}
        </motion.div>
      ))}

      {/* Main Content */}
      <motion.div
        style={{ y: contentY, opacity }}
        className="relative z-30 max-w-[95%] xl:max-w-[90%] mx-auto py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center max-w-5xl mx-auto">
          {/* Animated Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl [font-family:var(--font-playfair)] text-white font-light leading-tight mb-6">
            {titleWords.map((word, index) => (
              <motion.span
                key={index}
                className="inline-block mr-4"
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
            className="text-xl sm:text-2xl lg:text-3xl [font-family:var(--font-playfair)] text-[#D4A574] mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {contactContent.hero.subtitle}
          </motion.p>

          {/* Description */}
          <motion.p
            className="text-base sm:text-lg text-white/90 [font-family:var(--font-inter)] max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {contactContent.hero.description}
          </motion.p>

          {/* Decorative Stars */}
          <motion.div
            className="flex justify-center items-center gap-4 mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  rotate: 360,
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "linear",
                }}
              >
                <Star className="w-5 h-5 text-[#D4A574] fill-[#D4A574]" />
              </motion.div>
            ))}
          </motion.div>
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
                  group relative backdrop-blur-md bg-white/10 border border-white/20 
                  rounded-2xl px-6 py-4 flex items-center gap-4 cursor-pointer
                  hover:bg-white/15 transition-all duration-300
                  ${info.highlight ? "ring-2 ring-[#D4A574]/50" : ""}
                `}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-[#D4A574]/20 rounded-full blur-lg group-hover:blur-xl transition-all" />
                  <Icon className="w-5 h-5 text-[#D4A574] relative z-10" />
                </div>
                <div className="text-left">
                  <p className="text-white/70 text-xs [font-family:var(--font-inter)] mb-1">
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
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
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
              className="w-1 h-2 bg-[#D4A574] rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};
