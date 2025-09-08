import { useState, useEffect } from 'react';
import { strapiApi } from '@/lib/strapi';
import { useLanguage } from '@/contexts/LanguageContext';
import type { HomepageData } from '@/types/strapi';

export function useHomepageData() {
  const { locale } = useLanguage();
  const [homepageData, setHomepageData] = useState<HomepageData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHomepageData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Try multiple populate approaches
        const response = await strapiApi.get('/homepage', {
          params: {
            populate: {
              heroSection: {
                populate: {
                  heroImage: {
                    fields: ['url', 'alternativeText', 'width', 'height']
                  }
                }
              },
              serviceSection: {
                populate: {
                  featuredServices: '*'
                }
              },
              aboutSection: true,
              testimonialsSection: true,
              ctaSection: true
            },
            locale,
          },
        });
        
        if (response.data && response.data.data) {
          setHomepageData(response.data.data);
        } else {
          throw new Error('No homepage data available');
        }
      } catch (err) {
        console.error('Failed to fetch homepage data:', err);
        setError('Failed to load homepage data from CMS');
        // NO FALLBACK DATA - if Strapi fails, the component should show error
      } finally {
        setIsLoading(false);
      }
    };

    fetchHomepageData();
  }, [locale]);

  return { homepageData, isLoading, error };
}