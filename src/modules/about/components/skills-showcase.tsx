// src/modules/about/components/skills-showcase.tsx
"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Star, Award, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Skill {
  id: string;
  name: string;
  level: number;
  category: string;
  description: string;
  certifications?: string[];
}

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  content: string;
  rating: number;
}

interface SkillsShowcaseProps {
  skills: Skill[];
  testimonials: Testimonial[];
}

export const SkillsShowcase = ({
  skills,
  testimonials,
}: SkillsShowcaseProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Get unique categories
  const categories = ["all", ...new Set(skills.map((skill) => skill.category))];

  // Filter skills by category
  const filteredSkills =
    selectedCategory === "all"
      ? skills
      : skills.filter((skill) => skill.category === selectedCategory);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 max-w-[95%] xl:max-w-[90%] mx-auto">
      {/* Skills Section */}
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
            <Award className="w-8 h-8 text-[#D4A574]" />
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#451C15] mb-4 [font-family:var(--font-playfair)]">
            Skills & Expertise
          </h2>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Mastery crafted through years of dedication and continuous learning
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                  selectedCategory === category
                    ? "bg-[#D4A574] text-white shadow-lg"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={skill.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.05,
                  layout: { duration: 0.4 },
                }}
              >
                <Card className="h-full p-6 bg-white border-none shadow-lg hover:shadow-xl transition-all duration-300">
                  {/* Skill Header */}
                  <div className="mb-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold text-[#451C15] [font-family:var(--font-playfair)]">
                        {skill.name}
                      </h3>
                      <span className="text-2xl font-bold text-[#D4A574]">
                        {skill.level}%
                      </span>
                    </div>
                    <span className="inline-block px-2 py-1 text-xs rounded-full bg-[#D4A57420] text-[#D4A574]">
                      {skill.category}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-[#D4A574] to-[#8B7355] rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: 0.2 }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4">
                    {skill.description}
                  </p>

                  {/* Certifications */}
                  {skill.certifications && skill.certifications.length > 0 && (
                    <div className="pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-2 mb-2">
                        <Award className="w-4 h-4 text-[#D4A574]" />
                        <span className="text-xs font-medium text-gray-500">
                          Certifications:
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {skill.certifications.map((cert, i) => (
                          <span
                            key={i}
                            className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded"
                          >
                            {cert}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Testimonials Section */}
      <div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#451C15] mb-4 [font-family:var(--font-playfair)]">
            What People Say
          </h2>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Testimonials from clients, students, and industry professionals
          </p>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <Card className="p-8 lg:p-12 bg-white border-none shadow-xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="text-center"
              >
                {/* Quote Icon */}
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-[#D4A57420] flex items-center justify-center">
                    <Quote className="w-8 h-8 text-[#D4A574]" />
                  </div>
                </div>

                {/* Rating */}
                <div className="flex justify-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "w-5 h-5",
                        i < testimonials[currentTestimonial].rating
                          ? "text-yellow-500 fill-yellow-500"
                          : "text-gray-300"
                      )}
                    />
                  ))}
                </div>

                {/* Content */}
                <blockquote className="text-lg lg:text-xl text-gray-700 mb-8 italic leading-relaxed max-w-3xl mx-auto">
                  &quot;{testimonials[currentTestimonial].content}&quot;
                </blockquote>

                {/* Author */}
                <div>
                  <p className="text-lg font-semibold text-[#451C15]">
                    {testimonials[currentTestimonial].name}
                  </p>
                  <p className="text-sm text-gray-600">
                    {testimonials[currentTestimonial].role}
                    {testimonials[currentTestimonial].company && (
                      <span>
                        {" "}
                        at {testimonials[currentTestimonial].company}
                      </span>
                    )}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8">
              <button
                onClick={prevTestimonial}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>

              {/* Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={cn(
                      "w-2 h-2 rounded-full transition-all duration-300",
                      currentTestimonial === index
                        ? "w-8 bg-[#D4A574]"
                        : "bg-gray-300 hover:bg-gray-400"
                    )}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextTestimonial}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
