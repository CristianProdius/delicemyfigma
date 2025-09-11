"use client";

import { ServicesHero } from "../components/services-hero";
import { ServicesGrid } from "../components/services-grid";
import { ServicesCTA } from "../components/services-cta";
import { useServicesData } from "@/hooks/useServicesData";
import { useServicesPageData } from "@/hooks/useServicesPageData";

export const ServicesView = () => {
  // Get data from Strapi
  const { servicesPageData, isLoading: pageLoading, error: pageError } = useServicesPageData();
  const { services, isLoading: servicesLoading, error: servicesError } = useServicesData();
  
  
  const isLoading = pageLoading || servicesLoading;
  const error = pageError || servicesError;
  
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
  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 [font-family:var(--font-inter)]">{error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen relative">
      <ServicesHero pageData={servicesPageData} />
      <ServicesGrid services={services || []} gridSection={servicesPageData?.servicesGridSection} />
      <ServicesCTA pageData={servicesPageData} />
    </main>
  );
};