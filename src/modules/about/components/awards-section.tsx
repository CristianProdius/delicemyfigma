// src/modules/about/components/awards-section.tsx
"use client";

import { motion } from "motion/react";
import {
  Trophy,
  Medal,
  Award,
  Star,
  Calendar,
  ExternalLink,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface AwardItem {
  id: string;
  title: string;
  year: string;
  organization: string;
  description: string;
}

interface AwardsSectionProps {
  awards: AwardItem[];
}

export const AwardsSection = ({ awards }: AwardsSectionProps) => {
  const [hoveredAward, setHoveredAward] = useState<string | null>(null);

  const getAwardIcon = (index: number) => {
    const icons = [Trophy, Medal, Award, Star];
    const IconComponent = icons[index % icons.length];
    return IconComponent;
  };

  const getAwardColor = (index: number) => {
    const colors = ["#FFD700", "#C0C0C0", "#CD7F32", "#E5E4E2"];
    return colors[index % colors.length];
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
          className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#FFD70020] mb-4"
        >
          <Trophy className="w-8 h-8 text-[#FFD700]" />
        </motion.div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#451C15] mb-4 [font-family:var(--font-playfair)]">
          Awards & Recognition
        </h2>

        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Honored for excellence in craftsmanship and innovation
        </p>
      </motion.div>

      {/* Awards Timeline */}
      <div className="relative">
        {/* Central Line (Desktop) */}
        <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-transparent via-[#FFD700]/30 to-transparent" />

        {/* Awards List */}
        <div className="space-y-12 lg:space-y-16">
          {awards.map((award, index) => {
            const IconComponent = getAwardIcon(index);
            const awardColor = getAwardColor(index);
            const isLeft = index % 2 === 0;

            return (
              <motion.div
                key={award.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                className={cn(
                  "relative lg:grid lg:grid-cols-2 lg:gap-8",
                  isLeft ? "" : ""
                )}
                onMouseEnter={() => setHoveredAward(award.id)}
                onMouseLeave={() => setHoveredAward(null)}
              >
                {/* Award Card */}
                <motion.div
                  className={cn(
                    "relative",
                    isLeft ? "lg:pr-8" : "lg:col-start-2 lg:pl-8"
                  )}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="relative p-6 sm:p-8 bg-white border-none shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                    {/* Background Pattern */}
                    <motion.div
                      className="absolute inset-0 opacity-5"
                      style={{
                        backgroundImage: `radial-gradient(circle at ${
                          isLeft ? "0% 50%" : "100% 50%"
                        }, ${awardColor} 0%, transparent 50%)`,
                      }}
                      animate={{
                        scale: hoveredAward === award.id ? 1.5 : 1,
                      }}
                      transition={{ duration: 0.5 }}
                    />

                    {/* Award Icon */}
                    <motion.div
                      className="relative z-10 inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
                      style={{
                        backgroundColor: `${awardColor}20`,
                        border: `2px solid ${awardColor}40`,
                      }}
                      animate={{
                        rotate: hoveredAward === award.id ? [0, -10, 10, 0] : 0,
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <IconComponent
                        className="w-8 h-8"
                        style={{ color: awardColor }}
                      />
                    </motion.div>

                    {/* Year Badge */}
                    <div className="absolute top-6 right-6 flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100">
                      <Calendar className="w-4 h-4 text-gray-600" />
                      <span className="text-sm font-medium text-gray-600">
                        {award.year}
                      </span>
                    </div>

                    {/* Award Title */}
                    <h3 className="relative z-10 text-2xl font-semibold text-[#451C15] mb-2 [font-family:var(--font-playfair)]">
                      {award.title}
                    </h3>

                    {/* Organization */}
                    <p className="relative z-10 text-lg text-[#D2691E] font-medium mb-3">
                      {award.organization}
                    </p>

                    {/* Description */}
                    <p className="relative z-10 text-gray-600 leading-relaxed">
                      {award.description}
                    </p>

                    {/* Hover Effect - Bottom Line */}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-1"
                      style={{
                        backgroundColor: awardColor,
                        transformOrigin: isLeft ? "left" : "right",
                      }}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: hoveredAward === award.id ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Decorative Stars */}
                    <motion.div
                      className="absolute top-12 right-12"
                      animate={{
                        scale: hoveredAward === award.id ? [1, 1.2, 1] : 1,
                        opacity: hoveredAward === award.id ? 1 : 0.3,
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <Star className="w-4 h-4" style={{ color: awardColor }} />
                    </motion.div>
                  </Card>
                </motion.div>

                {/* Timeline Node (Desktop) */}
                <div className="hidden lg:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <motion.div
                    className="relative"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.1 + 0.2,
                      type: "spring",
                      stiffness: 200,
                    }}
                    viewport={{ once: true }}
                  >
                    {/* Outer Ring */}
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{ backgroundColor: `${awardColor}30` }}
                      animate={{
                        scale: hoveredAward === award.id ? 1.8 : 1.3,
                        opacity: hoveredAward === award.id ? 0.5 : 0.3,
                      }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Middle Ring */}
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{ backgroundColor: `${awardColor}50` }}
                      animate={{
                        scale: hoveredAward === award.id ? 1.4 : 1,
                      }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Inner Dot */}
                    <div
                      className="relative w-8 h-8 rounded-full border-4 border-white shadow-lg z-10 flex items-center justify-center"
                      style={{ backgroundColor: awardColor }}
                    >
                      <IconComponent className="w-4 h-4 text-white" />
                    </div>

                    {/* Pulse Animation */}
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{ backgroundColor: awardColor }}
                      animate={{
                        scale: [1, 2, 1],
                        opacity: [0.5, 0, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.5,
                      }}
                    />
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Awards Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        viewport={{ once: true }}
        className="mt-16 text-center"
      >
        <div className="inline-flex items-center justify-center gap-8 p-6 bg-gradient-to-r from-[#FFD70010] via-[#C0C0C010] to-[#CD7F3210] rounded-2xl">
          {/* Total Awards */}
          <div className="text-center">
            <motion.div
              className="text-4xl font-bold text-[#FFD700] mb-1"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
              viewport={{ once: true }}
            >
              {awards.length}
            </motion.div>
            <p className="text-sm text-gray-600">Total Awards</p>
          </div>

          {/* Years of Excellence */}
          <div className="w-px h-12 bg-gray-300" />

          <div className="text-center">
            <motion.div
              className="text-4xl font-bold text-[#C0C0C0] mb-1"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1, type: "spring" }}
              viewport={{ once: true }}
            >
              {new Set(awards.map((a) => a.year)).size}
            </motion.div>
            <p className="text-sm text-gray-600">Award-Winning Years</p>
          </div>

          {/* Recognition */}
          <div className="w-px h-12 bg-gray-300" />

          <div className="text-center">
            <motion.div
              className="text-4xl font-bold text-[#CD7F32] mb-1"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
              viewport={{ once: true }}
            >
              100%
            </motion.div>
            <p className="text-sm text-gray-600">Commitment to Quality</p>
          </div>
        </div>
      </motion.div>

      {/* Decorative Elements */}
      <div className="flex justify-center mt-8">
        <motion.div
          className="flex items-center gap-2"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {[...Array(3)].map((_, i) => (
            <Star
              key={i}
              className="w-4 h-4 text-[#FFD700]"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};
