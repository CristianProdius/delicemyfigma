# Create Services Page Single Type in Strapi

Based on your current structure, you have the Service collection but need to create the Services Page single type.

## Current Status ✅
- ✅ **Service Collection** exists with all fields
- ✅ Using components: `shared.testimonial`, `shared.faq`, `shared.seo`, `shared.location`
- ✅ Using `service.feature` and `service.pricing` components
- ❌ **Services Page Single Type** is missing

## Steps to Create Services Page Single Type

### 1. SSH into your VPS
```bash
ssh ubuntu@135.148.232.149
cd /var/www/strapi-projects/apps/delice-my
```

### 2. Create the Services Page structure

Create the directory structure:
```bash
mkdir -p src/api/services-page/content-types/services-page
mkdir -p src/api/services-page/controllers
mkdir -p src/api/services-page/routes
mkdir -p src/api/services-page/services
```

### 3. Create the schema file

Create `src/api/services-page/content-types/services-page/schema.json`:

```bash
cat > src/api/services-page/content-types/services-page/schema.json << 'EOF'
{
  "kind": "singleType",
  "collectionName": "services_pages",
  "info": {
    "singularName": "services-page",
    "pluralName": "services-pages",
    "displayName": "Services Page",
    "description": "Services page content and settings"
  },
  "options": {
    "draftAndPublish": true
  },
  "pluginOptions": {
    "i18n": {
      "localized": true
    }
  },
  "attributes": {
    "pageTitle": {
      "type": "string",
      "default": "Our Services",
      "required": true,
      "pluginOptions": {
        "i18n": {
          "localized": true
        }
      }
    },
    "pageSubtitle": {
      "type": "string",
      "default": "Artisan Excellence",
      "pluginOptions": {
        "i18n": {
          "localized": true
        }
      }
    },
    "pageDescription": {
      "type": "richtext",
      "pluginOptions": {
        "i18n": {
          "localized": true
        }
      }
    },
    "heroImage": {
      "type": "media",
      "multiple": false,
      "allowedTypes": ["images"],
      "pluginOptions": {
        "i18n": {
          "localized": false
        }
      }
    },
    "ctaTitle": {
      "type": "string",
      "default": "Can't Find What You're Looking For?",
      "pluginOptions": {
        "i18n": {
          "localized": true
        }
      }
    },
    "ctaDescription": {
      "type": "richtext",
      "pluginOptions": {
        "i18n": {
          "localized": true
        }
      }
    },
    "ctaButtonText": {
      "type": "string",
      "default": "Contact Us",
      "pluginOptions": {
        "i18n": {
          "localized": true
        }
      }
    },
    "ctaButtonUrl": {
      "type": "string",
      "default": "/contact",
      "pluginOptions": {
        "i18n": {
          "localized": false
        }
      }
    },
    "seo": {
      "type": "component",
      "component": "shared.seo",
      "repeatable": false
    }
  }
}
EOF
```

### 4. Create the controller

Create `src/api/services-page/controllers/services-page.js`:

```bash
cat > src/api/services-page/controllers/services-page.js << 'EOF'
'use strict';

/**
 * services-page controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::services-page.services-page');
EOF
```

### 5. Create the service

Create `src/api/services-page/services/services-page.js`:

```bash
cat > src/api/services-page/services/services-page.js << 'EOF'
'use strict';

/**
 * services-page service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::services-page.services-page');
EOF
```

### 6. Create the routes

Create `src/api/services-page/routes/services-page.js`:

```bash
cat > src/api/services-page/routes/services-page.js << 'EOF'
'use strict';

/**
 * services-page router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::services-page.services-page');
EOF
```

### 7. Restart Strapi

```bash
pm2 restart delice-my
pm2 logs delice-my --lines 50
```

### 8. Set Permissions

After restart, go to Strapi Admin:
1. Navigate to Settings → Roles → Public
2. Find "Services-page" 
3. Enable: `find`
4. Save

### 9. Add Content

Go to Content Manager → Services Page and add:

**Russian (default):**
```
pageTitle: Наши Услуги
pageSubtitle: Мастерство Ремесленника
pageDescription: От интимных шоколадных мастер-классов до грандиозных корпоративных мероприятий
ctaTitle: Не нашли то, что искали?
ctaDescription: Мы любим создавать уникальные впечатления, адаптированные к вашим потребностям
ctaButtonText: Связаться с нами
```

**English:**
```
pageTitle: Our Services
pageSubtitle: Artisan Excellence
pageDescription: From intimate chocolate classes to grand corporate events
ctaTitle: Can't Find What You're Looking For?
ctaDescription: We love creating custom experiences tailored to your unique needs
ctaButtonText: Contact Us
```

**Romanian:**
```
pageTitle: Serviciile Noastre
pageSubtitle: Excelență Artizanală
pageDescription: De la cursuri intime de ciocolată la evenimente corporative grandioase
ctaTitle: Nu găsiți ceea ce căutați?
ctaDescription: Ne place să creăm experiențe personalizate adaptate nevoilor dvs. unice
ctaButtonText: Contactați-ne
```

## Check Components

Run these commands to see what components you have:

```bash
# List all shared components
ls -la src/components/shared/

# Check testimonial component
cat src/components/shared/testimonial.json

# Check FAQ component
cat src/components/shared/faq.json

# Check SEO component
cat src/components/shared/seo.json

# Check location component
cat src/components/shared/location.json

# Check service components
ls -la src/components/service/
cat src/components/service/feature.json
cat src/components/service/pricing.json
```

## Test the API

After creating and adding content:

```bash
# Test services page endpoint
curl -s "http://localhost:1337/api/services-page?populate=*&locale=ru" | jq '.'

# Test services endpoint
curl -s "http://localhost:1337/api/services?populate=*&locale=ru" | jq '.data | length'

# Get first service with all details
curl -s "http://localhost:1337/api/services?populate[features]=*&populate[testimonials]=*&populate[faqs]=*&populate[pricing]=*&pagination[limit]=1&locale=ru" | jq '.'
```

## Notes on Your Structure

Your Service collection is well-structured with:
- ✅ i18n enabled
- ✅ Using shared components (testimonial, faq, seo, location)
- ✅ Service-specific components (feature, pricing)
- ✅ Good field organization

The frontend is ready to consume this data once you:
1. Create the Services Page single type (using commands above)
2. Add content for your services
3. Set proper permissions

## Missing Field: `featured`

To mark services for homepage display, add a `featured` field:

```bash
# In Strapi Admin → Content-Type Builder → Service
# Add field:
# - Name: featured
# - Type: Boolean
# - Default: false
```

Or add it manually to the schema.json after line 149 (after `additionalInfo`):

```json
"featured": {
  "type": "boolean",
  "default": false,
  "pluginOptions": {
    "i18n": {
      "localized": false
    }
  }
}
```

Then restart Strapi: `pm2 restart delice-my`