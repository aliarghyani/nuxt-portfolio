# Development Guide

## Prerequisites

- **Node.js:** 18.20.0 or newer (up to 22.x)
- **Package Manager:** pnpm 9.12.1 (recommended)

## Quick Start

```bash
# Clone the repository
git clone <repository-url>
cd nuxt-portfolio

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Visit: http://localhost:5000

## Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server (port 5000) |
| `pnpm build` | Build for production |
| `pnpm generate` | Generate static site (SSG) |
| `pnpm preview` | Preview production build |
| `pnpm typecheck` | Run TypeScript type checking |
| `pnpm format` | Check code formatting (Prettier) |
| `pnpm format:write` | Fix code formatting |

## Environment Variables

Create a `.env` file based on `.env.example`:

| Variable | Description | Default |
|----------|-------------|---------|
| `NUXT_PUBLIC_LOAD_PLAUSIBLE` | Enable Plausible analytics | `"no"` |

The canonical production origin is defined in [the shared site configuration](../shared/utils/site.ts).

## Project Configuration

### Nuxt Configuration (`nuxt.config.ts`)

Key settings:
- **srcDir:** `app/` - Source directory
- **Dev Server:** `0.0.0.0:5000`
- **Color Mode:** Dark mode default
- **i18n Strategy:** `prefix_except_default` (EN default, FA uses `/fa` prefix)

### TypeScript Configuration

Extends `.nuxt/tsconfig.json` with bundler module resolution.

### Tailwind CSS 4

Custom PostCSS plugins:
- `@csstools/postcss-oklab-function`
- `@csstools/postcss-relative-color-syntax`
- `@csstools/postcss-color-mix-function`
- `postcss-preset-env` (stage 0, nesting rules)

## Auto-imports

Nuxt automatically imports:
- Components from `app/components/`
- Composables from `app/composables/`
- Utils from `app/utils/`

No explicit imports needed!

## Testing URLs

```bash
# Homepage
http://localhost:5000

# Persian version
http://localhost:5000/fa

# Blog
http://localhost:5000/blog

# Persian Blog
http://localhost:5000/fa/blog

# RSS Feeds
http://localhost:5000/blog/rss.xml
http://localhost:5000/fa/blog/rss.xml
```

## Code Style

- **Formatter:** Prettier with Tailwind CSS plugin
- **Type Checking:** TypeScript strict mode via Nuxt
- Run `pnpm format` before committing
- Run `pnpm typecheck` to verify types

## Adding Content

### Blog Posts

1. Create MDC file in `content/en/blog/` or `content/fa/blog/`
2. Use frontmatter for metadata (title, description, date, tags)
3. Posts are automatically pre-rendered during `pnpm generate`

### Portfolio Data

Edit locale-specific files:
- English: `app/data/portfolio.en.ts`
- Persian: `app/data/portfolio.fa.ts`

### Translations

Edit JSON files in `i18n/locales/`:
- English: `en.json`
- Persian: `fa.json`
