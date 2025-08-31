"use client";

import React from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { Tag } from "lucide-react";

interface BlogPostTagsProps {
  tags: string[];
}

export const BlogPostTags = ({ tags }: BlogPostTagsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-[#451C15]/10"
    >
      {tags.map((tag) => (
        <Link
          key={tag}
          href={`/blog/tag/${tag}`}
          className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#451C15]/5 hover:bg-[#451C15]/10 text-[#451C15] rounded-full text-sm transition-colors [font-family:var(--font-inter)]"
        >
          <Tag className="w-3 h-3" />
          {tag}
        </Link>
      ))}
    </motion.div>
  );
};