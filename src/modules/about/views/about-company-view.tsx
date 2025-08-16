// src/modules/about/views/about-company-view.tsx
"use client";

import { AboutHero } from "../components/about-hero";
import { CompanyStory } from "../components/company-story";
import { ValuesGrid } from "../components/values-grid";
import { AwardsSection } from "../components/awards-section";
import { AtelierShowcase } from "../components/atelier-showcase";
import { AboutCTA } from "../components/about-cta";
import { companyContent } from "../data/about-content";
import { motion } from "motion/react";

export const AboutCompanyView = () => {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <AboutHero
        title={companyContent.name}
        subtitle="Artisan Chocolate Atelier"
        tagline={companyContent.tagline}
        description={companyContent.mission}
        image={companyContent.heroImage}
        variant="company"
        accentColor={companyContent.accentColor}
      />

      {/* Company Story */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <CompanyStory chapters={companyContent.story.chapters} />
      </motion.div>

      {/* Values Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="bg-gradient-to-b from-white to-[#FAF8F5]"
      >
        <ValuesGrid values={companyContent.values} />
      </motion.div>

      {/* Atelier & Team Showcase */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="bg-[#FAF8F5]"
      >
        <AtelierShowcase
          metrics={companyContent.metrics}
          team={companyContent.team}
        />
      </motion.div>

      {/* Awards Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="bg-gradient-to-b from-[#FAF8F5] to-white"
      >
        <AwardsSection awards={companyContent.awards} />
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <AboutCTA variant="company" />
      </motion.div>

      {/* Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-40 right-20 w-64 h-64 rounded-full"
          style={{
            background: `radial-gradient(circle, ${companyContent.accentColor}08 0%, transparent 70%)`,
          }}
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-40 left-20 w-96 h-96 rounded-full"
          style={{
            background: `radial-gradient(circle, ${companyContent.accentColor}05 0%, transparent 70%)`,
          }}
          animate={{
            x: [0, -40, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </main>
  );
};
