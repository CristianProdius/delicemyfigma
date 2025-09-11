import { useState, useEffect } from 'react';
import { getServicesPage } from '@/lib/strapi';
import { useLanguage } from '@/contexts/LanguageContext';
import type { ServicesPageData } from '@/types/strapi';

export function useServicesPageData() {
  const { locale } = useLanguage();
  const [servicesPageData, setServicesPageData] = useState<ServicesPageData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServicesPageData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const data = await getServicesPage(locale);
        setServicesPageData(data);
      } catch (err) {
        console.error('Failed to fetch services page data:', err);
        setError('Failed to load services page data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchServicesPageData();
  }, [locale]);

  return { servicesPageData, isLoading, error };
}