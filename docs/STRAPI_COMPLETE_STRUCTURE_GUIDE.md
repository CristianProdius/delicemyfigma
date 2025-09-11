# Complete Strapi Structure Guide for DeliceMy

This guide provides the exact Strapi structure needed to match the current frontend implementation.

## Overview of Structure

We have three main content types:
1. **Homepage (Single Type)** - Contains sections including services section
2. **Services Page (Single Type)** - The main services listing page
3. **Service (Collection Type)** - Individual service details

## 1. Homepage Structure (Single Type)

### 1.1 Service Section Component

The homepage contains a `serviceSection` that displays featured services.

**Component Name:** `homepage.service-section`
**Category:** `homepage`

```json
{
  "sectionTitle": {
    "type": "string",
    "localized": true,
    "required": false,
    "default": "Our Services"
  },
  "featuredServices": {
    "type": "component",
    "repeatable": true,
    "component": "homepage.featured-service"
  }
}
```

### 1.2 Featured Service Component

**Component Name:** `homepage.featured-service`
**Category:** `homepage`

```json
{
  "title": {
    "type": "string",
    "required": true,
    "localized": true
  },
  "description": {
    "type": "text",
    "required": true,
    "localized": true
  },
  "image": {
    "type": "media",
    "allowedTypes": ["images"],
    "multiple": false
  },
  "buttonText": {
    "type": "string",
    "default": "Learn More",
    "localized": true
  },
  "href": {
    "type": "string",
    "required": true,
    "description": "Link to service page (e.g., /services/chocolate-classes)"
  },
  "gridClass": {
    "type": "enumeration",
    "enum": ["col-span-1", "col-span-2", "col-span-3", "row-span-2"],
    "default": "col-span-1",
    "description": "Grid layout class for responsive design"
  },
  "iconName": {
    "type": "enumeration",
    "enum": [
      "heart", "star", "gift", "coffee", "cake", "cookie", 
      "icecream", "chefhat", "sparkles", "crown", "gem", 
      "graduationcap", "baby", "store", "partypopper", 
      "palette", "users", "utensils", "calendar"
    ],
    "required": true,
    "default": "star"
  },
  "accentColor": {
    "type": "string",
    "default": "#D4A574",
    "description": "Hex color for accent (e.g., #D4A574)"
  }
}
```

### 1.3 Complete Homepage Structure

```json
{
  "heroSection": { "type": "component", "component": "homepage.hero-section" },
  "serviceSection": { "type": "component", "component": "homepage.service-section" },
  "aboutSection": { "type": "component", "component": "homepage.about-section" },
  "testimonialsSection": { "type": "component", "component": "homepage.testimonials-section" },
  "ctaSection": { "type": "component", "component": "homepage.cta-section" },
  "seo": { "type": "component", "component": "shared.seo" }
}
```

## 2. Services Page Structure (Single Type)

The Services Page is for the main `/services` route that lists all services.

**Single Type Name:** `services-page`
**API ID:** `services-page`

```json
{
  "pageTitle": {
    "type": "string",
    "default": "Our Services",
    "required": true,
    "localized": true
  },
  "pageSubtitle": {
    "type": "string",
    "default": "Artisan Excellence",
    "localized": true
  },
  "pageDescription": {
    "type": "richtext",
    "localized": true
  },
  "heroImage": {
    "type": "media",
    "allowedTypes": ["images"],
    "multiple": false
  },
  "ctaTitle": {
    "type": "string",
    "default": "Can't Find What You're Looking For?",
    "localized": true
  },
  "ctaDescription": {
    "type": "richtext",
    "localized": true
  },
  "ctaButtonText": {
    "type": "string",
    "default": "Contact Us",
    "localized": true
  },
  "ctaButtonUrl": {
    "type": "string",
    "default": "/contact"
  },
  "seo": {
    "type": "component",
    "component": "shared.seo"
  }
}
```

## 3. Service Collection Type

Individual service pages (`/services/[slug]`).

**Collection Name:** `service`
**API ID:** `service`

### 3.1 Main Service Fields

```json
{
  "slug": {
    "type": "uid",
    "targetField": "title",
    "required": true
  },
  "title": {
    "type": "string",
    "required": true,
    "localized": true
  },
  "shortDescription": {
    "type": "text",
    "required": true,
    "localized": true,
    "maxLength": 200
  },
  "longDescription": {
    "type": "richtext",
    "required": true,
    "localized": true
  },
  "heroImage": {
    "type": "media",
    "allowedTypes": ["images"],
    "multiple": false
  },
  "galleryImages": {
    "type": "media",
    "allowedTypes": ["images"],
    "multiple": true
  },
  "price": {
    "type": "string",
    "localized": true,
    "description": "Display price (e.g., '$50', 'From $100')"
  },
  "duration": {
    "type": "string",
    "localized": true,
    "description": "e.g., '2 hours', '3-4 hours'"
  },
  "groupSize": {
    "type": "string",
    "localized": true,
    "description": "e.g., '1-10 people', 'Up to 20'"
  },
  "includes": {
    "type": "text",
    "localized": true,
    "description": "Brief description of what's included"
  },
  "additionalInfo": {
    "type": "text",
    "localized": true
  },
  "featured": {
    "type": "boolean",
    "default": false,
    "description": "Show on homepage"
  },
  "sortOrder": {
    "type": "integer",
    "default": 0,
    "description": "Order for display"
  }
}
```

### 3.2 Service Components

#### 3.2.1 Feature Component
**Component Name:** `service.feature`

```json
{
  "name": {
    "type": "string",
    "required": true,
    "localized": true
  },
  "description": {
    "type": "text",
    "localized": true
  }
}
```

#### 3.2.2 Pricing Component
**Component Name:** `service.pricing`

```json
{
  "name": {
    "type": "string",
    "required": true,
    "localized": true,
    "description": "e.g., 'Basic Package', 'Per Person'"
  },
  "price": {
    "type": "string",
    "required": true,
    "localized": true,
    "description": "e.g., '$100', '€50'"
  },
  "description": {
    "type": "text",
    "localized": true
  }
}
```

#### 3.2.3 Testimonial Component
**Component Name:** `shared.testimonial`

```json
{
  "author": {
    "type": "string",
    "required": true,
    "localized": true
  },
  "position": {
    "type": "string",
    "localized": true
  },
  "content": {
    "type": "text",
    "required": true,
    "localized": true
  },
  "rating": {
    "type": "integer",
    "min": 1,
    "max": 5,
    "default": 5
  }
}
```

#### 3.2.4 FAQ Component
**Component Name:** `shared.faq`

```json
{
  "question": {
    "type": "string",
    "required": true,
    "localized": true
  },
  "answer": {
    "type": "text",
    "required": true,
    "localized": true
  }
}
```

### 3.3 Complete Service Structure with Components

```json
{
  // ... main fields from 3.1 ...
  "features": {
    "type": "component",
    "repeatable": true,
    "component": "service.feature"
  },
  "pricing": {
    "type": "component",
    "repeatable": true,
    "component": "service.pricing"
  },
  "testimonials": {
    "type": "component",
    "repeatable": true,
    "component": "shared.testimonial"
  },
  "faqs": {
    "type": "component",
    "repeatable": true,
    "component": "shared.faq"
  }
}
```

## 4. API Endpoints and Population

### 4.1 Homepage API Call
```javascript
// GET /api/homepage
{
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
        featuredServices: {
          populate: {
            image: {
              fields: ['url', 'alternativeText', 'width', 'height']
            }
          }
        }
      }
    },
    aboutSection: { populate: '*' },
    testimonialsSection: { populate: '*' },
    ctaSection: { populate: '*' }
  }
}
```

### 4.2 Services Page API Call
```javascript
// GET /api/services-page
{
  populate: {
    heroImage: {
      fields: ['url', 'alternativeText', 'width', 'height']
    },
    seo: true
  }
}
```

### 4.3 Services Collection API Call
```javascript
// GET /api/services
{
  populate: {
    heroImage: {
      fields: ['url', 'alternativeText', 'width', 'height']
    },
    galleryImages: {
      fields: ['url', 'alternativeText', 'width', 'height']
    },
    features: '*',
    pricing: '*',
    testimonials: '*',
    faqs: '*'
  }
}
```

### 4.4 Single Service API Call
```javascript
// GET /api/services?filters[slug][$eq]=chocolate-classes
{
  populate: {
    heroImage: {
      fields: ['url', 'alternativeText', 'width', 'height']
    },
    galleryImages: {
      fields: ['url', 'alternativeText', 'width', 'height']
    },
    features: '*',
    pricing: '*',
    testimonials: '*',
    faqs: '*'
  }
}
```

## 5. Content Examples

### 5.1 Homepage Service Section Content

```json
{
  "serviceSection": {
    "sectionTitle": "Our Artisan Services",
    "featuredServices": [
      {
        "title": "Chocolate Classes",
        "description": "Learn the art of chocolate making from bean to bar",
        "image": "[upload chocolate-class.jpg]",
        "buttonText": "Explore Classes",
        "href": "/services/chocolate-classes",
        "gridClass": "col-span-2",
        "iconName": "chefhat",
        "accentColor": "#8B4513"
      },
      {
        "title": "Corporate Events",
        "description": "Team building and corporate experiences",
        "image": "[upload corporate.jpg]",
        "buttonText": "Plan Your Event",
        "href": "/services/corporate-events",
        "gridClass": "col-span-1",
        "iconName": "users",
        "accentColor": "#D4A574"
      },
      {
        "title": "Birthday Parties",
        "description": "Magical celebrations for all ages",
        "image": "[upload birthday.jpg]",
        "buttonText": "Book a Party",
        "href": "/services/birthday-parties",
        "gridClass": "col-span-1",
        "iconName": "partypopper",
        "accentColor": "#FFB6C1"
      }
    ]
  }
}
```

### 5.2 Individual Service Content Example

```json
{
  "slug": "chocolate-classes",
  "title": "Chocolate Making Classes",
  "shortDescription": "Master the art of artisan chocolate making",
  "longDescription": "<p>Join us for an unforgettable journey...</p>",
  "heroImage": "[upload hero.jpg]",
  "galleryImages": "[upload multiple images]",
  "price": "From $75",
  "duration": "2-3 hours",
  "groupSize": "1-12 people",
  "includes": "All materials, recipes, and your creations to take home",
  "featured": true,
  "sortOrder": 1,
  "features": [
    {
      "name": "Hands-on Experience",
      "description": "Learn by doing with expert guidance"
    },
    {
      "name": "Premium Ingredients",
      "description": "Work with the finest Belgian chocolate"
    }
  ],
  "pricing": [
    {
      "name": "Individual Session",
      "price": "$75",
      "description": "Perfect for solo learners"
    },
    {
      "name": "Group Session",
      "price": "$60 per person",
      "description": "Groups of 4 or more"
    }
  ],
  "testimonials": [
    {
      "author": "Sarah Johnson",
      "position": "Food Blogger",
      "content": "An amazing experience! I learned so much.",
      "rating": 5
    }
  ],
  "faqs": [
    {
      "question": "Do I need prior experience?",
      "answer": "No experience necessary! We welcome all skill levels."
    }
  ]
}
```

## 6. Permissions Setup

Go to **Settings → Roles → Public**:

1. **Homepage**
   - Enable: `find`

2. **Services Page**
   - Enable: `find`

3. **Service**
   - Enable: `find` and `findOne`

4. **Upload (Media)**
   - Enable: `find` and `findOne`

## 7. Implementation Checklist

- [ ] Create shared components (testimonial, faq)
- [ ] Create service components (feature, pricing)
- [ ] Create homepage components (service-section, featured-service)
- [ ] Create Homepage single type with all sections
- [ ] Create Services Page single type
- [ ] Create Service collection type
- [ ] Set up i18n for all content types
- [ ] Configure permissions
- [ ] Add content for all three languages (ru, en, ro)
- [ ] Test API endpoints with proper population

## 8. Key Differences from Old Structure

1. **Homepage Services**: Uses `featuredServices` component array instead of referencing Service collection
2. **Service Collection**: Simplified structure with components for complex data
3. **Grid Layout**: Uses enumeration for responsive grid classes
4. **Icons**: Uses enumeration for consistent icon names
5. **Colors**: Stores hex colors as strings for flexibility

## 9. Frontend Hook Updates Required

No changes needed to existing hooks if API returns data in this structure. The hooks already expect:
- `homepageData.serviceSection.featuredServices`
- `services` array from collection
- Individual `service` with all nested data

## 10. Migration Notes

If updating existing Strapi:
1. Export existing content first
2. Update schemas gradually
3. Test with one language first
4. Migrate content using Strapi's import/export or API scripts