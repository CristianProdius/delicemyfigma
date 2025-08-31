"use client";

import React from "react";
import { motion } from "motion/react";
import { Calendar, Clock, MessageCircle, Heart } from "lucide-react";
import { type BlogPost } from "../data/blog-content";

interface BlogPostMetaProps {
  post: BlogPost;
}

export const BlogPostMeta = ({ post }: BlogPostMetaProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="flex flex-wrap items-center gap-4 pb-6 mb-8 border-b border-[#451C15]/10"
    >
      <div className="flex items-center gap-2 text-sm text-[#451C15]/60">
        <Calendar className="w-4 h-4" />
        <time dateTime={post.publishedAt}>
          {new Date(post.publishedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
      </div>
      <div className="flex items-center gap-2 text-sm text-[#451C15]/60">
        <Clock className="w-4 h-4" />
        <span>{post.readingTime} min read</span>
      </div>
      <div className="flex items-center gap-2 text-sm text-[#451C15]/60">
        <MessageCircle className="w-4 h-4" />
        <span>12 comments</span>
      </div>
      <div className="flex items-center gap-2 text-sm text-[#451C15]/60">
        <Heart className="w-4 h-4" />
        <span>234 likes</span>
      </div>
    </motion.div>
  );
};