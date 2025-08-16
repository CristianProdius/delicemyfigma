// src/modules/about/components/journey-timeline.tsx
"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Calendar, Award, ChevronRight, Star, Sparkles } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  description: string;
  achievement?: string;
  image?: string;
}

interface JourneyTimelineProps {
  events: TimelineEvent[];
  accentColor?: string;
}

export const JourneyTimeline = ({
  events,
  accentColor = "#D4A574",
}: JourneyTimelineProps) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

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
          className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
          style={{ backgroundColor: `${accentColor}20` }}
        >
          <Sparkles className="w-8 h-8" style={{ color: accentColor }} />
        </motion.div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#451C15] mb-4 [font-family:var(--font-playfair)]">
          My Chocolate Journey
        </h2>

        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          From humble beginnings to international recognition, every milestone
          has shaped my passion for creating extraordinary chocolate
          experiences.
        </p>
      </motion.div>

      {/* Timeline Container */}
      <div className="relative">
        {/* Vertical Line (Desktop) */}
        <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-transparent via-gray-300 to-transparent" />

        {/* Timeline Events */}
        <div className="space-y-12 lg:space-y-20">
          {events.map((event, index) => {
            const isLeft = index % 2 === 0;
            const isExpanded = expandedId === event.id;
            const isHovered = hoveredId === event.id;

            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                className={cn(
                  "relative lg:grid lg:grid-cols-2 lg:gap-8",
                  isLeft ? "" : ""
                )}
              >
                {/* Content Card */}
                <motion.div
                  className={cn(
                    "relative",
                    isLeft ? "lg:pr-8 lg:text-right" : "lg:col-start-2 lg:pl-8"
                  )}
                  onMouseEnter={() => setHoveredId(event.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <motion.div
                    className={cn(
                      "bg-white rounded-2xl shadow-lg p-6 sm:p-8 cursor-pointer transition-all duration-300",
                      isHovered ? "shadow-2xl" : ""
                    )}
                    onClick={() => setExpandedId(isExpanded ? null : event.id)}
                    style={{
                      borderTop: `4px solid ${accentColor}`,
                    }}
                    whileHover={{ y: -5 }}
                  >
                    {/* Year Badge */}
                    <motion.div
                      className={cn(
                        "inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mb-4",
                        isLeft ? "lg:ml-auto" : ""
                      )}
                      style={{
                        backgroundColor: `${accentColor}15`,
                        color: accentColor,
                      }}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                      viewport={{ once: true }}
                    >
                      <Calendar className="w-4 h-4" />
                      {event.year}
                    </motion.div>

                    {/* Title */}
                    <h3 className="text-2xl font-semibold text-[#451C15] mb-3 [font-family:var(--font-playfair)]">
                      {event.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {event.description}
                    </p>

                    {/* Achievement Badge */}
                    {event.achievement && (
                      <motion.div
                        initial={{ opacity: 0, x: isLeft ? 20 : -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                        viewport={{ once: true }}
                        className={cn(
                          "inline-flex items-center gap-2 text-sm font-medium",
                          isLeft ? "lg:justify-end" : ""
                        )}
                      >
                        <Award
                          className="w-5 h-5"
                          style={{ color: accentColor }}
                        />
                        <span style={{ color: accentColor }}>
                          {event.achievement}
                        </span>
                      </motion.div>
                    )}

                    {/* Expand Indicator */}
                    {event.image && (
                      <motion.div
                        className={cn(
                          "flex items-center gap-2 mt-4 text-sm text-gray-500",
                          isLeft ? "lg:justify-end" : ""
                        )}
                        animate={{ x: isHovered ? 5 : 0 }}
                      >
                        <span>
                          {isExpanded ? "Click to close" : "Click to view more"}
                        </span>
                        <ChevronRight
                          className={cn(
                            "w-4 h-4 transition-transform duration-300",
                            isExpanded ? "rotate-90" : ""
                          )}
                        />
                      </motion.div>
                    )}

                    {/* Expanded Content */}
                    <AnimatePresence>
                      {isExpanded && event.image && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-6 pt-6 border-t border-gray-200">
                            <div className="relative h-48 sm:h-64 rounded-lg overflow-hidden">
                              <Image
                                src={event.image}
                                alt={event.title}
                                fill
                                className="object-cover"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>

                {/* Center Node */}
                <div className="hidden lg:flex absolute left-1/2 top-12 transform -translate-x-1/2 -translate-y-1/2">
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
                      style={{ backgroundColor: `${accentColor}20` }}
                      animate={{
                        scale: isHovered ? 1.5 : 1,
                        opacity: isHovered ? 0.5 : 1,
                      }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Inner Dot */}
                    <div
                      className="relative w-6 h-6 rounded-full border-4 border-white shadow-lg z-10"
                      style={{ backgroundColor: accentColor }}
                    >
                      {/* Pulse Animation */}
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        style={{ backgroundColor: accentColor }}
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.5, 0, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    </div>

                    {/* Achievement Star */}
                    {event.achievement && (
                      <motion.div
                        className="absolute -top-2 -right-2"
                        initial={{ rotate: 0 }}
                        animate={{ rotate: isHovered ? 360 : 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      </motion.div>
                    )}
                  </motion.div>
                </div>

                {/* Mobile Line Connector */}
                <div className="lg:hidden absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-gray-300 to-transparent" />

                {/* Mobile Node */}
                <div className="lg:hidden absolute left-8 top-8 transform -translate-x-1/2">
                  <div
                    className="w-4 h-4 rounded-full border-2 border-white shadow-md"
                    style={{ backgroundColor: accentColor }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* End Marker */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex justify-center mt-12"
        >
          <div className="relative">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${accentColor}20` }}
            >
              <Sparkles className="w-6 h-6" style={{ color: accentColor }} />
            </div>
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ backgroundColor: `${accentColor}20` }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
