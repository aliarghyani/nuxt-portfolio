# Phase 01 – Initial Load & LCP (Images, Fonts, CSS)

هدف این فاز، کم‌کردن **LCP** و بهینه‌سازی **load اولیه** برای مسیرهای کلیدی است:
- `/`
- `/blog`
- یک `/blog/[slug]`

ورودی این فاز: خروجی مستند‌شده از **Phase 00 – Baseline**.

---

## 1. اهداف فاز ۰۱

برای هر سه route:

- کاهش یا حفظ LCP زیر ~2s روی Mobile (lab)
- حفظ CLS نزدیک 0.00
- کاهش work اولیه مرورگر با:
  - بهینه‌سازی تصاویر (critical و non-critical)
  - مدیریت درست فونت‌ها
  - سبک‌سازی CSSهای global و blog-specific

---

## 2. Images – استراتژی و تسک‌ها

### 2.1. شناسایی تصاویر مهم

مسیرها و کامپوننت‌های اصلی:

- Home:
  - Avatar و تصویر Hero در [`Hero.vue`](app/components/portfolio/Hero.vue:84)
  - هر تصویر UI مهم دیگر در viewport اولیه
- Blog list:
  - کارت‌های بلاگ (cover / thumbnail) در:
    - [`BlogCard.vue`](app/components/blog/BlogCard.vue:1)
    - [`app/pages/blog/index.vue`](app/pages/blog/index.vue:1)
- Blog post:
  - cover image پست (اگر وجود دارد)
  - تصاویر inline در محتوا، براساس Markdown + Nuxt Content

### 2.2. اصول طراحی

- استفاده از `NuxtImg` برای تمام تصاویر قابل‌کنترل:
  - `format="webp"` یا فرمت‌های مدرن
  - `sizes` مناسب برای mobile / tablet / desktop
  - `loading="lazy"` برای تصاویر non-critical (خارج از viewport اولیه)
- تعریف ابعاد ثابت (`width` و `height`) برای جلوگیری از layout shift (کمک به CLS)

### 2.3. چک‌لیست پیاده‌سازی

- [ ] Home:
  - [ ] تأیید استفاده از `NuxtImg` در Hero avatar با:
    - سایزهای مناسب (`sizes` responsive)
    - فرمت webp
    - ابعاد ثابت
- [ ] Blog list:
  - [ ] تبدیل همه cover/thumbnailها به `NuxtImg` (اگر جایی هنوز `img` ساده است)
  - [ ] تنظیم `sizes` برای کارت‌های بلاگ (mobile-first)
  - [ ] `loading="lazy"` برای تصاویر پایین لیست
- [ ] Blog post:
  - [ ] تعریف strategy برای cover image:
    - critical برای بالای صفحه (می‌تواند بدون lazy باشد با سایز کنترل‌شده)
  - [ ] اطمینان از این‌که تصاویر داخل محتوا dimension دارند یا توسط Nuxt Content/Prose به‌درستی مدیریت می‌شوند

---

## 3. Fonts – مدیریت وزن و روش لود

### 3.1. وضعیت فعلی

- Local fonts:
  - Roobert (EN) در `/public/fonts/Roobert-*.woff2`
  - Vazirmatn (FA) در `/public/fonts/vazirmatn/*`
- Config:
  - Preload فونت‌ها در [`app/app.vue`](app/app.vue:10) (لینک‌های `<link rel="preload" as="font">`)
  - `@nuxt/fonts` در [`nuxt.config.ts`](nuxt.config.ts:52) فعال است و ممکن است فونت دیگری را لود کند

### 3.2. اصول طراحی

- جلوگیری از **دو بار لود کردن** فونت‌ها با دو روش مختلف
- محدود کردن وزن‌های فونت به لازم‌ترین‌ها:
  - مثلا 400, 500, 600
- استفاده از `font-display: swap` برای جلوگیری از flash و بلوکه‌شدن render توسط فونت‌ها

### 3.3. چک‌لیست پیاده‌سازی

- [ ] تصمیم‌گیری:
  - [ ] انتخاب یکی از روش‌های زیر:
    - فقط local fonts + preload دستی
    - یا استفاده کامل از `@nuxt/fonts` برای فونت‌های وب
- [ ] اگر `@nuxt/fonts` لازم نیست:
  - [ ] حذف/خاموش کردن تنظیمات غیرضروری در [`nuxt.config.ts`](nuxt.config.ts:52)
- [ ] اگر از local fonts استفاده می‌کنیم:
  - [ ] محدود کردن وزن‌ها به حداقل مورد نیاز در `<link rel="preload">` در [`app/app.vue`](app/app.vue:10)
  - [ ] اطمینان از این‌که `font-display: swap` روی @font-face (اگر وجود دارد) تنظیم شده است
- [ ] بررسی تأثیر روی LCP در Phase 00/Phase 05 پس از اعمال تغییرات

---

## 4. CSS – سبک‌سازی Global و Blog-specific

### 4.1. محل‌های اصلی CSS

- Global styles:
  - [`app/assets/css/main.css`](app/assets/css/main.css:1)
  - Tailwind (پیکربندی خارج از این فایل‌ها، اما خروجی در main.css تزریق می‌شود)
- Typography & content:
  - [`app/assets/css/prose.css`](app/assets/css/prose.css:1)
  - [`app/assets/css/blog-content.css`](app/assets/css/blog-content.css:1)

### 4.2. اصول طراحی

- حذف/کاهش:
  - کلاس‌ها و selectorهای غیر استفاده
  - سایه‌ها، blurها و افکت‌های هزینه‌بر که global اعمال شده‌اند
- scope کردن استایل‌های خاص:
  - مثلاً استایل‌های blog را محدود به container خاص (به‌جای global روی body)

### 4.3. چک‌لیست پیاده‌سازی

- [ ] مرور کامل [`main.css`](app/assets/css/main.css:1):
  - [ ] پیدا کردن utilityهای custom و کلاس‌های unused
  - [ ] حذف یا محدود کردن آن‌ها
- [ ] مرور [`prose.css`](app/assets/css/prose.css:1) و [`blog-content.css`](app/assets/css/blog-content.css:1):
  - [ ] اطمینان از اینکه استایل‌ها scoped به content/blog هستند، نه کل سایت
- [ ] بررسی وجود CSS سنگین عمومی (مثل box-shadowهای بزرگ، animationهای global) و علامت‌گذاری برای Phase 04 (Animations)

---

## 5. ارتباط این فاز با فازهای دیگر

- Input:
  - داده‌های Baseline از **Phase 00**
- Output:
  - کاهش LCP / بهبود load اولیه برای هر سه route
  - فونت و CSS سبک‌تر و مدیریت‌شده
  - لیستی از تغییرات انجام شده (برای مقایسه قبل/بعد در **Phase 05 – Hardening & Monitoring**)

---

## 6. Definition of Done – Phase 01

این فاز وقتی تمام است که:

- [ ] همه تصاویر critical/non-critical در Home و Blog با `NuxtImg` و تنظیمات درست مدیریت شوند.
- [ ] فونت‌ها با یک استراتژی مشخص (local یا @nuxt/fonts) و حداقل وزن‌های لازم لود شوند.
- [ ] CSS global و blog-specific بازبینی شده و بخش‌های غیرضروری یا سنگین حذف/محدود شده باشند.
- [ ] یک دور trace/Lighthouse بعد از تغییرات گرفته شود تا تأثیر روی LCP و FCP مشخص شود (فاز ۰۵ برای مقایسه نهایی استفاده می‌شود).
