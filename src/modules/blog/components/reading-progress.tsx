"use client";

import React from "react";
import { motion } from "motion/react";

interface ReadingProgressProps {
  progress: number;
}

export const ReadingProgress = ({ progress }: ReadingProgressProps) => {
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-[#451C15]/10 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <motion.div
        className="h-full bg-gradient-to-r from-[#D4A574] to-[#A67B5B]"
        style={{ width: `${progress * 100}%` }}
      />
    </motion.div>
  );
};