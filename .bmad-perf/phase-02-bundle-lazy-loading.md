# Phase 02 – JS Bundle & Lazy-loading

هدف این فاز، کنترل و کاهش **حجم جاوااسکریپت** و **کار اولیه روی main thread** است؛ به‌خصوص برای مسیرهای:

- `/`
- `/blog`
- `/blog/[slug]`

این فاز روی ساختار کامپوننت‌ها، async imports، composableها و منطق رندر تمرکز می‌کند.

---

## 1. اهداف فاز ۰۲

- کوچک نگه‌داشتن JS bundle اولیه برای صفحات اصلی.
- کاهش زمان scripting و main-thread blocking.
- اطمینان از اینکه فقط **کد لازم** برای صفحه فعلی لود/اجرا می‌شود.
- نگه‌داشتن UX فعلی (بدون کاهش کیفیت تجربه کاربر).

---

## 2. Homepage – ساختار سکشن‌ها و async components

### 2.1. وضعیت فعلی

فایل: [`app/pages/index.vue`](app/pages/index.vue:19)

- بسیاری از سکشن‌های portfolio (Skills, Projects, Recommendations, WorkExperience, …) با [`defineAsyncComponent`](app/pages/index.vue:19) به‌صورت lazy import شده‌اند.
- این کار chunk splitting را فعال کرده و کمک می‌کند initial bundle سبک‌تر بماند.

### 2.2. استراتژی بهبود

- حفظ async imports برای سکشن‌های پایین صفحه.
- در صورت نیاز، وابسته کردن **mount** برخی سکشن‌ها به `IntersectionObserver` (فقط وقتی کاربر به آن بخش scroll می‌کند، mount شوند).
- جلوگیری از اجرای logic سنگین برای سکشن‌هایی که user شاید هیچ‌وقت نبیند (مثلاً bottom sections در mobile).

### 2.3. چک‌لیست پیاده‌سازی

- [ ] مرور `index.vue` و لیست سکشن‌های async:
  - [ ] اطمینان از این‌که همه سکشن‌های غیر-critical (مثلاً Projects, Recommendations) async هستند.
- [ ] در صورت نیاز:
  - [ ] اضافه کردن مکانیزم lazy-mount (IntersectionObserver یا composable) برای سکشن‌های انتهای صفحه.
- [ ] بررسی این‌که Hero/بالای صفحه حداقل مقدار logic را در `setup` اجرا می‌کند.

---

## 3. Blog List & Blog Post – کامپوننت‌های سنگین

### 3.1. کامپوننت‌های Blog

فایل‌ها:

- [`app/components/blog/BlogCard.vue`](app/components/blog/BlogCard.vue:1)
- [`app/components/blog/BlogNavigation.vue`](app/components/blog/BlogNavigation.vue:1)
- [`app/components/blog/BlogSearch.vue`](app/components/blog/BlogSearch.vue:1)
- [`app/components/blog/BlogTableOfContents.vue`](app/components/blog/BlogTableOfContents.vue:1)
- [`app/components/blog/BlogTagFilter.vue`](app/components/blog/BlogTagFilter.vue:1)
- صفحات:
  - [`app/pages/blog/index.vue`](app/pages/blog/index.vue:1)
  - [`app/pages/blog/[...slug].vue`](app/pages/blog/[...slug].vue:1)

### 3.2. استراتژی

- در `/blog`:
  - navigation، search و filter ممکن است logic و reactivity بیشتری داشته باشند.
  - اگر همه روی initial render mount شوند، scripting بالا می‌رود.
- در `/blog/[slug]`:
  - TOC، related posts، tag filter و … ممکن است برای همه کاربران ضروری نباشند.

### 3.3. چک‌لیست پیاده‌سازی

- [ ] `/blog`:
  - [ ] بررسی `BlogSearch`, `BlogTagFilter`، `BlogNavigation`:
    - [ ] اگر سنگین‌اند، آنها را با `defineAsyncComponent` و در صورت امکان lazy-mount کنیم.
  - [ ] اطمینان از این‌که list اصلی پست‌ها (BlogCardها) تا حد امکان سبک و stateless هستند (محاسبات در composable یا computed انجام شود).
- [ ] `/blog/[slug]`:
  - [ ] تبدیل TOC، related posts و هر بخش غیر-critical به async components.
  - [ ] اگر TOC فقط بعد از load کامل content لازم است، mount را تا بعد از آماده شدن content به تأخیر بیندازیم.

---

## 4. Composables & Reactive Logic

### 4.1. فایل‌های کلیدی

- [`usePortfolio.ts`](app/composables/usePortfolio.ts:1)
- [`useBlog.ts`](app/composables/useBlog.ts:1)
- [`useSectionObserver.ts`](app/composables/useSectionObserver.ts:1)
- [`useViewTransition.ts`](app/composables/useViewTransition.ts:1)
- [`useViewTransitionRipple.ts`](app/composables/useViewTransitionRipple.ts:1)

### 4.2. اصول طراحی

- محاسبات تکراری در template ممنوع → به `computed` منتقل شوند.
- فیلترها، mapها و reduceهای سنگین باید:
  - یا memoized شوند،
  - یا فقط روی demand (مثلاً هنگام تغییر فیلتر) اجرا شوند.
- observerها و event listenerها باید:
  - فقط وقتی لازم‌اند attach شوند،
  - حتماً در `onUnmounted` پاک شوند.

### 4.3. چک‌لیست پیاده‌سازی

- [ ] `usePortfolio`:
  - [ ] بررسی محاسبات (skills filtering، projects grouping و غیره):
    - [ ] انتقال logic سنگین به `computed` و memoization در صورت نیاز.
- [ ] `useBlog`:
  - [ ] اطمینان از این‌که:
    - [ ] queryها فقط یک‌بار اجرا می‌شوند (نه در هر رندر مجدد).
    - [ ] نتیجه query در state مناسب cash می‌شود.
- [ ] `useSectionObserver`:
  - [ ] بررسی تعداد observerها:
    - [ ] استفاده از یک observer مشترک در صورت امکان.
    - [ ] cleanup درست در `onUnmounted`.
- [ ] `useViewTransition*`:
  - [ ] اطمینان از این‌که فقط روی تعاملات لازم اجرا می‌شوند، نه روی هر تغییر کوچک.

---

## 5. Utils و helperها

### 5.1. فایل‌ها

- [`app/utils/any_all.ts`](app/utils/any_all.ts:1)
- [`app/utils/chipTones.ts`](app/utils/chipTones.ts:1)
- [`app/utils/findBy.ts`](app/utils/findBy.ts:1)
- [`app/utils/getDisplayableNumber.ts`](app/utils/getDisplayableNumber.ts:1)
- [`app/utils/isSubset.ts`](app/utils/isSubset.ts:1)

### 5.2. استراتژی

- اطمینان از اینکه utils:
  - pure و بدون side-effect هستند.
  - در صورت نیاز فقط در صفحات یا کامپوننت‌های ضروری import می‌شوند (نه global).

### 5.3. چک‌لیست

- [ ] مرور utils و استفاده آن‌ها در پروژه:
  - [ ] حذف یا عدم import utilityهای بلااستفاده.
  - [ ] جلوگیری از ساخت barrelهای بزرگ که باعث وارد شدن کد بلااستفاده به bundle می‌شوند.

---

## 6. Integration با Phase 00/01 و فازهای بعد

- Input:
  - Baseline trace ها (Phase 00)
  - اصلاحات روی Images/Fonts/CSS (Phase 01)
- Output:
  - کاهش زمان scripting و main-thread work برای صفحات کلیدی.
  - آماده‌سازی برای تمرکز بر Data Layer و Caching در Phase 03.

---

## 7. Definition of Done – Phase 02

این فاز زمانی تمام است که:

- [ ] همه سکشن‌های غیر-critical در Home و Blog تا حد ممکن async و/یا lazy-mount شده باشند.
- [ ] کامپوننت‌های Blog سنگین (Search, Filter, TOC, Related) فقط وقتی لازم است لود/اجرا شوند.
- [ ] composableهای اصلی (`usePortfolio`, `useBlog`, `useSectionObserver`, `useViewTransition*`) از نظر محاسبات reactive و observerها بهینه شده باشند.
- [ ] utils بلااستفاده حذف یا importهای غیرضروری اصلاح شده باشند.
- [ ] یک trace جدید برای حداقل یک route (مثلاً `/blog`) گرفته شده باشد تا کاهش scripting/main-thread work قابل مشاهده باشد (ثبت در Phase 05).
