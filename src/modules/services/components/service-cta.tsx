"use client";

import { motion } from "motion/react";
import { ArrowRight, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Service } from "@/types/strapi";
import Image from "next/image";
import { getStrapiMediaUrl } from "@/lib/strapi";
import { renderBlocks } from "@/lib/strapi-blocks";
import Link from "next/link";

interface ServiceCTAProps {
  service: Service;
}

export const ServiceCTA = ({ service }: ServiceCTAProps) => {
  // Return null if no CTA section data
  if (!service.serviceCta) {
    return null;
  }

  const { ctaHeader, mainContent, ctaButtons, contactInfo, mascot } = service.serviceCta;

  // Return null if no content to show
  if (!ctaHeader && !mainContent && !ctaButtons) {
    return null;
  }

  const mascotImageUrl = mascot?.mascotImage ? getStrapiMediaUrl(mascot.mascotImage) : null;

  return (
    <section className="relative py-20 sm:py-24 lg:py-32 overflow-hidden bg-gradient-to-br from-[#451C15] to-[#5A241C]">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4A574' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Badge */}
            {mainContent?.badgeText && (
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <Sparkles className="w-4 h-4 text-[#D4A574]" />
                <span className="text-white/90 text-sm font-medium [font-family:var(--font-inter)]">
                  {mainContent.badgeText}
                </span>
              </div>
            )}

            {/* Header */}
            {ctaHeader && (
              <>
                {ctaHeader.subtitle && (
                  <span className="text-[#D4A574] text-xs font-medium tracking-[0.3em] uppercase mb-4 block [font-family:var(--font-inter)]">
                    {ctaHeader.subtitle}
                  </span>
                )}
                {ctaHeader.title && (
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-6 [font-family:var(--font-playfair)]">
                    {ctaHeader.title}
                  </h2>
                )}
              </>
            )}

            {/* Description */}
            {mainContent?.description && (
              <div className="text-lg text-white/80 mb-8 [font-family:var(--font-inter)]" 
                dangerouslySetInnerHTML={{ __html: renderBlocks(mainContent.description) }} 
              />
            )}

            {/* Stats */}
            {mainContent?.stats && Array.isArray(mainContent.stats) && mainContent.stats.length > 0 && (
              <div className="flex flex-wrap gap-6 mb-8">
                {mainContent.stats.map((stat: string, index: number) => (
                  <div key={index} className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-[#D4A574]" />
                    <span className="text-white [font-family:var(--font-inter)]">
                      {stat}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Highlights */}
            {mainContent?.highlights && Array.isArray(mainContent.highlights) && mainContent.highlights.length > 0 && (
              <div className="grid grid-cols-2 gap-3 mb-8">
                {mainContent.highlights.map((highlight: string, index: number) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#D4A574]/60 rounded-full" />
                    <span className="text-sm text-white/90 [font-family:var(--font-inter)]">
                      {highlight}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* CTA Buttons */}
            {ctaButtons && (
              <div className="flex flex-wrap gap-4">
                {ctaButtons.primaryButtonText && (
                  <Link href={ctaButtons.primaryButtonUrl || '#'}>
                    <Button
                      size="lg"
                      className="bg-[#D4A574] text-[#451C15] hover:bg-[#c4966a] rounded-full px-8 py-6 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 [font-family:var(--font-inter)]"
                    >
                      {ctaButtons.primaryButtonText}
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                )}
                {ctaButtons.secondaryButtonText && (
                  <Link href={ctaButtons.secondaryButtonUrl || '#'}>
                    <Button
                      size="lg"
                      variant="outline"
                      className="bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20 rounded-full px-8 py-6 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 [font-family:var(--font-inter)]"
                    >
                      {ctaButtons.secondaryButtonText}
                    </Button>
                  </Link>
                )}
              </div>
            )}

            {/* Contact Info */}
            {contactInfo && (contactInfo.email || contactInfo.phone || contactInfo.address) && (
              <div className="mt-8 space-y-2 text-white/80 text-sm [font-family:var(--font-inter)]">
                {contactInfo.email && (
                  <p>✉️ {contactInfo.email}</p>
                )}
                {contactInfo.phone && (
                  <p>📞 {contactInfo.phone}</p>
                )}
                {contactInfo.address && (
                  <p>📍 {contactInfo.address}</p>
                )}
              </div>
            )}
          </motion.div>

          {/* Right Column - Mascot or Decorative Element */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            {mascotImageUrl ? (
              <div className="relative">
                {/* Mascot Quote */}
                {mascot?.mascotQuote && (
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white rounded-2xl p-4 shadow-xl max-w-xs z-10">
                    <p className="text-[#451C15] text-sm italic [font-family:var(--font-inter)]">
                      &ldquo;{mascot.mascotQuote}&rdquo;
                    </p>
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-2 w-4 h-4 bg-white rotate-45" />
                  </div>
                )}
                
                {/* Mascot Image */}
                <div className="relative w-full max-w-md mx-auto">
                  <Image
                    src={mascotImageUrl}
                    alt={mascot?.mascotQuote || "Mascot"}
                    width={400}
                    height={400}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            ) : mascot?.showDecorative !== false ? (
              /* Decorative Stars */
              <div className="relative h-[400px] flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0"
                >
                  <Sparkles className="absolute top-0 left-1/4 w-8 h-8 text-[#D4A574]/40" />
                  <Star className="absolute top-1/4 right-0 w-6 h-6 text-[#D4A574]/30" />
                  <Sparkles className="absolute bottom-1/4 left-0 w-10 h-10 text-[#D4A574]/50" />
                  <Star className="absolute bottom-0 right-1/4 w-7 h-7 text-[#D4A574]/40" />
                </motion.div>
                <div className="w-48 h-48 bg-gradient-to-br from-[#D4A574]/20 to-[#D4A574]/10 rounded-full blur-3xl" />
              </div>
            ) : null}
          </motion.div>
        </div>
      </div>
    </section>
  );
};