"use client";

import React from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { 
  Sparkles,
  Heart,
  Star,
  Gift,
  Coffee,
  Cake,
  Cookie,
  IceCream,
  ChefHat,
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
import type { AboutSection } from "@/types/strapi";
import { getStrapiMediaUrl } from "@/lib/strapi";

interface AboutMeProps {
  aboutSection?: AboutSection;
}

// Icon mapping function
const getAboutIcon = (iconName: string) => {
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

export const AboutMe: React.FC<AboutMeProps> = ({ aboutSection }) => {
  // React hooks must be called before any early returns
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const textY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  // Don't render if no about section data
  if (!aboutSection) {
    return null;
  }

  const {
    sectionLabel = "About",
    sectionTitle = "The Artisan",
    ownerName,
    ownerTitle,
    ownerSubtitle,
    ownerHighlight,
    ownerQuote,
    ownerImage,
    stats = [],
    keyPoints = [],
    ctaText = "Discover My Journey",
    ctaUrl = "/about"
  } = aboutSection;

  const ownerImageUrl = getStrapiMediaUrl(ownerImage);

  return (
    <section
      ref={containerRef}
      className="relative w-full py-20 overflow-hidden bg-gradient-to-b from-amber-50/30 via-white to-amber-50/20"
    >
      <div className="relative px-6 sm:px-8 lg:px-12 xl:px-16 max-w-7xl mx-auto">
        {/* Elegant section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
          viewport={{ once: true }}
          className="text-center mb-16 lg:mb-20"
        >
          <span className="inline-block text-sm lg:text-base text-[#451C15]/70 tracking-[0.3em] uppercase font-medium mb-4 [font-family:var(--font-inter)]">
            {sectionLabel}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-[#451C15] [font-family:var(--font-playfair)]">
            {sectionTitle}
          </h2>
          <motion.div
            className="mt-6 h-[1px] bg-gradient-to-r from-transparent via-[#451C15]/20 to-transparent max-w-xs mx-auto"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: true }}
          />
        </motion.div>

        {/* Main content grid - 60/40 split */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 xl:gap-20 items-start">
          {/* Left: Large Image - 60% */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
            viewport={{ once: true }}
            className="relative lg:col-span-3"
          >
            {/* Image container with premium effects */}
            <div className="relative">
              <motion.div
                style={{ y: imageY }}
                className="relative z-10 rounded-2xl lg:rounded-3xl overflow-hidden"
              >
                {/* Image gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#451C15]/10 via-transparent to-transparent z-10" />

                {/* Main image - larger and more prominent */}
                {ownerImageUrl && (
                  <Image
                    src={ownerImageUrl}
                    alt={ownerName}
                    width={900}
                    height={1200}
                    className="w-full h-[600px] lg:h-[750px] xl:h-[900px] object-cover"
                    priority
                  />
                )}

                {/* Floating accent */}
                <motion.div
                  className="absolute -top-10 -right-10 w-40 h-40 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(224, 217, 201, 0.3) 0%, transparent 70%)",
                    filter: "blur(40px)",
                  }}
                  animate={{
                    scale: [1, 1.3, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>

              {/* Stats overlay - positioned better for larger image */}
              {stats && stats.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="absolute -bottom-6 left-4 right-4 sm:left-8 sm:right-8 z-20"
                >
                  <div className="bg-white/95 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-2xl border border-[#E0D9C9]/10">
                    <div className={`grid gap-4 ${stats.length === 3 ? 'grid-cols-3' : stats.length === 2 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                      {stats.map((stat, index) => (
                        <motion.div
                          key={`${stat.number}-${stat.label}-${index}`}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                          viewport={{ once: true }}
                          className="text-center"
                        >
                          <div className="text-xl sm:text-2xl lg:text-3xl font-medium text-[#451C15] [font-family:var(--font-inter)]">
                            {stat.number}
                          </div>
                          <div className="text-xs sm:text-sm text-[#451C15]/70 mt-1 font-medium [font-family:var(--font-inter)]">
                            {stat.label}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Right: Content - 40% with better balance */}
          <motion.div
            style={{ y: textY }}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
            viewport={{ once: true }}
            className="relative lg:col-span-2 lg:pl-4 flex flex-col justify-center space-y-6"
          >
            {/* Name and title - more compact */}
            <div>
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-3xl lg:text-4xl xl:text-5xl font-normal text-[#451C15] mb-2 [font-family:var(--font-playfair)]"
              >
                {ownerName}
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-base lg:text-lg text-[#451C15]/80 font-normal [font-family:var(--font-inter)]"
              >
                {ownerTitle}{ownerSubtitle && ` • ${ownerSubtitle}`}
              </motion.p>
              {ownerHighlight && (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="text-sm lg:text-base text-[#451C15]/60 font-normal mt-2 [font-family:var(--font-inter)]"
                >
                  {ownerHighlight}
                </motion.p>
              )}
            </div>

            {/* Quote section - more compact */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -left-3 top-0 text-3xl lg:text-4xl text-[#451C15]/10 [font-family:var(--font-playfair)]">
                &quot;
              </div>
              <blockquote className="relative z-10 pl-6">
                <p className="text-lg lg:text-xl font-normal italic text-[#451C15] leading-relaxed [font-family:var(--font-playfair)]">
                  {ownerQuote}
                </p>
              </blockquote>
            </motion.div>

            {/* Key points - more compact and organized */}
            {keyPoints && keyPoints.length > 0 && (
              <div className="space-y-4">
                {keyPoints.map((point, index) => {
                  const IconComponent = getAboutIcon(point.icon);
                  return (
                    <motion.div
                      key={`${point.title}-${point.icon}-${index}`}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                      viewport={{ once: true }}
                      className="flex gap-3 group"
                    >
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#451C15]/10 flex items-center justify-center group-hover:bg-[#451C15]/20 transition-colors duration-300">
                        <IconComponent className="w-5 h-5 text-[#451C15]" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-base font-medium text-[#451C15] mb-1 [font-family:var(--font-inter)]">
                          {point.title}
                        </h4>
                        <p className="text-sm text-[#451C15]/70 font-normal leading-relaxed [font-family:var(--font-inter)]">
                          {point.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}

            {/* CTA Button - more proportional */}
            {ctaText && ctaUrl && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Link href={ctaUrl} className="group relative inline-block">
                  <button className="group relative px-6 py-3 bg-[#451C15] text-[#E0D9C9] rounded-full overflow-hidden transition-all duration-300 hover:shadow-2xl">
                    <span className="relative z-10 flex items-center gap-3 text-base font-normal [font-family:var(--font-inter)]">
                      {ctaText}
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        →
                      </motion.span>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#5A241C] to-[#451C15] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </button>
                </Link>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Decorative bottom element */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 flex justify-center"
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