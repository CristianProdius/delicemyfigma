// src/app/blog/tag/[tag]/page.tsx

import { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogListing } from "@/modules/blog/components/blog-listing";
import { 
  blogPosts,
  blogCategories,
  getPostsByTag
} from "@/modules/blog/data/blog-content";

// Define the params type for Next.js 15
interface TagPageProps {
  params: Promise<{
    tag: string;
  }>;
}

// Get all unique tags from blog posts
const getAllTags = (): string[] => {
  const tags = new Set<string>();
  blogPosts.forEach(post => {
    post.tags.forEach(tag => tags.add(tag));
  });
  return Array.from(tags);
};

// Generate static params for all tags
export async function generateStaticParams() {
  const allTags = getAllTags();
  
  return allTags.map((tag) => ({
    tag: encodeURIComponent(tag.toLowerCase()),
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ 
  params 
}: TagPageProps): Promise<Metadata> {
  // Await params in Next.js 15
  const { tag: encodedTag } = await params;
  const tag = decodeURIComponent(encodedTag);

  return {
    title: `Articles tagged "${tag}" | DeliceMy Blog`,
    description: `Browse all articles tagged with "${tag}" from DeliceMy's chocolate blog.`,
    openGraph: {
      title: `#${tag} | DeliceMy Blog`,
      description: `Explore articles about ${tag}.`,
      type: "website",
      siteName: "DeliceMy",
    },
    twitter: {
      card: "summary_large_image",
      title: `#${tag} | DeliceMy Blog`,
      description: `Explore articles about ${tag}.`,
      creator: "@delicemy",
    },
    alternates: {
      canonical: `/blog/tag/${encodedTag}`,
    },
  };
}

// Main page component
export default async function BlogTagPage({ params }: TagPageProps) {
  // Await params in Next.js 15
  const { tag: encodedTag } = await params;
  const tag = decodeURIComponent(encodedTag);
  
  // Get posts for this tag
  const tagPosts = getPostsByTag(tag);

  // If no posts found for this tag, show 404
  if (tagPosts.length === 0) {
    notFound();
  }

  // Get related tags (tags that appear in the same posts)
  const relatedTags = new Set<string>();
  tagPosts.forEach(post => {
    post.tags.forEach(t => {
      if (t.toLowerCase() !== tag.toLowerCase()) {
        relatedTags.add(t);
      }
    });
  });

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-[#FFF9F5]">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-[#451C15] to-[#5A241C]">
        <div className="relative z-10 max-w-[95%] xl:max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Tag Badge */}
          <div className="inline-flex items-center justify-center mb-6">
            <span className="text-white/80 text-sm uppercase tracking-wider [font-family:var(--font-inter)]">
              Tag
            </span>
          </div>

          {/* Tag Name */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white mb-4 [font-family:var(--font-playfair)]">
            #{tag}
          </h1>

          {/* Post Count */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-8">
            <span className="text-white/90 [font-family:var(--font-inter)]">
              {tagPosts.length} {tagPosts.length === 1 ? 'Article' : 'Articles'}
            </span>
          </div>

          {/* Related Tags */}
          {relatedTags.size > 0 && (
            <div className="mt-8">
              <p className="text-white/60 text-sm mb-4 [font-family:var(--font-inter)]">
                Related tags:
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {Array.from(relatedTags).slice(0, 10).map(relatedTag => (
                  <a
                    key={relatedTag}
                    href={`/blog/tag/${encodeURIComponent(relatedTag.toLowerCase())}`}
                    className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-white/80 text-sm hover:bg-white/20 transition-colors [font-family:var(--font-inter)]"
                  >
                    #{relatedTag}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-gradient-to-br from-white/5 to-transparent blur-2xl" />
          <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-gradient-to-tl from-white/5 to-transparent blur-3xl" />
        </div>
      </section>

      {/* Blog Listing Section */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-[95%] xl:max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8">
          <BlogListing
            posts={tagPosts}
            categories={blogCategories}
            initialCategory="all"
            postsPerPage={12}
            showSearch={true}
            showFilters={true}
            className="!pt-0"
          />
        </div>
      </section>

      {/* Explore More Tags Section */}
      <section className="py-16 bg-gradient-to-br from-[#FFF9F5] to-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-light text-[#451C15] mb-8 [font-family:var(--font-playfair)]">
            Explore More Topics
          </h2>
          <div className="flex flex-wrap justify-center gap-2">
            {getAllTags()
              .filter(t => t.toLowerCase() !== tag.toLowerCase())
              .slice(0, 20)
              .map((otherTag) => (
                <a
                  key={otherTag}
                  href={`/blog/tag/${encodeURIComponent(otherTag.toLowerCase())}`}
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#451C15]/5 hover:bg-[#451C15]/10 text-[#451C15] rounded-full text-sm transition-colors [font-family:var(--font-inter)]"
                >
                  #{otherTag}
                </a>
              ))}
          </div>
        </div>
      </section>
    </main>
  );
}

// Optional: Add revalidation for ISR
// export const revalidate = 3600;