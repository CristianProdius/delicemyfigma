// src/modules/shop/data/shop-content.ts

/**
 * Premium Chocolate Shop Content Configuration
 * For Strapi CMS Integration
 */

// Type Definitions
export interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  currency: string;
  category: "Limited Edition" | "Signature" | "Seasonal" | "Exclusive";
  badges: Array<
    | "Bestseller"
    | "Award Winner"
    | "Chef's Choice"
    | "New Arrival"
    | "Limited Stock"
    | "Organic"
  >;
  description: string;
  availability: boolean;
  originalPrice?: number;
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
  priceRange: {
    min: number;
    max: number;
    currency: string;
  };
}

export interface BoutiqueStat {
  value: string;
  label: string;
  icon?: string;
}

export interface ShopContent {
  heroTitle: string;
  heroSubtitle: string;
  luxuryDescription: string;
  externalUrl: string;
  featuredProducts: Product[];
  collections: Collection[];
  premiumBenefits: string[];
  boutiqueStats: BoutiqueStat[];
  redirectMessage: string;
  ctaButtonText: string;
  specialOffer: string;
  metadata: {
    lastUpdated: string;
    version: string;
  };
}

// Main Shop Content Data
export const shopContent: ShopContent = {
  heroTitle: "Dyqani Ekskluziv i Čokollatës",
  heroSubtitle: "Handcrafted Artisan Collections, Delivered with Love",
  luxuryDescription:
    "Each piece is a masterpiece, crafted with Belgian chocolate and adorned with edible gold",
  externalUrl: "https://boutique.chocoluxe.com",

  featuredProducts: [
    {
      id: "prod-001",
      name: "Midnight Truffle Collection",
      image:
        "https://images.unsplash.com/photo-1549007994-cb92caebd54b?q=80&w=2000",
      price: 89.99,
      currency: "EUR",
      category: "Signature",
      badges: ["Bestseller", "Award Winner"],
      description:
        "An enchanting symphony of dark chocolate truffles infused with rare Tahitian vanilla and dusted with cocoa from Ecuador's finest plantations",
      availability: true,
      originalPrice: 109.99,
    },
    {
      id: "prod-002",
      name: "Rose Gold Pralines",
      image:
        "https://images.unsplash.com/photo-1511381939415-e44015466834?q=80&w=2000",
      price: 125.0,
      currency: "EUR",
      category: "Limited Edition",
      badges: ["New Arrival", "Chef's Choice"],
      description:
        "Delicate pralines kissed with Damascus rose petals and enrobed in our signature ruby chocolate, finished with edible 24k rose gold leaf",
      availability: true,
    },
    {
      id: "prod-003",
      name: "Champagne Truffle Royale",
      image:
        "https://images.unsplash.com/photo-1548741487-18d363dc4469?q=80&w=2000",
      price: 149.99,
      currency: "EUR",
      category: "Exclusive",
      badges: ["Limited Stock", "Award Winner"],
      description:
        "Dom Pérignon-infused ganache centers wrapped in Grand Cru chocolate, a celebration of French elegance in every bite",
      availability: true,
    },
    {
      id: "prod-004",
      name: "Himalayan Salt Caramel Collection",
      image:
        "https://images.unsplash.com/photo-1481391319762-47dff72954d9?q=80&w=2000",
      price: 79.99,
      currency: "EUR",
      category: "Signature",
      badges: ["Bestseller"],
      description:
        "Buttery soft caramels enhanced with pink Himalayan salt crystals, enveloped in Venezuelan single-origin chocolate",
      availability: true,
    },
    {
      id: "prod-005",
      name: "Matcha & White Chocolate Harmony",
      image:
        "https://images.unsplash.com/photo-1559887002-d37eb479e3f1?q=80&w=2000",
      price: 95.0,
      currency: "EUR",
      category: "Seasonal",
      badges: ["New Arrival", "Organic"],
      description:
        "Ceremonial-grade Kyoto matcha perfectly balanced with Swiss white chocolate, creating a zen-like moment of indulgence",
      availability: true,
    },
    {
      id: "prod-006",
      name: "Black Forest Liqueur Bonbons",
      image:
        "https://images.unsplash.com/photo-1622210695946-526022613cb2?q=80&w=2000",
      price: 110.0,
      currency: "EUR",
      category: "Limited Edition",
      badges: ["Chef's Choice", "Award Winner"],
      description:
        "Kirsch-soaked Morello cherries embraced by layers of dark chocolate ganache, an homage to the classic Black Forest",
      availability: true,
      originalPrice: 135.0,
    },
    {
      id: "prod-007",
      name: "Madagascar Vanilla Bean Dreams",
      image:
        "https://images.unsplash.com/photo-1542843137-8791a6904d14?q=80&w=2000",
      price: 85.0,
      currency: "EUR",
      category: "Signature",
      badges: ["Bestseller", "Organic"],
      description:
        "Pure Madagascar vanilla bean paste swirled through milk chocolate ganache, creating clouds of aromatic bliss",
      availability: true,
    },
    {
      id: "prod-008",
      name: "Saffron & Pistachio Jewels",
      image:
        "https://images.unsplash.com/photo-1587132137056-63a0e813c75e?q=80&w=2000",
      price: 165.0,
      currency: "EUR",
      category: "Exclusive",
      badges: ["Limited Stock", "New Arrival"],
      description:
        "Persian saffron threads and Sicilian pistachios unite in dark chocolate, crowned with edible gold - a treasure from ancient trade routes",
      availability: true,
    },
  ],

  collections: [
    {
      id: "col-001",
      name: "The Connoisseur Selection",
      description:
        "For the distinguished palate, featuring our most sophisticated single-origin chocolates and rare cacao varietals",
      image:
        "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?q=80&w=2000",
      productCount: 24,
      priceRange: {
        min: 120,
        max: 280,
        currency: "EUR",
      },
    },
    {
      id: "col-002",
      name: "Celebration Luxe",
      description:
        "Magnificent gift sets designed to mark life's most precious moments with unparalleled elegance",
      image:
        "https://images.unsplash.com/photo-1575224300306-1b8da36134ec?q=80&w=2000",
      productCount: 18,
      priceRange: {
        min: 150,
        max: 450,
        currency: "EUR",
      },
    },
    {
      id: "col-003",
      name: "Artisan Single Origin",
      description:
        "Journey through the world's finest cacao regions with our expertly curated single-origin collection",
      image:
        "https://images.unsplash.com/photo-1623660053975-cf75a8be0908?q=80&w=2000",
      productCount: 32,
      priceRange: {
        min: 75,
        max: 195,
        currency: "EUR",
      },
    },
    {
      id: "col-004",
      name: "Royal Gift Collections",
      description:
        "Opulent presentation boxes worthy of royalty, featuring our most prestigious chocolates and exclusive limited editions",
      image:
        "https://images.unsplash.com/photo-1635405074683-99fdad840614?q=80&w=2000",
      productCount: 15,
      priceRange: {
        min: 250,
        max: 750,
        currency: "EUR",
      },
    },
  ],

  premiumBenefits: [
    "Complimentary Gift Wrapping",
    "Personal Chocolatier Consultation",
    "Temperature-Controlled Delivery",
    "Exclusive Member Rewards",
    "Priority Access to Limited Editions",
    "Seasonal Tasting Events",
    "Personalized Engraving Service",
    "Lifetime Quality Guarantee",
  ],

  boutiqueStats: [
    {
      value: "2000+",
      label: "Five-Star Reviews",
      icon: "star",
    },
    {
      value: "47",
      label: "International Awards",
      icon: "trophy",
    },
    {
      value: "100%",
      label: "Belgian Chocolate",
      icon: "certificate",
    },
    {
      value: "15+",
      label: "Years of Excellence",
      icon: "diamond",
    },
  ],

  redirectMessage: "Enter Our Boutique for the Complete Luxury Experience",
  ctaButtonText: "Enter Chocolate Boutique",
  specialOffer: "Complimentary Champagne Truffles with Orders Over €100",

  metadata: {
    lastUpdated: new Date().toISOString(),
    version: "1.0.0",
  },
};

// Helper function to get products by category
export const getProductsByCategory = (
  category: Product["category"]
): Product[] => {
  return shopContent.featuredProducts.filter(
    (product) => product.category === category
  );
};

// Helper function to get products with specific badge
export const getProductsByBadge = (
  badge: Product["badges"][number]
): Product[] => {
  return shopContent.featuredProducts.filter((product) =>
    product.badges.includes(badge)
  );
};

// Helper function to get products within price range
export const getProductsByPriceRange = (
  min: number,
  max: number
): Product[] => {
  return shopContent.featuredProducts.filter(
    (product) => product.price >= min && product.price <= max
  );
};

// Helper function to get available products only
export const getAvailableProducts = (): Product[] => {
  return shopContent.featuredProducts.filter(
    (product) => product.availability === true
  );
};

// Helper function to get discounted products
export const getDiscountedProducts = (): Product[] => {
  return shopContent.featuredProducts.filter(
    (product) => product.originalPrice !== undefined
  );
};

// Helper function to format price with currency
export const formatPrice = (
  price: number,
  currency: string = "EUR"
): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
  }).format(price);
};

// Export type for Strapi integration
export type ShopContentType = typeof shopContent;

// Default export for easy importing
export default shopContent;
