"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Clock, Users } from "lucide-react";
import type { Service, ServicesPageData, ServicesGridSettings, ServiceCardDefaults } from "@/types/strapi";
import { getStrapiMediaUrl } from "@/lib/strapi";
import type { LucideIcon } from "lucide-react";
import type { FC } from "react";

interface ServicesGridProps {
  services: Service[];
}

type IconComponent = FC | LucideIcon;

// Icon mapping for service icons
const iconMap: { [key: string]: IconComponent } = {
  Users: Users,
  Sparkles: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/>
    </svg>
  ),
  Utensils: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
      <path d="M7 2v20" />
      <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
    </svg>
  ),
  PartyPopper: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5.8 11.3 2 22l10.7-3.79" />
      <path d="M4 3h.01" />
      <path d="M22 8h.01" />
      <path d="M15 2h.01" />
      <path d="M22 20h.01" />
      <path d="m22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12v0c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10" />
      <path d="m22 13-.82-.33c-.86-.34-1.82.2-1.98 1.11v0c-.11.7-.72 1.22-1.43 1.22H17" />
      <path d="m11 2 .33.82c.34.86-.2 1.82-1.11 1.98v0C9.52 4.9 9 5.52 9 6.23V7" />
      <path d="M11 13c1.93 1.93 2.83 4.17 2 5-.83.83-3.07-.07-5-2-1.93-1.93-2.83-4.17-2-5 .83-.83 3.07.07 5 2Z" />
    </svg>
  ),
  Palette: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
      <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
      <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
      <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
    </svg>
  ),
  Gift: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="8" width="18" height="4" rx="1" />
      <path d="M12 8v13" />
      <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
      <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" />
    </svg>
  ),
};

// Service Card Component
interface ServiceCardProps {
  service: Service;
  index: number;
  gridSettings?: ServicesGridSettings;
  cardDefaults?: ServiceCardDefaults;
}

const ServiceCard = ({ service, index, gridSettings, cardDefaults }: ServiceCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Get data from heroSection for services page cards
  const title = service.heroSection?.title || service.title || '';
  const description = service.heroSection?.subtitle || service.shortDescription || '';
  const heroImage = service.heroSection?.backgroundImage || service.heroImage;
  const Icon = service.icon ? iconMap[service.icon] || Users : Users;
  const heroImageUrl = getStrapiMediaUrl(heroImage);
  
  // Debug log

  // Parse pricing for display - check both old and new structures
  const getPriceDisplay = () => {
    if (!gridSettings?.showPriceBadge) return null;
    
    // Check if service has pricing info in serviceDetails
    const pricingSection = service.serviceDetails?.bookingCard?.pricingSection;
    if (pricingSection) {
      const currency = pricingSection.currency || '';
      
      switch (pricingSection.pricingType) {
        case "fixed":
          return pricingSection.fixedPrice ? `${currency} ${pricingSection.fixedPrice}` : null;
        case "range":
          return (pricingSection.minPrice && pricingSection.maxPrice) 
            ? `${currency} ${pricingSection.minPrice}-${pricingSection.maxPrice}`
            : null;
        case "package":
          const packages = pricingSection.packages || [];
          if (packages.length > 0 && cardDefaults?.pricePrefix) {
            const minPrice = Math.min(...packages.map(p => p.price));
            return `${cardDefaults.pricePrefix} ${currency} ${minPrice}`;
          }
          return null;
        default:
          return pricingSection.contactForPricingText || null;
      }
    }
    
    // Fallback to old structure if exists
    if (service.pricing) {
      const currency = service.pricing.currency;
      if (!currency) return null;

      switch (service.pricing.type) {
        case "fixed":
          return service.pricing.amount ? `${currency}${service.pricing.amount}` : null;
        case "range":
          return (service.pricing.minAmount && service.pricing.maxAmount) 
            ? `${currency}${service.pricing.minAmount}-${currency}${service.pricing.maxAmount}`
            : null;
        case "package":
          const prices = service.pricing.packages?.map((p) => p.price) || [];
          if (prices.length > 0 && cardDefaults?.pricePrefix) {
            return `${cardDefaults.pricePrefix} ${currency}${Math.min(...prices)}`;
          }
          return null;
        case "custom":
          return service.pricing.customPricingText || null;
        default:
          return null;
      }
    }
    
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * (gridSettings?.animationDelay || 0.1) }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative h-full"
    >
      <Link href={`/services/${service.slug}`} className="block h-full">
        <div className="relative h-full bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-[#451C15]/5">
          {/* Gradient border effect on hover */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl sm:rounded-3xl"
            style={{
              background: 'linear-gradient(135deg, #D4A57420 0%, transparent 50%, #D4A57420 100%)',
            }}
          />

          {/* Image Container */}
          <div className="relative h-48 sm:h-56 lg:h-64 overflow-hidden">
            {heroImageUrl ? (
              <Image
                src={heroImageUrl}
                alt={title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#451C15]/10 to-[#D4A574]/10" />
            )}

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

            {/* Icon Badge */}
            <motion.div
              className="absolute top-4 right-4 z-10"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                delay: index * 0.1 + 0.3,
                type: "spring",
                stiffness: 200,
              }}
            >
              <div
                className="p-3 rounded-2xl bg-white/90 backdrop-blur-sm shadow-lg group-hover:shadow-xl transition-all duration-300"
                style={{
                  backgroundColor: '#D4A57415',
                  borderColor: '#D4A57430',
                  borderWidth: "1px",
                  borderStyle: "solid",
                }}
              >
                <Icon
                  className="w-6 h-6"
                  style={{ color: '#D4A574' }}
                />
              </div>
            </motion.div>

            {/* Price Badge */}
            {getPriceDisplay() && (
              <motion.div
                className="absolute bottom-4 left-4 z-10"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + 0.4 }}
              >
                <div className="px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full shadow-md">
                  <span className="text-sm font-medium text-[#451C15]">
                    {getPriceDisplay()}
                  </span>
                </div>
              </motion.div>
            )}
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8">
            {/* Title */}
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-light text-[#451C15] mb-3 leading-tight [font-family:var(--font-playfair)] line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#451C15] group-hover:to-[#A67B5B] transition-all duration-300">
              {title}
            </h3>

            {/* Description */}
            {description && (
              <p className="text-sm sm:text-base text-[#451C15]/60 mb-6 leading-relaxed font-light [font-family:var(--font-inter)] line-clamp-3">
                {description}
              </p>
            )}

            {/* Meta Info */}
            {gridSettings?.showMetaInfo && (
              <div className="flex flex-wrap gap-4 mb-6 text-xs sm:text-sm text-[#451C15]/50">
                {(service.serviceDetails?.bookingCard?.quickInfo?.duration || service.duration) && cardDefaults?.durationIcon && (
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    <span>{service.serviceDetails?.bookingCard?.quickInfo?.duration || service.duration}</span>
                  </div>
                )}
                {(service.serviceDetails?.bookingCard?.quickInfo?.groupSize || service.groupSize) && cardDefaults?.groupSizeIcon && (
                  <div className="flex items-center gap-1.5">
                    <Users className="w-4 h-4" />
                    <span>{service.serviceDetails?.bookingCard?.quickInfo?.groupSize || service.groupSize}</span>
                  </div>
                )}
              </div>
            )}

            {/* CTA Button */}
            {(service.buttonText || cardDefaults?.defaultButtonText) && (
              <motion.div
                className="flex items-center justify-between"
                animate={isHovered ? { x: 5 } : { x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-base font-light text-[#451C15] group-hover:text-[#A67B5B] transition-colors duration-300 [font-family:var(--font-inter)]">
                  {service.buttonText || cardDefaults?.defaultButtonText}
                </span>
                <div className="relative">
                  <motion.div
                    animate={
                      isHovered ? { x: 5, opacity: 1 } : { x: 0, opacity: 0.7 }
                    }
                    transition={{ duration: 0.3 }}
                  >
                    <ArrowRight className="w-5 h-5 text-[#451C15] group-hover:text-[#A67B5B]" />
                  </motion.div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Decorative Corner Accent */}
          <div
            className="absolute bottom-0 right-0 w-24 h-24 opacity-10 group-hover:opacity-20 transition-opacity duration-500"
            style={{
              background: 'radial-gradient(circle at bottom right, #D4A574 0%, transparent 70%)',
            }}
          />
        </div>
      </Link>
    </motion.div>
  );
};

interface ServicesGridProps {
  services: Service[];
  gridSection?: ServicesPageData['servicesGridSection'];
}

export const ServicesGrid = ({ services, gridSection }: ServicesGridProps) => {
  // Debug logs
  
  if (!services || services.length === 0) {
    if (!gridSection?.noServicesText) return null;
    return (
      <div className="text-center py-12">
        <p className="text-[#451C15]/60 text-lg">{gridSection.noServicesText}</p>
      </div>
    );
  }
  
  const gridSettings = gridSection?.gridSettings;
  const cardDefaults = gridSection?.serviceCardDefaults;

  return (
    <section className="relative z-10 px-4 sm:px-6 lg:px-8 pb-20 sm:pb-24 lg:pb-32 max-w-[95%] xl:max-w-[90%] mx-auto">
      {/* Services Grid */}
      <div className={`grid gap-6 sm:gap-8 lg:gap-10 ${
        gridSettings?.gridColumns === 'single' ? 'grid-cols-1' :
        gridSettings?.gridColumns === 'two' ? 'grid-cols-1 md:grid-cols-2' :
        'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
      }`}>
        {services.map((service, index) => (
          <ServiceCard 
            key={service.id} 
            service={service} 
            index={index}
            gridSettings={gridSettings}
            cardDefaults={cardDefaults}
          />
        ))}
      </div>
    </section>
  );
};