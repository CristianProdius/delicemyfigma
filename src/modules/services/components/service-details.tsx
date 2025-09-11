"use client";

import { motion } from "motion/react";
import { Check, Gift, Calendar, Users, Star, Heart } from "lucide-react";
import type { Service } from "@/types/strapi";
import { renderBlocks } from "@/lib/strapi-blocks";

interface ServiceDetailsProps {
  service: Service;
}

export const ServiceDetails = ({ service }: ServiceDetailsProps) => {
  // Return null if no serviceDetails data
  if (!service.serviceDetails) {
    return null;
  }

  const { mainContent, bookingCard } = service.serviceDetails;
  // These are single objects, not arrays (repeatable: false in Strapi)
  const includeSection = mainContent?.includeSection;
  const pricingSection = bookingCard?.pricingSection;
  const quickInfo = bookingCard?.quickInfo;

  // Icon mapping
  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case 'gift':
        return Gift;
      case 'star':
        return Star;
      case 'heart':
        return Heart;
      case 'check':
      default:
        return Check;
    }
  };
  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Description */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            {mainContent?.aboutSectionTitle && (
              <h2 className="text-3xl sm:text-4xl font-light text-[#451C15] mb-6 [font-family:var(--font-playfair)]">
                {mainContent.aboutSectionTitle}
              </h2>
            )}
            
            {mainContent?.longDescription && (
              <div 
                className="prose prose-lg text-[#451C15]/80 [font-family:var(--font-inter)]"
                dangerouslySetInnerHTML={{ __html: renderBlocks(mainContent.longDescription) }}
              />
            )}

            {/* Included Items */}
            {includeSection?.items && includeSection.items.length > 0 && (
              <div className="mt-12">
                {includeSection.title && (
                  <h3 className="text-2xl font-light text-[#451C15] mb-6 [font-family:var(--font-playfair)]">
                    {includeSection.title}
                  </h3>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {includeSection.items.map((item, index) => {
                    const IconComponent = getIcon(item.icon);
                    return (
                      <motion.div
                        key={item.id || index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                        viewport={{ once: true }}
                        className="flex items-start gap-3"
                      >
                        <IconComponent className="w-5 h-5 text-[#D4A574] mt-1 flex-shrink-0" />
                        <span className="text-[#451C15]/80 [font-family:var(--font-inter)]">
                          {item.text}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}
          </motion.div>

          {/* Booking Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="bg-[#FFF9F5] rounded-2xl p-8 sticky top-24">
              {/* Pricing */}
              {pricingSection && (
                <div className="mb-8">
                  <h3 className="text-xl font-medium text-[#451C15] mb-4 [font-family:var(--font-inter)]">
                    {pricingSection.title || ''}
                  </h3>
                  <div className="space-y-3">
                    {pricingSection.pricingType === 'package' && pricingSection.packages ? (
                      pricingSection.packages.map((pkg, index) => (
                        <div
                          key={pkg.id || index}
                          className={`flex justify-between items-center py-3 border-b border-[#D4A574]/20 last:border-0 ${
                            pkg.highlighted ? 'bg-[#D4A574]/5 px-3 rounded' : ''
                          }`}
                        >
                          <span className="text-[#451C15]/80 [font-family:var(--font-inter)]">
                            {pkg.name}
                          </span>
                          <span className="font-medium text-[#451C15] [font-family:var(--font-inter)]">
                            {pricingSection.currency}{pkg.price}
                          </span>
                        </div>
                      ))
                    ) : pricingSection.pricingType === 'fixed' ? (
                      <div className="text-[#451C15] font-medium [font-family:var(--font-inter)]">
                        {pricingSection.currency}{pricingSection.fixedPrice}
                        {pricingSection.unit && ` / ${pricingSection.unit}`}
                      </div>
                    ) : pricingSection.pricingType === 'range' ? (
                      <div className="text-[#451C15] font-medium [font-family:var(--font-inter)]">
                        {pricingSection.currency}{pricingSection.minPrice} - {pricingSection.currency}{pricingSection.maxPrice}
                        {pricingSection.unit && ` / ${pricingSection.unit}`}
                      </div>
                    ) : (
                      <div className="text-[#451C15] font-medium [font-family:var(--font-inter)]">
                        {pricingSection.contactForPricingText || ''}
                      </div>
                    )}
                    {pricingSection.note && (
                      <p className="text-sm text-[#451C15]/60 mt-2 [font-family:var(--font-inter)]">
                        {pricingSection.note}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Quick Info */}
              {quickInfo && (
                <div className="space-y-4 mb-8">
                  {quickInfo.duration && (
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-[#D4A574]" />
                      <span className="text-[#451C15]/80 [font-family:var(--font-inter)]">
                        {quickInfo.durationLabel}: {quickInfo.duration}
                      </span>
                    </div>
                  )}
                  
                  {quickInfo.groupSize && (
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-[#D4A574]" />
                      <span className="text-[#451C15]/80 [font-family:var(--font-inter)]">
                        {quickInfo.groupSizeLabel}: {quickInfo.groupSize}
                      </span>
                    </div>
                  )}
                  
                  {quickInfo.includedItems && (
                    <div className="flex items-start gap-3">
                      <Gift className="w-5 h-5 text-[#D4A574] mt-0.5" />
                      <div className="text-[#451C15]/80 [font-family:var(--font-inter)]">
                        {quickInfo.includedLabel}: {Array.isArray(quickInfo.includedItems) 
                          ? quickInfo.includedItems.join(', ')
                          : quickInfo.seeDetailsText || ''
                        }
                      </div>
                    </div>
                  )}
                </div>
              )}

            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};