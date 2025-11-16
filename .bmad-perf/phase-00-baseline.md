# Phase 00 – Baseline & Observability

هدف این فاز این است که قبل از هر بهینه‌سازی، **وضعیت فعلی Performance** را برای مسیرهای کلیدی سایت به‌صورت مستند و قابل مقایسه ثبت کنیم.

مسیرهای کلیدی:
- `/`
- `/blog`
- یکی از `/blog/[slug]` (مثلاً `/blog/getting-started-with-nuxt-content`)

---

## 1. Scope این فاز

- فقط **اندازه‌گیری** و **مستندسازی** است؛ در این فاز تغییری در کد انجام نمی‌شود.
- خروجی این فاز پایه‌ی مقایسه برای تمام فازهای بعدی است.

تمرکز روی این متریک‌ها:
- LCP (Largest Contentful Paint)
- CLS (Cumulative Layout Shift)
- TBT / Main-thread blocking (از طریق trace)
- ساختار DOM، شبکه، و third-partyها (از insights DevTools)

---

## 2. ابزار و روش اندازه‌گیری

### 2.1. Chrome DevTools Performance Trace (MCP-compatible)

برای هر route:

1. صفحه را در Chrome باز کن:
   - `https://aliarghyani.vercel.app/`
   - `https://aliarghyani.vercel.app/blog`
   - یک `/blog/[slug]` مثل:
     - `https://aliarghyani.vercel.app/blog/getting-started-with-nuxt-content`

2. اجرای Performance trace:
   - از طریق Chrome یا Chrome DevTools MCP:
     - Start performance trace با reload
     - بعد از کامل شدن load، trace را stop کن.

3. از Summary trace برای هر route این موارد را استخراج کن:
   - LCP (ms) + breakdown:
     - TTFB
     - Render delay
   - CLS
   - Insightهای موجود:
     - LCPBreakdown
     - RenderBlocking
     - NetworkDependencyTree
     - DOMSize
     - ThirdParties
     - Cache

> برای Home `/` یک نمونه trace قبلاً گرفته شده:  
> - LCP ≈ 1184 ms  
> - TTFB ≈ 533 ms  
> - Render Delay ≈ 650 ms  
> - CLS = 0.00  

---

## 3. تمپلیت مستندسازی Baseline

برای هر route، طبق قالب زیر در همین فایل یا فایل جداگانه (مثلاً `phase-00-baseline.md` بخش‌های بعدی) مستند کن:

### 3.1. `/` (Home)

- URL: `https://aliarghyani.vercel.app/`
- LCP: `XXX ms`
  - TTFB: `YYY ms`
  - Render delay: `ZZZ ms`
- CLS: `0.00x`
- Observations:
  - [ ] RenderBlocking: ...
  - [ ] NetworkDependencyTree: ...
  - [ ] DOMSize: ...
  - [ ] ThirdParties: ...
  - [ ] Cache: ...

### 3.2. `/blog` (Blog list)

- URL: `https://aliarghyani.vercel.app/blog`
- LCP: `XXX ms`
  - TTFB: `YYY ms`
  - Render delay: `ZZZ ms`
- CLS: `0.00x`
- Observations:
  - [ ] RenderBlocking: ...
  - [ ] NetworkDependencyTree: ...
  - [ ] DOMSize: ...
  - [ ] ThirdParties: ...
  - [ ] Cache: ...

### 3.3. `/blog/[slug]` (Blog post)

- URL: `https://aliarghyani.vercel.app/blog/your-slug`
- LCP: `XXX ms`
  - TTFB: `YYY ms`
  - Render delay: `ZZZ ms`
- CLS: `0.00x`
- Observations:
  - [ ] RenderBlocking: ...
  - [ ] NetworkDependencyTree: ...
  - [ ] DOMSize: ...
  - [ ] ThirdParties: ...
  - [ ] Cache: ...

---

## 4. Definition of Done – Phase 00

این فاز زمانی **تمام شده** محسوب می‌شود که:

- [ ] برای هر سه route (`/`, `/blog`, `/blog/[slug]`) یک Performance trace گرفته شده باشد.
- [ ] مقادیر LCP + breakdown (TTFB, Render delay) و CLS ثبت شده باشد.
- [ ] Insightهای مهم (RenderBlocking, NetworkDependencyTree, DOMSize, ThirdParties, Cache) برای هر route به‌صورت خلاصه نوشته شده باشد.
- [ ] نکته‌های کلیدی هر route (مثلاً «Blog LCP بالاتر از Home است و بیشتر به تصاویر/Content مربوط است») به صورت ۲–۳ bullet خلاصه شده باشد.

وقتی این فاز تکمیل شد، از روی همین داده‌ها فاز ۰ به ۱ منتقل می‌شویم:
- فاز ۱ به‌صورت هدف‌مند روی Initial Load (Images, Fonts, CSS) برای همان routeها کار می‌کند و بهبود LCP را هدف می‌گیرد.
