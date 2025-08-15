// src/modules/services/components/service-features.tsx
"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import {
  Award,
  BookOpen,
  Briefcase,
  Heart,
  Coffee,
  Users,
  Sparkles,
  Clock,
  Star,
  Target,
  Zap,
  Trophy,
  CheckCircle,
  TrendingUp,
  Calendar,
  MapPin,
  Gift,
  Palette,
  Shield,
  Smile,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Extended icon mapping for various feature types
const iconMap: { [key: string]: any } = {
  Award,
  BookOpen,
  Briefcase,
  Heart,
  Coffee,
  Users,
  Sparkles,
  Clock,
  Star,
  Target,
  Zap,
  Trophy,
  CheckCircle,
  TrendingUp,
  Calendar,
  MapPin,
  Gift,
  Palette,
  Shield,
  Smile,
  GraduationCap: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
      <path d="M22 10v6" />
      <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
    </svg>
  ),
  ChefHat: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 21a1 1 0 0 0 1-1v-5.35c0-.457.316-.844.727-1.041a4 4 0 0 0-2.134-7.589 5 5 0 0 0-9.186 0 4 4 0 0 0-2.134 7.588c.411.198.727.585.727 1.041V20a1 1 0 0 0 1 1Z" />
      <path d="M6 17h12" />
    </svg>
  ),
  Truck: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
      <path d="M15 18H9" />
      <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
      <circle cx="17" cy="18" r="2" />
      <circle cx="7" cy="18" r="2" />
    </svg>
  ),
  Sparkle: Sparkles,
};

// Brand color palette for alternating colors
const brandColors = [
  "#D4A574", // Warm gold
  "#E8B4B8", // Soft pink
  "#A67B5B", // Rich brown
  "#F4A460", // Sandy brown
  "#CD853F", // Peru
  "#E0D9C9", // Light cream
];

export interface ServiceFeature {
  icon: string;
  title: string;
  description: string;
  highlight?: boolean; // Optional flag for featured items
}

export interface ServiceFeaturesProps {
  features: ServiceFeature[];
  title?: string;
  subtitle?: string;
  primaryAccentColor?: string;
  variant?: "default" | "compact" | "cards";
  columns?: 2 | 3 | 4;
  alternateColors?: boolean;
  showNumbers?: boolean;
  className?: string;
}

// Individual Feature Item Component
const FeatureItem = ({
  feature,
  index,
  accentColor,
  variant,
  showNumber,
}: {
  feature: ServiceFeature;
  index: number;
  accentColor: string;
  variant: "default" | "compact" | "cards";
  showNumber: boolean;
}) => {
  const IconComponent = iconMap[feature.icon] || Sparkles;

  if (variant === "cards") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          delay: index * 0.1,
          duration: 0.6,
          ease: [0.43, 0.13, 0.23, 0.96],
        }}
        viewport={{ once: true, margin: "-50px" }}
        whileHover={{
          y: -8,
          transition: { duration: 0.3 },
        }}
        className="group h-full"
      >
        <div
          className={cn(
            "relative h-full bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8",
            "shadow-lg hover:shadow-2xl transition-all duration-500",
            "border border-[#451C15]/5",
            "overflow-hidden",
            feature.highlight && "ring-2 ring-offset-2",
            feature.highlight && accentColor ? undefined : undefined // placeholder for dynamic ring color
          )}
          style={{
            ...(feature.highlight && accentColor
              ? {
                  boxShadow: `0 0 0 2px ${accentColor}, 0 1px 3px 0 rgba(0,0,0,0.05)`,
                }
              : {}),
          }}
        >
          {/* Background gradient effect */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: `linear-gradient(135deg, ${accentColor}08 0%, transparent 60%)`,
            }}
          />

          {/* Number badge (optional) */}
          {showNumber && (
            <div
              className="absolute -top-2 -right-2 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
              style={{ backgroundColor: accentColor }}
            >
              {index + 1}
            </div>
          )}

          <div className="relative z-10">
            {/* Icon container */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              transition={{
                delay: index * 0.1 + 0.2,
                type: "spring",
                stiffness: 200,
                damping: 15,
              }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                style={{
                  backgroundColor: `${accentColor}15`,
                  borderColor: `${accentColor}30`,
                  borderWidth: "1px",
                  borderStyle: "solid",
                }}
              >
                <IconComponent
                  className="w-8 h-8 transition-transform duration-300 group-hover:scale-110"
                  style={{ color: accentColor }}
                />
              </div>
            </motion.div>

            {/* Content */}
            <h3 className="text-xl sm:text-2xl font-medium text-[#451C15] mb-3 [font-family:var(--font-inter)]">
              {feature.title}
            </h3>
            <p className="text-sm sm:text-base text-[#451C15]/60 leading-relaxed [font-family:var(--font-inter)]">
              {feature.description}
            </p>
          </div>

          {/* Corner accent */}
          <div
            className="absolute bottom-0 right-0 w-24 h-24 opacity-10 group-hover:opacity-20 transition-opacity duration-500"
            style={{
              background: `radial-gradient(circle at bottom right, ${accentColor} 0%, transparent 70%)`,
            }}
          />
        </div>
      </motion.div>
    );
  }

  if (variant === "compact") {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{
          delay: index * 0.08,
          duration: 0.5,
          ease: "easeOut",
        }}
        viewport={{ once: true, margin: "-30px" }}
        className="group flex items-start gap-3 sm:gap-4"
      >
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          className="flex-shrink-0"
        >
          <div
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-all duration-300"
            style={{
              backgroundColor: `${accentColor}15`,
              borderColor: `${accentColor}30`,
              borderWidth: "1px",
              borderStyle: "solid",
            }}
          >
            <IconComponent
              className="w-5 h-5 sm:w-6 sm:h-6"
              style={{ color: accentColor }}
            />
          </div>
        </motion.div>

        <div className="flex-1">
          <h4 className="text-base sm:text-lg font-medium text-[#451C15] mb-1 [font-family:var(--font-inter)]">
            {feature.title}
          </h4>
          <p className="text-sm text-[#451C15]/60 leading-relaxed [font-family:var(--font-inter)]">
            {feature.description}
          </p>
        </div>
      </motion.div>
    );
  }

  // Default variant (similar to AboutMe keyPoints)
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{
        delay: index * 0.1,
        duration: 0.6,
        ease: [0.43, 0.13, 0.23, 0.96],
      }}
      viewport={{ once: true, margin: "-50px" }}
      className="group"
    >
      <div className="flex gap-4 hover:translate-x-2 transition-transform duration-300">
        {/* Icon container with hover effect */}
        <motion.div
          whileHover={{ scale: 1.1, rotate: 10 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          className="flex-shrink-0"
        >
          <div
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:shadow-lg"
            style={{
              backgroundColor: `${accentColor}10`,
              borderColor: `${accentColor}25`,
              borderWidth: "1px",
              borderStyle: "solid",
              boxShadow: `0 4px 20px ${accentColor}10`,
            }}
          >
            <IconComponent
              className="w-6 h-6 sm:w-7 sm:h-7 transition-transform duration-300 group-hover:scale-110"
              style={{ color: accentColor }}
            />
          </div>
        </motion.div>

        {/* Content */}
        <div className="flex-1">
          <h4 className="text-lg sm:text-xl font-medium text-[#451C15] mb-2 [font-family:var(--font-inter)] group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#451C15] group-hover:to-[#A67B5B] transition-all duration-300">
            {feature.title}
          </h4>
          <p className="text-sm sm:text-base text-[#451C15]/70 leading-relaxed [font-family:var(--font-inter)]">
            {feature.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export const ServiceFeatures = ({
  features,
  title,
  subtitle,
  primaryAccentColor = "#D4A574",
  variant = "default",
  columns = 3,
  alternateColors = true,
  showNumbers = false,
  className,
}: ServiceFeaturesProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax effect for background elements
  const backgroundY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  // Get accent color for each feature
  const getAccentColor = (index: number) => {
    if (!alternateColors) return primaryAccentColor;
    return brandColors[index % brandColors.length];
  };

  // Determine grid columns class
  const getGridClass = () => {
    const baseClasses = "grid gap-6 sm:gap-8 lg:gap-10";

    if (variant === "compact") {
      return cn(baseClasses, "grid-cols-1 sm:grid-cols-2");
    }

    switch (columns) {
      case 2:
        return cn(baseClasses, "grid-cols-1 md:grid-cols-2");
      case 3:
        return cn(baseClasses, "grid-cols-1 md:grid-cols-2 lg:grid-cols-3");
      case 4:
        return cn(
          baseClasses,
          "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        );
      default:
        return cn(baseClasses, "grid-cols-1 md:grid-cols-2 lg:grid-cols-3");
    }
  };

  return (
    <section
      ref={containerRef}
      className={cn(
        "relative py-16 sm:py-20 lg:py-24",
        variant === "cards" && "bg-gradient-to-b from-white to-[#FFF9F5]",
        className
      )}
    >
      {/* Background decorative elements */}
      {variant === "cards" && (
        <>
          <motion.div
            style={{ y: backgroundY }}
            className="absolute inset-0 pointer-events-none"
          >
            <div
              className="absolute top-20 left-1/4 w-96 h-96 rounded-full opacity-5"
              style={{
                background: `radial-gradient(circle, ${primaryAccentColor} 0%, transparent 70%)`,
                filter: "blur(80px)",
              }}
            />
            <div
              className="absolute bottom-20 right-1/4 w-80 h-80 rounded-full opacity-5"
              style={{
                background: `radial-gradient(circle, ${brandColors[1]} 0%, transparent 70%)`,
                filter: "blur(60px)",
              }}
            />
          </motion.div>

          {/* Floating decorative elements */}
          <div className="absolute inset-0 pointer-events-none">
            {["✨", "🍫", "🌟"].map((emoji, index) => (
              <motion.div
                key={index}
                className="absolute hidden lg:block text-2xl opacity-10"
                style={{
                  left: `${10 + index * 40}%`,
                  top: `${15 + index * 20}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 8 + index * 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 1.5,
                }}
              >
                {emoji}
              </motion.div>
            ))}
          </div>
        </>
      )}

      <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-[95%] xl:max-w-[90%] mx-auto">
        {/* Section Header */}
        {(title || subtitle) && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            {subtitle && (
              <motion.span
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className="inline-block text-sm lg:text-base text-[#451C15]/70 tracking-[0.3em] uppercase font-medium mb-4 [font-family:var(--font-inter)]"
              >
                {subtitle}
              </motion.span>
            )}

            {title && (
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                viewport={{ once: true }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-[#451C15] [font-family:var(--font-playfair)]"
              >
                {title}
              </motion.h2>
            )}

            {/* Decorative line */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              viewport={{ once: true }}
              className="mt-6 h-[1px] bg-gradient-to-r from-transparent via-[#451C15]/20 to-transparent max-w-xs mx-auto"
            />
          </motion.div>
        )}

        {/* Features Grid */}
        <div className={getGridClass()}>
          {features.map((feature, index) => (
            <FeatureItem
              key={index}
              feature={feature}
              index={index}
              accentColor={getAccentColor(index)}
              variant={variant}
              showNumber={showNumbers}
            />
          ))}
        </div>

        {/* Bottom decorative element */}
        {variant === "cards" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-16 flex justify-center"
          >
            <svg viewBox="0 0 200 40" className="w-48 h-10 fill-none">
              <motion.path
                d="M20,20 Q50,5 80,20 T140,20 T180,20"
                stroke="url(#feature-gradient)"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
                viewport={{ once: true }}
              />
              <defs>
                <linearGradient
                  id="feature-gradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#E0D9C9" stopOpacity="0" />
                  <stop
                    offset="50%"
                    stopColor={primaryAccentColor}
                    stopOpacity="0.7"
                  />
                  <stop offset="100%" stopColor="#E0D9C9" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ServiceFeatures;
