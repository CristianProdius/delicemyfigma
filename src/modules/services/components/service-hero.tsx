"use client";

import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Clock, Users, Star } from "lucide-react";
import { getStrapiMediaUrl } from "@/lib/strapi";
import type { Service } from "@/types/strapi";

interface ServiceHeroProps {
  service: Service;
}

export const ServiceHero = ({ service }: ServiceHeroProps) => {
  const imageUrl = getStrapiMediaUrl(service.heroImage);

  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      {imageUrl && (
        <div className="absolute inset-0 z-0">
          <Image
            src={imageUrl}
            alt={service.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        {/* Breadcrumbs */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 text-white/80 mb-8 [font-family:var(--font-inter)]"
        >
          {service.breadcrumbHome && (
            <>
              <Link href="/" className="hover:text-white transition-colors">
                {service.breadcrumbHome}
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

        {/* Title and Description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white mb-6 [font-family:var(--font-playfair)]">
            {service.title}
          </h1>
          
          {service.shortDescription && (
            <p className="text-lg sm:text-xl text-white/90 mb-8 [font-family:var(--font-inter)]">
              {service.shortDescription}
            </p>
          )}

          {/* Meta Info */}
          <div className="flex flex-wrap justify-center gap-6 text-white/80">
            {service.duration && (
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span className="[font-family:var(--font-inter)]">{service.duration}</span>
              </div>
            )}
            
            {service.groupSize && (
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span className="[font-family:var(--font-inter)]">{service.groupSize}</span>
              </div>
            )}
            
            {service.price && (
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5" />
                <span className="[font-family:var(--font-inter)]">From {service.price}</span>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};