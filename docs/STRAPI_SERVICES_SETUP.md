# Strapi Services Setup Guide

This guide will walk you through creating the complete services structure in Strapi for the DeliceMy website.

## Table of Contents
1. [Components Setup](#1-components-setup)
2. [Services Collection Type](#2-services-collection-type)
3. [Services Page Single Type](#3-services-page-single-type)
4. [Content Creation](#4-content-creation)
5. [API Permissions](#5-api-permissions)
6. [Testing](#6-testing)

---

## 1. Components Setup

First, create reusable components that will be used in the Services collection.

### Navigate to: Content-Type Builder → Components

### 1.1 Create Component Category: `service`

Create a new category called `service` for all service-related components.

### 1.2 Service Feature Component
**Name:** `service.feature`

| Field | Type | Options |
|-------|------|---------|
| icon | Text | Required, Short text |
| title | Text | Required |
| description | Text | Required, Long text |

### 1.3 Service Pricing Component
**Name:** `service.pricing`

| Field | Type | Options |
|-------|------|---------|
| type | Enumeration | Values: `fixed`, `range`, `custom`, `package` |
| currency | Text | Default: "USD" |
| amount | Number | Decimal |
| minAmount | Number | Decimal |
| maxAmount | Number | Decimal |
| unit | Text | (e.g., "per person", "per hour") |
| packages | JSON | For complex package structures |
| note | Text | Long text |

### 1.4 Service Testimonial Component
**Name:** `service.testimonial`

| Field | Type | Options |
|-------|------|---------|
| name | Text | Required |
| role | Text | |
| company | Text | |
| content | Rich Text | Required |
| rating | Number | Integer, Min: 1, Max: 5 |
| image | Media | Single media, Images only |

### 1.5 Service FAQ Component
**Name:** `service.faq`

| Field | Type | Options |
|-------|------|---------|
| question | Text | Required |
| answer | Rich Text | Required |

---

## 2. Services Collection Type

### Navigate to: Content-Type Builder → Collection Types → Create

**Name:** `Service` (singular) / `Services` (plural)
**API ID:** `service`

### Fields Configuration:

#### Basic Information
| Field | Type | Options |
|-------|------|---------|
| title | Text | Required |
| slug | UID | Target field: title, Required |
| shortDescription | Text | Required, Max length: 300 |
| longDescription | Rich Text | Required |
| featured | Boolean | Default: false |

#### Media
| Field | Type | Options |
|-------|------|---------|
| heroImage | Media | Single media, Required |
| galleryImages | Media | Multiple media |

#### Details
| Field | Type | Options |
|-------|------|---------|
| duration | Text | |
| groupSize | Text | |
| availability | Text | |
| location | Text | |
| accentColor | Text | Required (hex color, e.g., "#D4A574") |
| icon | Text | Required (icon name, e.g., "Users") |

#### Lists (JSON Fields)
| Field | Type | Options |
|-------|------|---------|
| targetAudience | JSON | Array of strings |
| benefits | JSON | Array of strings |
| requirements | JSON | Array of strings |
| includedInPrice | JSON | Array of strings |

#### Components
| Field | Type | Options |
|-------|------|---------|
| features | Component | Repeatable, Use: service.feature |
| pricing | Component | Single, Use: service.pricing |
| testimonials | Component | Repeatable, Use: service.testimonial |
| faqs | Component | Repeatable, Use: service.faq |

#### CTA
| Field | Type | Options |
|-------|------|---------|
| ctaText | Text | Long text |
| ctaButtonText | Text | Default: "Book Now" |

#### Additional
| Field | Type | Options |
|-------|------|---------|
| additionalInfo | Rich Text | |
| sortOrder | Number | Integer, for ordering |

### Enable Internationalization (i18n)
- Go to Advanced Settings
- Enable localization for this content type
- Enable for all fields except `slug`

---

## 3. Services Page Single Type

### Navigate to: Content-Type Builder → Single Types → Create

**Name:** `Services Page`
**API ID:** `services-page`

### Fields Configuration:

#### Hero Section
| Field | Type | Options |
|-------|------|---------|
| pageTitle | Text | Required, Default: "Our Services" |
| pageSubtitle | Text | Default: "Artisan Excellence" |
| pageDescription | Rich Text | |
| heroImage | Media | Single media |

#### CTA Section
| Field | Type | Options |
|-------|------|---------|
| ctaTitle | Text | Default: "Can't Find What You're Looking For?" |
| ctaDescription | Rich Text | |
| ctaButtonText | Text | Default: "Contact Us" |
| ctaButtonUrl | Text | Default: "/contact" |

#### SEO
| Field | Type | Options |
|-------|------|---------|
| seo | Component | Use existing SEO component |

### Enable Internationalization (i18n)
- Enable localization for this single type

---

## 4. Content Creation

### 4.1 Services to Create

Create these services in Content Manager → Services:

1. **Chocolate Classes for Adults**
   - slug: `chocolate-classes-adults`
   - icon: `Users`
   - accentColor: `#D4A574`
   - featured: `true`

2. **Kids Chocolate Classes**
   - slug: `kids-chocolate-classes`
   - icon: `Sparkles`
   - accentColor: `#E8B4B8`
   - featured: `true`

3. **Restaurant & Café Services**
   - slug: `restaurant-cafe-services`
   - icon: `Utensils`
   - accentColor: `#A67B5B`
   - featured: `true`

4. **Chocolate Parties & Events**
   - slug: `chocolate-parties-events`
   - icon: `PartyPopper`
   - accentColor: `#F4A460`
   - featured: `true`

5. **Custom Dessert Design**
   - slug: `custom-dessert-design`
   - icon: `Palette`
   - accentColor: `#CD853F`
   - featured: `true`

6. **Personalized Chocolate Gifts**
   - slug: `personalized-chocolate-gifts`
   - icon: `Gift`
   - accentColor: `#E0D9C9`
   - featured: `true`

### 4.2 Example Service Data Structure

```json
{
  "title": "Chocolate Classes for Adults",
  "slug": "chocolate-classes-adults",
  "shortDescription": "Learn to make chocolates like a pro. Group or private lessons available.",
  "longDescription": "<Rich text content>",
  "featured": true,
  "duration": "3 hours to 6 weeks",
  "groupSize": "2-8 participants",
  "accentColor": "#D4A574",
  "icon": "Users",
  "features": [
    {
      "icon": "GraduationCap",
      "title": "Expert Instruction",
      "description": "Learn from a master chocolatier"
    }
  ],
  "pricing": {
    "type": "package",
    "currency": "USD",
    "packages": [
      {
        "name": "Introduction Workshop",
        "price": 150,
        "features": ["3-hour session", "20 bonbons"],
        "highlighted": false
      }
    ]
  },
  "targetAudience": [
    "Culinary enthusiasts",
    "Aspiring chocolatiers"
  ],
  "benefits": [
    "Master professional techniques",
    "Create restaurant-quality bonbons"
  ]
}
```

### 4.3 Services Page Content

Create content for Services Page single type:

```
pageTitle: "Our Services"
pageSubtitle: "Artisan Excellence"
pageDescription: "From intimate chocolate classes to grand corporate events..."
ctaTitle: "Can't Find What You're Looking For?"
ctaDescription: "We love creating custom experiences..."
ctaButtonText: "Contact Us"
ctaButtonUrl: "/contact"
```

---

## 5. API Permissions

### Navigate to: Settings → Roles → Public

Enable these permissions:

#### Service
- [x] find
- [x] findOne

#### Services Page
- [x] find

#### Upload (for images)
- [x] find
- [x] findOne

---

## 6. Testing

### 6.1 Test API Endpoints

After creating content, test these endpoints:

```bash
# Get all services
curl "http://localhost:1337/api/services?populate=*&locale=ru"

# Get single service
curl "http://localhost:1337/api/services?filters[slug]=chocolate-classes-adults&populate=*"

# Get featured services for homepage
curl "http://localhost:1337/api/services?filters[featured]=true&populate=*"

# Get services page
curl "http://localhost:1337/api/services-page?populate=*&locale=ru"
```

### 6.2 Verify Structure

Check that each service has:
- ✅ All required fields filled
- ✅ At least one hero image
- ✅ Proper slug for URL routing
- ✅ Consistent accent colors
- ✅ Valid icon names

---

## 7. Homepage Integration

To avoid duplication with homepage:

1. **Update Homepage Service Section** in Strapi:
   - Remove the `featuredServices` field from homepage
   - The frontend will query services with `featured: true`

2. **Frontend will use:**
   - Homepage: `getServices(locale, true)` - gets featured services
   - Services Page: `getServices(locale)` - gets all services

---

## 8. Icon Names Reference

Valid icon names for services:

- `Users` - Adult classes
- `Sparkles` - Kids classes
- `Utensils` - Restaurant services
- `PartyPopper` - Events
- `Palette` - Custom design
- `Gift` - Personalized gifts
- `GraduationCap` - Education
- `Briefcase` - Business
- `Heart` - Love/Care
- `Star` - Premium
- `Award` - Excellence
- `Clock` - Time
- `Calendar` - Scheduling
- `Truck` - Delivery
- `Coffee` - Refreshments

---

## 9. Troubleshooting

### Common Issues:

**Problem:** Services not showing on frontend
- **Solution:** Check that API permissions are enabled for Public role

**Problem:** Images not loading
- **Solution:** Ensure media fields are populated in query: `populate[heroImage]=*`

**Problem:** Locale switching not working
- **Solution:** Enable i18n for the content type and create content for each locale

**Problem:** Featured services not filtering
- **Solution:** Use correct filter syntax: `filters[featured]=true`

---

## Next Steps

After completing Strapi setup:

1. Restart Strapi: `pm2 restart delice-my`
2. Clear any caches
3. Test API endpoints
4. Frontend will automatically consume the data
5. Update homepage to use services collection for featured items

---

## Support

For issues, check:
- Strapi logs: `pm2 logs delice-my`
- Network tab in browser DevTools
- Frontend console for API errors