// src/modules/services/views/service-detail-view.tsx
"use client";

import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import {
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  Home,
  Clock,
  Users,
  MapPin,
  Check,
  Star,
  Quote,
  Sparkles,
  Award,
  BookOpen,
  Briefcase,
  Heart,
  Coffee,
  Plus,
  Minus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type {
  Service,
  ServiceFeature,
  ServiceTestimonial,
  ServiceFAQ,
} from "../data/services-content";
import React from "react";

// Icon mapping
const iconMap: { [key: string]: any } = {
  GraduationCap: () => (
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
      <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
      <path d="M22 10v6" />
      <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
    </svg>
  ),
  BookOpen,
  Briefcase,
  Award,
  Users,
  Coffee,
  Heart,
  Sparkles,
  Clock,
  Star,
  CheckCircle: Check,
  Trophy: Award,
  Smile: () => (
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
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <line x1="9" x2="9.01" y1="9" y2="9" />
      <line x1="15" x2="15.01" y1="9" y2="9" />
    </svg>
  ),
  ChefHat: () => (
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
      <path d="M17 21a1 1 0 0 0 1-1v-5.35c0-.457.316-.844.727-1.041a4 4 0 0 0-2.134-7.589 5 5 0 0 0-9.186 0 4 4 0 0 0-2.134 7.588c.411.198.727.585.727 1.041V20a1 1 0 0 0 1 1Z" />
      <path d="M6 17h12" />
    </svg>
  ),
  TrendingUp: () => (
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
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  ),
  Truck: () => (
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
      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
      <path d="M15 18H9" />
      <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
      <circle cx="17" cy="18" r="2" />
      <circle cx="7" cy="18" r="2" />
    </svg>
  ),
  Calendar: () => (
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
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  ),
  Zap: () => (
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
      <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
    </svg>
  ),
  Target: () => (
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
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
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
  Sparkle: Sparkles,
};

interface ServiceDetailViewProps {
  service: Service;
}

// Breadcrumbs Component
const Breadcrumbs = ({ serviceName }: { serviceName: string }) => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center space-x-2 text-sm mb-8"
    >
      <Link
        href="/"
        className="flex items-center text-white/60 hover:text-white transition-colors"
      >
        <Home className="w-4 h-4 mr-1" />
        <span>Home</span>
      </Link>
      <ChevronRight className="w-4 h-4 text-white/40" />
      <Link
        href="/services"
        className="text-white/60 hover:text-white transition-colors"
      >
        Services
      </Link>
      <ChevronRight className="w-4 h-4 text-white/40" />
      <span className="text-white font-medium">{serviceName}</span>
    </motion.nav>
  );
};

// Feature Card Component
const FeatureCard = ({
  feature,
  index,
  accentColor,
}: {
  feature: ServiceFeature;
  index: number;
  accentColor: string;
}) => {
  const IconComponent = iconMap[feature.icon] || Award;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="group"
    >
      <Card className="relative h-full bg-white/95 backdrop-blur-sm border border-[#451C15]/10 p-6 rounded-2xl hover:shadow-xl transition-all duration-300 overflow-hidden">
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(135deg, ${accentColor}10 0%, transparent 50%)`,
          }}
        />

        <div className="relative z-10">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
            style={{
              backgroundColor: `${accentColor}15`,
              borderColor: `${accentColor}30`,
              borderWidth: "1px",
              borderStyle: "solid",
            }}
          >
            <IconComponent className="w-7 h-7" style={{ color: accentColor }} />
          </div>

          <h4 className="text-lg font-medium text-[#451C15] mb-2 [font-family:var(--font-inter)]">
            {feature.title}
          </h4>

          <p className="text-sm text-[#451C15]/60 leading-relaxed [font-family:var(--font-inter)]">
            {feature.description}
          </p>
        </div>
      </Card>
    </motion.div>
  );
};

// Pricing Card Component
const PricingCard = ({
  pkg,
  index,
  accentColor,
}: {
  pkg: any;
  index: number;
  accentColor: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className={cn("relative group", pkg.highlighted && "lg:scale-105")}
    >
      <Card
        className={cn(
          "relative h-full bg-white/95 backdrop-blur-sm border p-8 rounded-3xl transition-all duration-300 overflow-hidden",
          pkg.highlighted ? "border-2" : "border-[#451C15]/10"
        )}
        style={{
          borderColor: pkg.highlighted ? accentColor : undefined,
        }}
      >
        {pkg.highlighted && (
          <div
            className="absolute -top-px left-1/2 -translate-x-1/2 px-4 py-1 rounded-b-xl text-xs font-medium text-white"
            style={{ backgroundColor: accentColor }}
          >
            MOST POPULAR
          </div>
        )}

        <div className="text-center mb-6">
          <h4 className="text-2xl font-light text-[#451C15] mb-2 [font-family:var(--font-playfair)]">
            {pkg.name}
          </h4>
          <div className="flex items-baseline justify-center gap-1">
            <span className="text-3xl font-light text-[#451C15]">$</span>
            <span className="text-5xl font-light text-[#451C15]">
              {pkg.price}
            </span>
          </div>
        </div>

        <ul className="space-y-3 mb-8">
          {pkg.features.map((feature: string, i: number) => (
            <li key={i} className="flex items-start gap-3">
              <Check
                className="w-5 h-5 flex-shrink-0 mt-0.5"
                style={{ color: accentColor }}
              />
              <span className="text-sm text-[#451C15]/70 [font-family:var(--font-inter)]">
                {feature}
              </span>
            </li>
          ))}
        </ul>

        <Button
          className={cn(
            "w-full rounded-full py-6 text-base font-medium transition-all duration-300",
            pkg.highlighted
              ? "bg-gradient-to-r from-[#451C15] to-[#5A241C] text-[#E0D9C9] hover:shadow-xl"
              : "bg-[#451C15]/10 text-[#451C15] hover:bg-[#451C15]/20"
          )}
        >
          Choose {pkg.name}
        </Button>
      </Card>
    </motion.div>
  );
};

// Testimonial Card Component
const TestimonialCard = ({
  testimonial,
  isActive,
}: {
  testimonial: ServiceTestimonial;
  isActive: boolean;
}) => {
  return (
    <motion.div
      animate={{
        opacity: isActive ? 1 : 0.5,
        scale: isActive ? 1 : 0.95,
      }}
      transition={{ duration: 0.5 }}
      className="px-4"
    >
      <Card className="bg-white/95 backdrop-blur-sm border border-[#451C15]/10 p-8 lg:p-12 rounded-3xl">
        <div className="flex flex-col items-center text-center">
          <Quote className="w-10 h-10 text-[#D4A574]/30 mb-6" />

          <div className="flex gap-1 mb-6">
            {[...Array(testimonial.rating)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-[#D4A574] text-[#D4A574]" />
            ))}
          </div>

          <p className="text-lg lg:text-xl text-[#451C15]/80 mb-8 leading-relaxed italic [font-family:var(--font-playfair)]">
            "{testimonial.content}"
          </p>

          <div>
            <p className="font-medium text-[#451C15] [font-family:var(--font-inter)]">
              {testimonial.name}
            </p>
            {testimonial.role && (
              <p className="text-sm text-[#451C15]/60 [font-family:var(--font-inter)]">
                {testimonial.role}
                {testimonial.company && `, ${testimonial.company}`}
              </p>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

// FAQ Item Component
const FAQItem = ({
  faq,
  index,
  accentColor,
}: {
  faq: ServiceFAQ;
  index: number;
  accentColor: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="border-b border-[#451C15]/10 last:border-0"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left hover:text-[#A67B5B] transition-colors duration-300"
      >
        <h4 className="text-lg font-medium text-[#451C15] pr-8 [font-family:var(--font-inter)]">
          {faq.question}
        </h4>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0"
        >
          {isOpen ? (
            <Minus className="w-5 h-5" style={{ color: accentColor }} />
          ) : (
            <Plus className="w-5 h-5 text-[#451C15]/60" />
          )}
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-[#451C15]/60 leading-relaxed [font-family:var(--font-inter)]">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const ServiceDetailView = ({ service }: ServiceDetailViewProps) => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeGalleryImage, setActiveGalleryImage] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);

  // Parse pricing for display
  const getPriceDisplay = () => {
    if (!service.pricing) return null;

    switch (service.pricing.type) {
      case "fixed":
        return `${service.pricing.currency}${service.pricing.amount}`;
      case "range":
        return `${service.pricing.currency}${service.pricing.minAmount}-${
          service.pricing.maxAmount
        } ${service.pricing.unit || ""}`;
      case "package":
        return "Multiple packages available";
      case "custom":
        return "Custom pricing";
      default:
        return null;
    }
  };

  return (
    <main ref={containerRef} className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] sm:h-[70vh] lg:h-[80vh] overflow-hidden">
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0"
        >
          <Image
            src={service.heroImage}
            alt={service.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/60 to-black/80" />
        </motion.div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex flex-col justify-end px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 lg:pb-20 max-w-[95%] xl:max-w-[90%] mx-auto">
          <Breadcrumbs serviceName={service.title} />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="p-3 rounded-2xl bg-white/10 backdrop-blur-md"
                style={{
                  borderColor: `${service.accentColor}50`,
                  borderWidth: "1px",
                  borderStyle: "solid",
                }}
              >
                {iconMap[service.icon] && (
                  <div className="w-8 h-8 text-white">
                    {React.createElement(iconMap[service.icon])}
                  </div>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap items-center gap-4 text-white/80 text-sm"
              >
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
                {service.location && (
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" />
                    <span>{service.location}</span>
                  </div>
                )}
              </motion.div>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light text-white mb-4 [font-family:var(--font-playfair)]">
              {service.title}
            </h1>

            <p className="text-lg sm:text-xl lg:text-2xl text-white/80 max-w-3xl font-light [font-family:var(--font-inter)]">
              {service.shortDescription}
            </p>

            {getPriceDisplay() && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-6 inline-block"
              >
                <div className="px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                  <span className="text-white font-light text-lg">
                    {getPriceDisplay()}
                  </span>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 max-w-[95%] xl:max-w-[90%] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#451C15] mb-8 [font-family:var(--font-playfair)]">
              About This Service
            </h2>
            <p className="text-lg text-[#451C15]/70 leading-relaxed mb-8 [font-family:var(--font-inter)]">
              {service.longDescription}
            </p>

            {/* Benefits List */}
            {service.benefits && service.benefits.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-medium text-[#451C15] mb-4 [font-family:var(--font-inter)]">
                  Key Benefits
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.benefits.slice(0, 6).map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-3"
                    >
                      <Check
                        className="w-5 h-5 flex-shrink-0 mt-0.5"
                        style={{ color: service.accentColor }}
                      />
                      <span className="text-sm text-[#451C15]/60 [font-family:var(--font-inter)]">
                        {benefit}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Sidebar Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gradient-to-br from-white/95 to-[#FFF9F5]/95 backdrop-blur-sm border border-[#451C15]/10 p-6 rounded-3xl sticky top-24">
              <h3 className="text-xl font-medium text-[#451C15] mb-6 [font-family:var(--font-inter)]">
                Quick Information
              </h3>

              <div className="space-y-4">
                {service.targetAudience && (
                  <div>
                    <h4 className="text-sm font-medium text-[#451C15] mb-2 [font-family:var(--font-inter)]">
                      Perfect For
                    </h4>
                    <ul className="space-y-1">
                      {service.targetAudience
                        .slice(0, 3)
                        .map((audience, index) => (
                          <li
                            key={index}
                            className="text-sm text-[#451C15]/60 [font-family:var(--font-inter)]"
                          >
                            • {audience}
                          </li>
                        ))}
                    </ul>
                  </div>
                )}

                {service.requirements && (
                  <div>
                    <h4 className="text-sm font-medium text-[#451C15] mb-2 [font-family:var(--font-inter)]">
                      Requirements
                    </h4>
                    <ul className="space-y-1">
                      {service.requirements.map((req, index) => (
                        <li
                          key={index}
                          className="text-sm text-[#451C15]/60 [font-family:var(--font-inter)]"
                        >
                          • {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {service.availability && (
                  <div>
                    <h4 className="text-sm font-medium text-[#451C15] mb-2 [font-family:var(--font-inter)]">
                      Availability
                    </h4>
                    <p className="text-sm text-[#451C15]/60 [font-family:var(--font-inter)]">
                      {service.availability}
                    </p>
                  </div>
                )}
              </div>

              <Button className="w-full mt-8 bg-[#451C15] text-[#E0D9C9] hover:bg-[#5A241C] rounded-full py-6 text-base shadow-xl hover:shadow-2xl transition-all duration-300">
                {service.ctaButtonText}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      {service.features && service.features.length > 0 && (
        <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-[#FFF9F5]">
          <div className="max-w-[95%] xl:max-w-[90%] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#451C15] mb-4 [font-family:var(--font-playfair)]">
                Service Features
              </h2>
              <p className="text-lg text-[#451C15]/60 max-w-2xl mx-auto [font-family:var(--font-inter)]">
                Everything included to make your experience exceptional
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {service.features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  feature={feature}
                  index={index}
                  accentColor={service.accentColor}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Pricing Section */}
      {service.pricing &&
        service.pricing.type === "package" &&
        service.pricing.packages && (
          <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-[95%] xl:max-w-[90%] mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#451C15] mb-4 [font-family:var(--font-playfair)]">
                  Choose Your Package
                </h2>
                <p className="text-lg text-[#451C15]/60 max-w-2xl mx-auto [font-family:var(--font-inter)]">
                  {service.pricing.note ||
                    "Select the perfect option for your needs"}
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {service.pricing.packages.map((pkg, index) => (
                  <PricingCard
                    key={index}
                    pkg={pkg}
                    index={index}
                    accentColor={service.accentColor}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

      {/* Photo Gallery */}
      {service.galleryImages && service.galleryImages.length > 0 && (
        <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#FFF9F5] to-white">
          <div className="max-w-[95%] xl:max-w-[90%] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#451C15] mb-4 [font-family:var(--font-playfair)]">
                Gallery
              </h2>
              <p className="text-lg text-[#451C15]/60 max-w-2xl mx-auto [font-family:var(--font-inter)]">
                A glimpse into the magic we create
              </p>
            </motion.div>

            {/* Main Gallery Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative h-[400px] sm:h-[500px] lg:h-[600px] rounded-3xl overflow-hidden mb-6"
            >
              <Image
                src={service.galleryImages[activeGalleryImage]}
                alt={`${service.title} gallery image ${activeGalleryImage + 1}`}
                fill
                className="object-cover"
              />

              {/* Navigation Arrows */}
              <button
                onClick={() =>
                  setActiveGalleryImage((prev) =>
                    prev === 0 ? service.galleryImages.length - 1 : prev - 1
                  )
                }
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-colors"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={() =>
                  setActiveGalleryImage((prev) =>
                    prev === service.galleryImages.length - 1 ? 0 : prev + 1
                  )
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-colors"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </motion.div>

            {/* Thumbnail Strip */}
            <div className="flex gap-4 overflow-x-auto scrollbar-hide">
              {service.galleryImages.map((image, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  onClick={() => setActiveGalleryImage(index)}
                  className={cn(
                    "relative flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32 rounded-xl overflow-hidden transition-all duration-300",
                    activeGalleryImage === index
                      ? "ring-2 ring-offset-2 scale-110"
                      : "opacity-70 hover:opacity-100",
                    activeGalleryImage === index && service.accentColor
                      ? `[--tw-ring-color:${service.accentColor}]`
                      : ""
                  )}
                >
                  <Image
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </motion.button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Carousel */}
      {service.testimonials && service.testimonials.length > 0 && (
        <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-[95%] xl:max-w-[90%] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#451C15] mb-4 [font-family:var(--font-playfair)]">
                What Our Clients Say
              </h2>
              <p className="text-lg text-[#451C15]/60 max-w-2xl mx-auto [font-family:var(--font-inter)]">
                Real experiences from real people
              </p>
            </motion.div>

            <div className="relative max-w-4xl mx-auto">
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{
                    transform: `translateX(-${activeTestimonial * 100}%)`,
                  }}
                >
                  {service.testimonials.map((testimonial, index) => (
                    <div key={index} className="w-full flex-shrink-0">
                      <TestimonialCard
                        testimonial={testimonial}
                        isActive={index === activeTestimonial}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Dots */}
              <div className="flex justify-center gap-2 mt-8">
                {service.testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={cn(
                      "w-2 h-2 rounded-full transition-all duration-300",
                      index === activeTestimonial
                        ? "w-8 bg-gradient-to-r from-[#451C15] to-[#A67B5B]"
                        : "bg-[#451C15]/20 hover:bg-[#451C15]/40"
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {service.faqs && service.faqs.length > 0 && (
        <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-[#FFF9F5]">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#451C15] mb-4 [font-family:var(--font-playfair)]">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-[#451C15]/60 max-w-2xl mx-auto [font-family:var(--font-inter)]">
                Everything you need to know about {service.title}
              </p>
            </motion.div>

            <Card className="bg-white/95 backdrop-blur-sm border border-[#451C15]/10 rounded-3xl p-8 lg:p-12">
              <div className="space-y-0">
                {service.faqs.map((faq, index) => (
                  <FAQItem
                    key={faq.id}
                    faq={faq}
                    index={index}
                    accentColor={service.accentColor}
                  />
                ))}
              </div>
            </Card>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#451C15] to-[#2A100B] relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 20% 50%, ${service.accentColor}40 0%, transparent 50%),
                               radial-gradient(circle at 80% 80%, ${service.accentColor}40 0%, transparent 50%)`,
            }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative z-10 max-w-4xl mx-auto text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 mb-8"
          >
            <Sparkles className="w-6 h-6 text-[#D4A574]" />
            <span className="text-[#E0D9C9]/80 text-sm font-light tracking-[0.2em] uppercase [font-family:var(--font-inter)]">
              Ready to Begin?
            </span>
            <Sparkles className="w-6 h-6 text-[#D4A574]" />
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-light text-[#E0D9C9] mb-6 [font-family:var(--font-playfair)]">
            {service.ctaText}
          </h2>

          <p className="text-lg sm:text-xl text-[#E0D9C9]/70 mb-10 max-w-2xl mx-auto font-light [font-family:var(--font-inter)]">
            Join hundreds of satisfied clients who have transformed their
            chocolate dreams into reality
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-[#E0D9C9] text-[#451C15] hover:bg-white rounded-full px-10 py-7 text-lg font-medium shadow-2xl hover:shadow-3xl transition-all duration-300 group"
            >
              <span>{service.ctaButtonText}</span>
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-2 border-[#E0D9C9]/30 text-[#E0D9C9] hover:bg-[#E0D9C9]/10 backdrop-blur-sm rounded-full px-10 py-7 text-lg"
            >
              Ask a Question
            </Button>
          </div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-12 flex flex-col sm:flex-row gap-6 justify-center text-[#E0D9C9]/60 text-sm"
          >
            <a
              href="tel:+373123456789"
              className="flex items-center gap-2 hover:text-[#E0D9C9] transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-[#E0D9C9]/10 flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
              <span>Mon-Sat: 10:00 - 18:00</span>
            </a>
            <a
              href="mailto:hello@delicemy.com"
              className="flex items-center gap-2 hover:text-[#E0D9C9] transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-[#E0D9C9]/10 flex items-center justify-center">
                <MapPin className="w-4 h-4" />
              </div>
              <span>Chisinau, Moldova</span>
            </a>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
};
