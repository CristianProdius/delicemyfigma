
"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import { motion } from "motion/react";

const heroContent = {
  heading: {
    line1: "The Art of Chocolate",
    line2: "Perfected",
  },
  button: {
    text: "Begin Your Journey",
    link: "/services",
  },
  quote: {
    author: "// ALEXA DELL",
    text: "I believe chocolate is more than confection—it's a medium for connection, creativity, and unforgettable moments.",
  },
  stats: {
    count: "157K",
    label: "Happy Clients",
  },
  article: {
    title: "The Art of Chocolate Making",
    cta: "Read More →",
    image: "/img/adult-classes.jpg",
  },
};

export const Hero = () => {
  return (
    <section className="relative z-10 flex flex-col w-full max-w-[91.666667%] mx-auto h-auto mt-32">
      {/* Ultra premium glassmorphism container */}
      <div className="relative">
        {/* Gradient border effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-200/30 via-amber-300/20 to-amber-400/10 rounded-2xl sm:rounded-[2rem] md:rounded-[2.5rem] lg:rounded-[3rem] blur-xl" />

        <div className="relative bg-gradient-to-br from-amber-950/50 via-amber-900/40 to-amber-950/50 backdrop-blur-2xl rounded-2xl sm:rounded-[2rem] md:rounded-[2.5rem] lg:rounded-[3rem] border border-white/10 overflow-hidden">
          {/* Animated gradient orbs - responsive sizing */}
          <motion.div
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-10 sm:top-20 right-10 sm:right-20 w-[200px] sm:w-[300px] md:w-[400px] lg:w-[500px] h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] bg-gradient-radial from-amber-400/20 via-amber-500/10 to-transparent rounded-full blur-3xl pointer-events-none"
          />
          <motion.div
            animate={{
              x: [0, -100, 0],
              y: [0, 100, 0],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-10 sm:bottom-20 left-10 sm:left-20 w-[150px] sm:w-[250px] md:w-[350px] lg:w-[400px] h-[150px] sm:h-[250px] md:h-[350px] lg:h-[400px] bg-gradient-radial from-amber-600/15 via-amber-700/10 to-transparent rounded-full blur-3xl pointer-events-none"
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

          <div className="relative p-6 sm:p-8 md:p-10 lg:p-14 xl:p-20">


            {/* Main content grid - adjusted for 70/30 split on desktop */}
            <div className="grid grid-cols-1 lg:grid-cols-[70fr_30fr] gap-8 md:gap-10 lg:gap-12 xl:gap-16 items-start lg:items-stretch mt-8 sm:mt-10 lg:mt-16">
              {/* Left Content - Takes 70% on desktop */}
              <motion.div
                initial={{ opacity: 0, x: -60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="text-center lg:text-left flex flex-col justify-center lg:justify-center space-y-6 sm:space-y-8 lg:space-y-12 lg:py-8"
              >
                {/* Heading with refined typography - responsive sizing */}
                <div className="relative">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.2,
                      duration: 1,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <h1 className="[font-family:var(--font-playfair)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-extralight leading-[0.95] tracking-[-0.02em]">
                      <span className="block text-transparent bg-clip-text bg-gradient-to-br from-white via-amber-50/95 to-amber-100/90 drop-shadow-2xl">
                        {heroContent.heading.line1}
                      </span>
                      <span className="block mt-1 sm:mt-2 lg:mt-4 text-transparent bg-clip-text bg-gradient-to-br from-amber-100/90 via-amber-200/80 to-amber-300/70 italic font-thin">
                        {heroContent.heading.line2}
                      </span>
                    </h1>
                  </motion.div>

                  {/* Refined accent line */}
                  <motion.div
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    transition={{
                      delay: 0.8,
                      duration: 1,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="absolute -bottom-4 sm:-bottom-6 left-0 lg:left-0 right-0 lg:right-auto w-24 sm:w-32 lg:w-40 h-[1px] mx-auto lg:mx-0 origin-center lg:origin-left"
                  >
                    <div className="h-full bg-gradient-to-r from-amber-400 via-amber-300/50 to-transparent" />
                  </motion.div>
                </div>

                {/* CTA and Quote with improved spacing */}
                <div className="flex flex-col space-y-6 sm:space-y-8 lg:space-y-10">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: 0.5,
                      duration: 0.8,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="mx-auto lg:mx-0 lg:self-start"
                  >
                    <Button
                      onClick={() =>
                        (window.location.href = heroContent.button.link)
                      }
                      size="lg"
                      className="relative group bg-gradient-to-r from-amber-100 via-amber-50 to-white text-amber-950 hover:from-white hover:via-amber-50 hover:to-amber-100 rounded-full px-6 sm:px-8 py-3 sm:py-4 lg:px-12 lg:py-6 text-sm sm:text-base lg:text-lg xl:text-xl font-medium transition-all duration-500 shadow-2xl hover:shadow-amber-200/40 hover:shadow-3xl overflow-hidden"
                    >
                      {/* Button shimmer effect */}
                      <div className="absolute inset-0 -top-2 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />

                      <span className="relative z-10 flex items-center gap-2 sm:gap-3">
                        {heroContent.button.text}
                        <motion.svg
                          width="16"
                          height="16"
                          className="sm:w-5 sm:h-5"
                          viewBox="0 0 24 24"
                          fill="none"
                          animate={{ x: [0, 8, 0] }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        >
                          <path
                            d="M5 12H19M19 12L12 5M19 12L12 19"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </motion.svg>
                      </span>
                    </Button>
                  </motion.div>

                  {/* Enhanced Quote with better styling */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.8 }}
                    className="max-w-lg sm:max-w-xl mx-auto lg:mx-0 text-center lg:text-left px-4 sm:px-0"
                  >
                    <div className="relative pl-6 sm:pl-8 lg:pl-12">
                      {/* Quote mark */}
                      <div className="absolute left-0 -top-2 sm:-top-4 text-amber-300/20 text-4xl sm:text-6xl lg:text-7xl font-serif leading-none select-none">
                        &apos;
                      </div>

                      <p className="text-amber-200/70 text-[10px] sm:text-xs lg:text-sm mb-2 sm:mb-3 font-medium tracking-[0.3em] uppercase [font-family:var(--font-inter)]">
                        {heroContent.quote.author}
                      </p>
                      <p className="text-white/50 text-xs sm:text-sm lg:text-base xl:text-lg leading-relaxed italic font-light [font-family:var(--font-inter)]">
                        {heroContent.quote.text}
                      </p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Right Content - Cards positioned at bottom right */}
              <div className="flex flex-col sm:flex-row lg:flex-col gap-4 sm:gap-4 lg:gap-6 items-center sm:justify-center lg:items-end lg:justify-end mt-6 sm:mt-8 lg:mt-0 lg:self-end lg:pb-8">
                {/* Happy Clients Card - Floating effect */}
                <motion.div
                  initial={{ opacity: 0, x: 60, y: 60 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{
                    delay: 0.9,
                    duration: 1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{
                    y: -8,
                    rotate: -2,
                    transition: { duration: 0.3, ease: "easeOut" },
                  }}
                  className="w-full sm:w-auto sm:flex-1 lg:flex-initial max-w-[280px] sm:max-w-none lg:max-w-[260px] xl:max-w-[280px]"
                >
                  <Card className="relative group bg-gradient-to-br from-white/12 via-white/8 to-amber-100/5 backdrop-blur-xl border border-white/15 p-4 sm:p-4 lg:p-5 xl:p-6 rounded-xl sm:rounded-2xl lg:rounded-3xl transition-all duration-500 shadow-2xl hover:shadow-amber-200/30 hover:shadow-3xl overflow-hidden">
                    {/* Animated background gradient */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-amber-400/0 via-amber-300/10 to-amber-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                      animate={{
                        backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
                      }}
                      transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />

                    <div className="flex items-center justify-between gap-3 sm:gap-4 relative z-10">
                      <div className="flex -space-x-2 sm:-space-x-3">
                        {[1, 2, 3].map((_, i) => (
                          <motion.div
                            key={i}
                            whileHover={{ scale: 1.15, zIndex: 10 }}
                            transition={{ type: "spring", stiffness: 400 }}
                          >
                            <Avatar className="border-2 border-amber-200/40 w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 xl:w-11 xl:h-11 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                              <AvatarImage src={`/avatar-${i + 1}.jpg`} />
                              <AvatarFallback className="bg-gradient-to-br from-amber-200 to-amber-400 text-amber-900 text-[10px] sm:text-xs font-medium">
                                U{i + 1}
                              </AvatarFallback>
                            </Avatar>
                          </motion.div>
                        ))}
                        <Avatar className="border-2 border-amber-200/40 bg-gradient-to-br from-amber-500 to-amber-700 w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 xl:w-11 xl:h-11 shadow-xl">
                          <AvatarFallback className="text-white text-xs sm:text-sm font-semibold">
                            +
                          </AvatarFallback>
                        </Avatar>
                      </div>

                      <div className="text-right">
                        <motion.p
                          className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-extralight bg-gradient-to-br from-white via-amber-50 to-amber-200 bg-clip-text text-transparent"
                          animate={{ opacity: [0.7, 1, 0.7] }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        >
                          {heroContent.stats.count}
                        </motion.p>
                        <p className="text-[10px] sm:text-xs lg:text-sm text-amber-100/60 font-light mt-0.5 sm:mt-1">
                          {heroContent.stats.label}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>

                {/* Article Card - Premium feel */}
                <motion.div
                  initial={{ opacity: 0, x: 60, y: 60 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{
                    delay: 1.1,
                    duration: 1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{
                    y: -8,
                    rotate: 2,
                    transition: { duration: 0.3, ease: "easeOut" },
                  }}
                  className="w-full sm:w-auto sm:flex-1 lg:flex-initial max-w-[280px] sm:max-w-none lg:max-w-[260px] xl:max-w-[280px]"
                >
                  <Card className="relative group bg-gradient-to-br from-white/12 via-white/8 to-amber-100/5 backdrop-blur-xl border border-white/15 p-3 sm:p-4 lg:p-4 xl:p-5 rounded-xl sm:rounded-2xl lg:rounded-3xl transition-all duration-500 shadow-2xl hover:shadow-amber-200/30 hover:shadow-3xl cursor-pointer overflow-hidden">
                    <motion.div className="absolute inset-0 bg-gradient-to-tr from-amber-400/0 via-amber-300/5 to-amber-200/10 opacity-0 group-hover:opacity-100 transition-all duration-700" />

                    <div className="flex items-center space-x-3 sm:space-x-4 relative z-10">
                      <motion.div
                        className="relative w-14 h-14 sm:w-16 sm:h-16 lg:w-18 lg:h-18 xl:w-20 xl:h-20 rounded-lg sm:rounded-xl lg:rounded-2xl overflow-hidden flex-shrink-0 shadow-xl group-hover:shadow-2xl transition-all duration-500"
                        whileHover={{ scale: 1.05 }}
                      >
                        <Image
                          src={heroContent.article.image}
                          alt="Article Thumbnail"
                          layout="fill"
                          objectFit="cover"
                          className="group-hover:scale-110 transition-transform duration-700"
                        />
                        {/* Image overlay gradient */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-amber-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </motion.div>

                      <div className="min-w-0 flex-1">
                        <h3 className="text-white/90 font-light text-xs sm:text-sm lg:text-base xl:text-lg truncate group-hover:text-amber-50 transition-colors duration-500">
                          {heroContent.article.title}
                        </h3>
                        <motion.p
                          className="text-amber-200/50 text-[10px] sm:text-xs lg:text-sm group-hover:text-amber-200/80 transition-all duration-500 inline-flex items-center gap-1 sm:gap-2 mt-0.5 sm:mt-1"
                          whileHover={{ gap: "12px" }}
                        >
                          <span>{heroContent.article.cta}</span>
                        </motion.p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
