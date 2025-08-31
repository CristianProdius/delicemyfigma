"use client";

import React from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { Home, ChevronLeft } from "lucide-react";
import { type BlogPost } from "../data/blog-content";

interface BreadcrumbsProps {
  post: BlogPost;
}

export const Breadcrumbs = ({ post }: BreadcrumbsProps) => {
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
      <Link
        href={`/blog/category/${post.category.slug}`}
        className="text-[#451C15]/60 hover:text-[#451C15] transition-colors"
      >
        {post.category.name}
      </Link>
      <ChevronLeft className="w-4 h-4 text-[#451C15]/40 rotate-180" />
      <span className="text-[#451C15] font-medium truncate max-w-[200px]">
        {post.title}
      </span>
    </motion.nav>
  );
};