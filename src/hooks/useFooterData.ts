import { useState, useEffect } from 'react';
import { getFooter } from '@/lib/strapi';
import { useLanguage } from '@/contexts/LanguageContext';
import type { FooterData } from '@/types/strapi';

export function useFooterData() {
  const { locale } = useLanguage();
  const [footerData, setFooterData] = useState<FooterData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFooterData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const data = await getFooter(locale);
        setFooterData(data);
      } catch (err) {
        console.error('Failed to fetch footer data:', err);
        setError('Failed to load footer data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchFooterData();
  }, [locale]);

  return { footerData, isLoading, error };
}