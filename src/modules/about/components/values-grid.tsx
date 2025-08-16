// src/modules/about/components/values-grid.tsx
"use client";

import { motion } from "motion/react";
import {
  Heart,
  Award,
  Users,
  Sparkles,
  Target,
  BookOpen,
  Leaf,
  Globe,
  Lightbulb,
  Shield,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { useState } from "react";

// Custom icon components
const QualityIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full"
  >
    <path
      d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.3" />
  </svg>
);

const ExcellenceIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full"
  >
    <path
      d="M12 2L13.5 7.5H19L14.5 11L16 16.5L12 13L8 16.5L9.5 11L5 7.5H10.5L12 2Z"
      fill="currentColor"
      opacity="0.3"
    />
    <path
      d="M12 2L13.5 7.5H19L14.5 11L16 16.5L12 13L8 16.5L9.5 11L5 7.5H10.5L12 2Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 17V22"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const CreativityIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full"
  >
    <path
      d="M12 2C13.5 2 15 3.5 15 5C15 7 14 8 14 10H10C10 8 9 7 9 5C9 3.5 10.5 2 12 2Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10 10H14V13C14 14.1 13.1 15 12 15C10.9 15 10 14.1 10 13V10Z"
      fill="currentColor"
      opacity="0.3"
    />
    <path
      d="M12 15V18M9 18H15"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <circle cx="12" cy="5" r="1" fill="currentColor" />
    <path
      d="M4 12L6 10M20 12L18 10M6 6L8 7M18 6L16 7"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity="0.5"
    />
  </svg>
);

const SustainabilityIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full"
  >
    <path
      d="M12 2C10 2 8 4 8 6C8 8 10 10 10 12H14C14 10 16 8 16 6C16 4 14 2 12 2Z"
      fill="currentColor"
      opacity="0.3"
    />
    <path
      d="M12 2C10 2 8 4 8 6C8 8 10 10 10 12H14C14 10 16 8 16 6C16 4 14 2 12 2Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 12V22M8 18L12 22L16 18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="8" r="1" fill="currentColor" />
  </svg>
);

const CommunityIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full"
  >
    <circle cx="9" cy="9" r="3" stroke="currentColor" strokeWidth="2" />
    <circle cx="15" cy="9" r="3" stroke="currentColor" strokeWidth="2" />
    <circle cx="12" cy="15" r="3" stroke="currentColor" strokeWidth="2" />
    <path
      d="M12 12C12 12 11 9 9 9C7 9 6 12 6 12M18 12C18 12 17 9 15 9C13 9 12 12 12 12M15 18C15 18 14 15 12 15C10 15 9 18 9 18"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity="0.5"
    />
  </svg>
);

const EducationIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full"
  >
    <path
      d="M2 7L12 2L22 7L12 12L2 7Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M2 7L12 12L22 7" fill="currentColor" opacity="0.3" />
    <path
      d="M6 9.5V16C6 16 8 18 12 18C16 18 18 16 18 16V9.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M22 7V13"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

// Icon mapping
const iconMap: { [key: string]: any } = {
  "⭐": ExcellenceIcon,
  "✨": QualityIcon,
  "🎨": CreativityIcon,
  "🌱": SustainabilityIcon,
  "📚": EducationIcon,
  "🤝": CommunityIcon,
  "🌍": Globe,
  "📖": BookOpen,
  Heart,
  Award,
  Users,
  Sparkles,
  Target,
  BookOpen,
  Leaf,
  Shield,
  Lightbulb,
  Quality: QualityIcon,
  Excellence: ExcellenceIcon,
  Creativity: CreativityIcon,
  Sustainability: SustainabilityIcon,
  Community: CommunityIcon,
  Education: EducationIcon,
};

interface Value {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

interface ValuesGridProps {
  values: Value[];
  title?: string;
  subtitle?: string;
}

export const ValuesGrid = ({
  values,
  title = "Our Values",
  subtitle = "What drives us every day",
}: ValuesGridProps) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const getIcon = (iconName: string) => {
    const IconComponent = iconMap[iconName] || Sparkles;
    return IconComponent;
  };

  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 max-w-[95%] xl:max-w-[90%] mx-auto">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-12 lg:mb-16"
      >
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#D4A57420] mb-4"
        >
          <Heart className="w-8 h-8 text-[#D4A574]" />
        </motion.div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#451C15] mb-4 [font-family:var(--font-playfair)]">
          {title}
        </h2>

        <p className="text-lg text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
      </motion.div>

      {/* Values Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {values.map((value, index) => {
          const IconComponent = getIcon(value.icon);
          const isHovered = hoveredId === value.id;

          return (
            <motion.div
              key={value.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                type: "spring",
                stiffness: 100,
              }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredId(value.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <Card className="relative h-full p-6 sm:p-8 bg-white border-none shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
                {/* Background Gradient */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${value.color}10 0%, transparent 100%)`,
                  }}
                />

                {/* Decorative Corner */}
                <motion.div
                  className="absolute -top-2 -right-2 w-24 h-24 rounded-full blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                  style={{ backgroundColor: value.color }}
                />

                {/* Icon Container */}
                <motion.div
                  className="relative z-10 mb-6"
                  animate={{
                    rotate: isHovered ? [0, -10, 10, 0] : 0,
                    scale: isHovered ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <div
                    className="inline-flex items-center justify-center w-16 h-16 rounded-2xl"
                    style={{
                      backgroundColor: `${value.color}15`,
                      border: `2px solid ${value.color}30`,
                    }}
                  >
                    <div className="w-8 h-8" style={{ color: value.color }}>
                      <IconComponent />
                    </div>
                  </div>

                  {/* Floating Dot */}
                  <motion.div
                    className="absolute -top-1 -right-1 w-3 h-3 rounded-full"
                    style={{ backgroundColor: value.color }}
                    animate={{
                      scale: isHovered ? [1, 1.5, 1] : 1,
                      opacity: isHovered ? [1, 0.5, 1] : 0.7,
                    }}
                    transition={{
                      duration: 1,
                      repeat: isHovered ? Infinity : 0,
                    }}
                  />
                </motion.div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-xl sm:text-2xl font-semibold text-[#451C15] mb-3 [font-family:var(--font-playfair)]">
                    {value.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>

                  {/* Bottom Accent Line */}
                  <motion.div
                    className="mt-6 h-1 rounded-full overflow-hidden"
                    style={{ backgroundColor: `${value.color}20` }}
                  >
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: value.color }}
                      initial={{ width: "0%" }}
                      animate={{ width: isHovered ? "100%" : "30%" }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    />
                  </motion.div>
                </div>

                {/* Hover Effect - Corner Decoration */}
                <motion.svg
                  className="absolute bottom-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                  viewBox="0 0 100 100"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: isHovered ? 90 : 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <circle cx="100" cy="100" r="50" fill={value.color} />
                  <circle
                    cx="100"
                    cy="100"
                    r="30"
                    fill={value.color}
                    opacity="0.5"
                  />
                </motion.svg>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom Decoration */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        viewport={{ once: true }}
        className="flex justify-center mt-12"
      >
        <div className="flex items-center gap-2">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-[#D4A574]"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                delay: i * 0.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
};
