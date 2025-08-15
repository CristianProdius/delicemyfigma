"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import {
  ArrowRight,
  Sparkles,
  Users,
  Utensils,
  PartyPopper,
  Palette,
  Gift,
} from "lucide-react";

const servicesData = {
  title: "Our Services:",
  services: [
    {
      id: 1,
      title: "Chocolate Classes for Adults",
      description:
        "Learn to make chocolates like a pro. Group or private lessons available. We even help you start your own chocolate business!",
      image: "/img/adult-classes.jpg",
      buttonText: "Learn More",
      gridClass: "col-span-1 row-span-1",
      icon: Users,
      accentColor: "#D4A574",
    },
    {
      id: 2,
      title: "Kids Chocolate Classes",
      description:
        "Fun, safe chocolate making for children. They create, play, and take home sweet treats!",
      image: "/img/kids-classes.jpg",
      buttonText: "Learn More",
      gridClass: "col-span-1 row-span-1",
      icon: Sparkles,
      accentColor: "#E8B4B8",
    },
    {
      id: 3,
      title: "Restaurant & Café Services",
      description:
        "Add amazing chocolate desserts to your menu. We help you create treats that bring customers back.",
      image: "/img/restaurant-service.jpg",
      buttonText: "Learn More",
      gridClass: "col-span-1 row-span-2 md:row-span-2",
      icon: Utensils,
      accentColor: "#A67B5B",
    },
    {
      id: 4,
      title: "Chocolate Parties & Events",
      description:
        "Book a chocolate tasting party. Perfect for birthdays, team building, or any celebration.",
      image: "/img/parties-events.jpg",
      buttonText: "Book Event",
      gridClass: "col-span-1 row-span-1",
      icon: PartyPopper,
      accentColor: "#F4A460",
    },
    {
      id: 5,
      title: "Custom Dessert Design",
      description:
        "We create unique chocolate decorations and molds just for your business.",
      image: "/img/custom-desserts.jpg",
      buttonText: "Learn More",
      gridClass: "col-span-1 row-span-1",
      icon: Palette,
      accentColor: "#CD853F",
    },
  ],
  giftService: {
    id: 6,
    title: "Personalized Chocolate Gifts",
    description:
      "Create unforgettable moments with our custom chocolate creations. Perfect for corporate gifts, weddings, or special celebrations.",
    buttonText: "Order Now",
    decorativeImage: "/img/cat.png",
    gridClass: "col-span-1 md:col-span-3 row-span-1",
    icon: Gift,
  },
};

type Service = {
  id: number;
  title: string;
  description: string;
  image: string;
  buttonText: string;
  gridClass: string;
  icon: React.ElementType;
  accentColor: string;
};

interface ServiceCardProps {
  service: Service;
  index: number;
}

const ServiceCard = ({ service, index }: ServiceCardProps) => {
  const Icon = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className={`group relative overflow-hidden rounded-[32px] shadow-lg hover:shadow-2xl transition-all duration-500 ${service.gridClass}`}
      style={{
        backgroundColor: "#451C15",
        minHeight: service.gridClass.includes("row-span-2") ? "100%" : "320px",
      }}
    >
      {/* Gradient Border Effect */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${service.accentColor}40 0%, transparent 50%, ${service.accentColor}40 100%)`,
          borderRadius: "32px",
        }}
      />

      {/* Background Image with Enhanced Overlay */}
      <div className="absolute inset-0">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover opacity-20 group-hover:opacity-30 group-hover:scale-110 transition-all duration-700"
        />
      </div>

      {/* Floating Icon */}
      <motion.div
        className="absolute top-6 right-6 z-30"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: index * 0.1 + 0.3, duration: 0.4, type: "spring" }}
      >
        <div
          className="p-3 rounded-2xl bg-white/10 backdrop-blur-sm group-hover:bg-white/20 transition-all duration-300"
          style={{
            boxShadow: `0 4px 20px ${service.accentColor}20`,
          }}
        >
          <Icon className="w-6 h-6 text-white/80 group-hover:text-white transition-colors duration-300" />
        </div>
      </motion.div>

      {/* Content */}
      <div className="relative z-30 p-8 lg:p-10 h-full flex flex-col justify-between">
        <div>
          <motion.h3
            className="text-2xl lg:text-3xl xl:text-4xl font-light text-[#E0D9C9] mb-6 leading-tight"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 + 0.2, duration: 0.6 }}
          >
            {service.title}
          </motion.h3>
          <motion.p
            className="text-sm lg:text-base text-[#E0D9C9]/70 leading-relaxed font-light"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 + 0.3, duration: 0.6 }}
          >
            {service.description}
          </motion.p>
        </div>

        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 + 0.4, duration: 0.6 }}
        >
          <Button
            variant="ghost"
            className="relative p-0 text-[#E0D9C9] hover:text-black transition-all duration-300 font-light text-base lg:text-lg group/btn"
          >
            <span className="relative z-10">{service.buttonText}</span>
            <ArrowRight className="ml-2 w-5 h-5 transition-all duration-300 group-hover/btn:translate-x-2" />

            {/* Underline effect */}
            <span
              className="absolute bottom-0 left-0 h-0.5 w-0 group-hover/btn:w-full transition-all duration-300"
              style={{ backgroundColor: service.accentColor }}
            />
          </Button>
        </motion.div>
      </div>

      {/* Corner Accent */}
      <div
        className="absolute bottom-0 left-0 w-32 h-32 opacity-10 group-hover:opacity-20 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at bottom left, ${service.accentColor} 0%, transparent 70%)`,
        }}
      />
    </motion.div>
  );
};

const GiftServiceCard = ({
  service,
}: {
  service: typeof servicesData.giftService;
}) => {
  const Icon = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className={`group relative overflow-hidden rounded-[32px] shadow-xl hover:shadow-2xl ${service.gridClass}`}
      style={{
        background:
          "linear-gradient(135deg, #E0D9C9 0%, #F8F5F0 50%, #FFF9F5 100%)",
        minHeight: "360px",
      }}
    >
      {/* Animated background pattern */}
      <div className="absolute inset-0">
        {/* Floating shapes */}
        <motion.div
          className="absolute top-10 right-10 w-32 h-32 rounded-full"
          style={{
            background:
              "linear-gradient(135deg, #D4A57440 0%, transparent 70%)",
          }}
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-10 left-10 w-40 h-40 rounded-full"
          style={{
            background:
              "linear-gradient(135deg, #A67B5B20 0%, transparent 70%)",
          }}
          animate={{
            y: [0, 20, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative h-full flex flex-col md:flex-row items-center justify-between p-10 lg:p-14">
        {/* Content */}
        <div className="flex-1 z-10 max-w-2xl">
          <motion.div
            className="inline-flex items-center gap-2 mb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <div className="p-3 rounded-2xl bg-[#451C15]/10 backdrop-blur-sm">
              <Icon className="w-7 h-7 text-[#451C15]" />
            </div>
            <span className="text-sm font-medium text-[#451C15]/60 uppercase tracking-wider">
              Premium Service
            </span>
          </motion.div>

          <motion.h3
            className="text-3xl lg:text-4xl xl:text-5xl font-light text-[#451C15] mb-6 lg:mb-8 leading-tight"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            {service.title}
          </motion.h3>
          <motion.p
            className="text-base lg:text-lg xl:text-xl text-[#451C15]/60 leading-relaxed font-light mb-10"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            {service.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            <Button
              className="bg-[#451C15] text-[#E0D9C9] hover:bg-[#451C15]/90 hover:scale-105 transition-all duration-300 rounded-full px-10 py-4 text-base lg:text-lg shadow-xl hover:shadow-2xl group/btn"
              style={{
                boxShadow: "0 10px 30px rgba(69, 28, 21, 0.3)",
              }}
            >
              <span className="relative z-10">{service.buttonText}</span>
              <ArrowRight className="ml-3 w-5 h-5 group-hover/btn:translate-x-2 transition-transform duration-300" />
            </Button>
          </motion.div>
        </div>

        {/* Enhanced Decorative Illustration */}
        <motion.div
          className="absolute bottom-0 right-0 md:relative md:bottom-auto md:right-auto w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96"
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          animate={{ opacity: 0.15, scale: 1, rotate: 0 }}
          transition={{
            delay: 1,
            duration: 0.8,
            type: "spring",
            stiffness: 100,
          }}
          whileHover={{ scale: 1.1, rotate: 5, transition: { duration: 0.3 } }}
        >
          <div className="relative w-full h-full">
            {/* Glow effect */}
            <div
              className="absolute inset-0 blur-3xl opacity-30"
              style={{
                background:
                  "radial-gradient(circle, #D4A574 0%, transparent 70%)",
              }}
            />
            <Image
              src={service.decorativeImage}
              alt="Decorative chocolate illustration"
              fill
              className="object-contain relative z-10"
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export const ServicesSection = () => {
  return (
    <section className="w-full py-20 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-5"
          style={{
            background: "radial-gradient(circle, #D4A574 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-5"
          style={{
            background: "radial-gradient(circle, #A67B5B 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="px-4 sm:px-6 lg:px-8 max-w-11/12 mx-auto relative z-10">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light mb-16 [font-family:var(--font-playfair)]"
          style={{ color: "#451C15" }}
        >
          {servicesData.title}
        </motion.h2>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 auto-rows-[320px]">
          {/* First row - 3 cards */}
          <ServiceCard service={servicesData.services[0]} index={0} />
          <ServiceCard service={servicesData.services[1]} index={1} />

          {/* Tall card spanning 2 rows */}
          <ServiceCard service={servicesData.services[2]} index={2} />

          {/* Second row - 2 cards + continuation of tall card */}
          <ServiceCard service={servicesData.services[3]} index={3} />
          <ServiceCard service={servicesData.services[4]} index={4} />

          {/* Third row - Full width gift card */}
          <GiftServiceCard service={servicesData.giftService} />
        </div>
      </div>
    </section>
  );
};
