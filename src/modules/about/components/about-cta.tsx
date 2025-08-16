// src/modules/about/components/about-cta.tsx
"use client";

import { motion } from "motion/react";
import {
  ArrowRight,
  Mail,
  Calendar,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface AboutCTAProps {
  variant?: "personal" | "company";
}

export const AboutCTA = ({ variant = "personal" }: AboutCTAProps) => {
  const isPersonal = variant === "personal";

  return (
    <section className="relative py-20 lg:py-24 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1A0F0A] via-[#2A1810] to-[#1A0F0A]" />

      {/* Decorative Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 rounded-full"
          style={{
            background:
              "radial-gradient(circle, #D4A57420 0%, transparent 70%)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 rounded-full"
          style={{
            background:
              "radial-gradient(circle, #8B735520 0%, transparent 70%)",
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-[95%] xl:max-w-[90%] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#D4A57420] mb-6"
          >
            <Sparkles className="w-10 h-10 text-[#D4A574]" />
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl lg:text-6xl font-light text-white mb-6 [font-family:var(--font-playfair)]"
          >
            {isPersonal
              ? "Let's Create Something Sweet Together"
              : "Ready to Experience Excellence?"}
          </motion.h2>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-lg lg:text-xl text-gray-300 mb-10 leading-relaxed"
          >
            {isPersonal
              ? "Whether you're looking for custom chocolates, want to learn the art yourself, or need a chocolatier for your special event, I'm here to help bring your sweetest dreams to life."
              : "Join thousands of satisfied customers who have discovered the perfect blend of tradition, innovation, and exceptional quality in every creation."}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            {/* Primary CTA */}
            <Link href="/contact">
              <Button
                size="lg"
                className="group bg-[#D4A574] hover:bg-[#C19660] text-white px-8 py-6 text-lg rounded-full shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <span className="mr-2">Get in Touch</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>

            {/* Secondary CTAs */}
            <div className="flex gap-4">
              <Link href="/services">
                <Button
                  size="lg"
                  variant="outline"
                  className="group border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 px-6 py-6 text-lg rounded-full transition-all duration-300"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  <span>Book a Session</span>
                </Button>
              </Link>

              <Link href="/portfolio">
                <Button
                  size="lg"
                  variant="outline"
                  className="group border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 px-6 py-6 text-lg rounded-full transition-all duration-300"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  <span>View Portfolio</span>
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Quick Contact Info */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="mt-12 pt-12 border-t border-white/20"
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-gray-400">
              <a
                href="mailto:hello@cocoagrams.com"
                className="flex items-center gap-2 hover:text-[#D4A574] transition-colors"
              >
                <Mail className="w-5 h-5" />
                <span>hello@cocoagrams.com</span>
              </a>
              <div className="hidden sm:block w-px h-6 bg-gray-600" />
              <a
                href="tel:+1234567890"
                className="flex items-center gap-2 hover:text-[#D4A574] transition-colors"
              >
                <span>📞</span>
                <span>+1 (234) 567-890</span>
              </a>
              <div className="hidden sm:block w-px h-6 bg-gray-600" />
              <div className="flex items-center gap-2">
                <span>📍</span>
                <span>Chisinau, Moldova</span>
              </div>
            </div>
          </motion.div>

          {/* Social Proof */}
          {isPersonal && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              viewport={{ once: true }}
              className="mt-12 flex items-center justify-center gap-8"
            >
              <div className="flex -space-x-2">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-gray-600 border-2 border-[#1A0F0A] flex items-center justify-center text-white text-xs"
                  >
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-500">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-sm text-gray-400">
                  Trusted by 850+ happy students
                </p>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Floating Decorations */}
      <motion.div
        className="absolute top-10 right-20 text-[#D4A574]/20"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 360],
        }}
        transition={{
          y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
        }}
      >
        <Sparkles className="w-12 h-12" />
      </motion.div>

      <motion.div
        className="absolute bottom-10 left-20 text-[#D4A574]/20"
        animate={{
          y: [0, 20, 0],
          rotate: [360, 0],
        }}
        transition={{
          y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 25, repeat: Infinity, ease: "linear" },
        }}
      >
        <Sparkles className="w-8 h-8" />
      </motion.div>
    </section>
  );
};
