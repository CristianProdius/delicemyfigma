"use client";

import React, { useState, useEffect } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  variant?: "hero" | "solid" | "transparent";
  className?: string;
}

export default function Header({ variant = "hero", className }: HeaderProps) {
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileAboutOpen, setIsMobileAboutOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const pathname = usePathname();

  // Handle scroll for transparent variant
  useEffect(() => {
    if (variant === "transparent") {
      const handleScroll = () => {
        setScrolled(window.scrollY > 20);
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [variant]);

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

  // Navigation content
  const navContent = {
    logo: {
      src: "/logo.png",
      alt: "DeliceMy",
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
      },
      {
        title: "Kids Chocolate Classes",
        href: "/services/kids-chocolate-classes",
        description: "Fun workshops for children",
      },
      {
        title: "Restaurant & Café Services",
        href: "/services/restaurant-cafe-services",
        description: "Elevate your dessert menu",
      },
      {
        title: "Chocolate Parties & Events",
        href: "/services/chocolate-parties-events",
        description: "Unforgettable celebrations",
      },
      {
        title: "Custom Dessert Design",
        href: "/services/custom-dessert-design",
        description: "Bespoke chocolate creations",
      },
      {
        title: "Personalized Chocolate Gifts",
        href: "/services/personalized-chocolate-gifts",
        description: "Unique gifts for special moments",
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

  // Dynamic nav item classes based on variant
  const getNavItemClass = () => {
    if (variant === "hero") {
      return "text-white/70 hover:text-white";
    } else if (variant === "solid") {
      return "text-white/80 hover:text-white";
    } else {
      // Transparent variant - dark text on white background
      return "text-white/80 hover:text-white";
    }
  };

  const getActiveClass = () => {
    if (variant === "transparent") {
      return "text-white font-semibold";
    }
    return "text-white";
  };

  const navItemClass = getNavItemClass();
  const activeClass = getActiveClass();

  // Dropdown background classes
  const getDropdownClass = () => {
    if (variant === "transparent") {
      return "bg-white shadow-xl border border-gray-100";
    }
    return "bg-[#2C1810]/95 backdrop-blur-xl border border-white/10";
  };

  const getDropdownTextClass = () => {
    if (variant === "transparent") {
      return {
        title: "text-gray-800 hover:text-[#8B4513]",
        description: "text-gray-500",
        hover: "hover:bg-gray-50",
      };
    }
    return {
      title: "text-white/90",
      description: "text-white/50",
      hover: "hover:bg-white/5",
    };
  };

  const dropdownClass = getDropdownClass();
  const dropdownTextClass = getDropdownTextClass();

  return (
    <header
      className={cn(
        "transition-all duration-300",
        variant === "solid" &&
          "fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#2C1810] via-[#3A1F15] to-[#2C1810] backdrop-blur-lg shadow-xl",
        variant === "transparent" && [
          "fixed top-0 left-0 right-0 z-50",
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg"
            : "bg-transparent",
        ],
        className
      )}
    >
      <nav
        className={cn(
          "relative",
          (variant === "solid" || variant === "transparent") &&
            "max-w-[95%] xl:max-w-[90%] mx-auto"
        )}
      >
        <div className="flex justify-between items-center h-20 px-4 lg:px-0">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3">
            <Image
              src={navContent.logo.src}
              alt={navContent.logo.alt}
              width={60}
              height={38}
              className="cursor-pointer transition-all duration-300 hover:scale-105"
              style={{
                filter: variant === "transparent" ? "none" : "brightness(1.1)",
              }}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {/* Services Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsServicesOpen(!isServicesOpen);
                  setIsAboutOpen(false);
                }}
                onBlur={() => setTimeout(() => setIsServicesOpen(false), 200)}
                className={cn(
                  "flex items-center gap-1.5 text-sm tracking-wide transition-all duration-300 [font-family:var(--font-inter)]",
                  isActive("/services") ? activeClass : navItemClass
                )}
              >
                {navContent.mainNav.services}
                <ChevronDown
                  className={cn(
                    "w-3.5 h-3.5 transition-transform duration-300",
                    isServicesOpen && "rotate-180"
                  )}
                />
              </button>

              <AnimatePresence>
                {isServicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className={cn(
                      "absolute left-0 mt-4 w-80 rounded-xl py-3 z-50",
                      dropdownClass
                    )}
                  >
                    {/* View All Services */}
                    <Link
                      href={navContent.routes.services}
                      className={cn(
                        "block px-5 py-2.5 text-sm font-medium transition-all duration-200 border-b",
                        variant === "transparent"
                          ? "text-[#8B4513] hover:text-[#6B3410] border-gray-100"
                          : "text-white/80 hover:text-white hover:bg-white/5 border-white/10"
                      )}
                    >
                      View All Services →
                    </Link>

                    {/* Service Items */}
                    {navContent.servicesDropdown.map((service) => (
                      <Link
                        key={service.href}
                        href={service.href}
                        className={cn(
                          "block px-5 py-3.5 transition-all duration-200",
                          dropdownTextClass.hover
                        )}
                      >
                        <div
                          className={cn(
                            "text-sm font-medium [font-family:var(--font-inter)]",
                            dropdownTextClass.title
                          )}
                        >
                          {service.title}
                        </div>
                        <div
                          className={cn(
                            "text-xs mt-1",
                            dropdownTextClass.description
                          )}
                        >
                          {service.description}
                        </div>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Other Nav Items */}
            <Link
              href={navContent.routes.school}
              className={cn(
                "text-sm tracking-wide transition-colors duration-300 [font-family:var(--font-inter)]",
                isActive("/school") ? activeClass : navItemClass
              )}
            >
              {navContent.mainNav.school}
            </Link>

            <Link
              href={navContent.routes.shop}
              className={cn(
                "text-sm tracking-wide transition-colors duration-300 [font-family:var(--font-inter)]",
                isActive("/shop") ? activeClass : navItemClass
              )}
            >
              {navContent.mainNav.shop}
            </Link>

            <Link
              href={navContent.routes.blog}
              className={cn(
                "text-sm tracking-wide transition-colors duration-300 [font-family:var(--font-inter)]",
                isActive("/blog") ? activeClass : navItemClass
              )}
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
                className={cn(
                  "flex items-center gap-1.5 text-sm tracking-wide transition-all duration-300 [font-family:var(--font-inter)]",
                  isActive("/about-olesea") || isActive("/about-company")
                    ? activeClass
                    : navItemClass
                )}
              >
                {navContent.mainNav.about}
                <ChevronDown
                  className={cn(
                    "w-3.5 h-3.5 transition-transform duration-300",
                    isAboutOpen && "rotate-180"
                  )}
                />
              </button>

              <AnimatePresence>
                {isAboutOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className={cn(
                      "absolute right-0 mt-4 w-48 rounded-xl py-2 z-50",
                      dropdownClass
                    )}
                  >
                    <Link
                      href={navContent.routes.aboutOlesea}
                      className={cn(
                        "block px-5 py-2.5 text-sm font-medium transition-all duration-200",
                        dropdownTextClass.hover,
                        dropdownTextClass.title
                      )}
                    >
                      {navContent.aboutDropdown.aboutOlesea}
                    </Link>
                    <Link
                      href={navContent.routes.aboutCompany}
                      className={cn(
                        "block px-5 py-2.5 text-sm font-medium transition-all duration-200",
                        dropdownTextClass.hover,
                        dropdownTextClass.title
                      )}
                    >
                      {navContent.aboutDropdown.aboutCompany}
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href={navContent.routes.contact}
              className={cn(
                "text-sm tracking-wide transition-colors duration-300 [font-family:var(--font-inter)]",
                isActive("/contact") ? activeClass : navItemClass
              )}
            >
              {navContent.mainNav.contact}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                "p-2 rounded-lg transition-all duration-200",
                variant === "transparent"
                  ? "text-gray-700 hover:text-[#8B4513] hover:bg-gray-100"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              )}
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
              <div
                className={cn(
                  "px-2 pt-2 pb-3 space-y-1 rounded-b-xl",
                  variant === "transparent"
                    ? "bg-white shadow-lg"
                    : "bg-black/20 backdrop-blur-md"
                )}
              >
                {/* Mobile Services Dropdown */}
                <div>
                  <button
                    onClick={() => {
                      setIsMobileServicesOpen(!isMobileServicesOpen);
                      setIsMobileAboutOpen(false);
                    }}
                    className={cn(
                      "w-full flex items-center justify-between px-3 py-2 rounded-md text-base font-medium transition-colors duration-200",
                      isActive("/services")
                        ? variant === "transparent"
                          ? "text-[#8B4513] bg-orange-50"
                          : "text-white bg-white/10"
                        : variant === "transparent"
                        ? "text-gray-700 hover:text-[#8B4513] hover:bg-gray-50"
                        : "text-white/70 hover:text-white hover:bg-white/5"
                    )}
                  >
                    <span>{navContent.mainNav.services}</span>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform duration-200",
                        isMobileServicesOpen && "rotate-180"
                      )}
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
                          className={cn(
                            "block px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200",
                            variant === "transparent"
                              ? "text-gray-600 hover:text-[#8B4513] hover:bg-gray-50"
                              : "text-white/60 hover:text-white hover:bg-white/5"
                          )}
                        >
                          View All Services
                        </Link>
                        {navContent.servicesDropdown.map((service) => (
                          <Link
                            key={service.href}
                            href={service.href}
                            className={cn(
                              "block px-3 py-2 rounded-md text-sm transition-colors duration-200",
                              variant === "transparent"
                                ? "text-gray-600 hover:text-[#8B4513] hover:bg-gray-50"
                                : "text-white/60 hover:text-white hover:bg-white/5"
                            )}
                          >
                            {service.title}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Other mobile menu items */}
                <Link
                  href={navContent.routes.school}
                  className={cn(
                    "block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200",
                    isActive("/school")
                      ? variant === "transparent"
                        ? "text-[#8B4513] bg-orange-50"
                        : "text-white bg-white/10"
                      : variant === "transparent"
                      ? "text-gray-700 hover:text-[#8B4513] hover:bg-gray-50"
                      : "text-white/70 hover:text-white hover:bg-white/5"
                  )}
                >
                  {navContent.mainNav.school}
                </Link>

                <Link
                  href={navContent.routes.shop}
                  className={cn(
                    "block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200",
                    isActive("/shop")
                      ? variant === "transparent"
                        ? "text-[#8B4513] bg-orange-50"
                        : "text-white bg-white/10"
                      : variant === "transparent"
                      ? "text-gray-700 hover:text-[#8B4513] hover:bg-gray-50"
                      : "text-white/70 hover:text-white hover:bg-white/5"
                  )}
                >
                  {navContent.mainNav.shop}
                </Link>

                <Link
                  href={navContent.routes.blog}
                  className={cn(
                    "block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200",
                    isActive("/blog")
                      ? variant === "transparent"
                        ? "text-[#8B4513] bg-orange-50"
                        : "text-white bg-white/10"
                      : variant === "transparent"
                      ? "text-gray-700 hover:text-[#8B4513] hover:bg-gray-50"
                      : "text-white/70 hover:text-white hover:bg-white/5"
                  )}
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
                    className={cn(
                      "w-full flex items-center justify-between px-3 py-2 rounded-md text-base font-medium transition-colors duration-200",
                      isActive("/about-olesea") || isActive("/about-company")
                        ? variant === "transparent"
                          ? "text-[#8B4513] bg-orange-50"
                          : "text-white bg-white/10"
                        : variant === "transparent"
                        ? "text-gray-700 hover:text-[#8B4513] hover:bg-gray-50"
                        : "text-white/70 hover:text-white hover:bg-white/5"
                    )}
                  >
                    {navContent.mainNav.about}
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform duration-200",
                        isMobileAboutOpen && "rotate-180"
                      )}
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
                          className={cn(
                            "block px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200",
                            variant === "transparent"
                              ? "text-gray-600 hover:text-[#8B4513] hover:bg-gray-50"
                              : "text-white/60 hover:text-white hover:bg-white/5"
                          )}
                        >
                          {navContent.aboutDropdown.aboutOlesea}
                        </Link>
                        <Link
                          href={navContent.routes.aboutCompany}
                          className={cn(
                            "block px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200",
                            variant === "transparent"
                              ? "text-gray-600 hover:text-[#8B4513] hover:bg-gray-50"
                              : "text-white/60 hover:text-white hover:bg-white/5"
                          )}
                        >
                          {navContent.aboutDropdown.aboutCompany}
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Link
                  href={navContent.routes.contact}
                  className={cn(
                    "block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200",
                    isActive("/contact")
                      ? variant === "transparent"
                        ? "text-[#8B4513] bg-orange-50"
                        : "text-white bg-white/10"
                      : variant === "transparent"
                      ? "text-gray-700 hover:text-[#8B4513] hover:bg-gray-50"
                      : "text-white/70 hover:text-white hover:bg-white/5"
                  )}
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
