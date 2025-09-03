"use client";

import React from "react";
import { motion } from "motion/react";
import { Users, ArrowRight, Star, Calendar, GraduationCap } from "lucide-react";

// Mock data for demonstration
const schoolContent = {
  courses: [
    {
      id: "1",
      title: "Bean to Bar Mastery",
      level: "Professional",
      description: "Master the complete chocolate-making process from sourcing premium cacao beans to crafting exquisite bars with signature flavor profiles.",
      duration: "12 weeks",
      maxStudents: 8,
      price: "$4,800",
      featured: true,
      intensity: "Full-time",
      accentColor: "#D4A574"
    },
    {
      id: "2",
      title: "Artisan Truffle Creation",
      level: "Advanced",
      description: "Discover the secrets of creating luxurious truffles with perfect ganache centers and innovative flavor combinations.",
      duration: "6 weeks",
      maxStudents: 10,
      price: "$2,400",
      intensity: "Part-time",
      accentColor: "#E8B4B8"
    },
    {
      id: "3",
      title: "Chocolate Tempering Fundamentals",
      level: "Beginner",
      description: "Learn the essential techniques of tempering chocolate to achieve perfect shine, snap, and stability in your creations.",
      duration: "2 weeks",
      maxStudents: 12,
      price: "$800",
      intensity: "Weekend",
      accentColor: "#A67B5B"
    },
    {
      id: "4",
      title: "Sculptural Chocolate Art",
      level: "Intermediate",
      description: "Transform chocolate into stunning edible sculptures and decorative pieces using advanced molding and carving techniques.",
      duration: "4 weeks",
      maxStudents: 10,
      price: "$1,600",
      intensity: "Evening",
      accentColor: "#F4A460"
    }
  ],
  comingSoonBadge: false,
  externalUrl: "https://chocolateacademy.com"
};

type Course = {
  id: string;
  title: string;
  level: string;
  description: string;
  duration: string;
  maxStudents: number;
  price: string;
  featured?: boolean;
  intensity: string;
  accentColor: string;
};

interface CourseCardProps {
  course: Course;
  index: number;
}

const CourseCard = ({ course, index }: CourseCardProps) => {
  const handleCourseClick = () => {
    if (schoolContent.comingSoonBadge) {
      document.getElementById("school-cta")?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.open(`${schoolContent.externalUrl}/courses/${course.id}`, "_blank");
    }
  };

  const getLevelGradient = (level: string) => {
    const gradients = {
      Beginner: "from-emerald-400/20 to-emerald-600/20",
      Intermediate: "from-blue-400/20 to-blue-600/20",
      Advanced: "from-purple-400/20 to-purple-600/20",
      Professional: "from-amber-400/20 to-amber-600/20",
    };
    return gradients[level as keyof typeof gradients] || gradients.Beginner;
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
      onClick={handleCourseClick}
      className="group relative cursor-pointer h-full"
    >
      <div
        className="relative h-full overflow-hidden rounded-2xl sm:rounded-3xl lg:rounded-[36px] shadow-2xl hover:shadow-3xl transition-all duration-500"
        style={{
          background: `linear-gradient(135deg, #451C15 0%, #5A2419 100%)`,
        }}
      >
        {/* Premium Gradient Overlay */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700"
          style={{
            background: `linear-gradient(135deg, ${course.accentColor}40 0%, transparent 40%, ${course.accentColor}30 100%)`,
          }}
        />

        {/* Animated Corner Glow */}
        <motion.div 
          className="absolute -top-32 -right-32 w-64 h-64 rounded-full opacity-0 group-hover:opacity-30 transition-all duration-1000 blur-3xl"
          style={{ 
            background: `radial-gradient(circle, ${course.accentColor} 0%, transparent 60%)` 
          }}
        />

        {/* Featured Badge */}
        {course.featured && (
          <motion.div
            className="absolute top-4 sm:top-6 left-4 sm:left-6 z-30"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-amber-400/20 to-amber-600/20 backdrop-blur-md text-amber-200 text-[10px] sm:text-xs font-medium uppercase tracking-wider border border-amber-400/20">
              <Star className="w-3 h-3 fill-current" />
              Featured
            </span>
          </motion.div>
        )}

        {/* Level Badge */}
        <motion.div
          className="absolute top-4 sm:top-6 right-4 sm:right-6 z-30"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 + 0.4, duration: 0.5, type: "spring" }}
        >
          <span className={`inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r ${getLevelGradient(course.level)} backdrop-blur-md text-white/80 text-[10px] sm:text-xs font-medium border border-white/10`}>
            {course.level}
          </span>
        </motion.div>

        {/* Content */}
        <div className="relative z-20 p-6 sm:p-8 lg:p-10 h-full flex flex-col pt-20 sm:pt-24">
          {/* Title */}
          <motion.h3
            className="text-2xl sm:text-3xl lg:text-4xl font-extralight text-white mb-4 sm:mb-6 leading-tight tracking-tight"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 + 0.2, duration: 0.6 }}
          >
            {course.title}
          </motion.h3>

          {/* Description */}
          <motion.p
            className="text-sm sm:text-base text-white/60 leading-relaxed font-light mb-6 sm:mb-8 flex-grow"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 + 0.3, duration: 0.6 }}
          >
            {course.description}
          </motion.p>

          {/* Meta Info */}
          <div className="space-y-4 mb-6 sm:mb-8">
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="flex items-center gap-2 text-white/50">
                <Calendar className="w-4 h-4" />
                {course.duration}
              </span>
              <span className="text-white/50">{course.intensity}</span>
            </div>
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="flex items-center gap-2 text-white/50">
                <Users className="w-4 h-4" />
                Max {course.maxStudents} students
              </span>
              <span className="text-white/50">Hands-on</span>
            </div>
          </div>

          {/* Divider */}
          <div className="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6 sm:mb-8" />

          {/* Price & CTA */}
          <div className="flex items-end justify-between">
            <div>
              <span className="text-[10px] sm:text-xs text-white/40 block mb-1">Starting from</span>
              <span className="text-2xl sm:text-3xl lg:text-4xl font-extralight text-transparent bg-clip-text bg-gradient-to-r from-white to-amber-200">
                {course.price}
              </span>
            </div>
            <motion.span 
              className="inline-flex items-center gap-2 text-amber-200 text-sm sm:text-base font-light group/arrow"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Enroll
              <ArrowRight className="w-4 h-4 transition-transform group-hover/arrow:translate-x-1" />
            </motion.span>
          </div>
        </div>

        {/* Bottom Corner Accent */}
        <div
          className="absolute -bottom-16 -left-16 w-32 h-32 sm:w-40 sm:h-40 opacity-20 group-hover:opacity-30 blur-2xl transition-all duration-700 pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${course.accentColor} 0%, transparent 60%)`,
          }}
        />
      </div>
    </motion.div>
  );
};

export const SchoolCourses: React.FC = () => {
  const courses = schoolContent.courses.slice(0, 4);

  return (
    <section 
      id="school-courses" 
      className="relative py-16 sm:py-20 lg:py-24 xl:py-32 overflow-hidden bg-gradient-to-b from-[#FFF9F5] via-[#FBFAF8] to-[#F9F7F4]"
    >
      {/* Premium background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(196, 153, 108, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(196, 153, 108, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
        
        {/* Animated orbs */}
        <motion.div 
          className="absolute top-1/4 -left-32 w-96 h-96 bg-gradient-to-br from-amber-200/10 to-transparent rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 -right-32 w-80 h-80 bg-gradient-to-tl from-amber-100/10 to-transparent rounded-full blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="px-4 sm:px-6 lg:px-8 max-w-[91.666667%] mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16 sm:mb-20 lg:mb-24"
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
            className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-amber-100/80 to-amber-50/50 mb-8 shadow-lg"
          >
            <GraduationCap className="w-7 h-7 sm:w-8 sm:h-8 text-amber-700" />
          </motion.div>

          {/* Title */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extralight font-serif leading-[0.95] tracking-tight text-[#451C15] mb-6">
            Featured
            <span className="block sm:inline sm:ml-4 italic font-thin text-transparent bg-clip-text bg-gradient-to-r from-[#A67B5B] to-[#D4A574]">
              Courses
            </span>
          </h2>
          
          <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-[#451C15]/50 max-w-3xl mx-auto leading-relaxed font-extralight">
            From beginner to professional, find the perfect course to match your chocolate ambitions
          </p>
        </motion.div>

        {/* Courses Grid - Bento Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 mb-16 sm:mb-20">
          {courses.map((course, index) => (
            <CourseCard key={course.id} course={course} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          {/* Decorative line */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 200 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="h-[1px] bg-gradient-to-r from-transparent via-[#D4A574] to-transparent mx-auto mb-10"
          />
          
          {!schoolContent.comingSoonBadge ? (
            <motion.a
              href={schoolContent.externalUrl}
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
              
              <span className="relative z-10">View All Courses</span>
              <ArrowRight className="relative z-10 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </motion.a>
          ) : (
            <motion.button
              onClick={() => document.getElementById("school-cta")?.scrollIntoView({ behavior: "smooth" })}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-3 px-10 sm:px-12 py-4 sm:py-5 bg-gradient-to-r from-[#451C15] to-[#5A2419] text-white hover:from-[#5A2419] hover:to-[#451C15] rounded-full transition-all duration-300 group shadow-2xl hover:shadow-3xl text-base sm:text-lg lg:text-xl font-light relative overflow-hidden"
              style={{
                boxShadow: "0 15px 40px rgba(69, 28, 21, 0.35)",
              }}
            >
              {/* Button shimmer */}
              <div className="absolute inset-0 -top-4 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
              
              <span className="relative z-10">Join Waitlist for Full Access</span>
              <ArrowRight className="relative z-10 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </motion.button>
          )}
        </motion.div>
      </div>
    </section>
  );
};