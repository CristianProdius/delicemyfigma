"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getLocales } from '@/lib/strapi';

interface Locale {
  id: number;
  code: string;
  name: string;
  isDefault: boolean;
}

interface LanguageContextType {
  locale: string;
  setLocale: (locale: string) => void;
  availableLocales: Locale[];
  isLoading: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState('ru'); // Temporary default until loaded from Strapi
  const [availableLocales, setAvailableLocales] = useState<Locale[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch available locales from Strapi
    const fetchLocales = async () => {
      try {
        const locales = await getLocales();
        if (locales && locales.length > 0) {
          setAvailableLocales(locales);
          
          // Find default locale from Strapi
          const defaultLocale = locales.find((l: Locale) => l.isDefault);
          if (defaultLocale) {
            // Check localStorage for saved preference
            const savedLocale = localStorage.getItem('locale');
            if (savedLocale && locales.some((l: Locale) => l.code === savedLocale)) {
              setLocale(savedLocale);
            } else {
              setLocale(defaultLocale.code);
            }
          }
        }
      } catch (error) {
        console.error('Failed to fetch locales:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocales();
  }, []);

  const handleSetLocale = (newLocale: string) => {
    setLocale(newLocale);
    localStorage.setItem('locale', newLocale);
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale: handleSetLocale, availableLocales, isLoading }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}