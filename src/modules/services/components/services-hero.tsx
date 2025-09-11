"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import type { ServicesPageData, ServicesBreadcrumbs } from "@/types/strapi";
import { getStrapiMediaUrl } from "@/lib/strapi";
import { renderBlocks } from "@/lib/strapi-blocks";

interface ServicesHeroProps {
  pageData?: ServicesPageData | null;
}

// Breadcrumbs Component
const Breadcrumbs = ({ breadcrumbs }: { breadcrumbs?: ServicesBreadcrumbs }) => {
  if (!breadcrumbs?.homeText || !breadcrumbs?.servicesText) return null;
  
  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center space-x-2 text-sm mb-4"
    >
      <Link
        href="/"
        className="flex items-center text-white/60 hover:text-white/90 transition-colors"
      >
        {breadcrumbs.showHomeIcon && <Home className="w-4 h-4 mr-1" />}
        <span>{breadcrumbs.homeText}</span>
      </Link>
      <ChevronRight className="w-4 h-4 text-white/40" />
      <span className="text-white/90 font-medium">{breadcrumbs.servicesText}</span>
    </motion.nav>
  );
};

export const ServicesHero = ({ pageData }: ServicesHeroProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  
  const heroSection = pageData?.servicesHeroSection;
  const heroImageUrl = getStrapiMediaUrl(heroSection?.heroImage);
  
  // Return null if no hero section data
  if (!heroSection) return null;

  return (
    <section ref={containerRef} className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div className="absolute inset-0" style={{ y: backgroundY }}>
        {heroImageUrl && (
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('${heroImageUrl}')` }}
          />
        )}
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      </motion.div>

      {/* Glass Morphism Container */}
      <motion.div
        style={{ opacity, scale, y: contentY }}
        className="relative z-10 w-full max-w-[91.666667%] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 mt-20"
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
            {/* Breadcrumbs */}
            <Breadcrumbs breadcrumbs={heroSection.breadcrumbs} />

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
                        {heroSection.pageTitle}
                      </span>
                      {heroSection.decorativeSubtitle && (
                        <span className="block mt-1 sm:mt-2 lg:mt-4 text-transparent bg-clip-text bg-gradient-to-br from-amber-100/90 via-amber-200/80 to-amber-300/70 italic font-thin text-lg sm:text-xl md:text-2xl lg:text-3xl">
                          {heroSection.decorativeSubtitle}
                        </span>
                      )}
                    </h1>
                  </motion.div>

                  {/* Refined accent line */}
                  {heroSection.showDecorativeLine && (
                    <motion.div
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={{ scaleX: 1, opacity: 1 }}
                      transition={{
                        delay: 0.8,
                        duration: 1.2,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="relative mx-auto mt-6 sm:mt-8 lg:mt-10 overflow-hidden"
                    >
                      <div className="h-[2px] w-48 sm:w-64 lg:w-80 mx-auto bg-gradient-to-r from-transparent via-amber-300/50 to-transparent" />
                    </motion.div>
                  )}
                </div>

                {/* Description */}
                {heroSection.pageDescription && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.4,
                      duration: 1,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="relative"
                  >
                    <div 
                      className="[font-family:var(--font-inter)] text-base sm:text-lg lg:text-xl font-light leading-relaxed text-amber-50/80 max-w-3xl mx-auto"
                      dangerouslySetInnerHTML={{ __html: renderBlocks(heroSection.pageDescription) }}
                    />
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