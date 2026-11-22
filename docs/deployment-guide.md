# Deployment Guide

## Overview

Vercel production uses Nuxt's server build with prerendered content pages and a live runtime for résumé PDF generation and GitHub activity.

## Build Process

```bash
# Build the Nuxt server and prerender public pages
pnpm build
```

The Nuxt build includes the server and prerendered assets in `.output` for the local Node preset. Vercel uses its Nuxt integration to package the server and static assets.

The build process will:
- Pre-render all blog posts (English & Persian)
- Generate `sitemap.xml` automatically
- Create RSS feeds for both languages
- Output static files to `.output/public`

## Deployment Platforms

### Vercel (Recommended)

The project includes `vercel.json` with:
- Plausible analytics proxy rewrites
- Cache headers for `/_nuxt/` assets (1 year, immutable)

**Deploy via CLI:**
```bash
npm i -g vercel
vercel
```

**Or connect GitHub repository** for automatic deployments.

### Netlify

1. Connect your GitHub repository
2. Build command: `pnpm generate`
3. Publish directory: `.output/public`

### Cloudflare Pages

1. Connect GitHub repo or upload `.output/public`
2. Build command: `pnpm generate`
3. Build output directory: `.output/public`

### GitHub Pages

1. Run `pnpm generate`
2. Deploy contents of `.output/public`

### AWS S3 + CloudFront

1. Run `pnpm generate`
2. Upload `.output/public` to S3 bucket
3. Configure CloudFront distribution

## Environment Variables

Set these in your hosting platform:

| Variable | Required | Description |
|----------|----------|-------------|
| `NUXT_PUBLIC_LOAD_PLAUSIBLE` | No | Enable Plausible analytics with `true` or `1`. |

## Production Domain Cutover

1. Keep the [official production domain](https://aliarghyani.ir) assigned to Production in the existing Vercel project. The [shared site configuration](../shared/utils/site.ts) provides the canonical origin. Leave `NUXT_PUBLIC_SITE_URL` and `NUXT_SITE_URL` unset in Production so the sitemap module uses that origin.
2. Deploy through the existing GitHub integration and verify the new deployment on the official domain using the checklist below. When tracking is enabled, change the site domain in [Plausible](https://plausible.io/docs/change-domain-name) to `aliarghyani.ir` and verify events with the existing proxy.
3. In **Settings → Domains**, edit `aliarghyani.vercel.app` and select **Redirect to** the production domain with **308 Permanent Redirect**. Verify the first response for a nested path with a query string, such as `/fa/blog?source=legacy&check=1`. Its `Location` should carry the same path and query to the official domain. Confirm the destination returns the expected page.

## Vercel Configuration

`vercel.json` includes:

### Rewrites (Plausible Proxy)
```json
{
  "source": "/stats/js/script.js",
  "destination": "https://plausible.io/js/script.tagged-events.js"
},
{
  "source": "/stats/api/event",
  "destination": "https://plausible.io/api/event"
}
```

### Cache Headers
```json
{
  "source": "/_nuxt/(.*)",
  "headers": [
    {
      "key": "cache-control",
      "value": "public, max-age=31536000, immutable"
    }
  ]
}
```

## Nitro Configuration

Pre-render settings in `nuxt.config.ts`:

```typescript
nitro: {
  prerender: {
    crawlLinks: true,
    routes: ['/', '/blog', '/fa/blog'],
    failOnError: false,
    ignore: ['/_vercel/image']
  }
}
```

## Route Rules

Caching configuration:

| Route | Rule |
|-------|------|
| `/blog` | SWR 3600s (1 hour) |
| `/fa/blog` | SWR 3600s (1 hour) |
| `/blog/**` | SWR 3600s (1 hour) |
| `/fa/blog/**` | SWR 3600s (1 hour) |

## CI/CD

The existing GitHub integration triggers Vercel builds. Use the Production deployment from that integration for the domain cutover.

## Post-Deployment Checklist

- [ ] Confirm HTTP 200 and self-referencing canonicals on `/`, `/fa`, `/blog`, and `/fa/blog`. Check Open Graph, social images and the reciprocal English and Persian alternates in the raw HTML.
- [ ] Confirm canonical, hreflang and JSON-LD URLs on published article pairs with matching and different slugs. Check a single-language article and confirm the draft returns 404.
- [ ] Fetch `/robots.txt`, `/sitemap.xml` and both blog RSS feeds. Check the sitemap declaration, page and image hosts, reciprocal alternates, and the exclusion of drafts and résumé routes.
- [ ] Open `/resume` and `/fa/resume` and confirm their `noindex` metadata. Request `/api/resume/pdf?locale=en` and `/api/resume/pdf?locale=fa`. Check PDF response headers, localized content and the portfolio link.
- [ ] Test the language switcher and light/dark modes. After enabling the old-domain redirect, verify the 308, path and query preservation, and the successful response from the new domain.
