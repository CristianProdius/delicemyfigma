"use client";

import React, { useEffect, useState } from "react";
import { motion, useAnimation, useScroll, useTransform } from "motion/react";
import {
  ExternalLink,
  ChevronDown,
  GraduationCap,
  BookOpen,
  Award,
  Users,
  Sparkles,
  ChefHat,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface SchoolHeroProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaUrl: string;
  secondaryCtaText: string;
  onSecondaryClick: () => void;
  backgroundImage: string;
  showBadge: boolean;
  className?: string;
}

// Floating icon component for decorative elements
const FloatingIcon: React.FC<{
  icon: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}> = ({ icon, delay = 0, duration = 20, className }) => {
  return (
    <motion.div
      className={cn("absolute opacity-20", className)}
      animate={{
        y: [0, -30, 0],
        rotate: [0, 10, -10, 0],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    >
      {icon}
    </motion.div>
  );
};

// Chocolate piece component
const ChocolatePiece: React.FC<{
  type: "dark" | "milk" | "white";
  position: { top?: string; bottom?: string; left?: string; right?: string };
  delay?: number;
}> = ({ type, position, delay = 0 }) => {
  const colors = {
    dark: "bg-amber-900",
    milk: "bg-amber-700",
    white: "bg-amber-100",
  };

  return (
    <motion.div
      className={cn("absolute w-8 h-8 rounded-sm shadow-lg", colors[type])}
      style={position}
      animate={{
        y: [0, -20, 0],
        rotate: [0, 360],
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: 15,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    >
      {/* Chocolate square pattern */}
      <div className="grid grid-cols-2 gap-0.5 p-0.5">
        <div className="bg-black/10 rounded-sm" />
        <div className="bg-black/10 rounded-sm" />
        <div className="bg-black/10 rounded-sm" />
        <div className="bg-black/10 rounded-sm" />
      </div>
    </motion.div>
  );
};

// Cat mascot component in chef instructor attire
const ChefCatMascot: React.FC<{ className?: string }> = ({ className }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={cn("absolute", className)}
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.5,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative"
      >
        {/* Cat body */}
        <div className="relative w-32 h-40">
          {/* Chef hat */}
          <motion.div
            className="absolute -top-8 left-1/2 transform -translate-x-1/2 z-10"
            animate={{
              rotate: isHovered ? [0, -5, 5, 0] : 0,
            }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              <div className="w-20 h-24 bg-white rounded-t-full shadow-lg">
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-white rounded-full shadow-md" />
              </div>
              {/* Hat band */}
              <div className="absolute bottom-0 w-20 h-3 bg-amber-600 rounded-sm" />
            </div>
          </motion.div>

          {/* Cat head */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-gradient-to-b from-gray-800 to-gray-700 rounded-full shadow-lg z-5">
            {/* Ears */}
            <div className="absolute -top-3 left-3 w-0 h-0 border-l-[12px] border-l-transparent border-b-[20px] border-b-gray-800 border-r-[12px] border-r-transparent" />
            <div className="absolute -top-3 right-3 w-0 h-0 border-l-[12px] border-l-transparent border-b-[20px] border-b-gray-800 border-r-[12px] border-r-transparent" />

            {/* Eyes */}
            <motion.div
              className="absolute top-8 left-6 w-3 h-3 bg-green-400 rounded-full"
              animate={{
                scaleY: isHovered ? [1, 0.1, 1] : 1,
              }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className="absolute top-8 right-6 w-3 h-3 bg-green-400 rounded-full"
              animate={{
                scaleY: isHovered ? [1, 0.1, 1] : 1,
              }}
              transition={{ duration: 0.3, delay: 0.1 }}
            />

            {/* Nose */}
            <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-t-[6px] border-t-pink-400 border-r-[4px] border-r-transparent" />

            {/* Whiskers */}
            <div className="absolute top-12 left-2 w-8 h-0.5 bg-gray-300 transform -rotate-12" />
            <div className="absolute top-14 left-2 w-8 h-0.5 bg-gray-300" />
            <div className="absolute top-12 right-2 w-8 h-0.5 bg-gray-300 transform rotate-12" />
            <div className="absolute top-14 right-2 w-8 h-0.5 bg-gray-300" />
          </div>

          {/* Chef jacket */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-28 h-20 bg-white rounded-t-3xl shadow-lg">
            {/* Double-breasted buttons */}
            <div className="flex justify-center gap-4 pt-4">
              <div className="flex flex-col gap-2">
                <div className="w-2 h-2 bg-gray-800 rounded-full" />
                <div className="w-2 h-2 bg-gray-800 rounded-full" />
              </div>
              <div className="flex flex-col gap-2">
                <div className="w-2 h-2 bg-gray-800 rounded-full" />
                <div className="w-2 h-2 bg-gray-800 rounded-full" />
              </div>
            </div>

            {/* Arms/paws */}
            <motion.div
              className="absolute -left-4 top-2 w-8 h-12 bg-white rounded-full shadow-md"
              animate={{
                rotate: isHovered ? [0, -20, 0] : 0,
              }}
              transition={{ duration: 0.5 }}
            />
            <motion.div
              className="absolute -right-4 top-2 w-8 h-12 bg-white rounded-full shadow-md"
              animate={{
                rotate: isHovered ? [0, 20, 0] : 0,
              }}
              transition={{ duration: 0.5 }}
            >
              {/* Holding a whisk */}
              <div className="absolute -top-4 right-1 w-1 h-8 bg-gray-400 rounded-full">
                <div className="absolute -top-2 -left-1 w-3 h-3 border-2 border-gray-400 rounded-full" />
              </div>
            </motion.div>
          </div>

          {/* Speech bubble on hover */}
          {isHovered && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute -top-20 -right-20 bg-white px-3 py-2 rounded-lg shadow-lg"
            >
              <p className="text-xs font-medium text-gray-800">
                Let&apos;s make chocolate!
              </p>
              <div className="absolute bottom-0 left-4 w-0 h-0 border-l-[6px] border-l-transparent border-t-[8px] border-t-white border-r-[6px] border-r-transparent" />
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export const SchoolHero: React.FC<SchoolHeroProps> = ({
  title,
  subtitle,
  ctaText,
  ctaUrl,
  secondaryCtaText,
  onSecondaryClick,
  backgroundImage,
  showBadge,
  className,
}) => {
  const controls = useAnimation();
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 500], [0, -50]);

  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeInOut" as const,
      },
    },
  };

  return (
    <section className={cn("relative min-h-screen overflow-hidden", className)}>
      {/* Background image with parallax */}
      <motion.div className="absolute inset-0 z-0" style={{ y: parallaxY }}>
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-amber-900/40 via-amber-800/50 to-amber-950/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-amber-950/30 via-transparent to-amber-950/30" />
      </motion.div>

      {/* Floating decorative elements */}
      <FloatingIcon
        icon={<GraduationCap className="w-12 h-12 text-amber-300" />}
        className="top-20 left-10 lg:left-20"
        delay={0}
      />
      <FloatingIcon
        icon={<BookOpen className="w-10 h-10 text-amber-400" />}
        className="top-40 right-10 lg:right-20"
        delay={2}
      />
      <FloatingIcon
        icon={<Award className="w-14 h-14 text-amber-300" />}
        className="bottom-40 left-10 lg:left-32"
        delay={1}
      />
      <FloatingIcon
        icon={<Users className="w-10 h-10 text-amber-400" />}
        className="bottom-20 right-10 lg:right-32"
        delay={3}
      />

      {/* Floating chocolate pieces */}
      <ChocolatePiece
        type="dark"
        position={{ top: "15%", left: "5%" }}
        delay={0.5}
      />
      <ChocolatePiece
        type="milk"
        position={{ top: "25%", right: "8%" }}
        delay={1.5}
      />
      <ChocolatePiece
        type="white"
        position={{ bottom: "30%", left: "10%" }}
        delay={2.5}
      />
      <ChocolatePiece
        type="dark"
        position={{ bottom: "15%", right: "5%" }}
        delay={3.5}
      />

      {/* Cat mascot */}
      <ChefCatMascot className="bottom-10 right-10 lg:bottom-20 lg:right-20 hidden md:block" />

      {/* Main content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Glassmorphism background for text */}
          <div className="relative">
            <div className="absolute inset-0 bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl" />
            <div className="relative px-8 py-12 sm:px-12 sm:py-16 lg:px-16 lg:py-20">
              {/* Professional certification badge */}
              {showBadge && (
                <motion.div
                  variants={itemVariants}
                  className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full shadow-lg"
                >
                  <Sparkles className="w-4 h-4" />
                  <span className="text-sm font-semibold">
                    Professional Certification Available
                  </span>
                  <Sparkles className="w-4 h-4" />
                </motion.div>
              )}

              {/* Title with gradient */}
              <motion.h1
                variants={itemVariants}
                className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6"
              >
                <span className="bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200 bg-clip-text text-transparent">
                  {title}
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                variants={itemVariants}
                className="text-xl sm:text-2xl lg:text-3xl text-amber-50 mb-10 font-light"
              >
                {subtitle}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                {/* Primary CTA with external link */}
                <motion.a
                  href={ctaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-full shadow-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10">{ctaText}</span>
                  <ExternalLink className="relative z-10 w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-amber-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.a>

                {/* Secondary CTA for scrolling */}
                <motion.button
                  onClick={onSecondaryClick}
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-white/20 backdrop-blur-md text-white font-semibold rounded-full border-2 border-white/30 shadow-lg transition-all duration-300 hover:bg-white/30 hover:border-white/50 hover:shadow-xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>{secondaryCtaText}</span>
                  <ChevronDown className="w-5 h-5 animate-bounce" />
                </motion.button>
              </motion.div>

              {/* Additional decorative element */}
              <motion.div
                variants={itemVariants}
                className="mt-10 flex justify-center items-center gap-2 text-amber-200/60"
              >
                <ChefHat className="w-5 h-5" />
                <span className="text-sm">
                  Join hundreds of aspiring chocolatiers
                </span>
                <ChefHat className="w-5 h-5" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Animated scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <ChevronDown className="w-8 h-8 text-white/60" />
      </motion.div>
    </section>
  );
};

export default SchoolHero;
