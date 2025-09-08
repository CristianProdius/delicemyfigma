"use client";

import React from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { Star, Quote } from "lucide-react";
import type { TestimonialsSection } from "@/types/strapi";
import { getStrapiMediaUrl } from "@/lib/strapi";

interface TestimonialsProps {
  testimonialsSection?: TestimonialsSection;
}

// Star rating component
const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < rating
              ? "fill-amber-400 text-amber-400"
              : "fill-gray-200 text-gray-200"
          }`}
        />
      ))}
    </div>
  );
};

export const Testimonials: React.FC<TestimonialsProps> = ({ testimonialsSection }) => {
  // Don't render if no testimonials section data
  if (!testimonialsSection || !testimonialsSection.testimonials?.length) {
    return null;
  }

  const { sectionTitle = "What Our Clients Say", testimonials } = testimonialsSection;

  return (
    <section className="relative w-full py-20 sm:py-24 lg:py-32 overflow-hidden bg-gradient-to-b from-white via-amber-50/20 to-white">
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
        }}
      />


      
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16 sm:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-amber-900 [font-family:var(--font-playfair)] mb-4">
            {sectionTitle}
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto"></div>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => {
            const clientImageUrl = getStrapiMediaUrl(testimonial.image);
            
            return (
              <motion.div
                key={`${testimonial.name}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-amber-100/50 hover:border-amber-200/70 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/10 overflow-hidden p-6 sm:p-8 h-full flex flex-col">
                  {/* Quote decoration */}
                  <div className="absolute top-6 right-6 opacity-20">
                    <Quote className="w-8 h-8 text-amber-600" />
                  </div>

                  {/* Rating */}
                  <div className="mb-4">
                    <StarRating rating={testimonial.rating} />
                  </div>

                  {/* Testimonial content */}
                  <div className="flex-1 mb-6">
                    <div
                      className="text-amber-800/80 leading-relaxed [font-family:var(--font-inter)] prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ __html: testimonial.content }}
                    />
                  </div>

                  {/* Client info */}
                  <div className="flex items-center gap-4">
                    {clientImageUrl && (
                      <div className="relative w-12 h-12 rounded-full overflow-hidden bg-amber-100">
                        <Image
                          src={clientImageUrl}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    
                    <div className="flex-1">
                      <h4 className="font-medium text-amber-900 [font-family:var(--font-inter)]">
                        {testimonial.name}
                      </h4>
                      {(testimonial.role || testimonial.company) && (
                        <p className="text-sm text-amber-700/60 [font-family:var(--font-inter)]">
                          {testimonial.role}
                          {testimonial.role && testimonial.company && ", "}
                          {testimonial.company}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-white/0 via-transparent to-amber-50/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom decorative element */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex justify-center mt-16 sm:mt-20"
        >
          <div className="flex items-center gap-2 text-amber-600/40">
            <div className="w-2 h-2 rounded-full bg-amber-400/30"></div>
            <div className="w-3 h-3 rounded-full bg-amber-400/50"></div>
            <Quote className="w-4 h-4" />
            <div className="w-3 h-3 rounded-full bg-amber-400/50"></div>
            <div className="w-2 h-2 rounded-full bg-amber-400/30"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};