// src/modules/blog/components/blog-newsletter.tsx
"use client";

import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import {
  Mail,
  Send,
  CheckCircle,
  Sparkles,
  Coffee,
  Heart,
  BookOpen,
  Star,
  
  Gift,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export const BlogNewsletter = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax effects
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  const handleSubmit = async () => {
    if (!email || isSubmitting) return;

    setIsSubmitting(true);

    try {
      // Simulate API call - replace with actual newsletter API
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setIsSubscribed(true);

      // Reset after success message
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail("");
      }, 5000);
    } catch (error) {
      console.error("Newsletter submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = [
    { icon: Coffee, text: "Weekly chocolate recipes" },
    { icon: Heart, text: "Exclusive tips & tricks" },
    { icon: Gift, text: "Special offers" },
    { icon: Star, text: "Early access to content" },
  ];

  return (
    <section
      ref={containerRef}
      className="relative py-20 sm:py-24 lg:py-32 overflow-hidden bg-gradient-to-br from-[#451C15] via-[#5A241C] to-[#451C15]"
    >
      {/* Animated background pattern */}
      <motion.div style={{ y, opacity }} className="absolute inset-0">
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

        {/* Decorative circles */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-amber-400/5 blur-3xl" />

        {/* Pattern overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(255,255,255,0.05) 40px, rgba(255,255,255,0.05) 80px),
              repeating-linear-gradient(-45deg, transparent, transparent 40px, rgba(255,255,255,0.05) 40px, rgba(255,255,255,0.05) 80px)
            `,
          }}
        />
      </motion.div>



      {/* Content */}
      <div className="relative z-10 max-w-[95%] xl:max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{
                delay: 0.2,
                type: "spring",
                stiffness: 200,
              }}
              viewport={{ once: true }}
              className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl mb-6"
            >
              <Mail className="w-8 h-8 text-white" />
            </motion.div>

            {/* Title */}
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white mb-4 [font-family:var(--font-playfair)]">
              Sweet Updates, Delivered
            </h2>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto [font-family:var(--font-inter)]">
              Join our chocolate-loving community and get exclusive recipes,
              behind-the-scenes stories, and early access to new articles
              delivered straight to your inbox.
            </p>
          </motion.div>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.text}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 0.4 + index * 0.1,
                  type: "spring",
                  stiffness: 100,
                }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center mb-3">
                  <benefit.icon className="w-6 h-6 text-white/80" />
                </div>
                <span className="text-sm text-white/70 [font-family:var(--font-inter)]">
                  {benefit.text}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Newsletter Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-md rounded-3xl p-8 sm:p-10 border border-white/20"
          >
            {!isSubscribed ? (
              <>
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
                      placeholder="Enter your email address"
                      className="w-full pl-14 pr-5 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition-colors [font-family:var(--font-inter)]"
                      disabled={isSubmitting}
                    />
                  </div>

                  <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting || !email}
                    size="lg"
                    className="relative overflow-hidden bg-white text-[#451C15] hover:bg-[#F8F5F0] rounded-full px-8 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      {isSubmitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                          >
                            <Coffee className="w-5 h-5" />
                          </motion.div>
                          <span>Subscribing...</span>
                        </>
                      ) : (
                        <>
                          <span>Subscribe Now</span>
                          <Send className="w-5 h-5" />
                        </>
                      )}
                    </span>
                  </Button>
                </div>

                {/* Privacy note */}
                <p className="text-xs text-white/50 text-center [font-family:var(--font-inter)]">
                  We respect your privacy. Unsubscribe at any time. No spam,
                  ever.
                </p>
              </>
            ) : (
              /* Success State */
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    delay: 0.2,
                  }}
                  className="inline-flex items-center justify-center w-16 h-16 bg-green-500/20 rounded-full mb-4"
                >
                  <CheckCircle className="w-8 h-8 text-green-400" />
                </motion.div>

                <h3 className="text-2xl font-light text-white mb-2 [font-family:var(--font-playfair)]">
                  Welcome to the Family!
                </h3>
                <p className="text-white/70 [font-family:var(--font-inter)]">
                  Check your inbox for a sweet welcome message and your first
                  exclusive recipe.
                </p>
              </motion.div>
            )}
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-12 flex items-center justify-center gap-8 text-white/60"
          >
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span className="text-sm [font-family:var(--font-inter)]">
                15K+ Subscribers
              </span>
            </div>
            <div className="w-px h-6 bg-white/20" />
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5" />
              <span className="text-sm [font-family:var(--font-inter)]">
                Weekly Updates
              </span>
            </div>
            <div className="w-px h-6 bg-white/20 hidden sm:block" />
            <div className="hidden sm:flex items-center gap-2">
              <Heart className="w-5 h-5" />
              <span className="text-sm [font-family:var(--font-inter)]">
                100% Free
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Import for AnimatePresence
import { Users } from "lucide-react";

export default BlogNewsletter;
