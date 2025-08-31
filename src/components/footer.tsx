"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import {
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
  Heart,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const footerContent = {
  logo: {
    src: "/logo.png",
    alt: "DeliceMy Logo",
  },
  tagline: "Where Every Bite Tells a Story",
  description:
    "Creating moments of pure chocolate bliss since 2009. From our artisan atelier in Chisinau to your special celebrations.",

  navigation: {
    services: {
      title: "Services",
      links: [
        { label: "Chocolate Classes", href: "/services#classes" },
        { label: "Corporate Events", href: "/services#corporate" },
        { label: "Custom Creations", href: "/services#custom" },
        { label: "Wedding Collections", href: "/services#wedding" },
      ],
    },
    learn: {
      title: "Learn",
      links: [
        { label: "Chocolate School", href: "/school" },
        { label: "Online Courses", href: "/school/online" },
        { label: "Masterclasses", href: "/school/masterclasses" },
        { label: "Kids Programs", href: "/school/kids" },
      ],
    },
    explore: {
      title: "Explore",
      links: [
        { label: "Our Story", href: "/about-company" },
        { label: "Meet Olesea", href: "/about-olesea" },
        { label: "Blog", href: "/blog" },
        { label: "Shop", href: "/shop" },
      ],
    },
    connect: {
      title: "Connect",
      links: [
        { label: "Contact Us", href: "/contact" },
        { label: "Visit Atelier", href: "/visit" },
        { label: "FAQ", href: "/faq" },
        { label: "Gift Cards", href: "/gift-cards" },
      ],
    },
  },

  contact: {
    email: "hello@delicemy.com",
    phone: "+373 123 456 789",
    address: "123 Chocolate Avenue, Chisinau, Moldova",
    hours: "Mon-Sat: 10:00 - 18:00",
  },

  social: [
    {
      icon: Instagram,
      href: "https://instagram.com/delicemy",
      label: "Instagram",
    },
    {
      icon: Facebook,
      href: "https://facebook.com/delicemy",
      label: "Facebook",
    },
    { icon: Youtube, href: "https://youtube.com/delicemy", label: "YouTube" },
    { icon: Twitter, href: "https://twitter.com/delicemy", label: "Twitter" },
  ],

  newsletter: {
    title: "Sweet Updates",
    description:
      "Join our chocolate-loving community for exclusive recipes and offers",
    placeholder: "Your email address",
    button: "Subscribe",
    success: "Welcome to our sweet family!",
  },

  certifications: [
    "ISO 22000 Certified",
    "Organic Certified",
    "Fair Trade Partner",
  ],

  copyright: {
    year: new Date().getFullYear(),
    company: "DeliceMy",
    rights: "All rights reserved",
    madeWith: "Made with",
    in: "in Chisinau",
  },
};

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => setIsSubscribed(false), 3000);
      setEmail("");
    }
  };

  return (
    <footer className="relative bg-gradient-to-b from-[#451C15] via-[#3A1610] to-[#2A100B] overflow-hidden">
    
      {/* Texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.5'/%3E%3C/svg%3E")`,
        }}
      />

  

      <div className="relative z-10 px-4 sm:px-6 lg:px-8 xl:px-12 max-w-[1400px] mx-auto">
        {/* Main Footer Content */}
        <div className="pt-16 sm:pt-20 lg:pt-24 pb-12">
          {/* Top Section - Logo and Newsletter */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-16">
            {/* Left: Brand Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center lg:text-left"
            >
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
                <Image
                  src={footerContent.logo.src}
                  alt={footerContent.logo.alt}
                  width={48}
                  height={48}
                  className="w-12 h-12"
                />
                <div>
                  <h3 className="text-2xl font-light text-[#E0D9C9] [font-family:var(--font-playfair)]">
                    DeliceMy
                  </h3>
                  <p className="text-xs text-[#E0D9C9]/60 italic [font-family:var(--font-playfair)]">
                    {footerContent.tagline}
                  </p>
                </div>
              </div>
              <p className="text-[#E0D9C9]/50 text-sm leading-relaxed max-w-md mx-auto lg:mx-0 [font-family:var(--font-inter)]">
                {footerContent.description}
              </p>

              {/* Certifications */}
              <div className="flex flex-wrap gap-4 mt-6 justify-center lg:justify-start">
                {footerContent.certifications.map((cert, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-xs text-[#D4A574] px-3 py-1 rounded-full border border-[#D4A574]/30 backdrop-blur-sm"
                  >
                    {cert}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Right: Newsletter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="lg:ml-auto"
            >
              <div className="bg-gradient-to-br from-[#E0D9C9]/5 to-[#D4A574]/5 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-[#E0D9C9]/10 max-w-md mx-auto lg:mx-0">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-5 h-5 text-[#D4A574]" />
                  <h4 className="text-xl font-light text-[#E0D9C9] [font-family:var(--font-playfair)]">
                    {footerContent.newsletter.title}
                  </h4>
                </div>
                <p className="text-[#E0D9C9]/60 text-sm mb-6 [font-family:var(--font-inter)]">
                  {footerContent.newsletter.description}
                </p>

                <form onSubmit={handleSubscribe} className="space-y-3">
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={footerContent.newsletter.placeholder}
                      className="w-full px-5 py-3 bg-[#E0D9C9]/10 backdrop-blur-sm rounded-full border border-[#E0D9C9]/20 text-[#E0D9C9] placeholder-[#E0D9C9]/40 focus:outline-none focus:border-[#D4A574]/50 transition-colors duration-300 text-sm"
                      required
                    />
                    <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#E0D9C9]/40" />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#D4A574] to-[#A67B5B] hover:from-[#A67B5B] hover:to-[#D4A574] text-white rounded-full py-3 transition-all duration-300"
                  >
                    {isSubscribed ? (
                      <motion.span
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2"
                      >
                        <Heart className="w-4 h-4 fill-current" />
                        {footerContent.newsletter.success}
                      </motion.span>
                    ) : (
                      footerContent.newsletter.button
                    )}
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>

          {/* Navigation Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 mb-16">
            {Object.entries(footerContent.navigation).map(
              ([key, section], sectionIndex) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h5 className="text-[#E0D9C9] font-medium mb-4 text-sm uppercase tracking-wider [font-family:var(--font-inter)]">
                    {section.title}
                  </h5>
                  <ul className="space-y-3">
                    {section.links.map((link, linkIndex) => (
                      <motion.li
                        key={linkIndex}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: sectionIndex * 0.1 + linkIndex * 0.05,
                        }}
                        viewport={{ once: true }}
                      >
                        <Link
                          href={link.href}
                          className="group text-[#E0D9C9]/50 hover:text-[#E0D9C9] transition-colors duration-300 text-sm flex items-center gap-1 [font-family:var(--font-inter)]"
                        >
                          <span>{link.label}</span>
                          <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )
            )}
          </div>

          {/* Contact and Social Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 pb-8 border-b border-[#E0D9C9]/10">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center md:text-left"
            >
              <h5 className="text-[#E0D9C9] font-medium mb-4 text-sm uppercase tracking-wider [font-family:var(--font-inter)]">
                Visit Us
              </h5>
              <div className="space-y-3 text-[#E0D9C9]/50 text-sm [font-family:var(--font-inter)]">
                <div className="flex items-center gap-3 justify-center md:justify-start">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <span>{footerContent.contact.address}</span>
                </div>
                <div className="flex items-center gap-3 justify-center md:justify-start">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <span>{footerContent.contact.phone}</span>
                </div>
                <div className="flex items-center gap-3 justify-center md:justify-start">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <span>{footerContent.contact.email}</span>
                </div>
                <div className="flex items-center gap-3 justify-center md:justify-start">
                  <span className="text-[#D4A574]">
                    {footerContent.contact.hours}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center md:text-right"
            >
              <h5 className="text-[#E0D9C9] font-medium mb-4 text-sm uppercase tracking-wider [font-family:var(--font-inter)]">
                Follow Our Journey
              </h5>
              <div className="flex gap-3 justify-center md:justify-end">
                {footerContent.social.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="group relative w-10 h-10 rounded-full bg-[#E0D9C9]/10 backdrop-blur-sm border border-[#E0D9C9]/20 flex items-center justify-center hover:bg-[#E0D9C9]/20 hover:border-[#D4A574]/50 transition-all duration-300"
                      aria-label={social.label}
                    >
                      <Icon className="w-4 h-4 text-[#E0D9C9]/60 group-hover:text-[#E0D9C9] transition-colors duration-300" />
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#D4A574]/0 via-[#D4A574]/20 to-[#D4A574]/0 opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-300" />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="pt-8 text-center"
          >
            <p className="text-[#E0D9C9]/40 text-xs sm:text-sm [font-family:var(--font-inter)]">
              © {footerContent.copyright.year} {footerContent.copyright.company}
              . {footerContent.copyright.rights}.
              <span className="inline-flex items-center gap-1 ml-2">
                {footerContent.copyright.madeWith}
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-red-400"
                >
                  <Heart className="w-3 h-3 fill-current" />
                </motion.span>
                {footerContent.copyright.in}
              </span>
            </p>
          </motion.div>
        </div>
      </div>

      {/* Bottom decorative wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 40" className="w-full h-10 fill-[#E0D9C9]/5">
          <path d="M0,20 Q360,0 720,20 T1440,20 L1440,40 L0,40 Z" />
        </svg>
      </div>
    </footer>
  );
}
