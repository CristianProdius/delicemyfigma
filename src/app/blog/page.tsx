import { BlogView } from "@/modules/blog/views/blog-view";
import { fetchBlogPageData, fetchBlogPosts, fetchBlogCategories } from "@/lib/strapi-fetchers";
import { cookies } from "next/headers";

export default async function BlogPage() {
  // Get locale from cookies or default to 'ru'
  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value || "ru";
  
  // Fetch all data on the server
  const [pageData, posts, categories] = await Promise.all([
    fetchBlogPageData(locale),
    fetchBlogPosts(locale),
    fetchBlogCategories(locale),
  ]);

  return (
    <BlogView 
      pageData={pageData} 
      posts={posts} 
      categories={categories} 
    />
  );
}