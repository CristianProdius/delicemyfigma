// src/modules/about/views/about-olesea-view.tsx
"use client";

import { AboutHero } from "../components/about-hero";
import { JourneyTimeline } from "../components/journey-timeline";
import { PhilosophySection } from "../components/philosophy-section";
import { SkillsShowcase } from "../components/skills-showcase";
import { AboutCTA } from "../components/about-cta";
import { oleseaContent } from "../data/about-content";
import { motion } from "motion/react";

export const AboutOleseaView = () => {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <AboutHero
        title={oleseaContent.name}
        subtitle={oleseaContent.title}
        tagline={oleseaContent.tagline}
        description={oleseaContent.description}
        image={oleseaContent.heroImage}
        signature={oleseaContent.signature}
        variant="personal"
        accentColor={oleseaContent.accentColor}
      />

      {/* Journey Timeline */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <JourneyTimeline
          events={oleseaContent.timeline}
          accentColor={oleseaContent.accentColor}
        />
      </motion.div>

      {/* Philosophy & Achievements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="bg-gradient-to-b from-white to-[#FAF8F5]"
      >
        <PhilosophySection
          philosophy={oleseaContent.philosophy}
          achievements={oleseaContent.achievements}
        />
      </motion.div>

      {/* Skills & Testimonials */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="bg-[#FAF8F5]"
      >
        <SkillsShowcase
          skills={oleseaContent.skills}
          testimonials={oleseaContent.testimonials}
        />
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <AboutCTA variant="personal" />
      </motion.div>

      {/* Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 rounded-full"
          style={{
            background: `radial-gradient(circle, ${oleseaContent.accentColor}08 0%, transparent 70%)`,
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
          className="absolute bottom-20 right-10 w-96 h-96 rounded-full"
          style={{
            background: `radial-gradient(circle, ${oleseaContent.accentColor}05 0%, transparent 70%)`,
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
