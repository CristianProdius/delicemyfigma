// src/modules/blog/components/share-buttons.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Share2, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Link2, 
  Mail,
  MessageCircle,
  Send,
  Check,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ShareButtonsProps {
  url: string;
  title: string;
  description?: string;
  className?: string;
}

export const ShareButtons = ({ 
  url, 
  title, 
  description = "",
  className 
}: ShareButtonsProps) => {
  const [copied, setCopied] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  const shareLinks = [
    {
      name: "Facebook",
      icon: Facebook,
      color: "hover:bg-[#1877F2]",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    },
    {
      name: "Twitter",
      icon: Twitter,
      color: "hover:bg-[#1DA1F2]",
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      color: "hover:bg-[#0A66C2]",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    },
    {
      name: "WhatsApp",
      icon: MessageCircle,
      color: "hover:bg-[#25D366]",
      url: `https://wa.me/?text=${encodeURIComponent(title + " " + url)}`,
    },
    {
      name: "Telegram",
      icon: Send,
      color: "hover:bg-[#0088cc]",
      url: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    },
    {
      name: "Email",
      icon: Mail,
      color: "hover:bg-[#451C15]",
      url: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(description + "\n\n" + url)}`,
    },
  ];

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url,
        });
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          console.error("Error sharing:", err);
        }
      }
    } else {
      setShowShareMenu(true);
    }
  };

  return (
    <div className={cn("relative", className)}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex items-center justify-between py-8 border-t border-[#451C15]/10"
      >
        <div className="flex items-center gap-3">
          <Share2 className="w-5 h-5 text-[#D4A574]" />
          <span className="text-sm font-medium text-[#451C15] [font-family:var(--font-inter)]">
            Share this article
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Desktop Share Buttons */}
          <div className="hidden sm:flex items-center gap-2">
            {shareLinks.slice(0, 4).map((link) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "p-2.5 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-300 group",
                  link.color
                )}
                aria-label={`Share on ${link.name}`}
              >
                <link.icon className="w-4 h-4 text-[#451C15] group-hover:text-white transition-colors" />
              </motion.a>
            ))}
          </div>

          {/* Copy Link Button */}
          <motion.button
            onClick={handleCopyLink}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="p-2.5 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-300 group hover:bg-[#451C15]"
            aria-label="Copy link"
          >
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.div
                  key="check"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <Check className="w-4 h-4 text-green-500" />
                </motion.div>
              ) : (
                <motion.div
                  key="link"
                  initial={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <Link2 className="w-4 h-4 text-[#451C15] group-hover:text-white transition-colors" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Mobile Share Button */}
          <motion.button
            onClick={handleNativeShare}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="sm:hidden p-2.5 rounded-full bg-gradient-to-r from-[#D4A574] to-[#A67B5B] shadow-md hover:shadow-lg transition-all duration-300"
            aria-label="Share"
          >
            <Share2 className="w-4 h-4 text-white" />
          </motion.button>

          {/* More Options (Desktop) */}
          <div className="hidden sm:block relative">
            <motion.button
              onClick={() => setShowShareMenu(!showShareMenu)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-3 py-2 rounded-full bg-gradient-to-r from-[#D4A574] to-[#A67B5B] text-white shadow-md hover:shadow-lg transition-all duration-300 text-sm font-medium [font-family:var(--font-inter)]"
            >
              More
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Share Menu Dropdown */}
      <AnimatePresence>
        {showShareMenu && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowShareMenu(false)}
              className="fixed inset-0 z-40 sm:hidden"
            />

            {/* Menu */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              className="absolute right-0 top-full mt-2 w-64 sm:w-56 bg-white rounded-2xl shadow-2xl overflow-hidden z-50"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-[#451C15]/10">
                <h4 className="text-sm font-medium text-[#451C15] [font-family:var(--font-inter)]">
                  Share via
                </h4>
                <button
                  onClick={() => setShowShareMenu(false)}
                  className="p-1 rounded-full hover:bg-[#451C15]/5 transition-colors"
                >
                  <X className="w-4 h-4 text-[#451C15]/50" />
                </button>
              </div>

              {/* Share Options */}
              <div className="p-2">
                {shareLinks.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setShowShareMenu(false)}
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#FFF9F5] transition-colors group"
                  >
                    <link.icon className="w-4 h-4 text-[#451C15]/60 group-hover:text-[#451C15]" />
                    <span className="text-sm text-[#451C15]/80 group-hover:text-[#451C15] [font-family:var(--font-inter)]">
                      {link.name}
                    </span>
                  </motion.a>
                ))}
                
                {/* Copy Link Option */}
                <motion.button
                  onClick={() => {
                    handleCopyLink();
                    setShowShareMenu(false);
                  }}
                  whileHover={{ x: 4 }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#FFF9F5] transition-colors group"
                >
                  <Link2 className="w-4 h-4 text-[#451C15]/60 group-hover:text-[#451C15]" />
                  <span className="text-sm text-[#451C15]/80 group-hover:text-[#451C15] [font-family:var(--font-inter)]">
                    Copy link
                  </span>
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Copied Toast */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 20, x: "-50%" }}
            className="fixed bottom-4 left-1/2 z-50 px-4 py-2 bg-[#451C15] text-white rounded-full shadow-lg text-sm [font-family:var(--font-inter)]"
          >
            Link copied to clipboard!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};