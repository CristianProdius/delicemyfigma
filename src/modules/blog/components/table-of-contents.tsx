// src/modules/blog/components/table-of-contents.tsx
"use client";

import { useEffect, useState, useRef } from "react";
import {
  ListOrdered,
  ChevronRight,
  ChevronDown,
  Circle,
  Dot
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TocItem {
  id: string;
  title: string;
  level: number;
  children?: TocItem[];
}

interface TableOfContentsProps {
  items: TocItem[];
  className?: string;
}

export const TableOfContents = ({ items, className }: TableOfContentsProps) => {
  const [activeId, setActiveId] = useState<string>("");
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  
  // Use refs to avoid re-renders
  const ticking = useRef(false);
  const lastActiveId = useRef("");

  // Initialize once on mount
  useEffect(() => {
    const mobile = window.innerWidth < 1024;
    setIsMobile(mobile);
    if (mobile) {
      setIsExpanded(false);
    }
    setIsReady(true);

    // Handle resize
    const handleResize = () => {
      const newMobile = window.innerWidth < 1024;
      if (newMobile !== mobile) {
        setIsMobile(newMobile);
        if (newMobile) {
          setIsExpanded(false);
        }
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Simpler scroll tracking
  useEffect(() => {
    if (!isReady) return;

    const updateActiveSection = () => {
      const headings = document.querySelectorAll("h1[id], h2[id], h3[id]");
      const scrollPosition = window.scrollY + 150; // Offset for fixed header

      let currentActiveId = "";
      
      // Find which heading is currently in view
      headings.forEach((heading) => {
        const element = heading as HTMLElement;
        if (element.offsetTop <= scrollPosition) {
          currentActiveId = element.id;
        }
      });

      // Only update if changed to avoid re-renders
      if (currentActiveId && currentActiveId !== lastActiveId.current) {
        lastActiveId.current = currentActiveId;
        setActiveId(currentActiveId);
      }

      // Calculate overall progress
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const scrollPercent = scrollTop / (documentHeight - windowHeight);
      setScrollProgress(Math.min(100, Math.max(0, Math.round(scrollPercent * 100))));
    };

    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          updateActiveSection();
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    // Initial check
    updateActiveSection();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isReady]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });

      if (isMobile) {
        setIsExpanded(false);
      }
    }
  };

  const renderItem = (item: TocItem) => {
    const isActive = activeId === item.id;
    const indent = item.level * 16;

    return (
      <li
        key={item.id}
        style={{ marginLeft: `${indent}px` }}
      >
        <button
          onClick={() => handleClick(item.id)}
          className={cn(
            "group flex items-center gap-2 w-full text-left py-2 pr-2 rounded-lg transition-colors",
            "hover:bg-[#FFF9F5] hover:pl-3",
            isActive && "bg-gradient-to-r from-[#FFF9F5] to-transparent pl-3"
          )}
        >
          <div className="relative flex-shrink-0">
            {item.level === 1 ? (
              <Circle className={cn(
                "w-3 h-3 transition-colors",
                isActive ? "text-[#D4A574]" : "text-[#451C15]/30"
              )} />
            ) : (
              <Dot className={cn(
                "w-4 h-4 transition-colors",
                isActive ? "text-[#D4A574]" : "text-[#451C15]/30"
              )} />
            )}
          </div>

          <span className={cn(
            "text-sm transition-colors line-clamp-2 [font-family:var(--font-inter)]",
            isActive
              ? "text-[#D4A574] font-medium"
              : "text-[#451C15]/70 group-hover:text-[#451C15]",
            item.level === 1 && "font-medium"
          )}>
            {item.title}
          </span>

          {isActive && (
            <ChevronRight className="w-3 h-3 text-[#D4A574] ml-auto" />
          )}
        </button>

        {item.children && item.children.length > 0 && (
          <ul className="mt-1">
            {item.children.map((child) => renderItem(child))}
          </ul>
        )}
      </li>
    );
  };

  if (!isReady) {
    return (
      <div className={cn("bg-white rounded-2xl p-6 shadow-lg", className)}>
        <div className="flex items-center gap-2 mb-5">
          <ListOrdered className="w-5 h-5 text-[#D4A574]" />
          <h3 className="text-lg font-medium text-[#451C15] [font-family:var(--font-inter)]">
            Table of Contents
          </h3>
        </div>
        <div className="h-32 animate-pulse bg-[#451C15]/5 rounded" />
      </div>
    );
  }

  // Desktop Version
  if (!isMobile) {
    return (
      <div className={cn("bg-white rounded-2xl p-6 shadow-lg", className)}>
        <div className="flex items-center gap-2 mb-5">
          <ListOrdered className="w-5 h-5 text-[#D4A574]" />
          <h3 className="text-lg font-medium text-[#451C15] [font-family:var(--font-inter)]">
            Table of Contents
          </h3>
        </div>

        <nav aria-label="Table of contents">
          <ul className="space-y-1">
            {items.map((item) => renderItem(item))}
          </ul>
        </nav>

        {/* Progress Bar */}
        <div className="mt-6 pt-4 border-t border-[#451C15]/10">
          <div className="flex items-center justify-between text-xs text-[#451C15]/60 [font-family:var(--font-inter)] mb-2">
            <span>Reading Progress</span>
            <span>{scrollProgress}%</span>
          </div>
          <div className="h-1.5 bg-[#451C15]/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#D4A574] to-[#A67B5B] transition-all duration-150 ease-out"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>
        </div>
      </div>
    );
  }

  // Mobile Version
  return (
    <div className={cn("bg-gradient-to-br from-[#FFF9F5] to-white rounded-2xl shadow-lg overflow-hidden", className)}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full p-4 hover:bg-white/50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <ListOrdered className="w-5 h-5 text-[#D4A574]" />
          <h3 className="text-base font-medium text-[#451C15] [font-family:var(--font-inter)]">
            Table of Contents
          </h3>
        </div>
        <ChevronDown
          className={cn(
            "w-5 h-5 text-[#451C15]/60 transition-transform duration-300",
            isExpanded && "rotate-180"
          )}
        />
      </button>

      {isExpanded && (
        <div>
          <nav aria-label="Table of contents" className="px-4 pb-4">
            <ul className="space-y-1">
              {items.map((item) => renderItem(item))}
            </ul>
          </nav>
          
          {/* Mobile Progress Bar */}
          <div className="px-4 pb-4">
            <div className="h-1 bg-[#451C15]/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#D4A574] to-[#A67B5B] transition-all duration-150 ease-out"
                style={{ width: `${scrollProgress}%` }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};