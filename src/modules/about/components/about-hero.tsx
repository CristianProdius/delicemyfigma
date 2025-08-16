// src/modules/about/components/about-hero.tsx
"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { Sparkles, Award, Users, Heart, Star } from "lucide-react";

interface AboutHeroProps {
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  image: string;
  signature?: string;
  variant?: "personal" | "company";
  accentColor?: string;
}

export const AboutHero = ({
  title,
  subtitle,
  tagline,
  description,
  image,
  signature,
  variant = "personal",
  accentColor = "#D4A574",
}: AboutHeroProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  // Floating animation values
  const floatingY = useTransform(scrollYProgress, [0, 1], [0, -20]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#1A0F0A" }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, ${accentColor}22 0%, transparent 50%),
                              radial-gradient(circle at 80% 80%, ${accentColor}15 0%, transparent 50%),
                              radial-gradient(circle at 40% 20%, ${accentColor}10 0%, transparent 50%)`,
          }}
        />
      </div>

      {/* Decorative Elements */}
      <motion.div
        className="absolute top-20 left-10 text-yellow-600/20"
        animate={{
          rotate: 360,
          scale: [1, 1.2, 1],
        }}
        transition={{
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <Sparkles className="w-8 h-8" />
      </motion.div>

      <motion.div
        className="absolute bottom-20 right-10 text-yellow-600/20"
        animate={{
          rotate: -360,
          scale: [1, 1.3, 1],
        }}
        transition={{
          rotate: { duration: 25, repeat: Infinity, ease: "linear" },
          scale: { duration: 5, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <Star className="w-10 h-10" />
      </motion.div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content Side */}
          <motion.div
            style={{ opacity, y: textY }}
            className={`${variant === "company" ? "lg:order-2" : ""}`}
          >
            {/* Subtitle */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-4"
            >
              <span
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
                style={{
                  backgroundColor: `${accentColor}20`,
                  color: accentColor,
                  border: `1px solid ${accentColor}40`,
                }}
              >
                {variant === "personal" ? (
                  <Award className="w-4 h-4" />
                ) : (
                  <Users className="w-4 h-4" />
                )}
                {subtitle}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            >
              {title.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.2 + index * 0.1,
                  }}
                  className="inline-block mr-3"
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl md:text-2xl font-light mb-8"
              style={{ color: accentColor }}
            >
              {tagline}
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-gray-300 text-lg leading-relaxed mb-8"
            >
              {description}
            </motion.p>

            {/* Signature (Personal Variant) */}
            {variant === "personal" && signature && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="relative w-48 h-24"
              >
                <Image
                  src={signature}
                  alt="Signature"
                  fill
                  className="object-contain filter invert opacity-60"
                />
              </motion.div>
            )}

            {/* Stats (Company Variant) */}
            {variant === "company" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-wrap gap-8 mt-8"
              >
                {[
                  { label: "Years of Excellence", value: "6+" },
                  { label: "Happy Customers", value: "10K+" },
                  { label: "Awards Won", value: "15+" },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.6 + index * 0.1,
                      type: "spring",
                      stiffness: 100,
                    }}
                    className="text-center"
                  >
                    <div
                      className="text-3xl font-bold mb-1"
                      style={{ color: accentColor }}
                    >
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>

          {/* Image Side */}
          <motion.div
            style={{ opacity, y }}
            className={`relative ${variant === "company" ? "lg:order-1" : ""}`}
          >
            {/* Main Image Container */}
            <motion.div
              style={{ scale }}
              className="relative rounded-2xl overflow-hidden shadow-2xl"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              />

              <div className="relative aspect-[4/5] md:aspect-square lg:aspect-[4/5]">
                <Image
                  src={image}
                  alt={title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Floating Badge */}
              <motion.div
                style={{ y: floatingY }}
                className="absolute top-6 right-6 z-20"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-lg"
                  style={{ borderColor: accentColor, borderWidth: 2 }}
                >
                  {variant === "personal" ? (
                    <Heart className="w-6 h-6" style={{ color: accentColor }} />
                  ) : (
                    <Award className="w-6 h-6" style={{ color: accentColor }} />
                  )}
                </motion.div>
              </motion.div>

              {/* Decorative Frame */}
              <motion.div
                className="absolute inset-4 border-2 rounded-xl pointer-events-none z-20"
                style={{ borderColor: `${accentColor}40` }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              />
            </motion.div>

            {/* Side Decorations */}
            <motion.div
              className="absolute -top-4 -left-4 w-24 h-24 rounded-full blur-2xl"
              style={{ backgroundColor: `${accentColor}30` }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <motion.div
              className="absolute -bottom-4 -right-4 w-32 h-32 rounded-full blur-3xl"
              style={{ backgroundColor: `${accentColor}25` }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.25, 0.4, 0.25],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            />
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          delay: 1,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center text-gray-400">
          <span className="text-xs uppercase tracking-wider mb-2">
            Scroll to explore
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-gray-400 rounded-full mt-2" />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
