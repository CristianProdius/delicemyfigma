"use client";

import React, { useState, useEffect } from "react";
import { RelatedPosts } from "./related-posts";
import { getBlogPostBySlug, getRelatedPosts as fetchRelatedPosts, type BlogPost } from "../data/blog-content";

interface RelatedPostsWrapperProps {
  slug: string;
}

export const RelatedPostsWrapper = ({ slug }: RelatedPostsWrapperProps) => {
  const [currentPost, setCurrentPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const post = getBlogPostBySlug(slug);
    if (post) {
      setCurrentPost(post);
      const related = fetchRelatedPosts(post.id, 3);
      setRelatedPosts(related);
    }
  }, [slug]);

  if (!currentPost) return null;

  return <RelatedPosts currentPost={currentPost} posts={relatedPosts} />;
};