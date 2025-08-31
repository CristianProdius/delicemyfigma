"use client";

import { SchoolHero } from "../components/school-hero";
import { SchoolFeatures } from "../components/school-features";
import { SchoolCourses } from "../components/school-courses";
import { SchoolTestimonials } from "../components/school-testimonials";
import { SchoolCTA } from "../components/school-cta";

export const SchoolView = () => {
  return (
    <>
      <SchoolHero />
      <SchoolFeatures />
      <SchoolCourses />
      <SchoolTestimonials />
      <SchoolCTA />
    </>
  );
};