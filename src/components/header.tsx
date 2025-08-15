"use client";

import React, { useState, useEffect } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";

export default function Header() {
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileAboutOpen, setIsMobileAboutOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);

  const pathname = usePathname();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMobileAboutOpen(false);
    setIsMobileServicesOpen(false);
  }, [pathname]);

  // Check if current page is active
  const isActive = (path: string) => {
    if (path === "/services") {
      return pathname?.startsWith("/services");
    }
    return pathname === path;
  };

  // Navigation content object
  const navContent = {
    logo: {
      src: "/logo.png",
      alt: "Logo",
    },
    mainNav: {
      services: "Services",
      school: "School",
      shop: "Shop",
      blog: "Blog",
      about: "About",
      contact: "Contact",
    },
    servicesDropdown: [
      {
        title: "Chocolate Classes for Adults",
        href: "/services/chocolate-classes-adults",
        description: "Learn from master chocolatiers",
        icon: "👨‍🎓",
      },
      {
        title: "Kids Chocolate Classes",
        href: "/services/kids-chocolate-classes",
        description: "Fun workshops for children",
        icon: "🧒",
      },
      {
        title: "Restaurant & Café Services",
        href: "/services/restaurant-cafe-services",
        description: "Elevate your dessert menu",
        icon: "🍽️",
      },
      {
        title: "Chocolate Parties & Events",
        href: "/services/chocolate-parties-events",
        description: "Unforgettable celebrations",
        icon: "🎉",
      },
      {
        title: "Custom Dessert Design",
        href: "/services/custom-dessert-design",
        description: "Bespoke chocolate creations",
        icon: "🎨",
      },
      {
        title: "Personalized Chocolate Gifts",
        href: "/services/personalized-chocolate-gifts",
        description: "Unique gifts for special moments",
        icon: "🎁",
      },
    ],
    aboutDropdown: {
      aboutOlesea: "About Olesea",
      aboutCompany: "About Company",
    },
    routes: {
      services: "/services",
      school: "/school",
      shop: "/shop",
      blog: "/blog",
      aboutOlesea: "/about-olesea",
      aboutCompany: "/about-company",
      contact: "/contact",
    },
  };

  return (
    <header>
      <nav>
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/">
            <Image
              src={navContent.logo.src}
              alt={navContent.logo.alt}
              width={64}
              height={40}
              className="cursor-pointer"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Services Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsServicesOpen(!isServicesOpen);
                  setIsAboutOpen(false);
                }}
                onBlur={() => setTimeout(() => setIsServicesOpen(false), 200)}
                className={`flex items-center transition-colors duration-200 focus:outline-none ${
                  isActive("/services")
                    ? "text-white"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {navContent.mainNav.services}
                <ChevronDown
                  className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                    isServicesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {isServicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 mt-2 w-80 bg-white rounded-xl shadow-2xl py-2 z-50 overflow-hidden"
                  >
                    {/* View All Services Link */}
                    <Link
                      href={navContent.routes.services}
                      className="block px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-black">
                          View All Services
                        </span>
                        <span className="text-xs text-gray-500">
                          Explore our offerings →
                        </span>
                      </div>
                    </Link>

                    {/* Individual Services */}
                    {navContent.servicesDropdown.map((service, index) => (
                      <motion.div
                        key={service.href}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Link
                          href={service.href}
                          className="group block px-4 py-3 hover:bg-gradient-to-r hover:from-amber-50 hover:to-transparent transition-all duration-200"
                        >
                          <div className="flex items-start gap-3">
                            <span className="text-2xl mt-0.5">
                              {service.icon}
                            </span>
                            <div className="flex-1">
                              <div className="text-sm font-medium text-black/90 group-hover:text-black transition-colors duration-200">
                                {service.title}
                              </div>
                              <div className="text-xs text-black/50 mt-0.5">
                                {service.description}
                              </div>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href={navContent.routes.school}
              className={`transition-colors duration-200 ${
                isActive("/school")
                  ? "text-white"
                  : "text-white/70 hover:text-white"
              }`}
            >
              {navContent.mainNav.school}
            </Link>
            <Link
              href={navContent.routes.shop}
              className={`transition-colors duration-200 ${
                isActive("/shop")
                  ? "text-white"
                  : "text-white/70 hover:text-white"
              }`}
            >
              {navContent.mainNav.shop}
            </Link>
            <Link
              href={navContent.routes.blog}
              className={`transition-colors duration-200 ${
                isActive("/blog")
                  ? "text-white"
                  : "text-white/70 hover:text-white"
              }`}
            >
              {navContent.mainNav.blog}
            </Link>

            {/* About Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsAboutOpen(!isAboutOpen);
                  setIsServicesOpen(false);
                }}
                onBlur={() => setTimeout(() => setIsAboutOpen(false), 200)}
                className={`flex items-center transition-colors duration-200 focus:outline-none ${
                  isActive("/about-olesea") || isActive("/about-company")
                    ? "text-white"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {navContent.mainNav.about}
                <ChevronDown
                  className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                    isAboutOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {isAboutOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
                  >
                    <Link
                      href={navContent.routes.aboutOlesea}
                      className="block px-4 py-2 text-sm text-black/70 hover:bg-gray-50 hover:text-black transition-colors duration-200"
                    >
                      {navContent.aboutDropdown.aboutOlesea}
                    </Link>
                    <Link
                      href={navContent.routes.aboutCompany}
                      className="block px-4 py-2 text-sm text-black/70 hover:bg-gray-50 hover:text-black transition-colors duration-200"
                    >
                      {navContent.aboutDropdown.aboutCompany}
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href={navContent.routes.contact}
              className={`font-medium transition-colors duration-200 ${
                isActive("/contact")
                  ? "text-white"
                  : "text-white/70 hover:text-white"
              }`}
            >
              {navContent.mainNav.contact}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white/70 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white/30 transition-all duration-200"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 bg-black/20 backdrop-blur-md rounded-b-xl">
                {/* Mobile Services Dropdown */}
                <div>
                  <button
                    onClick={() => {
                      setIsMobileServicesOpen(!isMobileServicesOpen);
                      setIsMobileAboutOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                      isActive("/services")
                        ? "text-white bg-white/10"
                        : "text-white/70 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <span>{navContent.mainNav.services}</span>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${
                        isMobileServicesOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isMobileServicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="pl-4 mt-1 space-y-1 overflow-hidden"
                      >
                        <Link
                          href={navContent.routes.services}
                          className="block px-3 py-2 rounded-md text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 transition-colors duration-200"
                        >
                          View All Services
                        </Link>
                        {navContent.servicesDropdown.map((service) => (
                          <Link
                            key={service.href}
                            href={service.href}
                            className="block px-3 py-2 rounded-md text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors duration-200"
                          >
                            <div className="flex items-center gap-2">
                              <span>{service.icon}</span>
                              <span>{service.title}</span>
                            </div>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Link
                  href={navContent.routes.school}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                    isActive("/school")
                      ? "text-white bg-white/10"
                      : "text-white/70 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {navContent.mainNav.school}
                </Link>

                <Link
                  href={navContent.routes.shop}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                    isActive("/shop")
                      ? "text-white bg-white/10"
                      : "text-white/70 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {navContent.mainNav.shop}
                </Link>

                <Link
                  href={navContent.routes.blog}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                    isActive("/blog")
                      ? "text-white bg-white/10"
                      : "text-white/70 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {navContent.mainNav.blog}
                </Link>

                {/* Mobile About Dropdown */}
                <div>
                  <button
                    onClick={() => {
                      setIsMobileAboutOpen(!isMobileAboutOpen);
                      setIsMobileServicesOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                      isActive("/about-olesea") || isActive("/about-company")
                        ? "text-white bg-white/10"
                        : "text-white/70 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {navContent.mainNav.about}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${
                        isMobileAboutOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isMobileAboutOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="pl-6 mt-1 space-y-1 overflow-hidden"
                      >
                        <Link
                          href={navContent.routes.aboutOlesea}
                          className="block px-3 py-2 rounded-md text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 transition-colors duration-200"
                        >
                          {navContent.aboutDropdown.aboutOlesea}
                        </Link>
                        <Link
                          href={navContent.routes.aboutCompany}
                          className="block px-3 py-2 rounded-md text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 transition-colors duration-200"
                        >
                          {navContent.aboutDropdown.aboutCompany}
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Link
                  href={navContent.routes.contact}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                    isActive("/contact")
                      ? "text-white bg-white/10"
                      : "text-white/70 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {navContent.mainNav.contact}
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
