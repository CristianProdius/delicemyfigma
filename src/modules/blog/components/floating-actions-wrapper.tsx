"use client";

import React, { useState, useEffect } from "react";
import { FloatingActions } from "./floating-actions";
import { getBlogPostBySlug, type BlogPost } from "../data/blog-content";

interface FloatingActionsWrapperProps {
  slug: string;
}

export const FloatingActionsWrapper = ({ slug }: FloatingActionsWrapperProps) => {
  const [post, setPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    const fetchedPost = getBlogPostBySlug(slug);
    setPost(fetchedPost || null); 
  }, [slug]);

  if (!post) return null;

  return <FloatingActions post={post} />;
};