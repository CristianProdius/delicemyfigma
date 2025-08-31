"use client";
import React from "react";
import { motion } from "motion/react";
import { Star, Quote, Sparkles, Award } from "lucide-react";

// Mock testimonials data
const testimonials = [
  {
    id: "1",
    name: "Sarah Mitchell",
    role: "Head Chocolatier",
    company: "Le Chocolat Royale",
    content: "The Bean to Bar Mastery course transformed my understanding of chocolate. The instructors' expertise and hands-on approach gave me the confidence to launch my own luxury chocolate line.",
    rating: 5,
    featured: true,
    image: "/testimonial-1.jpg",
    accentColor: "#D4A574"
  },
  {
    id: "2",
    name: "Marcus Chen",
    role: "Executive Pastry Chef",
    company: "Four Seasons Hotel",
    content: "Outstanding curriculum and world-class facilities. The techniques I learned here elevated my dessert menu to new heights. My guests consistently rave about our chocolate creations.",
    rating: 5,
    accentColor: "#E8B4B8"
  },
  {
    id: "3",
    name: "Isabella Rodriguez",
    role: "Chocolate Entrepreneur",
    company: "Bella's Artisan Chocolates",
    content: "From hobbyist to business owner in 12 weeks. The comprehensive training and business guidance helped me turn my passion into a thriving artisan chocolate company.",
    rating: 5,
    accentColor: "#A67B5B"
  }
];

export const SchoolTestimonials: React.FC = () => {
  const displayTestimonials = testimonials?.slice(0, 3) || [];
  
  if (!displayTestimonials.length) {
    return null;
  }

  const featuredTestimonial = displayTestimonials.find(t => t.featured) || displayTestimonials[0];
  const regularTestimonials = displayTestimonials.filter(t => t.id !== featuredTestimonial.id);

  return (
    <section className="relative py-16 sm:py-20 lg:py-24 xl:py-32 overflow-hidden bg-gradient-to-b from-[#F9F7F4] via-[#FBFAF8] to-[#FFF9F5]">
      {/* Premium background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated gradient orbs */}
        <motion.div 
          className="absolute top-1/3 -right-32 w-96 h-96 bg-gradient-to-br from-amber-200/10 to-transparent rounded-full blur-3xl"
          animate={{
            x: [-50, 0, -50],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/3 -left-32 w-80 h-80 bg-gradient-to-tl from-amber-100/10 to-transparent rounded-full blur-3xl"
          animate={{
            x: [50, 0, 50],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="px-4 sm:px-6 lg:px-8 max-w-[91.666667%] mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16 sm:mb-20 lg:mb-24"
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
            className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-amber-100/80 to-amber-50/50 mb-8 shadow-lg"
          >
            <Quote className="w-7 h-7 sm:w-8 sm:h-8 text-amber-700" />
          </motion.div>

          {/* Title */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extralight font-serif leading-[0.95] tracking-tight text-[#451C15] mb-6">
            Student
            <span className="block sm:inline sm:ml-4 italic font-thin text-transparent bg-clip-text bg-gradient-to-r from-[#A67B5B] to-[#D4A574]">
              Success Stories
            </span>
          </h2>
          
          <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-[#451C15]/50 max-w-3xl mx-auto leading-relaxed font-extralight">
            Join hundreds of successful graduates who have transformed their passion into expertise
          </p>
        </motion.div>

        {/* Featured Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-12 lg:mb-16"
        >
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl lg:rounded-[36px] shadow-3xl bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm border border-amber-100/20">
            {/* Decorative gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-50/20 via-transparent to-amber-100/10" />
            
            {/* Floating accent */}
            <motion.div
              className="absolute -top-20 -right-20 w-40 h-40 rounded-full"
              style={{ background: `radial-gradient(circle, ${featuredTestimonial.accentColor}20 0%, transparent 70%)` }}
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="relative p-10 sm:p-14 lg:p-16 xl:p-20">
              {/* Featured Badge */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="inline-flex items-center gap-2 mb-8"
              >
                <Award className="w-5 h-5 text-amber-600" />
                <span className="text-xs sm:text-sm font-medium text-amber-600 uppercase tracking-wider">Featured Success Story</span>
              </motion.div>

              {/* Large Quote */}
              <Quote className="w-12 h-12 sm:w-16 sm:h-16 text-amber-200/50 mb-6" />
              
              {/* Content */}
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-extralight text-[#451C15] leading-relaxed mb-10"
              >
                {featuredTestimonial.content}
              </motion.p>

              {/* Rating */}
              <div className="flex gap-1 mb-8">
                {[...Array(featuredTestimonial.rating)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.05, duration: 0.3 }}
                  >
                    <Star className="w-5 h-5 sm:w-6 sm:h-6 fill-amber-400 text-amber-400" />
                  </motion.div>
                ))}
              </div>

              {/* Author */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="flex items-center gap-6"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-amber-100 to-amber-50 flex items-center justify-center">
                  <span className="text-2xl sm:text-3xl font-light text-amber-700">
                    {featuredTestimonial.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="text-lg sm:text-xl font-medium text-[#451C15]">{featuredTestimonial.name}</p>
                  <p className="text-sm sm:text-base text-[#451C15]/60">{featuredTestimonial.role}</p>
                  {featuredTestimonial.company && (
                    <p className="text-sm sm:text-base text-amber-600">{featuredTestimonial.company}</p>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Regular Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12">
          {regularTestimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ 
                delay: index * 0.1, 
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              className="group relative"
            >
              <div
                className="relative h-full overflow-hidden rounded-2xl sm:rounded-3xl lg:rounded-[36px] shadow-2xl hover:shadow-3xl transition-all duration-500"
                style={{
                  background: `linear-gradient(135deg, #451C15 0%, #5A2419 100%)`,
                }}
              >
                {/* Gradient Overlay */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700"
                  style={{
                    background: `linear-gradient(135deg, ${testimonial.accentColor}40 0%, transparent 40%, ${testimonial.accentColor}30 100%)`,
                  }}
                />

                {/* Corner Glow */}
                <motion.div 
                  className="absolute -top-32 -right-32 w-64 h-64 rounded-full opacity-0 group-hover:opacity-30 transition-all duration-1000 blur-3xl"
                  style={{ 
                    background: `radial-gradient(circle, ${testimonial.accentColor} 0%, transparent 60%)` 
                  }}
                />

                {/* Content */}
                <div className="relative z-20 p-8 sm:p-10 lg:p-12 h-full flex flex-col">
                  {/* Quote Icon */}
                  <Quote className="w-8 h-8 text-white/20 mb-6" />
                  
                  {/* Testimonial Text */}
                  <motion.p
                    className="text-base sm:text-lg lg:text-xl text-white/80 leading-relaxed font-light mb-8 flex-grow italic"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 0.6 }}
                  >
                    "{testimonial.content}"
                  </motion.p>

                  {/* Rating */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400/80 text-amber-400/80" />
                    ))}
                  </div>

                  {/* Divider */}
                  <div className="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />

                  {/* Author */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.4, duration: 0.5 }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm flex items-center justify-center">
                      <span className="text-base font-light text-white/70">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-white">{testimonial.name}</p>
                      <p className="text-sm text-white/60">{testimonial.role}</p>
                      {testimonial.company && (
                        <p className="text-sm text-amber-300/70">{testimonial.company}</p>
                      )}
                    </div>
                  </motion.div>
                </div>

                {/* Bottom Corner Accent */}
                <div
                  className="absolute -bottom-16 -left-16 w-32 h-32 opacity-20 group-hover:opacity-30 blur-2xl transition-all duration-700 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle, ${testimonial.accentColor} 0%, transparent 60%)`,
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};