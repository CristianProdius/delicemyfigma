// src/modules/about/components/company-story.tsx
"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useState, useRef } from "react";
import Image from "next/image";
import { BookOpen, ChevronRight, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

interface Chapter {
  id: string;
  title: string;
  year: string;
  content: string;
  image: string;
}

interface CompanyStoryProps {
  chapters: Chapter[];
}

export const CompanyStory = ({ chapters }: CompanyStoryProps) => {
  const [activeChapter, setActiveChapter] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={containerRef}
      className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 max-w-[95%] xl:max-w-[90%] mx-auto"
    >
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
          className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#D2691E20] mb-4"
        >
          <BookOpen className="w-8 h-8 text-[#D2691E]" />
        </motion.div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#451C15] mb-4 [font-family:var(--font-playfair)]">
          Our Story
        </h2>

        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          A journey of passion, craftsmanship, and the pursuit of chocolate
          perfection
        </p>
      </motion.div>

      {/* Story Progress Bar */}
      <div className="mb-12">
        <div className="relative h-1 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#D2691E] to-[#8B4513] rounded-full"
            style={{ width: progressWidth }}
          />
        </div>
      </div>

      {/* Chapters Navigation */}
      <div className="mb-12">
        <div className="flex flex-wrap justify-center gap-4">
          {chapters.map((chapter, index) => (
            <motion.button
              key={chapter.id}
              onClick={() => setActiveChapter(index)}
              className={cn(
                "group relative px-6 py-3 rounded-full transition-all duration-300",
                activeChapter === index
                  ? "bg-[#D2691E] text-white shadow-lg"
                  : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span className="font-medium">{chapter.year}</span>
                <ChevronRight
                  className={cn(
                    "w-4 h-4 transition-transform",
                    activeChapter === index ? "translate-x-1" : ""
                  )}
                />
              </div>

              {/* Active Indicator */}
              {activeChapter === index && (
                <motion.div
                  layoutId="activeChapter"
                  className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-[#D2691E] rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Chapter Content */}
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Text Content */}
        <motion.div
          key={`content-${activeChapter}`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className={cn(activeChapter % 2 === 0 ? "" : "lg:order-2")}
        >
          {/* Chapter Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6"
          >
            <span className="inline-block px-3 py-1 text-sm font-medium text-[#D2691E] bg-[#D2691E20] rounded-full mb-4">
              Chapter {activeChapter + 1}
            </span>
            <h3 className="text-3xl sm:text-4xl font-light text-[#451C15] mb-2 [font-family:var(--font-playfair)]">
              {chapters[activeChapter].title}
            </h3>
            <div className="flex items-center gap-2 text-gray-500">
              <Calendar className="w-4 h-4" />
              <span>{chapters[activeChapter].year}</span>
            </div>
          </motion.div>

          {/* Chapter Content */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-600 text-lg leading-relaxed mb-6"
          >
            {chapters[activeChapter].content}
          </motion.p>

          {/* Chapter Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-3"
          >
            {["Innovation", "Growth", "Excellence"].map((highlight, index) => (
              <div key={highlight} className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#D2691E]" />
                <span className="text-gray-600">
                  {highlight} defines this period
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Image */}
        <motion.div
          key={`image-${activeChapter}`}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className={cn(
            "relative",
            activeChapter % 2 === 0 ? "" : "lg:order-1"
          )}
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            {/* Decorative Frame */}
            <div className="absolute inset-4 border-2 border-white/30 rounded-xl z-10 pointer-events-none" />

            {/* Image Container */}
            <div className="relative aspect-[16/10]">
              <Image
                src={chapters[activeChapter].image}
                alt={chapters[activeChapter].title}
                fill
                className="object-cover"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>

            {/* Year Badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3, type: "spring" }}
              className="absolute top-6 left-6 z-20"
            >
              <div className="bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
                <span className="text-[#D2691E] font-bold text-lg">
                  {chapters[activeChapter].year}
                </span>
              </div>
            </motion.div>
          </div>

          {/* Decorative Elements */}
          <motion.div
            className="absolute -top-4 -right-4 w-24 h-24 rounded-full"
            style={{ backgroundColor: "#D2691E20" }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute -bottom-4 -left-4 w-32 h-32 rounded-full"
            style={{ backgroundColor: "#8B451320" }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.25, 0.4, 0.25],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
        </motion.div>
      </div>

      {/* Timeline Dots */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        viewport={{ once: true }}
        className="flex justify-center items-center gap-2 mt-12"
      >
        {chapters.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveChapter(index)}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              activeChapter === index
                ? "w-8 bg-[#D2691E]"
                : "bg-gray-300 hover:bg-gray-400"
            )}
            aria-label={`Go to chapter ${index + 1}`}
          />
        ))}
      </motion.div>
    </section>
  );
};
