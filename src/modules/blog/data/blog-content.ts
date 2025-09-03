// src/modules/blog/data/blog-content.ts

/**
 * Blog Content Configuration
 * For DeliceMy Blog System with Strapi CMS Integration
 */

// Type Definitions
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  category: BlogCategory;
  tags: string[];
  author: Author;
  publishedAt: string;
  readingTime: number;
  featured?: boolean;
}

export interface BlogCategory {
  id: string;
  slug: string;
  name: string;
  description: string;
  color: string; // Match your accent colors
  icon?: string;
}

export interface Author {
  id: string;
  name: string;
  bio: string;
  avatar: string;
  role: string;
}

// Blog Categories
export const blogCategories: BlogCategory[] = [
  {
    id: "recipes",
    slug: "recipes",
    name: "Recipes & Tutorials",
    description: "Step-by-step guides to creating chocolate masterpieces at home",
    color: "#A87C5A",
    icon: "Book",
  },
  {
    id: "business",
    slug: "business",
    name: "Business Insights",
    description: "Tips and strategies for chocolate entrepreneurs",
    color: "#95A99C",
    icon: "TrendingUp",
  },
  {
    id: "techniques",
    slug: "techniques",
    name: "Chocolate Techniques",
    description: "Professional methods and advanced chocolate crafting",
    color: "#D2B48C",
    icon: "Tool",
  },
  {
    id: "events",
    slug: "events",
    name: "Events & News",
    description: "Latest happenings and chocolate world events",
    color: "#E8B4B8",
    icon: "Calendar",
  },
  {
    id: "lifestyle",
    slug: "lifestyle",
    name: "Chocolate Lifestyle",
    description: "Stories, culture, and the art of living sweetly",
    color: "#B8B2D8",
    icon: "Heart",
  },
];

// Authors
export const blogAuthors: Author[] = [
  {
    id: "olesea-stamatin",
    name: "Olesea Stamatin",
    bio: "Master Chocolatier and founder of DeliceMy. With over 12 years of experience, I share my passion for chocolate artistry and business insights.",
    avatar: "/logo.png",
    role: "Master Chocolatier & Founder",
  },
  {
    id: "maria-popescu",
    name: "Maria Popescu",
    bio: "Senior pastry chef specializing in modern dessert techniques and chocolate innovation. Trained in Paris and passionate about teaching.",
    avatar: "/logo.png",
    role: "Senior Pastry Chef",
  },
  {
    id: "alex-chen",
    name: "Alex Chen",
    bio: "Business development specialist helping chocolate entrepreneurs build successful brands. MBA with a sweet tooth for strategy.",
    avatar: "/logo.png",
    role: "Business Consultant",
  },
];

// Sample Blog Posts
export const blogPosts: BlogPost[] = [
  {
    id: "mastering-chocolate-tempering",
    slug: "mastering-chocolate-tempering",
    title: "Mastering Chocolate Tempering: The Complete Guide",
    excerpt: "Learn the science and art behind perfect chocolate tempering. From understanding crystal structures to troubleshooting common problems, this guide covers everything you need to know.",
    content: `
# The Science of Perfect Tempering

Chocolate tempering is often considered the most challenging aspect of chocolate making, but understanding the science behind it makes the process much more manageable. In this comprehensive guide, we'll explore everything from the molecular structure of cocoa butter to practical techniques you can use at home.

## Understanding Cocoa Butter Crystals

Cocoa butter can crystallize in six different forms (I-VI), but only Form V gives us the desired snap, shine, and stability...

## The Traditional Method

The classic method involves three key temperature stages:
1. **Melting** (45-50°C for dark chocolate)
2. **Cooling** (27-28°C)
3. **Working temperature** (31-32°C)

## Professional Tips

- Always use a reliable thermometer
- Keep your workspace at 18-20°C
- Work with small batches when learning
- Test temper with a small sample before proceeding

## Common Problems and Solutions

**Problem**: Chocolate has white streaks
**Solution**: This is fat bloom, caused by improper tempering...

[Content continues with detailed instructions, tips, and troubleshooting...]
    `,
    featuredImage: "/logo.png",
    category: blogCategories[2], // Techniques
    tags: ["tempering", "tutorial", "professional", "chocolate-making", "advanced"],
    author: blogAuthors[0], // Olesea
    publishedAt: "2024-03-15T10:00:00Z",
    readingTime: 12,
    featured: true,
  },
  {
    id: "starting-chocolate-business-2024",
    slug: "starting-chocolate-business-2024",
    title: "Starting Your Chocolate Business in 2024: A Roadmap to Success",
    excerpt: "From kitchen to market: Essential steps, legal requirements, and insider tips for launching your artisan chocolate business this year.",
    content: `
# Your Journey from Passion to Profit

Starting a chocolate business in 2024 presents unique opportunities and challenges. The artisan chocolate market is growing at 8% annually, with consumers increasingly seeking unique, high-quality products. Here's your complete roadmap to success.

## Market Research and Positioning

Before melting your first batch, understand your market:
- Local competition analysis
- Target customer identification
- Unique selling proposition development
- Pricing strategy research

## Legal Requirements and Certifications

### Essential Permits
1. Business license
2. Food handler's permit
3. Commercial kitchen certification
4. Insurance requirements

## Initial Investment Breakdown

**Equipment** ($5,000-$15,000)
- Tempering machine
- Molds and tools
- Packaging equipment

**Ingredients** ($2,000-$5,000)
- Premium chocolate
- Inclusions and flavorings
- Packaging materials

## Marketing Your Creations

In 2024, successful chocolate businesses need:
- Strong social media presence
- Local market participation
- Online sales platform
- Brand storytelling

[Content continues with detailed business planning...]
    `,
    featuredImage: "/logo.png",
    category: blogCategories[1], // Business
    tags: ["business", "entrepreneurship", "startup", "2024", "guide"],
    author: blogAuthors[2], // Alex
    publishedAt: "2024-03-10T14:30:00Z",
    readingTime: 15,
    featured: true,
  },
  {
    id: "ruby-chocolate-revolution",
    slug: "ruby-chocolate-revolution",
    title: "Ruby Chocolate: Working with the Fourth Type",
    excerpt: "Discover the unique properties of ruby chocolate and learn professional techniques for incorporating this pink sensation into your creations.",
    content: `
# The Pink Revolution in Chocolate

Ruby chocolate, introduced by Barry Callebaut in 2017, has revolutionized the chocolate world. Its natural pink color and fruity taste profile offer exciting possibilities for creative chocolatiers.

## Understanding Ruby Chocolate

Unlike white, milk, or dark chocolate, ruby chocolate gets its color from ruby cocoa beans. The unique processing method preserves the beans' natural compounds, resulting in:
- Distinctive pink/ruby color
- Fresh berry fruitiness
- Subtle sour notes
- Creamy texture

## Working Temperature Guidelines

Ruby chocolate requires specific handling:
- **Melting**: 45°C maximum
- **Tempering**: 28.5-29.5°C
- **Working**: 29-30°C

## Creative Applications

### Bonbons and Truffles
Ruby chocolate pairs beautifully with:
- Lychee and rose
- Raspberry and champagne
- Passion fruit

### Bars and Tablets
Consider these inclusion combinations:
- Freeze-dried strawberries
- Pistachios
- Edible flowers

[Content continues with recipes and techniques...]
    `,
    featuredImage: "/logo.png",
    category: blogCategories[2], // Techniques
    tags: ["ruby-chocolate", "innovation", "techniques", "trending", "recipes"],
    author: blogAuthors[1], // Maria
    publishedAt: "2024-03-08T09:00:00Z",
    readingTime: 10,
  },
  {
    id: "easter-chocolate-collection",
    slug: "easter-chocolate-collection-2024",
    title: "Creating Stunning Easter Chocolate Collections",
    excerpt: "Design and craft show-stopping Easter chocolates that delight customers. From hollow eggs to decorative techniques.",
    content: `
# Elevate Your Easter Chocolate Game

Easter represents one of the biggest opportunities for chocolate sales. This comprehensive guide will help you create collections that stand out and sell out.

## Planning Your Collection

### Essential Items
- Hollow eggs (various sizes)
- Filled eggs
- Chocolate bunnies
- Spring-themed bonbons
- Gift sets

## Advanced Molding Techniques

Creating perfect hollow eggs requires precision:
1. Polish molds to high shine
2. Apply thin first coat
3. Build layers gradually
4. Perfect joining technique

## Natural Coloring Methods

Achieve vibrant colors naturally:
- **Yellow**: Turmeric
- **Green**: Matcha or spirulina
- **Pink**: Beet powder
- **Purple**: Butterfly pea flower

[Content continues with detailed instructions...]
    `,
    featuredImage: "/logo.png",
    category: blogCategories[3], // Events
    tags: ["easter", "seasonal", "holidays", "tutorial", "collections"],
    author: blogAuthors[0], // Olesea
    publishedAt: "2024-03-05T11:00:00Z",
    readingTime: 8,
  },
  {
    id: "chocolate-wine-pairing",
    slug: "perfect-chocolate-wine-pairings",
    title: "The Art of Chocolate and Wine Pairing",
    excerpt: "Unlock the secrets of pairing chocolate with wine. A comprehensive guide for hosting unforgettable tasting events.",
    content: `
# Sophisticated Pairings for Discerning Palates

The marriage of chocolate and wine creates sensory experiences that elevate both components. Understanding the principles of pairing opens up endless possibilities for memorable events.

## Basic Pairing Principles

### Complementary vs. Contrasting
- **Complementary**: Match similar flavor profiles
- **Contrasting**: Create exciting flavor tensions

## Classic Pairings

### Dark Chocolate (70%+)
- Cabernet Sauvignon
- Vintage Port
- Barolo

### Milk Chocolate
- Pinot Noir
- Tawny Port
- Moscato

### White Chocolate
- Riesling
- Champagne
- Sauternes

## Hosting Tasting Events

Structure your event for maximum enjoyment:
1. Start with lighter pairings
2. Progress to more intense flavors
3. Cleanse palates between tastings
4. Provide tasting notes

[Content continues with pairing suggestions...]
    `,
    featuredImage: "/logo.png",
    category: blogCategories[4], // Lifestyle
    tags: ["wine", "pairing", "events", "sophisticated", "guide"],
    author: blogAuthors[1], // Maria
    publishedAt: "2024-03-03T16:00:00Z",
    readingTime: 9,
  },
  {
    id: "bean-to-bar-journey",
    slug: "bean-to-bar-chocolate-journey",
    title: "Bean to Bar: Understanding Chocolate Origins",
    excerpt: "Explore the journey from cacao farm to chocolate bar and learn how origin affects flavor profiles.",
    content: `
# From Farm to Your Favorite Bar

Understanding chocolate's journey from bean to bar deepens appreciation and improves your ability to select and work with different chocolates.

## Major Cacao Regions

### Madagascar
- Bright, fruity notes
- Red fruit characteristics
- Natural acidity

### Ecuador
- Floral aromatics
- Complex flavor profile
- Nacional variety heritage

### Ghana
- Classic chocolate flavor
- Balanced profile
- Consistent quality

## Processing Impact on Flavor

Each step influences the final product:
1. **Fermentation** (5-7 days): Develops flavor precursors
2. **Drying**: Preserves and concentrates flavors
3. **Roasting**: Creates Maillard reactions
4. **Conching**: Refines texture and flavor

[Content continues with origin details...]
    `,
    featuredImage: "/logo.png",
    category: blogCategories[2], // Techniques
    tags: ["bean-to-bar", "origins", "education", "craft-chocolate", "sourcing"],
    author: blogAuthors[0], // Olesea
    publishedAt: "2024-02-28T13:00:00Z",
    readingTime: 11,
  },
  {
    id: "mothers-day-chocolate-gifts",
    slug: "mothers-day-chocolate-gift-guide",
    title: "Mother's Day Chocolate Gifts That Tell a Story",
    excerpt: "Create meaningful chocolate gifts for Mother's Day with personalization techniques and heartfelt presentation ideas.",
    content: `
# Chocolates That Say More Than Words

Mother's Day calls for chocolate gifts that reflect thought, care, and love. Here's how to create memorable gifts that mothers will treasure.

## Personalization Techniques

### Edible Printing
- Photo chocolates
- Message plaques
- Custom wrappers

### Hand-Piped Details
- Names and dates
- Floral designs
- Personal messages

## Signature Mother's Day Collections

### The Garden Box
- Rose truffles
- Lavender ganache
- Violet creams
- Jasmine pearls

### Memory Lane Collection
- Childhood favorite flavors
- Regional specialties
- Nostalgic combinations

[Content continues with gift ideas...]
    `,
    featuredImage: "/logo.png",
    category: blogCategories[3], // Events
    tags: ["mothers-day", "gifts", "personalization", "seasonal", "ideas"],
    author: blogAuthors[1], // Maria
    publishedAt: "2024-02-25T10:00:00Z",
    readingTime: 7,
  },
  {
    id: "chocolate-health-benefits",
    slug: "dark-chocolate-health-benefits-science",
    title: "The Science Behind Dark Chocolate's Health Benefits",
    excerpt: "Explore the research-backed health benefits of dark chocolate and learn how to maximize its nutritional value.",
    content: `
# When Indulgence Meets Wellness

Recent scientific studies continue to reveal the impressive health benefits of quality dark chocolate. Let's explore the science behind these benefits.

## Key Compounds

### Flavonoids
- Powerful antioxidants
- Heart health support
- Cognitive benefits

### Theobromine
- Gentle stimulant
- Mood enhancement
- Respiratory benefits

## Proven Health Benefits

Research shows dark chocolate can:
1. Lower blood pressure
2. Improve brain function
3. Support heart health
4. Enhance mood

## Maximizing Benefits

### Choose Quality
- Minimum 70% cacao
- Single origin preferred
- Minimal processing

### Optimal Consumption
- 1-2 oz daily
- Consistent intake
- Mindful eating

[Content continues with research details...]
    `,
    featuredImage: "/logo.png",
    category: blogCategories[4], // Lifestyle
    tags: ["health", "science", "dark-chocolate", "wellness", "nutrition"],
    author: blogAuthors[2], // Alex
    publishedAt: "2024-02-20T15:00:00Z",
    readingTime: 8,
  },
  {
    id: "vegan-chocolate-creations",
    slug: "mastering-vegan-chocolate-creations",
    title: "Vegan Chocolate Creations: Beyond Dark Chocolate",
    excerpt: "Discover innovative techniques for creating delicious vegan chocolates that rival traditional dairy-based treats.",
    content: `
# Plant-Based Perfection

The demand for vegan chocolate extends beyond dark chocolate. Learn to create creamy, delicious vegan alternatives that everyone will love.

## Alternative Milk Chocolates

### Coconut Milk Base
- Creamy texture
- Subtle tropical notes
- High fat content

### Oat Milk Innovation
- Neutral flavor
- Sustainable option
- Smooth mouthfeel

## Vegan Ganache Mastery

Perfect ratios for different applications:
- **Truffles**: 1:1 chocolate to coconut cream
- **Filling**: 2:1 chocolate to plant milk
- **Glaze**: 1:2 chocolate to liquid

## Flavor Innovations

Exciting vegan combinations:
- Matcha almond
- Salted caramel tahini
- Coffee hazelnut
- Miso maple

[Content continues with recipes...]
    `,
    featuredImage: "/logo.png",
    category: blogCategories[0], // Recipes
    tags: ["vegan", "recipes", "plant-based", "innovation", "dietary"],
    author: blogAuthors[1], // Maria
    publishedAt: "2024-02-18T11:30:00Z",
    readingTime: 9,
  },
  {
    id: "chocolate-storage-guide",
    slug: "ultimate-chocolate-storage-guide",
    title: "The Ultimate Guide to Storing Chocolate",
    excerpt: "Preserve the quality and extend the life of your chocolate creations with professional storage techniques.",
    content: `
# Keeping Chocolate at Its Best

Proper storage is crucial for maintaining chocolate quality. Whether you're a professional or enthusiast, these guidelines ensure optimal preservation.

## Environmental Factors

### Temperature Control
- Ideal: 15-18°C (59-64°F)
- Never above 21°C (70°F)
- Avoid fluctuations

### Humidity Management
- Maintain 50-55% RH
- Use silica gel packs
- Monitor with hygrometer

## Storage Solutions

### Short-term (1-2 weeks)
- Cool, dark pantry
- Airtight containers
- Away from odors

### Long-term (months)
- Wine cooler ideal
- Vacuum sealed bags
- Labeled and dated

## Common Mistakes to Avoid

1. Refrigerator storage (causes condensation)
2. Near strong odors
3. Direct sunlight
4. Plastic bags (trap moisture)

[Content continues with preservation tips...]
    `,
    featuredImage: "/logo.png",
    category: blogCategories[2], // Techniques
    tags: ["storage", "preservation", "tips", "professional", "guide"],
    author: blogAuthors[0], // Olesea
    publishedAt: "2024-02-15T09:00:00Z",
    readingTime: 6,
  },
];

// Utility Functions
export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find((post) => post.slug === slug);
};

export const getBlogPostById = (id: string): BlogPost | undefined => {
  return blogPosts.find((post) => post.id === id);
};

export const getPostsByCategory = (categoryId: string): BlogPost[] => {
  return blogPosts.filter((post) => post.category.id === categoryId);
};

export const getPostsByAuthor = (authorId: string): BlogPost[] => {
  return blogPosts.filter((post) => post.author.id === authorId);
};

export const getPostsByTag = (tag: string): BlogPost[] => {
  return blogPosts.filter((post) => 
    post.tags.includes(tag.toLowerCase())
  );
};

export const getFeaturedPosts = (): BlogPost[] => {
  return blogPosts.filter((post) => post.featured === true);
};

export const getRecentPosts = (limit: number = 5): BlogPost[] => {
  return [...blogPosts]
    .sort((a, b) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
    .slice(0, limit);
};

export const getRelatedPosts = (postId: string, limit: number = 3): BlogPost[] => {
  const currentPost = getBlogPostById(postId);
  if (!currentPost) return [];

  // Find posts with matching tags or category
  const related = blogPosts
    .filter((post) => post.id !== postId)
    .map((post) => {
      let score = 0;
      
      // Category match
      if (post.category.id === currentPost.category.id) score += 3;
      
      // Tag matches
      const commonTags = post.tags.filter((tag) => 
        currentPost.tags.includes(tag)
      );
      score += commonTags.length * 2;
      
      return { post, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.post);

  return related;
};

// Export categories for filtering
export const blogCategoryFilters = blogCategories.map((category) => ({
  id: category.id,
  label: category.name,
  count: getPostsByCategory(category.id).length,
}));

// Popular tags for tag cloud
export const getPopularTags = (limit: number = 20): Array<{ tag: string; count: number }> => {
  const tagCounts: Record<string, number> = {};
  
  blogPosts.forEach((post) => {
    post.tags.forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });

  return Object.entries(tagCounts)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
};

// Strapi Migration Schema
export const strapiBlogSchema = {
  collections: {
    blogPost: {
      collectionName: "blog_posts",
      info: {
        singularName: "blog-post",
        pluralName: "blog-posts",
        displayName: "Blog Post",
        description: "Blog posts for DeliceMy website",
      },
      attributes: {
        slug: { type: "uid", targetField: "title", required: true },
        title: { type: "string", required: true, maxLength: 200 },
        excerpt: { type: "text", required: true, maxLength: 300 },
        content: { type: "richtext", required: true },
        featuredImage: { 
          type: "media", 
          required: true, 
          allowedTypes: ["images"] 
        },
        category: {
          type: "relation",
          relation: "manyToOne",
          target: "api::blog-category.blog-category",
        },
        tags: {
          type: "json",
          description: "Array of tag strings",
        },
        author: {
          type: "relation",
          relation: "manyToOne",
          target: "api::author.author",
        },
        publishedAt: { type: "datetime", required: true },
        readingTime: { type: "integer", required: true, min: 1 },
        featured: { type: "boolean", default: false },
        seo: {
          type: "component",
          component: "shared.seo",
        },
      },
    },
    blogCategory: {
      collectionName: "blog_categories",
      info: {
        singularName: "blog-category",
        pluralName: "blog-categories",
        displayName: "Blog Category",
      },
      attributes: {
        slug: { type: "uid", targetField: "name", required: true },
        name: { type: "string", required: true },
        description: { type: "text", required: true },
        color: { type: "string", required: true },
        icon: { type: "string" },
        posts: {
          type: "relation",
          relation: "oneToMany",
          target: "api::blog-post.blog-post",
          mappedBy: "category",
        },
      },
    },
    author: {
      collectionName: "authors",
      info: {
        singularName: "author",
        pluralName: "authors",
        displayName: "Author",
      },
      attributes: {
        name: { type: "string", required: true },
        bio: { type: "text", required: true },
        avatar: { 
          type: "media", 
          required: true, 
          allowedTypes: ["images"] 
        },
        role: { type: "string", required: true },
        posts: {
          type: "relation",
          relation: "oneToMany",
          target: "api::blog-post.blog-post",
          mappedBy: "author",
        },
        social: {
          type: "component",
          component: "shared.social-links",
        },
      },
    },
  },
};

// Export main collections
export const blogContent = {
  posts: blogPosts,
  categories: blogCategories,
  authors: blogAuthors,
};

export default blogContent;