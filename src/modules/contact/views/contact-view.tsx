// src/modules/contact/views/contact-view.tsx

"use client";

import React, { useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Heart,
  Star,
  Sparkles,
  ArrowUp,
} from "lucide-react";
import { ContactHero } from "../components/contact-hero";
import { ContactForm } from "../components/contact-form";
import { ContactInfo } from "../components/contact-info";
import { ContactMethods } from "../components/contact-methods";
import { LocationMap } from "../components/location-map";
import { ContactFAQ } from "../components/contact-faq";
import type { LucideIcon } from "lucide-react";

interface SocialLink {
  id: string;
  name: string;
  icon: LucideIcon;
  href: string;
  color: string;
}

export const ContactView = () => {
  const { scrollY } = useScroll();
  const [showScrollTop, setShowScrollTop] = React.useState(false);

  // Parallax effects for decorative elements
  const decorativeY1 = useTransform(scrollY, [0, 1000], [0, -50]);
  const decorativeY2 = useTransform(scrollY, [0, 1000], [0, 50]);

  useEffect(() => {
    // Enable smooth scroll behavior
    document.documentElement.style.scrollBehavior = "smooth";

    // Show/hide scroll to top button
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialLinks: SocialLink[] = [
    {
      id: "facebook",
      name: "Facebook",
      icon: Facebook,
      href: "https://facebook.com/delicemy",
      color: "#1877F2",
    },
    {
      id: "instagram",
      name: "Instagram",
      icon: Instagram,
      href: "https://instagram.com/delicemy",
      color: "#E4405F",
    },
    {
      id: "twitter",
      name: "Twitter",
      icon: Twitter,
      href: "https://twitter.com/delicemy",
      color: "#1DA1F2",
    },
    {
      id: "youtube",
      name: "YouTube",
      icon: Youtube,
      href: "https://youtube.com/delicemy",
      color: "#FF0000",
    },
  ];

  return (
    <div className="relative bg-gradient-to-b from-white to-[#F8F6F3] overflow-hidden">
      {/* Floating Decorative Elements */}
      <motion.div
        style={{ y: decorativeY1 }}
        className="fixed top-20 left-10 text-[#D4A574]/10 pointer-events-none z-0"
      >
        <Star size={60} />
      </motion.div>
      <motion.div
        style={{ y: decorativeY2 }}
        className="fixed bottom-20 right-10 text-[#E8B4B8]/10 pointer-events-none z-0"
      >
        <Sparkles size={80} />
      </motion.div>

      {/* Hero Section */}
      <ContactHero />

      {/* Decorative Divider 1 */}
      <div className="relative">
        <svg
          className="w-full h-24 text-[#F8F6F3]"
          preserveAspectRatio="none"
          viewBox="0 0 1440 100"
          fill="currentColor"
        >
          <path d="M0,50 C360,0 1080,100 1440,50 L1440,100 L0,100 Z" />
        </svg>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Star className="w-6 h-6 text-[#D4A574]/30 fill-[#D4A574]/30" />
          </motion.div>
        </div>
      </div>

      {/* Main Content Section - Form and Info */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#F8F6F3]">
        <div className="max-w-[95%] xl:max-w-[90%] mx-auto">
          <div className="grid grid-cols-1  gap-12">
            {/* Contact Form - 2/3 width */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <ContactForm />
            </motion.div>

            {/* Contact Info Sidebar - 1/3 width */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="sticky top-8">
                <ContactInfo />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Decorative Divider 2 */}
      <div className="relative bg-gradient-to-b from-[#F8F6F3] to-white">
        <svg
          className="w-full h-32"
          preserveAspectRatio="none"
          viewBox="0 0 1440 120"
          fill="none"
        >
          <path
            d="M0,60 Q360,20 720,60 T1440,60"
            stroke="#D4A574"
            strokeWidth="2"
            strokeOpacity="0.2"
            fill="none"
          />
          <path
            d="M0,80 Q360,40 720,80 T1440,80"
            stroke="#E8B4B8"
            strokeWidth="2"
            strokeOpacity="0.2"
            fill="none"
          />
        </svg>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-4">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -10, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3,
              }}
            >
              <Heart className="w-4 h-4 text-[#D4A574]/40 fill-[#D4A574]/40" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Contact Methods Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <ContactMethods />
      </motion.div>

      {/* Decorative Divider 3 */}
      <div className="relative">
        <svg
          className="w-full h-24"
          preserveAspectRatio="none"
          viewBox="0 0 1440 100"
          fill="url(#gradient1)"
        >
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#D4A574" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#E8B4B8" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#D4A574" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          <path d="M0,50 C480,100 960,0 1440,50 L1440,100 L0,100 Z" />
        </svg>
      </div>

      {/* Location Map Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <LocationMap />
      </motion.div>

      {/* Decorative Divider 4 */}
      <div className="relative py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[#451C15]/20 to-transparent" />
            <motion.div
              className="flex gap-2"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Star className="w-4 h-4 text-[#D4A574]/40 fill-[#D4A574]/40" />
              <Star className="w-5 h-5 text-[#D4A574]/50 fill-[#D4A574]/50" />
              <Star className="w-4 h-4 text-[#D4A574]/40 fill-[#D4A574]/40" />
            </motion.div>
            <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[#451C15]/20 to-transparent" />
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <ContactFAQ />
      </motion.div>

      {/* Social Links Footer Section */}
      <section className="relative bg-gradient-to-br from-[#451C15] to-[#451C15]/95 py-16 sm:py-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `repeating-linear-gradient(
                45deg,
                transparent,
                transparent 20px,
                rgba(212, 165, 116, 0.1) 20px,
                rgba(212, 165, 116, 0.1) 40px
              )`,
            }}
          />
        </div>

        <div className="relative max-w-[95%] xl:max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl [font-family:var(--font-playfair)] text-white mb-4">
              Stay Connected
            </h2>
            <p className="text-white/70 [font-family:var(--font-inter)] mb-8 max-w-2xl mx-auto">
              Follow our chocolate journey and be the first to know about new
              creations, exclusive events, and behind-the-scenes moments from
              our atelier.
            </p>

            {/* Social Links */}
            <div className="flex justify-center gap-4 mb-8">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;

                return (
                  <motion.a
                    key={social.id}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.1,
                      type: "spring",
                    }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="relative p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300">
                      <Icon className="w-6 h-6 text-white" />

                      {/* Hover Tooltip */}
                      <motion.div
                        className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-white rounded-full shadow-lg pointer-events-none"
                        initial={{ opacity: 0, y: 10 }}
                        whileHover={{ opacity: 1, y: 0 }}
                      >
                        <span className="text-xs font-medium text-[#451C15] [font-family:var(--font-inter)]">
                          {social.name}
                        </span>
                      </motion.div>
                    </div>

                    {/* Glow Effect */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl"
                      style={{
                        background: `radial-gradient(circle, ${social.color}20 0%, transparent 70%)`,
                      }}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.a>
                );
              })}
            </div>

            {/* Newsletter Signup */}
            <motion.div
              className="max-w-md mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <p className="text-[#D4A574] text-sm [font-family:var(--font-inter)] mb-4">
                Subscribe to our newsletter for exclusive offers
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white placeholder:text-white/50 [font-family:var(--font-inter)] focus:outline-none focus:ring-2 focus:ring-[#D4A574]"
                />
                <button className="px-6 py-3 bg-[#D4A574] text-white rounded-full hover:bg-[#D4A574]/90 transition-all [font-family:var(--font-inter)] font-medium whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </motion.div>

            {/* Copyright */}
            <motion.div
              className="mt-12 pt-8 border-t border-white/10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <p className="text-white/50 text-sm [font-family:var(--font-inter)]">
                © 2024 DeliceMy. All rights reserved. Crafted with{" "}
                <Heart className="inline w-4 h-4 text-[#D4A574]" /> in San
                Francisco.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 p-4 bg-[#451C15] text-white rounded-full shadow-xl hover:bg-[#451C15]/90 transition-all z-50"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};
