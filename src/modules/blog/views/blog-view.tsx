"use client";

import { BlogHero } from "../components/blog-hero";
import { BlogStats } from "../components/blog-stats";
import { BlogContent } from "../components/blog-content";
import { BlogNewsletter } from "../components/blog-newsletter";


interface BlogViewProps {
  pageData: any;
  posts: any[];
  categories: any[];
}

export const BlogView = ({ pageData, posts, categories }: BlogViewProps) => {
  if (!pageData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-[#451C15]">Unable to load blog content</p>
      </div>
    );
  }

  return (
    <>
      {pageData.heroSection && (
        <BlogHero data={pageData.heroSection} categories={categories} posts={posts} />
      )}
      {pageData.statsSection && (
        <BlogStats data={pageData.statsSection} />
      )}
      {pageData.contentSection && (
        <BlogContent 
          data={pageData.contentSection} 
          posts={posts} 
          categories={categories} 
        />
      )}
      {pageData.newsletterSection && (
        <BlogNewsletter data={pageData.newsletterSection} />
      )}

    </>
  );
};

export default BlogView;