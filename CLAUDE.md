# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

DeliceMy is a Next.js 15 application for a chocolate atelier business in Chisinau, Moldova. The frontend is fully integrated with Strapi CMS for content management, supporting three languages (Russian as default, English, and Romanian).

## Development Commands

```bash
# Development (uses Turbopack)
pnpm run dev

# Build for production
pnpm run build

# Start production server
pnpm start

# Run linting
pnpm run lint
```

## Critical Architecture Decisions

### Content Management
- **NO HARDCODED CONTENT**: All text, images, and data must come from Strapi CMS
- **NO FALLBACK DATA**: If Strapi is unavailable, components should show error states, not fallback content
- The frontend connects to Strapi via SSH tunnel on localhost:1337

### Strapi Integration Setup

1. **SSH Tunnel Required**: 
   ```bash
   ssh -N -L 1337:localhost:1337 ubuntu@135.148.232.149
   ```

2. **Environment Variables** (.env.local):
   - `NEXT_PUBLIC_STRAPI_URL`: Strapi base URL
   - `NEXT_PUBLIC_STRAPI_API_TOKEN`: API authentication token
   - `NEXT_PUBLIC_DEFAULT_LOCALE`: Default language (ru)

3. **API Endpoints**:
   - `/api/header` - Navigation and header content
   - `/api/footer` - Footer content  
   - `/api/homepage` - Homepage sections
   - `/api/i18n/locales` - Available languages

### Core Architecture

```
src/
├── app/                    # Next.js App Router pages
├── components/            # Shared UI components
│   ├── header.tsx        # Navigation (Strapi-powered)
│   └── footer.tsx        # Footer (Strapi-powered)
├── contexts/             # React contexts
│   └── LanguageContext.tsx  # Multi-language support
├── hooks/                # Custom React hooks
│   ├── useHeaderData.ts
│   ├── useFooterData.ts
│   └── useHomepageData.ts
├── lib/                  # Utilities
│   ├── strapi.ts        # Strapi API client
│   └── strapi-server.ts # Server-side Strapi functions
└── modules/              # Feature modules
    └── landing/          # Homepage components
```

### Language Support

The app uses a LanguageContext that:
- Fetches available locales from Strapi
- Stores user preference in localStorage
- Russian (ru) is the default locale
- All components must use `useLanguage()` hook for locale-aware content

### Image Handling

Images from Strapi require Next.js configuration (next.config.ts):
- localhost:1337 must be in allowed remotePatterns
- Use `getStrapiMediaUrl()` helper to construct full URLs

### API Population

Strapi v5 uses `populate=*` (not `populate=deep`) for nested content:
```javascript
params: {
  populate: '*',
  locale: 'ru'
}
```

### CORS Configuration

The Strapi server must include the frontend URL in allowed origins:
- localhost:3001 (default dev port)
- localhost:3002, 3003 (alternate ports)
- Production domains

## Common Issues & Solutions

### 1. **Media/Images Not Showing in Frontend (SOLVED)**

**Problem**: Images uploaded in Strapi don't appear in API responses, even though they're visible in admin.

**Solution**: Strapi v5 requires specific nested populate syntax for component media fields:

```javascript
// In useHomepageData.ts or similar hooks
const response = await strapiApi.get('/homepage', {
  params: {
    populate: {
      heroSection: {
        populate: {
          heroImage: {
            fields: ['url', 'alternativeText', 'width', 'height']
          }
        }
      },
      serviceSection: true,
      aboutSection: true,
      // ... other sections
    },
    locale,
  },
});
```

**Key Learning**: Simple `populate: '*'` won't work for media fields inside components in Strapi v5.

### 2. **CORS Authorization Header Warning (SOLVED)**

**Problem**: Browser warning about Authorization header not being covered when `Access-Control-Allow-Headers` is `*`.

**Solution**: Update `/var/www/strapi-projects/apps/delice-my/config/middlewares.js`:

```javascript
{
  name: 'strapi::cors',
  config: {
    origin: ['http://localhost:3000', 'http://localhost:3001', /* other origins */],
    headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'], // Explicitly list Authorization
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  },
}
```

Then restart: `pm2 restart delice-my`

### 3. **Strapi Single Type i18n Not Isolating Locales (SOLVED)**

**Problem**: Updating content in one locale changes all locales.

**Solution**: 
1. Enable i18n in Content-Type Builder for the Single Type
2. Check that component schema has i18n enabled
3. After enabling, recreate content for each locale separately in Content Manager
4. Verify by checking locale dropdown in Content Manager

### 4. **React "Missing Key Prop" Warning (SOLVED)**

**Problem**: Warning about missing unique keys in list items.

**Solution**: Use stable identifiers instead of array indices:

```javascript
// BAD
{items.map((item, index) => (
  <li key={index}>...</li>
))}

// GOOD
{items.map((item) => (
  <li key={item.href}>...</li>  // or item.id, item.slug, etc.
))}
```

### 5. **Strapi Crash Loop After Schema Changes**

**Problem**: Strapi keeps restarting after enabling i18n on components.

**Solution**:
1. Stop process: `pm2 stop delice-my`
2. Run manually to see errors: `npm run develop`
3. Fix any database migration issues
4. Restart with PM2: `pm2 start npm --name "delice-my" -- run develop`

### 6. **Testing Strapi API Permissions**

To verify API access and populate syntax:

```javascript
// Test in browser console
fetch('http://localhost:1337/api/homepage?populate=*&locale=ru')
  .then(r => r.json())
  .then(data => console.log('API Response:', data));
```

If you get 403 Forbidden:
1. Go to Strapi Admin → Settings → Roles
2. Enable find/findOne for Public role on needed content types
3. Check Media Library permissions are enabled

## Strapi CMS Access

- **Admin Panel**: http://localhost:1337/admin (via SSH tunnel)
- **VPS**: ubuntu@135.148.232.149
- **PM2 Process**: `delice-my`
- **Location**: `/var/www/strapi-projects/apps/delice-my`

## Quick Commands

### SSH & Strapi Management
```bash
# SSH into VPS
ssh -p 22 ubuntu@135.148.232.149

# SSH with tunnel for Strapi admin
ssh -L 1337:localhost:1337 -p 22 ubuntu@135.148.232.149

# On server - manage Strapi
cd /var/www/strapi-projects/apps/delice-my
pm2 status                    # Check if running
pm2 logs delice-my --lines 50 # View logs
pm2 restart delice-my         # Restart
pm2 stop delice-my            # Stop
npm run develop               # Run manually to see errors
```

### Test API Locally
```bash
# Test with populated data
curl "http://localhost:1337/api/homepage?populate=*&locale=ru" | jq

# Test specific component population
curl "http://localhost:1337/api/homepage?populate[heroSection][populate]=heroImage&locale=ru"
```

## Component Development Guidelines

When creating new components that need CMS content:

1. Create a hook in `src/hooks/` to fetch data
2. Use `strapiApi` from `lib/strapi.ts` for API calls
3. Handle loading and error states explicitly
4. Never provide hardcoded fallback content
5. Always respect the current locale from `useLanguage()`

## Deployment Notes

- Frontend can be deployed to Vercel
- Strapi runs on VPS (135.148.232.149)
- Update CORS settings for production domains
- Environment variables must be set in deployment platform