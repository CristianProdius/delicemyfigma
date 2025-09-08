import axios from 'axios';
import qs from 'qs';

// Strapi API configuration
export const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
export const strapiApiToken = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN || '';

// Create axios instance with default config
export const strapiApi = axios.create({
  baseURL: `${strapiUrl}/api`,
  headers: {
    'Content-Type': 'application/json',
    ...(strapiApiToken && { Authorization: `Bearer ${strapiApiToken}` }),
  },
  paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'brackets' }),
});

// Helper function to build Strapi query with population
export const buildStrapiQuery = (populate?: unknown, filters?: unknown, locale?: string) => {
  const query: Record<string, unknown> = {};
  
  if (populate) {
    query.populate = populate;
  }
  
  if (filters) {
    query.filters = filters;
  }
  
  if (locale) {
    query.locale = locale;
  }
  
  return query;
};

// Fetch header data
export async function getHeader(locale: string = 'ru') {
  try {
    const response = await strapiApi.get('/header', {
      params: buildStrapiQuery('*', undefined, locale),
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching header:', error);
    return null;
  }
}

// Fetch footer data
export async function getFooter(locale: string = 'ru') {
  try {
    const response = await strapiApi.get('/footer', {
      params: buildStrapiQuery('*', undefined, locale),
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching footer:', error);
    return null;
  }
}

// Fetch available locales
export async function getLocales() {
  try {
    const response = await strapiApi.get('/i18n/locales');
    return response.data;
  } catch (error) {
    console.error('Error fetching locales:', error);
    return [];
  }
}

// Helper to get image URL from Strapi media
export function getStrapiMediaUrl(media: { url?: string } | null | undefined) {
  if (!media) return null;
  
  const imageUrl = media.url;
  if (!imageUrl) return null;
  
  // Return full URL if it's already absolute
  if (imageUrl.startsWith('http')) return imageUrl;
  
  // Otherwise, prepend Strapi URL
  return `${strapiUrl}${imageUrl}`;
}