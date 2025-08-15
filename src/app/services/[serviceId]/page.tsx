// src/app/services/[serviceId]/page.tsx
import { ServiceDetailView } from "@/modules/services/views/service-detail-view";
import { getServiceById } from "@/modules/services/data/services-content";
import { notFound } from "next/navigation";

interface ServiceDetailPageProps {
  params: {
    serviceId: string;
  };
}

export default function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const service = getServiceById(params.serviceId);

  if (!service) {
    notFound();
  }

  return <ServiceDetailView service={service} />;
}

// Generate static params for all services
export async function generateStaticParams() {
  const services = [
    "chocolate-classes-adults",
    "kids-chocolate-classes",
    "restaurant-cafe-services",
    "chocolate-parties-events",
    "custom-dessert-design",
    "personalized-chocolate-gifts",
  ];

  return services.map((serviceId) => ({
    serviceId,
  }));
}
