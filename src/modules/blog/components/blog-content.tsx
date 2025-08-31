"use client";

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { BookOpen } from "lucide-react";
import { BlogListing } from "./blog-listing";
import { BlogSidebar } from "./blog-sidebar";
import {
  blogPosts,
  blogCategories,
  getRecentPosts,
  type BlogPost,
  type BlogCategory,
} from "../data/blog-content";

export const BlogContent = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      // Simulate API call - replace with actual Strapi API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setPosts(blogPosts);
      setCategories(blogCategories);
      setIsLoading(false);
    };

    loadData();
  }, []);

  const handlePostClick = (post: BlogPost) => {
    window.location.href = `/blog/${post.slug}`;
  };

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
  };

  const handleTagClick = (tag: string) => {
    setSearchQuery(tag);
  };

  const handleNewsletterSubmit = async (email: string) => {
    console.log("Newsletter signup:", email);
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  const popularPosts = getRecentPosts(5);

  if (isLoading) {
    return (
      <section className="relative py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-[95%] xl:max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-4"></div>
              <div className="h-12 bg-gray-200 rounded w-64 mx-auto mb-8"></div>
              <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-48 bg-gray-200 rounded"></div>
                  ))}
                </div>
                <div className="hidden lg:block h-96 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="blog-listing"
      className="relative py-16 sm:py-20 lg:py-24 bg-white overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FFF9F5]/30 to-transparent" />
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
            className="absolute top-1/3 left-0 w-96 h-96 rounded-full bg-gradient-radial from-[#D4A574]/5 to-transparent blur-3xl"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.3 }}
            className="absolute bottom-1/3 right-0 w-96 h-96 rounded-full bg-gradient-radial from-[#95A99C]/5 to-transparent blur-3xl"
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="max-w-[95%] xl:max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8">
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
      </div>
    </section>
  );
};