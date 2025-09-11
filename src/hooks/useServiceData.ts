import { useState, useEffect } from 'react';
import { getServiceBySlug } from '@/lib/strapi';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Service } from '@/types/strapi';

export function useServiceData(slug: string) {
  const { locale } = useLanguage();
  const [service, setService] = useState<Service | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServiceData = async () => {
      if (!slug) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);
      
      try {
        const data = await getServiceBySlug(slug, locale);
        if (data) {
          setService(data);
        } else {
          setError('Service not found');
        }
      } catch (err) {
        console.error('Failed to fetch service data:', err);
        setError('Failed to load service data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchServiceData();
  }, [slug, locale]);

  return { service, isLoading, error };
}