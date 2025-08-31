"use client";

import React from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const BlogPostCTA = () => {
  return (
    <section className="bg-gradient-to-br from-[#451C15] to-[#5A241C] py-16 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <h2 className="text-3xl sm:text-4xl font-light text-white [font-family:var(--font-playfair)]">
            Enjoyed this article?
          </h2>
          <p className="text-lg text-white/80 [font-family:var(--font-inter)]">
            Join our chocolate-loving community and never miss a sweet story
          </p>
          <Link href="/blog">
            <Button
              size="lg"
              className="bg-white text-[#451C15] hover:bg-[#F8F5F0] transition-all duration-300"
            >
              Explore More Articles
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};