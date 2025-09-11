"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Clock, Users, MapPin, DollarSign, Calendar, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Service } from "@/types/strapi";
import { getStrapiMediaUrl } from "@/lib/strapi";

interface ServiceDetailHeroProps {
  service: Service;
}

export const ServiceDetailHero = ({ service }: ServiceDetailHeroProps) => {
  const heroImageUrl = getStrapiMediaUrl(service.heroImage);

  // Parse pricing for display
  const getPriceDisplay = () => {
    if (!service.pricing) return null;
    
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
        if (prices.length > 0 && service.pricePrefix) {
          return `${service.pricePrefix} ${currency}${Math.min(...prices)}`;
        }
        return service.pricing.variousPackagesText || null;
      case "custom":
        return service.pricing.customPricingText || null;
      default:
        return null;
    }
  };

  return (
    <section className="relative min-h-[70vh] overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        {heroImageUrl ? (
          <Image
            src={heroImageUrl}
            alt={service.title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#451C15] to-[#5A241C]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-[70vh] flex flex-col">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 w-full">
          {/* Breadcrumbs */}
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 text-white/80 mb-8 text-sm [font-family:var(--font-inter)]"
          >
            {service.breadcrumbHome && (
              <>
                <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
                  <Home className="w-4 h-4" />
                  <span>{service.breadcrumbHome}</span>
                </Link>
                <ChevronRight className="w-4 h-4" />
              </>
            )}
            {service.breadcrumbServices && (
              <>
                <Link href="/services" className="hover:text-white transition-colors">
                  {service.breadcrumbServices}
                </Link>
                <ChevronRight className="w-4 h-4" />
              </>
            )}
            <span className="text-white">{service.title}</span>
          </motion.nav>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-auto">
            {/* Left Column - Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white mb-6 [font-family:var(--font-playfair)]">
                {service.title}
              </h1>
              
              {service.shortDescription && (
                <p className="text-lg sm:text-xl text-white/90 mb-8 leading-relaxed [font-family:var(--font-inter)]">
                  {service.shortDescription}
                </p>
              )}

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                {service.bookNowText && (
                  <Button
                    size="lg"
                    className="bg-[#D4A574] text-[#451C15] hover:bg-[#c4966a] rounded-full px-8 py-6 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 [font-family:var(--font-inter)]"
                  >
                    {service.bookNowText}
                  </Button>
                )}
                {service.learnMoreText && (
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20 rounded-full px-8 py-6 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 [font-family:var(--font-inter)]"
                  >
                    {service.learnMoreText}
                  </Button>
                )}
              </div>
            </motion.div>

            {/* Right Column - Stats Cards */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-2 gap-4"
            >
              {/* Duration Card */}
              {service.duration && (
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                  <div className="flex items-center gap-3 mb-2">
                    <Clock className="w-5 h-5 text-[#D4A574]" />
                    {service.durationLabel && (
                      <span className="text-white/70 text-sm [font-family:var(--font-inter)]">
                        {service.durationLabel}
                      </span>
                    )}
                  </div>
                  <p className="text-white text-lg font-medium [font-family:var(--font-inter)]">
                    {service.duration}
                  </p>
                </div>
              )}

              {/* Group Size Card */}
              {service.groupSize && (
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                  <div className="flex items-center gap-3 mb-2">
                    <Users className="w-5 h-5 text-[#D4A574]" />
                    {service.groupSizeLabel && (
                      <span className="text-white/70 text-sm [font-family:var(--font-inter)]">
                        {service.groupSizeLabel}
                      </span>
                    )}
                  </div>
                  <p className="text-white text-lg font-medium [font-family:var(--font-inter)]">
                    {service.groupSize}
                  </p>
                </div>
              )}

              {/* Location Card */}
              {service.location && (
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                  <div className="flex items-center gap-3 mb-2">
                    <MapPin className="w-5 h-5 text-[#D4A574]" />
                    {service.locationLabel && (
                      <span className="text-white/70 text-sm [font-family:var(--font-inter)]">
                        {service.locationLabel}
                      </span>
                    )}
                  </div>
                  <p className="text-white text-lg font-medium [font-family:var(--font-inter)]">
                    {service.location.city}
                  </p>
                </div>
              )}

              {/* Investment Card */}
              {getPriceDisplay() && (
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                  <div className="flex items-center gap-3 mb-2">
                    <DollarSign className="w-5 h-5 text-[#D4A574]" />
                    {service.investmentLabel && (
                      <span className="text-white/70 text-sm [font-family:var(--font-inter)]">
                        {service.investmentLabel}
                      </span>
                    )}
                  </div>
                  <p className="text-white text-lg font-medium [font-family:var(--font-inter)]">
                    {getPriceDisplay()}
                  </p>
                </div>
              )}

              {/* Availability Card */}
              {service.availability && (
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 col-span-2">
                  <div className="flex items-center gap-3 mb-2">
                    <Calendar className="w-5 h-5 text-[#D4A574]" />
                    {service.availabilityLabel && (
                      <span className="text-white/70 text-sm [font-family:var(--font-inter)]">
                        {service.availabilityLabel}
                      </span>
                    )}
                  </div>
                  <p className="text-white text-lg font-medium [font-family:var(--font-inter)]">
                    {service.availability}
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};