"use client";

import React from "react";
import Link from "next/link";
import { Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BlogPostErrorProps {
  message: string;
}

export const BlogPostError = ({ message }: BlogPostErrorProps) => {
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