
"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import Image from "next/image";
import { Calendar, Clock, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BlogPost } from "../data/blog-content";

interface BlogPostHeroProps {
  post: BlogPost;
  className?: string;
}

export const BlogPostHero = ({ post, className }: BlogPostHeroProps) => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.1]);

  return (
    <section
      ref={heroRef}
      className={cn(
        "relative h-[600px] sm:h-[700px] lg:h-[800px] overflow-hidden",
        className
      )}
    >
      {/* Background Image with Parallax */}
      <motion.div
        style={{ y, scale }}
        className="absolute inset-0"
      >
        <Image
          src={post.featuredImage}
          alt={post.title}
          fill
          className="object-cover"
          priority
          quality={90}
        />
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#451C15]/90 via-[#451C15]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#451C15]/40 to-transparent" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative h-full flex items-center justify-center"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Category Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white/90 text-sm font-medium [font-family:var(--font-inter)]">
              <span
                className="w-2 h-2 rounded-full mr-2"
                style={{ backgroundColor: post.category.color }}
              />
              {post.category.name}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-6 text-4xl sm:text-5xl lg:text-7xl font-light text-white [font-family:var(--font-playfair)] leading-tight"
          >
            {post.title}
          </motion.h1>

          {/* Excerpt */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-6 text-lg sm:text-xl text-white/80 max-w-3xl mx-auto [font-family:var(--font-inter)] font-light leading-relaxed"
          >
            {post.excerpt}
          </motion.p>

          {/* Meta Information */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-6 text-white/70 text-sm [font-family:var(--font-inter)]"
          >
            {/* Author */}
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white/20">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <span className="font-medium">{post.author.name}</span>
            </div>

            {/* Date */}
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>

            {/* Reading Time */}
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{post.readingTime} min read</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-white/60"
        >
          <span className="text-xs uppercase tracking-wider [font-family:var(--font-inter)]">
            Scroll to read
          </span>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-gradient-to-br from-[#D4A574]/20 to-transparent blur-2xl" />
      <div className="absolute bottom-20 right-10 w-32 h-32 rounded-full bg-gradient-to-tl from-[#E8B4B8]/20 to-transparent blur-3xl" />
    </section>
  );
};