// src/modules/services/components/service-cta.tsx
"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import {
  Sparkles,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Calendar,
  Clock,
  Heart,
  Star,
  MessageCircle,
  CheckCircle,
  Users,
  Award,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface ServiceCTAProps {
  serviceTitle: string;
  headline?: string;
  urgencyText?: string;
  valueProposition?: string;
  availability?: string;
  spotsLeft?: number;
  nextSessionDate?: string;
  testimonialCount?: number;
  rating?: number;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  mascotQuote?: string;
  accentColor?: string;
  showContactInfo?: boolean;
  contactEmail?: string;
  contactPhone?: string;
  contactAddress?: string;
  customBadge?: string;
  className?: string;
}

// Animated Stat Badge Component
const StatBadge = ({
  icon: Icon,
  value,
  label,
  index,
}: {
  icon: any;
  value: string | number;
  label: string;
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{
        delay: 0.5 + index * 0.1,
        type: "spring",
        stiffness: 100,
      }}
      viewport={{ once: true }}
      className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20"
    >
      <Icon className="w-4 h-4 text-[#D4A574]" />
      <span className="text-sm font-medium text-[#E0D9C9]">
        <span className="font-bold">{value}</span> {label}
      </span>
    </motion.div>
  );
};

export const ServiceCTA = ({
  serviceTitle,
  headline,
  urgencyText,
  valueProposition,
  availability,
  spotsLeft,
  nextSessionDate,
  testimonialCount,
  rating,
  primaryButtonText = "Book This Service",
  secondaryButtonText = "Ask Questions",
  onPrimaryClick,
  onSecondaryClick,
  mascotQuote,
  accentColor = "#D4A574",
  showContactInfo = true,
  contactEmail = "hello@delicemy.com",
  contactPhone = "+373 123 456 789",
  contactAddress = "Chisinau, Moldova",
  customBadge,
  className,
}: ServiceCTAProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax and transform effects
  const mascotY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const mascotRotate = useTransform(scrollYProgress, [0, 1], [-3, 3]);
  const floatY = useTransform(scrollYProgress, [0, 0.5, 1], [0, -20, 0]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  // Default headlines and quotes based on service
  const defaultHeadline = headline || `Ready to Experience ${serviceTitle}?`;
  const defaultMascotQuote =
    mascotQuote ||
    `"I can't wait to share the magic of ${serviceTitle.toLowerCase()} with you!"`;

  // Prepare stat badges
  const statBadges = [
    spotsLeft && { icon: Users, value: spotsLeft, label: "spots left" },
    nextSessionDate && { icon: Calendar, value: nextSessionDate, label: "" },
    testimonialCount && {
      icon: Heart,
      value: testimonialCount,
      label: "happy clients",
    },
    rating && { icon: Star, value: rating, label: "/5 rating" },
  ].filter(Boolean);

  return (
    <section
      ref={containerRef}
      className={cn(
        "relative py-20 sm:py-24 lg:py-32 overflow-hidden",
        "bg-gradient-to-br from-[#451C15] via-[#3A1610] to-[#2A100B]",
        className
      )}
    >
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        {/* Animated gradient background */}
        <motion.div
          style={{ scale: backgroundScale }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#451C15] via-[#3A1610] to-[#2A100B]" />

          {/* Noise texture overlay */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.5'/%3E%3C/svg%3E")`,
            }}
          />
        </motion.div>

        {/* Geometric pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(224, 217, 201, 0.02) 35px, rgba(224, 217, 201, 0.02) 70px),
              repeating-linear-gradient(-45deg, transparent, transparent 35px, ${accentColor}10 35px, ${accentColor}10 70px)
            `,
          }}
        />

        {/* Radial glow effects */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full"
            style={{
              background: `radial-gradient(circle, ${accentColor}15 0%, transparent 60%)`,
              filter: "blur(100px)",
            }}
            animate={{
              x: [0, 50, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-0 right-1/4 w-[800px] h-[800px] rounded-full"
            style={{
              background: `radial-gradient(circle, ${accentColor}10 0%, transparent 50%)`,
              filter: "blur(120px)",
            }}
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </div>

      {/* Floating chocolate elements */}
      <div className="absolute inset-0 pointer-events-none">
        {["🍫", "✨", "🎯", "💝"].map((emoji, index) => (
          <motion.div
            key={index}
            className="absolute hidden sm:block"
            style={{
              left: `${15 + index * 22}%`,
              top: `${10 + index * 18}%`,
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
                duration: 8 + index * 2,
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

      <div className="relative z-10 px-4 sm:px-6 lg:px-8 xl:px-12 max-w-[95%] xl:max-w-[90%] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 xl:gap-24 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
            viewport={{ once: true }}
            className="text-center lg:text-left"
          >
            {/* Custom Badge or Sparkle decoration */}
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
              <span className="text-[#E0D9C9]/80 text-xs sm:text-sm font-light tracking-[0.2em] uppercase [font-family:var(--font-inter)]">
                {customBadge || "Limited Availability"}
              </span>
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4A574]" />
              </motion.div>
            </motion.div>

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-[#E0D9C9] mb-6 leading-[1.1] [font-family:var(--font-playfair)]"
            >
              {defaultHeadline.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="inline-block mr-3 last:mr-0"
                >
                  {word}
                </motion.span>
              ))}
            </motion.h2>

            {/* Urgency Text */}
            {urgencyText && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                viewport={{ once: true }}
                className="mb-4"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#D4A574]/20 backdrop-blur-sm rounded-full border border-[#D4A574]/30">
                  <Zap className="w-4 h-4 text-[#D4A574]" />
                  <span className="text-sm font-medium text-[#D4A574] [font-family:var(--font-inter)]">
                    {urgencyText}
                  </span>
                </div>
              </motion.div>
            )}

            {/* Value Proposition */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-[#E0D9C9]/60 text-sm sm:text-base lg:text-lg xl:text-xl mb-8 sm:mb-10 font-light leading-relaxed max-w-xl mx-auto lg:mx-0 [font-family:var(--font-inter)]"
            >
              {valueProposition ||
                `Join hundreds of satisfied clients who have discovered the joy of ${serviceTitle.toLowerCase()}. Every session is carefully crafted to exceed your expectations.`}
            </motion.p>

            {/* Stat Badges */}
            {statBadges.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                viewport={{ once: true }}
                className="flex flex-wrap gap-3 justify-center lg:justify-start mb-10"
              >
                {statBadges.map((badge: any, index) => (
                  <StatBadge
                    key={index}
                    icon={badge.icon}
                    value={badge.value}
                    label={badge.label}
                    index={index}
                  />
                ))}
              </motion.div>
            )}

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start mb-12 sm:mb-16"
            >
              {/* Primary CTA */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="relative group"
              >
                <div
                  className="absolute inset-0 rounded-full blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(to right, ${accentColor}, ${accentColor}90)`,
                  }}
                />
                <Button
                  onClick={onPrimaryClick}
                  className="relative bg-gradient-to-r from-[#E0D9C9] to-[#F8F5F0] text-[#451C15] hover:from-white hover:to-[#E0D9C9] px-6 sm:px-8 lg:px-10 py-5 sm:py-6 lg:py-7 rounded-full overflow-hidden shadow-2xl w-full sm:w-auto"
                >
                  <div className="relative z-10 flex items-center justify-center gap-3">
                    <Calendar className="w-5 h-5" />
                    <div className="text-left">
                      <span className="block text-base sm:text-lg font-medium [font-family:var(--font-inter)]">
                        {primaryButtonText}
                      </span>
                      {availability && (
                        <span className="block text-xs sm:text-sm opacity-70 font-light [font-family:var(--font-inter)]">
                          {availability}
                        </span>
                      )}
                    </div>
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </Button>
              </motion.div>

              {/* Secondary CTA */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={onSecondaryClick}
                  variant="outline"
                  className="group relative border-2 border-[#E0D9C9]/20 text-[#E0D9C9] hover:bg-[#E0D9C9]/10 backdrop-blur-sm px-6 sm:px-8 lg:px-10 py-5 sm:py-6 lg:py-7 rounded-full w-full sm:w-auto transition-all duration-300"
                >
                  <div className="relative z-10 flex items-center justify-center gap-3">
                    <MessageCircle className="w-5 h-5" />
                    <span className="text-base sm:text-lg font-medium [font-family:var(--font-inter)]">
                      {secondaryButtonText}
                    </span>
                  </div>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#E0D9C9]/0 via-[#E0D9C9]/5 to-[#E0D9C9]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </Button>
              </motion.div>
            </motion.div>

            {/* Contact Info */}
            {showContactInfo && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                {[
                  {
                    icon: Mail,
                    text: contactEmail,
                    href: `mailto:${contactEmail}`,
                  },
                  {
                    icon: Phone,
                    text: contactPhone,
                    href: `tel:${contactPhone}`,
                  },
                  { icon: MapPin, text: contactAddress },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="group flex items-center gap-3 text-[#E0D9C9]/50 hover:text-[#E0D9C9]/80 transition-colors duration-300 justify-center lg:justify-start"
                  >
                    <div className="p-2 rounded-full bg-[#E0D9C9]/5 group-hover:bg-[#E0D9C9]/10 transition-colors duration-300">
                      <item.icon className="w-4 h-4" />
                    </div>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-xs sm:text-sm font-light [font-family:var(--font-inter)]"
                      >
                        {item.text}
                      </a>
                    ) : (
                      <span className="text-xs sm:text-sm font-light [font-family:var(--font-inter)]">
                        {item.text}
                      </span>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>

          {/* Right: Cat Mascot */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative flex items-center justify-center lg:justify-end mt-12 lg:mt-0"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Multi-layer glow effect */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="absolute w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] lg:w-[500px] lg:h-[500px] rounded-full"
                style={{
                  background: `radial-gradient(circle, ${accentColor}20 0%, transparent 60%)`,
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
                  background: `radial-gradient(circle, ${accentColor}15 0%, transparent 50%)`,
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
                {/* Quote bubble */}
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
                  <div className="relative bg-gradient-to-br from-white/95 to-[#E0D9C9]/95 backdrop-blur-xl rounded-3xl p-4 sm:p-5 lg:p-6 shadow-2xl max-w-[180px] sm:max-w-[220px] lg:max-w-[280px] border border-white/20">
                    <p className="text-[#451C15] text-xs sm:text-sm lg:text-base italic font-light [font-family:var(--font-playfair)] leading-relaxed">
                      {defaultMascotQuote}
                    </p>
                    <div className="absolute -bottom-3 left-12 sm:left-16 w-6 h-6 bg-gradient-to-br from-white/95 to-[#E0D9C9]/95 rotate-45 border-r border-b border-white/20" />

                    {/* Hearts floating from speech bubble */}
                    {isHovered && (
                      <>
                        {[...Array(3)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute top-0 right-0"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{
                              opacity: [0, 1, 0],
                              scale: [0, 1, 0],
                              y: -30,
                              x: (i - 1) * 15,
                            }}
                            transition={{
                              duration: 2,
                              delay: i * 0.3,
                              repeat: Infinity,
                            }}
                          >
                            <Heart className="w-4 h-4 text-red-400 fill-red-400" />
                          </motion.div>
                        ))}
                      </>
                    )}
                  </div>
                </motion.div>

                {/* Cat illustration */}
                <div className="relative w-56 h-72 sm:w-72 sm:h-96 lg:w-96 lg:h-[480px] xl:w-[420px] xl:h-[520px]">
                  <Image
                    src="/img/cat-mascot.png"
                    alt="Lady Whiskers - DeliceMy Mascot"
                    fill
                    className="object-contain drop-shadow-2xl"
                    priority
                  />

                  {/* Animated sparkles */}
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

                  {/* Service achievement badges */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8, type: "spring" }}
                    viewport={{ once: true }}
                    className="absolute bottom-4 right-4"
                  >
                    <div className="bg-white/90 backdrop-blur-md rounded-2xl p-3 shadow-lg flex items-center gap-2">
                      <Award className="w-5 h-5 text-amber-500" />
                      <span className="text-xs font-medium text-[#451C15]">
                        Expert Level
                      </span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom decorative element */}
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
            <motion.path
              d="M50,40 Q150,10 250,40 T450,40 T550,40"
              stroke={`url(#cta-gradient-${serviceTitle.replace(/\s+/g, "-")})`}
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
                fill={accentColor}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 0.6 }}
                transition={{ delay: 0.3 * i, duration: 0.5, type: "spring" }}
                viewport={{ once: true }}
              />
            ))}

            <defs>
              <linearGradient
                id={`cta-gradient-${serviceTitle.replace(/\s+/g, "-")}`}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor={accentColor} stopOpacity="0" />
                <stop offset="20%" stopColor={accentColor} stopOpacity="0.8" />
                <stop offset="50%" stopColor="#E0D9C9" stopOpacity="1" />
                <stop offset="80%" stopColor={accentColor} stopOpacity="0.8" />
                <stop offset="100%" stopColor={accentColor} stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceCTA;
