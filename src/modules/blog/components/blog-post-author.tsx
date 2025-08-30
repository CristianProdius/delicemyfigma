// src/modules/blog/components/blog-post-author.tsx
"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { Twitter, Linkedin, Globe, Mail, BookOpen, Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Author {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  social?: {
    twitter?: string;
    linkedin?: string;
    website?: string;
    email?: string;
  };
  stats?: {
    posts: number;
    followers: number;
    likes: number;
  };
}

interface BlogPostAuthorProps {
  author: Author;
  className?: string;
}

export const BlogPostAuthor = ({ author, className }: BlogPostAuthorProps) => {
  const socialLinks = [
    { icon: Twitter, href: author.social?.twitter, label: "Twitter" },
    { icon: Linkedin, href: author.social?.linkedin, label: "LinkedIn" },
    { icon: Globe, href: author.social?.website, label: "Website" },
    { icon: Mail, href: `mailto:${author.social?.email}`, label: "Email" },
  ].filter(link => link.href);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={cn("my-12", className)}
    >
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#FFF9F5] via-white to-[#F8F5F0] p-8 sm:p-10 shadow-lg">
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#D4A574]/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-[#E8B4B8]/10 to-transparent rounded-full blur-2xl" />
        
        <div className="relative">
          {/* Header */}
          <div className="flex items-center gap-2 mb-6">
            <Coffee className="w-5 h-5 text-[#D4A574]" />
            <span className="text-sm font-medium text-[#451C15]/60 uppercase tracking-wider [font-family:var(--font-inter)]">
              About the Author
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
            {/* Avatar */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="flex-shrink-0"
            >
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src={author.avatar}
                  alt={author.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#451C15]/20 to-transparent" />
              </div>
            </motion.div>

            {/* Author Info */}
            <div className="flex-1 space-y-4">
              {/* Name and Role */}
              <div>
                <h3 className="text-2xl sm:text-3xl font-light text-[#451C15] [font-family:var(--font-playfair)]">
                  {author.name}
                </h3>
                <p className="text-[#D4A574] font-medium [font-family:var(--font-inter)] mt-1">
                  {author.role}
                </p>
              </div>

              {/* Bio */}
              <p className="text-[#451C15]/70 leading-relaxed [font-family:var(--font-inter)]">
                {author.bio}
              </p>

              {/* Stats */}
              {author.stats && (
                <div className="flex flex-wrap gap-6 pt-2">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[#D4A574]" />
                    <span className="text-sm text-[#451C15]/60 [font-family:var(--font-inter)]">
                      <strong className="text-[#451C15]">{author.stats.posts}</strong> articles
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-[#451C15]/60 [font-family:var(--font-inter)]">
                      <strong className="text-[#451C15]">{author.stats.followers}</strong> followers
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-[#451C15]/60 [font-family:var(--font-inter)]">
                      <strong className="text-[#451C15]">{author.stats.likes}</strong> likes
                    </span>
                  </div>
                </div>
              )}

              {/* Actions and Social */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                {/* Follow Button */}
                <Button
                  className="bg-gradient-to-r from-[#D4A574] to-[#A67B5B] text-white hover:shadow-lg transition-all duration-300"
                >
                  Follow Author
                </Button>

                {/* View All Posts */}
                <Link href={`/blog/author/${author.id}`}>
                  <Button
                    variant="outline"
                    className="border-[#451C15]/20 text-[#451C15] hover:bg-[#451C15]/5"
                  >
                    View All Posts
                  </Button>
                </Link>

                {/* Social Links */}
                {socialLinks.length > 0 && (
                  <>
                    <div className="hidden sm:block w-px h-8 bg-[#451C15]/10" />
                    <div className="flex items-center gap-2">
                      {socialLinks.map((link, index) => (
                        <motion.a
                          key={index}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow"
                          aria-label={link.label}
                        >
                          <link.icon className="w-4 h-4 text-[#451C15]" />
                        </motion.a>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 pt-6 border-t border-[#451C15]/10"
        >
          <p className="text-sm italic text-[#451C15]/60 [font-family:var(--font-playfair)] text-center">
            &quot;Life is like chocolate. It&apos;s good to enjoy it one piece at a time.&quot;
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};