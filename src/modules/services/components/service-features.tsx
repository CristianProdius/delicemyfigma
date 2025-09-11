"use client";

import { motion } from "motion/react";
import { Check, Award, GraduationCap, Users2, Package, Gift } from "lucide-react";
import type { Service } from "@/types/strapi";

interface ServiceFeaturesProps {
  service: Service;
}

// Icon mapping for features
const iconMap: { [key: string]: React.FC<{ className?: string }> } = {
  GraduationCap: GraduationCap,
  Award: Award,
  Users2: Users2,
  Package: Package,
  Gift: Gift,
  Check: Check,
};

export const ServiceFeatures = ({ service }: ServiceFeaturesProps) => {
  // Return null if no ServiceFeatures data
  if (!service.ServiceFeatures) {
    return null;
  }

  const { sectionHeader, featuresGrid, benefitsSection, requirementsSection, whatsIncludedSection } = service.ServiceFeatures;

  // Return null if no features grid data
  if (!featuresGrid || featuresGrid.length === 0) {
    return null;
  }

  return (
    <section className="py-24 sm:py-32 lg:py-40 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        {sectionHeader && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true }}
            className="text-center mb-32"
          >
            {sectionHeader.subtitle && (
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-[#D4A574] text-[10px] font-medium tracking-[0.4em] uppercase mb-8 block [font-family:var(--font-inter)]"
              >
                {sectionHeader.subtitle}
              </motion.span>
            )}
            {sectionHeader.title && (
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-5xl sm:text-6xl lg:text-7xl font-thin text-[#451C15] tracking-tight [font-family:var(--font-playfair)]"
              >
                {sectionHeader.title}
              </motion.h2>
            )}
            
            {/* Decorative line */}
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true }}
              className="w-24 h-[0.5px] bg-gradient-to-r from-transparent via-[#D4A574] to-transparent mx-auto mt-12"
            />
          </motion.div>
        )}

        {/* Features Grid - Luxury Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 mb-32">
          {featuresGrid.map((feature, index) => {
            const Icon = iconMap[feature.icon] || Check;
            
            return (
              <motion.div
                key={feature.id || index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group relative"
              >
                {/* Hover gradient effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#D4A574]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl" />
                
                {/* Icon with luxury border */}
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className="mb-10 relative"
                >
                  <div className="w-24 h-24 mx-auto relative">
                    {/* Rotating border effect */}
                    <div className="absolute inset-0 rounded-full border border-[#D4A574]/20 group-hover:rotate-45 transition-transform duration-700" />
                    <div className="absolute inset-2 rounded-full border border-[#D4A574]/10 group-hover:-rotate-45 transition-transform duration-700" />
                    
                    {/* Icon container */}
                    <div className="relative w-full h-full rounded-full flex items-center justify-center">
                      <Icon className="w-10 h-10 text-[#D4A574]/80 group-hover:text-[#D4A574] transition-colors duration-500" />
                    </div>
                  </div>
                </motion.div>

                {/* Content with premium typography */}
                <div className="text-center relative">
                  <h3 className="text-2xl font-thin text-[#451C15] mb-5 tracking-wide [font-family:var(--font-playfair)] group-hover:text-[#D4A574] transition-colors duration-500">
                    {feature.title}
                  </h3>
                  <p className="text-[#451C15]/50 leading-loose text-sm tracking-wide [font-family:var(--font-inter)] font-light">
                    {feature.description}
                  </p>
                </div>

                {/* Bottom accent */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-[0.5px] bg-gradient-to-r from-transparent via-[#D4A574]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </motion.div>
            );
          })}
        </div>

        {/* Benefits Section - Luxury List */}
        {benefitsSection?.benefits && Array.isArray(benefitsSection.benefits) && benefitsSection.benefits.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="mb-32"
          >
            <div className="max-w-5xl mx-auto">
              {/* Section divider */}
              <div className="flex items-center justify-center mb-16">
                <div className="h-[0.5px] bg-gradient-to-r from-transparent via-[#D4A574]/20 to-transparent w-full" />
                <div className="w-2 h-2 rotate-45 border border-[#D4A574]/40 mx-8" />
                <div className="h-[0.5px] bg-gradient-to-r from-transparent via-[#D4A574]/20 to-transparent w-full" />
              </div>

              {benefitsSection.title && (
                <h3 className="text-4xl font-thin text-[#451C15] mb-16 text-center tracking-wide [font-family:var(--font-playfair)]">
                  {benefitsSection.title}
                </h3>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-8">
                {benefitsSection.benefits.map((benefit: string, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-6 group"
                  >
                    <div className="relative mt-2">
                      <div className="w-2 h-2 bg-[#D4A574]/20 rounded-full" />
                      <div className="absolute inset-0 w-2 h-2 bg-[#D4A574] rounded-full scale-0 group-hover:scale-100 transition-transform duration-500" />
                    </div>
                    <p className="text-[#451C15]/60 leading-loose tracking-wide [font-family:var(--font-inter)] font-light group-hover:text-[#451C15]/80 transition-colors duration-500">
                      {benefit}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Requirements & What's Included - Luxury Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Requirements Section */}
          {requirementsSection?.requirements && Array.isArray(requirementsSection.requirements) && requirementsSection.requirements.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Top ornament */}
              <div className="absolute -top-8 left-0 flex items-center gap-2">
                <div className="w-8 h-[0.5px] bg-gradient-to-r from-[#D4A574]/40 to-transparent" />
                <div className="w-1 h-1 bg-[#D4A574]/40 rounded-full" />
              </div>

              {requirementsSection.title && (
                <h3 className="text-3xl font-thin text-[#451C15] mb-12 tracking-wide [font-family:var(--font-playfair)]">
                  {requirementsSection.title}
                </h3>
              )}
              
              <ul className="space-y-6">
                {requirementsSection.requirements.map((requirement: string, index: number) => (
                  <motion.li 
                    key={index} 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.12 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-5 group"
                  >
                    <span className="text-[#D4A574]/60 text-[10px] mt-2 group-hover:text-[#D4A574] transition-colors duration-500">✦</span>
                    <span className="text-[#451C15]/60 tracking-wide leading-relaxed [font-family:var(--font-inter)] font-light">
                      {requirement}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}

          {/* What's Included Section */}
          {whatsIncludedSection?.items && Array.isArray(whatsIncludedSection.items) && whatsIncludedSection.items.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Top ornament */}
              <div className="absolute -top-8 left-0 flex items-center gap-2">
                <div className="w-8 h-[0.5px] bg-gradient-to-r from-[#D4A574]/40 to-transparent" />
                <div className="w-1 h-1 bg-[#D4A574]/40 rounded-full" />
              </div>

              {whatsIncludedSection.title && (
                <h3 className="text-3xl font-thin text-[#451C15] mb-12 tracking-wide [font-family:var(--font-playfair)]">
                  {whatsIncludedSection.title}
                </h3>
              )}
              
              <div className="space-y-5">
                {whatsIncludedSection.items.map((item: string, index: number) => (
                  <motion.div 
                    key={index} 
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-5 group"
                  >
                    <div className="relative">
                      <Check className="w-3.5 h-3.5 text-[#D4A574]/60 group-hover:text-[#D4A574] transition-colors duration-500" />
                    </div>
                    <span className="text-[#451C15]/60 tracking-wide leading-relaxed [font-family:var(--font-inter)] font-light">
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Bottom ornament */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex items-center justify-center mt-32"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-[0.5px] bg-gradient-to-r from-transparent to-[#D4A574]/20" />
            <div className="w-1.5 h-1.5 rotate-45 border border-[#D4A574]/30" />
            <div className="w-16 h-[0.5px] bg-gradient-to-l from-transparent to-[#D4A574]/20" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};