"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { ServicesPageData } from "@/types/strapi";
import { renderBlocks } from "@/lib/strapi-blocks";

interface ServicesCTAProps {
  pageData?: ServicesPageData | null;
}

export const ServicesCTA = ({ pageData }: ServicesCTAProps) => {
  const ctaSection = pageData?.servicesCtaSection;
  
  // Return null if no CTA section data
  if (!ctaSection) return null;
  
  return (
    <>
      {/* Bottom CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="px-4 sm:px-6 lg:px-8 pb-20 sm:pb-24 lg:pb-32 max-w-[95%] xl:max-w-[90%] mx-auto"
      >
        <div className="bg-gradient-to-br from-[#451C15]/5 to-[#D4A574]/5 backdrop-blur-sm rounded-3xl p-8 sm:p-12 lg:p-16 border border-[#451C15]/10 max-w-4xl mx-auto">
          {ctaSection.ctaTitle && (
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-[#451C15] mb-4 [font-family:var(--font-playfair)]">
              {ctaSection.ctaTitle}
            </h2>
          )}
          
          {ctaSection.ctaDescription && (
            <div 
              className="text-[#451C15]/60 text-base sm:text-lg mb-8 max-w-2xl mx-auto font-light [font-family:var(--font-inter)]"
              dangerouslySetInnerHTML={{ __html: renderBlocks(ctaSection.ctaDescription) }}
            />
          )}
          
          {ctaSection.ctaButtonText && ctaSection.ctaButtonUrl && (
            <Link href={ctaSection.ctaButtonUrl}>
              <Button
                size="lg"
                className="bg-[#451C15] text-[#E0D9C9] hover:bg-[#5A241C] rounded-full px-8 py-6 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 [font-family:var(--font-inter)]"
              >
                <span className="flex items-center gap-2">
                  {ctaSection.ctaButtonText}
                  <ArrowRight className="w-5 h-5" />
                </span>
              </Button>
            </Link>
          )}
        </div>

        {/* Decorative Bottom Element */}
        {ctaSection.showDecorativeElement && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-12 flex justify-center"
          >
            <svg viewBox="0 0 200 40" className="w-48 h-10 fill-none">
              <motion.path
                d="M20,20 Q50,5 80,20 T140,20 T180,20"
                stroke="url(#gradient-services)"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
                viewport={{ once: true }}
              />
              <defs>
                <linearGradient
                  id="gradient-services"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#E0D9C9" stopOpacity="0" />
                  <stop offset="50%" stopColor="#D4A574" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#E0D9C9" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        )}
      </motion.div>
    </>
  );
};