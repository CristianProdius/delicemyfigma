"use client";

import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import type { Service, ServiceFAQ } from "@/types/strapi";

interface ServiceFAQsProps {
  service: Service;
}

export const ServiceFAQs = ({ service }: ServiceFAQsProps) => {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  // Initialize with first item open if setting is enabled - must be before early returns
  useEffect(() => {
    const faqSettings = service.serviceFaqs?.faqSettings;
    const faqs = service.serviceFaqs?.faqs;
    
    if (faqSettings?.defaultOpenFirst && faqs && faqs.length > 0) {
      setOpenItems(new Set([0]));
    }
  }, [service.serviceFaqs]);

  // Return null if no FAQs section data
  if (!service.serviceFaqs) {
    return null;
  }

  const { faqHeader, faqs, faqSettings } = service.serviceFaqs;

  // Return null if no FAQs
  if (!faqs || faqs.length === 0) {
    return null;
  }

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems);
    
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      // If not allowing multiple open, clear all first
      if (!faqSettings?.allowMultipleOpen) {
        newOpenItems.clear();
      }
      newOpenItems.add(index);
    }
    
    setOpenItems(newOpenItems);
  };

  // Group FAQs by category if settings enable it
  const groupedFaqs = faqSettings?.showCategories 
    ? faqs.reduce((acc, faq, index) => {
        const category = faq.category || 'general';
        if (!acc[category]) acc[category] = [];
        acc[category].push({ ...faq, originalIndex: index });
        return acc;
      }, {} as Record<string, Array<ServiceFAQ & { originalIndex: number }>>)
    : { all: faqs.map((faq, index) => ({ ...faq, originalIndex: index })) };

  const categoryLabels: Record<string, string> = {
    booking: 'Бронирование',
    orders: 'Заказы',
    visiting: 'Посещение',
    general: 'Общие вопросы',
    all: ''
  };

  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-[#FFF9F5]">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        {faqHeader && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            {faqHeader.subtitle && (
              <span className="text-[#D4A574] text-xs font-medium tracking-[0.3em] uppercase mb-4 block [font-family:var(--font-inter)]">
                {faqHeader.subtitle}
              </span>
            )}
            {faqHeader.title && (
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-[#451C15] [font-family:var(--font-playfair)]">
                {faqHeader.title}
              </h2>
            )}
            
            {/* Decorative element */}
            <div className="flex items-center justify-center mt-8">
              <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#D4A574]/30" />
              <HelpCircle className="w-4 h-4 text-[#D4A574]/40 mx-3" />
              <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#D4A574]/30" />
            </div>
          </motion.div>
        )}

        {/* FAQs List */}
        <div className="space-y-6">
          {Object.entries(groupedFaqs).map(([category, categoryFaqs]) => (
            <div key={category}>
              {/* Category Header */}
              {faqSettings?.showCategories && categoryLabels[category] && (
                <motion.h3
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="text-sm font-medium text-[#D4A574] uppercase tracking-wider mb-4 [font-family:var(--font-inter)]"
                >
                  {categoryLabels[category]}
                </motion.h3>
              )}

              {/* FAQ Items */}
              <div className="space-y-3">
                {categoryFaqs.map((faq, index: number) => {
                  const isOpen = openItems.has(faq.originalIndex);
                  
                  return (
                    <motion.div
                      key={faq.originalIndex}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      viewport={{ once: true }}
                      className="bg-white rounded-xl shadow-sm border border-[#D4A574]/10 overflow-hidden hover:shadow-md transition-shadow duration-300"
                    >
                      <button
                        onClick={() => toggleItem(faq.originalIndex)}
                        className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-[#FFF9F5]/50 transition-colors group"
                      >
                        <span className="text-lg font-medium text-[#451C15] [font-family:var(--font-inter)] pr-4">
                          {faq.question}
                        </span>
                        <ChevronDown
                          className={`w-5 h-5 text-[#D4A574] transition-transform duration-300 flex-shrink-0 ${
                            isOpen ? "rotate-180" : ""
                          } group-hover:text-[#D4A574]/80`}
                        />
                      </button>
                      
                      <motion.div
                        initial={false}
                        animate={{
                          height: isOpen ? "auto" : 0,
                          opacity: isOpen ? 1 : 0
                        }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-5 pt-1">
                          <div className="text-[#451C15]/70 [font-family:var(--font-inter)] leading-relaxed">
                            {/* Handle richtext content */}
                            {typeof faq.answer === 'string' 
                              ? faq.answer 
                              : <div dangerouslySetInnerHTML={{ __html: faq.answer }} />}
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA or Help Text */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12 pt-8 border-t border-[#D4A574]/10"
        >
          <p className="text-[#451C15]/60 [font-family:var(--font-inter)]">
            {faqHeader?.subtitle && faqHeader.subtitle.includes('ВОПРОС') 
              ? 'Не нашли ответ на свой вопрос?' 
              : 'Have more questions?'}
          </p>
          <p className="text-[#D4A574] font-medium mt-2 [font-family:var(--font-inter)]">
            {faqHeader?.subtitle && faqHeader.subtitle.includes('ВОПРОС')
              ? 'Свяжитесь с нами для консультации'
              : 'Contact us for more information'}
          </p>
        </motion.div>
      </div>
    </section>
  );
};