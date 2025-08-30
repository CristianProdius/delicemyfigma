// src/modules/blog/components/blog-post-content.tsx
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Users,
  ChefHat,
  Star,
  Heart,
  BookOpen,
  AlertCircle,
  Info,
  CheckCircle,
  XCircle,
  Lightbulb,
  ExternalLink,
  Copy,
  Check,
  Play,
  Pause,
  Volume2,
  ShoppingBag,
  Mail,
  ArrowRight,
  Sparkles,
  Coffee,
  Utensils,
  Timer,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface BlogPostContentProps {
  content: string;
  className?: string;
}

// Typography Component
const Typography = ({
  children,
  variant = "paragraph",
}: {
  children: React.ReactNode;
  variant?: "h1" | "h2" | "h3" | "h4" | "paragraph" | "lead";
}) => {
  const styles = {
    h1: "text-4xl lg:text-5xl font-light text-[#451C15] mb-8 [font-family:var(--font-playfair)]",
    h2: "text-3xl lg:text-4xl font-light text-[#451C15] mb-6 mt-12 [font-family:var(--font-playfair)]",
    h3: "text-2xl lg:text-3xl font-normal text-[#451C15] mb-4 mt-8 [font-family:var(--font-playfair)]",
    h4: "text-xl lg:text-2xl font-medium text-[#451C15] mb-3 mt-6 [font-family:var(--font-inter)]",
    paragraph:
      "text-base lg:text-lg text-[#451C15]/80 leading-relaxed mb-6 [font-family:var(--font-inter)]",
    lead: "text-lg lg:text-xl text-[#451C15]/90 leading-relaxed font-light mb-8 [font-family:var(--font-inter)]",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className={styles[variant]}
    >
      {children}
    </motion.div>
  );
};

// Blockquote Component
const Blockquote = ({
  children,
  author,
  source,
}: {
  children: React.ReactNode;
  author?: string;
  source?: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="my-10 relative"
    >
      <div className="absolute -left-4 top-0 text-6xl lg:text-8xl text-[#D4A574]/20 [font-family:var(--font-playfair)]">
        "
      </div>
      <blockquote className="relative z-10 pl-12 border-l-4 border-[#D4A574]">
        <p className="text-xl lg:text-2xl font-normal italic text-[#451C15] leading-relaxed mb-3 [font-family:var(--font-playfair)]">
          {children}
        </p>
        {(author || source) && (
          <footer className="text-base text-[#451C15]/60 [font-family:var(--font-inter)]">
            {author && <span>— {author}</span>}
            {source && <span className="ml-2 italic">({source})</span>}
          </footer>
        )}
      </blockquote>
    </motion.div>
  );
};

// Code Block Component
const CodeBlock = ({
  code,
  language = "javascript",
  title,
}: {
  code: string;
  language?: string;
  title?: string;
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="my-8 rounded-2xl overflow-hidden bg-[#1E1E1E] shadow-xl"
    >
      {title && (
        <div className="px-4 py-3 bg-[#2D2D2D] border-b border-white/10 flex items-center justify-between">
          <span className="text-sm text-white/70 [font-family:var(--font-inter)]">
            {title}
          </span>
          <span className="text-xs text-white/50 [font-family:var(--font-inter)]">
            {language}
          </span>
        </div>
      )}
      <div className="relative">
        <pre className="p-6 overflow-x-auto">
          <code className="text-sm text-white/90 [font-family:'Monaco',monospace]">
            {code}
          </code>
        </pre>
        <button
          onClick={handleCopy}
          className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-400" />
          ) : (
            <Copy className="w-4 h-4 text-white/70" />
          )}
        </button>
      </div>
    </motion.div>
  );
};

// Image Gallery Component
const ImageGallery = ({
  images,
  title,
}: {
  images: Array<{ src: string; alt: string; caption?: string }>;
  title?: string;
}) => {
  const [activeImage, setActiveImage] = useState(0);

  const nextImage = () => setActiveImage((prev) => (prev + 1) % images.length);
  const prevImage = () =>
    setActiveImage((prev) => (prev - 1 + images.length) % images.length);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="my-12"
    >
      {title && (
        <h4 className="text-lg font-medium text-[#451C15] mb-4 text-center [font-family:var(--font-inter)]">
          {title}
        </h4>
      )}

      <div className="relative rounded-2xl overflow-hidden shadow-2xl">
        {/* Main Image */}
        <div className="relative h-[400px] lg:h-[500px] bg-[#F8F5F0]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeImage}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="relative w-full h-full"
            >
              <Image
                src={images[activeImage].src}
                alt={images[activeImage].alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              />
              {images[activeImage].caption && (
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                  <p className="text-white text-sm [font-family:var(--font-inter)]">
                    {images[activeImage].caption}
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 rounded-full shadow-lg hover:bg-white transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-[#451C15]" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 rounded-full shadow-lg hover:bg-white transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-[#451C15]" />
            </button>

            {/* Thumbnails */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all",
                    index === activeImage
                      ? "w-8 bg-white"
                      : "bg-white/50 hover:bg-white/70"
                  )}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
};

// Recipe Card Component
const RecipeCard = ({
  recipe,
}: {
  recipe: {
    title: string;
    description: string;
    servings: number;
    prepTime: string;
    cookTime: string;
    difficulty: "Easy" | "Medium" | "Hard";
    ingredients: string[];
    instructions: string[];
    tips?: string[];
    image?: string;
  };
}) => {
  const [showInstructions, setShowInstructions] = useState(false);

  const getDifficultyColor = () => {
    switch (recipe.difficulty) {
      case "Easy":
        return "#95A99C";
      case "Medium":
        return "#D4A574";
      case "Hard":
        return "#E8B4B8";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="my-12 bg-gradient-to-br from-white to-[#FFF9F5] rounded-3xl shadow-xl overflow-hidden border border-[#451C15]/10"
    >
      {/* Header */}
      <div className="relative p-8 bg-gradient-to-r from-[#451C15] to-[#5A241C]">
        <div className="absolute top-4 right-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <ChefHat className="w-8 h-8 text-white/20" />
          </motion.div>
        </div>

        <h3 className="text-2xl lg:text-3xl font-light text-white mb-2 [font-family:var(--font-playfair)]">
          {recipe.title}
        </h3>
        <p className="text-white/80 [font-family:var(--font-inter)]">
          {recipe.description}
        </p>

        {/* Meta Info */}
        <div className="flex flex-wrap gap-4 mt-6">
          <div className="flex items-center gap-2 text-white/70 text-sm">
            <Users className="w-4 h-4" />
            <span>{recipe.servings} servings</span>
          </div>
          <div className="flex items-center gap-2 text-white/70 text-sm">
            <Clock className="w-4 h-4" />
            <span>Prep: {recipe.prepTime}</span>
          </div>
          <div className="flex items-center gap-2 text-white/70 text-sm">
            <Timer className="w-4 h-4" />
            <span>Cook: {recipe.cookTime}</span>
          </div>
          <div
            className="px-3 py-1 rounded-full text-xs font-medium"
            style={{
              backgroundColor: `${getDifficultyColor()}30`,
              color: getDifficultyColor(),
            }}
          >
            {recipe.difficulty}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Ingredients */}
          <div>
            <h4 className="text-xl font-medium text-[#451C15] mb-4 flex items-center gap-2 [font-family:var(--font-inter)]">
              <Utensils className="w-5 h-5 text-[#D4A574]" />
              Ingredients
            </h4>
            <ul className="space-y-2">
              {recipe.ingredients.map((ingredient, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3 group"
                >
                  <CheckCircle className="w-4 h-4 text-[#95A99C] mt-1 flex-shrink-0" />
                  <span className="text-[#451C15]/80 [font-family:var(--font-inter)]">
                    {ingredient}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Instructions Toggle */}
          <div>
            <button
              onClick={() => setShowInstructions(!showInstructions)}
              className="w-full text-left"
            >
              <h4 className="text-xl font-medium text-[#451C15] mb-4 flex items-center justify-between [font-family:var(--font-inter)]">
                <span className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-[#D4A574]" />
                  Instructions
                </span>
                <motion.div
                  animate={{ rotate: showInstructions ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronLeft className="w-5 h-5 rotate-[-90deg]" />
                </motion.div>
              </h4>
            </button>

            <AnimatePresence>
              {showInstructions && (
                <motion.ol
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-3 overflow-hidden"
                >
                  {recipe.instructions.map((instruction, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex gap-3"
                    >
                      <span className="flex-shrink-0 w-7 h-7 bg-[#D4A574]/20 text-[#D4A574] rounded-full flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </span>
                      <span className="text-[#451C15]/80 [font-family:var(--font-inter)]">
                        {instruction}
                      </span>
                    </motion.li>
                  ))}
                </motion.ol>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Tips */}
        {recipe.tips && recipe.tips.length > 0 && (
          <div className="mt-8 p-6 bg-[#D4A574]/10 rounded-2xl">
            <h4 className="text-lg font-medium text-[#451C15] mb-3 flex items-center gap-2 [font-family:var(--font-inter)]">
              <Lightbulb className="w-5 h-5 text-[#D4A574]" />
              Pro Tips
            </h4>
            <ul className="space-y-2">
              {recipe.tips.map((tip, index) => (
                <li
                  key={index}
                  className="text-sm text-[#451C15]/70 [font-family:var(--font-inter)]"
                >
                  • {tip}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </motion.div>
  );
};

// Call-out Box Component
const CalloutBox = ({
  type = "info",
  title,
  children,
}: {
  type?: "info" | "warning" | "success" | "error" | "tip";
  title?: string;
  children: React.ReactNode;
}) => {
  const config = {
    info: {
      icon: Info,
      bgColor: "#95A99C",
      borderColor: "#95A99C",
    },
    warning: {
      icon: AlertCircle,
      bgColor: "#D4A574",
      borderColor: "#D4A574",
    },
    success: {
      icon: CheckCircle,
      bgColor: "#95A99C",
      borderColor: "#95A99C",
    },
    error: {
      icon: XCircle,
      bgColor: "#E8B4B8",
      borderColor: "#E8B4B8",
    },
    tip: {
      icon: Lightbulb,
      bgColor: "#B8B2D8",
      borderColor: "#B8B2D8",
    },
  };

  const { icon: Icon, bgColor, borderColor } = config[type];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="my-8 rounded-2xl overflow-hidden"
      style={{
        backgroundColor: `${bgColor}10`,
        borderColor: `${borderColor}40`,
        borderWidth: "1px",
        borderStyle: "solid",
      }}
    >
      <div className="p-6">
        <div className="flex gap-4">
          <div
            className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: `${bgColor}20` }}
          >
            <Icon className="w-5 h-5" style={{ color: bgColor }} />
          </div>
          <div className="flex-1">
            {title && (
              <h4 className="text-lg font-medium text-[#451C15] mb-2 [font-family:var(--font-inter)]">
                {title}
              </h4>
            )}
            <div className="text-[#451C15]/80 [font-family:var(--font-inter)]">
              {children}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Inline Newsletter Signup
const InlineNewsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = () => {
    if (!email) return;
    // Handle newsletter signup
    setIsSubscribed(true);
    setTimeout(() => {
      setIsSubscribed(false);
      setEmail("");
    }, 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="my-12 p-8 bg-gradient-to-br from-[#451C15] to-[#5A241C] rounded-3xl shadow-xl"
    >
      <div className="text-center mb-6">
        <Sparkles className="w-10 h-10 text-white/80 mx-auto mb-3" />
        <h3 className="text-2xl font-light text-white mb-2 [font-family:var(--font-playfair)]">
          Love This Recipe?
        </h3>
        <p className="text-white/80 [font-family:var(--font-inter)]">
          Get weekly chocolate recipes and tips delivered to your inbox
        </p>
      </div>

      <AnimatePresence mode="wait">
        {!isSubscribed ? (
          <div className="max-w-md mx-auto">
            <div className="flex gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-white placeholder-white/60 focus:outline-none focus:border-white/50 [font-family:var(--font-inter)]"
              />
              <Button
                onClick={handleSubmit}
                className="px-6 py-3 bg-white text-[#451C15] hover:bg-[#F8F5F0] rounded-full transition-colors"
              >
                Subscribe
              </Button>
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center justify-center gap-3 text-white"
          >
            <CheckCircle className="w-6 h-6 text-green-400" />
            <span className="text-lg [font-family:var(--font-inter)]">
              Welcome to our chocolate family!
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Product Link Card
const ProductLink = ({
  product,
}: {
  product: {
    name: string;
    description: string;
    price: string;
    image: string;
    shopUrl: string;
    badge?: string;
  };
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="my-8"
    >
      <Link href={product.shopUrl} target="_blank">
        <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-[#451C15]/10">
          <div className="flex flex-col sm:flex-row">
            {/* Image */}
            <div className="relative w-full sm:w-48 h-48 flex-shrink-0">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                sizes="200px"
              />
              {product.badge && (
                <div className="absolute top-3 left-3 px-2 py-1 bg-[#D4A574] text-white text-xs font-medium rounded-full">
                  {product.badge}
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 p-6 flex flex-col justify-between">
              <div>
                <h4 className="text-xl font-medium text-[#451C15] mb-2 group-hover:text-[#D4A574] transition-colors [font-family:var(--font-playfair)]">
                  {product.name}
                </h4>
                <p className="text-[#451C15]/70 text-sm mb-3 [font-family:var(--font-inter)]">
                  {product.description}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-2xl font-light text-[#D4A574] [font-family:var(--font-playfair)]">
                  {product.price}
                </span>
                <div className="flex items-center gap-2 text-[#451C15] group-hover:text-[#D4A574] transition-colors">
                  <ShoppingBag className="w-5 h-5" />
                  <span className="text-sm font-medium [font-family:var(--font-inter)]">
                    Shop Now
                  </span>
                  <ExternalLink className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

// Main BlogPostContent Component
export const BlogPostContent = ({
  content,
  className,
}: BlogPostContentProps) => {
  // Parse and render content blocks
  // This is a simplified example - in production, you'd parse markdown/HTML

  return (
    <div className={cn("prose prose-lg max-w-none", className)}>
      {/* Example content structure - replace with actual parsed content */}

      <Typography variant="lead">
        Welcome to our comprehensive guide on mastering the art of chocolate
        tempering. This technique is essential for creating professional-quality
        chocolates with that perfect snap and glossy finish.
      </Typography>

      <Typography variant="paragraph">
        Chocolate tempering might seem intimidating at first, but with the right
        knowledge and practice, you'll be creating stunning chocolates that
        rival those from the finest chocolatiers in the world.
      </Typography>

      <Blockquote author="Olesea Stamatin" source="Master Class 2024">
        The secret to perfect chocolate isn't just in the quality of the beans,
        but in the patience and precision of the tempering process.
      </Blockquote>

      <Typography variant="h2">Understanding the Science</Typography>

      <Typography variant="paragraph">
        Before we dive into the practical techniques, it's crucial to understand
        what happens at a molecular level during tempering. Cocoa butter can
        crystallize in six different forms, but only one gives us the desired
        properties.
      </Typography>

      <CalloutBox type="info" title="Did You Know?">
        Properly tempered chocolate can be stored at room temperature for months
        without losing its shine or developing bloom. This is why professional
        chocolates don't need refrigeration!
      </CalloutBox>

      <Typography variant="h3">Essential Equipment</Typography>

      <Typography variant="paragraph">
        While you can temper chocolate with just a bowl and thermometer, having
        the right tools makes the process much more reliable and enjoyable.
      </Typography>

      <ImageGallery
        title="Professional Chocolate Making Setup"
        images={[
          {
            src: "/images/blog/tempering-setup.jpg",
            alt: "Complete tempering setup",
            caption: "A professional chocolate tempering station",
          },
          {
            src: "/images/blog/thermometer.jpg",
            alt: "Digital thermometer",
            caption: "Precision temperature control is crucial",
          },
          {
            src: "/images/blog/marble-slab.jpg",
            alt: "Marble slab for tabling",
            caption: "Traditional tabling method on marble",
          },
        ]}
      />

      <Typography variant="h2">Step-by-Step Tempering Guide</Typography>

      <RecipeCard
        recipe={{
          title: "Classic Dark Chocolate Tempering",
          description:
            "Master the traditional seeding method for perfect tempered chocolate",
          servings: 1,
          prepTime: "10 mins",
          cookTime: "30 mins",
          difficulty: "Medium",
          ingredients: [
            "500g high-quality dark chocolate (70% cocoa)",
            "Digital thermometer",
            "Double boiler or microwave",
            "Rubber spatula",
            "Clean, dry bowls",
            "Parchment paper for testing",
          ],
          instructions: [
            "Chop 400g of chocolate into small, uniform pieces. Reserve 100g for seeding.",
            "Melt the 400g chocolate to 45-50°C (113-122°F) for dark chocolate.",
            "Remove from heat and add the reserved chocolate gradually.",
            "Stir continuously until temperature drops to 28°C (82°F).",
            "Reheat gently to 31-32°C (88-90°F) - your working temperature.",
            "Test temper by spreading a small amount on parchment. It should set within 3-5 minutes with a glossy finish.",
            "Maintain working temperature while using the chocolate.",
          ],
          tips: [
            "Keep all equipment completely dry - even a drop of water can cause chocolate to seize",
            "Work in a cool room (18-20°C) for best results",
            "If chocolate goes out of temper, simply remelt and start again",
          ],
        }}
      />

      <Typography variant="h3">Common Problems and Solutions</Typography>

      <CalloutBox type="warning" title="Troubleshooting">
        If your chocolate has white streaks or spots (bloom), it's likely out of
        temper. This is purely cosmetic and the chocolate is still safe to eat,
        but you'll need to re-temper for professional results.
      </CalloutBox>

      <Typography variant="paragraph">
        Let's explore the most common issues chocolatiers face and how to solve
        them effectively. Understanding these problems will save you time and
        ingredients.
      </Typography>

      <CodeBlock
        title="Temperature Guidelines"
        language="text"
        code={`Dark Chocolate (70%+):
  Melting: 45-50°C (113-122°F)
  Cooling: 27-28°C (80-82°F)
  Working: 31-32°C (88-90°F)

Milk Chocolate:
  Melting: 40-45°C (104-113°F)
  Cooling: 26-27°C (79-80°F)
  Working: 29-30°C (84-86°F)

White Chocolate:
  Melting: 40-45°C (104-113°F)
  Cooling: 25-26°C (77-79°F)
  Working: 28-29°C (82-84°F)`}
      />

      <Typography variant="h2">Advanced Techniques</Typography>

      <Typography variant="paragraph">
        Once you've mastered basic tempering, you can explore advanced
        techniques like creating colored cocoa butter decorations, working with
        inclusions, and developing your own signature chocolate blends.
      </Typography>

      <ProductLink
        product={{
          name: "Professional Tempering Kit",
          description:
            "Everything you need to start tempering chocolate like a pro",
          price: "$149",
          image: "/images/products/tempering-kit.jpg",
          shopUrl: "/shop/tempering-kit",
          badge: "Bestseller",
        }}
      />

      <Typography variant="h3">Creating Your First Bonbons</Typography>

      <Typography variant="paragraph">
        With properly tempered chocolate, you're ready to create professional
        bonbons. The key is maintaining temperature throughout the process and
        working efficiently.
      </Typography>

      <CalloutBox type="tip" title="Pro Tip">
        Pre-warm your molds to about 26°C before use. This prevents the
        chocolate from setting too quickly and ensures even coating.
      </CalloutBox>

      <InlineNewsletter />

      <Typography variant="h2">Storing Tempered Chocolate</Typography>

      <Typography variant="paragraph">
        Proper storage is crucial for maintaining the quality of your tempered
        chocolate. Store in a cool, dry place away from strong odors and
        temperature fluctuations.
      </Typography>

      <CalloutBox type="success" title="Success!">
        Congratulations on completing this comprehensive guide! With practice,
        tempering will become second nature, and you'll be creating
        professional-quality chocolates that impress everyone.
      </CalloutBox>

      <Typography variant="paragraph">
        Remember, chocolate making is both an art and a science. Don't be
        discouraged if your first attempts aren't perfect. Every master
        chocolatier started exactly where you are now.
      </Typography>

      <Blockquote>
        Practice makes perfect, but chocolate makes everything better along the
        way.
      </Blockquote>
    </div>
  );
};

export default BlogPostContent;
