// src/modules/blog/components/related-posts.tsx
"use client";

import { motion } from "motion/react";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { BlogPost } from "../data/blog-content";

interface RelatedPostsProps {
  currentPost: BlogPost;
  posts: BlogPost[];
  className?: string;
}

export const RelatedPosts = ({ posts, className }: RelatedPostsProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const scrollToDirection = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    
    const scrollAmount = 400;
    const currentScroll = scrollContainerRef.current.scrollLeft;
    
    scrollContainerRef.current.scrollTo({
      left: direction === "left" ? currentScroll - scrollAmount : currentScroll + scrollAmount,
      behavior: "smooth"
    });
  };

  if (!posts || posts.length === 0) return null;

  return (
    <section className={cn("py-16 sm:py-20 bg-gradient-to-b from-[#FFF9F5] to-white", className)}>
      <div className="max-w-[95%] xl:max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#451C15] [font-family:var(--font-playfair)]">
            You Might Also Enjoy
          </h2>
          <p className="mt-4 text-lg text-[#451C15]/60 [font-family:var(--font-inter)]">
            More stories from our chocolate journey
          </p>
        </motion.div>

        {/* Posts Carousel */}
        <div className="relative">
          {/* Navigation Buttons - only show after mount */}
          {isMounted && (
            <>
              <button
                onClick={() => scrollToDirection("left")}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-shadow hidden sm:block"
                aria-label="Previous posts"
              >
                <ChevronLeft className="w-5 h-5 text-[#451C15]" />
              </button>
              <button
                onClick={() => scrollToDirection("right")}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-shadow hidden sm:block"
                aria-label="Next posts"
              >
                <ChevronRight className="w-5 h-5 text-[#451C15]" />
              </button>
            </>
          )}

          {/* Posts Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {posts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex-shrink-0 w-full sm:w-[380px] group"
              >
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                    {/* Image Container */}
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={post.featuredImage}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#451C15]/60 to-transparent" />
                      
                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <span 
                          className="inline-flex items-center px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium [font-family:var(--font-inter)]"
                          style={{ color: post.category?.color || '#451C15' }}
                        >
                          <span
                            className="w-2 h-2 rounded-full mr-2"
                            style={{ backgroundColor: post.category?.color || '#451C15' }}
                          />
                          {post.category?.name || 'Article'}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-4">
                      {/* Title */}
                      <h3 className="text-xl font-light text-[#451C15] [font-family:var(--font-playfair)] line-clamp-2 group-hover:text-[#D4A574] transition-colors">
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-sm text-[#451C15]/60 [font-family:var(--font-inter)] line-clamp-3">
                        {post.excerpt}
                      </p>

                      {/* Meta Info */}
                      <div className="flex items-center justify-between pt-4 border-t border-[#451C15]/10">
                        <div className="flex items-center gap-4 text-xs text-[#451C15]/50 [font-family:var(--font-inter)]">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <time dateTime={post.publishedAt}>
                              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric"
                              })}
                            </time>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{post.readingTime} min</span>
                          </div>
                        </div>

                        {/* Arrow Icon */}
                        <motion.div
                          className="p-2 rounded-full bg-[#451C15]/5 group-hover:bg-[#D4A574] transition-colors"
                          whileHover={isMounted ? { x: 5 } : {}}
                        >
                          <ArrowRight className="w-4 h-4 text-[#451C15] group-hover:text-white transition-colors" />
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/blog">
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#D4A574] to-[#A67B5B] text-white hover:shadow-xl transition-all duration-300"
            >
              Explore All Articles
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* CSS for hiding scrollbar */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};