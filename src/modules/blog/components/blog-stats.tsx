"use client";

import React from "react";
import { motion } from "motion/react";
import { BookOpen, TrendingUp, Calendar, Coffee, Heart, Sparkles, Award, Users, Star, Clock } from "lucide-react";

interface BlogStatsProps {
  data: any;
}

const getIconComponent = (iconName: string) => {
  const icons: Record<string, React.ComponentType<{ className?: string }>> = {
    BookOpen,
    Coffee,
    TrendingUp,
    Calendar,
    Heart,
    Sparkles,
    Award,
    Users,
    Star,
    Clock,
  };
  return icons[iconName] || BookOpen;
};

export const BlogStats = ({ data }: BlogStatsProps) => {
  if (!data) return null;
  const stats = data.stats || [];

  return (
    <section className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-white to-[#FFF9F5]">
      <div className="relative z-10 max-w-[95%] xl:max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          {data.eyebrow && (
            <span className="inline-block text-sm lg:text-base text-[#451C15]/70 tracking-[0.3em] uppercase font-medium mb-4 [font-family:var(--font-inter)]">
              {data.eyebrow}
            </span>
          )}
          {data.title && (
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#451C15] [font-family:var(--font-playfair)]">
              {data.title}
            </h2>
          )}
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat: any, index: number) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{
                delay: index * 0.1,
                duration: 0.6,
                type: "spring",
                stiffness: 100,
              }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.8 }}
                  className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl mb-4"
                  style={{
                    backgroundColor: `${stat.color || '#D4A574'}20`,
                    color: stat.color || '#D4A574',
                  }}
                >
                  {stat.icon && (
                    <>{React.createElement(getIconComponent(stat.icon), { className: "w-6 h-6 sm:w-7 sm:h-7" })}</>
                  )}
                </motion.div>
                {stat.value && (
                  <div className="text-3xl sm:text-4xl font-light text-[#451C15] mb-2 [font-family:var(--font-playfair)]">
                    {stat.value}
                  </div>
                )}
                {stat.label && (
                  <div className="text-sm text-[#451C15]/60 [font-family:var(--font-inter)]">
                    {stat.label}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};