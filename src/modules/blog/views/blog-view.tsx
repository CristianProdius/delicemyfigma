// src/modules/blog/views/blog-view.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import {
  ArrowUp,
  Loader2,
  BookOpen,
  TrendingUp,
  Calendar,
  Coffee,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Import blog components
import { BlogHero } from "../components/blog-hero";
import { BlogListing } from "../components/blog-listing";
import { BlogSidebar } from "../components/blog-sidebar";
import { BlogNewsletter } from "../components/blog-newsletter";

// Import blog data
import {
  blogPosts,
  blogCategories,
  getFeaturedPosts,
  getRecentPosts,
  type BlogPost,
  type BlogCategory,
} from "../data/blog-content";

// Stats Section Component
const BlogStats = () => {
  const stats = [
    {
      icon: BookOpen,
      value: "200+",
      label: "Articles Published",
      color: "#D4A574",
    },
    {
      icon: Coffee,
      value: "500+",
      label: "Recipes Shared",
      color: "#95A99C",
    },
    {
      icon: TrendingUp,
      value: "50K",
      label: "Monthly Readers",
      color: "#E8B4B8",
    },
    {
      icon: Calendar,
      value: "12",
      label: "Years of Experience",
      color: "#B8B2D8",
    },
  ];

  return (
    <section className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-white to-[#FFF9F5]">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 rounded-full bg-gradient-radial from-[#D4A574]/5 to-transparent blur-3xl" />
        <div className="absolute bottom-1/2 right-1/4 w-80 h-80 rounded-full bg-gradient-radial from-[#E8B4B8]/5 to-transparent blur-3xl" />
      </div>

      <div className="relative z-10 max-w-[95%] xl:max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block text-sm lg:text-base text-[#451C15]/70 tracking-[0.3em] uppercase font-medium mb-4 [font-family:var(--font-inter)]">
            Our Impact
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#451C15] [font-family:var(--font-playfair)]">
            Sharing Sweet Knowledge
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{
                delay: index * 0.1,
                duration: 0.6,
                type: "spring",
                stiffness: 100,
              }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.8 }}
                  className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl mb-4"
                  style={{
                    backgroundColor: `${stat.color}20`,
                    color: stat.color,
                  }}
                >
                  <stat.icon className="w-6 h-6 sm:w-7 sm:h-7" />
                </motion.div>
                <div className="text-3xl sm:text-4xl font-light text-[#451C15] mb-2 [font-family:var(--font-playfair)]">
                  {stat.value}
                </div>
                <div className="text-sm text-[#451C15]/60 [font-family:var(--font-inter)]">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Scroll to Top Button
const ScrollToTop = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {showButton && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-4 bg-[#451C15] text-white rounded-full shadow-xl hover:shadow-2xl transition-shadow"
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

// Loading Component
const BlogLoading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-[#FFF9F5]">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="inline-block mb-4"
        >
          <Coffee className="w-16 h-16 text-[#D4A574]" />
        </motion.div>
        <h2 className="text-2xl font-light text-[#451C15] mb-2 [font-family:var(--font-playfair)]">
          Loading sweet stories...
        </h2>
        <Loader2 className="w-6 h-6 text-[#451C15]/60 animate-spin mx-auto" />
      </motion.div>
    </div>
  );
};

// Main BlogView Component
export const BlogView = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Scroll progress tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Parallax transforms
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  // Fetch blog data (ready for Strapi API)
  useEffect(() => {
    const fetchBlogData = async () => {
      setIsLoading(true);

      try {
        // Simulate API call - replace with actual Strapi API
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // In production, these would be API calls:
        // const postsResponse = await fetch('/api/blog-posts');
        // const categoriesResponse = await fetch('/api/blog-categories');

        setPosts(blogPosts);
        setCategories(blogCategories);
        setFeaturedPosts(getFeaturedPosts());
      } catch (error) {
        console.error("Error fetching blog data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogData();
  }, []);

  // Handle search from hero
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Scroll to listing section
    const listingSection = document.getElementById("blog-listing");
    if (listingSection) {
      listingSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Handle category filter from hero
  const handleCategoryFilter = (category: string | null) => {
    setActiveCategory(category);
    // Scroll to listing section
    const listingSection = document.getElementById("blog-listing");
    if (listingSection) {
      listingSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Handle newsletter submission
  const handleNewsletterSubmit = async (email: string) => {
    // Implement newsletter API call
    console.log("Newsletter signup:", email);
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  // Handle post click
  const handlePostClick = (post: BlogPost) => {
    // Navigate to post detail page
    window.location.href = `/blog/${post.slug}`;
  };

  // Handle category click from sidebar
  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
  };

  // Handle tag click from sidebar
  const handleTagClick = (tag: string) => {
    setSearchQuery(tag);
  };

  // Loading state
  if (isLoading) {
    return <BlogLoading />;
  }

  // Get featured post for hero
  const featuredPost = featuredPosts[0]
    ? {
        title: featuredPosts[0].title,
        excerpt: featuredPosts[0].excerpt,
        category: featuredPosts[0].category.name,
        readingTime: featuredPosts[0].readingTime,
      }
    : undefined;

  // Get popular posts for sidebar
  const popularPosts = getRecentPosts(5);

  return (
    <main ref={containerRef} className="flex min-h-screen flex-col">
      {/* Hero Section with search and filters */}
      <div className="relative">
        <BlogHero
          onSearch={handleSearch}
          onCategoryFilter={handleCategoryFilter}
          totalPosts={posts.length}
          featuredPost={featuredPost}
        />
      </div>

      {/* Stats Section */}
      <BlogStats />

      {/* Main Blog Content Area */}
      <section
        id="blog-listing"
        className="relative py-16 sm:py-20 lg:py-24 bg-white"
      >
        {/* Background decoration with parallax */}
        <motion.div
          style={{ y: backgroundY }}
          className="absolute inset-0 pointer-events-none"
        >
          <div className="absolute inset-0">
            {/* Subtle gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FFF9F5]/30 to-transparent" />

            {/* Decorative blobs */}
            <div className="absolute top-1/3 left-0 w-96 h-96 rounded-full bg-gradient-radial from-[#D4A574]/5 to-transparent blur-3xl" />
            <div className="absolute bottom-1/3 right-0 w-96 h-96 rounded-full bg-gradient-radial from-[#95A99C]/5 to-transparent blur-3xl" />
          </div>
        </motion.div>

        {/* Content */}
        <div className="relative z-10 max-w-[95%] xl:max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <span className="inline-block text-sm lg:text-base text-[#451C15]/70 tracking-[0.3em] uppercase font-medium mb-4 [font-family:var(--font-inter)]">
              Latest Articles
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#451C15] mb-4 [font-family:var(--font-playfair)]">
              Explore Our Blog
            </h2>
            <motion.div
              className="mt-6 h-[1px] bg-gradient-to-r from-transparent via-[#451C15]/20 to-transparent max-w-xs mx-auto"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              viewport={{ once: true }}
            />
          </motion.div>

          {/* Blog Grid with Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 lg:gap-12 xl:gap-16">
            {/* Main Blog Listing */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <BlogListing
                posts={posts}
                categories={categories}
                initialCategory={activeCategory || "all"}
                postsPerPage={9}
                showSearch={true}
                showFilters={true}
                onPostClick={handlePostClick}
              />
            </motion.div>

            {/* Sidebar - Hidden on mobile, shown on desktop */}
            <motion.aside
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block"
            >
              <BlogSidebar
                categories={categories}
                popularPosts={popularPosts}
                onCategoryClick={handleCategoryClick}
                onTagClick={handleTagClick}
                onNewsletterSubmit={handleNewsletterSubmit}
              />
            </motion.aside>
          </div>

          {/* Mobile Sidebar CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:hidden mt-12 text-center"
          >
            <div className="p-6 bg-gradient-to-br from-[#FFF9F5] to-white rounded-2xl border border-[#451C15]/10">
              <BookOpen className="w-10 h-10 text-[#D4A574] mx-auto mb-3" />
              <h3 className="text-xl font-medium text-[#451C15] mb-2 [font-family:var(--font-playfair)]">
                Explore More
              </h3>
              <p className="text-sm text-[#451C15]/60 mb-4 [font-family:var(--font-inter)]">
                Discover categories, popular posts, and subscribe to our
                newsletter
              </p>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="px-6 py-2 bg-[#451C15] text-white rounded-full hover:bg-[#5A241C] transition-colors text-sm [font-family:var(--font-inter)]"
              >
                Back to Top
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Newsletter CTA Section */}
      <BlogNewsletter />

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </main>
  );
};

// Export AnimatePresence for use in component
import { AnimatePresence } from "motion/react";

export default BlogView;
