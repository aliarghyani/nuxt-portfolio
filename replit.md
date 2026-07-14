# Nuxt UI Portfolio - Replit Configuration

## Overview

This is a modern, bilingual portfolio website built with Nuxt 4, featuring English and Persian (RTL) support with dark mode as default. The project has been configured to run in the Replit environment.

## Project Information

- **Framework**: Nuxt 4 (Vue 3 + Vite)
- **UI Library**: Nuxt UI 4
- **Styling**: Tailwind CSS 4
- **Language**: TypeScript
- **i18n**: English & Persian with automatic RTL switching
- **Package Manager**: pnpm (but npm works in Replit)

## Recent Changes (November 24, 2025)

- Upgraded Node.js from 18 to 20 (required by Nuxt 4 and its dependencies)
- Configured Nuxt dev server to run on port 5000 with host 0.0.0.0 for Replit compatibility
- Configured Nitro dev proxy to bind to 0.0.0.0
- Set up workflow for automatic dev server startup
- Configured deployment for static site generation (SSG) with build command and output directory
- Removed obsolete experimental content configuration options
- Fixed LSP errors in nuxt.config.ts

## Project Structure

```
app/                    # Source directory (srcDir)
  ├── app.vue           # Root component
  ├── app.config.ts     # Nuxt UI theme tokens
  ├── components/       # Auto-imported components
  ├── composables/      # Auto-imported composables
  ├── data/             # Static content (EN/FA)
  ├── layouts/          # Layout components
  ├── pages/            # File-based routing
  └── assets/css/       # Tailwind & global styles

server/                 # Server-side code
  └── api/              # API endpoints

content/                # Nuxt Content markdown files (blog posts)

public/                 # Static assets
  ├── favicon/
  ├── fonts/            # Local fonts (Roobert, Vazirmatn)
  └── img/              # Images
```

## Replit-Specific Configuration

## Local Development

For local desktop development, use the standard dev command:

```bash
pnpm dev
```

The local server runs at:

```text
http://127.0.0.1:3000/
```

`pnpm dev:local` is also available as an explicit local alias. Replit still uses `npm run dev:replit` and remains on port `5000`.

### Dev Server

- **Port**: 5000 (required for Replit webview)
- **Host**: 0.0.0.0 (allows external connections)
- **HMR**: Configured to use clientPort 5000

### Environment Variables

No required environment variables for development. Optional:

- `NUXT_PUBLIC_LOAD_PLAUSIBLE` - Enable/disable Plausible analytics
- `NUXT_PUBLIC_SITE_URL` - Site URL for sitemap and RSS

## Features

- Bilingual content (English/Persian)
- Dark mode by default
- Responsive design
- Blog with markdown content
- Optimized images
- SEO-friendly (sitemap, RSS feeds)
- View transitions API support

## Development Notes

- Dependencies are auto-installed via npm on Replit
- The dev server automatically restarts when files change
- Content is served from the `content/` directory for blog posts
- Translations are in `i18n/locales/` directory
