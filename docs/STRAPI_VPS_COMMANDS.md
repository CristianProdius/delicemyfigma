# Strapi VPS Commands for Services Structure

Copy and paste these commands on your VPS to check the current Strapi structure for services.

## 1. Check Strapi API Structure

```bash
# SSH into VPS
ssh ubuntu@135.148.232.149

# Navigate to Strapi project
cd /var/www/strapi-projects/apps/delice-my

# Check if services collection exists
cat src/api/service/content-types/service/schema.json 2>/dev/null || echo "Services collection not found"

# Check if services-page single type exists
cat src/api/services-page/content-types/services-page/schema.json 2>/dev/null || echo "Services page single type not found"

# Check shared components
ls -la src/components/ 2>/dev/null || echo "No components folder"

# Check if shared testimonial component exists
cat src/components/shared/testimonial.json 2>/dev/null || echo "Testimonial component not found"

# Check if shared FAQ component exists
cat src/components/shared/faq.json 2>/dev/null || echo "FAQ component not found"

# Check if package component exists
cat src/components/shared/package.json 2>/dev/null || echo "Package component not found"

# List all API folders
ls -la src/api/

# List all component categories
ls -la src/components/*/

# Check the database for service entries (if using SQLite)
sqlite3 .tmp/data.db "SELECT COUNT(*) FROM services;" 2>/dev/null || echo "No services in database or not using SQLite"
```

## 2. Check Component Structure in Detail

```bash
# Check all shared components
for file in src/components/shared/*.json; do
  echo "=== $(basename $file) ==="
  cat "$file" 2>/dev/null || echo "File not found"
  echo ""
done

# Check all service components if they exist
for file in src/components/service/*.json; do
  echo "=== $(basename $file) ==="
  cat "$file" 2>/dev/null || echo "File not found"
  echo ""
done
```

## 3. Check Service Collection Schema

```bash
# Full service schema
cat src/api/service/content-types/service/schema.json | jq '.' 2>/dev/null || echo "Service schema not found"

# Just the attributes
cat src/api/service/content-types/service/schema.json | jq '.attributes | keys' 2>/dev/null || echo "Cannot read attributes"
```

## 4. Check Services Page Schema

```bash
# Full services-page schema
cat src/api/services-page/content-types/services-page/schema.json | jq '.' 2>/dev/null || echo "Services page schema not found"

# Just the attributes
cat src/api/services-page/content-types/services-page/schema.json | jq '.attributes | keys' 2>/dev/null || echo "Cannot read attributes"
```

## 5. Test API Endpoints (from VPS)

```bash
# Test if services endpoint works
curl -s "http://localhost:1337/api/services?populate=*" | jq '.data | length' 2>/dev/null || echo "Services API not working"

# Test if services-page endpoint works
curl -s "http://localhost:1337/api/services-page?populate=*" | jq '.data' 2>/dev/null || echo "Services page API not working"

# Get first service with all relations
curl -s "http://localhost:1337/api/services?populate=*&pagination[limit]=1" | jq '.' 2>/dev/null || echo "Cannot fetch services"
```

## 6. Check Strapi Configuration

```bash
# Check if i18n is enabled
cat config/plugins.js | grep -A 5 "i18n" 2>/dev/null || echo "i18n config not found"

# Check API permissions
cat config/api.js 2>/dev/null || echo "API config not found"

# Check middleware config for CORS
cat config/middlewares.js | grep -A 10 "cors" 2>/dev/null || echo "CORS config not found"
```

## 7. Quick Health Check

```bash
# Check if Strapi is running
pm2 status delice-my

# Check recent logs
pm2 logs delice-my --lines 20

# Check Node version
node --version

# Check Strapi version
cat package.json | grep "@strapi/strapi"
```

## 8. Database Inspection (PostgreSQL)

If using PostgreSQL instead of SQLite:

```bash
# Connect to PostgreSQL
sudo -u postgres psql

# In psql prompt:
\c strapi_db  # or your database name
\dt           # List all tables
SELECT COUNT(*) FROM services;
SELECT COUNT(*) FROM services_page;
\q            # Exit
```

## 9. All-in-One Command

Copy this entire block to run all checks at once:

```bash
echo "=== CHECKING STRAPI SERVICES STRUCTURE ==="
echo ""
echo "1. Service Collection Schema:"
cat src/api/service/content-types/service/schema.json 2>/dev/null || echo "❌ Service collection not found"
echo ""
echo "2. Services Page Schema:"
cat src/api/services-page/content-types/services-page/schema.json 2>/dev/null || echo "❌ Services page not found"
echo ""
echo "3. Shared Components:"
ls -la src/components/shared/*.json 2>/dev/null || echo "❌ No shared components"
echo ""
echo "4. Service Components:"
ls -la src/components/service/*.json 2>/dev/null || echo "❌ No service components"
echo ""
echo "5. API Test:"
curl -s "http://localhost:1337/api/services" | jq '.data | length' 2>/dev/null || echo "❌ Services API not responding"
echo ""
echo "6. Strapi Status:"
pm2 status delice-my | grep -E "status|memory|cpu"
echo ""
echo "=== END OF CHECK ==="
```

## Expected Structure

After running these commands, you should see:

### Service Collection (`src/api/service/content-types/service/schema.json`):
- Should have fields: title, slug, shortDescription, longDescription, etc.
- Should have components for features, pricing, testimonials, faqs

### Services Page (`src/api/services-page/content-types/services-page/schema.json`):
- Should have fields: pageTitle, pageSubtitle, pageDescription, heroImage
- Should have CTA fields: ctaTitle, ctaDescription, ctaButtonText, ctaButtonUrl

### Components:
- `src/components/shared/testimonial.json` - for testimonials
- `src/components/shared/faq.json` - for FAQs
- `src/components/shared/package.json` or `src/components/service/pricing.json` - for pricing

## Notes

- Replace `135.148.232.149` with your actual VPS IP
- Replace `delice-my` with your actual PM2 process name if different
- Replace database names if using different names
- Some commands use `jq` for JSON formatting - install with `sudo apt-get install jq` if not available