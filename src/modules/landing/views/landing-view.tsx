"use client";

import { AboutMe } from "../components/aboutme";
import { CTASection } from "../components/cta";
import { Hero } from "../components/hero";
import { PortfolioSection } from "../components/portofolio";
import { ServicesSection } from "../components/service-section";

export const LandingView = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      {/* Hero section with full-screen chocolate background */}
      <div className="relative min-h-screen bg-no-repeat bg-[url('/img/bg.jpg')] bg-center bg-cover w-full flex items-center justify-center">
        {/* Overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />

        {/* Hero with proper spacing */}
        <div className="relative z-10 w-full flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          <Hero />
        </div>
      </div>

      {/* Other sections */}
      <ServicesSection />
      <AboutMe />
      <PortfolioSection />
      <CTASection />
    </main>
  );
};
