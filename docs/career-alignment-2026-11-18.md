# Portfolio and résumé review · 18 November 2026

## What readers see

- The homepage keeps “Practical solutions for complex workflows” and «راهکارهای عملی برای گردش‌کارهای پیچیده». The profile card and Person structured data use the short job title. The summary connects frontend delivery since 2023 with seven earlier years in telecom and specific examples of reporting automation.
- The English résumé uses the owner's approved LinkedIn headline verbatim. The Persian version uses «مهندس فرانت‌اند» followed by its areas of practice. The GitHub profile expresses the same positioning across its headline and subheading. LinkedIn wording was supplied by the owner. [Public GitHub profile](https://github.com/aliarghyani/aliarghyani)
- NexaPortal's official English title is **Frontend Developer**. Huawei's final title is **Senior Performance Team Analyst and Team Lead**. The Artemis case describes a team contribution. The English and Persian résumés retain the temporary, part-time DigiHinet role and the existing April–October 2026 data. Confirm the disputed months against an employment record before copying them to Jobvision.
- The experience and contact sections already connect a recruiter to Elara, Artemis, Ideh, Insho, BaMashin and the portfolio. Four extra project descriptions would repeat evidence and consume print space. The public cases are available through the portfolio link in each résumé, including the Persian website from the Persian PDF.

## Content sources and outputs

| Field | Editable source | Reader-facing output |
| --- | --- | --- |
| Name, role, value proposition, summary, focus | `app/data/portfolio.ts` via `portfolio.en.ts`, and `portfolio.fa.ts` | `usePortfolio` → homepage hero. Role and summary also reach Person JSON-LD through `app/pages/index.vue`. |
| Short search title, social image text, card supporting text | `i18n/locales/en.json` and `fa.json` | Page title, Open Graph and Twitter title, localized image description, hero card |
| Search and social description | Localized `profile.seoDescription` | HTML description, Open Graph and Twitter description |
| Project order, evidence, limits, links | Localized `projects` arrays | `ProjectsList.vue` groups by category and retains array order within each category. Six selected, eleven with the all-projects filter. |
| Résumé identity, jobs, dates, skills | `resume.en.ts` and `resume.fa.ts` | `useResumeData` → `ResumePreview.vue` for each language → same localized print route through `server/api/resume/pdf.get.ts` |
| Dates, filenames, document appearance | `useResumeData.ts`, `shared/utils/resume.ts`, résumé components and PDF endpoint | Locale-specific filename, Gregorian dates, A4 layout, embedded Persian font |

## Selected public evidence

The GitHub account listed twelve public repositories at review. The four selections match the profile README's order. The existing all-projects filter also exposes the Vue rules and ADHD research projects. Tests in the three external repositories were inspected as source only.

1. **nuxt-portfolio** demonstrates the actual journey from portfolio to localized résumé to PDF. The initial snapshot already contained a bilingual Nuxt app. Later history credits multiple contributors to the preview and print implementation. Ali's changes include multilingual PDF and subsequent content work. GitHub reports a non-fork and no template parent. Earlier scaffolding provenance is undetermined. [Baseline](https://github.com/aliarghyani/nuxt-portfolio/tree/ffd577b80973a02f9ce7efc28e1cf9201d73a6cf) · [Multilingual résumé commit](https://github.com/aliarghyani/nuxt-portfolio/commit/6a15313) · [Persian live site](https://aliarghyani.vercel.app/fa)
2. **15ecosystem** connects assessment, seven-day practice and weekly review. The manifest, database schema and assessment tests support its Nuxt/PostgreSQL/Drizzle stack. Public source visibility establishes neither a commercial launch nor adoption. [README](https://github.com/aliarghyani/15ecosystem/blob/67a25e67f07bc1dab4afe45d724cebe88f436f26/README.md) · [Schema](https://github.com/aliarghyani/15ecosystem/blob/67a25e67f07bc1dab4afe45d724cebe88f436f26/server/database/schema.ts) · [Assessment tests](https://github.com/aliarghyani/15ecosystem/blob/67a25e67f07bc1dab4afe45d724cebe88f436f26/app/utils/__tests__/assessment.test.ts)
3. **mybudget** demonstrates editable Vue forms, Pinia, keyboard controls and browser persistence. The starter uses a user-entered exchange rate. [README](https://github.com/aliarghyani/mybudget/blob/a125aa32ee0428809c7a2b38bc655ed29634008f/README.md) · [Ledger](https://github.com/aliarghyani/mybudget/blob/a125aa32ee0428809c7a2b38bc655ed29634008f/src/stores/ledger.ts) · [Keyboard interaction](https://github.com/aliarghyani/mybudget/blob/a125aa32ee0428809c7a2b38bc655ed29634008f/src/composables/useKeyboardShortcuts.ts)
4. **offline-audio-transcription** demonstrates input integrity, resumption after interruption and bounded retries. Speaker identity requires a human decision. The recovery tests supply no acoustic accuracy benchmark. [Workflow](https://github.com/aliarghyani/offline-audio-transcription/blob/1703cf6ea5e9b31d13081213e756de2cca31c2e6/README.md) · [Input checks](https://github.com/aliarghyani/offline-audio-transcription/blob/1703cf6ea5e9b31d13081213e756de2cca31c2e6/src/session_pipeline/integrity.py) · [Recovery tests](https://github.com/aliarghyani/offline-audio-transcription/blob/1703cf6ea5e9b31d13081213e756de2cca31c2e6/tests/test_retry_recovery.py)

## Iranian hiring terminology

Reviewed on 18 November 2026. These are examples of titles and requirements. Dates below come from publication metadata when available. The Viraaweb notice falls within the preferred 90-day window. Other dated notices are historical terminology examples. Hiring status was not confirmed. Employer-board pages and individual hiring posts are identified below. English wording is retained when the advertisement uses English.

| Employer | Advertised wording | What the listing demonstrates |
| --- | --- | --- |
| امین سافت | برنامه‌نویس Front-End | Vue, Nuxt, TypeScript, REST. [Hiring post](https://www.linkedin.com/posts/aminrahkan_%D8%B3%D9%84%D8%A7%D9%85-%D8%AF%D9%88%D8%B3%D8%AA%D8%A7%D9%86-%D8%AF%D8%B1-%D8%AA%DB%8C%D9%85%D9%85%D9%88%D9%86-%D8%A8%D9%87-%DB%8C%DA%A9-%D9%86%DB%8C%D8%B1%D9%88%DB%8C-%D9%81%D8%B1%D8%A7%D9%86%D8%AA-%D8%A8%D8%A7-activity-7279480384701034496-28NQ) · 2024-12-30 |
| موج حامی رسانه | برنامه‌نویس Vue.Js) Front-End) | Vue, TypeScript, SSR and tests. Historical listing. [Employer post](https://www.linkedin.com/posts/moj-media-80071a19a_%D8%A7%D8%B3%D8%AA%D8%AE%D8%AF%D8%A7%D9%85-%D8%A8%D8%B1%D9%86%D8%A7%D9%85%D9%87%D9%86%D9%88%DB%8C%D8%B3-vuejs-front-end-%D8%AF%D8%B1-activity-7096537966713430017-rTDG) · 2023-08-13 |
| Digikala | Senior Front-End Engineer | React or Vue and REST. Senior is the level of the advertised opening. [Hiring post](https://www.linkedin.com/posts/shima-pourkhodabakhsh-60570919a_digikala-%D8%A8%D8%A7%D8%AA%D9%88%D8%A2%D8%BA%D8%A7%D8%B2%D9%85%DB%8C%D8%B4%D9%88%D8%AF-%D8%A8%D8%A7%D8%B2%DB%8C%D8%A8%DB%8C%D9%86%D9%87%D8%A7%DB%8C%D8%AA-activity-7254479035982856192-hSj7) · 2024-10-22 |
| راهکاران دریا | توسعه‌دهنده ارشد فرانت‌اند (Vue.js) | Vue 3, Nuxt, TypeScript, SSR and testing. The notice appears in the employer feed. [Employer feed](https://www.linkedin.com/company/darya-solutions) · date unknown |
| ابر آسال داده | Frontend (Vue.js / TypeScript) | The employer's senior opening combines Vue, Nuxt and REST. [Employer feed](https://www.linkedin.com/company/abr-asal-dadeh-engineering-company) · date unknown |
| NiKU | توسعه‌دهنده فرانت‌اند | TypeScript, SSR and code delivery. React/Next.js comparison. [Employer post](https://www.linkedin.com/posts/nikuco_up-%D8%A7%D8%B3%D8%AA%D8%AE%D8%AF%D8%A7%D9%85-%D9%81%D8%B1%D8%A7%D9%86%D8%AA%D8%A7%D9%86%D8%AF-activity-7395742387953864704-p0h-) · 2025-11-16 |
| Viraaweb | Frontend Developer | Tehran role covering TypeScript, API integration, accessibility and code review with React/Next.js. [Job description](https://www.viraaweb.com/fa/jobs/frontend-developer/) · 2026-09-13 |
| Software.ir | Senior Frontend Developer | Tehran React/Next.js opening, listed on the employer's careers board. [Employer board](https://software.ir/en/careers) · date unknown |

«توسعه‌دهنده فرانت‌اند» و «برنامه‌نویس فرانت‌اند» در آگهی‌های فارسی دیده می‌شوند. برای تیتر حرفه‌ای، «مهندس فرانت‌اند» انتخاب صاحب رزومه است. در سابقهٔ نکساپورتال «توسعه‌دهنده فرانت‌اند» به عنوان رسمی نزدیک‌تر است. مثال‌های عینی فرم، سطح دسترسی و اتصال به API کاربرد فناوری‌ها را برای خواننده روشن می‌کنند. این نمونه برای برآورد سهم هر عنوان در بازار کافی نیست.

## یازده نمونه از ویرایش فارسی

| عبارت پیشین | عبارت جدید یا گزیدهٔ آن | دلیل |
| --- | --- | --- |
| مهندس نرم‌افزار | مهندس فرانت‌اند | تخصص اصلی را مشخص می‌کند. |
| همکاری ریموت با تیمی در ترکیه | همکاری از راه دور با تیمی در ترکیه | نوع همکاری به فارسی روان بیان شده است. |
| تحویل اپ‌های SSR پرفورمنس | توسعهٔ صفحه‌های وب با رندر سمت سرور | کار انجام‌شده را مشخص می‌کند. |
| همکاری بین‌وظیفه‌ای با Git | همکاری با اعضای تیم از طریق Git | همکار و ابزار را از هم متمایز می‌کند. |
| راندن تحلیل KPI شبکه | تحلیل شاخص‌های عملکرد شبکه‌ها | فعل ترجمه‌شده حذف می‌شود و موضوع تحلیل روشن است. |
| تصعید ریسک‌ها | گزارش ریسک‌ها به مدیران مسئول | مخاطب گزارش و اقدام انجام‌شده را مشخص می‌کند. |
| مالک ارتباط با مشتری | گزارش پیشرفت کار به مشتری و پیگیری تعهدات | مسئولیت را با کار قابل مشاهده توضیح می‌دهد. |
| فلوهای فرمی سنگین | فرم‌های چندمرحله‌ای | اصطلاح برای خوانندهٔ غیرفنی هم قابل فهم است. |
| دروازه‌های کیفیت | بازبینی کد، بررسی ایستا با ESLint و آزمون سرتاسری با Cypress | روش کنترل کیفیت را نام می‌برد. |
| Schema-Based Form Builder با Validation | فرم‌ساز مبتنی بر طرح‌واره با اعتبارسنجی ورودی‌ها | ابزار و قابلیت آن در یک عبارت فارسی می‌آیند. |
| عملیات Back Office ... کمک به کارایی تیم و رضایت مشتری | پشتیبانی از عملیات OSS، پایش عملکرد و تهیهٔ گزارش‌های عملیاتی | وظایف واقعی جای ادعای نتیجهٔ بدون سنجش را گرفته‌اند. |

## Validation evidence

The published baseline returned HTTP 200 for the two homepages, both résumé routes and both PDFs. Both published PDFs were two-page A4 documents and had the previous positioning.

- The final local production build prerendered 24 routes using Node 22.14.0 and pnpm 9.12.1. Typecheck, formatting on all eight changed source files and the Git whitespace check passed.
- The portfolio suite passed 33 page checks plus dialog, accordion, draft-route, sitemap and SSR checks. The locale suite passed all 24 résumé combinations across six widths, two themes and two languages, including additional keyboard and reading-position checks. The four public repository links matched the requested order. [Homepages](./career-alignment-2026-11-18/homepages.webp) · [Expanded case](./career-alignment-2026-11-18/portfolio-case.webp)
- Both PDF responses supplied the expected language, filename and MIME type. Each document has two A4 pages and five working PDF link annotations verified by target. Both job headlines were present in extracted text. All measured text bounds fell inside the page. The Persian PDF embeds Vazirmatn, opens the Persian portfolio and begins its second page at DigiHinet after an editorial revision. [Rendered pages](./career-alignment-2026-11-18/resumes.webp)
- Local checks used installed Chrome on Windows. Build output included warnings about browser data age, bundle sizes, icon loading, Puppeteer packaging and Windows Sharp binaries. GitHub rate-limited the contribution widget during local preview. Its live activity data remains unverified.
