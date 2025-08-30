// src/modules/blog/components/blog-sidebar.tsx
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  FolderOpen,
  TrendingUp,
  Mail,
  Tag,
  Clock,
  Calendar,
  User,
  ArrowRight,
  Sparkles,
  Coffee,
  BookOpen,
  Send,
  CheckCircle,
  Star,
  Heart,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { BlogPost, BlogCategory, getPopularTags } from "../data/blog-content";

interface BlogSidebarProps {
  categories: BlogCategory[];
  popularPosts: BlogPost[];
  currentPostId?: string;
  className?: string;
  onCategoryClick?: (categoryId: string) => void;
  onTagClick?: (tag: string) => void;
  onNewsletterSubmit?: (email: string) => Promise<void>;
}

// Widget Card Container
const WidgetCard = ({
  children,
  className,
  title,
  icon: Icon,
  accentColor = "#D4A574",
}: {
  children: React.ReactNode;
  className?: string;
  title?: string;
  icon?: React.ComponentType<{ className?: string }>;
  accentColor?: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "relative bg-white/95 backdrop-blur-sm rounded-2xl border border-[#451C15]/10",
        "shadow-lg hover:shadow-xl transition-all duration-300",
        "overflow-hidden",
        className
      )}
    >
      {/* Gradient accent on hover */}
      <div
        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${accentColor}10 0%, transparent 50%, ${accentColor}10 100%)`,
        }}
      />

      {/* Glass effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent pointer-events-none" />

      <div className="relative z-10 p-6">
        {title && (
          <div className="flex items-center gap-3 mb-4 pb-3 border-b border-[#451C15]/10">
            {Icon && (
              <div
                className="p-2 rounded-lg"
                style={{
                  backgroundColor: `${accentColor}15`,
                  color: accentColor,
                }}
              >
                <Icon className="w-5 h-5" />
              </div>
            )}
            <h3 className="text-lg font-medium text-[#451C15] [font-family:var(--font-playfair)]">
              {title}
            </h3>
          </div>
        )}
        {children}
      </div>
    </motion.div>
  );
};

// Categories Widget
const CategoriesWidget = ({
  categories,
  postsCount,
  onCategoryClick,
  activeCategory,
}: {
  categories: BlogCategory[];
  postsCount: Record<string, number>;
  onCategoryClick?: (categoryId: string) => void;
  activeCategory?: string;
}) => {
  return (
    <WidgetCard title="Categories" icon={FolderOpen} accentColor="#95A99C">
      <div className="space-y-2">
        {categories.map((category, index) => (
          <motion.button
            key={category.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ x: 5 }}
            onClick={() => onCategoryClick?.(category.id)}
            className={cn(
              "w-full flex items-center justify-between p-3 rounded-xl",
              "transition-all duration-300 group",
              activeCategory === category.id
                ? "bg-gradient-to-r from-[#451C15]/10 to-transparent"
                : "hover:bg-[#451C15]/5"
            )}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: category.color }}
              />
              <span
                className={cn(
                  "text-sm font-medium [font-family:var(--font-inter)]",
                  activeCategory === category.id
                    ? "text-[#451C15]"
                    : "text-[#451C15]/70 group-hover:text-[#451C15]"
                )}
              >
                {category.name}
              </span>
            </div>
            <span
              className="px-2 py-1 text-xs rounded-full font-medium"
              style={{
                backgroundColor: `${category.color}20`,
                color: category.color,
              }}
            >
              {postsCount[category.id] || 0}
            </span>
          </motion.button>
        ))}
      </div>
    </WidgetCard>
  );
};

// Popular Posts Widget
const PopularPostsWidget = ({
  posts,
  currentPostId,
}: {
  posts: BlogPost[];
  currentPostId?: string;
}) => {
  return (
    <WidgetCard
      title="Popular Articles"
      icon={TrendingUp}
      accentColor="#E8B4B8"
    >
      <div className="space-y-4">
        {posts.slice(0, 5).map((post, index) => (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={cn(
              "group",
              post.id === currentPostId && "opacity-50 pointer-events-none"
            )}
          >
            <Link href={`/blog/${post.slug}`}>
              <div className="flex gap-3 p-2 -m-2 rounded-lg hover:bg-[#451C15]/5 transition-colors">
                {/* Thumbnail */}
                <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={post.featuredImage}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="64px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

                  {/* Rank badge */}
                  <div className="absolute top-1 left-1 w-5 h-5 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <span className="text-[10px] font-bold text-[#451C15]">
                      {index + 1}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-[#451C15] line-clamp-2 mb-1 group-hover:text-black transition-colors [font-family:var(--font-inter)]">
                    {post.title}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-[#451C15]/60">
                    <Clock className="w-3 h-3" />
                    <span>{post.readingTime} min</span>
                  </div>
                </div>

                {/* Arrow */}
                <ChevronRight className="w-4 h-4 text-[#451C15]/30 group-hover:text-[#451C15] flex-shrink-0 self-center opacity-0 group-hover:opacity-100 transition-all" />
              </div>
            </Link>
          </motion.article>
        ))}
      </div>

      {/* View All Link */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-4 pt-4 border-t border-[#451C15]/10"
      >
        <Link
          href="/blog?sort=popular"
          className="flex items-center gap-2 text-sm text-[#D4A574] hover:text-[#A67B5B] transition-colors [font-family:var(--font-inter)]"
        >
          <span>View all popular posts</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </WidgetCard>
  );
};

// Newsletter Widget
const NewsletterWidget = ({
  onSubmit,
}: {
  onSubmit?: (email: string) => Promise<void>;
}) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting) return;

    setIsSubmitting(true);
    try {
      if (onSubmit) {
        await onSubmit(email);
      } else {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
      }
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail("");
      }, 3000);
    } catch (error) {
      console.error("Newsletter submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative bg-gradient-to-br from-[#451C15] via-[#5A241C] to-[#451C15] rounded-2xl p-6 shadow-xl overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, white 0%, transparent 50%),
                           radial-gradient(circle at 80% 80%, white 0%, transparent 50%)`,
          }}
        />
      </div>

      {/* Floating decorations */}
      <motion.div
        className="absolute top-4 right-4 text-white/20"
        animate={{
          rotate: 360,
          scale: [1, 1.2, 1],
        }}
        transition={{
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <Sparkles className="w-8 h-8" />
      </motion.div>

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
            <Mail className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-xl font-medium text-white [font-family:var(--font-playfair)]">
            Sweet Updates
          </h3>
        </div>

        <p className="text-white/80 text-sm mb-5 [font-family:var(--font-inter)]">
          Get exclusive recipes, chocolate tips, and early access to new
          articles delivered to your inbox.
        </p>

        <AnimatePresence mode="wait">
          {!isSubscribed ? (
            <motion.form
              key="form"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="space-y-3"
            >
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full px-4 py-3 pr-12 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-white placeholder-white/60 focus:outline-none focus:border-white/50 transition-colors text-sm [font-family:var(--font-inter)]"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/30 hover:bg-white/40 backdrop-blur-sm rounded-full transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <Coffee className="w-4 h-4 text-white" />
                    </motion.div>
                  ) : (
                    <Send className="w-4 h-4 text-white" />
                  )}
                </button>
              </div>

              <p className="text-xs text-white/60 text-center [font-family:var(--font-inter)]">
                No spam, unsubscribe anytime
              </p>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-3 justify-center py-3 px-4 bg-white/20 backdrop-blur-sm rounded-full"
            >
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-white text-sm [font-family:var(--font-inter)]">
                Successfully subscribed!
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Benefits */}
        <div className="mt-5 pt-5 border-t border-white/20">
          <div className="flex items-center justify-around">
            {[
              { icon: BookOpen, label: "Weekly" },
              { icon: Star, label: "Exclusive" },
              { icon: Heart, label: "Free" },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex flex-col items-center gap-1"
              >
                <item.icon className="w-4 h-4 text-white/60" />
                <span className="text-xs text-white/60 [font-family:var(--font-inter)]">
                  {item.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Tags Cloud Widget
const TagsWidget = ({
  tags,
  onTagClick,
}: {
  tags: Array<{ tag: string; count: number }>;
  onTagClick?: (tag: string) => void;
}) => {
  const maxCount = Math.max(...tags.map((t) => t.count));

  const getTagSize = (count: number) => {
    const ratio = count / maxCount;
    if (ratio > 0.8) return "text-base";
    if (ratio > 0.5) return "text-sm";
    return "text-xs";
  };

  const getTagOpacity = (count: number) => {
    const ratio = count / maxCount;
    if (ratio > 0.8) return "opacity-100";
    if (ratio > 0.5) return "opacity-80";
    return "opacity-60";
  };

  return (
    <WidgetCard title="Popular Topics" icon={Tag} accentColor="#B8B2D8">
      <div className="flex flex-wrap gap-2">
        {tags.map((item, index) => (
          <motion.button
            key={item.tag}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: index * 0.02,
              type: "spring",
              stiffness: 200,
            }}
            whileHover={{
              scale: 1.1,
              rotate: [-2, 2, -2, 0],
              transition: { rotate: { duration: 0.3 } },
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onTagClick?.(item.tag)}
            className={cn(
              "px-3 py-1.5 rounded-full bg-gradient-to-r",
              "hover:shadow-md transition-all duration-300",
              "font-medium [font-family:var(--font-inter)]",
              getTagSize(item.count),
              getTagOpacity(item.count)
            )}
            style={{
              background: `linear-gradient(135deg, ${
                ["#D4A574", "#95A99C", "#E8B4B8", "#B8B2D8", "#A87C5A"][
                  index % 5
                ]
              }15, ${
                ["#D4A574", "#95A99C", "#E8B4B8", "#B8B2D8", "#A87C5A"][
                  index % 5
                ]
              }30)`,
              color: ["#D4A574", "#95A99C", "#E8B4B8", "#B8B2D8", "#A87C5A"][
                index % 5
              ],
            }}
          >
            #{item.tag}
            {item.count > 5 && (
              <span className="ml-1 text-[10px] opacity-60">
                ({item.count})
              </span>
            )}
          </motion.button>
        ))}
      </div>
    </WidgetCard>
  );
};

// About Widget
const AboutWidget = () => {
  return (
    <WidgetCard accentColor="#A87C5A">
      <div className="text-center">
        {/* Author Avatar */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="relative w-24 h-24 mx-auto mb-4"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#D4A574] to-[#A87C5A] rounded-full animate-pulse" />
          <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white">
            <Image
              src="/images/authors/olesea.jpg"
              alt="Olesea Stamatin"
              fill
              className="object-cover"
              sizes="96px"
            />
          </div>
        </motion.div>

        {/* Content */}
        <h3 className="text-xl font-medium text-[#451C15] mb-2 [font-family:var(--font-playfair)]">
          Olesea Stamatin
        </h3>
        <p className="text-sm text-[#D4A574] mb-3 [font-family:var(--font-inter)]">
          Master Chocolatier
        </p>
        <p className="text-sm text-[#451C15]/70 mb-4 [font-family:var(--font-inter)]">
          Sharing the art of chocolate making through stories, recipes, and a
          passion for sweet perfection.
        </p>

        {/* Social Links */}
        <div className="flex items-center justify-center gap-3">
          {["Instagram", "Facebook", "Pinterest"].map((social) => (
            <motion.a
              key={social}
              href={`#${social.toLowerCase()}`}
              whileHover={{ y: -3 }}
              className="px-3 py-1 text-xs bg-[#451C15]/5 text-[#451C15] rounded-full hover:bg-[#451C15]/10 transition-colors [font-family:var(--font-inter)]"
            >
              {social}
            </motion.a>
          ))}
        </div>
      </div>
    </WidgetCard>
  );
};

// Main Sidebar Component
export const BlogSidebar = ({
  categories,
  popularPosts,
  currentPostId,
  className,
  onCategoryClick,
  onTagClick,
  onNewsletterSubmit,
}: BlogSidebarProps) => {
  // Calculate posts count per category
  const postsCount = categories.reduce((acc, category) => {
    // This would come from your data/API
    acc[category.id] = Math.floor(Math.random() * 20) + 5; // Mock data
    return acc;
  }, {} as Record<string, number>);

  // Get popular tags
  const popularTags = getPopularTags(15);

  return (
    <aside className={cn("sticky top-24", className)}>
      <div className="space-y-6">
        {/* About Widget */}
        <AboutWidget />

        {/* Newsletter Widget */}
        <NewsletterWidget onSubmit={onNewsletterSubmit} />

        {/* Categories Widget */}
        <CategoriesWidget
          categories={categories}
          postsCount={postsCount}
          onCategoryClick={onCategoryClick}
        />

        {/* Popular Posts Widget */}
        <PopularPostsWidget
          posts={popularPosts}
          currentPostId={currentPostId}
        />

        {/* Tags Cloud Widget */}
        <TagsWidget tags={popularTags} onTagClick={onTagClick} />
      </div>
    </aside>
  );
};

export default BlogSidebar;
