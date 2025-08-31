"use client";

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Share2, Bookmark, Heart, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { type BlogPost } from "../data/blog-content";

interface FloatingActionsProps {
  post: BlogPost;
}

export const FloatingActions = ({ post }: FloatingActionsProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const bookmarks = localStorage.getItem("bookmarkedPosts");
    if (bookmarks) {
      const bookmarkedIds = JSON.parse(bookmarks);
      setIsBookmarked(bookmarkedIds.includes(post.id));
    }
  }, [post.id]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    }
  };

  const handleBookmark = () => {
    const bookmarks = localStorage.getItem("bookmarkedPosts");
    let bookmarkedIds = bookmarks ? JSON.parse(bookmarks) : [];

    if (isBookmarked) {
      bookmarkedIds = bookmarkedIds.filter((id: string) => id !== post.id);
    } else {
      bookmarkedIds.push(post.id);
    }

    localStorage.setItem("bookmarkedPosts", JSON.stringify(bookmarkedIds));
    setIsBookmarked(!isBookmarked);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1 }}
      className="fixed right-4 bottom-4 sm:right-8 sm:bottom-8 flex flex-col gap-3 z-40"
    >
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleShare}
        className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
      >
        <Share2 className="w-5 h-5 text-[#451C15]" />
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleBookmark}
        className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
      >
        <Bookmark
          className={cn(
            "w-5 h-5",
            isBookmarked ? "text-[#D4A574] fill-[#D4A574]" : "text-[#451C15]"
          )}
        />
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsLiked(!isLiked)}
        className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
      >
        <Heart
          className={cn(
            "w-5 h-5",
            isLiked ? "text-red-500 fill-red-500" : "text-[#451C15]"
          )}
        />
      </motion.button>

      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="p-3 bg-[#451C15] text-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      )}
    </motion.div>
  );
};