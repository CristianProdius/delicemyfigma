"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Star,
  ChefHat,
  Crown,
  ArrowRight,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Eye,
} from "lucide-react";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  badge?: "Limited Edition" | "Award Winner" | "Chef's Choice" | "Bestseller";
  description: string;
}

interface FeaturedProductsProps {
  title: string;
  products: Product[];
  collections: string[];
  onProductClick: (productId: string) => void;
  onCollectionFilter: (collection: string) => void;
  showAllUrl: string;
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
  title,
  products,
  collections,
  onProductClick,
  onCollectionFilter,
  showAllUrl,
}) => {
  const [activeCollection, setActiveCollection] = useState<string>("All");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Handle collection filter
  const handleCollectionClick = (collection: string) => {
    setActiveCollection(collection);
    onCollectionFilter(collection);
  };

  // Badge icon component
  const BadgeIcon = ({ badge }: { badge: string }) => {
    switch (badge) {
      case "Limited Edition":
        return <Crown className="w-3 h-3" />;
      case "Award Winner":
        return <Star className="w-3 h-3 fill-current" />;
      case "Chef's Choice":
        return <ChefHat className="w-3 h-3" />;
      case "Bestseller":
        return <Sparkles className="w-3 h-3" />;
      default:
        return null;
    }
  };

  // Badge styles
  const getBadgeStyles = (badge: string) => {
    switch (badge) {
      case "Limited Edition":
        return "bg-gradient-to-r from-yellow-400 to-amber-500 text-white";
      case "Award Winner":
        return "bg-gradient-to-r from-purple-500 to-pink-500 text-white";
      case "Chef's Choice":
        return "bg-gradient-to-r from-emerald-500 to-teal-500 text-white";
      case "Bestseller":
        return "bg-gradient-to-r from-red-500 to-orange-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  // Mobile carousel navigation
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + products.length) % products.length);
  };

  // Format price with currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
    }).format(price);
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 px-4 bg-gradient-to-b from-amber-50/50 to-white relative overflow-hidden"
    >
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-yellow-200/20 to-amber-200/20 rounded-full filter blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-amber-200/20 to-yellow-200/20 rounded-full filter blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-12 ${
            isInView ? "animate-fadeInUp" : "opacity-0"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
            {title || "Curated Collections"}
          </h2>

          {/* Decorative Line Art */}
          <div className="flex items-center justify-center mb-8">
            <svg
              width="300"
              height="40"
              viewBox="0 0 300 40"
              className="opacity-50"
            >
              <path
                d="M0,20 Q75,0 150,20 T300,20"
                stroke="url(#goldGradient)"
                strokeWidth="2"
                fill="none"
              />
              <circle cx="150" cy="20" r="4" fill="url(#goldGradient)" />
              <defs>
                <linearGradient
                  id="goldGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#F59E0B" />
                  <stop offset="50%" stopColor="#FCD34D" />
                  <stop offset="100%" stopColor="#F59E0B" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Collection Filter Pills */}
        <div
          className={`flex flex-wrap gap-3 justify-center mb-12 ${
            isInView ? "animate-fadeInUp animation-delay-200" : "opacity-0"
          }`}
        >
          <button
            onClick={() => handleCollectionClick("All")}
            className={`px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 ${
              activeCollection === "All"
                ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-white shadow-lg"
                : "bg-white/80 backdrop-blur-sm border border-amber-200 text-gray-700 hover:text-amber-600 hover:border-amber-400"
            }`}
          >
            <span className="font-medium">All Collections</span>
          </button>
          {collections.map((collection) => (
            <button
              key={collection}
              onClick={() => handleCollectionClick(collection)}
              className={`px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 ${
                activeCollection === collection
                  ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-white shadow-lg"
                  : "bg-white/80 backdrop-blur-sm border border-amber-200 text-gray-700 hover:text-amber-600 hover:border-amber-400"
              }`}
            >
              <span className="font-medium">{collection}</span>
            </button>
          ))}
        </div>

        {/* Products Grid - Desktop/Tablet */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {products.map((product, index) => (
            <div
              key={product.id}
              className={`group relative ${
                isInView ? "animate-fadeInUp" : "opacity-0"
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              {/* Product Card */}
              <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden border border-amber-100">
                {/* Glow Effect on Hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r from-amber-400/20 to-yellow-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
                />

                {/* Product Image Container */}
                <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-amber-50 to-yellow-50">
                  <Image
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    width={300}
                    height={300}
                  />

                  {/* Vignette Effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60" />

                  {/* Badge */}
                  {product.badge && (
                    <div
                      className={`absolute top-4 left-4 px-3 py-1 rounded-full flex items-center space-x-1 ${getBadgeStyles(
                        product.badge
                      )} shadow-lg transform group-hover:scale-105 transition-transform duration-300`}
                    >
                      <BadgeIcon badge={product.badge} />
                      <span className="text-xs font-semibold">
                        {product.badge}
                      </span>
                    </div>
                  )}

                  {/* Hover Overlay with Description */}
                  <div
                    className={`absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col justify-center items-center p-6 transition-opacity duration-300 ${
                      hoveredProduct === product.id
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                  >
                    <p className="text-white text-sm text-center mb-4 line-clamp-3">
                      {product.description}
                    </p>
                    <button
                      onClick={() => onProductClick(product.id)}
                      className="px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-white hover:bg-white/30 transition-all duration-300 flex items-center space-x-2 group/btn"
                    >
                      <Eye className="w-4 h-4" />
                      <span className="text-sm font-medium">
                        Discover in Boutique
                      </span>
                      <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>

                {/* Product Details */}
                <div className="p-5">
                  {/* Category */}
                  <p className="text-xs text-amber-600 uppercase tracking-wider mb-2 font-medium">
                    {product.category}
                  </p>

                  {/* Product Name */}
                  <h3 className="text-lg font-serif font-semibold text-gray-800 mb-3 line-clamp-1 group-hover:text-amber-600 transition-colors">
                    {product.name}
                  </h3>

                  {/* Price */}
                  <div className="flex items-center justify-between">
                    <p className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
                      {formatPrice(product.price)}
                    </p>
                    <button
                      onClick={() => onProductClick(product.id)}
                      className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-400 to-yellow-400 flex items-center justify-center text-white hover:scale-110 transition-transform duration-300 shadow-lg"
                    >
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden relative mb-12">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {products.map((product) => (
                <div key={product.id} className="w-full flex-shrink-0 px-2">
                  {/* Mobile Product Card - Same structure as desktop */}
                  <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden border border-amber-100">
                    <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-amber-50 to-yellow-50">
                      <Image
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        width={300}
                        height={300}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60" />
                      {product.badge && (
                        <div
                          className={`absolute top-4 left-4 px-3 py-1 rounded-full flex items-center space-x-1 ${getBadgeStyles(
                            product.badge
                          )} shadow-lg`}
                        >
                          <BadgeIcon badge={product.badge} />
                          <span className="text-xs font-semibold">
                            {product.badge}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <p className="text-xs text-amber-600 uppercase tracking-wider mb-2 font-medium">
                        {product.category}
                      </p>
                      <h3 className="text-lg font-serif font-semibold text-gray-800 mb-2">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
                          {formatPrice(product.price)}
                        </p>
                        <button
                          onClick={() => onProductClick(product.id)}
                          className="px-4 py-2 bg-gradient-to-r from-amber-400 to-yellow-400 rounded-full text-white text-sm font-medium"
                        >
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Navigation */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-amber-600 hover:bg-amber-50 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-amber-600 hover:bg-amber-50 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Carousel Dots */}
          <div className="flex justify-center space-x-2 mt-6">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? "w-8 bg-gradient-to-r from-amber-400 to-yellow-400"
                    : "bg-amber-200 hover:bg-amber-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div
          className={`text-center ${
            isInView ? "animate-fadeInUp animation-delay-400" : "opacity-0"
          }`}
        >
          <a
            href={showAllUrl}
            className="group inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            <span className="text-lg font-semibold">
              View Entire Collection
            </span>
            <ArrowRight className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300" />
          </a>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
        }

        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default FeaturedProducts;
