"use client";

import React from "react";
import { motion } from "motion/react";
import { schoolContent } from "../data/school-content";

export const SchoolHero: React.FC = () => {
  const scrollToCourses = () => {
    document
      .getElementById("school-courses")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden ">
      {/* Main Container with Glassmorphism */}
      <div className="relative w-full max-w-[91.666667%] mx-auto ">
        {/* Gradient border effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-200/30 via-amber-300/20 to-amber-400/10 rounded-[3rem] blur-xl" />

        <div className="relative bg-gradient-to-br from-amber-950/50 via-amber-900/40 to-amber-950/50 backdrop-blur-2xl rounded-[3rem] border border-white/10 overflow-hidden">
          {/* Animated gradient orbs */}
          <motion.div
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-20 right-20 w-[500px] h-[500px] bg-gradient-radial from-amber-400/20 via-amber-500/10 to-transparent rounded-full blur-3xl pointer-events-none"
          />
          <motion.div
            animate={{
              x: [0, -100, 0],
              y: [0, 100, 0],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-20 left-20 w-[400px] h-[400px] bg-gradient-radial from-amber-600/15 via-amber-700/10 to-transparent rounded-full blur-3xl pointer-events-none"
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

          <div className="relative p-20">
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
                      <span className="block text-transparent bg-clip-text bg-gradient-to-br from-white via-amber-50/95 to-amber-100/90 drop-shadow-2xl">
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
                  className="text-xl text-amber-100/60 leading-relaxed max-w-xl font-light"
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
                    <span className="text-amber-50/70 group-hover:text-amber-50/90 transition-colors">
                      Professional certification programs
                    </span>
                  </div>
                  <div className="flex items-center gap-4 group">
                    <div className="w-2 h-2 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full shadow-lg shadow-amber-400/50" />
                    <span className="text-amber-50/70 group-hover:text-amber-50/90 transition-colors">
                      Learn from award-winning chocolatiers
                    </span>
                  </div>
                  <div className="flex items-center gap-4 group">
                    <div className="w-2 h-2 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full shadow-lg shadow-amber-400/50" />
                    <span className="text-amber-50/70 group-hover:text-amber-50/90 transition-colors">
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
                  <div className="relative group bg-gradient-to-br from-white/12 via-white/8 to-amber-100/5 backdrop-blur-xl border border-white/15 p-6 rounded-3xl transition-all duration-500 shadow-2xl hover:shadow-amber-200/30 hover:shadow-3xl overflow-hidden">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-amber-400/0 via-amber-300/10 to-amber-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    />
                    <div className="relative z-10">
                      <motion.p
                        className="text-4xl font-extralight bg-gradient-to-br from-white via-amber-50 to-amber-200 bg-clip-text text-transparent"
                        animate={{ opacity: [0.7, 1, 0.7] }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        500+
                      </motion.p>
                      <p className="text-sm text-amber-100/60 font-light mt-2">
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
                  <div className="relative group bg-gradient-to-br from-white/12 via-white/8 to-amber-100/5 backdrop-blur-xl border border-white/15 p-6 rounded-3xl transition-all duration-500 shadow-2xl hover:shadow-amber-200/30 hover:shadow-3xl overflow-hidden">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-amber-400/0 via-amber-300/10 to-amber-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    />
                    <div className="relative z-10">
                      <motion.p
                        className="text-4xl font-extralight bg-gradient-to-br from-white via-amber-50 to-amber-200 bg-clip-text text-transparent"
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
                      <p className="text-sm text-amber-100/60 font-light mt-2">
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
                  <div className="relative group bg-gradient-to-br from-white/12 via-white/8 to-amber-100/5 backdrop-blur-xl border border-white/15 p-6 rounded-3xl transition-all duration-500 shadow-2xl hover:shadow-amber-200/30 hover:shadow-3xl overflow-hidden">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-amber-400/0 via-amber-300/10 to-amber-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    />
                    <div className="relative z-10">
                      <motion.p
                        className="text-4xl font-extralight bg-gradient-to-br from-white via-amber-50 to-amber-200 bg-clip-text text-transparent"
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
                      <p className="text-sm text-amber-100/60 font-light mt-2">
                        Master Chocolatiers
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};