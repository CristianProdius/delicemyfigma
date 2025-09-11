# Strapi Services Page Components Structure

This guide shows how to create a component-based Services Page structure in Strapi, similar to your Homepage structure.

## Component Architecture

The Services Page will have three main components:
1. **ServicesHeroSection** - Hero section with title, subtitle, description
2. **ServicesGridSection** - Configuration for the services grid display
3. **ServicesCTASection** - Call-to-action section

## Step 1: Create Service Section Components

### 1.1 Create ServicesHeroSection Component

**In Strapi Admin:**
1. Go to **Content-Type Builder → Components**
2. Create new category: `services-page` (if it doesn't exist)
3. Create new component: `ServicesHeroSection`

**Component Structure:**
```
Component Name: services-page.services-hero-section
Category: services-page

Fields:
- heroTitle (Text) - Required, Localized
- heroSubtitle (Text) - Localized
- heroDescription (Rich Text) - Localized
- heroImage (Media) - Single image
- showBreadcrumbs (Boolean) - Default: true
- decorativeElement (Enumeration) - Values: sparkles, dots, waves, none
```

### 1.2 Create ServicesGridSection Component

**Component Structure:**
```
Component Name: services-page.services-grid-section
Category: services-page

Fields:
- sectionTitle (Text) - Localized
- gridLayout (Enumeration) - Values: 2-columns, 3-columns, masonry
- showPricing (Boolean) - Default: true
- showDuration (Boolean) - Default: true
- showGroupSize (Boolean) - Default: true
- maxServicesToShow (Number) - Integer, Default: 0 (0 = show all)
- filterByFeatured (Boolean) - Default: false
- sortBy (Enumeration) - Values: sortOrder, title, newest, random
```

### 1.3 Create ServicesCTASection Component

**Component Structure:**
```
Component Name: services-page.services-cta-section
Category: services-page

Fields:
- ctaTitle (Text) - Required, Localized
- ctaDescription (Rich Text) - Localized
- ctaButtonText (Text) - Required, Localized
- ctaButtonUrl (Text) - Required
- ctaButtonStyle (Enumeration) - Values: primary, secondary, outline
- backgroundColor (Text) - Hex color, Default: #451C15
- showDecorative (Boolean) - Default: true
```

## Step 2: Create Services Page Single Type

**In Strapi Admin:**
1. Go to **Content-Type Builder → Single Types**
2. Create new Single Type: `Services Page`

**Complete Structure:**
```
Single Type Name: Services Page
API ID: services-page

Fields:
1. servicesHeroSection (Component)
   - Type: Component
   - Select: services-page.services-hero-section
   - Required: true

2. servicesGridSection (Component)
   - Type: Component
   - Select: services-page.services-grid-section
   - Required: true

3. servicesCTASection (Component)
   - Type: Component
   - Select: services-page.services-cta-section
   - Required: true

4. seo (Component)
   - Type: Component
   - Select: shared.seo
   - Required: false

5. enabled (Boolean)
   - Default: true
   - Description: Enable/disable the services page
```

**Enable i18n:** Yes, enable localization for this Single Type

## Step 3: Update TypeScript Interfaces

Update your `/src/types/strapi.ts` to match this structure:

```typescript
// Services Page Component Interfaces
export interface ServicesHeroSection {
  heroTitle?: string;
  heroSubtitle?: string;
  heroDescription?: string;
  heroImage?: StrapiImage;
  showBreadcrumbs?: boolean;
  decorativeElement?: 'sparkles' | 'dots' | 'waves' | 'none';
}

export interface ServicesGridSection {
  sectionTitle?: string;
  gridLayout?: '2-columns' | '3-columns' | 'masonry';
  showPricing?: boolean;
  showDuration?: boolean;
  showGroupSize?: boolean;
  maxServicesToShow?: number;
  filterByFeatured?: boolean;
  sortBy?: 'sortOrder' | 'title' | 'newest' | 'random';
}

export interface ServicesCTASection {
  ctaTitle?: string;
  ctaDescription?: string;
  ctaButtonText?: string;
  ctaButtonUrl?: string;
  ctaButtonStyle?: 'primary' | 'secondary' | 'outline';
  backgroundColor?: string;
  showDecorative?: boolean;
}

export interface ServicesPageData {
  servicesHeroSection?: ServicesHeroSection;
  servicesGridSection?: ServicesGridSection;
  servicesCTASection?: ServicesCTASection;
  seo?: unknown;
  enabled?: boolean;
}
```

## Step 4: Update Frontend Hooks

Update `/src/hooks/useServicesPageData.ts`:

```typescript
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
```

## Step 5: Update API Function

Update `/src/lib/strapi.ts`:

```typescript
export async function getServicesPage(locale: string = 'ru') {
  try {
    const response = await strapiApi.get('/services-page', {
      params: buildStrapiQuery({
        servicesHeroSection: {
          populate: {
            heroImage: {
              fields: ['url', 'alternativeText', 'width', 'height']
            }
          }
        },
        servicesGridSection: true,
        servicesCTASection: true,
        seo: true
      }, undefined, locale),
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching services page:', error);
    return null;
  }
}
```

## Step 6: Update Frontend Components

Update your components to use the sectioned data:

**ServicesHero Component:**
```typescript
interface ServicesHeroProps {
  heroSection?: ServicesHeroSection | null;
}

export const ServicesHero = ({ heroSection }: ServicesHeroProps) => {
  // Use heroSection.heroTitle instead of pageData.pageTitle
  // Use heroSection.heroSubtitle instead of pageData.pageSubtitle
  // etc.
}
```

**ServicesGrid Component:**
```typescript
interface ServicesGridProps {
  services: Service[];
  gridSection?: ServicesGridSection | null;
}

export const ServicesGrid = ({ services, gridSection }: ServicesGridProps) => {
  // Use gridSection.gridLayout to determine layout
  // Use gridSection.showPricing to show/hide pricing
  // Filter/sort based on gridSection settings
}
```

**ServicesCTA Component:**
```typescript
interface ServicesCTAProps {
  ctaSection?: ServicesCTASection | null;
}

export const ServicesCTA = ({ ctaSection }: ServicesCTAProps) => {
  // Use ctaSection.ctaTitle instead of pageData.ctaTitle
  // Use ctaSection.ctaDescription instead of pageData.ctaDescription
  // etc.
}
```

**Services View:**
```typescript
export const ServicesView = () => {
  const { servicesPageData, isLoading: pageLoading } = useServicesPageData();
  const { services, isLoading: servicesLoading } = useServicesData();
  
  // ... loading and error handling ...

  return (
    <main className="min-h-screen relative">
      <ServicesHero heroSection={servicesPageData?.servicesHeroSection} />
      <ServicesGrid 
        services={services} 
        gridSection={servicesPageData?.servicesGridSection} 
      />
      <ServicesCTA ctaSection={servicesPageData?.servicesCTASection} />
    </main>
  );
};
```

## Step 7: Content to Add in Strapi

Once you've created the structure, add this content:

### Russian Content:
```json
{
  "servicesHeroSection": {
    "heroTitle": "Наши Услуги",
    "heroSubtitle": "Мастерство Ремесленника",
    "heroDescription": "От интимных шоколадных мастер-классов до грандиозных корпоративных мероприятий",
    "showBreadcrumbs": true,
    "decorativeElement": "sparkles"
  },
  "servicesGridSection": {
    "sectionTitle": "Выберите Ваш Опыт",
    "gridLayout": "3-columns",
    "showPricing": true,
    "showDuration": true,
    "showGroupSize": true,
    "maxServicesToShow": 0,
    "filterByFeatured": false,
    "sortBy": "sortOrder"
  },
  "servicesCTASection": {
    "ctaTitle": "Не нашли то, что искали?",
    "ctaDescription": "Мы любим создавать уникальные впечатления",
    "ctaButtonText": "Связаться с нами",
    "ctaButtonUrl": "/contact",
    "ctaButtonStyle": "primary",
    "backgroundColor": "#451C15",
    "showDecorative": true
  }
}
```

### English Content:
```json
{
  "servicesHeroSection": {
    "heroTitle": "Our Services",
    "heroSubtitle": "Artisan Excellence",
    "heroDescription": "From intimate chocolate classes to grand corporate events",
    "showBreadcrumbs": true,
    "decorativeElement": "sparkles"
  },
  "servicesGridSection": {
    "sectionTitle": "Choose Your Experience",
    "gridLayout": "3-columns",
    "showPricing": true,
    "showDuration": true,
    "showGroupSize": true,
    "maxServicesToShow": 0,
    "filterByFeatured": false,
    "sortBy": "sortOrder"
  },
  "servicesCTASection": {
    "ctaTitle": "Can't Find What You're Looking For?",
    "ctaDescription": "We love creating custom experiences tailored to your unique needs",
    "ctaButtonText": "Contact Us",
    "ctaButtonUrl": "/contact",
    "ctaButtonStyle": "primary",
    "backgroundColor": "#451C15",
    "showDecorative": true
  }
}
```

## Step 8: API Permissions

Go to **Settings → Roles → Public**:
- Enable `find` for Services Page
- Enable `find` and `findOne` for Service

## Summary

This structure gives you:
1. **Component-based architecture** - Each section is a separate component
2. **Full control** - Can configure display options from Strapi
3. **Consistency** - Matches your Homepage structure
4. **Flexibility** - Easy to add new fields or sections

The key difference from a simple structure:
- **Before:** Services Page had flat fields (pageTitle, pageDescription, etc.)
- **Now:** Services Page has component sections (servicesHeroSection, servicesGridSection, servicesCTASection)

This matches your Homepage pattern where you have heroSection, serviceSection, aboutSection, etc.