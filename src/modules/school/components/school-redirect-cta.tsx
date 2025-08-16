"use client";

import React, { useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import {
  ArrowRight,
  ExternalLink,
  Mail,
  CheckCircle,
  Star,
  TrendingUp,
  Users,
  Award,
  Clock,
  Sparkles,
  ChefHat,
  Send,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface CTAStat {
  id: string;
  label: string;
  value: string | number;
  icon?: React.ReactNode;
}

export interface SchoolRedirectCTAProps {
  headline: string;
  subtext: string;
  buttonText: string;
  externalUrl: string;
  stats?: CTAStat[];
  isComingSoon?: boolean;
  onEmailSubmit?: (email: string) => void;
  className?: string;
  variant?: "default" | "premium" | "minimal";
}

// Floating chocolate piece decoration
const FloatingChocolate: React.FC<{
  position: { top?: string; bottom?: string; left?: string; right?: string };
  delay?: number;
  size?: "small" | "medium" | "large";
}> = ({ position, delay = 0, size = "medium" }) => {
  const sizes = {
    small: "w-6 h-6",
    medium: "w-10 h-10",
    large: "w-14 h-14",
  };

  return (
    <motion.div
      className={cn(
        "absolute rounded-lg shadow-xl",
        sizes[size],
        "bg-gradient-to-br from-amber-600 to-amber-800"
      )}
      style={position}
      animate={{
        y: [0, -30, 0],
        rotate: [0, 180, 360],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    >
      {/* Chocolate square pattern */}
      <div className="grid grid-cols-2 gap-0.5 p-0.5 h-full">
        <div className="bg-black/20 rounded-sm" />
        <div className="bg-black/20 rounded-sm" />
        <div className="bg-black/20 rounded-sm" />
        <div className="bg-black/20 rounded-sm" />
      </div>
    </motion.div>
  );
};

// Email signup form for coming soon state
const EmailSignupForm: React.FC<{
  onSubmit: (email: string) => void;
}> = ({ onSubmit }) => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    onSubmit(email);
    setIsSubmitted(true);
    setIsSubmitting(false);
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center gap-3 text-white"
      >
        <CheckCircle className="w-6 h-6 text-green-400" />
        <span className="text-lg">
          Thank you! We'll notify you when we launch.
        </span>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email for updates"
            required
            className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md text-white placeholder-white/60 rounded-full border-2 border-white/30 focus:border-white/60 focus:outline-none transition-colors"
          />
        </div>
        <motion.button
          type="submit"
          disabled={isSubmitting}
          className="px-8 py-4 bg-white text-amber-900 font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isSubmitting ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Send className="w-5 h-5" />
            </motion.div>
          ) : (
            <span className="flex items-center gap-2">
              Notify Me
              <Send className="w-4 h-4" />
            </span>
          )}
        </motion.button>
      </div>
    </form>
  );
};

// Stats display component
const StatsDisplay: React.FC<{ stats: CTAStat[] }> = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="text-center"
        >
          {stat.icon && (
            <div className="flex justify-center mb-2">
              <motion.div
                className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                {stat.icon}
              </motion.div>
            </div>
          )}
          <div className="text-2xl md:text-3xl font-bold text-white mb-1">
            {stat.value}
          </div>
          <div className="text-sm text-white/80">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  );
};

export const SchoolRedirectCTA: React.FC<SchoolRedirectCTAProps> = ({
  headline,
  subtext,
  buttonText,
  externalUrl,
  stats = [],
  isComingSoon = false,
  onEmailSubmit,
  className,
  variant = "default",
}) => {
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 500], [0, -30]);

  // Default stats if none provided
  const defaultStats: CTAStat[] =
    stats.length > 0
      ? stats
      : [
          {
            id: "stat-1",
            label: "Students Enrolled",
            value: "500+",
            icon: <Users className="w-5 h-5 text-white" />,
          },
          {
            id: "stat-2",
            label: "Success Rate",
            value: "95%",
            icon: <TrendingUp className="w-5 h-5 text-white" />,
          },
          {
            id: "stat-3",
            label: "Expert Instructors",
            value: "12",
            icon: <Award className="w-5 h-5 text-white" />,
          },
          {
            id: "stat-4",
            label: "Years Experience",
            value: "10+",
            icon: <Clock className="w-5 h-5 text-white" />,
          },
        ];

  const getVariantClasses = () => {
    switch (variant) {
      case "premium":
        return "bg-gradient-to-br from-amber-900 via-amber-800 to-amber-900";
      case "minimal":
        return "bg-gradient-to-r from-amber-700 to-amber-800";
      default:
        return "bg-gradient-to-br from-amber-800 via-amber-700 to-amber-800";
    }
  };

  return (
    <section className={cn("relative overflow-hidden", className)}>
      {/* Background with gradient */}
      <div className={cn("relative", getVariantClasses())}>
        {/* Animated background pattern */}
        <motion.div
          className="absolute inset-0 opacity-10"
          style={{ y: parallaxY }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </motion.div>

        {/* Floating chocolate decorations */}
        {variant !== "minimal" && (
          <>
            <FloatingChocolate
              position={{ top: "10%", left: "5%" }}
              delay={0}
              size="small"
            />
            <FloatingChocolate
              position={{ top: "20%", right: "10%" }}
              delay={2}
              size="medium"
            />
            <FloatingChocolate
              position={{ bottom: "20%", left: "8%" }}
              delay={1}
              size="small"
            />
            <FloatingChocolate
              position={{ bottom: "15%", right: "5%" }}
              delay={3}
              size="large"
            />
          </>
        )}

        {/* Main content */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            {/* Coming Soon Badge */}
            {isComingSoon && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-amber-500 text-white rounded-full shadow-lg"
              >
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-semibold">Coming Soon</span>
                <Sparkles className="w-4 h-4" />
              </motion.div>
            )}

            {/* Headline */}
            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {headline}
            </motion.h2>

            {/* Subtext */}
            <motion.p
              className="text-lg md:text-xl text-white/90 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {subtext}
            </motion.p>

            {/* Stats Display */}
            {stats.length > 0 && (
              <div className="mb-12">
                <StatsDisplay stats={defaultStats} />
              </div>
            )}

            {/* CTA Button or Email Signup */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex justify-center"
            >
              {isComingSoon && onEmailSubmit ? (
                <EmailSignupForm onSubmit={onEmailSubmit} />
              ) : (
                <motion.a
                  href={externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center gap-3 px-10 py-5 bg-white text-amber-900 font-bold text-lg rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10">{buttonText}</span>

                  {/* Animated arrow */}
                  <motion.div
                    className="relative z-10 flex items-center gap-1"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-6 h-6" />
                    <ExternalLink className="w-4 h-4 opacity-60" />
                  </motion.div>

                  {/* Button background animation */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-amber-300 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={false}
                  />
                </motion.a>
              )}
            </motion.div>

            {/* Trust signals */}
            <motion.div
              className="mt-8 flex flex-wrap justify-center items-center gap-6 text-white/80 text-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Certified Programs
              </span>
              <span className="flex items-center gap-2">
                <Star className="w-4 h-4" />
                5-Star Reviews
              </span>
              <span className="flex items-center gap-2">
                <Award className="w-4 h-4" />
                Industry Recognized
              </span>
            </motion.div>

            {/* Decorative element */}
            {variant === "premium" && (
              <motion.div
                className="mt-12 flex justify-center items-center gap-2 text-white/60"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <ChefHat className="w-5 h-5" />
                <span className="text-sm">
                  Start Your Chocolate Journey Today
                </span>
                <ChefHat className="w-5 h-5" />
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Decorative wave at bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 100"
            className="w-full h-auto"
            preserveAspectRatio="none"
          >
            <path
              d="M0,50 C360,100 1080,0 1440,50 L1440,100 L0,100 Z"
              fill="white"
              fillOpacity="0.1"
            />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default SchoolRedirectCTA;
