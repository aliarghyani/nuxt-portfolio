# Project Documentation Index

## nuxt-portfolio

A modern, bilingual portfolio built with Nuxt 4, Nuxt UI, Tailwind CSS 4, and TypeScript.

🔗 **Live Demo:** [aliarghyani.vercel.app](https://aliarghyani.vercel.app)

---

## Project Overview

- **Type:** Monolith (Single-part web application)
- **Primary Language:** TypeScript
- **Architecture:** Component-based SPA with SSG

### Quick Reference

- **Framework:** Nuxt 4.1.3 (Vue 3 + Vite)
- **UI Library:** Nuxt UI 4.0.1
- **Styling:** Tailwind CSS 4.1.14
- **Entry Point:** `app/app.vue`
- **Architecture Pattern:** Component-based with Composables

---

## Generated Documentation

### Core Documentation

- [Project Overview](./project-overview.md) - Executive summary and key features
- [Architecture](./architecture.md) - System design, patterns, and tech stack
- [Source Tree Analysis](./source-tree-analysis.md) - Directory structure and organization

### Development Resources

- [Component Inventory](./component-inventory.md) - 24 Vue components catalog
- [Development Guide](./development-guide.md) - Setup, scripts, and workflow
- [Deployment Guide](./deployment-guide.md) - Hosting and CI/CD configuration

---

## Existing Documentation

- [README.md](../README.md) - Original project documentation

---

## Project Statistics

| Metric | Value |
|--------|-------|
| Components | 24 |
| Composables | 7 |
| Pages | 3 |
| Layouts | 2 |
| API Endpoints | 2 (RSS feeds) |
| Languages | 2 (EN, FA/RTL) |

---

## Getting Started

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Visit: http://localhost:5000

### Key URLs

| URL | Description |
|-----|-------------|
| `/` | Homepage (English) |
| `/fa` | Homepage (Persian/RTL) |
| `/blog` | Blog listing |
| `/fa/blog` | Blog listing (Persian) |
| `/blog/rss.xml` | RSS feed (English) |
| `/fa/blog/rss.xml` | RSS feed (Persian) |

---

## For AI-Assisted Development

When creating a **brownfield PRD** for new features, reference:

1. **Architecture Overview:** [architecture.md](./architecture.md)
2. **Component Patterns:** [component-inventory.md](./component-inventory.md)
3. **Source Structure:** [source-tree-analysis.md](./source-tree-analysis.md)

### Feature Development Tips

- **UI-only features:** Reference component inventory and Nuxt UI patterns
- **New pages:** Follow file-based routing in `app/pages/`
- **New composables:** Add to `app/composables/` (auto-imported)
- **Blog content:** Add MDC files to `content/{en,fa}/blog/`
- **Translations:** Update `i18n/locales/{en,fa}.json`

---

*Generated from project documentation notes*
*Last Updated: 2025-11-30*
