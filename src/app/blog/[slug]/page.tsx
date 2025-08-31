
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPostView } from "@/modules/blog/views/blog-post-view";
import { 
  getBlogPostBySlug, 
  blogPosts
} from "@/modules/blog/data/blog-content";


interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for all blog posts (for static generation)
export async function generateStaticParams() {
  // In production, this would fetch from your CMS/API
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ 
  params 
}: BlogPostPageProps): Promise<Metadata> {
  // Await params in Next.js 15
  const { slug } = await params;
  
  // In production, fetch post data from your CMS/API
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found | DeliceMy Blog",
      description: "The requested blog post could not be found.",
    };
  }

  // Generate Open Graph image URL
  const ogImage = post.featuredImage || "/images/og-default.jpg";

  return {
    title: `${post.title} | DeliceMy Blog`,
    description: post.excerpt,
    authors: [{ name: post.author.name }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      siteName: "DeliceMy",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [ogImage],
      creator: "@delicemy",
    },
    keywords: post.tags.join(", "),
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
  };
}

// Main page component
export default async function BlogPostPage({ params }: BlogPostPageProps) {
  // Await params in Next.js 15
  const { slug } = await params;
  
  // In production, this would be an API call to your CMS
  // For now, we're using the local data
  const post = getBlogPostBySlug(slug);

  // If post not found, show 404
  if (!post) {
    notFound();
  }

  // Render the blog post view
  return <BlogPostView slug={slug} />;
}

// Optional: Add revalidation for ISR (Incremental Static Regeneration)
// This would be useful when connected to a CMS
// export const revalidate = 3600; // Revalidate every hour