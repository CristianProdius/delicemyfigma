#!/bin/bash

# SSH into VPS and run these commands
# ssh ubuntu@135.148.232.149
# cd /var/www/strapi-projects/apps/delice-my

echo "========================================"
echo "1. SERVICE COLLECTION TYPE"
echo "========================================"
cat src/api/service/content-types/service/schema.json | jq '.'

echo ""
echo "========================================"
echo "2. SERVICES PAGE SINGLE TYPE"
echo "========================================"
cat src/api/services-page/content-types/services-page/schema.json | jq '.'

echo ""
echo "========================================"
echo "3. SERVICE COMPONENTS - FEATURE"
echo "========================================"
cat src/components/service/feature.json | jq '.'

echo ""
echo "========================================"
echo "4. SERVICE COMPONENTS - PRICING"
echo "========================================"
cat src/components/service/pricing.json | jq '.'

echo ""
echo "========================================"
echo "5. SHARED COMPONENTS - TESTIMONIAL"
echo "========================================"
cat src/components/shared/testimonial.json | jq '.'

echo ""
echo "========================================"
echo "6. SHARED COMPONENTS - FAQ"
echo "========================================"
cat src/components/shared/faq.json | jq '.'

echo ""
echo "========================================"
echo "7. HOMEPAGE SERVICE SECTION COMPONENT"
echo "========================================"
cat src/components/homepage/service-section.json 2>/dev/null || echo "Not found - may be named differently"

echo ""
echo "========================================"
echo "8. HOMEPAGE FEATURED SERVICE COMPONENT"
echo "========================================"
cat src/components/homepage/featured-service.json 2>/dev/null || echo "Not found - may be named differently"

echo ""
echo "========================================"
echo "9. CHECK ALL HOMEPAGE COMPONENTS"
echo "========================================"
ls -la src/components/homepage/*.json 2>/dev/null || echo "No homepage components folder"

echo ""
echo "========================================"
echo "10. CHECK ALL SERVICE COMPONENTS"
echo "========================================"
ls -la src/components/service/*.json 2>/dev/null || echo "No service components folder"

echo ""
echo "========================================"
echo "11. CHECK ALL SHARED COMPONENTS"
echo "========================================"
ls -la src/components/shared/*.json

echo ""
echo "========================================"
echo "12. HOMEPAGE SINGLE TYPE (to see service section)"
echo "========================================"
cat src/api/homepage/content-types/homepage/schema.json | jq '.attributes.serviceSection'

echo ""
echo "========================================"
echo "13. TEST API - SERVICES PAGE"
echo "========================================"
curl -s "http://localhost:1337/api/services-page?populate=*&locale=ru" | jq '.'

echo ""
echo "========================================"
echo "14. TEST API - SERVICE COLLECTION (first item)"
echo "========================================"
curl -s "http://localhost:1337/api/services?populate[heroImage][fields][0]=url&populate[features]=*&populate[pricing]=*&populate[testimonials]=*&populate[faqs]=*&pagination[limit]=1&locale=ru" | jq '.'

echo ""
echo "========================================"
echo "15. CHECK IF SERVICE HAS GALLERY IMAGES FIELD"
echo "========================================"
cat src/api/service/content-types/service/schema.json | jq '.attributes.galleryImages'