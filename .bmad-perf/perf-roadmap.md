# Nuxt UI Portfolio · Performance Roadmap (BMad)

این داک، نقشه‌راه بهینه‌سازی Performance برای پروژه را در ۶ فاز نگه می‌دارد. هر فاز در یک فایل جداگانه توضیح داده می‌شود.

## فهرست فازها

- [Phase 00 – Baseline & Observability](./phase-00-baseline.md)
- [Phase 01 – Initial Load & LCP (Images, Fonts, CSS)](./phase-01-initial-load.md)
- [Phase 02 – JS Bundle & Lazy-loading](./phase-02-bundle-lazy-loading.md)
- [Phase 03 – Data Layer (Nuxt Content, i18n) & Caching](./phase-03-data-layer-caching.md)
- [Phase 04 – Animations, ViewTransitions & Third-parties](./phase-04-animations-third-party.md)
- [Phase 05 – Hardening, Monitoring & Maintenance](./phase-05-hardening-monitoring.md)

## وضعیت فعلی (خلاصه)

- Framework: Nuxt 4 (SSG-enabled)  
- UI: Nuxt UI 4 + Tailwind CSS  
- Images: `@nuxt/image` فعال، استفاده از `NuxtImg` در بخش‌هایی از UI  
- i18n: `@nuxtjs/i18n` با lazy loading (`langDir`)  
- Caching: `routeRules` و `nitro.prerender` برای بلاگ و صفحه اصلی تنظیم شده‌اند  
- Hosting: Vercel (static-first)

Trace اولیه صفحه اصلی `/` (با Chrome DevTools MCP):

- LCP ≈ **1.18s** (TTFB ≈ 0.53s, Render Delay ≈ 0.65s)
- CLS = **0.00**  
- وضعیت کلی: بسیار خوب برای Home؛ تمرکز روی بهینه‌سازی Blog و Postها و hardening است.

---

## اهداف کلان Performance

1. نگه داشتن LCP زیر ~2s روی Mobile برای `/`, `/blog`, `/blog/[slug]`.
2. حفظ CLS نزدیک 0.00 در همه صفحات.
3. کنترل JS bundle و جلوگیری از رشد بی‌رویه با افزودن Featureهای جدید.
4. استفاده حداکثری از SSG و caching برای Blog.
5. محدود کردن اثر third-partyها (Plausible و غیره) روی critical path.

برای جزئیات هر فاز، به فایل‌های phase-* مراجعه کن.
