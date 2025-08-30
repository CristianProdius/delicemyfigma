// src/modules/contact/components/contact-info.tsx

"use client";

import React from "react";
import { motion } from "motion/react";
import {
  Mail,
  Phone,
  MessageCircle,
  Calendar,
  Clock,
  MapPin,
  Star,
  Sparkles,
  ArrowRight,
  Circle,
} from "lucide-react";
import {
  contactContent,
  isAtelierOpen,
  getNextOpeningTime,
} from "../data/contact-content";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Mail,
  Phone,
  MessageCircle,
  Calendar,
  MapPin,
  Clock,
};

export const ContactInfo = () => {
  const isOpen = isAtelierOpen();
  const nextOpening = getNextOpeningTime();
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });

  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[95%] xl:max-w-[90%] 2xl:max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
          {/* Main Contact Card */}
          <motion.div
            className="relative group"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -5 }}
          >
            <div className="relative h-full bg-gradient-to-br from-[#451C15] to-[#451C15]/90 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 overflow-hidden shadow-xl">
              {/* Decorative Pattern Overlay - Hidden on mobile */}
              <div className="absolute inset-0 opacity-5 hidden sm:block">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `repeating-linear-gradient(
                      45deg,
                      transparent,
                      transparent 10px,
                      rgba(212, 165, 116, 0.1) 10px,
                      rgba(212, 165, 116, 0.1) 20px
                    )`,
                  }}
                />
              </div>

              {/* Chocolate Watermark - Smaller on mobile */}
              <div className="absolute top-4 right-4 sm:top-8 sm:right-8 text-white/5">
                <svg
                  className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-[120px] lg:h-[120px]"
                  viewBox="0 0 100 100"
                  fill="currentColor"
                >
                  <rect x="5" y="5" width="28" height="28" rx="4" />
                  <rect x="37" y="5" width="28" height="28" rx="4" />
                  <rect x="69" y="5" width="28" height="28" rx="4" />
                  <rect x="5" y="37" width="28" height="28" rx="4" />
                  <rect x="37" y="37" width="28" height="28" rx="4" />
                  <rect x="69" y="37" width="28" height="28" rx="4" />
                  <rect x="5" y="69" width="28" height="28" rx="4" />
                  <rect x="37" y="69" width="28" height="28" rx="4" />
                  <rect x="69" y="69" width="28" height="28" rx="4" />
                </svg>
              </div>

              {/* Floating Sparkles - Hidden on mobile */}
              <motion.div
                className="absolute top-4 left-4 text-[#D4A574]/30 hidden sm:block"
                animate={{
                  rotate: 360,
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.div>

              {/* Content */}
              <div className="relative z-10">
                <motion.div
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6 sm:mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="p-2.5 sm:p-3 bg-[#D4A574]/20 rounded-xl sm:rounded-2xl backdrop-blur-sm">
                    <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-[#D4A574]" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl lg:text-3xl [font-family:var(--font-playfair)] text-white">
                      Get in Touch
                    </h3>
                    <p className="text-white/70 text-xs sm:text-sm [font-family:var(--font-inter)]">
                      We&apos;re here to assist you
                    </p>
                  </div>
                </motion.div>

                {/* Contact Methods */}
                <div className="space-y-3 sm:space-y-4">
                  {contactContent.contactMethods.map((method, index) => {
                    const Icon = iconMap[method.icon] || Mail;

                    return (
                      <motion.a
                        key={method.id}
                        href={method.link}
                        target={
                          method.link?.startsWith("http") ? "_blank" : undefined
                        }
                        rel={
                          method.link?.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className="block group/item"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                        whileHover={{ x: 5 }}
                      >
                        <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl transition-all duration-300 hover:bg-white/5">
                          <div className="relative flex-shrink-0">
                            <motion.div
                              className="absolute inset-0 bg-[#D4A574]/20 rounded-lg sm:rounded-xl blur-lg hidden sm:block"
                              animate={{
                                scale: [1, 1.2, 1],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                            />
                            <div className="relative p-2 sm:p-3 bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl group-hover/item:bg-white/15 transition-colors">
                              <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4A574]" />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-white font-medium [font-family:var(--font-inter)] text-sm sm:text-base mb-0.5 sm:mb-1 truncate">
                              {method.title}
                            </h4>
                            <p className="text-white/90 text-xs sm:text-sm [font-family:var(--font-inter)] mb-0.5 sm:mb-1 break-all">
                              {method.value}
                            </p>
                            <p className="text-white/60 text-[10px] sm:text-xs [font-family:var(--font-inter)]">
                              {method.description}
                            </p>
                            {method.responseTime && (
                              <p className="text-[#D4A574] text-[10px] sm:text-xs [font-family:var(--font-inter)] mt-1 flex items-center gap-1">
                                <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                                {method.responseTime}
                              </p>
                            )}
                          </div>
                          <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-white/40 group-hover/item:text-[#D4A574] transition-colors mt-3 sm:mt-4 flex-shrink-0" />
                        </div>
                      </motion.a>
                    );
                  })}
                </div>

                {/* Decorative Divider */}
                <motion.div
                  className="my-6 sm:my-8 relative"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <div className="h-[1px] bg-gradient-to-r from-transparent via-[#D4A574]/30 to-transparent" />
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Star className="w-3 h-3 sm:w-4 sm:h-4 text-[#D4A574]/40" />
                  </div>
                </motion.div>

                {/* Location Preview */}
                <motion.div
                  className="p-3 sm:p-4 bg-white/5 rounded-xl sm:rounded-2xl backdrop-blur-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-start gap-2 sm:gap-3">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4A574] mt-0.5 sm:mt-1 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-white font-medium [font-family:var(--font-inter)] text-sm sm:text-base">
                        Visit Our Atelier
                      </p>
                      <p className="text-white/70 text-xs sm:text-sm [font-family:var(--font-inter)] mt-1">
                        {contactContent.location.address}
                      </p>
                      <p className="text-white/70 text-xs sm:text-sm [font-family:var(--font-inter)]">
                        {contactContent.location.city},{" "}
                        {contactContent.location.postalCode}
                      </p>
                      {contactContent.location.landmark && (
                        <p className="text-[#D4A574] text-[10px] sm:text-xs [font-family:var(--font-inter)] mt-1 sm:mt-2">
                          {contactContent.location.landmark}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Business Hours Card */}
          <motion.div
            className="relative group"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -5 }}
          >
            <div className="relative h-full bg-white/95 backdrop-blur-sm border border-[#451C15]/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl">
              {/* Decorative Elements - Smaller on mobile */}
              <motion.div
                className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 text-[#E8B4B8]/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Star className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10" />
              </motion.div>

              {/* Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8">
                <div>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl [font-family:var(--font-playfair)] text-[#451C15]">
                    {contactContent.businessHours.title}
                  </h3>
                  <p className="text-[#451C15]/60 text-xs sm:text-sm [font-family:var(--font-inter)] mt-1">
                    {contactContent.businessHours.subtitle}
                  </p>
                </div>

                {/* Live Status Indicator */}
                <motion.div
                  className={`
                    px-3 py-1.5 sm:px-4 sm:py-2 rounded-full flex items-center gap-1.5 sm:gap-2
                    text-xs sm:text-sm flex-shrink-0
                    ${
                      isOpen
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }
                  `}
                  animate={
                    isOpen
                      ? {
                          scale: [1, 1.05, 1],
                        }
                      : {}
                  }
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <motion.div
                    className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
                      isOpen ? "bg-green-500" : "bg-red-500"
                    }`}
                    animate={
                      isOpen
                        ? {
                            opacity: [1, 0.5, 1],
                          }
                        : {}
                    }
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <span className="font-medium [font-family:var(--font-inter)]">
                    {isOpen ? "Open Now" : "Closed"}
                  </span>
                </motion.div>
              </div>

              {/* Business Hours List */}
              <div className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-6">
                {contactContent.businessHours.schedule.map(
                  (schedule, index) => {
                    const isToday = schedule.day === today;

                    return (
                      <motion.div
                        key={schedule.day}
                        className={`
                          p-2.5 sm:p-3 rounded-lg sm:rounded-xl transition-all duration-300
                          ${
                            isToday
                              ? "bg-[#D4A574]/10 border border-[#D4A574]/20"
                              : "hover:bg-[#F8F6F3]"
                          }
                        `}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.5,
                          delay: 0.1 + index * 0.05,
                        }}
                        whileHover={{ x: 5 }}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 sm:gap-3">
                            {isToday && (
                              <motion.div
                                className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#D4A574] rounded-full"
                                animate={{
                                  scale: [1, 1.3, 1],
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  ease: "easeInOut",
                                }}
                              />
                            )}
                            <span
                              className={`
                                [font-family:var(--font-inter)] text-xs sm:text-sm
                                ${
                                  isToday
                                    ? "font-semibold text-[#451C15]"
                                    : "text-[#451C15]/80"
                                }
                              `}
                            >
                              {schedule.day}
                            </span>
                          </div>
                          <div className="text-right">
                            <span
                              className={`
                                [font-family:var(--font-inter)] text-xs sm:text-sm
                                ${
                                  schedule.isOpen
                                    ? isToday
                                      ? "text-[#451C15] font-medium"
                                      : "text-[#451C15]/70"
                                    : "text-[#451C15]/50"
                                }
                              `}
                            >
                              {schedule.hours}
                            </span>
                            {schedule.note && (
                              <p className="text-[#D4A574] text-[10px] sm:text-xs [font-family:var(--font-inter)] mt-0.5 sm:mt-1">
                                {schedule.note}
                              </p>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  }
                )}
              </div>

              {/* Special Note */}
              <motion.div
                className="p-3 sm:p-4 bg-gradient-to-r from-[#D4A574]/10 to-[#E8B4B8]/10 rounded-xl sm:rounded-2xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <div className="flex items-start gap-2 sm:gap-3">
                  <Circle className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4A574] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-[#451C15]/80 text-xs sm:text-sm [font-family:var(--font-inter)] leading-relaxed">
                      {contactContent.businessHours.specialNote}
                    </p>
                    {!isOpen && nextOpening !== "Today" && (
                      <p className="text-[#D4A574] text-xs sm:text-sm font-medium [font-family:var(--font-inter)] mt-1.5 sm:mt-2">
                        We&apos;ll be open {nextOpening}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Decorative Bottom Pattern */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-[#451C15]/20 via-[#D4A574]/20 to-[#E8B4B8]/20 rounded-b-2xl sm:rounded-b-3xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
