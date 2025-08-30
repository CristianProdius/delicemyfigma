// src/modules/blog/components/blog-post-card.tsx
"use client";

import React, { useState } from "react";
import { motion, useMotionValue, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import {
  Clock,
  Calendar,
  User,
  ArrowRight,
  BookOpen,
  TrendingUp,
  Star,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { BlogPost } from "../data/blog-content";

interface BlogPostCardProps {
  post: BlogPost;
  variant?: "default" | "featured" | "compact";
  className?: string;
  index?: number; // For staggered animations
  showAuthor?: boolean;
  onReadMore?: () => void; // Optional callback instead of navigation
}

export const BlogPostCard = ({
  post,
  variant = "default",
  className,
  index = 0,
  showAuthor = true,
  onReadMore,
}: BlogPostCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for advanced hover effects (featured variant)
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  // Get accent color from category
  const accentColor = post.category.color || "#D4A574";

  // Format the date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  // Get height classes based on variant
  const getCardHeight = () => {
    switch (variant) {
      case "featured":
        return "min-h-[500px]";
      case "compact":
        return "min-h-[120px]";
      default:
        return "min-h-[400px]";
    }
  };

  // Get image height based on variant
  const getImageHeight = () => {
    switch (variant) {
      case "featured":
        return "h-64 sm:h-72";
      case "compact":
        return "h-full w-32 sm:w-40";
      default:
        return "h-48 sm:h-56";
    }
  };

  // Compact variant layout (horizontal)
  if (variant === "compact") {
    const compactContent = (
      <motion.article
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.05, duration: 0.5 }}
        whileHover={{ x: 5 }}
        className={cn(
          "group flex gap-4 p-4 bg-white rounded-xl border border-[#451C15]/10",
          "hover:shadow-lg transition-all duration-300",
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Thumbnail */}
        <div className="relative overflow-hidden rounded-lg flex-shrink-0 w-32 sm:w-40">
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="160px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-between py-1">
          <div>
            {/* Category Badge */}
            <span
              className="inline-block px-2 py-1 text-xs font-medium rounded-full mb-2"
              style={{
                backgroundColor: `${accentColor}15`,
                color: accentColor,
                borderColor: `${accentColor}30`,
                borderWidth: "1px",
                borderStyle: "solid",
              }}
            >
              {post.category.name}
            </span>

            {/* Title */}
            <h3 className="text-base sm:text-lg font-medium text-[#451C15] line-clamp-2 mb-2 group-hover:text-black transition-colors [font-family:var(--font-playfair)]">
              {post.title}
            </h3>
          </div>

          {/* Meta */}
          <div className="flex items-center gap-3 text-xs text-[#451C15]/60">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {post.readingTime} min
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formatDate(post.publishedAt)}
            </span>
          </div>
        </div>

        {/* Arrow */}
        <div className="flex items-center">
          <ArrowRight className="w-5 h-5 text-[#451C15]/40 group-hover:text-[#451C15] transition-colors" />
        </div>
      </motion.article>
    );

    if (post.slug && !onReadMore) {
      return (
        <Link href={`/blog/${post.slug}`} className="block">
          {compactContent}
        </Link>
      );
    }
    return compactContent;
  }

  // Default and Featured card layout
  const cardContent = (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.1,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -8,
        transition: { duration: 0.3, ease: "easeOut" },
      }}
      className={cn(
        "group relative flex flex-col overflow-hidden bg-white",
        "border border-[#451C15]/10 shadow-lg hover:shadow-2xl",
        "transition-all duration-500",
        variant === "featured" ? "rounded-3xl" : "rounded-2xl",
        getCardHeight(),
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={(e) => {
        if (variant === "featured") {
          const rect = e.currentTarget.getBoundingClientRect();
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          x.set(e.clientX - rect.left - centerX);
          y.set(e.clientY - rect.top - centerY);
        }
      }}
      style={{
        transformStyle: variant === "featured" ? "preserve-3d" : undefined,
        rotateX: variant === "featured" ? rotateX : 0,
        rotateY: variant === "featured" ? rotateY : 0,
      }}
    >
      {/* Floating Accent Gradient on Hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"
        style={{
          background: `linear-gradient(135deg, ${accentColor}20 0%, transparent 50%, ${accentColor}20 100%)`,
        }}
      />

      {/* Glow Effect */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${accentColor}10 0%, transparent 70%)`,
          filter: "blur(40px)",
        }}
      />

      {/* Image Container */}
      <div
        className={cn(
          "relative overflow-hidden flex-shrink-0",
          getImageHeight()
        )}
      >
        <Image
          src={post.featuredImage}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={index < 3}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

        {/* Category Badge */}
        <motion.div
          className="absolute top-4 left-4 z-20"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            delay: index * 0.1 + 0.3,
            type: "spring",
            stiffness: 200,
            damping: 15,
          }}
        >
          <div
            className="px-3 py-1.5 rounded-full backdrop-blur-md shadow-lg text-white text-xs font-medium [font-family:var(--font-inter)]"
            style={{
              backgroundColor: `${accentColor}90`,
              borderColor: `${accentColor}`,
              borderWidth: "1px",
              borderStyle: "solid",
            }}
          >
            {post.category.name}
          </div>
        </motion.div>

        {/* Featured Badge */}
        {post.featured && (
          <motion.div
            className="absolute top-4 right-4 z-20"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              delay: index * 0.1 + 0.4,
              type: "spring",
              stiffness: 200,
            }}
          >
            <div className="p-2 rounded-full bg-amber-400/90 backdrop-blur-md shadow-lg">
              <Star className="w-4 h-4 text-white fill-white" />
            </div>
          </motion.div>
        )}

        {/* Reading Time Badge */}
        <div className="absolute bottom-4 left-4 z-20">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md shadow-md">
            <Clock className="w-3.5 h-3.5 text-[#451C15]" />
            <span className="text-xs font-medium text-[#451C15] [font-family:var(--font-inter)]">
              {post.readingTime} min read
            </span>
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div className="flex flex-col flex-1 p-6 sm:p-8">
        {/* Date */}
        <div className="flex items-center gap-1.5 text-sm text-[#451C15]/60 mb-3 [font-family:var(--font-inter)]">
          <Calendar className="w-4 h-4" />
          <time dateTime={post.publishedAt}>
            {formatDate(post.publishedAt)}
          </time>
        </div>

        {/* Title */}
        <h3
          className={cn(
            "font-medium text-[#451C15] mb-3 line-clamp-2 group-hover:text-black transition-colors [font-family:var(--font-playfair)]",
            variant === "featured"
              ? "text-2xl sm:text-3xl"
              : "text-xl sm:text-2xl"
          )}
        >
          {post.title}
        </h3>

        {/* Excerpt */}
        <p
          className={cn(
            "text-[#451C15]/70 line-clamp-3 mb-4 flex-1 [font-family:var(--font-inter)]",
            variant === "featured"
              ? "text-base sm:text-lg"
              : "text-sm sm:text-base"
          )}
        >
          {post.excerpt}
        </p>

        {/* Tags */}
        {variant === "featured" && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs rounded-md bg-[#451C15]/5 text-[#451C15]/70 [font-family:var(--font-inter)]"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Author Section */}
        {showAuthor && (
          <div className="flex items-center justify-between pt-4 border-t border-[#451C15]/10">
            {/* Author Info */}
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-[#451C15]/10">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                  sizes="40px"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-[#451C15] [font-family:var(--font-inter)]">
                  {post.author.name}
                </p>
                <p className="text-xs text-[#451C15]/60 [font-family:var(--font-inter)]">
                  {post.author.role}
                </p>
              </div>
            </div>

            {/* Read More */}
            <motion.div
              className="flex items-center gap-1.5 text-[#451C15] group-hover:text-black transition-colors"
              animate={isHovered ? { x: 5 } : { x: 0 }}
            >
              <span className="text-sm font-medium [font-family:var(--font-inter)]">
                Read
              </span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </motion.div>
          </div>
        )}
      </div>

      {/* Decorative Corner Accent */}
      <div
        className="absolute bottom-0 right-0 w-24 h-24 sm:w-32 sm:h-32 opacity-10 group-hover:opacity-20 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at bottom right, ${accentColor} 0%, transparent 70%)`,
        }}
      />

      {/* Floating Particles Effect (Featured variant) */}
      {variant === "featured" && isHovered && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-amber-400 rounded-full"
              initial={{
                x: Math.random() * 100,
                y: "100%",
                opacity: 0,
              }}
              animate={{
                y: "-20%",
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                delay: i * 0.3,
                repeat: Infinity,
                ease: "easeOut",
              }}
              style={{ left: `${20 + i * 30}%` }}
            />
          ))}
        </div>
      )}
    </motion.article>
  );

  // Wrap in Link if slug is provided and no callback
  if (post.slug && !onReadMore) {
    return (
      <Link href={`/blog/${post.slug}`} className="block h-full">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
};

export default BlogPostCard;
