// src/modules/blog/views/blog-post-view.tsx
"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  Home,
  Share2,
  Bookmark,
  Heart,
  MessageCircle,
  Clock,
  Calendar,
  Tag,
  User,
  ArrowUp,
  Coffee,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Import blog data
import {
  getBlogPostBySlug,
  getRelatedPosts,
  blogCategories,
  type BlogPost,
} from "../data/blog-content";

// Import blog components (these will be created separately)
import { BlogPostHero } from "../components/blog-post-hero";
import { BlogPostContent } from "../components/blog-post-content";
import { BlogPostAuthor } from "../components/blog-post-author";
import { RelatedPosts } from "../components/related-posts";
import { BlogComments } from "../components/blog-comments";
import { BlogSidebar } from "../components/blog-sidebar";
import { ShareButtons } from "../components/share-buttons";
import { TableOfContents } from "../components/table-of-contents";

interface BlogPostViewProps {
  slug: string;
}

// Loading skeleton component
const BlogPostSkeleton = () => {
  return (
    <div className="min-h-screen">
      {/* Hero skeleton */}
      <div className="relative h-[500px] bg-gradient-to-br from-[#451C15] to-[#5A241C] animate-pulse">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-4 px-4">
            <div className="h-8 w-32 bg-white/20 rounded-full mx-auto" />
            <div className="h-12 w-96 bg-white/20 rounded mx-auto" />
            <div className="h-6 w-64 bg-white/20 rounded mx-auto" />
          </div>
        </div>
      </div>

      {/* Content skeleton */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-12">
          <div className="space-y-6">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse" />
              </div>
            ))}
          </div>
          <div className="space-y-6">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-48 bg-gray-200 rounded-2xl animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Error component
const BlogPostError = ({ message }: { message: string }) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <Coffee className="w-16 h-16 text-[#451C15]/30 mx-auto" />
        <h1 className="text-2xl font-light text-[#451C15] [font-family:var(--font-playfair)]">
          {message}
        </h1>
        <Link href="/blog">
          <Button variant="outline" className="mt-4">
            Back to Blog
          </Button>
        </Link>
      </div>
    </div>
  );
};

// Breadcrumbs Component
const Breadcrumbs = ({ post }: { post: BlogPost }) => {
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

// Progress Bar Component
const ReadingProgress = ({ progress }: { progress: number }) => {
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-[#451C15]/10 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <motion.div
        className="h-full bg-gradient-to-r from-[#D4A574] to-[#A67B5B]"
        style={{ width: `${progress * 100}%` }}
      />
    </motion.div>
  );
};

// Floating Action Buttons
const FloatingActions = ({
  post,
  onShare,
  onBookmark,
  isBookmarked,
}: {
  post: BlogPost;
  onShare: () => void;
  onBookmark: () => void;
  isBookmarked: boolean;
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        onClick={onShare}
        className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
      >
        <Share2 className="w-5 h-5 text-[#451C15]" />
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onBookmark}
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

// Main BlogPostView Component
export const BlogPostView = ({ slug }: BlogPostViewProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [tableOfContents, setTableOfContents] = useState<any[]>([]);

  // Scroll progress tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Parallax effects
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  // Fetch post data (ready for Strapi API)
  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Simulate API call - replace with actual Strapi API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Get post from local data
        const fetchedPost = getBlogPostBySlug(slug);

        if (!fetchedPost) {
          setError("Article not found");
          setIsLoading(false);
          return;
        }

        setPost(fetchedPost);

        // Get related posts
        const related = getRelatedPosts(fetchedPost.id, 3);
        setRelatedPosts(related);

        // Generate table of contents from content
        // This would parse the markdown/HTML content for headings
        setTableOfContents([
          { id: "intro", title: "Introduction", level: 1 },
          { id: "main", title: "Main Content", level: 1 },
          { id: "conclusion", title: "Conclusion", level: 1 },
        ]);

        // Check if bookmarked (from localStorage or user data)
        const bookmarks = localStorage.getItem("bookmarkedPosts");
        if (bookmarks) {
          const bookmarkedIds = JSON.parse(bookmarks);
          setIsBookmarked(bookmarkedIds.includes(fetchedPost.id));
        }
      } catch (err) {
        console.error("Error fetching post:", err);
        setError("Failed to load article");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  // Handle share
  const handleShare = async () => {
    if (navigator.share && post) {
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

  // Handle bookmark
  const handleBookmark = () => {
    if (!post) return;

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

  // Handle newsletter signup
  const handleNewsletterSubmit = async (email: string) => {
    // Implement newsletter API call
    console.log("Newsletter signup:", email);
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  // Loading state
  if (isLoading) {
    return <BlogPostSkeleton />;
  }

  // Error state
  if (error || !post) {
    return <BlogPostError message={error || "Something went wrong"} />;
  }

  // Get popular posts for sidebar
  const popularPosts = relatedPosts; // Or fetch separately

  return (
    <main ref={containerRef} className="min-h-screen">
      {/* Reading Progress */}
      <ReadingProgress progress={scrollYProgress.get()} />

      {/* Hero Section */}
      <BlogPostHero post={post} />

      {/* Main Content Area */}
      <div className="relative bg-gradient-to-b from-white to-[#FFF9F5]">
        {/* Background decoration */}
        <motion.div
          style={{ y: backgroundY }}
          className="absolute inset-0 pointer-events-none"
        >
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-radial from-[#D4A574]/5 to-transparent blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-gradient-radial from-[#E8B4B8]/5 to-transparent blur-3xl" />
        </motion.div>

        <div className="relative px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 max-w-[95%] xl:max-w-[90%] mx-auto">
          {/* Breadcrumbs */}
          <Breadcrumbs post={post} />

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-12 lg:gap-16">
            {/* Main Article */}
            <article className="max-w-none">
              {/* Article Meta Bar */}
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

              {/* Table of Contents (mobile) */}
              <div className="lg:hidden mb-8">
                <TableOfContents items={tableOfContents} />
              </div>

              {/* Article Content */}
              <BlogPostContent content={post.content} />

              {/* Tags */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-[#451C15]/10"
              >
                {post.tags.map((tag) => (
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

              {/* Share Section */}
              <ShareButtons
                url={typeof window !== "undefined" ? window.location.href : ""}
                title={post.title}
                description={post.excerpt}
              />

              {/* Author Bio */}
              <BlogPostAuthor author={post.author} />

              {/* Comments Section (mobile/tablet) */}
              <div className="lg:hidden mt-12">
                <BlogComments postId={post.id} />
              </div>
            </article>

            {/* Sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-6">
                {/* Table of Contents */}
                <TableOfContents items={tableOfContents} />

                {/* Sidebar Widgets */}
                <BlogSidebar
                  categories={blogCategories}
                  popularPosts={popularPosts}
                  currentPostId={post.id}
                  onNewsletterSubmit={handleNewsletterSubmit}
                />
              </div>
            </aside>
          </div>

          {/* Comments Section (desktop) */}
          <div className="hidden lg:block mt-16">
            <BlogComments postId={post.id} />
          </div>
        </div>
      </div>

      {/* Related Posts Section */}
      <RelatedPosts currentPost={post} posts={relatedPosts} />

      {/* Floating Action Buttons */}
      <FloatingActions
        post={post}
        onShare={handleShare}
        onBookmark={handleBookmark}
        isBookmarked={isBookmarked}
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
              Enjoyed this article?
            </h2>
            <p className="text-lg text-white/80 [font-family:var(--font-inter)]">
              Join our chocolate-loving community and never miss a sweet story
            </p>
            <Link href="/blog">
              <Button
                size="lg"
                className="bg-white text-[#451C15] hover:bg-[#F8F5F0] transition-all duration-300"
              >
                Explore More Articles
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default BlogPostView;
