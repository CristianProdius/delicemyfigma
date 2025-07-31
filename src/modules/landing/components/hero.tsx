"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import Header from "@/components/header";
import { motion } from "motion/react";

const heroContent = {
  heading: {
    line1: "The Art of Chocolate",
    line2: "Perfected",
  },
  button: {
    text: "Begin Your Journey",
  },
  quote: {
    author: "// Alexa Dell",
    text: "I believe chocolate is more than confection—it's a medium for connection, creativity, and unforgettable moments.",
  },
  stats: {
    count: "157K",
    label: "Happy Clients",
  },
  article: {
    title: "The Art of Tiramisu",
    cta: "Read More →",
  },
};

export const Hero = () => {
  return (
    <section className="relative z-10 flex flex-col w-[95%] sm:w-[92%] h-auto overflow-hidden">
      {/* Enhanced glassmorphism container with gradient border */}
      <div className="relative bg-gradient-to-br from-white/20 via-white/10 to-amber-100/10 backdrop-blur-lg rounded-2xl sm:rounded-3xl lg:rounded-[2.5rem] p-[1px]">
        <div className="relative bg-gradient-to-br from-amber-950/40 via-amber-900/30 to-amber-950/40 backdrop-blur-md rounded-2xl sm:rounded-3xl lg:rounded-[2.5rem] p-4 sm:p-6 md:p-8 lg:p-10 overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-radial from-amber-500/10 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-radial from-amber-600/10 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />

          <Header />

          {/* Main content grid - Changed to 70/30 split */}
          <div className="grid grid-cols-1 lg:grid-cols-[70fr_30fr] gap-8 md:gap-10 lg:gap-12 xl:gap-16 items-center lg:items-stretch flex-1 mt-8 lg:mt-12 relative">
            {/* Left Content - Now has more space */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center lg:text-left flex flex-col justify-center lg:justify-center space-y-6 sm:space-y-8 lg:space-y-10 lg:py-8"
            >
              {/* Heading with enhanced typography */}
              <div className="relative">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="[font-family:var(--font-playfair)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-light text-transparent bg-clip-text bg-gradient-to-br from-white via-amber-50 to-amber-100 leading-[1.1] tracking-tight drop-shadow-2xl"
                >
                  {heroContent.heading.line1}
                  <br />
                  <span className="[font-family:var(--font-playfair)] font-extralight italic">
                    {heroContent.heading.line2}
                  </span>
                </motion.h1>

                {/* Decorative accent */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="absolute -bottom-4 left-0 lg:left-0 right-0 lg:right-auto w-full lg:w-32 h-[2px] bg-gradient-to-r from-amber-400 via-amber-300 to-transparent rounded-full mx-auto lg:mx-0"
                />
              </div>

              {/* CTA and Quote */}
              <div className="flex flex-col space-y-6 sm:space-y-8">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    size="lg"
                    className="relative bg-gradient-to-br from-amber-100 to-amber-50 text-amber-950 hover:from-amber-50 hover:to-white active:from-white active:to-amber-100 rounded-full px-6 py-3 sm:px-8 sm:py-4 lg:px-10 lg:py-6 text-base sm:text-lg lg:text-xl font-medium w-full sm:w-auto sm:max-w-xs lg:max-w-sm mx-auto lg:mx-0 transition-all duration-300 shadow-2xl hover:shadow-amber-300/50 hover:shadow-3xl group overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {heroContent.button.text}
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="inline-block"
                      >
                        →
                      </motion.span>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-200/0 via-amber-200/50 to-amber-200/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                  </Button>
                </motion.div>

                {/* Enhanced Quote Section - Now has more room to breathe */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="max-w-lg mx-auto lg:mx-0 text-center lg:text-left relative"
                >
                  <div className="absolute -left-4 -top-2 text-amber-300/30 text-6xl font-serif">
                    &quot;
                  </div>
                  <p className="text-amber-100 text-sm sm:text-base lg:text-lg mb-2 font-light tracking-widest uppercase">
                    {heroContent.quote.author}
                  </p>
                  <p className="text-white/70 text-xs sm:text-sm lg:text-base leading-relaxed italic font-light">
                    {heroContent.quote.text}
                  </p>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Content - Enhanced Cards in smaller column */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-4 items-center sm:justify-center lg:items-end lg:justify-end mt-8 lg:mt-0 lg:pb-0">
              {/* Happy Clients Card - Adjusted for narrower column */}
              <motion.div
                initial={{ opacity: 0, x: 50, y: 50 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="w-full"
              >
                <Card className="relative bg-gradient-to-br from-white/15 via-white/10 to-amber-100/5 backdrop-blur-lg border border-white/20 p-3 sm:p-4 rounded-xl sm:rounded-2xl w-full hover:from-white/20 hover:via-white/15 hover:to-amber-100/10 transition-all duration-300 shadow-2xl hover:shadow-amber-300/20 hover:shadow-3xl overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-400/0 via-amber-300/5 to-amber-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="flex items-center justify-between gap-2 sm:gap-3 relative z-10">
                    <div className="flex -space-x-2">
                      <motion.div
                        whileHover={{ scale: 1.1, zIndex: 10 }}
                        className="relative"
                      >
                        <Avatar className="border-2 border-amber-200/50 w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 shadow-lg">
                          <AvatarImage src="/img/avatar1.jpg" />
                          <AvatarFallback className="bg-gradient-to-br from-amber-200 to-amber-300 text-amber-900 text-xs">
                            U1
                          </AvatarFallback>
                        </Avatar>
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.1, zIndex: 10 }}
                        className="relative"
                      >
                        <Avatar className="border-2 border-amber-200/50 w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 shadow-lg">
                          <AvatarImage src="/img/avatar2.jpg" />
                          <AvatarFallback className="bg-gradient-to-br from-amber-200 to-amber-300 text-amber-900 text-xs">
                            U2
                          </AvatarFallback>
                        </Avatar>
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.1, zIndex: 10 }}
                        className="relative"
                      >
                        <Avatar className="border-2 border-amber-200/50 w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 shadow-lg">
                          <AvatarImage src="/img/avatar3.jpg" />
                          <AvatarFallback className="bg-gradient-to-br from-amber-200 to-amber-300 text-amber-900 text-xs">
                            U3
                          </AvatarFallback>
                        </Avatar>
                      </motion.div>
                      <Avatar className="border-2 border-amber-200/50 bg-gradient-to-br from-amber-600 to-amber-700 w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 shadow-lg">
                        <AvatarFallback className="text-white text-xs sm:text-sm font-medium">
                          +
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="text-right">
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 0.5 }}
                        className="text-xl sm:text-2xl lg:text-3xl font-light bg-gradient-to-br from-white to-amber-100 bg-clip-text text-transparent"
                      >
                        {heroContent.stats.count}
                      </motion.p>
                      <p className="text-xs sm:text-sm text-amber-100/80 font-light">
                        {heroContent.stats.label}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Enhanced Tiramisu Card - Adjusted for narrower column */}
              <motion.div
                initial={{ opacity: 0, x: 50, y: 50 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="w-full"
              >
                <Card className="relative bg-gradient-to-br from-white/15 via-white/10 to-amber-100/5 backdrop-blur-lg border border-white/20 p-3 sm:p-4 rounded-xl sm:rounded-2xl w-full hover:from-white/20 hover:via-white/15 hover:to-amber-100/10 transition-all duration-300 shadow-2xl hover:shadow-amber-300/20 hover:shadow-3xl cursor-pointer group overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-400/0 via-amber-300/5 to-amber-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="flex items-center space-x-3 relative z-10">
                    <div className="relative w-14 h-14 sm:w-16 sm:h-16 lg:w-18 lg:h-18 rounded-lg sm:rounded-xl overflow-hidden flex-shrink-0 shadow-xl group-hover:shadow-2xl transition-shadow duration-300">
                      <div className="absolute inset-0 bg-gradient-to-t from-amber-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                      <Image
                        src="/img/tiramisu.jpg"
                        alt="Tiramisu"
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 640px) 56px, (max-width: 1024px) 64px, 72px"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-white font-light text-sm sm:text-base lg:text-lg truncate group-hover:text-amber-100 transition-colors duration-300">
                        {heroContent.article.title}
                      </h3>
                      <p className="text-amber-100/60 text-xs sm:text-sm group-hover:text-amber-100/90 transition-all duration-300 inline-flex items-center gap-1">
                        <span>{heroContent.article.cta}</span>
                        <motion.span
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className="inline-block group-hover:text-amber-300"
                        ></motion.span>
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
