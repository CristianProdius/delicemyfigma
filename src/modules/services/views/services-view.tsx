// src/modules/services/views/services-view.tsx
"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import {
  ArrowRight,
  ChevronRight,
  Sparkles,
  Clock,
  Users,
  DollarSign,
  Home,
} from "lucide-react";
import { servicesContent, type Service } from "../data/services-content";
import { Button } from "@/components/ui/button";

// Icon mapping for service icons (since we can't import dynamically from lucide-react)
const iconMap: { [key: string]: any } = {
  Users: Users,
  Sparkles: Sparkles,
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

// Breadcrumbs Component
const Breadcrumbs = () => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center space-x-2 text-sm mb-8"
    >
      <Link
        href="/"
        className="flex items-center text-[#451C15]/60 hover:text-[#451C15] transition-colors"
      >
        <Home className="w-4 h-4 mr-1" />
        <span>Home</span>
      </Link>
      <ChevronRight className="w-4 h-4 text-[#451C15]/40" />
      <span className="text-[#451C15] font-medium">Services</span>
    </motion.nav>
  );
};

// Service Card Component
interface ServiceCardProps {
  service: Service;
  index: number;
}

const ServiceCard = ({ service, index }: ServiceCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = iconMap[service.icon] || Users;

  // Parse pricing for display
  const getPriceDisplay = () => {
    if (!service.pricing) return null;

    switch (service.pricing.type) {
      case "fixed":
        return `$${service.pricing.amount}`;
      case "range":
        return `$${service.pricing.minAmount}-${service.pricing.maxAmount}`;
      case "package":
        const prices = service.pricing.packages?.map((p) => p.price) || [];
        return prices.length > 0
          ? `From $${Math.min(...prices)}`
          : "Various packages";
      case "custom":
        return "Custom pricing";
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative h-full"
    >
      <Link href={`/services/${service.id}`} className="block h-full">
        <div className="relative h-full bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-[#451C15]/5">
          {/* Gradient border effect on hover */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl sm:rounded-3xl"
            style={{
              background: `linear-gradient(135deg, ${service.accentColor}20 0%, transparent 50%, ${service.accentColor}20 100%)`,
            }}
          />

          {/* Image Container */}
          <div className="relative h-48 sm:h-56 lg:h-64 overflow-hidden">
            <Image
              src={service.heroImage}
              alt={service.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />

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
                  backgroundColor: `${service.accentColor}15`,
                  borderColor: `${service.accentColor}30`,
                  borderWidth: "1px",
                  borderStyle: "solid",
                }}
              >
                <Icon
                  className="w-6 h-6"
                  style={{ color: service.accentColor }}
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
              {service.title}
            </h3>

            {/* Description */}
            <p className="text-sm sm:text-base text-[#451C15]/60 mb-6 leading-relaxed font-light [font-family:var(--font-inter)] line-clamp-3">
              {service.shortDescription}
            </p>

            {/* Meta Info */}
            <div className="flex flex-wrap gap-4 mb-6 text-xs sm:text-sm text-[#451C15]/50">
              {service.duration && (
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  <span>{service.duration}</span>
                </div>
              )}
              {service.groupSize && (
                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4" />
                  <span>{service.groupSize}</span>
                </div>
              )}
            </div>

            {/* CTA Button */}
            <motion.div
              className="flex items-center justify-between"
              animate={isHovered ? { x: 5 } : { x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-base font-light text-[#451C15] group-hover:text-[#A67B5B] transition-colors duration-300 [font-family:var(--font-inter)]">
                Learn More
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
          </div>

          {/* Decorative Corner Accent */}
          <div
            className="absolute bottom-0 right-0 w-24 h-24 opacity-10 group-hover:opacity-20 transition-opacity duration-500"
            style={{
              background: `radial-gradient(circle at bottom right, ${service.accentColor} 0%, transparent 70%)`,
            }}
          />
        </div>
      </Link>
    </motion.div>
  );
};

export const ServicesView = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <main ref={containerRef} className="min-h-screen relative">
      {/* Hero Section with Glassmorphism */}
      <section className="relative overflow-hidden">
        {/* Animated Background */}
        <motion.div style={{ y: backgroundY }} className="absolute inset-0 z-0">
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#FFF9F5] via-white to-[#F8F5F0]" />

          {/* Decorative Blobs */}
          <motion.div
            className="absolute top-20 left-1/4 w-96 h-96 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(212, 165, 116, 0.15) 0%, transparent 70%)",
              filter: "blur(80px)",
            }}
            animate={{
              x: [0, 50, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-0 right-1/3 w-80 h-80 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(232, 180, 184, 0.15) 0%, transparent 70%)",
              filter: "blur(60px)",
            }}
            animate={{
              x: [0, -30, 0],
              y: [0, 50, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* Noise Texture Overlay */}
        <div
          className="absolute inset-0 opacity-[0.02] z-[1]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.5'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Hero Content */}
        <div className="relative z-10 px-4 sm:px-6 lg:px-8 pt-24 pb-16 sm:pt-32 sm:pb-20 lg:pt-40 lg:pb-24 max-w-[95%] xl:max-w-[90%] mx-auto">
          <Breadcrumbs />

          {/* Title Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16"
          >
            {/* Decorative Element */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
              className="inline-flex items-center gap-3 mb-6"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-5 h-5 text-[#D4A574]" />
              </motion.div>
              <span className="text-[#451C15]/70 text-sm font-light tracking-[0.2em] uppercase [font-family:var(--font-inter)]">
                Artisan Excellence
              </span>
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-5 h-5 text-[#D4A574]" />
              </motion.div>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-[#451C15] mb-6 [font-family:var(--font-playfair)]"
            >
              Our Services
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-lg sm:text-xl lg:text-2xl text-[#451C15]/60 max-w-3xl mx-auto font-light leading-relaxed [font-family:var(--font-inter)]"
            >
              From intimate chocolate classes to grand corporate events,
              discover how we can bring the magic of artisan chocolate to your
              world
            </motion.p>

            {/* Decorative Line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mt-8 h-[1px] bg-gradient-to-r from-transparent via-[#D4A574]/50 to-transparent max-w-xs mx-auto"
            />
          </motion.div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-8 pb-20 sm:pb-24 lg:pb-32 max-w-[95%] xl:max-w-[90%] mx-auto">
        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {servicesContent.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 sm:mt-20 lg:mt-24 text-center"
        >
          <div className="bg-gradient-to-br from-[#451C15]/5 to-[#D4A574]/5 backdrop-blur-sm rounded-3xl p-8 sm:p-12 lg:p-16 border border-[#451C15]/10 max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-[#451C15] mb-4 [font-family:var(--font-playfair)]">
              Can't Find What You're Looking For?
            </h2>
            <p className="text-[#451C15]/60 text-base sm:text-lg mb-8 max-w-2xl mx-auto font-light [font-family:var(--font-inter)]">
              We love creating custom experiences tailored to your unique needs.
              Let's discuss how we can make your chocolate dreams come true.
            </p>
            <Button
              size="lg"
              className="bg-[#451C15] text-[#E0D9C9] hover:bg-[#5A241C] rounded-full px-8 py-6 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 [font-family:var(--font-inter)]"
            >
              <span className="flex items-center gap-2">
                Contact Us
                <ArrowRight className="w-5 h-5" />
              </span>
            </Button>
          </div>
        </motion.div>

        {/* Decorative Bottom Element */}
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
      </section>
    </main>
  );
};
