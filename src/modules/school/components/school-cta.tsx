"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Star, Sparkles, GraduationCap, Award, Users, Clock } from "lucide-react";

// Mock data
const schoolContent = {
  comingSoonBadge: false,
  externalUrl: "https://chocolateacademy.com",
  ctaButtonText: "Start Your Journey",
  redirectMessage: "Transform your passion into expertise. Join our next cohort of chocolate artisans."
};

export const SchoolCTA: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitting(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setEmail("");
      setTimeout(() => setSubmitSuccess(false), 3000);
    }
  };

  const isComingSoon = schoolContent.comingSoonBadge;

  const stats = [
    { value: "500+", label: "Graduates", icon: GraduationCap, color: "#D4A574" },
    { value: "95%", label: "Job Placement", icon: Award, color: "#E8B4B8" },
    { value: "12", label: "Expert Chefs", icon: Star, color: "#A67B5B" },
    { value: "20+", label: "Courses", icon: Clock, color: "#F4A460" }
  ];

  const benefits = [
    {
      title: "Professional Certification",
      description: "Receive internationally recognized certification upon completion",
      icon: Award
    },
    {
      title: "Flexible Schedule",
      description: "Weekend and evening classes available to fit your lifestyle",
      icon: Clock
    },
    {
      title: "Career Support",
      description: "Lifetime access to our job placement and mentorship network",
      icon: Users
    }
  ];

  return (
    <section 
      id="school-cta"
      className="relative py-16 sm:py-20 lg:py-24 xl:py-32 overflow-hidden bg-gradient-to-b from-[#FFF9F5] to-[#FBFAF8]"
    >
      {/* Premium background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated gradient orbs */}
        <motion.div 
          className="absolute top-1/4 -left-48 w-96 h-96 bg-gradient-to-br from-amber-200/15 to-transparent rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 -right-48 w-[500px] h-[500px] bg-gradient-to-tl from-amber-100/15 to-transparent rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="px-4 sm:px-6 lg:px-8 max-w-[91.666667%] mx-auto relative z-10">
        {/* Main CTA Container */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative"
        >
          {/* Gradient border effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-200/30 via-amber-300/20 to-amber-400/10 rounded-[3rem] blur-xl" />
          
          <div className="relative bg-gradient-to-br from-[#451C15] to-[#5A2419] rounded-[36px] shadow-3xl overflow-hidden">
            {/* Inner gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-amber-600/10" />
            
            {/* Animated accent */}
            <motion.div
              className="absolute -top-32 -right-32 w-64 h-64 rounded-full"
              style={{ background: "radial-gradient(circle, #D4A57430 0%, transparent 70%)" }}
              animate={{ rotate: 360 }}
              transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            />

            <div className="relative p-10 sm:p-14 lg:p-20 xl:p-24">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-center mb-12 sm:mb-16"
              >
                {/* Icon */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
                  className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md mb-8 shadow-2xl"
                >
                  <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-amber-200" />
                </motion.div>

                {/* Headline */}
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extralight font-serif text-white mb-6 leading-[1.1] tracking-tight">
                  {isComingSoon 
                    ? "Be First to Know When Enrollment Opens"
                    : "Ready to Start Your"}
                  <span className="block italic font-thin text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-400 mt-2">
                    Chocolate Journey?
                  </span>
                </h2>

                {/* Subtext */}
                <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-white/60 max-w-3xl mx-auto leading-relaxed font-light">
                  {isComingSoon
                    ? "Join our exclusive waitlist to be the first to know when enrollment opens for our professional chocolate-making courses."
                    : schoolContent.redirectMessage || "Transform your passion into expertise. Join our next cohort of chocolate artisans."}
                </p>
              </motion.div>

              {/* Stats Grid */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12 sm:mb-16"
              >
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + index * 0.05, duration: 0.5 }}
                      whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                      className="relative group"
                    >
                      <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/10 hover:border-white/20 transition-all duration-300">
                        <Icon className="w-6 h-6 text-amber-300/60 mx-auto mb-3" />
                        <p className="text-3xl sm:text-4xl font-extralight text-transparent bg-clip-text bg-gradient-to-br from-white to-amber-200">
                          {stat.value}
                        </p>
                        <p className="text-xs sm:text-sm text-white/50 mt-2">{stat.label}</p>
                        {/* Glow effect on hover */}
                        <div 
                          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-xl"
                          style={{ background: `radial-gradient(circle, ${stat.color} 0%, transparent 70%)` }}
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* CTA Action */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="text-center"
              >
                {isComingSoon ? (
                  // Coming Soon - Email Signup
                  <div className="max-w-lg mx-auto">
                    <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="flex-1 px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white placeholder:text-white/40 focus:outline-none focus:border-amber-400/50 focus:bg-white/15 transition-all"
                        required
                      />
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-10 py-4 bg-gradient-to-r from-amber-400 to-amber-600 text-white rounded-full hover:from-amber-500 hover:to-amber-700 transition-all disabled:opacity-50 shadow-2xl hover:shadow-amber-400/30 font-medium"
                      >
                        {isSubmitting ? "..." : "Join Waitlist"}
                      </motion.button>
                    </form>
                    
                    {submitSuccess && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-green-400 text-sm text-center mt-6"
                      >
                        ✓ You&apos;re on the list! We&apos;ll notify you when enrollment opens.
                      </motion.p>
                    )}
                    
                    <p className="text-xs text-white/40 text-center mt-6">
                      No spam, ever. Unsubscribe at any time.
                    </p>
                  </div>
                ) : (
                  // Active - Direct CTA
                  <div>
                    <motion.a
                      href={schoolContent.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      className="inline-flex items-center gap-4 px-12 sm:px-16 py-5 sm:py-6 bg-gradient-to-r from-white to-amber-50 text-[#451C15] hover:from-amber-50 hover:to-white rounded-full transition-all group shadow-3xl hover:shadow-amber-200/40 text-lg sm:text-xl font-medium relative overflow-hidden"
                    >
                      {/* Button shimmer */}
                      <div className="absolute inset-0 -top-4 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                      
                      <span className="relative z-10">{schoolContent.ctaButtonText}</span>
                      <ArrowRight className="relative z-10 w-6 h-6 transition-transform group-hover:translate-x-2" />
                    </motion.a>
                    
                    <p className="text-sm sm:text-base text-amber-200/60 mt-8">
                      Next cohort starts in January 2025 • Limited spots available
                    </p>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-16 sm:mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10"
        >
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="group relative"
              >
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-amber-100/20 h-full">
                  {/* Icon */}
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-amber-100 to-amber-50 mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-amber-700" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-medium text-[#451C15] mb-3">{benefit.title}</h3>
                  <p className="text-sm text-[#451C15]/60 leading-relaxed">
                    {benefit.description}
                  </p>
                  
                  {/* Hover accent */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-amber-50/0 to-amber-100/0 group-hover:from-amber-50/20 group-hover:to-amber-100/30 transition-all duration-500 pointer-events-none" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};