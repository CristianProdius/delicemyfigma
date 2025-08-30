// src/modules/blog/components/blog-listing.tsx
"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence, LayoutGroup } from "motion/react";
import {
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  TrendingUp,
  Calendar,
  Clock,
  Loader2,
  Coffee,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  BlogPost,
  BlogCategory,
  blogCategories,
  blogPosts,
} from "../data/blog-content";
import { BlogPostCard } from "./blog-post-card";

interface BlogListingProps {
  posts?: BlogPost[];
  categories?: BlogCategory[];
  initialCategory?: string;
  postsPerPage?: number;
  showSearch?: boolean;
  showFilters?: boolean;
  className?: string;
  onPostClick?: (post: BlogPost) => void;
}

// Skeleton Card Component
const SkeletonCard = ({
  variant = "default",
}: {
  variant?: "default" | "featured";
}) => {
  const isLarge = variant === "featured";

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-white rounded-2xl border border-[#451C15]/10",
        isLarge ? "min-h-[500px]" : "min-h-[400px]",
        isLarge && "col-span-1 sm:col-span-2 lg:row-span-2"
      )}
    >
      <div className="animate-pulse">
        {/* Image skeleton */}
        <div
          className={cn(
            "bg-gradient-to-br from-gray-200 to-gray-300",
            isLarge ? "h-64 sm:h-72" : "h-48 sm:h-56"
          )}
        />

        {/* Content skeleton */}
        <div className="p-6 sm:p-8 space-y-4">
          {/* Category badge */}
          <div className="w-24 h-6 bg-gray-200 rounded-full" />

          {/* Title */}
          <div className="space-y-2">
            <div className="h-6 bg-gray-200 rounded w-full" />
            <div className="h-6 bg-gray-200 rounded w-3/4" />
          </div>

          {/* Excerpt */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-2/3" />
          </div>

          {/* Author */}
          <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
            <div className="w-10 h-10 bg-gray-200 rounded-full" />
            <div className="space-y-1">
              <div className="h-4 bg-gray-200 rounded w-24" />
              <div className="h-3 bg-gray-200 rounded w-20" />
            </div>
          </div>
        </div>
      </div>

      {/* Shimmer effect */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite]">
        <div className="h-full w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>
    </div>
  );
};

// Empty State Component
const EmptyState = ({
  searchQuery,
  category,
}: {
  searchQuery?: string;
  category?: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="col-span-full flex flex-col items-center justify-center py-20 sm:py-32"
    >
      {/* Illustration */}
      <motion.div
        animate={{
          rotate: [0, -5, 5, -5, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="mb-8"
      >
        <div className="relative">
          <Coffee className="w-24 h-24 text-[#451C15]/20" />
          <motion.div
            className="absolute -top-2 -right-2"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <BookOpen className="w-8 h-8 text-[#D4A574]/40" />
          </motion.div>
        </div>
      </motion.div>

      {/* Message */}
      <h3 className="text-2xl font-light text-[#451C15] mb-3 [font-family:var(--font-playfair)]">
        No articles found
      </h3>
      <p className="text-[#451C15]/60 text-center max-w-md [font-family:var(--font-inter)]">
        {searchQuery ? (
          <>We couldn't find any articles matching "{searchQuery}"</>
        ) : category ? (
          <>No articles available in this category yet</>
        ) : (
          <>Check back soon for new chocolate stories and recipes</>
        )}
      </p>

      {/* Action button */}
      {(searchQuery || category) && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.location.reload()}
          className="mt-6 px-6 py-3 bg-[#451C15] text-white rounded-full hover:bg-[#5A241C] transition-colors [font-family:var(--font-inter)]"
        >
          Clear filters
        </motion.button>
      )}
    </motion.div>
  );
};

// Pagination Component
const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const visiblePages = pages.filter((page) => {
    if (totalPages <= 7) return true;
    if (page === 1 || page === totalPages) return true;
    if (Math.abs(page - currentPage) <= 1) return true;
    if (currentPage <= 3 && page <= 5) return true;
    if (currentPage >= totalPages - 2 && page >= totalPages - 4) return true;
    return false;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-center gap-2 mt-12 sm:mt-16"
    >
      {/* Previous Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={cn(
          "p-2 rounded-full transition-all duration-300",
          currentPage === 1
            ? "text-[#451C15]/30 cursor-not-allowed"
            : "text-[#451C15] hover:bg-[#451C15]/10"
        )}
      >
        <ChevronLeft className="w-5 h-5" />
      </motion.button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {visiblePages.map((page, index) => {
          const prevPage = visiblePages[index - 1];
          const showEllipsis = prevPage && page - prevPage > 1;

          return (
            <React.Fragment key={page}>
              {showEllipsis && (
                <span className="px-2 text-[#451C15]/40">...</span>
              )}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onPageChange(page)}
                className={cn(
                  "w-10 h-10 rounded-full font-medium transition-all duration-300 [font-family:var(--font-inter)]",
                  currentPage === page
                    ? "bg-[#451C15] text-white shadow-lg"
                    : "text-[#451C15] hover:bg-[#451C15]/10"
                )}
              >
                {page}
              </motion.button>
            </React.Fragment>
          );
        })}
      </div>

      {/* Next Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={cn(
          "p-2 rounded-full transition-all duration-300",
          currentPage === totalPages
            ? "text-[#451C15]/30 cursor-not-allowed"
            : "text-[#451C15] hover:bg-[#451C15]/10"
        )}
      >
        <ChevronRight className="w-5 h-5" />
      </motion.button>
    </motion.div>
  );
};

export const BlogListing = ({
  posts = blogPosts,
  categories = blogCategories,
  initialCategory = "all",
  postsPerPage = 9,
  showSearch = true,
  showFilters = true,
  className,
  onPostClick,
}: BlogListingProps) => {
  // State management
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [currentPage, setCurrentPage] = useState(1);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Filter posts based on search and category
  const filteredPosts = useMemo(() => {
    let filtered = [...posts];

    // Category filter
    if (activeCategory !== "all") {
      filtered = filtered.filter((post) => post.category.id === activeCategory);
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.tags.some((tag) => tag.toLowerCase().includes(query)) ||
          post.author.name.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [posts, activeCategory, searchQuery]);

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * postsPerPage;
    return filteredPosts.slice(startIndex, startIndex + postsPerPage);
  }, [filteredPosts, currentPage, postsPerPage]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchQuery]);

  // Determine featured posts (first post on first page)
  const featuredPost = currentPage === 1 ? paginatedPosts[0] : null;
  const regularPosts =
    currentPage === 1 ? paginatedPosts.slice(1) : paginatedPosts;

  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section className={cn("py-12 sm:py-16 lg:py-20", className)}>
      <div className="px-4 sm:px-6 lg:px-8 max-w-[95%] xl:max-w-[90%] mx-auto">
        {/* Search and Filters Bar */}
        {(showSearch || showFilters) && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 sm:mb-12 space-y-6"
          >
            {/* Search Bar */}
            {showSearch && (
              <div className="relative max-w-2xl mx-auto">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles, recipes, tutorials..."
                  className="w-full px-6 py-4 pl-14 pr-12 bg-white border border-[#451C15]/10 rounded-2xl text-[#451C15] placeholder-[#451C15]/40 [font-family:var(--font-inter)] focus:outline-none focus:border-[#D4A574] focus:shadow-lg transition-all duration-300"
                />
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#451C15]/40" />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-[#451C15]/10 transition-colors"
                  >
                    <X className="w-4 h-4 text-[#451C15]/60" />
                  </button>
                )}
              </div>
            )}

            {/* Category Filters - Desktop */}
            {showFilters && (
              <>
                {/* Desktop Filters */}
                <div className="hidden sm:flex items-center justify-center gap-3 flex-wrap">
                  <motion.button
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveCategory("all")}
                    className={cn(
                      "px-5 py-2.5 rounded-full transition-all duration-300 [font-family:var(--font-inter)] text-sm",
                      activeCategory === "all"
                        ? "bg-[#451C15] text-white shadow-lg"
                        : "bg-white text-[#451C15] hover:bg-[#451C15]/10 border border-[#451C15]/20"
                    )}
                  >
                    All Articles
                  </motion.button>

                  {categories.map((category) => (
                    <motion.button
                      key={category.id}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setActiveCategory(category.id)}
                      className={cn(
                        "px-5 py-2.5 rounded-full transition-all duration-300 [font-family:var(--font-inter)] text-sm",
                        activeCategory === category.id
                          ? "shadow-lg text-white"
                          : "bg-white hover:shadow-md border"
                      )}
                      style={{
                        backgroundColor:
                          activeCategory === category.id
                            ? category.color
                            : undefined,
                        borderColor:
                          activeCategory === category.id
                            ? category.color
                            : `${category.color}40`,
                        color:
                          activeCategory === category.id
                            ? "white"
                            : category.color,
                      }}
                    >
                      {category.name}
                    </motion.button>
                  ))}
                </div>

                {/* Mobile Filter Toggle */}
                <div className="sm:hidden">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowMobileFilters(!showMobileFilters)}
                    className="w-full flex items-center justify-between px-4 py-3 bg-white border border-[#451C15]/10 rounded-xl"
                  >
                    <span className="flex items-center gap-2 text-[#451C15] [font-family:var(--font-inter)]">
                      <Filter className="w-5 h-5" />
                      Filter by Category
                    </span>
                    <motion.div
                      animate={{ rotate: showMobileFilters ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronLeft className="w-5 h-5 text-[#451C15]/60 rotate-[-90deg]" />
                    </motion.div>
                  </motion.button>

                  {/* Mobile Filter Dropdown */}
                  <AnimatePresence>
                    {showMobileFilters && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden mt-2"
                      >
                        <div className="p-3 bg-white border border-[#451C15]/10 rounded-xl space-y-2">
                          <button
                            onClick={() => {
                              setActiveCategory("all");
                              setShowMobileFilters(false);
                            }}
                            className={cn(
                              "w-full px-4 py-2 rounded-lg text-left transition-colors [font-family:var(--font-inter)] text-sm",
                              activeCategory === "all"
                                ? "bg-[#451C15] text-white"
                                : "text-[#451C15] hover:bg-[#451C15]/10"
                            )}
                          >
                            All Articles
                          </button>

                          {categories.map((category) => (
                            <button
                              key={category.id}
                              onClick={() => {
                                setActiveCategory(category.id);
                                setShowMobileFilters(false);
                              }}
                              className={cn(
                                "w-full px-4 py-2 rounded-lg text-left transition-colors [font-family:var(--font-inter)] text-sm",
                                activeCategory === category.id
                                  ? "text-white"
                                  : "hover:bg-opacity-10"
                              )}
                              style={{
                                backgroundColor:
                                  activeCategory === category.id
                                    ? category.color
                                    : `${category.color}10`,
                                color:
                                  activeCategory === category.id
                                    ? "white"
                                    : category.color,
                              }}
                            >
                              {category.name}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            )}
          </motion.div>
        )}

        {/* Results Count */}
        {!isLoading && filteredPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6 text-center"
          >
            <p className="text-sm text-[#451C15]/60 [font-family:var(--font-inter)]">
              Showing {paginatedPosts.length} of {filteredPosts.length} articles
              {searchQuery && ` for "${searchQuery}"`}
              {activeCategory !== "all" &&
                ` in ${categories.find((c) => c.id === activeCategory)?.name}`}
            </p>
          </motion.div>
        )}

        {/* Blog Grid */}
        <LayoutGroup>
          <motion.div
            layout
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10"
          >
            {/* Loading State */}
            {isLoading ? (
              <>
                <SkeletonCard variant="featured" />
                {[...Array(5)].map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </>
            ) : filteredPosts.length === 0 ? (
              // Empty State
              <EmptyState
                searchQuery={searchQuery}
                category={activeCategory !== "all" ? activeCategory : undefined}
              />
            ) : (
              // Blog Posts
              <AnimatePresence mode="popLayout">
                {/* Featured Post (spans 2 columns on desktop) */}
                {featuredPost && (
                  <motion.div
                    key={featuredPost.id}
                    layout
                    variants={itemVariants}
                    className="col-span-1 sm:col-span-2 lg:row-span-1"
                  >
                    <BlogPostCard
                      post={featuredPost}
                      variant="featured"
                      index={0}
                      onReadMore={
                        onPostClick
                          ? () => onPostClick(featuredPost)
                          : undefined
                      }
                    />
                  </motion.div>
                )}

                {/* Regular Posts */}
                {regularPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    layout
                    variants={itemVariants}
                    className="col-span-1"
                  >
                    <BlogPostCard
                      post={post}
                      variant="default"
                      index={index + 1}
                      onReadMore={
                        onPostClick ? () => onPostClick(post) : undefined
                      }
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </motion.div>
        </LayoutGroup>

        {/* Pagination */}
        {!isLoading && totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}

        {/* Load More Style Alternative (Optional) */}
        {/* Uncomment if you prefer load more instead of pagination */}
        {/* 
        {!isLoading && paginatedPosts.length < filteredPosts.length && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-12 sm:mt-16"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="group relative px-10 py-4 bg-[#451C15] text-white rounded-full overflow-hidden transition-all duration-300 hover:shadow-2xl [font-family:var(--font-inter)]"
            >
              <span className="relative z-10 flex items-center gap-3">
                Load More Articles
                <motion.span
                  animate={{ y: [0, 3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ChevronDown className="w-5 h-5" />
                </motion.span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#5A241C] to-[#451C15] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>
          </motion.div>
        )}
        */}
      </div>

      {/* Add shimmer animation keyframe */}
      <style jsx>{`
        @keyframes shimmer {
          100% {
            transform: translateX(200%);
          }
        }
      `}</style>
    </section>
  );
};

export default BlogListing;
