// src/modules/blog/views/blog-category-view.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import {
  Home,
  ChevronLeft,
  ChevronRight,
  Filter,
  SortDesc,
  Calendar,
  TrendingUp,
  Clock,
  BookOpen,
 
  Sparkles,
  Coffee,
  ChefHat,
 
  Heart,
  Users,

} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// Import blog data and components
import {
  blogCategories,
 
  getPostsByCategory,
  type BlogCategory,
  type BlogPost,
} from "../data/blog-content";
import { BlogListing } from "../components/blog-listing";
import { BlogSidebar } from "../components/blog-sidebar";

interface BlogCategoryViewProps {
  categorySlug: string;
}

// Icon mapping for categories
const categoryIcons: {
  [key: string]: React.ComponentType<{ className?: string }>;
} = {
  recipes: Coffee,
  business: TrendingUp,
  techniques: ChefHat,
  events: Calendar,
  lifestyle: Heart,
};

// Sort options
const sortOptions = [
  { value: "latest", label: "Latest First", icon: Calendar },
  { value: "popular", label: "Most Popular", icon: TrendingUp },
  { value: "readTime", label: "Reading Time", icon: Clock },
];

// Loading skeleton
const CategorySkeleton = () => {
  return (
    <div className="min-h-screen">
      {/* Hero skeleton */}
      <div className="relative h-[400px] bg-gradient-to-br from-[#451C15] to-[#5A241C] animate-pulse">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-4 px-4">
            <div className="h-12 w-12 bg-white/20 rounded-full mx-auto" />
            <div className="h-10 w-64 bg-white/20 rounded mx-auto" />
            <div className="h-6 w-96 bg-white/20 rounded mx-auto" />
            <div className="flex gap-4 justify-center mt-6">
              <div className="h-10 w-32 bg-white/20 rounded-full" />
              <div className="h-10 w-32 bg-white/20 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Content skeleton */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-96 bg-gray-200 rounded-2xl animate-pulse"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Breadcrumbs Component
const Breadcrumbs = ({ category }: { category: BlogCategory }) => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center space-x-2 text-sm mb-8"
    >
      <Link
        href="/"
        className="flex items-center text-[#451C15]/60 hover:text-[#451C15] transition-colors"
      >
        <Home className="w-4 h-4 mr-1" />
        <span>Home</span>
      </Link>
      <ChevronLeft className="w-4 h-4 text-[#451C15]/40 rotate-180" />
      <Link
        href="/blog"
        className="text-[#451C15]/60 hover:text-[#451C15] transition-colors"
      >
        Blog
      </Link>
      <ChevronLeft className="w-4 h-4 text-[#451C15]/40 rotate-180" />
      <span className="text-[#451C15] font-medium">{category.name}</span>
    </motion.nav>
  );
};

// Category Hero Section
const CategoryHero = ({
  category,
  postCount,
}: {
  category: BlogCategory;
  postCount: number;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax effects
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);

  const Icon = categoryIcons[category.id] || BookOpen;

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden"
      style={{ backgroundColor: category.color }}
    >
      {/* Background gradient */}
      <motion.div style={{ y: imageY }} className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      </motion.div>

      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 right-20 text-white/10"
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <Sparkles className="w-24 h-24" />
        </motion.div>

        <motion.div
          className="absolute bottom-20 left-20 text-white/10"
          animate={{
            rotate: -360,
            scale: [1, 1.3, 1],
          }}
          transition={{
            rotate: { duration: 25, repeat: Infinity, ease: "linear" },
            scale: { duration: 5, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <Icon className="w-32 h-32" />
        </motion.div>
      </div>

      {/* Content */}
      <motion.div
        style={{ opacity, y: contentY }}
        className="relative z-10 py-24 sm:py-32 lg:py-40"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Icon Badge */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
            }}
            className="inline-flex items-center justify-center mb-6"
          >
            <div className="p-4 bg-white/20 backdrop-blur-md rounded-2xl shadow-xl">
              <Icon className="w-12 h-12 text-white" />
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-light text-white mb-4 [font-family:var(--font-playfair)]"
          >
            {category.name}
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto mb-8 [font-family:var(--font-inter)]"
          >
            {category.description}
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="inline-flex items-center gap-6 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full"
          >
            <div className="flex items-center gap-2 text-white">
              <BookOpen className="w-5 h-5" />
              <span className="font-medium text-lg">{postCount} Articles</span>
            </div>
            <div className="w-px h-6 bg-white/30" />
            <div className="flex items-center gap-2 text-white">
              <Users className="w-5 h-5" />
              <span className="font-medium text-lg">12k Readers</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          className="w-full h-16 sm:h-20 lg:h-24 fill-white"
        >
          <path d="M0,64 C480,150 960,-50 1440,64 L1440,120 L0,120 Z" />
        </svg>
      </div>
    </section>
  );
};

// Filter Bar Component
const FilterBar = ({
  sortBy,
  onSortChange,
  showFilters,
  onToggleFilters,
}: {
  sortBy: string;
  onSortChange: (value: string) => void;
  showFilters: boolean;
  onToggleFilters: () => void;
}) => {
  const [showSortMenu, setShowSortMenu] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-lg border border-[#451C15]/10 p-4 mb-8"
    >
      <div className="flex items-center justify-between">
        {/* Left: Result count */}
        <div className="hidden sm:block text-sm text-[#451C15]/60 [font-family:var(--font-inter)]">
          Showing all articles in this category
        </div>

        {/* Right: Controls */}
        <div className="flex items-center gap-3 ml-auto">
          {/* Sort Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowSortMenu(!showSortMenu)}
              className="flex items-center gap-2 px-4 py-2 bg-[#451C15]/5 hover:bg-[#451C15]/10 rounded-full transition-colors"
            >
              <SortDesc className="w-4 h-4 text-[#451C15]" />
              <span className="text-sm text-[#451C15] [font-family:var(--font-inter)]">
                {sortOptions.find((opt) => opt.value === sortBy)?.label}
              </span>
              <motion.div
                animate={{ rotate: showSortMenu ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronLeft className="w-4 h-4 text-[#451C15] rotate-[-90deg]" />
              </motion.div>
            </button>

            {/* Sort Menu */}
            {showSortMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-[#451C15]/10 overflow-hidden z-20"
              >
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      onSortChange(option.value);
                      setShowSortMenu(false);
                    }}
                    className={cn(
                      "w-full px-4 py-3 flex items-center gap-3 hover:bg-[#451C15]/5 transition-colors",
                      sortBy === option.value && "bg-[#451C15]/10"
                    )}
                  >
                    <option.icon className="w-4 h-4 text-[#451C15]/70" />
                    <span className="text-sm text-[#451C15] [font-family:var(--font-inter)]">
                      {option.label}
                    </span>
                  </button>
                ))}
              </motion.div>
            )}
          </div>

          {/* Filter Toggle */}
          <button
            onClick={onToggleFilters}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-full transition-all",
              showFilters
                ? "bg-[#451C15] text-white"
                : "bg-[#451C15]/5 text-[#451C15] hover:bg-[#451C15]/10"
            )}
          >
            <Filter className="w-4 h-4" />
            <span className="text-sm [font-family:var(--font-inter)]">
              Filters
            </span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// Related Categories Component
const RelatedCategories = ({
  currentCategory,
  onCategoryChange,
}: {
  currentCategory: BlogCategory;
  onCategoryChange: (slug: string) => void;
}) => {
  const otherCategories = blogCategories.filter(
    (cat) => cat.id !== currentCategory.id
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="py-16 bg-gradient-to-b from-[#FFF9F5] to-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-light text-[#451C15] mb-8 text-center [font-family:var(--font-playfair)]">
          Explore More Topics
        </h2>

        <div className="flex flex-wrap justify-center gap-4">
          {otherCategories.map((category) => {
            const Icon = categoryIcons[category.id] || BookOpen;
            const postCount = getPostsByCategory(category.id).length;

            return (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onCategoryChange(category.slug)}
                className="group flex items-center gap-3 px-6 py-3 bg-white rounded-full shadow-md hover:shadow-xl transition-all border border-[#451C15]/10"
                style={{
                  borderColor: `${category.color}30`,
                }}
              >
                <div
                  className="p-2 rounded-lg"
                  style={{
                    backgroundColor: `${category.color}15`,
                    color: category.color,
                  }}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-[#451C15] [font-family:var(--font-inter)]">
                    {category.name}
                  </p>
                  <p className="text-xs text-[#451C15]/60 [font-family:var(--font-inter)]">
                    {postCount} articles
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-[#451C15]/40 group-hover:text-[#451C15] transition-colors" />
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

// Main BlogCategoryView Component
export const BlogCategoryView = ({ categorySlug }: BlogCategoryViewProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState<BlogCategory | null>(null);
  const [categoryPosts, setCategoryPosts] = useState<BlogPost[]>([]);
  const [sortBy, setSortBy] = useState("latest");
  const [showFilters, setShowFilters] = useState(false);

  // Fetch category data
  useEffect(() => {
    const fetchCategoryData = async () => {
      setIsLoading(true);

      try {
        // Simulate API call - replace with actual Strapi API
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Find category
        const foundCategory = blogCategories.find(
          (cat) => cat.slug === categorySlug
        );

        if (!foundCategory) {
          // Handle category not found
          setIsLoading(false);
          return;
        }

        setCategory(foundCategory);

        // Get posts for this category
        const posts = getPostsByCategory(foundCategory.id);

        // Sort posts based on selected option
        const sortedPosts = [...posts].sort((a, b) => {
          switch (sortBy) {
            case "popular":
              // Sort by featured status and reading time (as proxy for popularity)
              return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
            case "readTime":
              return a.readingTime - b.readingTime;
            case "latest":
            default:
              return (
                new Date(b.publishedAt).getTime() -
                new Date(a.publishedAt).getTime()
              );
          }
        });

        setCategoryPosts(sortedPosts);
      } catch (error) {
        console.error("Error fetching category data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategoryData();
  }, [categorySlug, sortBy]);

  // Handle category change
  const handleCategoryChange = (newSlug: string) => {
    // Navigate to new category
    window.location.href = `/blog/category/${newSlug}`;
  };

  // Handle newsletter signup
  const handleNewsletterSubmit = async (email: string) => {
    console.log("Newsletter signup:", email);
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  // Loading state
  if (isLoading) {
    return <CategorySkeleton />;
  }

  // Category not found
  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <Coffee className="w-16 h-16 text-[#451C15]/30 mx-auto" />
          <h1 className="text-2xl font-light text-[#451C15] [font-family:var(--font-playfair)]">
            Category not found
          </h1>
          <Link href="/blog">
            <Button variant="outline" className="mt-4">
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Get popular posts for sidebar
  const popularPosts = [...categoryPosts]
    .sort((a, b) => b.readingTime - a.readingTime)
    .slice(0, 5);

  return (
    <main className="min-h-screen">
      {/* Category Hero */}
      <CategoryHero category={category} postCount={categoryPosts.length} />

      {/* Main Content */}
      <div className="relative bg-white">
        <div className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 max-w-[95%] xl:max-w-[90%] mx-auto">
          {/* Breadcrumbs */}
          <Breadcrumbs category={category} />

          {/* Filter Bar */}
          <FilterBar
            sortBy={sortBy}
            onSortChange={setSortBy}
            showFilters={showFilters}
            onToggleFilters={() => setShowFilters(!showFilters)}
          />

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-12 lg:gap-16">
            {/* Blog Listing */}
            <div>
              <BlogListing
                posts={categoryPosts}
                categories={blogCategories}
                initialCategory={category.id}
                postsPerPage={9}
                showSearch={false}
                showFilters={false}
                onPostClick={(post) => {
                  window.location.href = `/blog/${post.slug}`;
                }}
              />
            </div>

            {/* Sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <BlogSidebar
                  categories={blogCategories}
                  popularPosts={popularPosts}
                  onCategoryClick={(catId) => {
                    const cat = blogCategories.find((c) => c.id === catId);
                    if (cat) handleCategoryChange(cat.slug);
                  }}
                  onNewsletterSubmit={handleNewsletterSubmit}
                />
              </div>
            </aside>
          </div>
        </div>
      </div>

      {/* Related Categories */}
      <RelatedCategories
        currentCategory={category}
        onCategoryChange={handleCategoryChange}
      />

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-[#451C15] to-[#5A241C] py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl sm:text-4xl font-light text-white [font-family:var(--font-playfair)]">
              Never Miss a {category.name} Article
            </h2>
            <p className="text-lg text-white/80 [font-family:var(--font-inter)]">
              Get the latest {category.name.toLowerCase()} delivered straight to
              your inbox
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/blog">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent text-white border-white hover:bg-white hover:text-[#451C15] transition-all duration-300"
                >
                  Browse All Articles
                </Button>
              </Link>
              <Button
                size="lg"
                className="bg-white text-[#451C15] hover:bg-[#F8F5F0] transition-all duration-300"
              >
                Subscribe to Newsletter
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default BlogCategoryView;
