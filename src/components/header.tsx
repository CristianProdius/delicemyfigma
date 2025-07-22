import React, { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
          <Image
            src={navContent.logo.src}
            alt={navContent.logo.alt}
            width={64}
            height={40}
          />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href={navContent.routes.services}
              className="text-white/70 hover:text-white transition-colors duration-200"
            >
              {navContent.mainNav.services}
            </Link>
            <Link
              href={navContent.routes.school}
              className="text-white/70 hover:text-white transition-colors duration-200"
            >
              {navContent.mainNav.school}
            </Link>
            <Link
              href={navContent.routes.shop}
              className="text-white/70 hover:text-white transition-colors duration-200"
            >
              {navContent.mainNav.shop}
            </Link>
            <Link
              href={navContent.routes.blog}
              className="text-white/70 hover:text-white transition-colors duration-200"
            >
              {navContent.mainNav.blog}
            </Link>

            {/* About Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsAboutOpen(!isAboutOpen)}
                onBlur={() => setTimeout(() => setIsAboutOpen(false), 200)}
                className="flex items-center text-white/70 hover:text-white transition-colors duration-200 focus:outline-none"
              >
                {navContent.mainNav.about}
                <ChevronDown
                  className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                    isAboutOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isAboutOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  <Link
                    href={navContent.routes.aboutOlesea}
                    className="block px-4 py-2 text-sm text-black/70 hover:bg-white-50 hover:text-black transition-colors duration-200"
                  >
                    {navContent.aboutDropdown.aboutOlesea}
                  </Link>
                  <Link
                    href={navContent.routes.aboutCompany}
                    className="block px-4 py-2 text-sm text-black/70 hover:bg-white-50 hover:text-black transition-colors duration-200"
                  >
                    {navContent.aboutDropdown.aboutCompany}
                  </Link>
                </div>
              )}
            </div>

            <Link
              href={navContent.routes.contact}
              className="text-white/70 hover:text-white transition-colors duration-200 font-medium"
            >
              {navContent.mainNav.contact}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white/70 hover:text-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white-500"
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
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href={navContent.routes.services}
                className="block px-3 py-2 rounded-md text-base font-medium text-white/70 hover:text-white hover:bg-gray-50 transition-colors duration-200"
              >
                {navContent.mainNav.services}
              </Link>
              <Link
                href={navContent.routes.school}
                className="block px-3 py-2 rounded-md text-base font-medium text-white/70 hover:text-white hover:bg-gray-50 transition-colors duration-200"
              >
                {navContent.mainNav.school}
              </Link>
              <Link
                href={navContent.routes.shop}
                className="block px-3 py-2 rounded-md text-base font-medium text-white/70 hover:text-white hover:bg-gray-50 transition-colors duration-200"
              >
                {navContent.mainNav.shop}
              </Link>
              <Link
                href={navContent.routes.blog}
                className="block px-3 py-2 rounded-md text-base font-medium text-white/70 hover:text-white hover:bg-gray-50 transition-colors duration-200"
              >
                {navContent.mainNav.blog}
              </Link>

              {/* Mobile About Dropdown */}
              <div>
                <button
                  onClick={() => setIsAboutOpen(!isAboutOpen)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-md text-base font-medium text-white/70 hover:text-white hover:bg-gray-50 transition-colors duration-200"
                >
                  {navContent.mainNav.about}
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${
                      isAboutOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isAboutOpen && (
                  <div className="pl-6">
                    <Link
                      href={navContent.routes.aboutOlesea}
                      className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-white hover:bg-gray-50 transition-colors duration-200"
                    >
                      {navContent.aboutDropdown.aboutOlesea}
                    </Link>
                    <Link
                      href={navContent.routes.aboutCompany}
                      className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-white hover:bg-gray-50 transition-colors duration-200"
                    >
                      {navContent.aboutDropdown.aboutCompany}
                    </Link>
                  </div>
                )}
              </div>

              <Link
                href={navContent.routes.contact}
                className="block px-3 py-2 rounded-md text-base font-medium text-white/70 hover:text-white hover:bg-gray-50 transition-colors duration-200"
              >
                {navContent.mainNav.contact}
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
