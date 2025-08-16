"use client";

import React, { useEffect, useRef, useState } from "react";
import { ShoppingBag, Award, Star, Sparkles } from "lucide-react";

interface ShopHeroProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaUrl: string;
  secondaryCtaText: string;
  onSecondaryClick: () => void;
  specialOffer?: string;
  trustBadges: Array<string>;
  backgroundImage: string;
}

const ShopHero: React.FC<ShopHeroProps> = ({
  title,
  subtitle,
  ctaText,
  ctaUrl,
  secondaryCtaText,
  onSecondaryClick,
  specialOffer,
  trustBadges,
  backgroundImage,
}) => {
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mouse move effect for floating elements
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left - rect.width / 2) / rect.width,
          y: (e.clientY - rect.top - rect.height / 2) / rect.height,
        });
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Generate particles for animation
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    animationDelay: Math.random() * 10,
    size: Math.random() * 4 + 2,
  }));

  // Generate floating chocolate pieces
  const chocolatePieces = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    animationDelay: Math.random() * 15,
    size: Math.random() * 30 + 20,
    rotation: Math.random() * 360,
  }));

  return (
    <div
      ref={heroRef}
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-amber-950 via-amber-900 to-amber-950"
    >
      {/* Parallax Background Image */}
      <div
        className="absolute inset-0 w-full h-[120%]"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            filter: "brightness(0.4)",
          }}
        />

        {/* Bokeh Lights Overlay */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-64 h-64 bg-yellow-400 rounded-full filter blur-[100px] animate-pulse" />
          <div className="absolute top-40 right-20 w-96 h-96 bg-amber-300 rounded-full filter blur-[120px] animate-pulse delay-300" />
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-orange-400 rounded-full filter blur-[110px] animate-pulse delay-700" />
        </div>
      </div>

      {/* Floating Chocolate Pieces */}
      {chocolatePieces.map((piece) => (
        <div
          key={piece.id}
          className="absolute opacity-20 pointer-events-none"
          style={{
            left: `${piece.left}%`,
            animation: `floatUp 15s infinite`,
            animationDelay: `${piece.animationDelay}s`,
            transform: `translateX(${mousePosition.x * 20}px) translateY(${
              mousePosition.y * 20
            }px) rotate(${piece.rotation}deg)`,
          }}
        >
          <div
            className="bg-gradient-to-br from-amber-700 to-amber-900 rounded-lg shadow-2xl"
            style={{
              width: `${piece.size}px`,
              height: `${piece.size}px`,
            }}
          />
        </div>
      ))}

      {/* Gold Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-br from-yellow-300 to-yellow-600 opacity-60 pointer-events-none animate-fall"
          style={{
            left: `${particle.left}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDelay: `${particle.animationDelay}s`,
            boxShadow: "0 0 10px rgba(255, 215, 0, 0.5)",
          }}
        />
      ))}

      {/* Glassmorphism Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 backdrop-blur-[2px]" />

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-20">
        {/* Luxury Cat Mascot */}
        <div
          className="absolute top-10 right-10 md:top-20 md:right-20 w-32 md:w-40 opacity-90"
          style={{
            transform: `translateX(${mousePosition.x * 10}px) translateY(${
              mousePosition.y * 10
            }px)`,
          }}
        >
          <div className="relative">
            {/* Cat with monocle and top hat */}
            <div className="text-8xl md:text-9xl filter drop-shadow-2xl">
              🐱
            </div>
            <div className="absolute top-0 right-0 text-4xl animate-bounce">
              🎩
            </div>
            <div className="absolute top-8 left-2 text-2xl">🧐</div>
            {/* Sparkles around cat */}
            <Sparkles className="absolute -top-2 -left-2 w-4 h-4 text-yellow-400 animate-pulse" />
            <Sparkles className="absolute -bottom-2 -right-2 w-4 h-4 text-yellow-400 animate-pulse delay-300" />
          </div>
        </div>

        {/* Special Offer Card */}
        {specialOffer && (
          <div className="absolute top-10 left-10 md:top-20 md:left-20 animate-float">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-amber-400 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
              <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 md:p-6 shadow-2xl">
                <div className="flex items-center space-x-2 mb-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span className="text-xs font-semibold text-yellow-400 uppercase tracking-wider">
                    Limited Offer
                  </span>
                </div>
                <p className="text-white text-sm md:text-base font-medium max-w-xs">
                  {specialOffer}
                </p>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                  <span className="text-white text-xs font-bold">HOT</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Trust Badges */}
        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          {trustBadges.map((badge, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 flex items-center space-x-2 hover:bg-white/20 transition-all duration-300 hover:scale-105"
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <Award className="w-4 h-4 text-yellow-400" />
              <span className="text-white text-xs md:text-sm font-medium">
                {badge}
              </span>
            </div>
          ))}
        </div>

        {/* Main Title with Gold Gradient */}
        <h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-center mb-6 font-serif animate-fadeInUp"
          style={{
            background:
              "linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FFD700 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            textShadow: "0 0 80px rgba(255, 215, 0, 0.5)",
            letterSpacing: "0.02em",
          }}
        >
          {title}
        </h1>

        {/* Subtitle */}
        <p
          className="text-xl md:text-2xl lg:text-3xl text-white/90 text-center mb-12 font-serif animate-fadeInUp animation-delay-200 max-w-3xl"
          style={{
            letterSpacing: "0.05em",
          }}
        >
          {subtitle}
        </p>

        {/* Decorative Chocolate Swirls */}
        <div className="absolute left-0 top-1/3 opacity-20">
          <svg
            width="200"
            height="200"
            viewBox="0 0 200 200"
            className="animate-spin-slow"
          >
            <path
              d="M50,100 Q100,50 150,100 T250,100"
              stroke="url(#goldGradient)"
              strokeWidth="3"
              fill="none"
            />
            <defs>
              <linearGradient id="goldGradient">
                <stop offset="0%" stopColor="#FFD700" />
                <stop offset="100%" stopColor="#FFA500" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 animate-fadeInUp animation-delay-400">
          {/* Primary CTA */}
          <a
            href={ctaUrl}
            className="group relative overflow-hidden rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 p-[2px] hover:scale-105 transition-all duration-300"
          >
            <div className="relative flex items-center space-x-3 bg-black/80 backdrop-blur-sm rounded-full px-8 py-4 group-hover:bg-transparent transition-all duration-300">
              <ShoppingBag className="w-5 h-5 text-white group-hover:rotate-12 transition-transform duration-300" />
              <span className="text-white font-semibold text-lg">
                {ctaText}
              </span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-amber-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300" />
          </a>

          {/* Secondary CTA */}
          <button
            onClick={onSecondaryClick}
            className="group relative overflow-hidden rounded-full border-2 border-white/30 px-8 py-4 backdrop-blur-sm hover:border-white/50 hover:bg-white/10 transition-all duration-300"
          >
            <span className="relative text-white font-semibold text-lg">
              {secondaryCtaText}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          </button>
        </div>

        {/* Gold Leaf Accents */}
        <div className="absolute bottom-10 right-10 opacity-30 animate-float animation-delay-500">
          <svg width="100" height="100" viewBox="0 0 100 100">
            <path
              d="M50,10 Q70,30 50,50 Q30,30 50,10"
              fill="url(#leafGradient)"
            />
            <defs>
              <linearGradient
                id="leafGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#FFD700" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#FFA500" stopOpacity="0.4" />
              </linearGradient>
            </defs>
          </svg>
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

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }

        @keyframes floatUp {
          0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.2;
          }
          90% {
            opacity: 0.2;
          }
          100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes fall {
          0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.6;
          }
          90% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 1s ease-out forwards;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-fall {
          animation: fall 10s linear infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
        }

        .animation-delay-500 {
          animation-delay: 0.5s;
        }

        .delay-300 {
          animation-delay: 0.3s;
        }

        .delay-700 {
          animation-delay: 0.7s;
        }
      `}</style>
    </div>
  );
};

export default ShopHero;
