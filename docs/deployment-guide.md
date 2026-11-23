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

## Release Regression Checks

Use the project's pinned Node and pnpm versions. In a local checkout run:

```bash
pnpm typecheck
pnpm build
```

Start the built Nitro server on port 3100 in a separate terminal. Use this build for the entire test run.

```bash
HOST=127.0.0.1 PORT=3100 node .output/server/index.mjs
```

On Windows PowerShell:

```powershell
$env:HOST = '127.0.0.1'
$env:PORT = '3100'
node .output/server/index.mjs
```

With the server running, execute:

```bash
pnpm check:release
node scripts/check-portfolio.mjs http://127.0.0.1:3100
node scripts/check-locale-ux.mjs http://127.0.0.1:3100
```

`pnpm check:release` accepts a loopback preview origin as an optional argument. It checks raw responses for the English and Persian homepages, blog indexes and representative posts. It follows the sitemap's current URL set to check canonical and reciprocal hreflang links, then checks robots, RSS, draft exclusion, résumé noindex and both PDFs. It also verifies the PDF content headers and `X-Robots-Tag` on successful responses. The browser scripts cover the rendered layouts, RTL/LTR, language switching and additional PDF assertions.

The browser scripts use Puppeteer's Chrome by default. To use an installed Chrome, set `CHROME_PATH` in the test terminal. For PDF generation with installed Chrome on Windows or macOS, set `PUPPETEER_EXECUTABLE_PATH` to its executable in the server terminal before starting Nitro. The production Linux server uses the existing bundled Chromium path. Use `pnpm build` for this workflow so the PDF endpoint has a running Nitro server.

### Production Domain Smoke Check

```bash
pnpm check:production
```

This command makes read-only requests to the three live HTTPS hosts. It expects `200` at the apex and a direct `308` from both the legacy host and `www`. It checks root and nested URLs, including exact preservation of escaped and repeated query parameters. Run it independently of the local preview, and rerun it after approved DNS, Vercel domain, or deployment changes.

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

| Variable                     | Required | Description                                    |
| ---------------------------- | -------- | ---------------------------------------------- |
| `NUXT_PUBLIC_LOAD_PLAUSIBLE` | No       | Enable Plausible analytics with `true` or `1`. |

## Production Domain Cutover

1. Keep the [official production domain](https://aliarghyani.ir) assigned to Production in the `nuxt-portfolio-aliarghyani` Vercel project. The [shared site configuration](../shared/utils/site.ts) provides the canonical origin. Leave `NUXT_PUBLIC_SITE_URL` and `NUXT_SITE_URL` unset in Production so the sitemap module uses that origin.
2. Deploy through the existing GitHub integration and verify the new deployment on the official domain using the checklist below. When tracking is enabled, change the site domain in [Plausible](https://plausible.io/docs/change-domain-name) to `aliarghyani.ir` and verify events with the existing proxy.
3. In **Settings → Domains**, edit `aliarghyani.vercel.app` and select **Redirect to** the production domain with **308 Permanent Redirect**. Verify the first response for a nested path with a query string, such as `/fa/blog?source=legacy&check=1`. Its `Location` should carry the same path and query to the official domain. Confirm the destination returns the expected page.
4. Verify that `www.aliarghyani.ir` also redirects directly to the primary domain with `308`. The production smoke command checks both redirects.

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
    routes: ['/', '/blog', '/fa/blog', '/blog/rss.xml', '/fa/blog/rss.xml'],
    failOnError: false,
    ignore: ['/_vercel/image']
  }
}
```

## Route Rules

Blog HTML uses `Cache-Control: no-store` to keep the page and its JavaScript chunks on the same deployment. Vercel also sends no-store directives for its CDN. The RSS routes use a separate 3600-second SWR rule in Nitro.

The HTML résumé routes are excluded from the sitemap and emit a robots `noindex` meta tag. The PDF route sends `X-Robots-Tag: noindex`.

## CI/CD

The existing GitHub integration triggers Vercel builds. Use the Production deployment from that integration for the domain cutover.

## Post-Deployment Checklist

- [ ] Confirm HTTP 200 and self-referencing canonicals on `/`, `/fa`, `/blog`, and `/fa/blog`. Check Open Graph, social images and the reciprocal English and Persian alternates in the raw HTML.
- [ ] Confirm canonical, hreflang and JSON-LD URLs on published article pairs with matching and different slugs. Check a single-language article and confirm the draft returns 404.
- [ ] Fetch `/robots.txt`, `/sitemap.xml` and both blog RSS feeds. Check the sitemap declaration, page and image hosts, reciprocal alternates, and the exclusion of drafts and résumé routes.
- [ ] Open `/resume` and `/fa/resume` and confirm their `noindex` metadata. Request `/api/resume/pdf?locale=en` and `/api/resume/pdf?locale=fa`. Check PDF response headers, localized content and the portfolio link.
- [ ] Test the language switcher and light/dark modes. Use the production smoke command to verify both redirects and the successful response from the primary domain.
