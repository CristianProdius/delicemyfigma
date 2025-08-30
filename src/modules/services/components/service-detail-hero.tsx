// src/modules/services/components/service-detail-hero.tsx
"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import {
  ArrowRight,
  ChevronRight,
  Clock,
  Users,
  MapPin,
  DollarSign,
  Calendar,
  Award,
  Sparkles,
  Home,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import type { LucideIcon } from "lucide-react";
import type { FC } from "react";

type IconComponent = FC | LucideIcon;
// Icon mapping for service icons
const iconMap: { [key: string]: IconComponent } = {
  Users,
  Sparkles,
  Utensils: () => (
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
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
      <path d="M7 2v20" />
      <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
    </svg>
  ),
  PartyPopper: () => (
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
      <path d="M5.8 11.3 2 22l10.7-3.79" />
      <path d="M4 3h.01" />
      <path d="M22 8h.01" />
      <path d="M15 2h.01" />
      <path d="M22 20h.01" />
      <path d="m22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12v0c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10" />
      <path d="m22 13-.82-.33c-.86-.34-1.82.2-1.98 1.11v0c-.11.7-.72 1.22-1.43 1.22H17" />
      <path d="m11 2 .33.82c.34.86-.2 1.82-1.11 1.98v0C9.52 4.9 9 5.52 9 6.23V7" />
      <path d="M11 13c1.93 1.93 2.83 4.17 2 5-.83.83-3.07-.07-5-2-1.93-1.93-2.83-4.17-2-5 .83-.83 3.07.07 5 2Z" />
    </svg>
  ),
  Palette: () => (
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
      <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
      <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
      <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
      <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
    </svg>
  ),
  Gift: () => (
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
      <rect x="3" y="8" width="18" height="4" rx="1" />
      <path d="M12 8v13" />
      <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
      <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" />
    </svg>
  ),
};

export interface ServicePricing {
  type: "fixed" | "range" | "custom" | "package";
  currency: string;
  amount?: number;
  minAmount?: number;
  maxAmount?: number;
  unit?: string;
  packages?: Array<{
    name: string;
    price: number;
  }>;
}

export interface ServiceDetailHeroProps {
  id: string;
  title: string;
  shortDescription: string;
  heroImage: string;
  icon: string;
  accentColor?: string;
  pricing?: ServicePricing;
  duration?: string;
  groupSize?: string;
  location?: string;
  availability?: string;
  ctaButtonText?: string;
  onCtaClick?: () => void;
  className?: string;
}

interface StatData {
  icon: LucideIcon;
  label: string;
  value: string;
}
// Breadcrumbs Component
const Breadcrumbs = ({ serviceName }: { serviceName: string }) => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center space-x-2 text-sm mb-8"
    >
      <Link
        href="/"
        className="flex items-center text-amber-100/60 hover:text-amber-100 transition-colors"
      >
        <Home className="w-4 h-4 mr-1" />
        <span>Home</span>
      </Link>
      <ChevronRight className="w-4 h-4 text-amber-100/40" />
      <Link
        href="/services"
        className="text-amber-100/60 hover:text-amber-100 transition-colors"
      >
        Services
      </Link>
      <ChevronRight className="w-4 h-4 text-amber-100/40" />
      <span className="text-amber-100 font-medium">{serviceName}</span>
    </motion.nav>
  );
};

// Stat Card Component
const StatCard = ({
  icon: Icon,
  label,
  value,
  index,
  accentColor,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  index: number;
  accentColor: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        delay: 0.6 + index * 0.1,
        duration: 0.5,
        type: "spring",
        stiffness: 100,
      }}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.2 },
      }}
      className="group"
    >
      <div className="relative bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/20 hover:bg-white/15 transition-all duration-300 overflow-hidden">
        {/* Glow effect on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at center, ${accentColor}20 0%, transparent 70%)`,
          }}
        />

        <div className="relative z-10 flex items-center gap-3">
          <div
            className="p-2.5 rounded-xl bg-white/10 group-hover:bg-white/20 transition-colors duration-300"
            style={{
              boxShadow: `0 4px 20px ${accentColor}15`,
            }}
          >
            <Icon className="w-5 h-5 text-amber-100" />
          </div>
          <div>
            <p className="text-xs text-amber-100/70 font-light [font-family:var(--font-inter)]">
              {label}
            </p>
            <p className="text-sm sm:text-base text-white font-medium [font-family:var(--font-inter)]">
              {value}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const ServiceDetailHero = ({
  title,
  shortDescription,
  heroImage,
  icon,
  accentColor = "#D4A574",
  pricing,
  duration,
  groupSize,
  location,
  availability,
  ctaButtonText = "Book Now",
  onCtaClick,
  className,
}: ServiceDetailHeroProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax effects
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);

  // Get icon component
  const IconComponent = iconMap[icon] || Award;

  // Parse pricing for display
  const getPriceDisplay = () => {
    if (!pricing) return null;

    switch (pricing.type) {
      case "fixed":
        return `${pricing.currency}${pricing.amount}`;
      case "range":
        return `${pricing.currency}${pricing.minAmount}-${pricing.maxAmount}`;
      case "package":
        const prices = pricing.packages?.map((p) => p.price) || [];
        return prices.length > 0
          ? `From ${pricing.currency}${Math.min(...prices)}`
          : null;
      case "custom":
        return "Custom Pricing";
      default:
        return null;
    }
  };

  // Prepare stat cards data
  const stats: StatData[] = [
    duration && { icon: Clock, label: "Duration", value: duration },
    groupSize && { icon: Users, label: "Group Size", value: groupSize },
    location && { icon: MapPin, label: "Location", value: location },
    getPriceDisplay() && {
      icon: DollarSign,
      label: "Investment",
      value: getPriceDisplay(),
    },
    availability && {
      icon: Calendar,
      label: "Availability",
      value: availability,
    },
  ].filter(Boolean) as StatData[];

  return (
    <section
      ref={containerRef}
      className={cn(
        "relative min-h-[70vh] sm:min-h-[80vh] lg:min-h-[90vh] overflow-hidden",
        className
      )}
    >
      {/* Background Image with Parallax */}
      <motion.div
        style={{ y: imageY, opacity }}
        className="absolute inset-0 z-0"
      >
        <Image
          src={heroImage}
          alt={title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />

        {/* Decorative gradient accent */}
        <div
          className="absolute bottom-0 left-0 right-0 h-1/3"
          style={{
            background: `linear-gradient(to top, ${accentColor}15 0%, transparent 100%)`,
          }}
        />
      </motion.div>

      {/* Floating Chocolate Elements */}
      <div className="absolute inset-0 pointer-events-none z-[1]">
        {["🍫", "✨", "🌰"].map((emoji, index) => (
          <motion.div
            key={index}
            className="absolute hidden lg:block text-4xl xl:text-5xl opacity-20"
            style={{
              left: `${15 + index * 35}%`,
              top: `${20 + index * 15}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 15, -15, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 10 + index * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 1.5,
            }}
          >
            {emoji}
          </motion.div>
        ))}
      </div>

      {/* Content Container */}
      <motion.div
        style={{ y: contentY }}
        className="relative z-10 h-full flex flex-col justify-end px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24"
      >
        <div className="max-w-[95%] xl:max-w-[90%] mx-auto w-full">
          {/* Breadcrumbs */}
          <Breadcrumbs serviceName={title} />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 lg:gap-12 items-end">
            {/* Left: Title and Description */}
            <div>
              {/* Service Icon Badge */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  delay: 0.2,
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                }}
                className="inline-block mb-6"
              >
                <div
                  className="p-4 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl"
                  style={{
                    boxShadow: `0 20px 40px ${accentColor}20`,
                  }}
                >
                  <IconComponent className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
              </motion.div>

              {/* Title with Premium Typography */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-transparent bg-clip-text bg-gradient-to-br from-white via-amber-50 to-amber-100 mb-6 leading-[0.9] tracking-tight [font-family:var(--font-playfair)]"
              >
                {title.split(" ").map((word, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                    className="inline-block mr-3 last:mr-0"
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-lg sm:text-xl lg:text-2xl text-amber-100/80 max-w-3xl font-light leading-relaxed [font-family:var(--font-inter)]"
              >
                {shortDescription}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 mt-8"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    onClick={onCtaClick}
                    size="lg"
                    className="relative bg-gradient-to-br from-amber-100 to-amber-50 text-amber-950 hover:from-amber-50 hover:to-white active:from-white active:to-amber-100 rounded-full px-8 sm:px-10 py-6 sm:py-7 text-base sm:text-lg font-medium shadow-2xl hover:shadow-amber-300/50 hover:shadow-3xl group overflow-hidden transition-all duration-300"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {ctaButtonText}
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="inline-block"
                      >
                        <ArrowRight className="w-5 h-5" />
                      </motion.span>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-200/0 via-amber-200/50 to-amber-200/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-2 border-amber-100/30 text-amber-100 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-amber-100/50 rounded-full px-8 sm:px-10 py-6 sm:py-7 text-base sm:text-lg font-medium transition-all duration-300"
                  >
                    Learn More
                  </Button>
                </motion.div>
              </motion.div>
            </div>

            {/* Right: Floating Stat Cards */}
            {stats.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-3 lg:gap-4 lg:min-w-[280px]">
                {stats.map((stat, index) => (
                  <StatCard
                    key={index}
                    icon={stat.icon}
                    label={stat.label}
                    value={stat.value}
                    index={index}
                    accentColor={accentColor}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Premium Accent Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
            className="mt-12 h-[2px] bg-gradient-to-r from-transparent via-amber-400/50 to-transparent rounded-full max-w-md"
          />

          {/* Floating Rating Badge (optional) */}
        </div>
      </motion.div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/50 to-transparent z-20 pointer-events-none" />

      {/* Decorative Wave */}
      <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none">
        <svg viewBox="0 0 1440 60" className="w-full h-12 sm:h-16 fill-white">
          <path d="M0,30 Q360,0 720,30 T1440,30 L1440,60 L0,60 Z" />
        </svg>
      </div>
    </section>
  );
};

export default ServiceDetailHero;
