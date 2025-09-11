import { ServiceDetailView } from "@/modules/services/views/service-detail-view";

interface ServiceDetailPageProps {
  params: Promise<{
    serviceId: string;
  }>;
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { serviceId } = await params;
  
  return <ServiceDetailView slug={serviceId} />;
}