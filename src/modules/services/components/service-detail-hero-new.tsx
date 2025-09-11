"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Clock, Users, MapPin, DollarSign, Calendar, Home, Star, Award, Gift, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Service } from "@/types/strapi";
import { getStrapiMediaUrl } from "@/lib/strapi";

interface ServiceDetailHeroProps {
  service: Service;
}

// Icon mapping
const iconMap: { [key: string]: React.FC<{ className?: string }> } = {
  Clock: Clock,
  Users: Users,
  MapPin: MapPin,
  DollarSign: DollarSign,
  Calendar: Calendar,
  Home: Home,
  Star: Star,
  Award: Award,
  Gift: Gift,
  Package: Package,
};

export const ServiceDetailHero = ({ service }: ServiceDetailHeroProps) => {
  // Check if heroSection exists
  if (!service.heroSection) return null;
  
  const { heroSection } = service;
  const backgroundImageUrl = getStrapiMediaUrl(heroSection.backgroundImage);

  return (
    <section className="relative min-h-[85vh] overflow-hidden">
      {/* Background Image with Premium Overlay */}
      <div className="absolute inset-0">
        {backgroundImageUrl ? (
          <Image
            src={backgroundImageUrl}
            alt=""
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#1a0f0a] via-[#2d1810] to-[#1a0f0a]" />
        )}
        {/* Premium gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-[85vh] flex flex-col">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 w-full h-full flex flex-col">
          
          {/* Breadcrumbs */}
          {(heroSection.breadcrumbHome || heroSection.breadcrumbServices) && (
            <motion.nav
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-2 text-white/70 mb-12 text-sm [font-family:var(--font-inter)]"
            >
              {heroSection.breadcrumbHome && (
                <>
                  <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
                    <Home className="w-4 h-4" />
                    <span>{heroSection.breadcrumbHome}</span>
                  </Link>
                  <ChevronRight className="w-4 h-4 text-white/50" />
                </>
              )}
              {heroSection.breadcrumbServices && (
                <>
                  <Link href="/services" className="hover:text-white transition-colors">
                    {heroSection.breadcrumbServices}
                  </Link>
                  <ChevronRight className="w-4 h-4 text-white/50" />
                </>
              )}
              <span className="text-white">{heroSection.title || service.title}</span>
            </motion.nav>
          )}

          {/* Main Content Grid */}
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Column - Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              {/* Title */}
              {heroSection.title && (
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light text-white mb-6 leading-[1.1] [font-family:var(--font-playfair)]">
                  {heroSection.title}
                </h1>
              )}
              
              {/* Subtitle/Description */}
              {heroSection.subtitle && (
                <p className="text-xl sm:text-2xl text-white/90 mb-10 leading-relaxed font-light [font-family:var(--font-inter)]">
                  {heroSection.subtitle}
                </p>
              )}

              {/* CTA Buttons */}
              {(heroSection.primaryButtonText || heroSection.secondaryButtonText) && (
                <div className="flex flex-wrap gap-4">
                  {heroSection.primaryButtonText && (
                    <Link href={heroSection.primaryButtonUrl || '#'}>
                      <Button
                        size="lg"
                        className="bg-white text-[#1a0f0a] hover:bg-white/90 rounded-full px-10 py-7 text-lg font-medium shadow-2xl hover:shadow-3xl transition-all duration-300 [font-family:var(--font-inter)]"
                      >
                        {heroSection.primaryButtonText}
                        <ChevronRight className="w-5 h-5 ml-2" />
                      </Button>
                    </Link>
                  )}
                  {heroSection.secondaryButtonText && (
                    <Link href={heroSection.secondaryButtonUrl || '#'}>
                      <Button
                        size="lg"
                        variant="outline"
                        className="bg-transparent text-white border-2 border-white/30 hover:bg-white/10 hover:border-white/50 rounded-full px-10 py-7 text-lg font-medium backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 [font-family:var(--font-inter)]"
                      >
                        {heroSection.secondaryButtonText}
                      </Button>
                    </Link>
                  )}
                </div>
              )}
            </motion.div>

            {/* Right Column - Premium Stats Cards in Single Column */}
            {heroSection.stats && heroSection.stats.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                className="flex flex-col gap-4"
              >
                {heroSection.stats.map((stat, index) => {
                  const Icon = iconMap[stat.icon] || Clock;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                      className="group relative"
                    >
                      {/* Glass morphism card - horizontal layout */}
                      <div className="relative bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:transform hover:translate-x-2">
                        {/* Glow effect on hover */}
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        
                        <div className="relative z-10 flex items-center gap-4">
                          {/* Icon with golden accent */}
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#D4A574] to-[#c4966a] flex items-center justify-center flex-shrink-0">
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          
                          {/* Content */}
                          <div className="flex-1">
                            <div className="flex items-baseline gap-3">
                              {/* Label */}
                              {stat.label && (
                                <span className="text-white/70 text-xs font-medium tracking-wide uppercase [font-family:var(--font-inter)]">
                                  {stat.label}
                                </span>
                              )}
                              
                              {/* Value */}
                              {stat.value && (
                                <p className="text-white text-xl font-light [font-family:var(--font-playfair)]">
                                  {stat.value}
                                </p>
                              )}
                            </div>
                            
                            {/* Description */}
                            {stat.description && (
                              <p className="text-white/60 text-sm mt-1 [font-family:var(--font-inter)]">
                                {stat.description}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-20" />
    </section>
  );
};