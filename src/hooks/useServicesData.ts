import { useState, useEffect } from 'react';
import { getServices } from '@/lib/strapi';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Service } from '@/types/strapi';

export function useServicesData(featured?: boolean) {
  const { locale } = useLanguage();
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const data = await getServices(locale, featured);
        setServices(data);
      } catch (err) {
        console.error('Failed to fetch services:', err);
        setError('Failed to load services');
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, [locale, featured]);

  return { services, isLoading, error };
}