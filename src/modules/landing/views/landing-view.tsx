"use client";

import { AboutMe } from "../components/aboutme";
import { CTASection } from "../components/cta";
import { Hero } from "../components/hero";
import { PortfolioSection } from "../components/portofolio";

import { ServicesSection } from "../components/service-section";

export const LandingView = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      {/* Responsive background container with mobile-first approach */}
      <div className="min-h-auto bg-no-repeat bg-[url('/img/bg.jpg')] bg-center bg-cover w-full flex items-center justify-center py-4 sm:py-6 relative">
        <Hero />
      </div>
      <ServicesSection />
      <AboutMe />
      <PortfolioSection />
      <CTASection />
    </main>
  );
};
