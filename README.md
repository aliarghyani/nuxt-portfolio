[![Website Preview](/public/img/page-preview.JPG)](https://aliarghyani.vercel.app)

# Nuxt UI Portfolio · Ali Arghyani

A modern, bilingual portfolio built with Nuxt 4, Nuxt UI, Tailwind CSS 4, and TypeScript. Features English and Persian (RTL) support with dark mode as default.

🔗 **Live Demo**: [aliarghyani.vercel.app](https://aliarghyani.vercel.app)

## ✨ Features

- **Nuxt 4** - Latest framework with `app/` directory structure
- **Nuxt UI 4** - Modern component library with custom theming
- **Tailwind CSS 4** - Utility-first styling with custom variants
- **TypeScript** - Full type safety
- **i18n** - English & Persian with automatic RTL switching
- **Dark Mode** - Default theme with light mode option
- **Responsive Images** - Optimized with `@nuxt/image`
- **Performance** - Lazy loading, font preloading, reduced motion support

## � Quick Start

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Visit: http://localhost:3000

### Requirements
- Node.js 18.20.0 or newer (up to 22.x)
- pnpm (recommended) or npm

### Available Scripts

```bash
pnpm dev              # Start dev server
pnpm build            # Build for production
pnpm preview          # Preview production build
pnpm generate         # Generate static site
pnpm typecheck        # Run TypeScript checks
pnpm format           # Check code formatting
pnpm format:write     # Fix code formatting
```

## 📁 Project Structure

```
app/                    # Source directory (srcDir)
  ├── app.vue           # Root component
  ├── app.config.ts     # Nuxt UI theme tokens
  ├── error.vue         # Error page (404, 500)
  ├── assets/css/       # Tailwind & global styles
  ├── components/       # Auto-imported components
  │   ├── common/       # Shared UI (TopNav, Footer)
  │   └── portfolio/    # Portfolio components
  ├── composables/      # Auto-imported composables
  ├── data/             # Static content (EN/FA)
  ├── layouts/          # Layout components
  ├── middleware/       # Route middleware
  ├── pages/            # File-based routing
  ├── plugins/          # Nuxt plugins
  ├── types/            # TypeScript definitions
  └── utils/            # Helper functions

server/                 # Server-side code
  └── api/              # API endpoints
      └── health.get.ts # Health check (/api/health)

public/                 # Static assets
  ├── favicon/          # Favicon files
  ├── fonts/            # Local fonts (Roobert, Vazirmatn)
  └── img/              # Images

i18n/                   # Internationalization
  └── locales/          # Translation files (en.json, fa.json)
```

## 🌐 Internationalization

- **Strategy**: `prefix_except_default` (English is default, Persian uses `/fa` prefix)
- **Locales**: English (`en`) and Persian (`fa`) with RTL support
- **Content**: Separate data files for each language in `app/data/`
- **Switching**: Automatic `lang` and `dir` attributes update on locale change

## 🎨 Styling & Theming

- **Tailwind CSS 4** with custom utilities and variants
- **Nuxt UI tokens** in `app.config.ts` for consistent theming
- **Dark mode** as default with `@nuxtjs/color-mode`
- **Local fonts**: Roobert (EN) and Vazirmatn (FA) preloaded for performance
- **Custom chip utility** for tags and badges

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or connect your GitHub repository to Vercel for automatic deployments.

### Static Hosting
```bash
# Generate static files
pnpm generate

# Deploy .output/public to any static host
```

### Environment Variables
- `NUXT_PUBLIC_LOAD_PLAUSIBLE` - Enable/disable Plausible analytics (optional)

## 🧪 Testing the Structure

```bash
# Homepage
http://localhost:3000

# Persian version
http://localhost:3000/fa

# Health check API
http://localhost:3000/api/health

# 404 error page
http://localhost:3000/non-existent-page
```

## 🛠️ Tech Stack

- **Framework**: Nuxt 4 (Vue 3 + Vite)
- **UI Library**: Nuxt UI 4
- **Styling**: Tailwind CSS 4
- **Language**: TypeScript
- **i18n**: @nuxtjs/i18n
- **Theme**: @nuxtjs/color-mode
- **Images**: @nuxt/image
- **Utilities**: VueUse

## 📝 Auto-imports

Nuxt automatically imports:
- Components from `app/components/`
- Composables from `app/composables/`
- Utils from `app/utils/`

No explicit imports needed!

## 🤝 Contributing

Issues and pull requests are welcome. Please run `pnpm typecheck` and `pnpm format` before submitting changes.

## 📄 License

MIT License - See [LICENSE](./LICENSE) for details.

---

**Made with ❤️ by Ali Arghyani**
