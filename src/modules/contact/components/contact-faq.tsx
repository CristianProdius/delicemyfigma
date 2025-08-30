// src/modules/contact/components/contact-faq.tsx

"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  HelpCircle,
  Plus,
  Minus,
  Star,
  Sparkles,
  ChevronRight,
  Calendar,
  ShoppingBag,
  MapPin,
  Info,
} from "lucide-react";
import { contactContent } from "../data/contact-content";
import type { LucideIcon } from "lucide-react";

type FAQCategory = "all" | "booking" | "orders" | "visiting" | "general";

interface CategoryOption {
  id: FAQCategory;
  label: string;
  icon: LucideIcon;
  count: number;
}

export const ContactFAQ = () => {
  const [activeCategory, setActiveCategory] = useState<FAQCategory>("all");
  const [openItems, setOpenItems] = useState<string[]>([]);

  const faqs = contactContent.faqs.items;

  // Get category counts
  const getCategoryCount = (category: FAQCategory) => {
    if (category === "all") return faqs.length;
    return faqs.filter((faq) => faq.category === category).length;
  };

  const categories: CategoryOption[] = [
    {
      id: "all",
      label: "All Questions",
      icon: HelpCircle,
      count: getCategoryCount("all"),
    },
    {
      id: "booking",
      label: "Booking & Classes",
      icon: Calendar,
      count: getCategoryCount("booking"),
    },
    {
      id: "orders",
      label: "Custom Orders",
      icon: ShoppingBag,
      count: getCategoryCount("orders"),
    },
    {
      id: "visiting",
      label: "Visiting Us",
      icon: MapPin,
      count: getCategoryCount("visiting"),
    },
    {
      id: "general",
      label: "General Info",
      icon: Info,
      count: getCategoryCount("general"),
    },
  ];

  // Filter FAQs based on active category
  const filteredFAQs =
    activeCategory === "all"
      ? faqs
      : faqs.filter((faq) => faq.category === activeCategory);

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-[#F8F6F3]">
      <div className="max-w-[95%] xl:max-w-[90%] mx-auto">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Decorative Icon */}
            <motion.div
              className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#D4A574]/20 to-[#E8B4B8]/20 rounded-full mb-6"
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, type: "spring" }}
            >
              <HelpCircle className="w-8 h-8 text-[#D4A574]" />
            </motion.div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl [font-family:var(--font-playfair)] text-[#451C15] mb-4">
              {contactContent.faqs.title}
            </h2>
            <p className="text-lg text-[#451C15]/70 [font-family:var(--font-inter)]">
              {contactContent.faqs.subtitle}
            </p>

            {/* Decorative Elements */}
            <div className="flex justify-center items-center gap-6 mt-6">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    rotate: 360,
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 10 + i * 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <Star className="w-4 h-4 text-[#D4A574]/30 fill-[#D4A574]/30" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Category Filter Pills */}
          <motion.div
            className="flex flex-wrap justify-center gap-3 mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {categories.map((category, index) => {
              const Icon = category.icon;
              const isActive = activeCategory === category.id;

              return (
                <motion.button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`
                    px-5 py-2.5 rounded-full flex items-center gap-2
                    transition-all duration-300 group
                    ${
                      isActive
                        ? "bg-[#D4A574] text-white shadow-lg"
                        : "bg-[#451C15]/10 text-[#451C15] hover:bg-[#451C15]/20"
                    }
                  `}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? "text-white" : "text-[#451C15]/70"
                    }`}
                  />
                  <span className="[font-family:var(--font-inter)] text-sm font-medium">
                    {category.label}
                  </span>
                  <span
                    className={`
                    px-2 py-0.5 rounded-full text-xs [font-family:var(--font-inter)]
                    ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-[#451C15]/10 text-[#451C15]/60"
                    }
                  `}
                  >
                    {category.count}
                  </span>
                </motion.button>
              );
            })}
          </motion.div>

          {/* FAQ Items */}
          <motion.div className="space-y-4">
            <AnimatePresence mode="wait">
              {filteredFAQs.map((faq, index) => {
                const isOpen = openItems.includes(faq.id);

                return (
                  <motion.div
                    key={faq.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                  >
                    <motion.div
                      className={`
                        bg-white rounded-2xl border transition-all duration-300
                        ${
                          isOpen
                            ? "border-[#D4A574]/30 shadow-lg"
                            : "border-[#451C15]/10 shadow-md hover:shadow-lg hover:border-[#D4A574]/20"
                        }
                      `}
                      whileHover={{ scale: 1.01 }}
                    >
                      {/* Question Header */}
                      <button
                        onClick={() => toggleItem(faq.id)}
                        className="w-full px-6 py-5 flex items-start gap-4 text-left group"
                      >
                        {/* Icon Container */}
                        <div className="flex-shrink-0 mt-0.5">
                          <motion.div
                            className={`
                              w-8 h-8 rounded-full flex items-center justify-center
                              transition-all duration-300
                              ${
                                isOpen
                                  ? "bg-[#D4A574]/20"
                                  : "bg-[#451C15]/10 group-hover:bg-[#D4A574]/10"
                              }
                            `}
                            animate={{ rotate: isOpen ? 45 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            {isOpen ? (
                              <Minus className="w-4 h-4 text-[#D4A574]" />
                            ) : (
                              <Plus className="w-4 h-4 text-[#451C15]/60 group-hover:text-[#D4A574] transition-colors" />
                            )}
                          </motion.div>
                        </div>

                        {/* Question Text */}
                        <div className="flex-1">
                          <h3
                            className={`
                            text-lg font-semibold [font-family:var(--font-playfair)] 
                            transition-colors duration-300
                            ${
                              isOpen
                                ? "text-[#D4A574]"
                                : "text-[#451C15] group-hover:text-[#451C15]/90"
                            }
                          `}
                          >
                            {faq.question}
                          </h3>

                          {/* Category Badge (visible when not filtered) */}
                          {activeCategory === "all" && (
                            <motion.span
                              className="inline-flex items-center gap-1 mt-2 px-2 py-1 bg-[#F8F6F3] rounded-full"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.2 }}
                            >
                              <ChevronRight className="w-3 h-3 text-[#D4A574]" />
                              <span className="text-xs text-[#451C15]/60 [font-family:var(--font-inter)] capitalize">
                                {faq.category}
                              </span>
                            </motion.span>
                          )}
                        </div>

                        {/* Decorative Arrow */}
                        <motion.div
                          className="flex-shrink-0 mt-1"
                          animate={{
                            rotate: isOpen ? 90 : 0,
                            x: isOpen ? 5 : 0,
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronRight
                            className={`
                            w-5 h-5 transition-colors duration-300
                            ${isOpen ? "text-[#D4A574]" : "text-[#451C15]/30"}
                          `}
                          />
                        </motion.div>
                      </button>

                      {/* Answer Content */}
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-6 pl-[60px]">
                              {/* Decorative Line */}
                              <motion.div
                                className="h-[1px] bg-gradient-to-r from-[#D4A574]/20 via-[#D4A574]/10 to-transparent mb-4 -ml-[36px]"
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                              />

                              {/* Answer Text */}
                              <motion.p
                                className="text-[#451C15]/70 [font-family:var(--font-inter)] leading-relaxed"
                                initial={{ y: -10 }}
                                animate={{ y: 0 }}
                                transition={{ duration: 0.3, delay: 0.15 }}
                              >
                                {faq.answer}
                              </motion.p>

                              {/* Decorative Bottom Element */}
                              <motion.div
                                className="flex items-center gap-2 mt-4"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                              >
                                <Sparkles className="w-3 h-3 text-[#D4A574]/40" />
                                <span className="text-xs text-[#D4A574]/60 [font-family:var(--font-inter)]">
                                  Hope this helps!
                                </span>
                              </motion.div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {/* Still Have Questions CTA */}
          <motion.div
            className="mt-12 p-8 bg-gradient-to-br from-[#D4A574]/10 via-[#E8B4B8]/10 to-[#D4A574]/10 rounded-3xl text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-2xl [font-family:var(--font-playfair)] text-[#451C15] mb-3">
              Still Have Questions?
            </h3>
            <p className="text-[#451C15]/70 [font-family:var(--font-inter)] mb-6">
              Our chocolatiers are here to help with any inquiries you may have.
            </p>
            <motion.a
              href="#contact-form"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#451C15] text-white rounded-full hover:bg-[#451C15]/90 transition-all [font-family:var(--font-inter)] font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Us
              <ChevronRight className="w-4 h-4" />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
