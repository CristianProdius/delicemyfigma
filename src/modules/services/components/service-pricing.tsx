// src/modules/services/components/service-pricing.tsx
"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import {
  Check,
  X,
  ArrowRight,
  Sparkles,
  Star,
  Crown,
  Zap,
  Phone,
  Mail,
  Gift,
  TrendingUp,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface PricingFeature {
  text: string;
  included: boolean;
  highlight?: boolean;
}

export interface PricingPackage {
  id: string;
  name: string;
  description?: string;
  price: number | "custom";
  currency?: string;
  unit?: string; // per person, per hour, per event
  features: (string | PricingFeature)[];
  highlighted?: boolean;
  badge?: string; // "Most Popular", "Best Value", etc.
  icon?: "basic" | "premium" | "custom";
  accentColor?: string;
  ctaText?: string;
  savings?: string; // "Save $100"
  originalPrice?: number; // For showing discounts
}

export interface ServicePricingProps {
  packages: PricingPackage[];
  title?: string;
  subtitle?: string;
  note?: string;
  showCustomQuote?: boolean;
  onPackageSelect?: (packageId: string) => void;
  className?: string;
}

// Icon components for different tiers
const TierIcons = {
  basic: () => (
    <div className="relative">
      <Star className="w-8 h-8" />
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <Star className="w-8 h-8 opacity-30" />
      </motion.div>
    </div>
  ),
  premium: () => (
    <div className="relative">
      <Crown className="w-8 h-8" />
      <motion.div
        className="absolute -top-1 -right-1"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Sparkles className="w-4 h-4 text-amber-400" />
      </motion.div>
    </div>
  ),
  custom: () => (
    <div className="relative">
      <Zap className="w-8 h-8" />
      <motion.div
        className="absolute inset-0 blur-sm"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Zap className="w-8 h-8" />
      </motion.div>
    </div>
  ),
};

// Individual Pricing Card Component
const PricingCard = ({
  pkg,
  index,
  onSelect,
}: {
  pkg: PricingPackage;
  index: number;
  onSelect?: (packageId: string) => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const accentColor = pkg.accentColor || "#D4A574";
  const TierIcon = pkg.icon ? TierIcons[pkg.icon] : TierIcons.basic;

  // Parse features to handle both string and object formats
  const parseFeature = (feature: string | PricingFeature): PricingFeature => {
    if (typeof feature === "string") {
      return { text: feature, included: true };
    }
    return feature;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay: index * 0.15,
        duration: 0.6,
        ease: [0.43, 0.13, 0.23, 0.96],
      }}
      viewport={{ once: true }}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={cn("relative h-full", pkg.highlighted && "lg:scale-105 z-10")}
    >
      {/* Special Offer Badge/Ribbon */}
      {pkg.badge && (
        <motion.div
          initial={{ opacity: 0, scale: 0, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: -5 }}
          transition={{
            delay: index * 0.15 + 0.3,
            type: "spring",
            stiffness: 200,
          }}
          className="absolute -top-4 -right-2 z-20"
        >
          <div
            className="px-4 py-2 rounded-full shadow-2xl transform rotate-3 hover:rotate-6 transition-transform duration-300"
            style={{
              background: `linear-gradient(135deg, ${accentColor} 0%, ${accentColor}DD 100%)`,
            }}
          >
            <div className="flex items-center gap-1">
              <Award className="w-4 h-4 text-white" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                {pkg.badge}
              </span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Main Card */}
      <Card
        className={cn(
          "relative h-full overflow-hidden",
          "bg-gradient-to-br from-white/95 via-white/90 to-[#FFF9F5]/95",
          "backdrop-blur-xl",
          "border-2 transition-all duration-500",
          pkg.highlighted
            ? "shadow-2xl hover:shadow-3xl"
            : "shadow-lg hover:shadow-2xl",
          "rounded-3xl"
        )}
        style={{
          borderColor: pkg.highlighted
            ? `${accentColor}40`
            : "rgba(69, 28, 21, 0.1)",
        }}
      >
        {/* Background Gradient Effects */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Primary gradient */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            style={{
              background: `radial-gradient(circle at 50% 0%, ${accentColor}10 0%, transparent 50%)`,
            }}
          />

          {/* Animated glow effect */}
          <motion.div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full"
            style={{
              background: `radial-gradient(circle, ${accentColor}15 0%, transparent 70%)`,
              filter: "blur(40px)",
            }}
            animate={{
              scale: isHovered ? [1, 1.5, 1] : 1,
              opacity: isHovered ? [0.5, 1, 0.5] : 0.3,
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>

        {/* Card Content */}
        <div className="relative z-10 p-8 lg:p-10 flex flex-col h-full">
          {/* Header */}
          <div className="text-center mb-8">
            {/* Tier Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                delay: index * 0.15 + 0.2,
                type: "spring",
                stiffness: 200,
              }}
              className="inline-flex items-center justify-center mb-4"
            >
              <div
                className="p-4 rounded-2xl"
                style={{
                  backgroundColor: `${accentColor}10`,
                  borderColor: `${accentColor}30`,
                  borderWidth: "1px",
                  borderStyle: "solid",
                  color: accentColor,
                }}
              >
                <TierIcon />
              </div>
            </motion.div>

            {/* Package Name */}
            <h3 className="text-2xl sm:text-3xl font-light text-[#451C15] mb-2 [font-family:var(--font-playfair)]">
              {pkg.name}
            </h3>

            {/* Description */}
            {pkg.description && (
              <p className="text-sm text-[#451C15]/60 mb-4 [font-family:var(--font-inter)]">
                {pkg.description}
              </p>
            )}

            {/* Price */}
            <div className="mb-2">
              {pkg.price === "custom" ? (
                <div className="flex flex-col items-center">
                  <span className="text-3xl sm:text-4xl font-light text-[#451C15] [font-family:var(--font-playfair)]">
                    Custom Quote
                  </span>
                  <span className="text-sm text-[#451C15]/60 mt-2 [font-family:var(--font-inter)]">
                    Tailored to your needs
                  </span>
                </div>
              ) : (
                <div className="flex items-baseline justify-center gap-1">
                  {pkg.originalPrice && (
                    <span className="text-xl text-[#451C15]/40 line-through mr-2">
                      {pkg.currency || "$"}
                      {pkg.originalPrice}
                    </span>
                  )}
                  <span className="text-2xl font-light text-[#451C15]">
                    {pkg.currency || "$"}
                  </span>
                  <span className="text-5xl font-light text-transparent bg-clip-text bg-gradient-to-br from-[#451C15] to-[#A67B5B] [font-family:var(--font-playfair)]">
                    {pkg.price}
                  </span>
                  {pkg.unit && (
                    <span className="text-sm text-[#451C15]/60 ml-1">
                      /{pkg.unit}
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Savings Badge */}
            {pkg.savings && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.15 + 0.4, type: "spring" }}
                className="inline-block"
              >
                <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium [font-family:var(--font-inter)]">
                  <Gift className="w-3 h-3 inline mr-1" />
                  {pkg.savings}
                </div>
              </motion.div>
            )}
          </div>

          {/* Features List */}
          <div className="flex-1 mb-8">
            <ul className="space-y-4">
              {pkg.features.map((feature, i) => {
                const parsedFeature = parseFeature(feature);
                return (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.15 + i * 0.05 }}
                    viewport={{ once: true }}
                    className={cn(
                      "flex items-start gap-3",
                      !parsedFeature.included && "opacity-50"
                    )}
                  >
                    <div className="flex-shrink-0 mt-0.5">
                      {parsedFeature.included ? (
                        <div
                          className="w-5 h-5 rounded-full flex items-center justify-center"
                          style={{
                            backgroundColor: parsedFeature.highlight
                              ? accentColor
                              : `${accentColor}15`,
                          }}
                        >
                          <Check
                            className="w-3 h-3"
                            style={{
                              color: parsedFeature.highlight
                                ? "white"
                                : accentColor,
                            }}
                          />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center">
                          <X className="w-3 h-3 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <span
                      className={cn(
                        "text-sm [font-family:var(--font-inter)]",
                        parsedFeature.included
                          ? parsedFeature.highlight
                            ? "text-[#451C15] font-medium"
                            : "text-[#451C15]/70"
                          : "text-[#451C15]/40 line-through"
                      )}
                    >
                      {parsedFeature.text}
                    </span>
                  </motion.li>
                );
              })}
            </ul>
          </div>

          {/* CTA Button */}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={() => onSelect?.(pkg.id)}
              className={cn(
                "w-full rounded-full py-6 text-base font-medium transition-all duration-300 group",
                pkg.highlighted || pkg.price === "custom"
                  ? "bg-gradient-to-r from-[#451C15] to-[#5A241C] text-[#E0D9C9] hover:shadow-2xl"
                  : "bg-[#451C15]/10 text-[#451C15] hover:bg-[#451C15]/20"
              )}
              style={{
                boxShadow: pkg.highlighted
                  ? `0 10px 30px ${accentColor}20`
                  : undefined,
              }}
            >
              <span className="flex items-center justify-center gap-2">
                {pkg.ctaText ||
                  (pkg.price === "custom" ? "Get Quote" : "Book Now")}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>
          </motion.div>
        </div>

        {/* Decorative Corner Accents */}
        <div
          className="absolute top-0 right-0 w-32 h-32 opacity-10"
          style={{
            background: `radial-gradient(circle at top right, ${accentColor} 0%, transparent 70%)`,
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-32 h-32 opacity-10"
          style={{
            background: `radial-gradient(circle at bottom left, ${accentColor} 0%, transparent 70%)`,
          }}
        />
      </Card>
    </motion.div>
  );
};

// Custom Quote Card Component
const CustomQuoteCard = ({ onContact }: { onContact?: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="mt-12"
    >
      <Card className="relative overflow-hidden bg-gradient-to-br from-[#451C15]/5 to-[#D4A574]/5 backdrop-blur-sm border-2 border-[#451C15]/10 rounded-3xl p-8 lg:p-12">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(69, 28, 21, 0.03) 35px, rgba(69, 28, 21, 0.03) 70px)`,
            }}
          />
        </div>

        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <Sparkles className="w-5 h-5 text-[#D4A574]" />
            <span className="text-sm font-medium text-[#451C15]/70 uppercase tracking-wider [font-family:var(--font-inter)]">
              Need Something Special?
            </span>
            <Sparkles className="w-5 h-5 text-[#D4A574]" />
          </motion.div>

          <h3 className="text-3xl sm:text-4xl font-light text-[#451C15] mb-4 [font-family:var(--font-playfair)]">
            Custom Packages Available
          </h3>

          <p className="text-[#451C15]/60 mb-8 max-w-xl mx-auto [font-family:var(--font-inter)]">
            Every event is unique. Let's create a personalized package that
            perfectly matches your vision, budget, and requirements. From
            intimate gatherings to grand celebrations, we're here to help.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={onContact}
              size="lg"
              className="bg-[#451C15] text-[#E0D9C9] hover:bg-[#5A241C] rounded-full px-8 py-6 text-base shadow-xl hover:shadow-2xl transition-all duration-300 group"
            >
              <Phone className="w-5 h-5 mr-2" />
              <span>Contact for Custom Quote</span>
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="border-2 border-[#451C15]/20 text-[#451C15] hover:bg-[#451C15]/5 rounded-full px-8 py-6 text-base"
            >
              <Mail className="w-5 h-5 mr-2" />
              Email Us
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-[#451C15]/50 [font-family:var(--font-inter)]">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span>Free Consultation</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span>Flexible Payment</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span>100% Satisfaction</span>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export const ServicePricing = ({
  packages,
  title = "Choose Your Package",
  subtitle = "Investment Options",
  note,
  showCustomQuote = true,
  onPackageSelect,
  className,
}: ServicePricingProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section
      ref={containerRef}
      className={cn(
        "relative py-16 sm:py-20 lg:py-24",
        "bg-gradient-to-b from-white via-[#FFF9F5] to-white",
        className
      )}
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div style={{ y: backgroundY }} className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-radial from-[#D4A574]/10 to-transparent blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-gradient-radial from-[#E8B4B8]/10 to-transparent blur-3xl" />
        </motion.div>

        {/* Floating decorative elements */}
        {["💎", "✨", "🎁"].map((emoji, index) => (
          <motion.div
            key={index}
            className="absolute hidden lg:block text-3xl opacity-10"
            style={{
              left: `${20 + index * 30}%`,
              top: `${10 + index * 25}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 10, -10, 0],
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

      <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-[95%] xl:max-w-[90%] mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
            viewport={{ once: true }}
            className="inline-block text-sm text-[#451C15]/70 tracking-[0.3em] uppercase font-medium mb-4 [font-family:var(--font-inter)]"
          >
            {subtitle}
          </motion.span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-[#451C15] mb-4 [font-family:var(--font-playfair)]">
            {title}
          </h2>

          {note && (
            <p className="text-lg text-[#451C15]/60 max-w-2xl mx-auto [font-family:var(--font-inter)]">
              {note}
            </p>
          )}

          {/* Decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-6 h-[1px] bg-gradient-to-r from-transparent via-[#D4A574]/50 to-transparent max-w-xs mx-auto"
          />
        </motion.div>

        {/* Pricing Cards Grid */}
        <div
          className={cn(
            "grid gap-8 lg:gap-10",
            packages.length === 1 && "max-w-md mx-auto",
            packages.length === 2 &&
              "grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto",
            packages.length === 3 &&
              "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
            packages.length >= 4 &&
              "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          )}
        >
          {packages.map((pkg, index) => (
            <PricingCard
              key={pkg.id}
              pkg={pkg}
              index={index}
              onSelect={onPackageSelect}
            />
          ))}
        </div>

        {/* Custom Quote Section */}
        {showCustomQuote && (
          <CustomQuoteCard onContact={() => onPackageSelect?.("custom")} />
        )}

        {/* Bottom Decorative Element */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 flex justify-center"
        >
          <svg viewBox="0 0 300 60" className="w-64 h-12 fill-none">
            <motion.path
              d="M30,30 Q75,10 150,30 T270,30"
              stroke="url(#pricing-gradient)"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
              viewport={{ once: true }}
            />
            <defs>
              <linearGradient
                id="pricing-gradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#E0D9C9" stopOpacity="0" />
                <stop offset="20%" stopColor="#D4A574" stopOpacity="0.6" />
                <stop offset="50%" stopColor="#451C15" stopOpacity="0.8" />
                <stop offset="80%" stopColor="#D4A574" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#E0D9C9" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicePricing;
