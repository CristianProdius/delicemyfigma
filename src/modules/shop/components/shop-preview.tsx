"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Star, ChevronLeft, ChevronRight, Sparkles, Package, Shield, Truck, Gift, Quote, Heart, Award } from "lucide-react";
import Image from "next/image";

// Mock data
const shopContent = {
  externalUrl: "https://shop.chocolaterie.com",
  collections: [
    {
      id: "1",
      name: "Signature Collection",
      productCount: 24,
      image: "/collection-1.jpg",
      description: "Our most beloved creations",
      accentColor: "#D4A574",
      featured: true
    },
    {
      id: "2",
      name: "Limited Edition",
      productCount: 12,
      image: "/collection-2.jpg",
      description: "Exclusive seasonal offerings",
      accentColor: "#E8B4B8",
      badge: "New"
    },
    {
      id: "3",
      name: "Gift Sets",
      productCount: 18,
      image: "/collection-3.jpg",
      description: "Perfect for every occasion",
      accentColor: "#A67B5B"
    },
    {
      id: "4",
      name: "Single Origin",
      productCount: 16,
      image: "/collection-4.jpg",
      description: "Pure chocolate excellence",
      accentColor: "#F4A460"
    }
  ],
  premiumBenefits: [
    {
      icon: Gift,
      title: "Luxury Gift Wrapping",
      description: "Elegant wrapping with personalized messages for every occasion",
      color: "#D4A574",
      stat: "100% Recyclable"
    },
    {
      icon: Truck,
      title: "Express Worldwide Delivery",
      description: "Climate-controlled delivery worldwide within 48 hours",
      color: "#E8B4B8",
      stat: "150+ Countries"
    },
    {
      icon: Shield,
      title: "Purchase Protection",
      description: "Your purchase is protected with comprehensive insurance",
      color: "#A67B5B",
      stat: "Full Coverage"
    },
    {
      icon: Star,
      title: "VIP Rewards Program",
      description: "Exclusive rewards and early access to limited collections",
      color: "#F4A460",
      stat: "5% Cashback"
    }
  ]
};

export const ShopPreview: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const collections = shopContent.collections.slice(0, 4).map((col) => ({
    ...col,
    url: `${shopContent.externalUrl}/collections/${col.id}`,
  }));

  const testimonials = [
    {
      text: "The most exquisite chocolates I've ever tasted. Each piece tells a story of craftsmanship and passion.",
      author: "Sophie Laurent",
      rating: 5,
      product: "Midnight Truffle Collection",
      location: "Paris, France"
    },
    {
      text: "From the moment you open the box, you know you're experiencing something special. Pure luxury.",
      author: "Marcus Chen",
      rating: 5,
      product: "Rose Gold Pralines",
      location: "New York, USA"
    },
    {
      text: "Worth every penny. The quality is unmatched and the presentation is absolutely stunning.",
      author: "Isabella Romano",
      rating: 5,
      product: "Champagne Truffle Royale",
      location: "Milan, Italy"
    },
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 6000);
      return () => clearInterval(interval);
    }
  }, [testimonials.length, isPaused]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <div className="bg-gradient-to-b from-[#F9F7F4] via-[#FBFAF8] to-white">
      {/* Collections Section */}
      <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32 overflow-hidden">
        {/* Enhanced background effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            className="absolute top-1/4 -left-32 w-64 sm:w-80 lg:w-96 h-64 sm:h-80 lg:h-96 bg-gradient-to-br from-amber-200/10 to-transparent rounded-full blur-3xl"
            animate={{
              x: [0, 50, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute bottom-1/4 -right-32 w-80 sm:w-96 lg:w-[500px] h-80 sm:h-96 lg:h-[500px] bg-gradient-to-tl from-amber-100/10 to-transparent rounded-full blur-3xl"
            animate={{
              x: [-50, 0, -50],
              y: [0, 50, 0],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <div className="px-4 sm:px-6 lg:px-8 xl:px-12 max-w-[95%] sm:max-w-[91.666667%] mx-auto relative z-10">
          {/* Section Header with better responsive sizing */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-center mb-12 sm:mb-16 lg:mb-20"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
              className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-2xl bg-gradient-to-br from-amber-100/80 to-amber-50/50 mb-6 sm:mb-8 shadow-lg"
            >
              <Package className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-amber-700" />
            </motion.div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-extralight font-serif leading-[0.95] tracking-tight text-[#451C15] mb-4 sm:mb-6">
              Explore Our
              <span className="block sm:inline sm:ml-2 lg:ml-4 italic font-thin text-transparent bg-clip-text bg-gradient-to-r from-[#A67B5B] to-[#D4A574]">
                Collections
              </span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-[#451C15]/50 max-w-3xl mx-auto leading-relaxed font-extralight px-4 sm:px-0">
              Each collection is carefully curated to deliver an unforgettable experience
            </p>
          </motion.div>

          {/* Collections Grid - Enhanced responsive layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 xl:gap-12">
            {collections.map((collection, index) => (
              <motion.a
                key={collection.name}
                href={collection.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ 
                  delay: index * 0.1, 
                  duration: 0.6,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                whileHover={{ 
                  y: -12, 
                  scale: 1.02,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                className="group relative block"
              >
                <div className="relative overflow-hidden rounded-xl sm:rounded-2xl lg:rounded-3xl xl:rounded-[36px] shadow-2xl hover:shadow-3xl transition-all duration-500"
                  style={{
                    background: `linear-gradient(135deg, #451C15 0%, #5A2419 100%)`,
                  }}
                >
                  {/* Badge for special collections */}
                  {collection.badge && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                      className="absolute top-4 sm:top-6 left-4 sm:left-6 z-30"
                    >
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-400/20 to-amber-600/20 backdrop-blur-md text-amber-200 text-xs font-medium uppercase tracking-wider border border-amber-400/20 rounded-full">
                        <Sparkles className="w-3 h-3" />
                        {collection.badge}
                      </span>
                    </motion.div>
                  )}

                  {/* Featured star for signature collection */}
                  {collection.featured && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.4, duration: 0.5, type: "spring" }}
                      className="absolute top-4 sm:top-6 right-4 sm:right-6 z-30"
                    >
                      <div className="p-2 rounded-full bg-amber-400/20 backdrop-blur-sm">
                        <Star className="w-4 h-4 text-amber-200 fill-amber-200" />
                      </div>
                    </motion.div>
                  )}

                  {/* Gradient Overlay */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 z-10"
                    style={{
                      background: `linear-gradient(135deg, ${collection.accentColor}40 0%, transparent 40%, ${collection.accentColor}30 100%)`,
                    }}
                  />

                  {/* Collection Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={collection.image}
                      alt={collection.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      width={600}
                      height={450}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#451C15] via-[#451C15]/60 to-transparent" />
                  </div>
                  
                  {/* Content Overlay - Responsive padding */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-10 z-20">
                    <h3 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-extralight text-white mb-2">
                      {collection.name}
                    </h3>
                    <p className="text-xs sm:text-sm lg:text-base text-white/60 mb-1">
                      {collection.description}
                    </p>
                    <p className="text-xs sm:text-sm text-amber-200/60 mb-3 sm:mb-4">
                      {collection.productCount} Products
                    </p>
                    <div className="inline-flex items-center gap-2 text-amber-200 group-hover:text-amber-100 transition-colors">
                      <span className="text-sm sm:text-base font-light">View Collection</span>
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-2" />
                    </div>
                  </div>

                  {/* Corner Glow */}
                  <div
                    className="absolute -bottom-16 -right-16 w-24 sm:w-32 h-24 sm:h-32 opacity-20 group-hover:opacity-30 blur-2xl transition-all duration-700 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle, ${collection.accentColor} 0%, transparent 60%)`,
                    }}
                  />
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Benefits - Enhanced responsive grid */}
      <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32 overflow-hidden bg-gradient-to-b from-white to-[#FBFAF8]">
        <div className="px-4 sm:px-6 lg:px-8 xl:px-12 max-w-[95%] sm:max-w-[91.666667%] mx-auto relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extralight font-serif text-center text-[#451C15] mb-12 sm:mb-16 lg:mb-20"
          >
            The Boutique
            <span className="italic font-thin text-transparent bg-clip-text bg-gradient-to-r from-[#A67B5B] to-[#D4A574]"> Experience</span>
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
            {shopContent.premiumBenefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.05 }}
                  transition={{ 
                    delay: index * 0.1, 
                    duration: 0.5,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                  whileHover={{ 
                    y: -10,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                  className="group relative"
                >
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-amber-100/20 h-full relative overflow-hidden">
                    {/* Stat badge */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.3, duration: 0.4, type: "spring" }}
                      className="absolute top-4 right-4"
                    >
                      <span className="text-xs text-amber-600/60 font-medium">
                        {benefit.stat}
                      </span>
                    </motion.div>
                    
                    {/* Icon */}
                    <div 
                      className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-amber-100 to-amber-50 mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300"
                      style={{ boxShadow: `0 8px 20px ${benefit.color}20` }}
                    >
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-amber-700" />
                    </div>
                    
                    {/* Content */}
                    <h3 className="text-lg sm:text-xl font-medium text-[#451C15] mb-2 sm:mb-3">{benefit.title}</h3>
                    <p className="text-xs sm:text-sm text-[#451C15]/60 leading-relaxed">
                      {benefit.description}
                    </p>
                    
                    {/* Hover accent */}
                    <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-amber-50/0 to-amber-100/0 group-hover:from-amber-50/20 group-hover:to-amber-100/30 transition-all duration-500 pointer-events-none" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials - Enhanced with AnimatePresence */}
      <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32 overflow-hidden">
        <div className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extralight font-serif text-center text-[#451C15] mb-12 sm:mb-16 lg:mb-20"
          >
            Customer
            <span className="italic font-thin text-transparent bg-clip-text bg-gradient-to-r from-[#A67B5B] to-[#D4A574]"> Reviews</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="relative overflow-hidden rounded-xl sm:rounded-2xl lg:rounded-3xl xl:rounded-[36px] shadow-3xl"
              style={{
                background: `linear-gradient(135deg, #451C15 0%, #5A2419 100%)`,
              }}
            >
              {/* Animated gradient overlay */}
              <motion.div
                className="absolute inset-0 opacity-30"
                style={{
                  background: `linear-gradient(135deg, #D4A57440 0%, transparent 40%, #E8B4B830 100%)`,
                }}
                animate={{
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              <div className="relative z-10 p-8 sm:p-12 lg:p-16 xl:p-20">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentTestimonial}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    {/* Quote Icon */}
                    <Quote className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 text-amber-200/20 mx-auto mb-6 sm:mb-8" />
                    
                    {/* Rating */}
                    <div className="flex justify-center gap-1 mb-6 sm:mb-8">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.05, duration: 0.3 }}
                        >
                          <Star
                            className={`w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 ${
                              i < testimonials[currentTestimonial].rating
                                ? "text-amber-400 fill-amber-400"
                                : "text-white/20"
                            }`}
                          />
                        </motion.div>
                      ))}
                    </div>

                    {/* Text - Responsive sizing */}
                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-extralight text-white/90 text-center mb-8 sm:mb-10 italic leading-relaxed px-4 sm:px-0">
                      &quot;{testimonials[currentTestimonial].text}&quot;
                    </p>

                    {/* Author */}
                    <div className="text-center">
                      <p className="text-base sm:text-lg lg:text-xl font-medium text-white mb-1">
                        {testimonials[currentTestimonial].author}
                      </p>
                      <p className="text-xs sm:text-sm lg:text-base text-amber-200/60">
                        {testimonials[currentTestimonial].product}
                      </p>
                      <p className="text-xs sm:text-sm text-white/40 mt-1">
                        {testimonials[currentTestimonial].location}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Navigation - Hidden on mobile, visible on larger screens */}
            {testimonials.length > 1 && (
              <>
                <button
                  onClick={prevTestimonial}
                  className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 lg:-translate-x-14 w-10 h-10 lg:w-12 lg:h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-xl items-center justify-center text-[#451C15] hover:bg-white transition-all"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6" />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 lg:translate-x-14 w-10 h-10 lg:w-12 lg:h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-xl items-center justify-center text-[#451C15] hover:bg-white transition-all"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6" />
                </button>
              </>
            )}

            {/* Dots - Enhanced with better spacing */}
            <div className="flex justify-center gap-2 mt-6 sm:mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`transition-all duration-300 ${
                    currentTestimonial === index
                      ? "w-8 h-2 bg-gradient-to-r from-[#451C15] to-[#5A2419] rounded-full"
                      : "w-2 h-2 bg-amber-200/30 rounded-full hover:bg-amber-200/50"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>

          {/* Trust indicators below testimonials */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8 mt-12 sm:mt-16 text-xs sm:text-sm text-[#451C15]/50"
          >
            <span className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              50,000+ Happy Customers
            </span>
            <span className="hidden sm:block">•</span>
            <span className="flex items-center gap-2">
              <Award className="w-4 h-4" />
              4.9/5 Average Rating
            </span>
            <span className="hidden sm:block">•</span>
            <span className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Verified Reviews
            </span>
          </motion.div>
        </div>
      </section>
    </div>
  );
};