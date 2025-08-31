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
  const [isMounted, setIsMounted] = useState(false);

  // Track when component is mounted
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Handle scroll events only after mount
  useEffect(() => {
    if (!isMounted) return;

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMounted]);

  // Load bookmark state only after mount (localStorage is client-only)
  useEffect(() => {
    if (!isMounted) return;

    try {
      const bookmarks = localStorage.getItem("bookmarkedPosts");
      if (bookmarks) {
        const bookmarkedIds = JSON.parse(bookmarks);
        setIsBookmarked(bookmarkedIds.includes(post.id));
      }
    } catch (error) {
      console.error("Error loading bookmarks:", error);
    }
  }, [post.id, isMounted]);

  // Load liked state only after mount
  useEffect(() => {
    if (!isMounted) return;

    try {
      const likes = localStorage.getItem("likedPosts");
      if (likes) {
        const likedIds = JSON.parse(likes);
        setIsLiked(likedIds.includes(post.id));
      }
    } catch (error) {
      console.error("Error loading likes:", error);
    }
  }, [post.id, isMounted]);

  const handleShare = async () => {
    if (!isMounted) return;

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
    } else {
      // Fallback: Copy to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        // You could add a toast notification here
      } catch (err) {
        console.error("Error copying to clipboard:", err);
      }
    }
  };

  const handleBookmark = () => {
    if (!isMounted) return;

    try {
      const bookmarks = localStorage.getItem("bookmarkedPosts");
      let bookmarkedIds = bookmarks ? JSON.parse(bookmarks) : [];

      if (isBookmarked) {
        bookmarkedIds = bookmarkedIds.filter((id: string) => id !== post.id);
      } else {
        bookmarkedIds.push(post.id);
      }

      localStorage.setItem("bookmarkedPosts", JSON.stringify(bookmarkedIds));
      setIsBookmarked(!isBookmarked);
    } catch (error) {
      console.error("Error updating bookmarks:", error);
    }
  };

  const handleLike = () => {
    if (!isMounted) return;

    try {
      const likes = localStorage.getItem("likedPosts");
      let likedIds = likes ? JSON.parse(likes) : [];

      if (isLiked) {
        likedIds = likedIds.filter((id: string) => id !== post.id);
      } else {
        likedIds.push(post.id);
      }

      localStorage.setItem("likedPosts", JSON.stringify(likedIds));
      setIsLiked(!isLiked);
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  const scrollToTop = () => {
    if (!isMounted) return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Don't render anything until mounted to avoid hydration mismatches
  if (!isMounted) {
    return null;
  }

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
        aria-label="Share this post"
      >
        <Share2 className="w-5 h-5 text-[#451C15]" />
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleBookmark}
        className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
        aria-label={isBookmarked ? "Remove bookmark" : "Bookmark this post"}
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
        onClick={handleLike}
        className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
        aria-label={isLiked ? "Unlike this post" : "Like this post"}
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
          exit={{ opacity: 0, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="p-3 bg-[#451C15] text-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      )}
    </motion.div>
  );
};