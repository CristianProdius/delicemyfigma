"use client";

import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "motion/react";

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
  const { scrollY } = useScroll();
  
  // Parallax transforms - Same as BlogHero
  const backgroundY = useTransform(scrollY, [0, 1000], [0, 200]);
  const contentY = useTransform(scrollY, [0, 800], [0, -50]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0.3]);
  const scale = useTransform(scrollY, [0, 500], [1, 0.95]);

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

          <div className="relative p-6 sm:p-8 md:p-10 lg:p-14 xl:p-20">
            {/* Main content - centered */}
            <div className="flex items-center justify-center mt-8 sm:mt-10 lg:mt-16">
              {/* Centered Content */}
              <motion.div
                initial={{ opacity: 0, y: -60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="text-center flex flex-col justify-center space-y-6 sm:space-y-8 lg:space-y-12 max-w-4xl"
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
                      <span className="block text-transparent bg-clip-text bg-gradient-to-br from-white via-amber-50/95 to-amber-100/90">
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
                    className="absolute -bottom-4 sm:-bottom-6 left-1/2 transform -translate-x-1/2 w-24 sm:w-32 lg:w-40 h-[1px] origin-center"
                  >
                    <div className="h-full bg-gradient-to-r from-transparent via-amber-300 to-transparent" />
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
                    className="mx-auto"
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
                    className="max-w-lg sm:max-w-xl mx-auto text-center px-4 sm:px-0"
                  >
                    <div className="relative pl-6 sm:pl-8 lg:pl-12">
                      {/* Quote mark */}
                      <div className="absolute left-0 -top-2 sm:-top-4 text-amber-300/20 text-4xl sm:text-6xl lg:text-7xl font-serif leading-none select-none">
                        &apos;
                      </div>

                      <p className="text-amber-200/70 text-[10px] sm:text-xs lg:text-sm mb-2 sm:mb-3 font-medium tracking-[0.3em] uppercase [font-family:var(--font-inter)]">
                        {heroContent.quote.author}
                      </p>
                      <p className="text-white/60 text-xs sm:text-sm lg:text-base xl:text-lg leading-relaxed italic font-light [font-family:var(--font-inter)]">
                        {heroContent.quote.text}
                      </p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};