import { useState, useEffect } from 'react';
import { getHeader } from '@/lib/strapi';
import { useLanguage } from '@/contexts/LanguageContext';
import type { HeaderData } from '@/types/strapi';

export function useHeaderData() {
  const { locale } = useLanguage();
  const [headerData, setHeaderData] = useState<HeaderData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHeaderData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const data = await getHeader(locale);
        setHeaderData(data);
      } catch (err) {
        console.error('Failed to fetch header data:', err);
        setError('Failed to load header data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchHeaderData();
  }, [locale]);

  return { headerData, isLoading, error };
}