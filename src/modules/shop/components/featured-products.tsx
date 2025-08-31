"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, ChevronLeft, ChevronRight, Package, Star, Sparkles } from "lucide-react";
import Image from "next/image";

// Mock data
const shopContent = {
  externalUrl: "https://shop.chocolaterie.com",
  featuredProducts: [
    {
      id: "1",
      name: "Midnight Truffle Collection",
      description: "Dark chocolate truffles infused with exotic spices and premium liqueurs",
      price: 48,
      category: "Signature",
      image: "/product-1.jpg",
      badges: ["Best Seller"],
      accentColor: "#D4A574"
    },
    {
      id: "2",
      name: "Rose Gold Pralines",
      description: "Delicate pralines with rose-infused ganache and gold leaf finish",
      price: 56,
      category: "Limited Edition",
      image: "/product-2.jpg",
      badges: ["New"],
      accentColor: "#E8B4B8"
    },
    {
      id: "3",
      name: "Swiss Alpine Collection",
      description: "Traditional Swiss chocolate with alpine herbs and honey notes",
      price: 42,
      category: "Signature",
      image: "/product-3.jpg",
      badges: ["Award Winner"],
      accentColor: "#A67B5B"
    },
    {
      id: "4",
      name: "Winter Solstice Box",
      description: "Seasonal favorites with cinnamon, cardamom, and winter spices",
      price: 38,
      category: "Seasonal",
      image: "/product-4.jpg",
      badges: ["Limited Time"],
      accentColor: "#F4A460"
    }
  ]
};

export const FeaturedProducts: React.FC = () => {
  const [activeCollection, setActiveCollection] = useState<string>("All");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [filteredProducts, setFilteredProducts] = useState(
    shopContent.featuredProducts
  );

  // Collection filtering
  const handleCollectionFilter = (collection: string) => {
    setActiveCollection(collection);
    
    if (collection === "All") {
      setFilteredProducts(shopContent.featuredProducts);
    } else {
      const filtered = shopContent.featuredProducts.filter(
        (product) => product.category === collection || collection === "Signature"
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

  // Mobile carousel navigation
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % filteredProducts.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + filteredProducts.length) % filteredProducts.length);
  };

  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const collections = ["All", "Signature", "Limited Edition", "Seasonal"];

  return (
    <section id="featured-products" className="relative py-16 sm:py-20 lg:py-24 xl:py-32 overflow-hidden bg-gradient-to-b from-white via-[#FBFAF8] to-[#F9F7F4]">
      {/* Premium background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated gradient orbs */}
        <motion.div 
          className="absolute top-1/3 -right-32 w-96 h-96 bg-gradient-to-br from-amber-200/10 to-transparent rounded-full blur-3xl"
          animate={{
            x: [-50, 0, -50],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/3 -left-32 w-80 h-80 bg-gradient-to-tl from-amber-100/10 to-transparent rounded-full blur-3xl"
          animate={{
            x: [50, 0, 50],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="px-4 sm:px-6 lg:px-8 max-w-[91.666667%] mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16 sm:mb-20"
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
            className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-amber-100/80 to-amber-50/50 mb-8 shadow-lg"
          >
            <Package className="w-7 h-7 sm:w-8 sm:h-8 text-amber-700" />
          </motion.div>

          {/* Title */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extralight font-serif leading-[0.95] tracking-tight text-[#451C15] mb-6">
            Curated
            <span className="block sm:inline sm:ml-4 italic font-thin text-transparent bg-clip-text bg-gradient-to-r from-[#A67B5B] to-[#D4A574]">
              Collections
            </span>
          </h2>
          
          <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-[#451C15]/50 max-w-3xl mx-auto leading-relaxed font-extralight">
            Handcrafted with the finest ingredients from around the world
          </p>
        </motion.div>

        {/* Collection Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap gap-3 sm:gap-4 justify-center mb-16 sm:mb-20"
        >
          {collections.map((collection, index) => (
            <motion.button
              key={collection}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + index * 0.05, duration: 0.4 }}
              onClick={() => handleCollectionFilter(collection)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 sm:px-8 py-2.5 sm:py-3 rounded-full transition-all duration-300 ${
                activeCollection === collection
                  ? "bg-gradient-to-r from-[#451C15] to-[#5A2419] text-white shadow-xl"
                  : "bg-white/80 backdrop-blur-sm border border-amber-200/50 text-[#451C15] hover:border-amber-300 hover:bg-amber-50/50"
              }`}
            >
              <span className="text-sm sm:text-base font-light">{collection}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Products Grid - Desktop */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 mb-16 sm:mb-20">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ 
                delay: index * 0.1, 
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              whileHover={{ 
                y: -15, 
                scale: 1.02,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              className="group cursor-pointer"
              onClick={() => handleProductClick(product.id)}
            >
              <div
                className="relative h-full overflow-hidden rounded-2xl sm:rounded-3xl lg:rounded-[36px] shadow-2xl hover:shadow-3xl transition-all duration-500"
                style={{
                  background: `linear-gradient(135deg, #451C15 0%, #5A2419 100%)`,
                }}
              >
                {/* Gradient Overlay */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 z-10"
                  style={{
                    background: `linear-gradient(135deg, ${product.accentColor}40 0%, transparent 40%, ${product.accentColor}30 100%)`,
                  }}
                />

                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-white/10 to-white/5">
                  <Image
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    width={400}
                    height={400}
                  />
                  
                  {/* Badge */}
                  {product.badges && product.badges.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                      className="absolute top-4 left-4 z-20"
                    >
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-400/20 to-amber-600/20 backdrop-blur-md text-amber-200 text-xs font-medium uppercase tracking-wider border border-amber-400/20 rounded-full">
                        <Sparkles className="w-3 h-3" />
                        {product.badges[0]}
                      </span>
                    </motion.div>
                  )}
                  
                  {/* Image gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#451C15] via-transparent to-transparent opacity-60" />
                </div>

                {/* Product Details */}
                <div className="relative z-20 p-6 sm:p-8">
                  <p className="text-xs uppercase tracking-[0.15em] text-amber-200/60 mb-2">
                    {product.category}
                  </p>
                  <h3 className="text-xl sm:text-2xl font-extralight text-white mb-3 group-hover:text-amber-100 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-white/60 line-clamp-2 mb-6">
                    {product.description}
                  </p>
                  
                  {/* Price and CTA */}
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-extralight text-transparent bg-clip-text bg-gradient-to-r from-white to-amber-200">
                      {formatPrice(product.price)}
                    </span>
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="p-2 rounded-full bg-white/10 backdrop-blur-sm group-hover:bg-white/20 transition-all duration-300"
                    >
                      <ArrowRight className="w-5 h-5 text-amber-200" />
                    </motion.div>
                  </div>
                </div>

                {/* Corner Glow */}
                <div
                  className="absolute -bottom-16 -right-16 w-32 h-32 opacity-20 group-hover:opacity-30 blur-2xl transition-all duration-700 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle, ${product.accentColor} 0%, transparent 60%)`,
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden relative mb-16">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {filteredProducts.map((product) => (
                <div key={product.id} className="w-full flex-shrink-0 px-4">
                  <div 
                    className="cursor-pointer"
                    onClick={() => handleProductClick(product.id)}
                  >
                    <div
                      className="relative overflow-hidden rounded-3xl shadow-2xl"
                      style={{
                        background: `linear-gradient(135deg, #451C15 0%, #5A2419 100%)`,
                      }}
                    >
                      {/* Product Image */}
                      <div className="relative aspect-square overflow-hidden">
                        <Image
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                          width={400}
                          height={400}
                        />
                        {product.badges && product.badges.length > 0 && (
                          <div className="absolute top-4 left-4 z-20">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-400/20 to-amber-600/20 backdrop-blur-md text-amber-200 text-xs font-medium uppercase tracking-wider border border-amber-400/20 rounded-full">
                              <Sparkles className="w-3 h-3" />
                              {product.badges[0]}
                            </span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#451C15] via-transparent to-transparent opacity-60" />
                      </div>

                      {/* Product Details */}
                      <div className="p-6 text-center">
                        <p className="text-xs uppercase tracking-[0.15em] text-amber-200/60 mb-2">
                          {product.category}
                        </p>
                        <h3 className="text-2xl font-extralight text-white mb-3">
                          {product.name}
                        </h3>
                        <p className="text-sm text-white/60 mb-6">
                          {product.description}
                        </p>
                        <p className="text-2xl font-extralight text-transparent bg-clip-text bg-gradient-to-r from-white to-amber-200">
                          {formatPrice(product.price)}
                        </p>
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
            className="absolute left-2 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-xl flex items-center justify-center text-[#451C15] hover:bg-white transition-all"
            aria-label="Previous product"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-xl flex items-center justify-center text-[#451C15] hover:bg-white transition-all"
            aria-label="Next product"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Carousel Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {filteredProducts.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`transition-all duration-300 ${
                  currentSlide === index
                    ? "w-8 h-2 bg-gradient-to-r from-[#451C15] to-[#5A2419] rounded-full"
                    : "w-2 h-2 bg-amber-200/30 rounded-full hover:bg-amber-200/50"
                }`}
                aria-label={`Go to product ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <motion.a
            href={shopContent.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 px-10 sm:px-12 py-4 sm:py-5 bg-gradient-to-r from-[#451C15] to-[#5A2419] text-white hover:from-[#5A2419] hover:to-[#451C15] rounded-full transition-all duration-300 group shadow-2xl hover:shadow-3xl text-base sm:text-lg lg:text-xl font-light relative overflow-hidden"
            style={{
              boxShadow: "0 15px 40px rgba(69, 28, 21, 0.35)",
            }}
          >
            {/* Button shimmer */}
            <div className="absolute inset-0 -top-4 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
            
            <span className="relative z-10">View Entire Collection</span>
            <ArrowRight className="relative z-10 w-5 h-5 transition-transform group-hover:translate-x-1" />
          </motion.a>
        </motion.div>
      </div>

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};