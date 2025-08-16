"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  ArrowRight,
  Star,
  Shield,
  Gift,
  Truck,
  Heart,
  Award,
  Clock,
  Gem,
  Package,
  Instagram,
  ChevronLeft,
  ChevronRight,
  Quote,
} from "lucide-react";

interface Collection {
  name: string;
  image: string;
  productCount: number;
  description: string;
  url: string;
}

interface PremiumBenefit {
  icon: string;
  title: string;
  description: string;
}

interface Testimonial {
  text: string;
  author: string;
  rating: number;
  product: string;
}

interface ShopPreviewProps {
  collections: Collection[];
  premiumBenefits: PremiumBenefit[];
  testimonials?: Testimonial[];
  instagramFeed?: string[];
}

const ShopPreview: React.FC<ShopPreviewProps> = ({
  collections,
  premiumBenefits,
  testimonials = [],
  instagramFeed = [],
}) => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isInView, setIsInView] = useState<{ [key: string]: boolean }>({});
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const benefitsScrollRef = useRef<HTMLDivElement>(null);

  // Icon mapping for benefits
  const getIcon = (iconName: string) => {
    const iconMap: { [key: string]: React.ElementType } = {
      shield: Shield,
      gift: Gift,
      truck: Truck,
      heart: Heart,
      award: Award,
      clock: Clock,
      gem: Gem,
      package: Package,
    };
    const IconComponent = iconMap[iconName.toLowerCase()] || Gift;
    return <IconComponent className="w-8 h-8" />;
  };

  // Intersection Observer for animations
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    Object.keys(sectionRefs.current).forEach((key) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsInView((prev) => ({ ...prev, [key]: true }));
          }
        },
        { threshold: 0.1 }
      );

      const element = sectionRefs.current[key];
      if (element) {
        observer.observe(element);
        observers.push(observer);
      }
    });

    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

  // Auto-play testimonials carousel
  useEffect(() => {
    if (testimonials.length > 0 && !isPaused) {
      const interval = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [testimonials.length, isPaused]);

  // Testimonial navigation
  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <div className="bg-gradient-to-b from-white via-amber-50/30 to-white">
      {/* Collections Showcase */}
      <section
        ref={(el) => {
          sectionRefs.current["collections"] = el as HTMLDivElement | null;
        }}
        className="py-20 px-4"
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div
            className={`text-center mb-16 ${
              isInView["collections"] ? "animate-fadeInUp" : "opacity-0"
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 bg-gradient-to-r from-amber-700 to-yellow-600 bg-clip-text text-transparent">
              Exclusive Collections
            </h2>

            {/* Ornamental Divider */}
            <div className="flex items-center justify-center">
              <div className="w-20 h-[1px] bg-gradient-to-r from-transparent to-amber-400" />
              <svg width="60" height="20" viewBox="0 0 60 20" className="mx-3">
                <path
                  d="M10,10 Q20,0 30,10 T50,10"
                  stroke="url(#ornament-gradient)"
                  strokeWidth="2"
                  fill="none"
                />
                <circle cx="30" cy="10" r="3" fill="url(#ornament-gradient)" />
                <defs>
                  <linearGradient
                    id="ornament-gradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#D97706" />
                    <stop offset="50%" stopColor="#FCD34D" />
                    <stop offset="100%" stopColor="#D97706" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="w-20 h-[1px] bg-gradient-to-l from-transparent to-amber-400" />
            </div>
          </div>

          {/* Collections Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {collections.slice(0, 4).map((collection, index) => (
              <div
                key={collection.name}
                className={`group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 ${
                  isInView["collections"] ? "animate-fadeInUp" : "opacity-0"
                }`}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Glass Border on Hover */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/30 rounded-2xl transition-all duration-500 z-10 pointer-events-none" />

                {/* Full-bleed Image */}
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={collection.image}
                    alt={collection.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/90 transition-colors duration-500" />

                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    {/* Collection Name */}
                    <h3 className="text-3xl font-serif font-bold mb-2 transform group-hover:translate-y-[-4px] transition-transform duration-300">
                      {collection.name}
                    </h3>

                    {/* Product Count */}
                    <p className="text-amber-400 text-sm font-medium mb-3">
                      {collection.productCount} Exclusive Products
                    </p>

                    {/* Description */}
                    <p className="text-white/90 text-sm mb-4 line-clamp-2 leading-relaxed">
                      {collection.description}
                    </p>

                    {/* Explore Link */}
                    <a
                      href={collection.url}
                      className="inline-flex items-center space-x-2 text-white hover:text-amber-400 transition-colors duration-300 group/link"
                    >
                      <span className="font-medium">Explore Collection</span>
                      <ArrowRight className="w-4 h-4 transform group-hover/link:translate-x-2 transition-transform duration-300" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Benefits Section */}
      <section
        ref={(el) => {
          sectionRefs.current["benefits"] = el as HTMLDivElement | null;
        }}
        className="py-20 px-4 bg-gradient-to-r from-amber-50/50 via-white to-amber-50/50"
      >
        <div className="max-w-7xl mx-auto">
          <h2
            className={`text-3xl md:text-4xl font-serif font-bold text-center mb-12 text-gray-800 ${
              isInView["benefits"] ? "animate-fadeInUp" : "opacity-0"
            }`}
          >
            The Boutique Experience
          </h2>

          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {premiumBenefits.map((benefit, index) => (
              <div
                key={benefit.title}
                className={`group ${
                  isInView["benefits"] ? "animate-fadeInUp" : "opacity-0"
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-full p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-amber-100 hover:border-amber-300 transition-all duration-300 hover:shadow-xl">
                  {/* Gradient Border Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-400/10 to-yellow-400/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Icon with Float Animation */}
                  <div
                    className="relative mb-4 text-amber-600 animate-float"
                    style={{ animationDelay: `${index * 0.5}s` }}
                  >
                    {getIcon(benefit.icon)}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-serif font-semibold text-gray-800 mb-2">
                    {benefit.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Horizontal Scroll */}
          <div
            className="md:hidden overflow-x-auto pb-4"
            ref={benefitsScrollRef}
          >
            <div className="flex space-x-4" style={{ width: "max-content" }}>
              {premiumBenefits.map((benefit, index) => (
                <div key={benefit.title} className="w-72 flex-shrink-0">
                  <div className="relative h-full p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-amber-100">
                    <div className="mb-4 text-amber-600">
                      {getIcon(benefit.icon)}
                    </div>
                    <h3 className="text-lg font-serif font-semibold text-gray-800 mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      {testimonials.length > 0 && (
        <section
          ref={(el) => {
            sectionRefs.current["testimonials"] = el as HTMLDivElement | null;
          }}
          className="py-20 px-4"
        >
          <div className="max-w-4xl mx-auto">
            <h2
              className={`text-3xl md:text-4xl font-serif font-bold text-center mb-12 text-gray-800 ${
                isInView["testimonials"] ? "animate-fadeInUp" : "opacity-0"
              }`}
            >
              What Our Connoisseurs Say
            </h2>

            <div
              className="relative"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {/* Testimonial Card */}
              <div
                className={`bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 md:p-12 border border-amber-100 ${
                  isInView["testimonials"] ? "animate-fadeInUp" : "opacity-0"
                }`}
              >
                {/* Quote Icon */}
                <Quote className="w-10 h-10 text-amber-400 mb-6 opacity-50" />

                {/* Rating Stars */}
                <div className="flex justify-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < testimonials[currentTestimonial].rating
                          ? "text-amber-400 fill-amber-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-gray-700 text-lg md:text-xl italic text-center mb-6 leading-relaxed min-h-[100px] transition-opacity duration-500">
                  "{testimonials[currentTestimonial].text}"
                </p>

                {/* Author & Product */}
                <div className="text-center">
                  <p className="font-semibold text-gray-800">
                    {testimonials[currentTestimonial].author}
                  </p>
                  <p className="text-sm text-amber-600">
                    Purchased: {testimonials[currentTestimonial].product}
                  </p>
                </div>
              </div>

              {/* Navigation Arrows */}
              {testimonials.length > 1 && (
                <>
                  <button
                    onClick={prevTestimonial}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 md:-translate-x-16 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-amber-600 hover:bg-amber-50 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextTestimonial}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 md:translate-x-16 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-amber-600 hover:bg-amber-50 transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Navigation Dots */}
              {testimonials.length > 1 && (
                <div className="flex justify-center space-x-2 mt-8">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        currentTestimonial === index
                          ? "w-8 bg-gradient-to-r from-amber-400 to-yellow-400"
                          : "bg-amber-200 hover:bg-amber-300"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Instagram Gallery */}
      {instagramFeed.length > 0 && (
        <section
          ref={(el) => {
            sectionRefs.current["instagram"] = el as HTMLDivElement | null;
          }}
          className="py-20 px-4 bg-gradient-to-b from-white to-amber-50/30"
        >
          <div className="max-w-7xl mx-auto">
            <h2
              className={`text-3xl md:text-4xl font-serif font-bold text-center mb-4 text-gray-800 ${
                isInView["instagram"] ? "animate-fadeInUp" : "opacity-0"
              }`}
            >
              Follow Our Chocolate Journey
            </h2>
            <p
              className={`text-center text-gray-600 mb-12 ${
                isInView["instagram"]
                  ? "animate-fadeInUp animation-delay-200"
                  : "opacity-0"
              }`}
            >
              @luxurychocolateboutique
            </p>

            {/* Masonry Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {instagramFeed.slice(0, 6).map((image, index) => (
                <a
                  key={index}
                  href={`https://instagram.com/p/${index}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative overflow-hidden rounded-xl ${
                    index % 3 === 1 ? "row-span-2" : ""
                  } ${
                    isInView["instagram"] ? "animate-fadeInUp" : "opacity-0"
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <img
                    src={image}
                    alt={`Instagram post ${index + 1}`}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Instagram className="w-12 h-12 text-white" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

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

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default ShopPreview;
