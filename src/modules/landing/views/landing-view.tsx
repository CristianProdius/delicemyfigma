"use client";

import { AboutMe } from "../components/aboutme";
import { CTASection } from "../components/cta";
import { Hero } from "../components/hero";
import { PortfolioSection } from "../components/portofolio";
import { ServicesSection } from "../components/service-section";

export const LandingView = () => {
  return (
    <>
      <Hero />

      <ServicesSection />
      <AboutMe />
      <PortfolioSection />
      <CTASection />
    </>
  );
};
