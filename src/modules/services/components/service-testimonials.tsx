"use client";

import { motion } from "motion/react";
import { useState } from "react";
import Image from "next/image";
import { Star, Quote } from "lucide-react";
import type { Service } from "@/types/strapi";
import { getStrapiMediaUrl } from "@/lib/strapi";

interface ServiceTestimonialsProps {
  service: Service;
}

export const ServiceTestimonials = ({ service }: ServiceTestimonialsProps) => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  
  // Return null if no testimonials section data
  if (!service.testimonialsSection) {
    return null;
  }

  const { testimonialHeader, testimonials } = service.testimonialsSection;
  
  // Return null if no testimonials
  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        {testimonialHeader && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            {testimonialHeader.subtitle && (
              <span className="text-[#D4A574] text-xs font-medium tracking-[0.3em] uppercase mb-4 block [font-family:var(--font-inter)]">
                {testimonialHeader.subtitle}
              </span>
            )}
            {testimonialHeader.title && (
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-[#451C15] [font-family:var(--font-playfair)]">
                {testimonialHeader.title}
              </h2>
            )}
            
            {/* Decorative element */}
            <div className="flex items-center justify-center mt-8">
              <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#D4A574]/30" />
              <Quote className="w-4 h-4 text-[#D4A574]/40 mx-3" />
              <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#D4A574]/30" />
            </div>
          </motion.div>
        )}

        {/* Testimonials Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Main Testimonial Display */}
          <motion.div
            key={activeTestimonial}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-sm border border-[#D4A574]/10 p-8 sm:p-12"
          >
            {/* Quote Icon */}
            <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-[#D4A574]/20 to-[#D4A574]/10 rounded-full flex items-center justify-center">
              <Quote className="w-6 h-6 text-[#D4A574]" />
            </div>

            {/* Testimonial Content */}
            <div className="space-y-6">
              {/* Rating */}
              {testimonials[activeTestimonial].rating && (
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < testimonials[activeTestimonial].rating
                          ? "fill-[#D4A574] text-[#D4A574]"
                          : "text-[#D4A574]/20"
                      }`}
                    />
                  ))}
                </div>
              )}

              {/* Content - Handle richtext format */}
              <blockquote className="text-lg sm:text-xl text-[#451C15]/80 leading-relaxed [font-family:var(--font-inter)] font-light italic">
                &ldquo;{typeof testimonials[activeTestimonial].content === 'string' 
                  ? testimonials[activeTestimonial].content 
                  : testimonials[activeTestimonial].content}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4 pt-4 border-t border-[#D4A574]/10">
                {testimonials[activeTestimonial].image && (
                  <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-[#D4A574]/20">
                    <Image
                      src={getStrapiMediaUrl(testimonials[activeTestimonial].image) || ''}
                      alt={testimonials[activeTestimonial].name || 'Client'}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  <p className="font-medium text-[#451C15] [font-family:var(--font-playfair)]">
                    {testimonials[activeTestimonial].name}
                  </p>
                  {(testimonials[activeTestimonial].role || testimonials[activeTestimonial].company) && (
                    <p className="text-sm text-[#451C15]/60 [font-family:var(--font-inter)]">
                      {testimonials[activeTestimonial].role}
                      {testimonials[activeTestimonial].role && testimonials[activeTestimonial].company && ', '}
                      {testimonials[activeTestimonial].company}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Navigation Dots */}
          {testimonials.length > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`transition-all duration-300 ${
                    activeTestimonial === index
                      ? "w-8 h-2 bg-[#D4A574] rounded-full"
                      : "w-2 h-2 bg-[#D4A574]/30 rounded-full hover:bg-[#D4A574]/50"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          )}

          {/* All Testimonials Grid (for 3+ testimonials) */}
          {testimonials.length >= 3 && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
            >
              {testimonials.slice(0, 3).map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-[#FFF9F5] rounded-lg p-6 cursor-pointer hover:shadow-md transition-shadow duration-300"
                  onClick={() => setActiveTestimonial(index)}
                >
                  {/* Mini Rating */}
                  {testimonial.rating && (
                    <div className="flex gap-0.5 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < testimonial.rating
                              ? "fill-[#D4A574] text-[#D4A574]"
                              : "text-[#D4A574]/20"
                          }`}
                        />
                      ))}
                    </div>
                  )}
                  
                  {/* Mini Content */}
                  <p className="text-sm text-[#451C15]/70 line-clamp-3 mb-3 [font-family:var(--font-inter)]">
                    &ldquo;{typeof testimonial.content === 'string' 
                      ? testimonial.content 
                      : testimonial.content}&rdquo;
                  </p>
                  
                  {/* Mini Author */}
                  <p className="text-xs font-medium text-[#451C15] [font-family:var(--font-playfair)]">
                    — {testimonial.name}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};