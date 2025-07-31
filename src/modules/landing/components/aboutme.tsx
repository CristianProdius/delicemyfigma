"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";

const aboutContent = {
  name: "Olesea Kolomiets",
  title: "Master Chocolatier",
  subtitle: "Professional Taster • Teacher",
  highlight:
    "Creator of the Creative School of Chocolate and Confectionery Mastery",
  stats: [
    { number: "15+", label: "Years of Excellence" },
    { number: "1000+", label: "Students Worldwide" },
    { number: "50+", label: "Countries Reached" },
  ],
  keyPoints: [
    {
      icon: "✨",
      title: "Artisan Excellence",
      description:
        "Creating chocolates for presidents, celebrities, and connoisseurs worldwide",
    },
    {
      icon: "🎓",
      title: "Master Teacher",
      description:
        "Transforming enthusiasts into confident chocolatiers through personalized guidance",
    },
    {
      icon: "🌍",
      title: "Global Recognition",
      description:
        "Chocolates traveled to the world's most prestigious venues and events",
    },
  ],
  quote: {
    text: "Everyone is talented and can master anything they sincerely desire",
    context: "if they let go of fears and doubts",
  },
  imagePath: "/img/olesea-portrait.jpg", // Add your image path here
};

export const AboutMe = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const textY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section
      ref={containerRef}
      className="relative w-full py-20  overflow-hidden "
    >
      <div className="relative px-6 sm:px-8 lg:px-12 xl:px-16 max-w-11/12 mx-auto">
        {/* Elegant section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
          viewport={{ once: true }}
          className="text-center mb-16 lg:mb-24"
        >
          <span className="inline-block text-sm lg:text-base text-[#451C15]/70 tracking-[0.3em] uppercase font-medium mb-4 [font-family:var(--font-inter)]">
            About
          </span>
          <h2 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-[#451C15] [font-family:var(--font-playfair)]">
            The Artisan
          </h2>
          <motion.div
            className="mt-6 h-[1px] bg-gradient-to-r from-transparent via-[#451C15]/20 to-transparent max-w-xs mx-auto"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: true }}
          />
        </motion.div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 xl:gap-28 items-center">
          {/* Left: Image and stats */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Image container with premium effects */}
            <div className="relative">
              <motion.div
                style={{ y: imageY }}
                className="relative z-10 rounded-[2rem] lg:rounded-[3rem] overflow-hidden"
              >
                {/* Image gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#451C15]/10 via-transparent to-transparent z-10" />

                {/* Main image */}
                <Image
                  src={aboutContent.imagePath}
                  alt={aboutContent.name}
                  width={600}
                  height={800}
                  className="w-full h-[500px] lg:h-[650px] object-cover"
                  priority
                />

                {/* Floating accent */}
                <motion.div
                  className="absolute -top-10 -right-10 w-40 h-40 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(224, 217, 201, 0.3) 0%, transparent 70%)",
                    filter: "blur(40px)",
                  }}
                  animate={{
                    scale: [1, 1.3, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>

              {/* Stats overlay */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                viewport={{ once: true }}
                className="absolute -bottom-8 left-4 right-4 sm:left-8 sm:right-8 z-20"
              >
                <div className="bg-white/95 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-2xl border border-[#E0D9C9]/10">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {aboutContent.stats.map((stat, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                        viewport={{ once: true }}
                        className="text-center"
                      >
                        <div className="text-xl sm:text-2xl lg:text-3xl font-medium text-[#451C15] [font-family:var(--font-inter)]">
                          {stat.number}
                        </div>
                        <div className="text-xs sm:text-sm text-[#451C15]/70 mt-1 font-medium [font-family:var(--font-inter)]">
                          {stat.label}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            style={{ y: textY }}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
            viewport={{ once: true }}
            className="relative lg:pl-8"
          >
            {/* Name and title */}
            <div className="mb-10">
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-4xl lg:text-5xl xl:text-6xl font-normal text-[#451C15] mb-3 [font-family:var(--font-playfair)]"
              >
                {aboutContent.name}
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-lg lg:text-xl text-[#451C15]/80 font-normal [font-family:var(--font-inter)]"
              >
                {aboutContent.title} • {aboutContent.subtitle}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-sm lg:text-base text-[#451C15]/60 font-normal mt-2 [font-family:var(--font-inter)]"
              >
                {aboutContent.highlight}
              </motion.p>
            </div>

            {/* Quote section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-12 relative"
            >
              <div className="absolute -left-4 top-0 text-6xl lg:text-8xl text-[#451C15]/10 [font-family:var(--font-playfair)]">
                &quot;
              </div>
              <blockquote className="relative z-10 pl-8">
                <p className="text-2xl lg:text-3xl font-normal italic text-[#451C15] leading-relaxed mb-2 [font-family:var(--font-playfair)]">
                  {aboutContent.quote.text}
                </p>
                <p className="text-base lg:text-lg text-[#451C15]/60 font-normal [font-family:var(--font-inter)]">
                  — {aboutContent.quote.context}
                </p>
              </blockquote>
            </motion.div>

            {/* Key points */}
            <div className="space-y-6">
              {aboutContent.keyPoints.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="flex gap-4 group"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#451C15]/10 flex items-center justify-center text-2xl group-hover:bg-[#451C15]/20 transition-colors duration-300">
                    {point.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-[#451C15] mb-1 [font-family:var(--font-inter)]">
                      {point.title}
                    </h4>
                    <p className="text-[#451C15]/70 font-normal leading-relaxed [font-family:var(--font-inter)]">
                      {point.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              viewport={{ once: true }}
              className="mt-12"
            >
              <button className="group relative px-8 py-4 bg-[#451C15] text-[#E0D9C9] rounded-full overflow-hidden transition-all duration-300 hover:shadow-2xl">
                <span className="relative z-10 flex items-center gap-3 text-lg font-normal [font-family:var(--font-inter)]">
                  Discover My Journey
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#5A241C] to-[#451C15] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* Decorative bottom element */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-24 flex justify-center"
        >
          <svg viewBox="0 0 200 40" className="w-48 h-10 fill-none">
            <path
              d="M20,20 Q50,5 80,20 T140,20 T180,20"
              stroke="url(#gradient)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#E0D9C9" stopOpacity="0" />
                <stop offset="50%" stopColor="#451C15" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#E0D9C9" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      </div>
    </section>
  );
};
