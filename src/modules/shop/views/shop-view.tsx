"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ExternalLink, Sparkles, ChevronDown } from "lucide-react";

// Component imports
import ShopHero from "../components/shop-hero";
import FeaturedProducts from "../components/featured-products";
import ShopPreview from "../components/shop-preview";
import ShopRedirectCTA from "../components/shop-redirect-cta";

// Data imports
import shopContent, { getProductsByCategory } from "../data/shop-content";

// Loading Shimmer Component
const LoadingShimmer: React.FC = () => (
  <div className="min-h-screen bg-gradient-to-b from-white to-[#FAF0E6]">
    <div className="animate-pulse">
      <div className="h-screen bg-gradient-to-br from-amber-100/30 to-amber-50/30" />
      <div className="max-w-7xl mx-auto p-8 grid grid-cols-1 md:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="space-y-4">
            <div className="h-64 bg-amber-200/20 rounded-2xl" />
            <div className="h-4 bg-amber-200/20 rounded w-3/4" />
            <div className="h-4 bg-amber-200/20 rounded w-1/2" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Main Shop View Component
const ShopView: React.FC = () => {
  // State management
  const [isLoading, setIsLoading] = useState(true);
  const [activeCollection, setActiveCollection] = useState<string>("All");
  const [filteredProducts, setFilteredProducts] = useState(
    shopContent.featuredProducts
  );
  const [scrollIndicatorVisible, setScrollIndicatorVisible] = useState(true);

  // Scroll animations setup
  const { scrollY } = useScroll();
  const heroParallax = useTransform(scrollY, [0, 600], [0, -100]);
  const decorParallax = useTransform(scrollY, [0, 800], [0, 50]);

  // Loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // Hide scroll indicator on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrollIndicatorVisible(window.scrollY < 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Collection filtering
  const handleCollectionFilter = (collection: string) => {
    setActiveCollection(collection);

    if (collection === "All") {
      setFilteredProducts(shopContent.featuredProducts);
    } else {
      const filtered = shopContent.featuredProducts.filter(
        (product) =>
          product.category === collection || collection === "Signature"
      );
      setFilteredProducts(
        filtered.length > 0 ? filtered : shopContent.featuredProducts
      );
    }
  };

  // Product click handler
  const handleProductClick = (productId: string) => {
    window.open(`${shopContent.externalUrl}/products/${productId}`, "_blank");
  };

  // Newsletter submission
  const handleNewsletterSubmit = async (email: string) => {
    console.log("Newsletter signup:", email);
    // Implement your newsletter API call here
    return new Promise((resolve) => setTimeout(resolve, 1000));
  };

  // Component props configuration
  const heroProps = {
    title: shopContent.heroTitle,
    subtitle: shopContent.heroSubtitle,
    ctaText: shopContent.ctaButtonText,
    ctaUrl: shopContent.externalUrl,
    secondaryCtaText: "Explore Collections",
    onSecondaryClick: () => {
      document
        .getElementById("featured-products")
        ?.scrollIntoView({ behavior: "smooth" });
    },
    specialOffer: shopContent.specialOffer,
    trustBadges: ["Award Winning", "Artisan Crafted", "Swiss Quality"],
    backgroundImage:
      "https://images.unsplash.com/photo-1511381939415-e44015466834?q=80&w=3000",
  };

  const productsProps = {
    title: "Curated Collections",
    products: filteredProducts,
    collections: ["Signature", "Limited Edition", "Seasonal"],
    onProductClick: handleProductClick,
    onCollectionFilter: handleCollectionFilter,
    showAllUrl: shopContent.externalUrl,
  };

  const previewProps = {
    collections: shopContent.collections.map((col) => ({
      ...col,
      url: `${shopContent.externalUrl}/collections/${col.id}`,
    })),
    premiumBenefits: shopContent.premiumBenefits
      .slice(0, 4)
      .map((benefit, index) => ({
        icon: ["gift", "truck", "shield", "heart"][index],
        title: benefit,
        description: [
          "Elegant wrapping with personalized messages",
          "Climate-controlled delivery worldwide",
          "Your purchase is protected with full insurance",
          "Exclusive rewards and early access to collections",
        ][index],
      })),
    testimonials: [
      {
        text: "The most exquisite chocolates I've ever tasted. Each piece tells a story of craftsmanship and passion.",
        author: "Sophie Laurent",
        rating: 5,
        product: "Midnight Truffle Collection",
      },
      {
        text: "From the moment you open the box, you know you're experiencing something special. Pure luxury.",
        author: "Marcus Chen",
        rating: 5,
        product: "Rose Gold Pralines",
      },
      {
        text: "Worth every penny. The quality is unmatched and the presentation is absolutely stunning.",
        author: "Isabella Romano",
        rating: 5,
        product: "Champagne Truffle Royale",
      },
    ],
    instagramFeed: [
      "https://images.unsplash.com/photo-1549007994-cb92caebd54b?q=80&w=600",
      "https://images.unsplash.com/photo-1511381939415-e44015466834?q=80&w=600",
      "https://images.unsplash.com/photo-1548741487-18d363dc4469?q=80&w=600",
      "https://images.unsplash.com/photo-1481391319762-47dff72954d9?q=80&w=600",
      "https://images.unsplash.com/photo-1623660053975-cf75a8be0908?q=80&w=600",
      "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?q=80&w=600",
    ],
  };

  const ctaProps = {
    headline: "Experience Chocolate Perfection",
    subtext: shopContent.redirectMessage,
    buttonText: shopContent.ctaButtonText,
    externalUrl: shopContent.externalUrl,
    paymentMethods: ["Visa", "Mastercard", "Amex", "PayPal"],
    securityBadges: [
      "256-bit Encryption",
      "Trusted Since 2010",
      "100% Secure Shopping",
    ],
    isComingSoon: false,
    onNewsletterSubmit: handleNewsletterSubmit,
  };

  // Show loading state
  if (isLoading) {
    return <LoadingShimmer />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#FFF8E7] to-[#FAF0E6] relative">
      {/* Subtle Grain Texture Overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-[5] opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='turbulence' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.5'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Animated Page Entrance */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Hero Section with Parallax */}
        <section className="relative">
          <motion.div style={{ y: heroParallax }}>
            <ShopHero {...heroProps} />
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: scrollIndicatorVisible ? 1 : 0, y: 0 }}
            transition={{ duration: 0.5, delay: 2 }}
          >
            <motion.div
              className="flex flex-col items-center"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <span className="text-white/70 text-sm font-medium mb-2">
                Discover More
              </span>
              <ChevronDown className="w-5 h-5 text-white/70" />
            </motion.div>
          </motion.div>
        </section>

        {/* Featured Products with Stagger Animation */}
        <motion.section
          id="featured-products"
          className="py-20 px-4 relative"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Decorative Background Elements */}
          <motion.div
            className="absolute -top-20 right-0 w-96 h-96 bg-gradient-to-br from-amber-200/10 to-yellow-200/10 rounded-full filter blur-3xl"
            style={{ y: decorParallax }}
          />
          <motion.div
            className="absolute -bottom-20 left-0 w-96 h-96 bg-gradient-to-tr from-amber-100/10 to-yellow-100/10 rounded-full filter blur-3xl"
            style={{ y: decorParallax }}
          />

          <div className="max-w-7xl mx-auto relative z-10">
            <FeaturedProducts {...productsProps} />
          </div>
        </motion.section>

        {/* Decorative Separator */}
        <div className="text-center py-10">
          <div className="relative">
            <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto" />
            <Sparkles className="w-5 h-5 text-amber-400 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Shop Preview with Fade-in */}
        <motion.section
          className="py-20 bg-gradient-to-br from-[#FAF0E6] via-white to-[#FFF8E7]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 1 }}
        >
          <ShopPreview {...previewProps} />
        </motion.section>

        {/* Final CTA with Impact */}
        <motion.section
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        >
          <ShopRedirectCTA {...ctaProps} />
        </motion.section>

        {/* Back to Top Button */}
        <motion.button
          className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full shadow-xl flex items-center justify-center text-white hover:scale-110 transition-transform z-40"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 3 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          whileHover={{ rotate: 360, transition: { duration: 0.5 } }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronDown className="w-5 h-5 rotate-180" />
        </motion.button>
      </motion.div>

      {/* Global Styles */}
      <style jsx global>{`
        /* Smooth Scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Premium Colors */
        :root {
          --chocolate-dark: #3b2f2f;
          --chocolate-medium: #6b4423;
          --gold-primary: #ffd700;
          --gold-secondary: #ffa500;
          --cream-light: #fff8e7;
          --cream-medium: #faf0e6;
        }

        /* Premium Typography */
        body {
          font-family: system-ui, -apple-system, sans-serif;
        }

        h1,
        h2,
        h3,
        h4 {
          font-family: "Playfair Display", Georgia, serif;
        }

        /* Glass Morphism Utility */
        .glass {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        /* Custom Scrollbar */
        ::-webkit-scrollbar {
          width: 10px;
        }

        ::-webkit-scrollbar-track {
          background: var(--cream-light);
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(
            180deg,
            var(--gold-primary),
            var(--gold-secondary)
          );
          border-radius: 5px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: var(--gold-secondary);
        }

        /* Selection Color */
        ::selection {
          background: rgba(255, 215, 0, 0.3);
          color: var(--chocolate-dark);
        }
      `}</style>
    </div>
  );
};

export default ShopView;
