// src/modules/contact/components/contact-methods.tsx

"use client";

import React from "react";
import { motion } from "motion/react";
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Clock,
  Star,
  Sparkles,
  ArrowRight,
  LucideIcon
} from "lucide-react";

interface ContactMethod {
  id: string;
  icon: LucideIcon;
  title: string;
  subtitle: string;
  description: string;
  action: {
    text: string;
    href?: string;
    onClick?: () => void;
  };
  responseTime: string;
  recommended?: boolean;
  available: boolean;
  gradient: string;
  accentColor: string;
}

export const ContactMethods = () => {
  const methods: ContactMethod[] = [
    {
      id: "visit",
      icon: MapPin,
      title: "Visit Atelier",
      subtitle: "Experience in Person",
      description: "Tour our chocolate workshop and enjoy exclusive tastings",
      action: {
        text: "Get Directions",
        onClick: () => {
          window.open("https://maps.google.com/?q=37.7749,-122.4194", "_blank");
        },
      },
      responseTime: "Mon-Sat, 9AM-6PM",
      recommended: true,
      available: true,
      gradient: "from-[#451C15] to-[#D4A574]",
      accentColor: "#D4A574",
    },
    {
      id: "call",
      icon: Phone,
      title: "Call Us",
      subtitle: "Direct Consultation",
      description: "Speak with our chocolatiers for personalized service",
      action: {
        text: "Call Now",
        href: "tel:+15551234567",
      },
      responseTime: "Immediate during hours",
      available: true,
      gradient: "from-[#D4A574] to-[#E8B4B8]",
      accentColor: "#E8B4B8",
    },
    {
      id: "email",
      icon: Mail,
      title: "Email",
      subtitle: "Detailed Inquiries",
      description: "Perfect for custom orders and event planning",
      action: {
        text: "Send Email",
        href: "mailto:atelier@delicemy.com",
      },
      responseTime: "Within 24 hours",
      recommended: true,
      available: true,
      gradient: "from-[#E8B4B8] to-[#D4A574]",
      accentColor: "#D4A574",
    },
    {
      id: "whatsapp",
      icon: MessageCircle,
      title: "WhatsApp",
      subtitle: "Quick Questions",
      description: "Chat with us for instant updates on orders",
      action: {
        text: "Start Chat",
        href: "https://wa.me/15551234567",
      },
      responseTime: "Within 2 hours",
      available: true,
      gradient: "from-[#25D366] to-[#128C7E]",
      accentColor: "#25D366",
    },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#F8F6F3] to-white">
      <div className="max-w-[95%] xl:max-w-[90%] mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#D4A574]/10 rounded-full mb-4"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, type: "spring" }}
          >
            <Sparkles className="w-4 h-4 text-[#D4A574]" />
            <span className="text-sm font-medium text-[#451C15] [font-family:var(--font-inter)]">
              Connect With Us
            </span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl [font-family:var(--font-playfair)] text-[#451C15] mb-4">
            Choose Your Preferred Way
          </h2>
          <p className="text-lg text-[#451C15]/70 [font-family:var(--font-inter)] max-w-2xl mx-auto">
            We&apos;re here to make your chocolate dreams come true. Select the
            contact method that works best for you.
          </p>

          {/* Decorative Elements */}
          <div className="flex justify-center items-center gap-4 mt-6">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1 h-1 bg-[#D4A574] rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Contact Method Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {methods.map((method, index) => {
            const Icon = method.icon;

            return (
              <motion.div
                key={method.id}
                className="group relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div
                  className={`
                  relative h-full bg-white/95 backdrop-blur-sm 
                  border border-[#451C15]/10 rounded-3xl p-6
                  shadow-lg transition-all duration-300
                  hover:shadow-2xl hover:border-[#D4A574]/30
                  flex flex-col
                `}
                >
                  {/* Recommended Badge */}
                  {method.recommended && (
                    <motion.div
                      className="absolute -top-3 -right-3 z-10"
                      animate={{
                        y: [0, -3, 0],
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <div className="bg-white/90 backdrop-blur-md border border-[#D4A574]/20 rounded-full px-3 py-1 shadow-lg">
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-[#D4A574] fill-[#D4A574]" />
                          <span className="text-xs font-semibold text-[#451C15] [font-family:var(--font-inter)]">
                            Recommended
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Icon Container */}
                  <div className="flex justify-center mb-4">
                    <motion.div
                      className="relative"
                      whileHover={{ rotate: 15 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Glow Effect */}
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-br ${method.gradient} rounded-full blur-xl opacity-30`}
                        animate={{
                          scale: [1, 1.2, 1],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />

                      {/* Icon Background */}
                      <div
                        className={`
                        relative w-20 h-20 bg-gradient-to-br ${method.gradient}
                        rounded-full flex items-center justify-center
                        shadow-lg group-hover:shadow-xl transition-shadow duration-300
                      `}
                      >
                        <Icon className="w-10 h-10 text-white" />

                        {/* Decorative Ring */}
                        <div className="absolute inset-0 rounded-full border-2 border-white/20" />
                      </div>
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="text-center flex-1 flex flex-col">
                    <h3 className="text-xl font-semibold text-[#451C15] [font-family:var(--font-playfair)] mb-1">
                      {method.title}
                    </h3>
                    <p className="text-sm font-medium text-[#D4A574] [font-family:var(--font-inter)] mb-3">
                      {method.subtitle}
                    </p>
                    <p className="text-sm text-[#451C15]/70 [font-family:var(--font-inter)] mb-4 flex-1">
                      {method.description}
                    </p>

                    {/* Response Time */}
                    <div className="flex items-center justify-center gap-2 mb-4 py-2 px-3 bg-[#F8F6F3] rounded-full">
                      <Clock className="w-3 h-3 text-[#D4A574]" />
                      <span className="text-xs text-[#451C15]/70 [font-family:var(--font-inter)]">
                        {method.responseTime}
                      </span>
                    </div>

                    {/* Action Button */}
                    {method.action.href ? (
                      <motion.a
                        href={method.action.href}
                        target={
                          method.action.href.startsWith("http")
                            ? "_blank"
                            : undefined
                        }
                        rel={
                          method.action.href.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className={`
                          w-full py-3 px-4 rounded-full
                          bg-gradient-to-r ${method.gradient}
                          text-white font-medium [font-family:var(--font-inter)]
                          flex items-center justify-center gap-2
                          shadow-md hover:shadow-lg
                          transition-all duration-300
                          group/btn relative overflow-hidden
                        `}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="relative z-10">
                          {method.action.text}
                        </span>
                        <ArrowRight className="w-4 h-4 relative z-10 group-hover/btn:translate-x-1 transition-transform" />

                        {/* Button Hover Effect */}
                        <motion.div
                          className="absolute inset-0 bg-white/20"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: 0 }}
                          transition={{ duration: 0.3 }}
                        />
                      </motion.a>
                    ) : (
                      <motion.button
                        onClick={method.action.onClick}
                        className={`
                          w-full py-3 px-4 rounded-full
                          bg-gradient-to-r ${method.gradient}
                          text-white font-medium [font-family:var(--font-inter)]
                          flex items-center justify-center gap-2
                          shadow-md hover:shadow-lg
                          transition-all duration-300
                          group/btn relative overflow-hidden
                        `}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="relative z-10">
                          {method.action.text}
                        </span>
                        <ArrowRight className="w-4 h-4 relative z-10 group-hover/btn:translate-x-1 transition-transform" />

                        {/* Button Hover Effect */}
                        <motion.div
                          className="absolute inset-0 bg-white/20"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: 0 }}
                          transition={{ duration: 0.3 }}
                        />
                      </motion.button>
                    )}
                  </div>

                  {/* Corner Decoration */}
                  <div
                    className="absolute bottom-0 right-0 w-16 h-16 opacity-5"
                    style={{
                      background: `linear-gradient(135deg, transparent 50%, ${method.accentColor} 50%)`,
                    }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p className="text-[#451C15]/70 [font-family:var(--font-inter)] mb-4">
            Need help choosing? Our team is ready to assist you.
          </p>
          <motion.a
            href="#faq"
            className="inline-flex items-center gap-2 text-[#D4A574] hover:text-[#D4A574]/80 transition-colors [font-family:var(--font-inter)] font-medium"
            whileHover={{ x: 5 }}
          >
            View Frequently Asked Questions
            <ArrowRight className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};
