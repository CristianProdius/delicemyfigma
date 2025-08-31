"use client";

import React from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { schoolContent } from "../data/school-content";

export const SchoolHero: React.FC = () => {
  const scrollToCourses = () => {
    document
      .getElementById("school-courses")
      ?.scrollIntoView({ behavior: "smooth" });
  };

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

          <div className="relative p-8 sm:p-12 lg:p-16">
            {/* Main content grid */}
            <div className="grid lg:grid-cols-[65fr_35fr] gap-16 items-end">
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, x: -60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-12"
              >
                {/* Badge if coming soon */}
                {schoolContent.comingSoonBadge && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-block"
                  >
                    <span className="text-sm font-medium text-amber-300/80 bg-amber-400/10 backdrop-blur px-5 py-2.5 rounded-full border border-amber-400/20">
                      Coming Soon
                    </span>
                  </motion.div>
                )}

                {/* Main Title with gradient */}
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
                    <h1 className="font-serif text-7xl xl:text-8xl font-extralight leading-[0.95] tracking-[-0.02em]">
                      <span className="block text-transparent bg-clip-text bg-gradient-to-br from-white via-amber-50/95 to-amber-100/90">
                        {schoolContent.heroTitle.split(' ').slice(0, -1).join(' ')}
                      </span>
                      <span className="block mt-4 text-transparent bg-clip-text bg-gradient-to-br from-amber-100/90 via-amber-200/80 to-amber-300/70 italic font-thin">
                        {schoolContent.heroTitle.split(' ').slice(-1)[0]}
                      </span>
                    </h1>
                  </motion.div>

                  {/* Accent line */}
                  <motion.div
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    transition={{
                      delay: 0.8,
                      duration: 1,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="absolute -bottom-6 left-0 w-40 h-[1px] origin-left"
                  >
                    <div className="h-full bg-gradient-to-r from-amber-400 via-amber-300/50 to-transparent" />
                  </motion.div>
                </div>

                {/* Subtitle */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="text-xl text-white/70 leading-relaxed max-w-xl font-light"
                >
                  {schoolContent.heroSubtitle}
                </motion.p>

                {/* Key Points with elegant styling */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-4 group">
                    <div className="w-2 h-2 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full shadow-lg shadow-amber-400/50" />
                    <span className="text-white/70 group-hover:text-white/90 transition-colors">
                      Professional certification programs
                    </span>
                  </div>
                  <div className="flex items-center gap-4 group">
                    <div className="w-2 h-2 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full shadow-lg shadow-amber-400/50" />
                    <span className="text-white/70 group-hover:text-white/90 transition-colors">
                      Learn from award-winning chocolatiers
                    </span>
                  </div>
                  <div className="flex items-center gap-4 group">
                    <div className="w-2 h-2 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full shadow-lg shadow-amber-400/50" />
                    <span className="text-white/70 group-hover:text-white/90 transition-colors">
                      Hands-on training in our state-of-the-art facility
                    </span>
                  </div>
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="flex gap-4 pt-4"
                >
                  {!schoolContent.comingSoonBadge ? (
                    <>
                      <a
                        href={schoolContent.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative group inline-flex items-center justify-center px-10 py-5 bg-gradient-to-r from-amber-100 via-amber-50 to-white text-amber-950 rounded-full text-lg font-medium transition-all duration-500 shadow-2xl hover:shadow-amber-200/40 hover:shadow-3xl overflow-hidden"
                      >
                        <div className="absolute inset-0 -top-2 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                        <span className="relative z-10">{schoolContent.ctaButtonText}</span>
                      </a>
                      <button
                        onClick={scrollToCourses}
                        className="inline-flex items-center justify-center px-10 py-5 text-amber-50 border border-amber-400/30 rounded-full hover:border-amber-400/50 hover:bg-amber-400/10 backdrop-blur transition-all text-lg font-medium"
                      >
                        Explore Courses
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={scrollToCourses}
                      className="relative group inline-flex items-center justify-center px-10 py-5 bg-gradient-to-r from-amber-100 via-amber-50 to-white text-amber-950 rounded-full text-lg font-medium transition-all duration-500 shadow-2xl hover:shadow-amber-200/40 hover:shadow-3xl overflow-hidden"
                    >
                      <div className="absolute inset-0 -top-2 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                      <span className="relative z-10">View Upcoming Courses</span>
                    </button>
                  )}
                </motion.div>
              </motion.div>

              {/* Right Content - Floating Stats Cards */}
              <div className="flex flex-col gap-6 items-end">
                {/* Graduates Card */}
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
                  className="w-full max-w-[280px]"
                >
                  <div className="relative group bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl transition-all duration-500 shadow-xl hover:shadow-2xl hover:bg-white/10 overflow-hidden">
                    <div className="relative z-10">
                      <motion.p
                        className="text-4xl font-extralight text-transparent bg-clip-text bg-gradient-to-br from-white via-amber-50 to-amber-200"
                        animate={{ opacity: [0.7, 1, 0.7] }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        500+
                      </motion.p>
                      <p className="text-sm text-white/60 font-light mt-2">
                        Graduates Worldwide
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Job Placement Card */}
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
                  className="w-full max-w-[280px]"
                >
                  <div className="relative group bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl transition-all duration-500 shadow-xl hover:shadow-2xl hover:bg-white/10 overflow-hidden">
                    <div className="relative z-10">
                      <motion.p
                        className="text-4xl font-extralight text-transparent bg-clip-text bg-gradient-to-br from-white via-amber-50 to-amber-200"
                        animate={{ opacity: [0.7, 1, 0.7] }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 0.5,
                        }}
                      >
                        95%
                      </motion.p>
                      <p className="text-sm text-white/60 font-light mt-2">
                        Job Placement Rate
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Expert Instructors Card */}
                <motion.div
                  initial={{ opacity: 0, x: 60, y: 60 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{
                    delay: 1.3,
                    duration: 1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{
                    y: -8,
                    rotate: -2,
                    transition: { duration: 0.3, ease: "easeOut" },
                  }}
                  className="w-full max-w-[280px]"
                >
                  <div className="relative group bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl transition-all duration-500 shadow-xl hover:shadow-2xl hover:bg-white/10 overflow-hidden">
                    <div className="relative z-10">
                      <motion.p
                        className="text-4xl font-extralight text-transparent bg-clip-text bg-gradient-to-br from-white via-amber-50 to-amber-200"
                        animate={{ opacity: [0.7, 1, 0.7] }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 1,
                        }}
                      >
                        12
                      </motion.p>
                      <p className="text-sm text-white/60 font-light mt-2">
                        Master Chocolatiers
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};