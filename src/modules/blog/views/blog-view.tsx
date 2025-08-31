"use client";

import { BlogHero } from "../components/blog-hero";
import { BlogStats } from "../components/blog-stats";
import { BlogContent } from "../components/blog-content";
import { BlogNewsletter } from "../components/blog-newsletter";
import { ScrollToTop } from "../components/scroll-to-top";

export const BlogView = () => {
  return (
    <>
      <BlogHero />
      <BlogStats />
      <BlogContent />
      <BlogNewsletter />
      <ScrollToTop />
    </>
  );
};

export default BlogView;