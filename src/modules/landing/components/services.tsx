"use client";

import React from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { 
  ArrowRight,
  Heart,
  Star,
  Gift,
  Coffee,
  Cake,
  Cookie,
  IceCream,
  ChefHat,
  Sparkles,
  Crown,
  Gem,
  GraduationCap,
  Baby,
  Store,
  PartyPopper,
  Palette,
  Users,
  Utensils,
  Calendar
} from "lucide-react";
import type { ServiceSection, FeaturedService } from "@/types/strapi";

interface ServicesProps {
  serviceSection?: ServiceSection;
}

// Icon mapping function
const getServiceIcon = (iconName: string) => {
  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    heart: Heart,
    star: Star,
    gift: Gift,
    coffee: Coffee,
    cake: Cake,
    cookie: Cookie,
    icecream: IceCream,
    chef: ChefHat,
    chefhat: ChefHat,
    sparkles: Sparkles,
    crown: Crown,
    gem: Gem,
    graduationcap: GraduationCap,
    baby: Baby,
    store: Store,
    partypopper: PartyPopper,
    palette: Palette,
    users: Users,
    utensils: Utensils,
    calendar: Calendar,
  };
  
  return iconMap[iconName.toLowerCase()] || Star;
};

export const Services: React.FC<ServicesProps> = ({ serviceSection }) => {
  // Don't render if no service section data
  if (!serviceSection || !serviceSection.featuredServices?.length) {
    return null;
  }

  const { sectionTitle, featuredServices } = serviceSection;

  return (
    <section className="relative py-20 sm:py-24 lg:py-32 overflow-hidden bg-gradient-to-b from-amber-50/30 via-white to-amber-50/20">
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
        }}
      />
      
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        {sectionTitle && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16 sm:mb-20"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-amber-900 [font-family:var(--font-playfair)] mb-4">
              {sectionTitle}
            </h2>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto"></div>
          </motion.div>
        )}

        {/* Services Grid - Responsive masonry layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {featuredServices.map((service: FeaturedService, index: number) => {
            const IconComponent = getServiceIcon(service.iconName);
            
            return (
              <motion.div
                key={`${service.href}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`group relative ${service.gridClass || 'col-span-1'}`}
              >
                <Link
                  href={service.href}
                  className="block h-full"
                >
                  <div className="relative h-full bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-amber-100/50 hover:border-amber-200/70 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/10 overflow-hidden group-hover:scale-[1.02] transform">
                    {/* Service card background gradient */}
                    <div 
                      className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500"
                      style={{
                        background: `linear-gradient(135deg, ${service.accentColor}20 0%, transparent 50%, ${service.accentColor}10 100%)`
                      }}
                    />
                    
                    {/* Service image background if provided */}
                    {service.image && (
                      <div className="absolute top-4 right-4 w-16 h-16 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-500 overflow-hidden">
                        <div 
                          className="w-full h-full bg-cover bg-center"
                          style={{ backgroundImage: `url(${service.image})` }}
                        />
                      </div>
                    )}

                    <div className="relative z-10 p-6 sm:p-8 h-full flex flex-col">
                      {/* Icon */}
                      <div className="mb-6">
                        <div 
                          className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl transition-all duration-500 group-hover:scale-110"
                          style={{ 
                            backgroundColor: `${service.accentColor}15`,
                            border: `2px solid ${service.accentColor}30`
                          }}
                        >
                          <div style={{ color: service.accentColor }}>
                            <IconComponent className="w-7 h-7 sm:w-8 sm:h-8 transition-colors duration-500" />
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <h3 className="text-xl sm:text-2xl font-light text-amber-900 [font-family:var(--font-playfair)] mb-3 group-hover:text-amber-800 transition-colors duration-300">
                          {service.title}
                        </h3>
                        <p className="text-amber-800/70 text-sm sm:text-base leading-relaxed [font-family:var(--font-inter)] mb-6">
                          {service.description}
                        </p>
                      </div>

                      {/* CTA Button */}
                      {service.buttonText && (
                        <div 
                          className="flex items-center text-sm font-medium group-hover:gap-2 transition-all duration-300" 
                          style={{ color: service.accentColor }}
                        >
                          <span className="group-hover:translate-x-1 transition-transform duration-300">
                            {service.buttonText}
                          </span>
                          <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                        </div>
                      )}
                    </div>

                    {/* Hover effect overlay */}
                    <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-white/0 via-transparent to-amber-50/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom decorative element */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex justify-center mt-16 sm:mt-20"
        >
          <div className="flex items-center gap-2 text-amber-600/40">
            <div className="w-2 h-2 rounded-full bg-amber-400/30"></div>
            <div className="w-3 h-3 rounded-full bg-amber-400/50"></div>
            <Sparkles className="w-4 h-4" />
            <div className="w-3 h-3 rounded-full bg-amber-400/50"></div>
            <div className="w-2 h-2 rounded-full bg-amber-400/30"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};