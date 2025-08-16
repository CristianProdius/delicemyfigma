"use client";

import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import {
  Clock,
  Users,
  Award,
  ArrowRight,
  Calendar,
  BookOpen,
  ExternalLink,
  ChevronRight,
  GraduationCap,
  Star,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface Course {
  id: string;
  title: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Professional";
  description: string;
  duration: string;
  classSize: number;
  image: string;
  instructor?: string;
  price?: string;
  rating?: number;
  enrolledCount?: number;
}

export interface Stat {
  id: string;
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: "up" | "down" | "stable";
}

export interface SchoolPreviewProps {
  courses: Course[];
  stats: Stat[];
  onCourseClick: (courseId: string) => void;
  showAllCoursesUrl: string;
  title?: string;
  subtitle?: string;
  className?: string;
}

// Level badge component
const LevelBadge: React.FC<{ level: Course["level"] }> = ({ level }) => {
  const levelColors = {
    Beginner: "bg-green-100 text-green-800 border-green-200",
    Intermediate: "bg-blue-100 text-blue-800 border-blue-200",
    Advanced: "bg-purple-100 text-purple-800 border-purple-200",
    Professional: "bg-amber-100 text-amber-800 border-amber-200",
  };

  const levelIcons = {
    Beginner: <Star className="w-3 h-3" />,
    Intermediate: <Star className="w-3 h-3 fill-current" />,
    Advanced: <Award className="w-3 h-3" />,
    Professional: <GraduationCap className="w-3 h-3" />,
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full border",
        levelColors[level]
      )}
    >
      {levelIcons[level]}
      {level}
    </span>
  );
};

// Course card component
const CourseCard: React.FC<{
  course: Course;
  index: number;
  onCourseClick: (courseId: string) => void;
}> = ({ course, index, onCourseClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut" as const,
      }}
    >
      <motion.div
        className="group relative bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer h-full"
        whileHover={{ y: -8, transition: { duration: 0.3 } }}
        onClick={() => onCourseClick(course.id)}
      >
        {/* Course Image */}
        <div className="relative h-48 sm:h-56 overflow-hidden bg-gradient-to-br from-amber-100 to-amber-200">
          <motion.img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6 }}
          />

          {/* Overlay gradient on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Level badge */}
          <div className="absolute top-4 left-4">
            <LevelBadge level={course.level} />
          </div>

          {/* Rating if available */}
          {course.rating && (
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span className="text-sm font-medium">{course.rating}</span>
            </div>
          )}
        </div>

        {/* Card Content */}
        <div className="p-6 flex flex-col h-full">
          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors duration-300">
            {course.title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 mb-4 line-clamp-2 flex-grow">
            {course.description}
          </p>

          {/* Course Meta */}
          <div className="space-y-3 mb-4">
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {course.duration}
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                Max {course.classSize} students
              </span>
            </div>

            {course.instructor && (
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <BookOpen className="w-4 h-4" />
                <span>Instructor: {course.instructor}</span>
              </div>
            )}
          </div>

          {/* Price and CTA */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            {course.price && (
              <span className="text-2xl font-bold text-amber-600">
                {course.price}
              </span>
            )}

            <motion.button
              className="inline-flex items-center gap-2 text-amber-600 font-semibold group/btn"
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Learn More</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
            </motion.button>
          </div>

          {/* Hover effect border */}
          <motion.div
            className="absolute inset-0 border-2 border-amber-500 rounded-2xl opacity-0"
            initial={false}
            animate={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            style={{ pointerEvents: "none" }}
          />
        </div>

        {/* Enrolled count badge if available */}
        {course.enrolledCount && course.enrolledCount > 0 && (
          <div className="absolute bottom-6 right-6 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
            {course.enrolledCount} enrolled
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

// Stats bar component
const StatsBar: React.FC<{ stats: Stat[] }> = ({ stats }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-2xl p-8 shadow-lg"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: 0.3 + index * 0.1,
              type: "spring",
              stiffness: 200,
            }}
            className="text-center"
          >
            <div className="flex justify-center mb-2">
              {stat.icon && (
                <div className="w-10 h-10 bg-amber-200 rounded-full flex items-center justify-center">
                  {stat.icon}
                </div>
              )}
            </div>
            <motion.div
              className="text-3xl md:text-4xl font-bold text-amber-900 mb-1"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
            >
              {stat.value}
              {stat.trend && (
                <span
                  className={cn(
                    "text-xs ml-1",
                    stat.trend === "up" && "text-green-600",
                    stat.trend === "down" && "text-red-600",
                    stat.trend === "stable" && "text-gray-600"
                  )}
                >
                  {stat.trend === "up" && "↑"}
                  {stat.trend === "down" && "↓"}
                  {stat.trend === "stable" && "→"}
                </span>
              )}
            </motion.div>
            <div className="text-sm text-gray-700">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export const SchoolPreview: React.FC<SchoolPreviewProps> = ({
  courses,
  stats,
  onCourseClick,
  showAllCoursesUrl,
  title = "Featured Courses",
  subtitle = "Discover our most popular chocolate-making courses",
  className,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className={cn(
        "py-16 md:py-24 bg-gradient-to-b from-white to-amber-50/30",
        className
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {courses.map((course, index) => (
            <CourseCard
              key={course.id}
              course={course}
              index={index}
              onCourseClick={onCourseClick}
            />
          ))}
        </div>

        {/* Stats Bar */}
        {stats && stats.length > 0 && (
          <div className="mb-12">
            <StatsBar stats={stats} />
          </div>
        )}

        {/* See All Courses CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <a
            href={showAllCoursesUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold text-lg rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
          >
            <span>See All Courses</span>
            <div className="flex items-center gap-1">
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              <ExternalLink className="w-4 h-4 opacity-60" />
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default SchoolPreview;
