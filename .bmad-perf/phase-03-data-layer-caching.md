# Phase 03 – Data Layer (Nuxt Content, i18n) & Caching

در این فاز روی **لایه داده** تمرکز می‌کنیم؛ یعنی جایی که Nuxt Content، i18n و Nitro/routeRules روی Performance مخصوصاً در صفحات Blog تاثیر می‌گذارند.

مسیرهای هدف:
- `/blog`
- `/blog/[slug]` (EN و FA)
- `/fa/blog` و `/fa/blog/[slug]` (برای i18n و SSG)

---

## 1. اهداف فاز ۰۳

- کاهش زمان TTFB و تأخیر مرتبط با دیتا در صفحات Blog.
- بهینه‌کردن queryهای Nuxt Content برای کم‌ترین payload لازم.
- اطمینان از این‌که i18n فقط locale موردنیاز را lazy-load می‌کند.
- استفاده کامل از SSG و caching برای بلاگ (EN/FA) تا جایی که ممکن است.

---

## 2. Nuxt Content – Queryها و ساختار محتوا

### 2.1. محل‌ها و فایل‌های اصلی

- تنظیمات Content:
  - [`content.config.ts`](content.config.ts:1)
- داده‌ها:
  - پوشه محتوا:
    - `content/content/en/blog/*.md`
    - `content/content/fa/blog/*.md`
- Composable:
  - [`useBlog.ts`](app/composables/useBlog.ts:1)
- صفحات:
  - [`app/pages/blog/index.vue`](app/pages/blog/index.vue:1)
  - [`app/pages/blog/[...slug].vue`](app/pages/blog/[...slug].vue:1)

### 2.2. استراتژی

- برای **لیست بلاگ**:
  - query باید فقط meta ضروری را بخواند:
    - `title`, `description`, `date`, `tags`, `image`, `slug`
  - body کامل markdown لازم نیست.
- برای **صفحه پست**:
  - query کامل (body + meta) ضروری است، ولی فقط یک‌بار.
- اطمینان از:
  - عدم اجرای queryهای تکراری در client.
  - استفاده از SSG برای pre-render تمام پست‌ها.

### 2.3. چک‌لیست پیاده‌سازی

- [ ] مرور [`useBlog.ts`](app/composables/useBlog.ts:1):
  - [ ] جداکردن query برای:
    - لیست پست‌ها (فقط meta)
    - پست واحد (body + meta)
  - [ ] استفاده از فیلتر `only` (یا معادل) برای محدود کردن فیلدها در لیست.
- [ ] در [`blog/index.vue`](app/pages/blog/index.vue:1):
  - [ ] اطمینان از این‌که query لیست فقط یک‌بار از server/SSG می‌آید و در client re-fetch غیرضروری ندارد.
- [ ] در [`blog/[...slug].vue`](app/pages/blog/[...slug].vue:1):
  - [ ] استفاده از یک query واحد برای پست + meta مربوطه (بدون اضافات).
- [ ] بررسی performance بعد از build/generate روی صفحات Blog (در Phase 05 مقایسه می‌شود).

---

## 3. i18n – Lazy Loading و payload زبان‌ها

### 3.1. محل‌ها و تنظیمات

- Config اصلی i18n:
  - [`nuxt.config.ts` – بخش i18n](nuxt.config.ts:101)
- تنظیمات vue-i18n runtime:
  - [`i18n.config.ts`](i18n.config.ts:1)
- فایل‌های ترجمه:
  - `i18n/locales/en.json`
  - `i18n/locales/fa.json`
- کامپوننت و composableهای مرتبط:
  - [`LanguageSwitcher.vue`](app/components/LanguageSwitcher.vue:1)
  - [`useLocaleSwitching.ts`](app/composables/useLocaleSwitching.ts:1)

### 3.2. استراتژی

- i18n باید **lazy-load** باشد:
  - یعنی فقط فایل locale موردنیاز (en یا fa) در لحظه load شود.
- جلوگیری از:
  - لود همزمان هر دو locale در initial load.
- Behavior:
  - strategy `prefix_except_default` (EN default، FA با `/fa` prefix).

### 3.3. چک‌لیست پیاده‌سازی

- [ ] تأیید تنظیمات `i18n` در [`nuxt.config.ts`](nuxt.config.ts:101):
  - [ ] `defaultLocale: 'en'`
  - [ ] `strategy: 'prefix_except_default'`
  - [ ] `locales` با `file` (lazy chunks) تعریف شده باشند.
  - [ ] `langDir: 'locales'` تنظیم باشد.
- [ ] بررسی [`i18n.config.ts`](i18n.config.ts:1):
  - [ ] استفاده از `legacy: false`, `fallbackLocale: 'en'` (اوکی).
  - [ ] اطمینان از عدم تعریف دستی messageهای بزرگ inline که باعث bundle inflation شود.
- [ ] مرور [`useLocaleSwitching.ts`](app/composables/useLocaleSwitching.ts:1) و [`LanguageSwitcher.vue`](app/components/LanguageSwitcher.vue:1):
  - [ ] تأیید این‌که تغییر locale فقط locale جدید را load می‌کند و باعث re-fetch غیرضروری دیگر dataها نمی‌شود.

---

## 4. Nitro, SSG & Caching – Prerender و routeRules

### 4.1. محل تنظیمات

- [`nuxt.config.ts`](nuxt.config.ts:152):
  - بخش `nitro.prerender`
  - بخش `routeRules`
- اسناد مرتبط SSG:
  - [`README.md`](README.md:98)
  - [`SSG-TEST-GUIDE.md`](SSG-TEST-GUIDE.md:1)
  - `test-ssg.md`

### 4.2. استراتژی

- استفاده از SSG کامل برای:
  - `/`
  - `/blog`, `/fa/blog`
  - همه `/blog/**` و `/fa/blog/**`
- استفاده از `routeRules` برای:
  - `swr` مناسب روی مسیرهایی که ممکن است در آینده dynamic شوند.
  - cache جایی که لازم است.

### 4.3. چک‌لیست پیاده‌سازی

- [ ] مرور `nitro.prerender` در [`nuxt.config.ts`](nuxt.config.ts:152):
  - [ ] اطمینان از این‌که:
    - `/`
    - `/blog`
    - `/fa/blog`
    - `/blog/**`
    - `/fa/blog/**`
    در لیست crawl یا routes قرار دارند (یا با `crawlLinks: true` پوشش داده می‌شوند و هیچ مانعی نیست).
- [ ] مرور `routeRules`:
  - [ ] تنظیم cache مناسب برای:
    - `/blog`
    - `/fa/blog`
    - `/blog/**`
    - `/fa/blog/**`
  - [ ] بررسی `swr: 3600` و تصمیم‌گیری:
    - کافی است / زیاد است / کم است، بسته به اینکه محتوا هر چند وقت یکبار تغییر می‌کند.
- [ ] اجرای `pnpm generate` و بررسی:
  - [ ] وجود HTML pre-render شده برای مسیرهای Blog (مطابق [`SSG-TEST-GUIDE.md`](SSG-TEST-GUIDE.md:1)).

---

## 5. رفتار Data در Client – جلوگیری از re-fetch و duplication

### 5.1. اصول طراحی

- برای صفحات SSG:
  - Data باید در زمان build تزریق شود (نه با fetch در client در هر load).
- در blog list/post:
  - از `useAsyncData`/`useFetch` یا   Nuxt Content data APIs به‌شکلی استفاده شود که:
    - روی client re-run اضافی نداشته باشند.
    - نتیجه در hydration هماهنگ با HTML اولیه باشد.

### 5.2. چک‌لیست

- [ ] مرور روش دریافت data در `blog/index.vue`:
  - [ ] اطمینان از این‌که data در SSR/SSG آمده و روی client دوباره fetch نمی‌شود (مگر لازم باشد).
- [ ] مرور `blog/[...slug].vue`:
  - [ ] مشابه بالا برای داده پست.
- [ ] بررسی کنسول برای هشدارهای hydration یا fetchهای اضافی (در فاز اجرای کد).

---

## 6. ارتباط با فازهای دیگر

- Input:
  - LCP/TTFB baseline از Phase 00
  - بهینه‌سازی Initial Load از Phase 01
  - کاهش JS و scripting از Phase 02
- Output:
  - کاهش TTFB مؤثر در صفحات Blog.
  - اطمینان از SSG و caching صحیح برای Blog.
  - لایه داده‌ای که با رشد تعداد پست‌ها هم performant باقی بماند.

---

## 7. Definition of Done – Phase 03

این فاز زمانی کامل است که:

- [ ] queryهای Nuxt Content برای لیست بلاگ فقط meta لازم را بخوانند و برای پست واحد فقط یک query بهینه وجود داشته باشد.
- [ ] i18n به‌صورت lazy-load فقط locale موردنیاز را در هر route لود کند.
- [ ] SSG برای `/`, `/blog`, `/fa/blog`, `/blog/**`, `/fa/blog/**` فعال و تست شده باشد (با یکی از گایدهای SSG).
- [ ] `routeRules` برای Blog به‌صورت مشخص و مستند تنظیم شده باشد.
- [ ] یک round تست (trace/Lighthouse یا حداقل تست دستی در Network tab) نشان دهد که دیگر API/Content call غیرضروری در client برای Blog وجود ندارد.
