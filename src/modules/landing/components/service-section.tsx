"use client";

import React from "react";
import { useHomepageData } from "@/hooks/useHomepageData";
import { Services } from "./services";

export const ServicesSection: React.FC = () => {
  const { homepageData, isLoading, error } = useHomepageData();
  
  // Show error if data fetch failed
  if (error) {
    return (
      <section className="py-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Unable to load services</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </section>
    );
  }

  // Show loading state
  if (isLoading) {
    return (
      <section className="py-20 flex items-center justify-center">
        <div className="animate-pulse">
          <div className="h-96 bg-gray-200 rounded-3xl w-full max-w-6xl"></div>
        </div>
      </section>
    );
  }

  // Don't render if no service section data
  if (!homepageData?.serviceSection) {
    return null;
  }

  return <Services serviceSection={homepageData.serviceSection} />;
};

