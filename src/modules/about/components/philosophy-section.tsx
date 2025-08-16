// src/modules/about/components/philosophy-section.tsx
"use client";

import { motion } from "motion/react";
import { Sparkles, Award, Users, Target, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useState } from "react";

interface Philosophy {
  id: string;
  title: string;
  description: string;
  icon: string;
}

interface Achievements {
  yearsExperience: number;
  studentsTraught: number;
  creationsDesigned: number;
  awardsWon: number;
}

interface PhilosophySectionProps {
  philosophy: Philosophy[];
  achievements: Achievements;
}

export const PhilosophySection = ({
  philosophy,
  achievements,
}: PhilosophySectionProps) => {
  const [hoveredPhilosophy, setHoveredPhilosophy] = useState<string | null>(
    null
  );

  const achievementItems = [
    {
      label: "Years of Experience",
      value: achievements.yearsExperience,
      suffix: "+",
      icon: TrendingUp,
      color: "#D4A574",
    },
    {
      label: "Students Taught",
      value: achievements.studentsTraught,
      suffix: "+",
      icon: Users,
      color: "#8B7355",
    },
    {
      label: "Creations Designed",
      value: achievements.creationsDesigned,
      suffix: "+",
      icon: Sparkles,
      color: "#A0826D",
    },
    {
      label: "Awards Won",
      value: achievements.awardsWon,
      suffix: "",
      icon: Award,
      color: "#C19A6B",
    },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 max-w-[95%] xl:max-w-[90%] mx-auto">
      {/* Philosophy Section */}
      <div className="mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#D4A57420] mb-4"
          >
            <Target className="w-8 h-8 text-[#D4A574]" />
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#451C15] mb-4 [font-family:var(--font-playfair)]">
            My Philosophy
          </h2>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Guiding principles that shape every creation and interaction
          </p>
        </motion.div>

        {/* Philosophy Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {philosophy.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                type: "spring",
                stiffness: 100,
              }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredPhilosophy(item.id)}
              onMouseLeave={() => setHoveredPhilosophy(null)}
            >
              <Card className="relative h-full p-6 bg-white/80 backdrop-blur-sm border-none shadow-lg hover:shadow-xl transition-all duration-300 group">
                {/* Icon */}
                <motion.div
                  className="text-4xl mb-4"
                  animate={{
                    scale: hoveredPhilosophy === item.id ? 1.2 : 1,
                    rotate: hoveredPhilosophy === item.id ? [0, -10, 10, 0] : 0,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  {item.icon}
                </motion.div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-[#451C15] mb-3 [font-family:var(--font-playfair)]">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.description}
                </p>

                {/* Hover Effect */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1 bg-[#D4A574]"
                  initial={{ scaleX: 0 }}
                  animate={{
                    scaleX: hoveredPhilosophy === item.id ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  style={{ transformOrigin: "left" }}
                />
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Achievements Section */}
      <div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#451C15] mb-4 [font-family:var(--font-playfair)]">
            Achievements & Impact
          </h2>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Numbers that tell a story of passion and dedication
          </p>
        </motion.div>

        {/* Achievement Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {achievementItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                type: "spring",
                stiffness: 150,
              }}
              viewport={{ once: true }}
            >
              <Card className="relative p-6 lg:p-8 bg-gradient-to-br from-white to-gray-50 border-none shadow-lg text-center group hover:shadow-2xl transition-all duration-300">
                {/* Background Pattern */}
                <div
                  className="absolute inset-0 opacity-5 rounded-lg"
                  style={{
                    backgroundImage: `radial-gradient(circle at 50% 50%, ${item.color} 0%, transparent 70%)`,
                  }}
                />

                {/* Icon */}
                <motion.div
                  className="relative z-10 inline-flex items-center justify-center w-14 h-14 rounded-full mb-4"
                  style={{
                    backgroundColor: `${item.color}20`,
                    border: `2px solid ${item.color}40`,
                  }}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                >
                  <item.icon
                    className="w-7 h-7"
                    style={{ color: item.color }}
                  />
                </motion.div>

                {/* Number Counter */}
                <motion.div
                  className="relative z-10 text-4xl lg:text-5xl font-bold mb-2"
                  style={{ color: item.color }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 2, delay: 0.5 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {item.value.toLocaleString()}
                    {item.suffix}
                  </motion.span>
                </motion.div>

                {/* Label */}
                <p className="relative z-10 text-gray-600 text-sm lg:text-base">
                  {item.label}
                </p>

                {/* Decorative Elements */}
                <motion.div
                  className="absolute -top-2 -right-2 w-8 h-8 rounded-full"
                  style={{ backgroundColor: `${item.color}20` }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.2,
                  }}
                />
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
