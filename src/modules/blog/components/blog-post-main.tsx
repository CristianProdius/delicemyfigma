"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { BlogPostHero } from "./blog-post-hero";
import { BlogPostContent } from "./blog-post-content";
import { BlogPostMeta } from "./blog-post-meta";
import { BlogPostTags } from "./blog-post-tags";
import { BlogPostAuthor } from "./blog-post-author";
import { ShareButtons } from "./share-buttons";
import { BlogComments } from "./blog-comments";
import { BlogSidebar } from "./blog-sidebar";
import { TableOfContents } from "./table-of-contents";
import { Breadcrumbs } from "./breadcrumbs";

import { BlogPostLoading } from "./blog-post-loading";
import { BlogPostError } from "./blog-post-error";
import { 
  getBlogPostBySlug, 
  getRelatedPosts,
  blogCategories,
  type BlogPost 
} from "../data/blog-content";

interface BlogPostMainProps {
  slug: string;
}

export const BlogPostMain = ({ slug }: BlogPostMainProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [tableOfContents, setTableOfContents] = useState<{id: string; title: string; level: number}[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [, setScrollProgress] = useState(0);

  // Track when component is mounted on client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Custom scroll tracking that works better than Motion's useScroll
  const updateScrollProgress = useCallback(() => {
    if (!contentRef.current) return;

    const windowHeight = window.innerHeight;
    const documentHeight = contentRef.current.offsetHeight;
    const scrollTop = window.scrollY;
    
    // Calculate the maximum scrollable distance
    const scrollableHeight = documentHeight - windowHeight;
    
    if (scrollableHeight <= 0) {
      setScrollProgress(1); // If content fits in viewport, show as 100%
      return;
    }
    
    // Calculate progress (0 to 1)
    const progress = Math.min(scrollTop / scrollableHeight, 1);
    setScrollProgress(progress);
  }, []);

  // Set up scroll listener after mount
  useEffect(() => {
    if (!isMounted) return;

    // Initial calculation
    updateScrollProgress();

    // Throttled scroll handler for better performance
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateScrollProgress();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateScrollProgress);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateScrollProgress);
    };
  }, [isMounted, updateScrollProgress]);

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      setError(null);

      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const fetchedPost = getBlogPostBySlug(slug);

        if (!fetchedPost) {
          setError("Article not found");
          setIsLoading(false);
          return;
        }

        setPost(fetchedPost);
        const related = getRelatedPosts(fetchedPost.id, 3);
        setRelatedPosts(related);

        setTableOfContents([
          { id: "intro", title: "Introduction", level: 1 },
          { id: "main", title: "Main Content", level: 1 },
          { id: "conclusion", title: "Conclusion", level: 1 },
        ]);
      } catch (err) {
        console.error("Error fetching post:", err);
        setError("Failed to load article");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  // Recalculate scroll progress when content changes
  useEffect(() => {
    if (isMounted && !isLoading && post) {
      // Give the DOM time to update
      setTimeout(updateScrollProgress, 100);
    }
  }, [isMounted, isLoading, post, updateScrollProgress]);

  if (isLoading) {
    return <BlogPostLoading />;
  }

  if (error || !post) {
    return <BlogPostError message={error || "Something went wrong"} />;
  }

  return (
    <div ref={contentRef}>

      
      <BlogPostHero post={post} />
      
      <div className="relative bg-gradient-to-b from-white to-[#FFF9F5]">
        <div className="relative px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 max-w-[95%] xl:max-w-[90%] mx-auto">
          <Breadcrumbs post={post} />
          
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-12 lg:gap-16">
            <article className="max-w-none">
              <BlogPostMeta post={post} />
              
              {/* Mobile Table of Contents - only render after mount */}
              <div className="lg:hidden mb-8">
                {isMounted && tableOfContents.length > 0 && (
                  <TableOfContents items={tableOfContents} />
                )}
              </div>
              
              <BlogPostContent content={post.content} />
              <BlogPostTags tags={post.tags} />
              
              {/* Share buttons with safe window check */}
              <ShareButtons 
                url={isMounted && typeof window !== "undefined" ? window.location.href : ""}
                title={post.title}
                description={post.excerpt}
              />
              
              <BlogPostAuthor author={post.author} />
              
              {/* Mobile Comments */}
              <div className="lg:hidden mt-12">
                <BlogComments postId={post.id} />
              </div>
            </article>
            
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-6">
                {/* Desktop Table of Contents - only render after mount */}
                {isMounted && tableOfContents.length > 0 && (
                  <TableOfContents items={tableOfContents} />
                )}
                <BlogSidebar
                  categories={blogCategories}
                  popularPosts={relatedPosts}
                  currentPostId={post.id}
                />
              </div>
            </aside>
          </div>
          
          {/* Desktop Comments */}
          <div className="hidden lg:block mt-16">
            <BlogComments postId={post.id} />
          </div>
        </div>
      </div>
    </div>
  );
};