// src/modules/services/components/service-card.tsx
"use client";

import { motion, useMotionValue, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  Clock,
  Users,
  Sparkles,
  Utensils,
  PartyPopper,
  Palette,
  Gift,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Icon mapping for dynamic icon rendering
const iconComponents = {
  Users,
  Sparkles,
  Utensils,
  PartyPopper,
  Palette,
  Gift,
};

// Type for icon names
export type IconName = keyof typeof iconComponents;

// Service pricing type definitions
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
    features: string[];
    highlighted?: boolean;
  }>;
  note?: string;
}

// Props interface for the ServiceCard component
export interface ServiceCardProps {
  id: string;
  title: string;
  shortDescription: string;
  image: string;
  icon: IconName | React.ComponentType;
  accentColor?: string;
  pricing?: ServicePricing;
  duration?: string;
  groupSize?: string;
  href?: string;
  className?: string;
  index?: number; // For staggered animations
  variant?: "default" | "compact" | "featured";
  showMetadata?: boolean;
  onLearnMore?: () => void; // Optional callback instead of navigation
}

export const ServiceCard = ({
  id,
  title,
  shortDescription,
  image,
  icon,
  accentColor = "#D4A574",
  pricing,
  duration,
  groupSize,
  href,
  className,
  index = 0,
  variant = "default",
  showMetadata = true,
  onLearnMore,
}: ServiceCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for advanced hover effects
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);

  // Get the icon component
  const IconComponent = typeof icon === "string" ? iconComponents[icon] : icon;

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
          : "Various packages";
      case "custom":
        return "Custom pricing";
      default:
        return null;
    }
  };

  // Handle mouse move for 3D effect (optional, for featured variant)
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (variant !== "featured") return;

    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    x.set((event.clientX - centerX) / 5);
    y.set((event.clientY - centerY) / 5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Determine card height based on variant
  const getCardHeight = () => {
    switch (variant) {
      case "compact":
        return "h-[320px] sm:h-[350px]";
      case "featured":
        return "h-[450px] sm:h-[500px] lg:h-[550px]";
      default:
        return "h-[380px] sm:h-[420px] lg:h-[450px]";
    }
  };

  const getImageHeight = () => {
    switch (variant) {
      case "compact":
        return "h-32 sm:h-36";
      case "featured":
        return "h-56 sm:h-64 lg:h-72";
      default:
        return "h-48 sm:h-52 lg:h-56";
    }
  };

  // Card content
  const cardContent = (
    <motion.div
      className={cn(
        "group relative overflow-hidden rounded-2xl sm:rounded-3xl",
        "bg-white shadow-lg hover:shadow-2xl",
        "transition-all duration-500",
        "border border-[#451C15]/5",
        getCardHeight(),
        "flex flex-col",
        className
      )}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.43, 0.13, 0.23, 0.96],
      }}
      whileHover={{
        y: -8,
        transition: { duration: 0.3 },
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        handleMouseLeave();
      }}
      onMouseMove={handleMouseMove}
      style={{
        transformStyle: variant === "featured" ? "preserve-3d" : undefined,
        rotateX: variant === "featured" ? rotateX : 0,
        rotateY: variant === "featured" ? rotateY : 0,
      }}
    >
      {/* Gradient border effect on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl sm:rounded-3xl z-10"
        style={{
          background: `linear-gradient(135deg, ${accentColor}20 0%, transparent 50%, ${accentColor}20 100%)`,
        }}
      />

      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${accentColor}10 0%, transparent 70%)`,
          filter: "blur(40px)",
        }}
      />

      {/* Image Container */}
      <div
        className={cn(
          "relative overflow-hidden flex-shrink-0",
          getImageHeight()
        )}
      >
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={index < 3}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

        {/* Icon Badge */}
        <motion.div
          className="absolute top-4 right-4 z-20"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            delay: index * 0.1 + 0.3,
            type: "spring",
            stiffness: 200,
            damping: 15,
          }}
        >
          <motion.div
            className="p-3 rounded-2xl bg-white/90 backdrop-blur-md shadow-lg group-hover:shadow-xl transition-all duration-300"
            style={{
              backgroundColor: `${accentColor}15`,
              borderColor: `${accentColor}30`,
              borderWidth: "1px",
              borderStyle: "solid",
            }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            {IconComponent && (
              <IconComponent
                className="w-5 h-5 sm:w-6 sm:h-6"
                style={{ color: accentColor }}
              />
            )}
          </motion.div>
        </motion.div>

        {/* Price Badge */}
        {getPriceDisplay() && variant !== "compact" && (
          <motion.div
            className="absolute bottom-4 left-4 z-20"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 + 0.4 }}
          >
            <div className="px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full shadow-md">
              <span className="text-xs sm:text-sm font-medium text-[#451C15]">
                {getPriceDisplay()}
              </span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col p-5 sm:p-6 lg:p-8">
        {/* Title */}
        <h3
          className={cn(
            "font-light text-[#451C15] mb-2 sm:mb-3 leading-tight",
            "[font-family:var(--font-playfair)]",
            "group-hover:text-transparent group-hover:bg-clip-text",
            "group-hover:bg-gradient-to-r group-hover:from-[#451C15] group-hover:to-[#A67B5B]",
            "transition-all duration-300",
            variant === "compact"
              ? "text-lg sm:text-xl lg:text-2xl line-clamp-1"
              : "text-xl sm:text-2xl lg:text-3xl line-clamp-2"
          )}
        >
          {title}
        </h3>

        {/* Description */}
        <p
          className={cn(
            "text-[#451C15]/60 mb-4 sm:mb-6 leading-relaxed font-light",
            "[font-family:var(--font-inter)]",
            variant === "compact"
              ? "text-xs sm:text-sm line-clamp-2"
              : "text-sm sm:text-base line-clamp-3"
          )}
        >
          {shortDescription}
        </p>

        {/* Meta Info */}
        {showMetadata && variant !== "compact" && (duration || groupSize) && (
          <div className="flex flex-wrap gap-3 sm:gap-4 mb-4 sm:mb-6 text-xs sm:text-sm text-[#451C15]/50">
            {duration && (
              <motion.div
                className="flex items-center gap-1.5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.5 }}
              >
                <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>{duration}</span>
              </motion.div>
            )}
            {groupSize && (
              <motion.div
                className="flex items-center gap-1.5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.6 }}
              >
                <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>{groupSize}</span>
              </motion.div>
            )}
          </div>
        )}

        {/* CTA Section - Pushed to bottom */}
        <div className="mt-auto">
          {variant === "compact" ? (
            // Compact variant - simple link style
            <motion.div
              className="flex items-center gap-2 text-[#451C15] hover:text-[#A67B5B] transition-colors duration-300"
              animate={isHovered ? { x: 5 } : { x: 0 }}
            >
              <span className="text-sm font-light [font-family:var(--font-inter)]">
                Learn More
              </span>
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          ) : (
            // Default and featured variants - button style
            <Button
              variant="ghost"
              className="relative p-0 text-[#451C15] hover:text-black transition-all duration-300 font-light text-base lg:text-lg group/btn"
              onClick={onLearnMore}
            >
              <span className="relative z-10">Learn More</span>
              <ArrowRight className="ml-2 w-5 h-5 transition-all duration-300 group-hover/btn:translate-x-2" />

              {/* Underline effect */}
              <motion.span
                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-transparent to-transparent group-hover/btn:from-[#451C15] group-hover/btn:to-[#A67B5B]"
                initial={{ width: "0%" }}
                animate={{ width: isHovered ? "100%" : "0%" }}
                transition={{ duration: 0.3 }}
                style={{ backgroundColor: accentColor }}
              />
            </Button>
          )}
        </div>
      </div>

      {/* Decorative Corner Accent */}
      <div
        className="absolute bottom-0 left-0 w-24 h-24 sm:w-32 sm:h-32 opacity-10 group-hover:opacity-20 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at bottom left, ${accentColor} 0%, transparent 70%)`,
        }}
      />

      {/* Floating particles effect (for featured variant) */}
      {variant === "featured" && isHovered && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              initial={{
                x: Math.random() * 100,
                y: "100%",
                opacity: 0,
              }}
              animate={{
                y: "-20%",
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                delay: i * 0.3,
                repeat: Infinity,
                ease: "easeOut",
              }}
              style={{ left: `${20 + i * 30}%` }}
            />
          ))}
        </div>
      )}
    </motion.div>
  );

  // Wrap in Link if href is provided
  if (href && !onLearnMore) {
    return (
      <Link href={href} className="block h-full">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
};

// Export a memoized version for performance
export default ServiceCard;
