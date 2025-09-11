"use client";

import { ServiceDetailHero } from "../components/service-detail-hero-new";
import { ServiceDetails } from "../components/service-details";
import { ServiceFeatures } from "../components/service-features";
import { ServiceGallery } from "../components/service-gallery";
import { ServiceTestimonials } from "../components/service-testimonials";
import { ServiceFAQs } from "../components/service-faqs";
import { ServiceCTA } from "../components/service-cta";
import { useServiceData } from "@/hooks/useServiceData";
import Link from "next/link";

interface ServiceDetailViewProps {
  slug: string;
}

export const ServiceDetailView = ({ slug }: ServiceDetailViewProps) => {
  // Get data from Strapi
  const { service, isLoading, error } = useServiceData(slug);

  // Show loading state
  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#451C15] mx-auto"></div>
        </div>
      </main>
    );
  }

  // Show error state
  if (error || !service) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          {error && <p className="text-red-600 [font-family:var(--font-inter)]">{error}</p>}
          <Link href="/services" className="text-[#D4A574] hover:underline mt-4 inline-block">
            <span className="text-[#D4A574]">←</span>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section with Stats */}
      <ServiceDetailHero service={service} />
      
      {/* About This Service Section */}
      <ServiceDetails service={service} />
      
      {/* Service Features Grid */}
      <ServiceFeatures service={service} />
      
      {/* Gallery */}
      <ServiceGallery service={service} />
      
      {/* Testimonials */}
      <ServiceTestimonials service={service} />
      
      {/* FAQs */}
      <ServiceFAQs service={service} />
      
      {/* CTA Section */}
      <ServiceCTA service={service} />
    </main>
  );
};