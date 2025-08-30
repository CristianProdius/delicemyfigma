// src/app/services/[serviceId]/page.tsx

import { Metadata } from "next";
import { ServiceDetailView } from "@/modules/services/views/service-detail-view";
import { getServiceById, servicesContent } from "@/modules/services/data/services-content";
import { notFound } from "next/navigation";

// Update interface for Next.js 15 - params is now a Promise
interface ServiceDetailPageProps {
  params: Promise<{
    serviceId: string;
  }>;
}

// Generate metadata for SEO
export async function generateMetadata({ 
  params 
}: ServiceDetailPageProps): Promise<Metadata> {
  // Await params in Next.js 15
  const { serviceId } = await params;
  
  const service = getServiceById(serviceId);

  if (!service) {
    return {
      title: "Service Not Found | DeliceMy",
      description: "The requested service could not be found.",
    };
  }

  return {
    title: `${service.title} | DeliceMy Services`,
    description: service.shortDescription,
    keywords: service.targetAudience?.slice(0, 5).join(", ") || service.title,
    openGraph: {
      title: service.title,
      description: service.shortDescription,
      type: "website",
      images: [
        {
          url: service.heroImage,
          width: 1200,
          height: 630,
          alt: service.title,
        },
      ],
      siteName: "DeliceMy",
    },
    twitter: {
      card: "summary_large_image",
      title: service.title,
      description: service.shortDescription,
      images: [service.heroImage],
      creator: "@delicemy",
    },
    alternates: {
      canonical: `/services/${service.id}`,
    },
  };
}

// Main page component - now async to await params
export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  // Await params in Next.js 15
  const { serviceId } = await params;
  
  const service = getServiceById(serviceId);
  
  if (!service) {
    notFound();
  }
  
  return <ServiceDetailView service={service} />;
}

// Generate static params for all services
export async function generateStaticParams() {
  // Get service IDs from your data
  // If servicesContent is an array of services
  return servicesContent.map((service) => ({
    serviceId: service.id,
  }));
  
  
}