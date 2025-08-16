"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  ExternalLink,
  Shield,
  Lock,
  Award,
  Sparkles,
  CheckCircle,
  Timer,
  ArrowRight,
} from "lucide-react";

interface ShopRedirectCTAProps {
  headline: string;
  subtext: string;
  buttonText: string;
  externalUrl: string;
  paymentMethods: string[];
  securityBadges: string[];
  isComingSoon: boolean;
  onNewsletterSubmit?: (email: string) => void;
}

const ShopRedirectCTA: React.FC<ShopRedirectCTAProps> = ({
  headline,
  subtext,
  buttonText,
  externalUrl,
  paymentMethods,
  securityBadges,
  isComingSoon,
  onNewsletterSubmit,
}) => {
  const [email, setEmail] = useState("");
  const [scrollY, setScrollY] = useState(0);
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Countdown timer for coming soon
  useEffect(() => {
    if (isComingSoon) {
      // Set launch date (example: 30 days from now)
      const launchDate = new Date();
      launchDate.setDate(launchDate.getDate() + 30);

      const timer = setInterval(() => {
        const now = new Date().getTime();
        const distance = launchDate.getTime() - now;

        if (distance > 0) {
          setCountdown({
            days: Math.floor(distance / (1000 * 60 * 60 * 24)),
            hours: Math.floor(
              (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            ),
            minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((distance % (1000 * 60)) / 1000),
          });
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isComingSoon]);

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
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left - rect.width / 2) / rect.width,
          y: (e.clientY - rect.top - rect.height / 2) / rect.height,
        });
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Handle newsletter submission
  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email && onNewsletterSubmit) {
      setIsSubmitting(true);
      await onNewsletterSubmit(email);
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setEmail("");
      setTimeout(() => setSubmitSuccess(false), 3000);
    }
  };

  // Payment method icons
  const getPaymentIcon = (method: string) => {
    switch (method.toLowerCase()) {
      case "visa":
        return "💳";
      case "mastercard":
        return "💳";
      case "amex":
        return "💳";
      case "paypal":
        return "💰";
      default:
        return "💳";
    }
  };

  // Security badge icons
  const getSecurityIcon = (badge: string) => {
    if (badge.includes("Encryption")) return <Lock className="w-4 h-4" />;
    if (badge.includes("Trusted")) return <Award className="w-4 h-4" />;
    if (badge.includes("Secure")) return <Shield className="w-4 h-4" />;
    return <CheckCircle className="w-4 h-4" />;
  };

  // Generate floating particles
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    animationDelay: Math.random() * 10,
    size: Math.random() * 4 + 2,
  }));

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[600px] overflow-hidden"
    >
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-950 via-amber-900 to-yellow-900 animate-gradient-shift">
        {/* Overlay Pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 1px)`,
            backgroundSize: "30px 30px",
          }}
        />
      </div>

      {/* Floating Chocolate Images */}
      <div
        className="absolute left-10 top-20 w-32 h-32 opacity-20 pointer-events-none"
        style={{
          transform: `translateX(${mousePosition.x * 20}px) translateY(${
            mousePosition.y * 20
          }px) translateY(${scrollY * 0.1}px)`,
        }}
      >
        <div className="w-full h-full bg-gradient-to-br from-amber-700 to-amber-900 rounded-lg shadow-2xl transform rotate-12" />
      </div>
      <div
        className="absolute right-10 bottom-20 w-40 h-40 opacity-20 pointer-events-none"
        style={{
          transform: `translateX(${mousePosition.x * -20}px) translateY(${
            mousePosition.y * -20
          }px) translateY(${scrollY * 0.1}px)`,
        }}
      >
        <div className="w-full h-full bg-gradient-to-br from-amber-800 to-amber-950 rounded-lg shadow-2xl transform -rotate-12" />
      </div>

      {/* Gold Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-br from-yellow-300 to-yellow-600 opacity-40 pointer-events-none animate-float-up"
          style={{
            left: `${particle.left}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDelay: `${particle.animationDelay}s`,
            boxShadow: "0 0 10px rgba(255, 215, 0, 0.5)",
          }}
        />
      ))}

      {/* Main Content */}
      <div className="relative z-10 px-4 py-20">
        <div className="max-w-4xl mx-auto">
          {/* Glass Container */}
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl">
            {isComingSoon ? (
              /* Coming Soon State */
              <div className="text-center">
                {/* Animated Clock Icon */}
                <div className="mb-6 flex justify-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center animate-pulse">
                    <Timer className="w-10 h-10 text-white" />
                  </div>
                </div>

                {/* Coming Soon Headline */}
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
                  Boutique Opening Soon
                </h2>
                <p className="text-xl text-white/90 mb-8">
                  Our exclusive chocolate boutique is preparing something
                  extraordinary for you
                </p>

                {/* Countdown Timer */}
                <div className="flex justify-center gap-4 mb-12">
                  {Object.entries(countdown).map(([unit, value]) => (
                    <div key={unit} className="text-center">
                      <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                        <div className="text-3xl md:text-4xl font-bold text-amber-400">
                          {value.toString().padStart(2, "0")}
                        </div>
                        <div className="text-xs text-white/80 uppercase tracking-wider mt-1">
                          {unit}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* VIP Early Access Signup */}
                <div className="bg-black/20 rounded-2xl p-6">
                  <h3 className="text-xl font-serif text-white mb-2">
                    Join Our VIP List
                  </h3>
                  <p className="text-white/80 mb-4">
                    Be the first to know when we open & receive exclusive early
                    access
                  </p>
                  <form
                    onSubmit={handleNewsletterSubmit}
                    className="flex flex-col md:flex-row gap-3 max-w-md mx-auto"
                  >
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="flex-1 px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-white placeholder-white/60 focus:outline-none focus:border-amber-400 transition-colors"
                      required
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-semibold rounded-full hover:scale-105 transition-transform duration-300 disabled:opacity-50"
                    >
                      {isSubmitting ? "Joining..." : "Get Early Access"}
                    </button>
                  </form>
                  {submitSuccess && (
                    <p className="text-green-400 text-sm mt-3">
                      Welcome to our VIP list! 🎉
                    </p>
                  )}
                </div>
              </div>
            ) : (
              /* Regular State */
              <>
                {/* Headline */}
                <h2 className="text-4xl md:text-6xl font-serif font-bold text-center mb-6 text-white leading-tight">
                  {headline}
                </h2>

                {/* Subtext */}
                <p className="text-xl md:text-2xl text-center text-white/90 mb-10 font-serif">
                  {subtext}
                </p>

                {/* Primary CTA Button */}
                <div className="flex justify-center mb-12">
                  <a
                    href={externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-flex items-center space-x-3 px-10 py-5 bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-full shadow-2xl hover:scale-105 transform transition-all duration-300 animate-pulse-glow"
                  >
                    <span className="text-xl font-bold tracking-wide">
                      {buttonText}
                    </span>
                    <ArrowRight className="w-6 h-6 transform group-hover:translate-x-2 transition-transform duration-300" />
                    <ExternalLink className="w-4 h-4 opacity-70" />
                  </a>
                </div>

                {/* Trust Indicators */}
                <div className="space-y-6">
                  {/* Payment Methods */}
                  <div className="flex flex-wrap justify-center gap-3">
                    {paymentMethods.map((method) => (
                      <div
                        key={method}
                        className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center space-x-2"
                      >
                        <span className="text-lg">
                          {getPaymentIcon(method)}
                        </span>
                        <span className="text-white text-sm font-medium">
                          {method}
                        </span>
                      </div>
                    ))}
                    <div className="px-4 py-2 bg-green-500/20 backdrop-blur-sm border border-green-400/30 rounded-full flex items-center space-x-2">
                      <Lock className="w-4 h-4 text-green-400" />
                      <span className="text-green-400 text-sm font-medium">
                        Secure Checkout
                      </span>
                    </div>
                  </div>

                  {/* Security Badges */}
                  <div className="flex flex-wrap justify-center gap-3">
                    {securityBadges.map((badge) => (
                      <div
                        key={badge}
                        className="px-3 py-1.5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full flex items-center space-x-1.5"
                      >
                        <span className="text-amber-400">
                          {getSecurityIcon(badge)}
                        </span>
                        <span className="text-white/80 text-xs font-medium">
                          {badge}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Newsletter Section */}
                {onNewsletterSubmit && (
                  <div className="mt-12 pt-12 border-t border-white/20">
                    <h3 className="text-2xl font-serif text-white text-center mb-3">
                      Join Our Exclusive List
                    </h3>
                    <p className="text-white/80 text-center mb-6">
                      First access to limited editions • Special member pricing
                      • Chocolate masterclass invitations
                    </p>
                    <form
                      onSubmit={handleNewsletterSubmit}
                      className="max-w-md mx-auto"
                    >
                      <div className="relative">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email for VIP access"
                          className="w-full px-6 py-4 pr-32 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white placeholder-white/60 focus:outline-none focus:border-amber-400 transition-colors"
                          required
                        />
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-semibold rounded-full hover:scale-105 transition-transform duration-300 disabled:opacity-50"
                        >
                          {isSubmitting ? "..." : "Join"}
                        </button>
                      </div>
                      {submitSuccess && (
                        <p className="text-green-400 text-sm text-center mt-3">
                          Welcome to our exclusive list! ✨
                        </p>
                      )}
                      <p className="text-white/60 text-xs text-center mt-3">
                        <Lock className="w-3 h-3 inline mr-1" />
                        Your privacy is protected. Unsubscribe anytime.
                      </p>
                    </form>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2">
            <Sparkles className="w-8 h-8 text-yellow-400 opacity-50 animate-pulse" />
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes gradient-shift {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes float-up {
          0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.4;
          }
          90% {
            opacity: 0.4;
          }
          100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes pulse-glow {
          0%,
          100% {
            box-shadow: 0 0 20px rgba(251, 191, 36, 0.5),
              0 0 40px rgba(251, 191, 36, 0.3);
          }
          50% {
            box-shadow: 0 0 30px rgba(251, 191, 36, 0.7),
              0 0 60px rgba(251, 191, 36, 0.4);
          }
        }

        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 10s ease infinite;
        }

        .animate-float-up {
          animation: float-up 15s linear infinite;
        }

        .animate-pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default ShopRedirectCTA;
