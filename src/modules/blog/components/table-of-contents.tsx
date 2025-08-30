// src/modules/blog/components/table-of-contents.tsx
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
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
  const [progress, setProgress] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      // Auto-collapse on mobile
      if (window.innerWidth < 1024) {
        setIsExpanded(false);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            
            // Calculate read progress for each section
            const rect = entry.boundingClientRect;
            const viewportHeight = window.innerHeight;
            const sectionProgress = Math.min(
              Math.max(0, (viewportHeight - rect.top) / rect.height),
              1
            );
            
            setProgress(prev => ({
              ...prev,
              [entry.target.id]: sectionProgress
            }));
          }
        });
      },
      {
        rootMargin: "-20% 0% -70% 0%",
        threshold: [0, 0.25, 0.5, 0.75, 1]
      }
    );

    // Observe all headings with IDs
    const headings = document.querySelectorAll("h1[id], h2[id], h3[id]");
    headings.forEach((heading) => observer.observe(heading));

    return () => {
      headings.forEach((heading) => observer.unobserve(heading));
    };
  }, [items]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Adjust for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }

    // Collapse on mobile after clicking
    if (isMobile) {
      setIsExpanded(false);
    }
  };

  const renderItem = (item: TocItem, index: number) => {
    const isActive = activeId === item.id;
    const itemProgress = progress[item.id] || 0;
    const indent = item.level * 16;

    return (
      <motion.li
        key={item.id}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.05 }}
        style={{ marginLeft: `${indent}px` }}
      >
        <button
          onClick={() => handleClick(item.id)}
          className={cn(
            "group flex items-center gap-2 w-full text-left py-2 pr-2 rounded-lg transition-all duration-300",
            "hover:bg-[#FFF9F5] hover:pl-3",
            isActive && "bg-gradient-to-r from-[#FFF9F5] to-transparent pl-3"
          )}
        >
          {/* Progress Indicator */}
          <div className="relative flex-shrink-0">
            {item.level === 1 ? (
              <div className="relative w-3 h-3">
                <Circle className={cn(
                  "w-3 h-3 transition-colors",
                  isActive ? "text-[#D4A574]" : "text-[#451C15]/30"
                )} />
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-[#D4A574]"
                    initial={{ scale: 0 }}
                    animate={{ scale: itemProgress }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </div>
            ) : (
              <Dot className={cn(
                "w-4 h-4 transition-colors",
                isActive ? "text-[#D4A574]" : "text-[#451C15]/30"
              )} />
            )}
          </div>

          {/* Title */}
          <span className={cn(
            "text-sm transition-colors duration-300 line-clamp-2 [font-family:var(--font-inter)]",
            isActive 
              ? "text-[#D4A574] font-medium" 
              : "text-[#451C15]/70 group-hover:text-[#451C15]",
            item.level === 1 && "font-medium"
          )}>
            {item.title}
          </span>

          {/* Active Indicator Arrow */}
          {isActive && (
            <motion.div
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              className="ml-auto"
            >
              <ChevronRight className="w-3 h-3 text-[#D4A574]" />
            </motion.div>
          )}
        </button>

        {/* Children */}
        {item.children && item.children.length > 0 && (
          <ul className="mt-1">
            {item.children.map((child, childIndex) => 
              renderItem(child, index + childIndex + 1)
            )}
          </ul>
        )}
      </motion.li>
    );
  };

  // Desktop Version (Sticky Sidebar)
  const DesktopTOC = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "bg-white rounded-2xl p-6 shadow-lg",
        className
      )}
    >
      <div className="flex items-center gap-2 mb-5">
        <ListOrdered className="w-5 h-5 text-[#D4A574]" />
        <h3 className="text-lg font-medium text-[#451C15] [font-family:var(--font-inter)]">
          Table of Contents
        </h3>
      </div>

      <nav aria-label="Table of contents">
        <ul className="space-y-1">
          {items.map((item, index) => renderItem(item, index))}
        </ul>
      </nav>

      {/* Reading Progress Bar */}
      <div className="mt-6 pt-4 border-t border-[#451C15]/10">
        <div className="flex items-center justify-between text-xs text-[#451C15]/60 [font-family:var(--font-inter)] mb-2">
          <span>Reading Progress</span>
          <span>{Math.round(Object.values(progress).reduce((a, b) => a + b, 0) / items.length * 100)}%</span>
        </div>
        <div className="h-1.5 bg-[#451C15]/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#D4A574] to-[#A67B5B]"
            initial={{ width: 0 }}
            animate={{ 
              width: `${Object.values(progress).reduce((a, b) => a + b, 0) / items.length * 100}%` 
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>
    </motion.div>
  );

  // Mobile Version (Collapsible)
  const MobileTOC = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "bg-gradient-to-br from-[#FFF9F5] to-white rounded-2xl shadow-lg overflow-hidden",
        className
      )}
    >
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
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-5 h-5 text-[#451C15]/60" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav aria-label="Table of contents" className="px-4 pb-4">
              <ul className="space-y-1">
                {items.map((item, index) => renderItem(item, index))}
              </ul>
            </nav>

            {/* Mobile Progress Bar */}
            <div className="px-4 pb-4">
              <div className="h-1 bg-[#451C15]/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#D4A574] to-[#A67B5B]"
                  initial={{ width: 0 }}
                  animate={{ 
                    width: `${Object.values(progress).reduce((a, b) => a + b, 0) / items.length * 100}%` 
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );

  // Return appropriate version based on screen size
  return isMobile ? <MobileTOC /> : <DesktopTOC />;
};