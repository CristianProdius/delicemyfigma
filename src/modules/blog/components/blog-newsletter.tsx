// src/modules/blog/components/blog-newsletter.tsx
"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Mail,
  Send,
  CheckCircle,
  Coffee,
  Heart,
  Star,
  Gift,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface BlogNewsletterProps {
  data?: any;
}

const getIconComponent = (iconName: string) => {
  const icons: Record<string, React.ComponentType<{ className?: string }>> = {
    Mail,
    Send,
    CheckCircle,
    Coffee,
    Heart,
    Star,
    Gift,
    Users,
  };
  return icons[iconName] || Mail;
};

export const BlogNewsletter = ({ data }: BlogNewsletterProps) => {
  if (!data) return null;
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

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

  const IconComponent = getIconComponent(data.icon || "Mail");

  return (
    <section className="relative py-16 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-[95%] xl:max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12"
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
              className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-[#451C15]/5 rounded-2xl mb-4 sm:mb-6"
            >
              <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 text-[#D4A574]" />
            </motion.div>

            {/* Title */}
            {data.title && (
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#451C15] mb-3 sm:mb-4 [font-family:var(--font-playfair)]">
                {data.title}
              </h2>
            )}

            {/* Subtitle */}
            {data.subtitle && (
              <p className="text-base sm:text-lg text-[#451C15]/70 max-w-2xl mx-auto [font-family:var(--font-inter)] px-4">
                {data.subtitle}
              </p>
            )}
          </motion.div>

          {/* Benefits - Responsive Grid */}
          {data.benefits && data.benefits.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12"
            >
              {data.benefits.map((benefit: any, index: number) => {
                const BenefitIcon = getIconComponent(benefit.icon);
                return (
                  <motion.div
                    key={index}
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
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#FFF9F5] border border-[#451C15]/10 rounded-xl flex items-center justify-center mb-2 sm:mb-3">
                      <BenefitIcon className="w-5 h-5 sm:w-6 sm:h-6 text-[#D4A574]" />
                    </div>
                    <span className="text-xs sm:text-sm text-[#451C15]/60 [font-family:var(--font-inter)]">
                      {benefit.text}
                    </span>
                  </motion.div>
                );
              })}
            </motion.div>
          )}

          {/* Newsletter Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-[#FFF9F5] rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 border border-[#451C15]/10"
          >
            {!isSubscribed ? (
              <>
                {/* Form Container with proper alignment */}
                <div className="max-w-xl mx-auto">
                  <div className="flex flex-col sm:flex-row gap-3">
                    {/* Email Input */}
                    <div className="relative flex-1">
                      <Mail className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-[#451C15]/40" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
                        placeholder={data.form?.emailPlaceholder || "Enter your email address"}
                        className="w-full h-12 sm:h-14 pl-11 sm:pl-14 pr-4 sm:pr-5 bg-white border border-[#451C15]/10 rounded-full text-[#451C15] placeholder-[#451C15]/40 focus:outline-none focus:border-[#D4A574] transition-colors [font-family:var(--font-inter)] text-sm sm:text-base"
                        disabled={isSubmitting}
                      />
                    </div>
                    
                    {/* Subscribe Button */}
                    <Button
                      onClick={handleSubmit}
                      disabled={isSubmitting || !email}
                      className="h-12 sm:h-14 px-6 sm:px-8 bg-[#451C15] text-white hover:bg-[#5A241C] rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base [font-family:var(--font-inter)] whitespace-nowrap"
                    >
                      <span className="flex items-center justify-center gap-2">
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
                              <Coffee className="w-4 h-4 sm:w-5 sm:h-5" />
                            </motion.div>
                            <span className="hidden sm:inline">{data.form?.submittingText || "Subscribing..."}</span>
                            <span className="sm:hidden">{data.form?.submittingTextMobile || "Wait..."}</span>
                          </>
                        ) : (
                          <>
                            <span>{data.form?.submitButtonText || "Subscribe"}</span>
                            <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                          </>
                        )}
                      </span>
                    </Button>
                  </div>
                </div>

                {/* Privacy note */}
                <p className="text-xs text-[#451C15]/50 text-center [font-family:var(--font-inter)] mt-4 sm:mt-6">
                  {data.form?.privacyNote || "We respect your privacy. Unsubscribe at any time. No spam, ever."}
                </p>
              </>
            ) : (
              /* Success State */
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6 sm:py-8"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    delay: 0.2,
                  }}
                  className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-green-500/10 rounded-full mb-3 sm:mb-4"
                >
                  {React.createElement(getIconComponent(data.successMessage?.icon || "CheckCircle"), { className: "w-7 h-7 sm:w-8 sm:h-8 text-green-500" })}
                </motion.div>
                <h3 className="text-xl sm:text-2xl font-light text-[#451C15] mb-2 [font-family:var(--font-playfair)]">
                  {data.successMessage?.title || "Welcome to the Family!"}
                </h3>
                <p className="text-sm sm:text-base text-[#451C15]/70 [font-family:var(--font-inter)] px-4">
                  {data.successMessage?.description || "Check your inbox for a sweet welcome message and your first exclusive recipe."}
                </p>
              </motion.div>
            )}
          </motion.div>

          {/* Stats - Responsive */}
          {data.stats && data.stats.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              viewport={{ once: true }}
              className="mt-8 sm:mt-12 flex flex-wrap items-center justify-center gap-4 sm:gap-8"
            >
              {data.stats.map((stat: any, index: number) => (
                <React.Fragment key={index}>
                  <div className="flex items-center gap-2">
                    <span className="text-xs sm:text-sm text-[#451C15]/60 [font-family:var(--font-inter)]">
                      {stat.value}{stat.suffix ? stat.suffix : ""} {stat.label}
                    </span>
                  </div>
                  {index < data.stats.length - 1 && index < 2 && (
                    <div className={`${index === 0 ? 'hidden sm:block' : 'hidden md:block'} w-px h-6 bg-[#451C15]/10`} />
                  )}
                </React.Fragment>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BlogNewsletter;