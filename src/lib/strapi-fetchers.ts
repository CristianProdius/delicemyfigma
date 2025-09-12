import { strapiApi } from "./strapi";

export async function fetchBlogPageData(locale: string) {
  try {
    const response = await strapiApi.get("/blog-page", {
      params: {
        populate: {
          heroSection: {
            populate: {
              backgroundImage: {
                fields: ["url", "alternativeText", "width", "height"],
              },
              headerLabel: {
                populate: "*",
              },
              stats: {
                populate: "*",
              },
              searchConfig: {
                populate: "*",
              },
            },
          },
          statsSection: {
            populate: {
              stats: {
                populate: "*",
              },
            },
          },
          contentSection: {
            populate: {
              sectionHeader: {
                populate: "*",
              },
              listingSettings: {
                populate: "*",
              },
              sidebarSettings: {
                populate: {
                  widgets: {
                    populate: {
                      newsletterSettings: {
                        populate: "*",
                      },
                    },
                  },
                },
              },
              mobileCta: {
                populate: "*",
              },
            },
          },
          newsletterSection: {
            populate: {
              benefits: {
                populate: "*",
              },
              form: {
                populate: "*",
              },
              successMessage: {
                populate: "*",
              },
              stats: {
                populate: "*",
              },
            },
          },
        },
        locale,
      },
    });
    return response.data?.data || null;
  } catch (error) {
    console.error("Error fetching blog page data:", error);
    return null;
  }
}

export async function fetchBlogPosts(locale: string) {
  try {
    const response = await strapiApi.get("/blog-posts", {
      params: {
        populate: {
          featuredImage: {
            fields: ["url", "alternativeText", "width", "height"],
          },
          blog_categories: {
            populate: "*",
          },
          author: {
            populate: {
              avatar: {
                fields: ["url", "alternativeText"],
              },
            },
          },
        },
        locale,
        pagination: {
          pageSize: 100,
        },
      },
    });
    return response.data?.data || [];
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

export async function fetchBlogCategories(locale: string) {
  try {
    const response = await strapiApi.get("/blog-categories", {
      params: {
        populate: "*",
        locale,
      },
    });
    return response.data?.data || [];
  } catch (error) {
    console.error("Error fetching blog categories:", error);
    return [];
  }
}