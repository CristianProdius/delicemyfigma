"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { Sparkles, Mail, Phone, MapPin, ArrowRight } from "lucide-react";

const ctaContent = {
  preheading: "Sweet Beginnings Await",
  heading: "Let's Create Something",
  headingAccent: "Extraordinary Together",
  description:
    "Whether you're dreaming of custom chocolates for your special event or eager to master the art yourself, our doors are always open to fellow chocolate enthusiasts.",
  buttons: {
    primary: {
      text: "Start Your Journey",
      subtext: "Book a Consultation",
    },
    secondary: {
      text: "Visit Our Atelier",
      subtext: "See the Magic Happen",
    },
  },
  contact: {
    email: "hello@delicemy.com",
    phone: "+373 123 456 789",
    address: "Chisinau, Moldova",
  },
  mascot: {
    image: "/img/cat-mascot.png",
    alt: "Lady Whiskers - DeliceMy Mascot",
    quote: "Every masterpiece begins with a single, sweet idea...",
  },
  decorativeElements: {
    chocolateChips: ["🍫", "🌰", "🍓", "✨"],
  },
};

export const CTASection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const mascotY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const mascotRotate = useTransform(scrollYProgress, [0, 1], [-3, 3]);
  const floatY = useTransform(scrollYProgress, [0, 0.5, 1], [0, -20, 0]);

  return (
    <section
      ref={containerRef}
      className="relative w-full py-16 overflow-hidden bg-white"
    >
      {/* Premium layered background - now in light colors */}
      <div className="absolute inset-0">
        {/* Base gradient - subtle warm tones */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-[#FFF9F5] to-[#F8F5F0]" />

        {/* Noise texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.5'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Geometric pattern - lighter opacity */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(69, 28, 21, 0.02) 35px, rgba(69, 28, 21, 0.02) 70px),
              repeating-linear-gradient(-45deg, transparent, transparent 35px, rgba(212, 165, 116, 0.02) 35px, rgba(212, 165, 116, 0.02) 70px)
            `,
          }}
        />

        {/* Radial glow - subtle warm accents */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#F4A460] rounded-full blur-[200px] opacity-[0.08]" />
          <div className="absolute bottom-0 right-1/4 w-[800px] h-[800px] bg-[#D4A574] rounded-full blur-[250px] opacity-[0.06]" />
        </div>
      </div>

      {/* Enhanced floating elements */}
      <div className="absolute inset-0 pointer-events-none">
        {ctaContent.decorativeElements.chocolateChips.map((emoji, index) => (
          <motion.div
            key={index}
            className="absolute hidden sm:block"
            style={{
              left: `${15 + index * 22}%`,
              top: `${8 + index * 18}%`,
            }}
          >
            <motion.div
              className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl opacity-10 sm:opacity-15"
              animate={{
                y: [0, -40, 0],
                rotate: [0, 20, -20, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 6 + index,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.8,
              }}
            >
              {emoji}
            </motion.div>
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 px-4 sm:px-6 lg:px-8 xl:px-12 max-w-11/12 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 xl:gap-24 items-center">
          {/* Left Content - Dark text for white background */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
            viewport={{ once: true }}
            className="text-center lg:text-left"
          >
            {/* Premium sparkle decoration */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-3 mb-8"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4A574]" />
              </motion.div>
              <span className="text-[#451C15]/70 text-xs sm:text-sm font-light tracking-[0.2em] uppercase [font-family:var(--font-inter)]">
                {ctaContent.preheading}
              </span>
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4A574]" />
              </motion.div>
            </motion.div>

            {/* Premium heading - dark text */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-light text-[#451C15] mb-6 leading-[1.1] [font-family:var(--font-playfair)]"
            >
              {ctaContent.heading}
              <br />
              <span className="relative inline-block mt-2">
                <span className="relative z-10 italic font-extralight text-transparent bg-clip-text bg-gradient-to-r from-[#A67B5B] via-[#451C15] to-[#D4A574]">
                  {ctaContent.headingAccent}
                </span>
                <motion.div
                  className="absolute -bottom-2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4A574] to-transparent"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                  viewport={{ once: true }}
                />
              </span>
            </motion.h2>

            {/* Enhanced description - dark text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-[#451C15]/60 text-sm sm:text-base lg:text-lg xl:text-xl mb-10 sm:mb-12 font-light leading-relaxed max-w-xl mx-auto lg:mx-0 [font-family:var(--font-inter)]"
            >
              {ctaContent.description}
            </motion.p>

            {/* Premium CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start mb-12 sm:mb-16"
            >
              {/* Primary CTA - Dark background for white page */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#D4A574] to-[#A67B5B] rounded-full blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
                <Button className="relative bg-gradient-to-r from-[#451C15] to-[#5A241C] text-[#E0D9C9] hover:from-[#5A241C] hover:to-[#451C15] px-6 sm:px-8 lg:px-10 py-5 sm:py-6 lg:py-7 rounded-full overflow-hidden shadow-2xl w-full sm:w-auto">
                  <div className="relative z-10 flex items-center justify-center gap-3">
                    <div className="text-left">
                      <span className="block text-base sm:text-lg font-medium [font-family:var(--font-inter)]">
                        {ctaContent.buttons.primary.text}
                      </span>
                      <span className="block text-xs sm:text-sm opacity-70 font-light [font-family:var(--font-inter)]">
                        {ctaContent.buttons.primary.subtext}
                      </span>
                    </div>
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </Button>
              </motion.div>

              {/* Secondary CTA - Outlined for white background */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="outline"
                  className="group relative border-2 border-[#451C15]/20 text-[#451C15] hover:bg-[#451C15]/5 backdrop-blur-sm px-6 sm:px-8 lg:px-10 py-5 sm:py-6 lg:py-7 rounded-full w-full sm:w-auto transition-all duration-300"
                >
                  <div className="relative z-10">
                    <span className="block text-base sm:text-lg font-medium [font-family:var(--font-inter)]">
                      {ctaContent.buttons.secondary.text}
                    </span>
                    <span className="block text-xs sm:text-sm opacity-70 font-light [font-family:var(--font-inter)]">
                      {ctaContent.buttons.secondary.subtext}
                    </span>
                  </div>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#451C15]/0 via-[#451C15]/5 to-[#451C15]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </Button>
              </motion.div>
            </motion.div>

            {/* Premium Contact Info - Dark text */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              {[
                { icon: Mail, text: ctaContent.contact.email },
                { icon: Phone, text: ctaContent.contact.phone },
                { icon: MapPin, text: ctaContent.contact.address },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="group flex items-center gap-3 text-[#451C15]/50 hover:text-[#451C15]/80 transition-colors duration-300 justify-center lg:justify-start"
                >
                  <div className="p-2 rounded-full bg-[#451C15]/5 group-hover:bg-[#451C15]/10 transition-colors duration-300">
                    <item.icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs sm:text-sm font-light [font-family:var(--font-inter)]">
                    {item.text}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Enhanced Cat Mascot with premium effects */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative flex items-center justify-center lg:justify-end mt-12 lg:mt-0"
          >
            {/* Multi-layer glow effect - softer for white background */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="absolute w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] lg:w-[500px] lg:h-[500px] rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(212, 165, 116, 0.1) 0%, transparent 60%)",
                  filter: "blur(80px)",
                }}
                animate={{
                  scale: [1, 1.15, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] lg:w-[450px] lg:h-[450px] rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(244, 164, 96, 0.08) 0%, transparent 50%)",
                  filter: "blur(60px)",
                }}
                animate={{
                  scale: [1.1, 1, 1.1],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>

            {/* Mascot container with parallax */}
            <motion.div
              style={{
                y: mascotY,
                rotate: mascotRotate,
              }}
              className="relative z-10"
            >
              <motion.div
                style={{ y: floatY }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
                className="relative"
              >
                {/* Premium quote bubble - adjusted for white background */}
                <motion.div
                  initial={{ opacity: 0, scale: 0, rotate: -10 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{
                    delay: 0.6,
                    duration: 0.5,
                    type: "spring",
                    stiffness: 120,
                  }}
                  viewport={{ once: true }}
                  className="absolute -top-16 sm:-top-20 -left-8 sm:-left-16 lg:-left-24"
                >
                  <div className="relative bg-gradient-to-br from-[#451C15] to-[#5A241C] backdrop-blur-xl rounded-3xl p-4 sm:p-5 lg:p-6 shadow-2xl max-w-[180px] sm:max-w-[220px] lg:max-w-[280px] border border-[#451C15]/10">
                    <p className="text-[#E0D9C9] text-xs sm:text-sm lg:text-base italic font-light [font-family:var(--font-playfair)] leading-relaxed">
                      &quot;{ctaContent.mascot.quote}&quot;
                    </p>
                    <div className="absolute -bottom-3 left-12 sm:left-16 w-6 h-6 bg-gradient-to-br from-[#451C15] to-[#5A241C] rotate-45 border-r border-b border-[#451C15]/10" />
                  </div>
                </motion.div>

                {/* Cat illustration container */}
                <div className="relative w-56 h-72 sm:w-72 sm:h-96 lg:w-96 lg:h-[480px] xl:w-[420px] xl:h-[520px]">
                  <Image
                    src={ctaContent.mascot.image}
                    alt={ctaContent.mascot.alt}
                    fill
                    className="object-contain drop-shadow-2xl"
                    priority
                  />

                  {/* Animated sparkles with premium styling */}
                  <motion.div
                    className="absolute -top-6 -right-6 lg:-top-8 lg:-right-8"
                    animate={{
                      rotate: [0, 360],
                      scale: [1, 1.3, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <div className="relative">
                      <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-[#F4A460] drop-shadow-lg" />
                      <div className="absolute inset-0 blur-lg bg-[#F4A460] opacity-30" />
                    </div>
                  </motion.div>

                  <motion.div
                    className="absolute bottom-8 -left-4 lg:bottom-12 lg:-left-8"
                    animate={{
                      rotate: [0, -360],
                      scale: [0.8, 1, 0.8],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <div className="relative">
                      <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-[#D4A574] drop-shadow-lg" />
                      <div className="absolute inset-0 blur-lg bg-[#D4A574] opacity-30" />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Premium bottom decorative element */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 sm:mt-20 lg:mt-24 flex justify-center"
        >
          <svg
            viewBox="0 0 600 80"
            className="w-48 sm:w-64 lg:w-80 h-8 sm:h-10 lg:h-12 fill-none"
          >
            {/* Animated path */}
            <motion.path
              d="M50,40 Q150,10 250,40 T450,40 T550,40"
              stroke="url(#cta-gradient-path-light)"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
              viewport={{ once: true }}
            />

            {/* Animated dots */}
            {[50, 150, 250, 350, 450, 550].map((x, i) => (
              <motion.circle
                key={i}
                cx={x}
                cy="40"
                r="5"
                fill="#451C15"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 0.6 }}
                transition={{ delay: 0.3 * i, duration: 0.5, type: "spring" }}
                viewport={{ once: true }}
              />
            ))}

            <defs>
              <linearGradient
                id="cta-gradient-path-light"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#451C15" stopOpacity="0" />
                <stop offset="20%" stopColor="#D4A574" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#451C15" stopOpacity="1" />
                <stop offset="80%" stopColor="#D4A574" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#451C15" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      </div>
    </section>
  );
};
