"use client";

import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import {
  GraduationCap,
  Award,
  Users,
  BookOpen,
  Briefcase,
  Clock,
  Globe,
  Star,
  ChefHat,
  Target,
  Sparkles,
  TrendingUp,
  LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface Feature {
  id: string;
  icon: LucideIcon | React.ReactNode;
  title: string;
  description: string;
  gradient?: string;
  iconColor?: string;
  delay?: number;
}

export interface SchoolFeaturesProps {
  title: string;
  subtitle?: string;
  features: Feature[];
  columns?: number;
  className?: string;
  showNumbers?: boolean;
  variant?: "default" | "compact" | "detailed";
}

// Default icon map for string-based icons
const iconMap: Record<string, LucideIcon> = {
  graduation: GraduationCap,
  award: Award,
  users: Users,
  book: BookOpen,
  briefcase: Briefcase,
  clock: Clock,
  globe: Globe,
  star: Star,
  chef: ChefHat,
  target: Target,
  sparkles: Sparkles,
  trending: TrendingUp,
};

// Feature card component
const FeatureCard: React.FC<{
  feature: Feature;
  index: number;
  showNumber?: boolean;
  variant?: "default" | "compact" | "detailed";
}> = ({ feature, index, showNumber = false, variant = "default" }) => {
  // Default gradients for cards
  const defaultGradients = [
    "from-amber-400 to-orange-500",
    "from-purple-400 to-pink-500",
    "from-blue-400 to-cyan-500",
    "from-green-400 to-teal-500",
    "from-red-400 to-rose-500",
    "from-indigo-400 to-purple-500",
  ];

  const gradient =
    feature.gradient || defaultGradients[index % defaultGradients.length];
  const iconColor = feature.iconColor || "text-white";

  // Get the icon component
  const IconComponent = React.isValidElement(feature.icon)
    ? () => feature.icon as React.ReactElement
    : typeof feature.icon === "string"
    ? iconMap[feature.icon as string] || Award
    : (feature.icon as LucideIcon);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.5,
        delay: feature.delay || index * 0.1,
        ease: "easeOut" as const,
      }}
      className="h-full"
    >
      <motion.div
        className={cn(
          "group relative h-full rounded-2xl p-6 shadow-lg transition-all duration-300",
          "bg-white hover:shadow-2xl",
          variant === "compact" && "p-4",
          variant === "detailed" && "p-8"
        )}
        whileHover={{
          y: -8,
          transition: { duration: 0.3, ease: "easeOut" },
        }}
      >
        {/* Background gradient decoration */}
        <div
          className={cn(
            "absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-300",
            gradient
          )}
        />

        {/* Number badge (optional) */}
        {showNumber && (
          <motion.div
            className="absolute -top-3 -right-3 w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-lg"
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{
              delay: (feature.delay || index * 0.1) + 0.2,
              type: "spring",
              stiffness: 200,
            }}
          >
            {index + 1}
          </motion.div>
        )}

        {/* Icon container with gradient background */}
        <motion.div
          className={cn(
            "relative inline-flex items-center justify-center rounded-2xl mb-4",
            "w-16 h-16 bg-gradient-to-br shadow-lg",
            gradient,
            variant === "compact" && "w-12 h-12 mb-3",
            variant === "detailed" && "w-20 h-20 mb-6"
          )}
          whileHover={{
            rotate: [0, -10, 10, -10, 0],
            scale: 1.1,
            transition: { duration: 0.5 },
          }}
        >
          {/* Animated icon */}
          <motion.div
            animate={{
              y: [0, -3, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {React.isValidElement(feature.icon) ? (
              feature.icon
            ) : (
              <IconComponent
                className={cn(
                  "w-8 h-8",
                  iconColor,
                  variant === "compact" && "w-6 h-6",
                  variant === "detailed" && "w-10 h-10"
                )}
              />
            )}
          </motion.div>

          {/* Sparkle effect on hover */}
          <motion.div
            className="absolute inset-0 rounded-2xl"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Sparkles className="absolute -top-2 -right-2 w-4 h-4 text-amber-400" />
            <Sparkles className="absolute -bottom-1 -left-1 w-3 h-3 text-amber-300" />
          </motion.div>
        </motion.div>

        {/* Content */}
        <div className="relative">
          <h3
            className={cn(
              "font-bold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors duration-300",
              variant === "compact" && "text-lg",
              variant === "default" && "text-xl",
              variant === "detailed" && "text-2xl mb-3"
            )}
          >
            {feature.title}
          </h3>

          <p
            className={cn(
              "text-gray-600 leading-relaxed",
              variant === "compact" && "text-sm",
              variant === "default" && "text-base",
              variant === "detailed" && "text-lg"
            )}
          >
            {feature.description}
          </p>
        </div>

        {/* Hover gradient border effect */}
        <motion.div
          className={cn(
            "absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300",
            gradient
          )}
          style={{
            padding: "2px",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />

        {/* Corner decoration on hover */}
        <motion.div
          className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
          initial={false}
        >
          <div
            className={cn(
              "w-full h-full bg-gradient-to-br rounded-bl-3xl",
              gradient
            )}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export const SchoolFeatures: React.FC<SchoolFeaturesProps> = ({
  title,
  subtitle,
  features,
  columns = 3,
  className,
  showNumbers = false,
  variant = "default",
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Responsive column classes
  const getGridCols = () => {
    switch (columns) {
      case 2:
        return "grid-cols-1 md:grid-cols-2";
      case 3:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
      case 4:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
      case 5:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5";
      case 6:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6";
      default:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
    }
  };

  return (
    <section
      ref={sectionRef}
      className={cn(
        "py-16 md:py-24 bg-gradient-to-b from-amber-50/30 to-white",
        className
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">
              {title}
            </span>
          </motion.h2>

          {subtitle && (
            <motion.p
              className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {subtitle}
            </motion.p>
          )}

          {/* Decorative line */}
          <motion.div
            className="mt-6 mx-auto w-24 h-1 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full"
            initial={{ width: 0 }}
            animate={isInView ? { width: 96 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          />
        </motion.div>

        {/* Features Grid */}
        <div className={cn("grid gap-6 md:gap-8", getGridCols())}>
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.id}
              feature={feature}
              index={index}
              showNumber={showNumbers}
              variant={variant}
            />
          ))}
        </div>

        {/* Bottom decoration */}
        <motion.div
          className="mt-12 flex justify-center"
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="flex items-center gap-2 text-amber-600">
            <ChefHat className="w-5 h-5" />
            <span className="text-sm font-medium">
              Excellence in Chocolate Education
            </span>
            <ChefHat className="w-5 h-5" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Example usage with default features
export const defaultFeatures: Feature[] = [
  {
    id: "feature-1",
    icon: GraduationCap,
    title: "Professional Instructors",
    description:
      "Learn from master chocolatiers with decades of international experience",
    gradient: "from-amber-400 to-orange-500",
  },
  {
    id: "feature-2",
    icon: Award,
    title: "Certified Programs",
    description:
      "Internationally recognized certifications upon successful completion",
    gradient: "from-purple-400 to-pink-500",
  },
  {
    id: "feature-3",
    icon: Users,
    title: "Small Class Sizes",
    description:
      "Maximum 12 students per class for personalized attention and guidance",
    gradient: "from-blue-400 to-cyan-500",
  },
  {
    id: "feature-4",
    icon: BookOpen,
    title: "Hands-on Learning",
    description:
      "80% practical training in our state-of-the-art chocolate laboratory",
    gradient: "from-green-400 to-teal-500",
  },
  {
    id: "feature-5",
    icon: Briefcase,
    title: "Industry Connections",
    description:
      "Direct placement opportunities with partner hotels and restaurants",
    gradient: "from-red-400 to-rose-500",
  },
  {
    id: "feature-6",
    icon: Clock,
    title: "Flexible Scheduling",
    description:
      "Weekend and evening classes available for working professionals",
    gradient: "from-indigo-400 to-purple-500",
  },
];

export default SchoolFeatures;
