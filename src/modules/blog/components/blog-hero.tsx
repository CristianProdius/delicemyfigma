// src/modules/blog/components/blog-hero.tsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import {
  Search,
  X,
  TrendingUp,
  Calendar,
  Sparkles,
  BookOpen,
  Filter,
  ChevronRight,
} from "lucide-react";
import { blogCategories, getFeaturedPosts, blogPosts } from "../data/blog-content";

export const BlogHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [featuredPosts, setFeaturedPosts] = useState<any[]>([]);

  const { scrollY } = useScroll();

  // Parallax transforms
  const backgroundY = useTransform(scrollY, [0, 1000], [0, 200]);
  const contentY = useTransform(scrollY, [0, 800], [0, -50]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0.3]);
  const scale = useTransform(scrollY, [0, 500], [1, 0.95]);

  useEffect(() => {
    setFeaturedPosts(getFeaturedPosts());
  }, []);

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const listingSection = document.getElementById("blog-listing");
    if (listingSection) {
      listingSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Handle category selection
  const handleCategoryClick = (categoryId: string) => {
    const newCategory = activeCategory === categoryId ? null : categoryId;
    setActiveCategory(newCategory);
    const listingSection = document.getElementById("blog-listing");
    if (listingSection) {
      listingSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Animated counter for posts
  const totalPosts = blogPosts.length;
  const [displayCount, setDisplayCount] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      if (displayCount < totalPosts) {
        setDisplayCount((prev) =>
          Math.min(prev + Math.ceil(totalPosts / 20), totalPosts)
        );
      }
    }, 50);
    return () => clearTimeout(timer);
  }, [displayCount, totalPosts]);

  const featuredPost = featuredPosts[0]
    ? {
        title: featuredPosts[0].title,
        excerpt: featuredPosts[0].excerpt,
        category: featuredPosts[0].category.name,
        readingTime: featuredPosts[0].readingTime,
      }
    : undefined;

  return (
    <section
      ref={containerRef}
      className="relative min-h-[600px] sm:min-h-[700px] lg:min-h-[800px] flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <motion.div className="absolute inset-0" style={{ y: backgroundY }}>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/img/bg.jpg')" }}
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      </motion.div>

      {/* Glass Morphism Container */}
      <motion.div
        style={{ opacity, scale, y: contentY }}
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24"
      >
        <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl sm:rounded-[2rem] lg:rounded-[3rem] border border-white/20 shadow-2xl overflow-hidden">
          {/* Noise Texture Overlay */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='3.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
            }}
          />

          <div className="relative p-8 sm:p-12 lg:p-16">
            {/* Header Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-center mb-10 sm:mb-12"
            >
              {/* Small Label */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-6"
              >
                <BookOpen className="w-4 h-4 text-amber-200" />
                <span className="text-sm text-amber-100 [font-family:var(--font-inter)]">
                  Chocolate Chronicles
                </span>
              </motion.div>

              {/* Main Title */}
              <h1 className="[font-family:var(--font-playfair)] text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light leading-[1.1] mb-4">
                <span className="block text-transparent bg-clip-text bg-gradient-to-br from-white via-amber-50/95 to-amber-100/90">
                  Stories, Recipes &
                </span>
                <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-br from-amber-100/90 via-amber-200/80 to-amber-300/70 italic">
                  Sweet Inspirations
                </span>
              </h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-base sm:text-lg text-white/70 [font-family:var(--font-inter)] max-w-2xl mx-auto mt-4"
              >
                Discover the art of chocolate making through expert tutorials,
                business insights, and delicious recipes
              </motion.p>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="flex items-center justify-center gap-8 mt-6"
              >
                <div className="text-center">
                  <span className="block text-2xl sm:text-3xl font-light text-amber-100 [font-family:var(--font-playfair)]">
                    {displayCount}+
                  </span>
                  <span className="text-xs text-white/60 [font-family:var(--font-inter)]">
                    Articles
                  </span>
                </div>
                <div className="w-px h-10 bg-white/20" />
                <div className="text-center">
                  <span className="block text-2xl sm:text-3xl font-light text-amber-100 [font-family:var(--font-playfair)]">
                    {blogCategories.length}
                  </span>
                  <span className="text-xs text-white/60 [font-family:var(--font-inter)]">
                    Topics
                  </span>
                </div>
                <div className="w-px h-10 bg-white/20" />
                <div className="text-center">
                  <span className="block text-2xl sm:text-3xl font-light text-amber-100 [font-family:var(--font-playfair)]">
                    12+
                  </span>
                  <span className="text-xs text-white/60 [font-family:var(--font-inter)]">
                    Years
                  </span>
                </div>
              </motion.div>
            </motion.div>

            {/* Search Bar */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              onSubmit={handleSearch}
              className="relative max-w-2xl mx-auto mb-8"
            >
              <div
                className={`
                relative group transition-all duration-300
                ${isSearchFocused ? "scale-[1.02]" : ""}
              `}
              >
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  placeholder="Search articles, recipes, tutorials..."
                  className="
                    w-full px-6 py-4 pl-14 pr-12
                    bg-white/10 backdrop-blur-xl
                    border border-white/20
                    rounded-2xl
                    text-white placeholder-white/50
                    [font-family:var(--font-inter)]
                    transition-all duration-300
                    focus:outline-none focus:border-amber-200/50
                    focus:bg-white/15 focus:shadow-lg focus:shadow-amber-200/10
                  "
                />
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />

                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-white/10 transition-colors"
                  >
                    <X className="w-4 h-4 text-white/70" />
                  </button>
                )}

                {/* Search glow effect */}
                <div
                  className={`
                  absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-500
                  ${isSearchFocused ? "opacity-100" : "opacity-0"}
                `}
                >
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-400/20 via-amber-300/20 to-amber-400/20 blur-xl" />
                </div>
              </div>
            </motion.form>

            {/* Category Filter Pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="flex flex-wrap items-center justify-center gap-3"
            >
              {/* Category buttons remain the same */}
              {(showAllCategories
                ? blogCategories
                : blogCategories.slice(0, 4)
              ).map((category, index) => (
                <motion.button
                  key={category.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCategoryClick(category.id)}
                  className={`
                    px-5 py-2.5 rounded-full border transition-all duration-300
                    [font-family:var(--font-inter)] text-sm font-medium
                    ${
                      activeCategory === category.id
                        ? "bg-white/20 border-white/40 text-white shadow-lg shadow-white/10"
                        : "bg-white/5 border-white/20 text-white/80 hover:bg-white/10 hover:border-white/30 hover:text-white"
                    }
                  `}
                  style={{
                    backgroundColor:
                      activeCategory === category.id
                        ? `${category.color}20`
                        : undefined,
                    borderColor:
                      activeCategory === category.id
                        ? `${category.color}60`
                        : undefined,
                  }}
                >
                  <span className="flex items-center gap-2">
                    {category.icon === "Book" && (
                      <BookOpen className="w-4 h-4" />
                    )}
                    {category.icon === "TrendingUp" && (
                      <TrendingUp className="w-4 h-4" />
                    )}
                    {category.icon === "Calendar" && (
                      <Calendar className="w-4 h-4" />
                    )}
                    {category.icon === "Tool" && (
                      <Sparkles className="w-4 h-4" />
                    )}
                    {category.name}
                  </span>
                </motion.button>
              ))}

              {/* Show More/Less Button */}
              {blogCategories.length > 4 && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.6, duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowAllCategories(!showAllCategories)}
                  className="
                    px-4 py-2.5 rounded-full
                    bg-white/5 border border-white/20
                    text-white/70 hover:text-white hover:bg-white/10
                    transition-all duration-300
                    [font-family:var(--font-inter)] text-sm
                    flex items-center gap-1
                  "
                >
                  <Filter className="w-4 h-4" />
                  {showAllCategories
                    ? "Show Less"
                    : `+${blogCategories.length - 4} More`}
                </motion.button>
              )}

              {/* Clear Filter */}
              {activeCategory && (
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setActiveCategory(null);
                  }}
                  className="
                    px-4 py-2.5 rounded-full
                    bg-red-500/10 border border-red-500/30
                    text-red-300 hover:bg-red-500/20
                    transition-all duration-300
                    [font-family:var(--font-inter)] text-sm
                    flex items-center gap-1
                  "
                >
                  <X className="w-4 h-4" />
                  Clear
                </motion.button>
              )}
            </motion.div>

            {/* Featured Post Teaser */}
            {featuredPost && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.8 }}
                className="mt-10 max-w-2xl mx-auto"
              >
                <div className="p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 group cursor-pointer">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs text-amber-200 [font-family:var(--font-inter)] font-medium">
                      Featured
                    </span>
                    <span className="text-xs text-white/40">•</span>
                    <span className="text-xs text-white/60 [font-family:var(--font-inter)]">
                      {featuredPost.category}
                    </span>
                    <span className="text-xs text-white/40">•</span>
                    <span className="text-xs text-white/60 [font-family:var(--font-inter)]">
                      {featuredPost.readingTime} min read
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl text-white [font-family:var(--font-playfair)] mb-2 group-hover:text-amber-100 transition-colors">
                    {featuredPost.title}
                  </h3>
                  <p className="text-sm text-white/60 [font-family:var(--font-inter)] line-clamp-2">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center gap-1 mt-3 text-amber-200 group-hover:text-amber-100 transition-colors">
                    <span className="text-sm [font-family:var(--font-inter)]">
                      Read more
                    </span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default BlogHero;