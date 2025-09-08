"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "motion/react";
import { useHomepageData } from "@/hooks/useHomepageData";
import { getStrapiMediaUrl } from "@/lib/strapi";
import Link from "next/link";

export const Hero = () => {
  const { scrollY } = useScroll();
  const { homepageData, isLoading, error } = useHomepageData();
  
  // Parallax transforms
  const backgroundY = useTransform(scrollY, [0, 1000], [0, 200]);
  const contentY = useTransform(scrollY, [0, 800], [0, -50]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0.3]);
  const scale = useTransform(scrollY, [0, 500], [1, 0.95]);


  // Show error if data fetch failed
  if (error) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Unable to load content</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </section>
    );
  }

  // Show loading state
  if (isLoading || !homepageData?.heroSection) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">
          <div className="h-96 bg-gray-200 rounded-3xl"></div>
        </div>
      </section>
    );
  }

  const heroContent = homepageData.heroSection;
  
  const backgroundImage = getStrapiMediaUrl(heroContent?.heroImage);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div className="absolute inset-0" style={{ y: backgroundY }}>
        {backgroundImage && (
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('${backgroundImage}')` }}
          />
        )}
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      </motion.div>

      {/* Glass Morphism Container */}
      <motion.div
        style={{ opacity, scale, y: contentY }}
        className="relative z-10 w-full max-w-[91.666667%] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24"
      >
        <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl sm:rounded-[2rem] lg:rounded-[3rem] border border-white/20 shadow-2xl overflow-hidden">
          {/* Noise Texture Overlay */}
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
                {/* Heading with refined typography */}
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
                        {heroContent.heroTitle || heroContent.title}
                      </span>
                      {(heroContent.heroSubtitle || heroContent.subtitle) && (
                        <span className="block mt-1 sm:mt-2 lg:mt-4 text-transparent bg-clip-text bg-gradient-to-br from-amber-100/90 via-amber-200/80 to-amber-300/70 italic font-thin">
                          {heroContent.heroSubtitle || heroContent.subtitle}
                        </span>
                      )}
                    </h1>
                  </motion.div>

                  {/* Refined accent line */}
                  <motion.div
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    transition={{
                      delay: 0.8,
                      duration: 1.2,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="mx-auto mt-6 sm:mt-8 lg:mt-10 h-px w-24 sm:w-32 lg:w-40 bg-gradient-to-r from-transparent via-amber-200/50 to-transparent"
                  />
                </div>

                {/* CTA Button */}
                {(heroContent.heroCtaText || heroContent.ctaText) && (heroContent.heroCtaUrl || heroContent.ctaUrl) && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.6,
                      duration: 1,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="flex justify-center"
                  >
                    <Link href={heroContent.heroCtaUrl || heroContent.ctaUrl}>
                      <Button
                        size="lg"
                        className="group relative px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 hover:border-white/50 text-white rounded-full transition-all duration-500 shadow-xl hover:shadow-2xl hover:scale-105 text-sm sm:text-base lg:text-lg"
                      >
                        <span className="relative z-10 flex items-center gap-2 sm:gap-3">
                          {heroContent.heroCtaText || heroContent.ctaText}
                          <span className="transform transition-transform group-hover:translate-x-1">
                            →
                          </span>
                        </span>
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400/0 via-amber-400/10 to-amber-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </Button>
                    </Link>
                  </motion.div>
                )}

                {/* Quote */}
                {heroContent.quote && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      delay: 1,
                      duration: 1.2,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="mt-8 sm:mt-12 lg:mt-16 mx-auto max-w-2xl"
                  >
                    <blockquote className="relative">
                      <p className="text-sm sm:text-base lg:text-lg text-white/70 italic leading-relaxed">
                        &ldquo;{heroContent.quote}&rdquo;
                      </p>
                      {heroContent.quoteAuthor && (
                        <cite className="block mt-3 sm:mt-4 text-xs sm:text-sm text-amber-200/60 font-medium tracking-wider">
                          — {heroContent.quoteAuthor}
                        </cite>
                      )}
                    </blockquote>
                  </motion.div>
                )}

                {/* Stats */}
                {heroContent.statsNumber && heroContent.statsLabel && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 1.2,
                      duration: 1,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="flex justify-center mt-8 sm:mt-12"
                  >
                    <div className="text-center">
                      <div className="text-3xl sm:text-4xl lg:text-5xl font-light text-amber-200/90">
                        {heroContent.statsNumber}
                      </div>
                      <div className="text-xs sm:text-sm text-white/60 uppercase tracking-wider mt-2">
                        {heroContent.statsLabel}
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};