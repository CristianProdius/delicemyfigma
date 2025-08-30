// src/modules/services/views/service-detail-view.tsx
"use client";

import { motion } from "motion/react";
import { useRef, useState } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
  Quote,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type {
  Service,
  ServiceFAQ,
  ServiceTestimonial,
} from "../data/services-content";

// Import all the custom components you've created
import { ServiceDetailHero } from "../components/service-detail-hero";
import { ServiceFeatures } from "../components/service-features";
import { ServicePricing } from "../components/service-pricing";
import { ServiceCTA } from "../components/service-cta";

interface ServiceDetailViewProps {
  service: Service;
}

// Photo Gallery Component (keep this as it's specific to detail view)
const PhotoGallery = ({
  images,
  title,
}: {
  images: string[];
  title: string;
}) => {
  const [activeImage, setActiveImage] = useState(0);

  if (!images || images.length === 0) return null;

  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#FFF9F5] to-white">
      <div className="max-w-[95%] xl:max-w-[90%] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#451C15] mb-4 [font-family:var(--font-playfair)]">
            Gallery
          </h2>
          <p className="text-lg text-[#451C15]/60 max-w-2xl mx-auto [font-family:var(--font-inter)]">
            A glimpse into the magic we create
          </p>
        </motion.div>

        {/* Main Gallery Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative h-[400px] sm:h-[500px] lg:h-[600px] rounded-3xl overflow-hidden mb-6"
        >
          <Image
            src={images[activeImage]}
            alt={`${title} gallery image ${activeImage + 1}`}
            fill
            className="object-cover"
          />

          {/* Navigation Arrows */}
          <button
            onClick={() =>
              setActiveImage((prev) =>
                prev === 0 ? images.length - 1 : prev - 1
              )
            }
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={() =>
              setActiveImage((prev) =>
                prev === images.length - 1 ? 0 : prev + 1
              )
            }
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-colors"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </motion.div>

        {/* Thumbnail Strip */}
        <div className="flex gap-4 overflow-x-auto scrollbar-hide">
          {images.map((image, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              onClick={() => setActiveImage(index)}
              className={cn(
                "relative flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32 rounded-xl overflow-hidden transition-all duration-300",
                activeImage === index
                  ? "ring-2 ring-offset-2 scale-110"
                  : "opacity-70 hover:opacity-100"
              )}
            >
              <Image
                src={image}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
};

// Testimonials Carousel Component (keep for specific carousel functionality)
const TestimonialsCarousel = ({
  testimonials,
  accentColor,
}: {
  testimonials: ServiceTestimonial[];
  accentColor: string;  
}) => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[95%] xl:max-w-[90%] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#451C15] mb-4 [font-family:var(--font-playfair)]">
            What Our Clients Say
          </h2>
          <p className="text-lg text-[#451C15]/60 max-w-2xl mx-auto [font-family:var(--font-inter)]">
            Real experiences from real people
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <Card className="bg-white/95 backdrop-blur-sm border border-[#451C15]/10 p-8 lg:p-12 rounded-3xl">
                    <div className="flex flex-col items-center text-center">
                      {/* Use accentColor for the Quote icon */}
                      <Quote 
                        className="w-10 h-10 mb-6" 
                        style={{ color: `${accentColor}30` }} // Using accentColor with opacity
                      />

                      <div className="flex gap-1 mb-6">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-5 h-5"
                            style={{ 
                              fill: accentColor, // Using accentColor for star fill
                              color: accentColor // Using accentColor for star stroke
                            }}
                          />
                        ))}
                      </div>

                      <p className="text-lg lg:text-xl text-[#451C15]/80 mb-8 leading-relaxed italic [font-family:var(--font-playfair)]">
                        &quot;{testimonial.content}&quot;
                      </p>

                      <div>
                        <p className="font-medium text-[#451C15] [font-family:var(--font-inter)]">
                          {testimonial.name}
                        </p>
                        {testimonial.role && (
                          <p className="text-sm text-[#451C15]/60 [font-family:var(--font-inter)]">
                            {testimonial.role}
                            {testimonial.company && `, ${testimonial.company}`}
                          </p>
                        )}
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Dots - also use accentColor */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTestimonial(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  index === activeTestimonial
                    ? "w-8"
                    : "hover:opacity-60"
                )}
                style={{
                  backgroundColor: index === activeTestimonial 
                    ? accentColor 
                    : `${accentColor}33` // 20% opacity in hex
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// FAQ Accordion Component (simplified version)
const FAQAccordion = ({
  faqs,
  accentColor = "#D4A574",
}: {
  faqs: ServiceFAQ[];
  accentColor?: string;
}) => {
  const [openItems, setOpenItems] = useState<string[]>([]);

  if (!faqs || faqs.length === 0) return null;

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-[#FFF9F5]">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#451C15] mb-4 [font-family:var(--font-playfair)]">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-[#451C15]/60 max-w-2xl mx-auto [font-family:var(--font-inter)]">
            Everything you need to know
          </p>
        </motion.div>

        <Card className="bg-white/95 backdrop-blur-sm border border-[#451C15]/10 rounded-3xl p-8 lg:p-12">
          <div className="space-y-0">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="border-b border-[#451C15]/10 last:border-0"
              >
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full py-6 flex items-center justify-between text-left hover:text-[#A67B5B] transition-colors duration-300"
                >
                  <h4 className="text-lg font-medium text-[#451C15] pr-8 [font-family:var(--font-inter)]">
                    {faq.question}
                  </h4>
                  <motion.div
                    animate={{ rotate: openItems.includes(faq.id) ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    {openItems.includes(faq.id) ? (
                      <Minus
                        className="w-5 h-5"
                        style={{ color: accentColor }}
                      />
                    ) : (
                      <Plus className="w-5 h-5 text-[#451C15]/60" />
                    )}
                  </motion.div>
                </button>

                <motion.div
                  initial={false}
                  animate={{
                    height: openItems.includes(faq.id) ? "auto" : 0,
                    opacity: openItems.includes(faq.id) ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="pb-6 text-[#451C15]/60 leading-relaxed [font-family:var(--font-inter)]">
                    {faq.answer}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
};

// Description Section Component
const DescriptionSection = ({ service }: { service: Service }) => {
  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 max-w-[95%] xl:max-w-[90%] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="lg:col-span-2"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#451C15] mb-8 [font-family:var(--font-playfair)]">
            About This Service
          </h2>
          <p className="text-lg text-[#451C15]/70 leading-relaxed mb-8 [font-family:var(--font-inter)]">
            {service.longDescription}
          </p>
        </motion.div>

        {/* Sidebar Info */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Card className="bg-gradient-to-br from-white/95 to-[#FFF9F5]/95 backdrop-blur-sm border border-[#451C15]/10 p-6 rounded-3xl sticky top-24">
            <h3 className="text-xl font-medium text-[#451C15] mb-6 [font-family:var(--font-inter)]">
              Quick Information
            </h3>

            <div className="space-y-4">
              {service.includedInPrice && (
                <div>
                  <h4 className="text-sm font-medium text-[#451C15] mb-2 [font-family:var(--font-inter)]">
                    What&apos;s Included
                  </h4>
                  <ul className="space-y-1">
                    {service.includedInPrice.slice(0, 4).map((item, index) => (
                      <li
                        key={index}
                        className="text-sm text-[#451C15]/60 [font-family:var(--font-inter)]"
                      >
                        • {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {service.requirements && (
                <div>
                  <h4 className="text-sm font-medium text-[#451C15] mb-2 [font-family:var(--font-inter)]">
                    Requirements
                  </h4>
                  <ul className="space-y-1">
                    {service.requirements.map((req, index) => (
                      <li
                        key={index}
                        className="text-sm text-[#451C15]/60 [font-family:var(--font-inter)]"
                      >
                        • {req}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <Button className="w-full mt-8 bg-[#451C15] text-[#E0D9C9] hover:bg-[#5A241C] rounded-full py-6 text-base shadow-xl hover:shadow-2xl transition-all duration-300">
              {service.ctaButtonText}
            </Button>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export const ServiceDetailView = ({ service }: ServiceDetailViewProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Parse pricing for the pricing component
  const getPricingPackages = () => {
    if (!service.pricing) return null;

    if (service.pricing.type === "package" && service.pricing.packages) {
      return service.pricing.packages.map((pkg, index) => ({
        id: `package-${index}`,
        name: pkg.name,
        price: pkg.price,
        currency: service.pricing?.currency || "$",
        features: pkg.features,
        highlighted: pkg.highlighted,
        icon:
          index === 0
            ? ("basic" as const)
            : index === 1
            ? ("premium" as const)
            : ("custom" as const),
        accentColor: service.accentColor,
      }));
    }

    if (service.pricing.type === "fixed") {
      return [
        {
          id: "single",
          name: service.title,
          price: service.pricing.amount || 0,
          currency: service.pricing.currency || "$",
          features: service.includedInPrice || [],
          icon: "basic" as const,
          accentColor: service.accentColor,
        },
      ];
    }

    if (service.pricing.type === "range") {
      // For range pricing, create a custom pricing package
      return [
        {
          id: "range",
          name: service.title,
          price: "custom" as const, // Use "custom" for range pricing
          description: `Pricing varies based on your needs`,
          currency: service.pricing.currency || "$",
          features: service.includedInPrice || [],
          icon: "basic" as const,
          accentColor: service.accentColor,
          ctaText: "Get Quote",
          note: `${service.pricing.currency || "$"}${
            service.pricing.minAmount
          }-${service.pricing.maxAmount} ${service.pricing.unit || ""}`,
        },
      ];
    }

    if (service.pricing.type === "custom") {
      return [
        {
          id: "custom-quote",
          name: service.title,
          price: "custom" as const,
          description: "Tailored to your specific needs",
          currency: service.pricing.currency || "$",
          features: service.includedInPrice || [],
          icon: "custom" as const,
          accentColor: service.accentColor,
          ctaText: "Contact for Quote",
        },
      ];
    }

    return null;
  };

  const pricingPackages = getPricingPackages();

  return (
    <main ref={containerRef} className="min-h-screen">
      {/* Hero Section - Using your ServiceDetailHero component */}
      <ServiceDetailHero
        id={service.id}
        title={service.title}
        shortDescription={service.shortDescription}
        heroImage={service.heroImage}
        icon={service.icon}
        accentColor={service.accentColor}
        pricing={service.pricing}
        duration={service.duration}
        groupSize={service.groupSize}
        location={service.location}
        availability={service.availability}
        ctaButtonText={service.ctaButtonText}
        onCtaClick={() => console.log("Book clicked")}
      />

      {/* Description Section */}
      <DescriptionSection service={service} />

      {/* Features Section - Using your ServiceFeatures component */}
      {service.features && service.features.length > 0 && (
        <ServiceFeatures
          features={service.features}
          title="Service Features"
          subtitle="What's Included"
          primaryAccentColor={service.accentColor}
          variant="cards"
          columns={3}
          alternateColors={true}
        />
      )}

      {/* Benefits Section - Using ServiceFeatures in compact variant */}
      {service.benefits && service.benefits.length > 0 && (
        <ServiceFeatures
          features={service.benefits.map((benefit) => ({
            icon: "CheckCircle",
            title: benefit,
            description: "",
          }))}
          title="Key Benefits"
          primaryAccentColor={service.accentColor}
          variant="compact"
          columns={2}
          alternateColors={false}
        />
      )}

      {/* Pricing Section - Using your ServicePricing component */}
      {pricingPackages && (
        <ServicePricing
          packages={pricingPackages}
          title="Investment Options"
          subtitle="Choose Your Package"
          note={service.pricing?.note}
          showCustomQuote={service.pricing?.type === "custom"}
          onPackageSelect={(id) => console.log("Package selected:", id)}
        />
      )}

      {/* Photo Gallery */}
      {service.galleryImages && service.galleryImages.length > 0 && (
        <PhotoGallery images={service.galleryImages} title={service.title} />
      )}

      {/* Testimonials */}
      {service.testimonials && service.testimonials.length > 0 && (
        <TestimonialsCarousel
          testimonials={service.testimonials}
          accentColor={service.accentColor}
        />
      )}

      {/* FAQ Section */}
      {service.faqs && service.faqs.length > 0 && (
        <FAQAccordion faqs={service.faqs} accentColor={service.accentColor} />
      )}

      {/* CTA Section - Using your ServiceCTA component */}
      <ServiceCTA
        serviceTitle={service.title}
        headline={`Ready to Experience ${service.title}?`}
        urgencyText={service.duration ? `Sessions starting soon` : undefined}
        valueProposition={service.ctaText}
        availability={service.availability}
        testimonialCount={service.testimonials?.length}
        rating={4.9}
        primaryButtonText={service.ctaButtonText}
        secondaryButtonText="Ask Questions"
        onPrimaryClick={() => console.log("Primary CTA clicked")}
        onSecondaryClick={() => console.log("Secondary CTA clicked")}
        mascotQuote={`"I can't wait to share the magic of ${service.title.toLowerCase()} with you!"`}
        accentColor={service.accentColor}
        showContactInfo={true}
      />
    </main>
  );
};
