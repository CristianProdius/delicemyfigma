// Server-side Strapi API functions (for metadata and SSR)
import { strapiUrl } from './strapi';
import qs from 'qs';

// Fetch header data (which contains basic site info)
export async function getHeaderData(locale: string = 'ru') {
  const query = qs.stringify({
    populate: '*',
    locale,
  });
  
  const response = await fetch(`${strapiUrl}/api/header?${query}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(process.env.NEXT_PUBLIC_STRAPI_API_TOKEN && {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
      }),
    },
    next: { revalidate: 60 }, // Cache for 60 seconds
  });

  if (!response.ok) {
    throw new Error('Failed to fetch header data from Strapi');
  }

  const data = await response.json();
  return data.data;
}

// Get metadata from Strapi header data - NO FALLBACKS
export async function getStrapiMetadata(locale: string = 'ru') {
  const headerData = await getHeaderData(locale);
  
  // No fallbacks - if Strapi data is not available, the site should not work
  if (!headerData) {
    throw new Error('Header data not available from Strapi');
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://delicemy.com';
  
  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: headerData.companyName || 'DeliceMy',
      template: `%s | ${headerData.companyName || 'DeliceMy'}`,
    },
    description: headerData.companyTagline || '',
    keywords: [],
    authors: [{ name: headerData.companyName, url: baseUrl }],
    creator: headerData.companyName,
    publisher: headerData.companyName,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    
    openGraph: {
      title: headerData.companyName,
      description: headerData.companyTagline,
      url: baseUrl,
      siteName: headerData.companyName,
      locale: locale === 'ru' ? 'ru_RU' : locale === 'ro' ? 'ro_RO' : 'en_US',
      type: 'website',
    },
    
    twitter: {
      card: 'summary_large_image',
      title: headerData.companyName,
      description: headerData.companyTagline,
    },
    
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        "max-video-preview": -1,
        "max-image-preview": "large" as const,
        "max-snippet": -1,
      },
    },
    
    alternates: {
      canonical: baseUrl,
      languages: {
        'en-US': `${baseUrl}/en`,
        'ro-MD': `${baseUrl}/ro`, 
        'ru-MD': `${baseUrl}/ru`,
      },
    },
  };
}