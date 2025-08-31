"use client";

import { BlogPostMain } from "../components/blog-post-main";
import { RelatedPostsWrapper } from "../components/related-posts-wrapper";
import { FloatingActionsWrapper } from "../components/floating-actions-wrapper";
import { BlogPostCTA } from "../components/blog-post-cta";

interface BlogPostViewProps {
  slug: string;
}

export const BlogPostView = ({ slug }: BlogPostViewProps) => {
  return (
    <>
      <BlogPostMain slug={slug} />
      <RelatedPostsWrapper slug={slug} />
      <FloatingActionsWrapper slug={slug} />
      <BlogPostCTA />
    </>
  );
};

export default BlogPostView;