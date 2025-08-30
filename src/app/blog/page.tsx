// src/app/blog/page.tsx

import { Metadata } from "next";
import { BlogView } from "@/modules/blog/views/blog-view";

// SEO Metadata
export const metadata: Metadata = {
  title: "Blog | DeliceMy - Chocolate Stories & Recipes",
  description: "Discover chocolate-making tutorials, business insights, recipes, and the latest news from the world of artisan chocolate. Learn from master chocolatiers.",
  keywords: "chocolate blog, chocolate recipes, chocolate tutorials, chocolate business, artisan chocolate, chocolate making, DeliceMy blog",
  openGraph: {
    title: "DeliceMy Blog - Sweet Stories & Professional Insights",
    description: "Explore our collection of chocolate-making tutorials, recipes, and business insights from master chocolatiers.",
    type: "website",
    url: "/blog",
    siteName: "DeliceMy",
    images: [
      {
        url: "/images/og/blog.jpg",
        width: 1200,
        height: 630,
        alt: "DeliceMy Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DeliceMy Blog - Chocolate Stories & Recipes",
    description: "Discover chocolate-making tutorials, recipes, and insights from master chocolatiers.",
    images: ["/images/og/blog.jpg"],
    creator: "@delicemy",
  },
  alternates: {
    canonical: "/blog",
    types: {
      "application/rss+xml": "/blog/feed.xml",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// Main Blog Page Component
export default function BlogPage() {
  return <BlogView />;
}