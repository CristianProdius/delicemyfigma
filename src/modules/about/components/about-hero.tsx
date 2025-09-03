// src/modules/about/components/about-hero.tsx
"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { Award, Users, Heart } from "lucide-react";

interface AboutHeroProps {
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  image: string;
  signature?: string;
  variant?: "personal" | "company";
  accentColor?: string;
}

export const AboutHero = ({
  title,
  subtitle,
  tagline,
  description,
  image,
  signature,
  variant = "personal",
}: AboutHeroProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  // Parallax transforms - Same as BlogHero
  const backgroundY = useTransform(scrollY, [0, 1000], [0, 200]);
  const contentY = useTransform(scrollY, [0, 800], [0, -50]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0.3]);
  const scale = useTransform(scrollY, [0, 500], [1, 0.95]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Parallax - Exactly like BlogHero */}
      <motion.div className="absolute inset-0" style={{ y: backgroundY }}>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/img/bg.jpg')" }}
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      </motion.div>

      {/* Glass Morphism Container - Same as BlogHero */}
      <motion.div
        style={{ opacity, scale, y: contentY }}
        className="relative z-10 w-full max-w-[91.666667%] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24"
      >
        <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl sm:rounded-[2rem] lg:rounded-[3rem] border border-white/20 shadow-2xl overflow-hidden">
          {/* Noise Texture Overlay - Same as BlogHero */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='3.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
            }}
          />

          <div className="relative p-8 sm:p-12 lg:p-16 xl:p-20">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Content Side */}
              <motion.div
                className={`${variant === "company" ? "lg:order-2" : ""}`}
              >
                {/* Subtitle */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="mb-4"
                >
                  <span
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-white/10 backdrop-blur-md border border-white/20"
                  >
                    {variant === "personal" ? (
                      <Award className="w-4 h-4 text-amber-200" />
                    ) : (
                      <Users className="w-4 h-4 text-amber-200" />
                    )}
                    <span className="text-amber-100">{subtitle}</span>
                  </span>
                </motion.div>

                {/* Title */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-light mb-6 [font-family:var(--font-playfair)]"
                >
                  <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-amber-50/95 to-amber-100/90">
                    {title}
                  </span>
                </motion.h1>

                {/* Tagline */}
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-xl md:text-2xl font-light mb-8 text-amber-200/80 italic [font-family:var(--font-playfair)]"
                >
                  {tagline}
                </motion.p>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-white/70 text-lg leading-relaxed mb-8 [font-family:var(--font-inter)]"
                >
                  {description}
                </motion.p>

                {/* Signature (Personal Variant) */}
                {variant === "personal" && signature && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="relative w-48 h-24"
                  >
                    <Image
                      src={signature}
                      alt="Signature"
                      fill
                      className="object-contain filter invert opacity-60"
                    />
                  </motion.div>
                )}

                {/* Stats (Company Variant) */}
                {variant === "company" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="flex flex-wrap gap-8 mt-8"
                  >
                    {[
                      { label: "Years of Excellence", value: "6+" },
                      { label: "Happy Customers", value: "10K+" },
                      { label: "Awards Won", value: "15+" },
                    ].map((stat, index) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          duration: 0.4,
                          delay: 0.6 + index * 0.1,
                          type: "spring",
                          stiffness: 100,
                        }}
                        className="text-center"
                      >
                        <div className="text-3xl font-bold mb-1 text-amber-200 [font-family:var(--font-playfair)]">
                          {stat.value}
                        </div>
                        <div className="text-sm text-white/60 [font-family:var(--font-inter)]">
                          {stat.label}
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </motion.div>

              {/* Image Side */}
              <motion.div
                className={`relative ${variant === "company" ? "lg:order-1" : ""}`}
              >
                {/* Main Image Container */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="relative rounded-2xl overflow-hidden shadow-2xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />

                  <div className="relative aspect-[4/5] md:aspect-square lg:aspect-[4/5]">
                    <Image
                      src={image}
                      alt={title}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>

                  {/* Simple Icon Badge (no floating) */}
                  <div className="absolute top-6 right-6 z-20">
                    <div
                      className="bg-white/10 backdrop-blur-md rounded-full p-4 shadow-lg border border-white/20"
                    >
                      {variant === "personal" ? (
                        <Heart className="w-6 h-6 text-amber-200" />
                      ) : (
                        <Award className="w-6 h-6 text-amber-200" />
                      )}
                    </div>
                  </div>

                  {/* Simple Border Frame */}
                  <div
                    className="absolute inset-4 border rounded-xl pointer-events-none z-20 border-white/20"
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          delay: 1,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <div className="flex flex-col items-center text-white/60">
          <span className="text-xs uppercase tracking-wider mb-2 [font-family:var(--font-inter)]">
            Scroll to explore
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/60 rounded-full mt-2" />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};