"use client";

import { AboutMe } from "../components/aboutme";
import { CTASection } from "../components/cta";
import { Hero } from "../components/hero";
import { Testimonials } from "../components/testimonials";
import { ServicesSection } from "../components/service-section";
import { useHomepageData } from "@/hooks/useHomepageData";

export const LandingView = () => {
  const { homepageData, isLoading, error } = useHomepageData();

  // Don't render until data is loaded to prevent hydration mismatches
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-amber-600 [font-family:var(--font-inter)]">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 [font-family:var(--font-inter)]">Error loading homepage data</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Hero />
      <ServicesSection />
      <AboutMe key="about-section" aboutSection={homepageData?.aboutSection} />
      <Testimonials key="testimonials-section" testimonialsSection={homepageData?.testimonialsSection} />
      <CTASection key="cta-section" ctaSection={homepageData?.ctaSection} />
    </>
  );
};
