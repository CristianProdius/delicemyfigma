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
      params: {
        populate: {
          logo: {
            fields: ['url', 'alternativeText', 'width', 'height']
          },
          servicesSection: {
            populate: {
              links: true
            }
          },
          learnSection: {
            populate: {
              links: true
            }
          },
          exploreSection: {
            populate: {
              links: true
            }
          },
          connectSection: {
            populate: {
              links: true
            }
          },
          contactInfo: true,
          socialLinks: true,
          newsletter: true,
          copyright: true
        },
        locale,
      },
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
import type { StrapiImage } from '@/types/strapi';

export function getStrapiMediaUrl(media: StrapiImage | null | undefined) {
  if (!media) return null;
  
  const imageUrl = media.url;
  if (!imageUrl) return null;
  
  // Return full URL if it's already absolute
  if (imageUrl.startsWith('http')) return imageUrl;
  
  // Otherwise, prepend Strapi URL
  return `${strapiUrl}${imageUrl}`;
}

// Fetch services page data
export async function getServicesPage(locale: string = 'ru') {
  try {
    const response = await strapiApi.get('/services-page', {
      params: {
        populate: {
          servicesHeroSection: {
            populate: {
              breadcrumbs: true,
              heroImage: {
                fields: ['url', 'alternativeText', 'width', 'height']
              }
            }
          },
          servicesGridSection: {
            populate: {
              gridSettings: true,
              serviceCardDefaults: true
            }
          },
          servicesCtaSection: true,
          seo: true
        },
        locale
      }
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching services page:', error);
    return null;
  }
}

// Helper to parse JSON fields safely
function parseJsonSafely(value: any): any {
  if (!value) return null;
  if (typeof value !== 'string') return value;
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

// Fetch all services
export async function getServices(locale: string = 'ru', featured?: boolean) {
  try {
    const filters = featured ? { featured: true } : undefined;
    
    const response = await strapiApi.get('/services', {
      params: {
        filters,
        populate: {
          heroSection: {
            populate: {
              backgroundImage: {
                fields: ['url', 'alternativeText', 'width', 'height']
              }
            }
          },
          serviceDetails: {
            populate: {
              bookingCard: {
                populate: {
                  pricingSection: {
                    populate: '*'
                  },
                  quickInfo: true
                }
              }
            }
          }
        },
        locale
      }
    });
    
    // Parse JSON fields in services
    const services = response.data.data || [];
    return services.map((service: any) => ({
      ...service,
      targetAudience: parseJsonSafely(service.targetAudience),
      benefits: parseJsonSafely(service.benefits),
      requirements: parseJsonSafely(service.requirements),
      includedInPrice: parseJsonSafely(service.includedInPrice),
      // Parse package features if they're JSON
      pricing: service.pricing ? {
        ...service.pricing,
        packages: service.pricing.packages?.map((pkg: any) => ({
          ...pkg,
          features: parseJsonSafely(pkg.features) || []
        }))
      } : null
    }));
  } catch (error) {
    console.error('Error fetching services:', error);
    return [];
  }
}

// Fetch single service by slug
export async function getServiceBySlug(slug: string, locale: string = 'ru') {
  try {
    // Use Strapi v5 deep population syntax
    const response = await strapiApi.get('/services', {
      params: {
        filters: {
          slug: {
            $eq: slug
          }
        },
        populate: '*',
        locale
      }
    });
    
    // If basic populate doesn't get nested data, fetch again with deeper population
    let service = response.data.data?.[0];
    if (!service) return null;
    
    // Fetch again with specific nested population for serviceDetails if needed
    if (service.serviceDetails && (!service.serviceDetails.bookingCard || !service.serviceDetails.bookingCard.pricingSection)) {
      const detailedResponse = await strapiApi.get('/services', {
        params: {
          filters: {
            slug: {
              $eq: slug
            }
          },
          populate: {
            heroSection: {
              populate: '*'
            },
            serviceDetails: {
              populate: {
                mainContent: {
                  populate: {
                    includeSection: {
                      populate: {
                        items: '*'
                      }
                    }
                  }
                },
                bookingCard: {
                  populate: {
                    pricingSection: {
                      populate: {
                        packages: '*'
                      }
                    },
                    quickInfo: true
                  }
                }
              }
            },
            ServiceFeatures: {
              populate: '*'
            },
            serviceGallery: {
              populate: '*'
            },
            testimonialsSection: {
              populate: '*'
            },
            serviceFaqs: {
              populate: '*'
            },
            serviceCta: {
              populate: {
                ctaHeader: true,
                mainContent: true,
                ctaButtons: true,
                contactInfo: true,
                mascot: {
                  populate: {
                    mascotImage: {
                      fields: ['url', 'alternativeText', 'width', 'height']
                    }
                  }
                }
              }
            },
            seo: true
          },
          locale
        }
      });
      service = detailedResponse.data.data?.[0] || service;
    }
    
    // Parse JSON fields (only for fields that still exist)
    return {
      ...service,
      // These legacy fields might not exist anymore
      targetAudience: service.targetAudience ? parseJsonSafely(service.targetAudience) : null,
      benefits: service.benefits ? parseJsonSafely(service.benefits) : null,
      requirements: service.requirements ? parseJsonSafely(service.requirements) : null,
      includedInPrice: service.includedInPrice ? parseJsonSafely(service.includedInPrice) : null,
      // Parse serviceDetails JSON fields
      serviceDetails: service.serviceDetails ? {
        ...service.serviceDetails,
        bookingCard: service.serviceDetails.bookingCard ? {
          ...service.serviceDetails.bookingCard,
          quickInfo: service.serviceDetails.bookingCard.quickInfo ? {
            ...service.serviceDetails.bookingCard.quickInfo,
            includedItems: parseJsonSafely(service.serviceDetails.bookingCard.quickInfo.includedItems)
          } : null
        } : null
      } : null,
      // Parse ServiceFeatures JSON fields
      ServiceFeatures: service.ServiceFeatures ? {
        ...service.ServiceFeatures,
        benefitsSection: service.ServiceFeatures.benefitsSection ? {
          ...service.ServiceFeatures.benefitsSection,
          benefits: parseJsonSafely(service.ServiceFeatures.benefitsSection.benefits)
        } : null,
        requirementsSection: service.ServiceFeatures.requirementsSection ? {
          ...service.ServiceFeatures.requirementsSection,
          requirements: parseJsonSafely(service.ServiceFeatures.requirementsSection.requirements)
        } : null,
        whatsIncludedSection: service.ServiceFeatures.whatsIncludedSection ? {
          ...service.ServiceFeatures.whatsIncludedSection,
          items: parseJsonSafely(service.ServiceFeatures.whatsIncludedSection.items)
        } : null
      } : null
    };
  } catch (error: any) {
    console.error('Error fetching service by slug:', error);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    }
    return null;
  }
}

// Keep old function name for backward compatibility
export const getService = getServiceBySlug;