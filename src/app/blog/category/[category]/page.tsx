// src/app/blog/category/[category]/page.tsx

import { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogListing } from "@/modules/blog/components/blog-listing";
import { 
 
  blogCategories,
  getPostsByCategory
} from "@/modules/blog/data/blog-content";

// Define the params type for Next.js 15
interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

// Generate static params for all categories
export async function generateStaticParams() {
  // In production, this would fetch from your CMS/API
  return blogCategories.map((category) => ({
    category: category.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ 
  params 
}: CategoryPageProps): Promise<Metadata> {
  // Await params in Next.js 15
  const { category: categorySlug } = await params;
  
  // Find the category
  const category = blogCategories.find(cat => cat.slug === categorySlug);

  if (!category) {
    return {
      title: "Category Not Found | DeliceMy Blog",
      description: "The requested category could not be found.",
    };
  }

  return {
    title: `${category.name} Articles | DeliceMy Blog`,
    description: `Browse all ${category.name.toLowerCase()} articles, recipes, and tutorials from DeliceMy's chocolate blog.`,
    openGraph: {
      title: `${category.name} | DeliceMy Blog`,
      description: `Explore our collection of ${category.name.toLowerCase()} content.`,
      type: "website",
      siteName: "DeliceMy",
    },
    twitter: {
      card: "summary_large_image",
      title: `${category.name} | DeliceMy Blog`,
      description: `Explore our collection of ${category.name.toLowerCase()} content.`,
      creator: "@delicemy",
    },
    alternates: {
      canonical: `/blog/category/${category.slug}`,
    },
  };
}

// Main page component
export default async function BlogCategoryPage({ params }: CategoryPageProps) {
  // Await params in Next.js 15
  const { category: categorySlug } = await params;
  
  // Find the category
  const category = blogCategories.find(cat => cat.slug === categorySlug);

  // If category not found, show 404
  if (!category) {
    notFound();
  }

  // Get posts for this category
  const categoryPosts = getPostsByCategory(category.id);

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-[#FFF9F5]">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-[#451C15] to-[#5A241C]">
        <div className="relative z-10 max-w-[95%] xl:max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Category Badge */}
          <div className="inline-flex items-center justify-center mb-6">
            <div 
              className="w-3 h-3 rounded-full mr-3"
              style={{ backgroundColor: category.color }}
            />
            <span className="text-white/80 text-sm uppercase tracking-wider [font-family:var(--font-inter)]">
              Category
            </span>
            <div 
              className="w-3 h-3 rounded-full ml-3"
              style={{ backgroundColor: category.color }}
            />
          </div>

          {/* Category Name */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white mb-4 [font-family:var(--font-playfair)]">
            {category.name}
          </h1>

          {/* Category Description */}
          {category.description && (
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8 [font-family:var(--font-inter)]">
              {category.description}
            </p>
          )}

          {/* Post Count */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
            <span className="text-white/90 [font-family:var(--font-inter)]">
              {categoryPosts.length} {categoryPosts.length === 1 ? 'Article' : 'Articles'}
            </span>
          </div>
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
            posts={categoryPosts}
            categories={blogCategories}
            initialCategory={category.id}
            postsPerPage={12}
            showSearch={true}
            showFilters={true}
            className="!pt-0"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-[#FFF9F5] to-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-light text-[#451C15] mb-4 [font-family:var(--font-playfair)]">
            Explore More Categories
          </h2>
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {blogCategories
              .filter(cat => cat.id !== category.id)
              .map((cat) => (
                <a
                  key={cat.id}
                  href={`/blog/category/${cat.slug}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 hover:scale-105"
                  style={{
                    borderColor: `${cat.color}40`,
                    backgroundColor: `${cat.color}10`,
                    color: cat.color,
                  }}
                >
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }} />
                  <span className="text-sm font-medium [font-family:var(--font-inter)]">
                    {cat.name}
                  </span>
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