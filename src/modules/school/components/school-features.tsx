"use client";
import React from "react";
import { motion } from "motion/react";
import { Users, Award, BookOpen, Clock, Briefcase, GraduationCap, Sparkles, ArrowRight, Star } from "lucide-react";

// Mock data for demonstration
const schoolContent = {
  title: "Why Choose",
  titleAccent: "Our Academy",
  subtitle: "Excellence in chocolate education, crafted for your success",
  features: [
    {
      id: 1,
      icon: "users",
      title: "Expert Instructors",
      description: "Learn from world-renowned chocolatiers with decades of experience in luxury chocolate craftsmanship.",
      accentColor: "#D4A574",
      gridClass: "col-span-1 lg:col-span-1 row-span-1",
      stats: "15+ Years Experience",
      highlight: "World Champions"
    },
    {
      id: 2,
      icon: "award",
      title: "Certified Programs",
      description: "Internationally recognized certifications that open doors to prestigious opportunities worldwide.",
      accentColor: "#E8B4B8",
      gridClass: "col-span-1 lg:col-span-1 row-span-1",
      stats: "100% Accredited",
      highlight: "Global Recognition"
    },
    {
      id: 3,
      icon: "book",
      title: "Comprehensive Curriculum",
      description: "From bean-to-bar fundamentals to advanced tempering techniques and artistic presentations. Master every aspect of chocolate artistry through hands-on training in our state-of-the-art facilities.",
      accentColor: "#A67B5B",
      gridClass: "col-span-1 lg:col-span-1 row-span-1 lg:row-span-2",
      stats: "50+ Techniques",
      highlight: "Complete Mastery",
      featured: true
    },
    {
      id: 4,
      icon: "clock",
      title: "Flexible Scheduling",
      description: "Choose from intensive workshops, evening classes, or extended masterclass programs tailored to your lifestyle.",
      accentColor: "#F4A460",
      gridClass: "col-span-1 lg:col-span-1 row-span-1",
      stats: "7 Days a Week",
      highlight: "Your Schedule"
    },
    {
      id: 5,
      icon: "briefcase",
      title: "Industry Connections",
      description: "Direct pathways to top chocolatiers, luxury hotels, and artisan chocolate houses globally.",
      accentColor: "#CD853F",
      gridClass: "col-span-1 lg:col-span-1 row-span-1",
      stats: "500+ Partners",
      highlight: "Career Network"
    }
  ],
  premiumFeature: {
    id: 6,
    icon: "graduation-cap",
    title: "Lifetime Learning Community",
    description: "Join an exclusive network of chocolate artisans. Access ongoing masterclasses, industry updates, and collaborate with professionals worldwide.",
    buttonText: "Join Our Community",
    href: "/academy/apply",
    gridClass: "col-span-1 md:col-span-2 lg:col-span-3 row-span-1",
    benefits: [
      "Alumni Masterclasses",
      "Industry Updates",
      "Global Network",
      "Career Support"
    ]
  }
};

type Feature = {
  id: number;
  icon: string;
  title: string;
  description: string;
  accentColor: string;
  gridClass: string;
  stats?: string;
  highlight?: string;
  featured?: boolean;
};

interface FeatureCardProps {
  feature: Feature;
  index: number;
}

const FeatureCard = ({ feature, index }: FeatureCardProps) => {
  // Map icon names to components
  const getIcon = (iconName: string) => {
    const icons: Record<string, React.ReactNode> = {
      users: <Users className="w-5 h-5 sm:w-6 sm:h-6" />,
      award: <Award className="w-5 h-5 sm:w-6 sm:h-6" />,
      book: <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />,
      clock: <Clock className="w-5 h-5 sm:w-6 sm:h-6" />,
      briefcase: <Briefcase className="w-5 h-5 sm:w-6 sm:h-6" />,
      "graduation-cap": <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6" />,
    };
    return icons[iconName] || <Award className="w-5 h-5 sm:w-6 sm:h-6" />;
  };

  return (
    <motion.div
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
        transition: { 
          duration: 0.3, 
          ease: "easeOut" 
        } 
      }}
      className={`group relative overflow-hidden rounded-2xl sm:rounded-3xl lg:rounded-[36px] shadow-2xl hover:shadow-3xl transition-all duration-500 ${feature.gridClass} min-h-[300px] sm:min-h-[340px]`}
      style={{
        background: `linear-gradient(135deg, #451C15 0%, #5A2419 100%)`,
      }}
    >
      {/* Premium Gradient Overlay */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700"
        style={{
          background: `linear-gradient(135deg, ${feature.accentColor}40 0%, transparent 40%, ${feature.accentColor}30 100%)`,
        }}
      />

      {/* Animated Glow Effect */}
      <motion.div 
        className="absolute -top-32 -right-32 w-64 h-64 rounded-full opacity-0 group-hover:opacity-30 transition-all duration-1000 blur-3xl"
        style={{ 
          background: `radial-gradient(circle, ${feature.accentColor} 0%, transparent 60%)` 
        }}
        animate={{
          scale: [1, 1.5, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Top Badges */}
      <div className="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 z-30 flex justify-between items-start">
        {feature.stats && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 + 0.4, duration: 0.5 }}
          >
            <span 
              className="text-[10px] sm:text-xs font-medium px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/10 backdrop-blur-md text-white/80 uppercase tracking-wider border border-white/10"
            >
              {feature.stats}
            </span>
          </motion.div>
        )}

        {/* Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ 
            delay: index * 0.1 + 0.3, 
            duration: 0.6, 
            type: "spring",
            stiffness: 200
          }}
          whileHover={{ 
            scale: 1.15, 
            rotate: 15,
            transition: { duration: 0.2 }
          }}
        >
          <div
            className="p-3 sm:p-3.5 rounded-2xl bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md group-hover:from-white/25 group-hover:to-white/10 transition-all duration-300 border border-white/10"
            style={{
              boxShadow: `0 8px 32px ${feature.accentColor}40`,
            }}
          >
            <div className="text-white/90 group-hover:text-white transition-colors duration-300">
              {getIcon(feature.icon)}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative z-20 p-6 sm:p-8 lg:p-10 h-full flex flex-col justify-between pt-20 sm:pt-24">
        <div>
          {/* Highlight Text */}
          {feature.highlight && (
            <motion.p
              className="text-[10px] sm:text-xs uppercase tracking-[0.2em] mb-3 font-medium"
              style={{ color: feature.accentColor }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 + 0.15, duration: 0.5 }}
            >
              {feature.highlight}
            </motion.p>
          )}
          
          <motion.h3
            className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-extralight text-white mb-4 sm:mb-6 leading-tight tracking-tight"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 + 0.2, duration: 0.6 }}
          >
            {feature.title}
          </motion.h3>
          <motion.p
            className="text-xs sm:text-sm lg:text-base text-white/60 leading-relaxed font-light"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 + 0.3, duration: 0.6 }}
          >
            {feature.description}
          </motion.p>
        </div>

        {/* Bottom Elements */}
        <motion.div
          className="mt-6 sm:mt-8 flex items-center justify-between"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 + 0.4, duration: 0.6 }}
        >
          <div 
            className="h-[1px] w-12 sm:w-16 bg-gradient-to-r group-hover:w-20 sm:group-hover:w-24 transition-all duration-500"
            style={{
              backgroundImage: `linear-gradient(to right, ${feature.accentColor}80, transparent)`,
            }}
          />
          {feature.featured && (
            <Star className="w-4 h-4 text-white/20 group-hover:text-white/40 transition-colors duration-300" />
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

const PremiumFeatureCard = ({ feature }: { feature: typeof schoolContent.premiumFeature }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ delay: 0.5, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -15, transition: { duration: 0.3 } }}
      className={`group relative overflow-hidden rounded-2xl sm:rounded-3xl lg:rounded-[36px] shadow-3xl hover:shadow-4xl ${feature.gridClass} min-h-[380px] sm:min-h-[420px] lg:min-h-[400px]`}
      style={{
        background: "linear-gradient(135deg, #F8F5F0 0%, #FFF9F5 50%, #FFFBF7 100%)",
      }}
    >
      {/* Premium gradient overlay */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          background: "linear-gradient(135deg, transparent 0%, #D4A57410 100%)",
        }} />
      </div>

      {/* Animated decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-32 -right-32 w-64 sm:w-96 h-64 sm:h-96 rounded-full"
          style={{
            background: "radial-gradient(circle, #D4A57415 0%, transparent 60%)",
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, -30, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-32 -left-32 w-72 sm:w-[400px] h-72 sm:h-[400px] rounded-full"
          style={{
            background: "radial-gradient(circle, #A67B5B10 0%, transparent 60%)",
          }}
          animate={{
            y: [0, 40, 0],
            x: [0, 30, 0],
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative h-full flex flex-col lg:flex-row items-center justify-between p-10 sm:p-14 lg:p-16 xl:p-20 gap-8 lg:gap-12">
        {/* Content */}
        <div className="flex-1 z-10 max-w-full lg:max-w-3xl text-center lg:text-left">
          <motion.div
            className="inline-flex items-center gap-3 mb-6 sm:mb-8"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <div className="p-3 sm:p-4 rounded-2xl bg-gradient-to-br from-[#451C15]/10 to-[#451C15]/5 backdrop-blur-sm border border-[#451C15]/10">
              <GraduationCap className="w-7 h-7 sm:w-8 sm:h-8 text-[#451C15]" />
            </div>
            <span className="text-xs sm:text-sm lg:text-base font-medium text-[#451C15]/60 uppercase tracking-[0.15em]">
              Exclusive Network
            </span>
          </motion.div>

          <motion.h3
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extralight text-[#451C15] mb-6 sm:mb-8 leading-[1.1] tracking-tight"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            {feature.title}
          </motion.h3>
          <motion.p
            className="text-base sm:text-lg lg:text-xl xl:text-2xl text-[#451C15]/60 leading-relaxed font-light mb-8 sm:mb-10"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            {feature.description}
          </motion.p>

          {/* Benefits Grid */}
          <motion.div
            className="grid grid-cols-2 gap-3 sm:gap-4 mb-8 sm:mb-10 max-w-md mx-auto lg:mx-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.85, duration: 0.6 }}
          >
            {feature.benefits.map((benefit, idx) => (
              <div key={idx} className="flex items-center gap-2 text-sm sm:text-base text-[#451C15]/70">
                <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-[#D4A574] to-[#A67B5B]" />
                <span className="font-light">{benefit}</span>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="flex justify-center lg:justify-start"
          >
            <a href={feature.href}>
              <button
                className="bg-gradient-to-r from-[#451C15] to-[#5A2419] text-white hover:from-[#5A2419] hover:to-[#451C15] hover:scale-105 active:scale-100 transition-all duration-300 rounded-full px-10 sm:px-12 py-4 sm:py-5 text-base sm:text-lg lg:text-xl shadow-2xl hover:shadow-3xl group/btn relative overflow-hidden"
                style={{
                  boxShadow: "0 15px 40px rgba(69, 28, 21, 0.35)",
                }}
              >
                {/* Button shimmer */}
                <div className="absolute inset-0 -top-4 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-1000" />
                
                <span className="relative z-10 inline-flex items-center font-light tracking-wide">
                  {feature.buttonText}
                  <ArrowRight className="ml-3 sm:ml-4 w-5 h-5 sm:w-6 sm:h-6 group-hover/btn:translate-x-2 transition-transform duration-300" />
                </span>
              </button>
            </a>
          </motion.div>
        </div>

        {/* Premium Visual Element */}
        <motion.div
          className="relative hidden lg:block"
          initial={{ opacity: 0, scale: 0.7, rotate: -20 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{
            delay: 1,
            duration: 1,
            type: "spring",
            stiffness: 80,
          }}
        >
          <div className="relative w-56 h-56 xl:w-72 xl:h-72">
            {/* Outer rotating ring */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-dashed border-[#D4A574]/20"
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            />
            {/* Middle rotating ring */}
            <motion.div
              className="absolute inset-6 rounded-full border border-[#A67B5B]/15"
              animate={{ rotate: -360 }}
              transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            />
            {/* Inner glow */}
            <motion.div
              className="absolute inset-12 rounded-full"
              style={{
                background: "radial-gradient(circle, #D4A57420 0%, transparent 70%)",
              }}
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            />
            {/* Center icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles className="w-24 h-24 xl:w-28 xl:h-28 text-[#451C15]/15" />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export const SchoolFeatures: React.FC = () => {
  return (
    <section className="w-full py-16 sm:py-20 lg:py-24 xl:py-32 relative bg-gradient-to-b from-[#FBFAF8] to-[#FFF9F5]">
      {/* Premium background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-0 w-[600px] h-[600px] rounded-full blur-3xl opacity-[0.02]"
          style={{
            background: "radial-gradient(circle, #D4A574 0%, transparent 60%)",
          }}
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-0 w-[800px] h-[800px] rounded-full blur-3xl opacity-[0.02]"
          style={{
            background: "radial-gradient(circle, #A67B5B 0%, transparent 60%)",
          }}
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="px-4 sm:px-6 lg:px-8 max-w-[91.666667%] mx-auto relative z-10">
        {/* Section Header with decorative elements */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-16 sm:mb-20 lg:mb-24 text-center lg:text-left"
        >
          {/* Decorative line above title */}
          <motion.div 
            className="w-20 h-[1px] bg-gradient-to-r from-transparent via-[#D4A574] to-transparent mx-auto lg:mx-0 mb-8"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
          />
          
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extralight mb-4 sm:mb-6 font-serif leading-[0.95] tracking-tight" style={{ color: "#451C15" }}>
            {schoolContent.title}
            <span className="block sm:inline sm:ml-4 italic font-thin text-transparent bg-clip-text bg-gradient-to-r from-[#A67B5B] to-[#D4A574]">
              {schoolContent.titleAccent}
            </span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-[#451C15]/50 font-extralight max-w-3xl mx-auto lg:mx-0 leading-relaxed">
            {schoolContent.subtitle}
          </p>
        </motion.div>

        {/* Responsive Bento Grid with better spacing */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 auto-rows-auto lg:auto-rows-[340px]">
          <FeatureCard feature={schoolContent.features[0]} index={0} />
          <FeatureCard feature={schoolContent.features[1]} index={1} />
          <FeatureCard feature={schoolContent.features[2]} index={2} />
          <FeatureCard feature={schoolContent.features[3]} index={3} />
          <FeatureCard feature={schoolContent.features[4]} index={4} />
          <PremiumFeatureCard feature={schoolContent.premiumFeature} />
        </div>
      </div>
    </section>
  );
};