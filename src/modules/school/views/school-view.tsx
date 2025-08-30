"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  GraduationCap,
  Award,
  Users,
  BookOpen,
  Briefcase,
  Clock,
  ChefHat,
  Star,
  TrendingUp,
  Calendar,
} from "lucide-react";

// Import all school components
import SchoolHero from "../components/school-hero";
import SchoolFeatures from "../components/school-features";
import SchoolPreview from "../components/school-preview";
import SchoolRedirectCTA from "../components/school-redirect-cta";

// Import school content data
import { schoolContent, testimonials } from "../data/school-content";

// Types
import type { Course, Stat } from "../components/school-preview";
import type { Feature } from "../components/school-features";
import type { CTAStat } from "../components/school-redirect-cta";

export interface SchoolViewProps {
  className?: string;
  showExternalIndicators?: boolean;
}

const SchoolView: React.FC<SchoolViewProps> = ({
  className,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [, setEmailSubmitted] = useState(false);

  // Refs for smooth scrolling
  const featuresRef = useRef<HTMLDivElement>(
    null
  ) as React.RefObject<HTMLDivElement>;
  const coursesRef = useRef<HTMLDivElement>(
    null
  ) as React.RefObject<HTMLDivElement>;
  const ctaRef = useRef<HTMLDivElement>(
    null
  ) as React.RefObject<HTMLDivElement>;

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  // Smooth scroll handler
  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      const yOffset = -80; // Offset for fixed header if any
      const y =
        ref.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  // Handle course click
  const handleCourseClick = (courseId: string) => {
    // If coming soon, show alert or modal
    if (schoolContent.comingSoonBadge) {
      alert(
        "Our school platform is launching soon! Sign up below to be notified."
      );
      scrollToSection(ctaRef);
    } else {
      // Open course details in new tab
      const courseUrl = `${schoolContent.externalUrl}/courses/${courseId}`;
      window.open(courseUrl, "_blank", "noopener,noreferrer");
    }
  };

  // Handle email submission for coming soon
  const handleEmailSubmit = async (email: string) => {
    try {
      // Here you would typically send to your API
      console.log("Email submitted:", email);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setEmailSubmitted(true);

      // You could also store in localStorage or send to analytics
      localStorage.setItem("school_waitlist_email", email);

      // Track event if you have analytics
      // analytics.track('School Waitlist Signup', { email });
    } catch (error) {
      console.error("Failed to submit email:", error);
    }
  };

  // Transform content data for components
  const transformedCourses: Course[] = schoolContent.courses.map((course) => ({
    id: course.id,
    title: course.title,
    level: course.level,
    description: course.description,
    duration: course.duration,
    classSize: course.maxStudents || 12,
    image: `/images/school/course-${course.id}.jpg`, // You'll need to add these images
    instructor: "Master Chocolatier", // Could be added to content
    price: course.price,
    rating: 4.8 + Math.random() * 0.2, // Mock rating
    enrolledCount: Math.floor(Math.random() * 50) + 10,
  }));

  const transformedFeatures: Feature[] = schoolContent.features.map(
    (feature, index) => ({
      id: feature.id,
      icon: getFeatureIcon(feature.icon || ""),
      title: feature.title,
      description: feature.description || "",
      gradient: getFeatureGradient(index),
      delay: index * 0.1,
    })
  );

  const transformedStats: Stat[] = schoolContent.stats.map((stat) => ({
    id: stat.id,
    label: stat.label,
    value: stat.value,
    icon: getStatIcon(stat.icon || ""),
    trend: Math.random() > 0.5 ? "up" : "stable",
  }));

  const transformedCTAStats: CTAStat[] = [
    {
      id: "cta-1",
      label: "Students Enrolled",
      value: schoolContent.stats[0]?.value || "500+",
      icon: <Users className="w-5 h-5 text-white" />,
    },
    {
      id: "cta-2",
      label: "Job Placement",
      value: schoolContent.stats[3]?.value || "95%",
      icon: <TrendingUp className="w-5 h-5 text-white" />,
    },
    {
      id: "cta-3",
      label: "Master Instructors",
      value: schoolContent.stats[4]?.value || "8",
      icon: <Award className="w-5 h-5 text-white" />,
    },
    {
      id: "cta-4",
      label: "Years Experience",
      value: schoolContent.stats[2]?.value || "12",
      icon: <Calendar className="w-5 h-5 text-white" />,
    },
  ];

  // Helper functions for icon mapping
  function getFeatureIcon(iconName: string): React.ReactNode {
    const iconMap: Record<string, React.ReactNode> = {
      users: <Users className="w-8 h-8 text-white" />,
      award: <Award className="w-8 h-8 text-white" />,
      hand: <BookOpen className="w-8 h-8 text-white" />,
      "users-group": <Users className="w-8 h-8 text-white" />,
      briefcase: <Briefcase className="w-8 h-8 text-white" />,
      calendar: <Clock className="w-8 h-8 text-white" />,
    };
    return (
      iconMap[iconName] || <GraduationCap className="w-8 h-8 text-white" />
    );
  }

  function getStatIcon(iconName: string): React.ReactNode {
    const iconMap: Record<string, React.ReactNode> = {
      "graduation-cap": <GraduationCap className="w-5 h-5 text-amber-700" />,
      book: <BookOpen className="w-5 h-5 text-amber-700" />,
      "calendar-check": <Calendar className="w-5 h-5 text-amber-700" />,
      briefcase: <Briefcase className="w-5 h-5 text-amber-700" />,
      star: <Star className="w-5 h-5 text-amber-700" />,
      building: <ChefHat className="w-5 h-5 text-amber-700" />,
    };
    return iconMap[iconName] || <Award className="w-5 h-5 text-amber-700" />;
  }

  function getFeatureGradient(index: number): string {
    const gradients = [
      "from-amber-400 to-orange-500",
      "from-purple-400 to-pink-500",
      "from-blue-400 to-cyan-500",
      "from-green-400 to-teal-500",
      "from-red-400 to-rose-500",
      "from-indigo-400 to-purple-500",
    ];
    return gradients[index % gradients.length];
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-amber-50 to-amber-100">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <ChefHat className="w-16 h-16 text-amber-600" />
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <SchoolHero
        title={schoolContent.heroTitle}
        subtitle={schoolContent.heroSubtitle}
        ctaText={schoolContent.ctaButtonText}
        ctaUrl={schoolContent.externalUrl}
        secondaryCtaText="Discover Our Programs"
        onSecondaryClick={() => scrollToSection(coursesRef)}
        backgroundImage="/images/school/hero-bg.jpg" // Add this image
        showBadge={!schoolContent.comingSoonBadge}
      />

      {/* Features Section */}
      <motion.div
        ref={featuresRef}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <SchoolFeatures
          title="Why Choose Our Chocolate School"
          subtitle="Excellence in chocolate education with world-class facilities and expert instructors"
          features={transformedFeatures}
          columns={3}
          showNumbers={false}
          variant="default"
        />
      </motion.div>

      {/* Courses Preview Section */}
      <motion.div
        ref={coursesRef}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <SchoolPreview
          courses={transformedCourses.slice(0, 4)} // Show first 4 courses
          stats={transformedStats.slice(0, 4)} // Show first 4 stats
          onCourseClick={handleCourseClick}
          showAllCoursesUrl={schoolContent.externalUrl}
          title="Featured Courses"
          subtitle="Explore our most popular chocolate-making programs"
        />
      </motion.div>

      {/* Testimonials Section (Optional) */}
      {testimonials && testimonials.length > 0 && (
        <motion.section
          className="py-16 bg-gradient-to-b from-white to-amber-50/30"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              What Our Students Say
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.slice(0, 3).map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  className="bg-white rounded-xl p-6 shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-amber-500 fill-amber-500"
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">
                    &quot;{testimonial.content}&quot;
                  </p>
                  <div className="border-t pt-4">
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                    <p className="text-sm text-gray-500">
                      {testimonial.company}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* CTA Section */}
      <motion.div
        ref={ctaRef}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <SchoolRedirectCTA
          headline={
            schoolContent.comingSoonBadge
              ? "Our Chocolate School Platform Launches Soon!"
              : "Ready to Start Your Chocolate Journey?"
          }
          subtext={
            schoolContent.comingSoonBadge
              ? "Be the first to know when enrollment opens for our professional chocolate-making courses."
              : schoolContent.redirectMessage
          }
          buttonText={schoolContent.ctaButtonText}
          externalUrl={schoolContent.externalUrl}
          stats={transformedCTAStats}
          isComingSoon={schoolContent.comingSoonBadge}
          onEmailSubmit={
            schoolContent.comingSoonBadge ? handleEmailSubmit : undefined
          }
          variant="premium"
        />
      </motion.div>

      {/* Floating Back to Top Button */}
      <AnimatePresence>
        <motion.button
          className="fixed bottom-8 right-8 p-4 bg-amber-600 text-white rounded-full shadow-lg hover:bg-amber-700 transition-colors z-40"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChefHat className="w-6 h-6" />
        </motion.button>
      </AnimatePresence>
    </motion.div>
  );
};

export default SchoolView;
