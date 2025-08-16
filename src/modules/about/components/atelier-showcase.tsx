// src/modules/about/components/atelier-showcase.tsx
"use client";

import { motion } from "motion/react";
import { useState } from "react";
import Image from "next/image";
import {
  Users,
  Coffee,
  Heart,
  Calendar,
  ChefHat,
  Award,
  Sparkles,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  specialties: string[];
}

interface Metrics {
  chocolatesCrafted: string;
  happyCustomers: string;
  recipesCreated: string;
  eventsHosted: string;
}

interface AtelierShowcaseProps {
  metrics: Metrics;
  team: TeamMember[];
}

export const AtelierShowcase = ({ metrics, team }: AtelierShowcaseProps) => {
  const [selectedMember, setSelectedMember] = useState<string | null>(null);

  const metricItems = [
    {
      label: "Chocolates Crafted",
      value: metrics.chocolatesCrafted,
      icon: Coffee,
      color: "#D2691E",
      description: "Handcrafted with love",
    },
    {
      label: "Happy Customers",
      value: metrics.happyCustomers,
      icon: Heart,
      color: "#8B4513",
      description: "Satisfied chocolate lovers",
    },
    {
      label: "Recipes Created",
      value: metrics.recipesCreated,
      icon: ChefHat,
      color: "#A0522D",
      description: "Unique flavor combinations",
    },
    {
      label: "Events Hosted",
      value: metrics.eventsHosted,
      icon: Calendar,
      color: "#CD853F",
      description: "Memorable experiences",
    },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 max-w-[95%] xl:max-w-[90%] mx-auto">
      {/* Metrics Section */}
      <div className="mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#D2691E20] mb-4"
          >
            <Sparkles className="w-8 h-8 text-[#D2691E]" />
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#451C15] mb-4 [font-family:var(--font-playfair)]">
            Our Atelier in Numbers
          </h2>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Years of dedication reflected in every statistic
          </p>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {metricItems.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                type: "spring",
                stiffness: 100,
              }}
              viewport={{ once: true }}
            >
              <Card className="relative p-6 lg:p-8 bg-white border-none shadow-lg hover:shadow-2xl transition-all duration-300 group overflow-hidden">
                {/* Background Effect */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${metric.color}10 0%, transparent 100%)`,
                  }}
                />

                {/* Icon */}
                <motion.div
                  className="relative z-10 inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4"
                  style={{
                    backgroundColor: `${metric.color}20`,
                    border: `2px solid ${metric.color}30`,
                  }}
                  whileHover={{
                    rotate: [0, -10, 10, 0],
                    scale: 1.1,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <metric.icon
                    className="w-7 h-7"
                    style={{ color: metric.color }}
                  />
                </motion.div>

                {/* Value */}
                <motion.div
                  className="relative z-10 text-3xl lg:text-4xl font-bold mb-2"
                  style={{ color: metric.color }}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.3 + index * 0.1,
                    type: "spring",
                    stiffness: 200,
                  }}
                  viewport={{ once: true }}
                >
                  {metric.value}
                </motion.div>

                {/* Label */}
                <h3 className="relative z-10 text-[#451C15] font-semibold mb-1">
                  {metric.label}
                </h3>

                {/* Description */}
                <p className="relative z-10 text-gray-500 text-sm">
                  {metric.description}
                </p>

                {/* Decorative Corner */}
                <motion.div
                  className="absolute -bottom-2 -right-2 w-16 h-16 rounded-full opacity-20"
                  style={{ backgroundColor: metric.color }}
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.5,
                  }}
                />
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#D2691E20] mb-4"
          >
            <Users className="w-8 h-8 text-[#D2691E]" />
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#451C15] mb-4 [font-family:var(--font-playfair)]">
            Meet Our Master Artisans
          </h2>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            The talented hands and creative minds behind every chocolate
            creation
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {team.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                type: "spring",
                stiffness: 100,
              }}
              viewport={{ once: true }}
              onClick={() =>
                setSelectedMember(
                  selectedMember === member.id ? null : member.id
                )
              }
              className="cursor-pointer"
            >
              <Card
                className={cn(
                  "relative h-full bg-white border-none shadow-lg transition-all duration-300 overflow-hidden group",
                  selectedMember === member.id
                    ? "shadow-2xl scale-105"
                    : "hover:shadow-xl"
                )}
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Role Badge */}
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{
                      opacity: selectedMember === member.id ? 1 : 0,
                      y: 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-4 right-4 z-10"
                  >
                    <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-lg">
                      <span className="text-[#D2691E] text-xs font-medium">
                        {member.role}
                      </span>
                    </div>
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-5">
                  {/* Name */}
                  <h3 className="text-lg font-semibold text-[#451C15] mb-1 [font-family:var(--font-playfair)]">
                    {member.name}
                  </h3>

                  {/* Role */}
                  <p className="text-sm text-gray-600 mb-3">{member.role}</p>

                  {/* Bio (Shows on selection) */}
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: selectedMember === member.id ? "auto" : 0,
                      opacity: selectedMember === member.id ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="text-sm text-gray-600 mb-3">{member.bio}</p>

                    {/* Specialties */}
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-gray-500 mb-2">
                        Specialties:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {member.specialties.map((specialty, i) => (
                          <span
                            key={i}
                            className="text-xs px-2 py-1 bg-[#D2691E20] text-[#D2691E] rounded-full"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>

                  {/* Award Icon (Shows for founder) */}
                  {index === 0 && (
                    <motion.div
                      className="absolute bottom-2 right-2"
                      animate={{
                        rotate: [0, 10, -10, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: 1,
                      }}
                    >
                      <Award className="w-4 h-4 text-[#D2691E]" />
                    </motion.div>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Team Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <blockquote className="text-xl text-gray-600 italic max-w-3xl mx-auto">
            "Together, we craft not just chocolates, but memories that last a
            lifetime."
          </blockquote>
          <p className="mt-4 text-[#D2691E] font-medium">
            — The Cocoa Dreams Team
          </p>
        </motion.div>
      </div>
    </section>
  );
};
