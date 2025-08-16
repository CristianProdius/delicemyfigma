// src/modules/contact/components/location-map.tsx

"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import {
  MapPin,
  Navigation,
  Car,
  Train,
  Clock,
  Phone,
  Globe,
  Building,
  Sparkles,
  Star,
  ArrowUpRight,
  Info,
} from "lucide-react";
import { contactContent } from "../data/contact-content";

export const LocationMap = () => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const location = contactContent.location;

  // Google Maps embed URL with custom styling
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${location.coordinates.lat},${location.coordinates.lng}&zoom=15&maptype=roadmap`;

  // Alternative: Static map image for demo purposes
  const staticMapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${location.coordinates.lat},${location.coordinates.lng}&zoom=15&size=800x600&maptype=roadmap&markers=color:0x451C15%7C${location.coordinates.lat},${location.coordinates.lng}&style=feature:all|element:geometry|color:0xf5f5f5&style=feature:all|element:labels.text.fill|color:0x616161&style=feature:all|element:labels.text.stroke|color:0xf5f5f5&style=feature:administrative.land_parcel|element:labels.text.fill|color:0xbdbdbd&style=feature:poi|element:geometry|color:0xeeeeee&style=feature:poi|element:labels.text.fill|color:0x757575&style=feature:poi.park|element:geometry|color:0xe5e5e5&style=feature:road|element:geometry|color:0xffffff&style=feature:road.arterial|element:labels.text.fill|color:0x757575&style=feature:road.highway|element:geometry|color:0xdadada&style=feature:road.highway|element:labels.text.fill|color:0x616161&style=feature:road.local|element:labels.text.fill|color:0x9e9e9e&style=feature:transit.line|element:geometry|color:0xe5e5e5&style=feature:water|element:geometry|color:0xc9c9c9`;

  const locationDetails = [
    {
      id: "address",
      icon: MapPin,
      title: "Atelier Address",
      content: [
        location.address,
        `${location.city}, ${location.postalCode}`,
        location.country,
      ],
      highlight: true,
    },
    {
      id: "landmark",
      icon: Building,
      title: "Nearby Landmark",
      content: [location.landmark || "Union Square Area"],
      subtext: "2-minute walk from main square",
    },
    {
      id: "parking",
      icon: Car,
      title: "Parking Options",
      content: [
        location.parking || "Valet parking available",
        "Public garage nearby (2 min walk)",
      ],
      badge: "Valet Available",
    },
    {
      id: "transport",
      icon: Train,
      title: "Public Transport",
      content: [
        "Powell Street Station (5 min)",
        "Bus lines: 38, 38R, 45",
        "Cable car stop nearby",
      ],
    },
    {
      id: "hours",
      icon: Clock,
      title: "Visit Us Today",
      content: [
        "Mon-Fri: 9:00 AM - 6:00 PM",
        "Saturday: 10:00 AM - 5:00 PM",
        "Sunday: Private events only",
      ],
      link: "#hours",
    },
  ];

  const handleGetDirections = () => {
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${location.coordinates.lat},${location.coordinates.lng}`;
    window.open(googleMapsUrl, "_blank");
  };

  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-[#F8F6F3]">
      <div className="max-w-[95%] xl:max-w-[90%] mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl [font-family:var(--font-playfair)] text-[#451C15] mb-4">
            Find Our Atelier
          </h2>
          <p className="text-lg text-[#451C15]/70 [font-family:var(--font-inter)] max-w-2xl mx-auto">
            Located in the heart of {location.city}, our chocolate atelier
            awaits your visit
          </p>

          {/* Decorative Elements */}
          <div className="flex justify-center items-center gap-4 mt-6">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ rotate: 360 }}
                transition={{
                  duration: 10 + i * 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <Star className="w-4 h-4 text-[#D4A574] fill-[#D4A574]" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Map and Details Container */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map Container - 2/3 width on desktop */}
          <motion.div
            className="lg:col-span-2 relative group"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              {/* Map Loading Skeleton */}
              {!mapLoaded && (
                <div className="absolute inset-0 bg-[#F8F6F3] animate-pulse flex items-center justify-center">
                  <div className="text-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <Sparkles className="w-8 h-8 text-[#D4A574] mx-auto mb-2" />
                    </motion.div>
                    <p className="text-[#451C15]/60 [font-family:var(--font-inter)]">
                      Loading map...
                    </p>
                  </div>
                </div>
              )}

              {/* Google Maps Iframe */}
              <iframe
                src={mapUrl}
                width="100%"
                height="500"
                style={{
                  border: 0,
                  filter: "sepia(10%) hue-rotate(10deg) contrast(0.95)",
                }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                onLoad={() => setMapLoaded(true)}
                className="w-full h-[400px] lg:h-[600px]"
                title="Atelier Location Map"
              />

              {/* Map Overlay with Custom Marker */}
              <motion.div
                className="absolute top-4 left-4 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#451C15] rounded-xl">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#451C15] [font-family:var(--font-playfair)]">
                      DeliceMy Atelier
                    </p>
                    <p className="text-xs text-[#451C15]/60 [font-family:var(--font-inter)]">
                      Artisanal Chocolate
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Get Directions Button - Floating */}
              <motion.button
                onClick={handleGetDirections}
                className="absolute bottom-4 right-4 bg-[#451C15] text-white px-6 py-3 rounded-full flex items-center gap-2 shadow-xl hover:bg-[#451C15]/90 transition-all group/btn"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Navigation className="w-4 h-4" />
                <span className="[font-family:var(--font-inter)] font-medium">
                  Get Directions
                </span>
                <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
              </motion.button>
            </div>
          </motion.div>

          {/* Location Details - 1/3 width on desktop */}
          <div className="space-y-4">
            {locationDetails.map((detail, index) => {
              const Icon = detail.icon;

              return (
                <motion.div
                  key={detail.id}
                  className="relative group"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  whileHover={{ y: -3 }}
                >
                  <div
                    className={`
                    relative bg-white/95 backdrop-blur-sm border rounded-2xl p-5 shadow-lg
                    transition-all duration-300 hover:shadow-xl
                    ${
                      detail.highlight
                        ? "border-[#D4A574]/30 bg-gradient-to-br from-white to-[#D4A574]/5"
                        : "border-[#451C15]/10"
                    }
                  `}
                  >
                    {/* Badge */}
                    {detail.badge && (
                      <motion.div
                        className="absolute -top-2 -right-2 bg-[#D4A574] text-white text-xs px-3 py-1 rounded-full shadow-md"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          delay: 0.5 + index * 0.1,
                          type: "spring",
                        }}
                      >
                        {detail.badge}
                      </motion.div>
                    )}

                    <div className="flex items-start gap-3">
                      {/* Icon Container */}
                      <div className="relative">
                        <motion.div
                          className="absolute inset-0 bg-[#D4A574]/20 rounded-xl blur-lg"
                          animate={
                            detail.highlight
                              ? {
                                  scale: [1, 1.3, 1],
                                }
                              : {}
                          }
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        />
                        <div
                          className={`
                          relative p-2.5 rounded-xl
                          ${
                            detail.highlight
                              ? "bg-gradient-to-br from-[#D4A574] to-[#D4A574]/80"
                              : "bg-[#451C15]/10"
                          }
                        `}
                        >
                          <Icon
                            className={`
                            w-5 h-5
                            ${
                              detail.highlight ? "text-white" : "text-[#451C15]"
                            }
                          `}
                          />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <h3 className="font-semibold text-[#451C15] [font-family:var(--font-inter)] mb-2">
                          {detail.title}
                        </h3>
                        {detail.content.map((line, i) => (
                          <p
                            key={i}
                            className={`
                              text-sm [font-family:var(--font-inter)]
                              ${
                                i === 0
                                  ? "text-[#451C15]/80"
                                  : "text-[#451C15]/60"
                              }
                              ${i > 0 ? "mt-1" : ""}
                            `}
                          >
                            {line}
                          </p>
                        ))}
                        {detail.subtext && (
                          <p className="text-xs text-[#D4A574] [font-family:var(--font-inter)] mt-2 flex items-center gap-1">
                            <Info className="w-3 h-3" />
                            {detail.subtext}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {/* Contact Card */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <div className="bg-gradient-to-br from-[#451C15] to-[#451C15]/90 text-white rounded-2xl p-5 shadow-xl">
                <div className="flex items-center gap-2 mb-3">
                  <Phone className="w-5 h-5 text-[#D4A574]" />
                  <h3 className="font-semibold [font-family:var(--font-inter)]">
                    Quick Contact
                  </h3>
                </div>
                <a
                  href="tel:+15551234567"
                  className="text-white/90 hover:text-white transition-colors [font-family:var(--font-inter)] text-sm"
                >
                  +1 (555) 123-4567
                </a>
                <p className="text-white/60 text-xs [font-family:var(--font-inter)] mt-1">
                  Call for reservations
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Action Bar */}
        <motion.div
          className="mt-12 p-6 bg-gradient-to-r from-[#D4A574]/10 via-[#E8B4B8]/10 to-[#D4A574]/10 rounded-3xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <p className="text-[#451C15] font-semibold [font-family:var(--font-playfair)] text-lg">
                Ready to Visit?
              </p>
              <p className="text-[#451C15]/60 text-sm [font-family:var(--font-inter)] mt-1">
                Experience the art of chocolate making at our atelier
              </p>
            </div>
            <div className="flex gap-3">
              <motion.button
                onClick={handleGetDirections}
                className="px-6 py-3 bg-white border border-[#451C15]/20 text-[#451C15] rounded-full flex items-center gap-2 hover:bg-[#F8F6F3] transition-all [font-family:var(--font-inter)] font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Navigation className="w-4 h-4" />
                Directions
              </motion.button>
              <motion.a
                href="tel:+15551234567"
                className="px-6 py-3 bg-[#451C15] text-white rounded-full flex items-center gap-2 hover:bg-[#451C15]/90 transition-all [font-family:var(--font-inter)] font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Phone className="w-4 h-4" />
                Call Now
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
