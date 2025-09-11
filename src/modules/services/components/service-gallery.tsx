"use client";

import { motion } from "motion/react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Service } from "@/types/strapi";
import { getStrapiMediaUrl } from "@/lib/strapi";

interface ServiceGalleryProps {
  service: Service;
}

export const ServiceGallery = ({ service }: ServiceGalleryProps) => {
  const [activeImage, setActiveImage] = useState(0);
  
  // Auto-play functionality - must be before early returns
  useEffect(() => {
    const gallerySettings = service.serviceGallery?.gallerySettings;
    const galleryImages = service.serviceGallery?.galleryImages;
    
    if (gallerySettings?.autoplay && galleryImages && galleryImages.length > 1) {
      const interval = setInterval(() => {
        setActiveImage((prev) => (prev + 1) % galleryImages.length);
      }, gallerySettings.autoplayInterval || 5000);
      
      return () => clearInterval(interval);
    }
  }, [activeImage, service.serviceGallery]);
  
  // Return null if no serviceGallery data
  if (!service.serviceGallery) {
    return null;
  }

  const { galleryHeader, galleryImages, gallerySettings } = service.serviceGallery;
  
  // Return null if no images
  if (!galleryImages || galleryImages.length === 0) {
    return null;
  }

  const nextImage = () => {
    setActiveImage((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setActiveImage((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#FFF9F5] to-white">
      <div className="max-w-[95%] xl:max-w-[90%] mx-auto">
        {/* Gallery Header */}
        {galleryHeader && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            {galleryHeader.title && (
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#451C15] mb-4 [font-family:var(--font-playfair)]">
                {galleryHeader.title}
              </h2>
            )}
            {galleryHeader.subtitle && (
              <p className="text-lg text-[#451C15]/60 max-w-2xl mx-auto [font-family:var(--font-inter)]">
                {galleryHeader.subtitle}
              </p>
            )}
          </motion.div>
        )}

        {/* Main Gallery Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative aspect-[16/9] sm:aspect-[21/9] max-w-6xl mx-auto rounded-2xl overflow-hidden mb-8"
        >
          {galleryImages[activeImage] && (
            <Image
              src={getStrapiMediaUrl(galleryImages[activeImage]) || ''}
              alt={galleryImages[activeImage].alternativeText || `Gallery image ${activeImage + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
            />
          )}
          
          {/* Gallery Navigation */}
          {galleryImages.length > 1 && (
            <>
              <Button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-[#451C15] rounded-full p-2 shadow-lg"
                size="icon"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-[#451C15] rounded-full p-2 shadow-lg"
                size="icon"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </>
          )}
          
          {/* Image Counter */}
          {gallerySettings?.showCounter !== false && galleryImages.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm">
              {activeImage + 1} / {galleryImages.length}
            </div>
          )}
        </motion.div>

        {/* Thumbnail Navigation */}
        {gallerySettings?.showThumbnails !== false && galleryImages.length > 1 && (
          <div className="flex gap-4 justify-center overflow-x-auto pb-4">
            {galleryImages.map((image, index) => {
              const imageUrl = getStrapiMediaUrl(image);
              if (!imageUrl) return null;
              
              return (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  viewport={{ once: true }}
                  onClick={() => setActiveImage(index)}
                  className={`relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 transition-all duration-300 ${
                    activeImage === index
                      ? "ring-2 ring-[#D4A574] scale-105"
                      : "opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={imageUrl}
                    alt={image.alternativeText || `Thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </motion.button>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};