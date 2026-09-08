# Portfolio improvement plan — Ali Arghyani

Approved September 5, 2026. Implementation and validation results are recorded below.

## Goal and boundaries

Improve freelance, part-time, and contract frontend inquiries through small changes. Preserve Nuxt 4, Nuxt UI, Tailwind, Vercel compatibility, both languages, themes, and the existing section order. Mentorship remains between Services and Skills, with its separate introductory-call action.

Position Ali primarily as a Vue/Nuxt/TypeScript developer for CRM, SaaS dashboards, admin panels, and API-connected business applications. React/Next.js remains a learning/expansion path. No full redesign, new case-study routes, booking/payment systems, CMS, or broad dependency upgrades.

Preserve the pre-existing language-switcher edits and unpublished English mentorship article.

## Audit baseline

Reviewed repository source, English/Persian production homepages, desktop/mobile presentation, blog index and tutorial, résumé, PDF endpoint, metadata, accessibility, and performance.

| Finding                                                                        | Planned improvement                                                                  |
| ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| Projects start around 6,150px down on a 390px mobile viewport                  | Keep section order; shorten repetitive copy and preserve the direct project shortcut |
| Résumé styling overpowers contact                                              | Give the contact button strongest emphasis; quiet résumé styling                     |
| Hero contact copies email; footer opens email                                  | Shared accessible contact dialog with explicit email actions                         |
| Case-study evidence is hidden in nested accordions                             | Show context, role, and outcome immediately; retain expandable features/stack        |
| Persian hero/projects lag English; final contact section absent                | Bilingual content parity                                                             |
| Résumé duration, degree, certification, and metrics require reconciliation     | Prefer defensible qualitative claims and existing recorded dates                     |
| Blog index lacks title/description; tutorial duplicates H1 and uses old API    | Localized metadata, heading normalization, collection-based examples                 |
| Lighthouse accessibility 91                                                    | Repair accordion references and date contrast; verify keyboard use                   |
| Homepage Lighthouse SEO/best practices 100, but incomplete manual SEO coverage | Canonicals, real translation alternates, configured URLs, robots                     |
| Promotional script injected and then removed by an observer                    | Remove both plugins                                                                  |

PDF returned HTTP 200 with application/pdf. Initial typecheck fetched undeclared vue-tsc. Unthrottled mobile trace: LCP 0.67s, CLS 0.09; these are lab observations, not field data. No CrUX field data was available.

## Batch 1 — Positioning, contact, and factual consistency

- Headline: **Vue/Nuxt Frontend Developer for CRM & SaaS Dashboards**.
- Summary: I build CRM dashboards, admin panels, and API-connected business applications with Vue, Nuxt, and TypeScript. My current work at NexaPortal supports medical tourism operations.
- Availability: Available for selected freelance and contract projects.
- Location: Based in Tehran, Iran · Working remotely with a team in Türkiye.
- Primary action: Discuss a project. Keep View Projects secondary and the résumé visually quieter.
- Hero and final contact actions use one dialog: visible email, Open email app, Copy email, and a project/stack/timeline prompt. Handle blocked clipboard access and restore focus on dismissal.
- Centralize shared email/phone details; keep mentorship inquiry subject distinct.
- Translate hero/contact/project content, repair the Nuxt 3 description, and keep React explicitly marked as expanding.
- Align the analyst role end with the existing résumé's April 2022 transition to team lead; use Huawei 2016–2023 in the summary. Original personnel records remain the authority if those dates need correction.
- Use neutral bachelor's-degree terminology until the exact designation is verified.
- Omit the unverified 2025 Duolingo “85/100 (Advanced)” certification. Do not infer a corrected score. Replace unsupported percentages, productivity multipliers, and zero-bug claims with delivered functionality.

## Batch 2 — Project evidence and recommendations

- Keep existing categories and placement. Render context, role, and outcome outside case-study disclosures; put features and technology lists inside.
- Explain that Elara Medical and Artemis Clinics are products Ali contributes to through NexaPortal.
- Present actual frontend work rather than product marketing: patient workflows, scheduling, forms, permissions, and integrations where documented.
- Reuse existing project fields. Add only optional `preview: { src, alt }`, with localized alternative text. Logos remain the fallback; no invented or unapproved product screenshots.
- Explain nuxt-portfolio's résumé-as-code problem, typed content, web preview, PDF generation, and versioned maintenance. Do not publish unverified time savings.
- Render readable, attributed recommendation excerpts on the server before carousel enhancement. Keep all recommendations accessible through manual controls.
- Shorten repeated stack descriptions and correct Model Context Protocol terminology.
- Preserve mentorship's position and existing content.

## Batch 3 — Accessibility, SEO, and maintenance

- Ensure accordion controls reference stable, existing panels through hydration and interaction.
- Fix education-date contrast, keyboard focus, reduced-motion behavior, and practical navigation touch targets. Add a skip link.
- Add localized blog-index title, description, and social metadata.
- Add self-canonicals and reciprocal language alternatives only for published equivalents. Preserve draft exclusion and the existing language-switcher fallback for missing translations.
- Use the configured site URL for canonicals, social URLs, sitemap configuration, and robots output.
- Add `/robots.txt` referencing `/sitemap.xml`.
- Normalize repeated article titles during rendering without changing the pre-existing mentorship article.
- Update the Nuxt Content tutorial to collections and queryCollection; keep its original publication date and record September 5, 2026 as the revision.
- Remove the promotional loader and banner-removal observer. Remove the unused raw-avatar preload while retaining the optimized hero image preload.
- Pin vue-tsc for reproducible checks. Avoid changing runtime package versions.
- Finish optional Plausible loading through existing Vercel proxy routes. Enable only for `NUXT_PUBLIC_LOAD_PLAUSIBLE=true` or `1`. Events: Project Details, Contact Open, Email Open, Email Copy, Resume Download, Mentorship Inquiry. Only locale is attached; never send inquiry text, contact details, or clipboard contents. Disabled is the default.

## Validation and release checklist

- Typecheck, production build, and formatting of changed files.
- English/Persian at 360px, 390px, 768px, and desktop in both themes.
- Confirm unchanged section order and mentorship placement.
- Project navigation; accordion toggling and ARIA targets; contact dialog focus, keyboard dismissal, successful and failed copy; résumé PDF.
- Blog titles, translated/untranslated navigation, draft exclusion, canonicals, reciprocal alternates, sitemap and robots.
- Target Lighthouse accessibility at least 95 and eliminate the observed failures. Automated scores supplement manual interaction checks.
- Repeat mobile performance under consistent throttling and record conditions.
- Preserve current Vercel blog cache protections. Validate the preview before production publication.
- After release, compare project engagement and qualified inquiries over four weeks. Email clicks measure intent, not completed leads. This monitoring requires a deployed release and configured analytics account.

## Evidence and unresolved content

The full LinkedIn profile was blocked; indexed profile content supports Vue/Nuxt CRM positioning, NexaPortal, and recommendations but cannot independently verify every career detail.

- [Indexed LinkedIn profile](https://ir.linkedin.com/in/aliarghyani)
- [Ali's résumé-as-code post](https://www.linkedin.com/posts/aliarghyani_github-aliarghyaninuxt-portfolio-a-bilingual-activity-7403701512838766592-wCU9)
- [Official DET scoring](https://blog.englishtest.duolingo.com/how-is-the-duolingo-english-test-scored/)
- [Nuxt Content queryCollection](https://content.nuxt.com/docs/utils/query-collection)
- [Model Context Protocol](https://modelcontextprotocol.io/specification/2024-11-05/index)

Original certification, exact degree designation, independently measured project outcomes, and approved product screenshots remain content inputs for a later update. Their absence does not block the qualitative implementation.

## Implementation results — September 5, 2026

All three batches are implemented locally. The current design, section order, mentorship placement, and pre-existing language-switcher/article work are preserved. No deployment has been performed.

- Production artifacts were generated and served successfully. Earlier production builds passed; the final build reached Nuxt's `build:done` and produced the tested preview, although its PowerShell wrapper returned status 1 with dependency deprecation and existing debug timing warnings. This final invocation is not recorded as a clean zero-exit build. The pinned Vue TypeScript checker and formatting checks passed for the final source.
- The browser validation script passed 21 page checks: English and Persian, light and dark, at 360/390/768/1440px, plus five blog routes. Checks cover horizontal overflow, section order, dialog focus restoration and dismissal, accordion control targets and toggling, titles, canonicals, language alternatives, drafts, robots, sitemap, and server-rendered recommendations. A final mobile screenshot exposed navigation overlapping the hero badges; the homepage now reserves sufficient top space, with a regression assertion in the browser script.
- Clipboard success and denied-access fallback passed. All six optional analytics events passed against an intercepted local stub, including verification that only locale is attached and failed copies do not count as successful copies. No analytics events were transmitted during validation.
- Mobile Lighthouse on the production preview: accessibility **100**, SEO **100**, best practices **96**. The remaining best-practices failure is an existing GitHub contribution request returning HTTP 403 in this local environment; its service/token access remains to be checked in the deployment environment.
- Mobile trace before the final top-spacing adjustment: **LCP 1.40s**, **CLS 0.00**, at 390×844, 4× CPU slowdown and Slow 4G emulation. This is one local lab reload with browser cache retained, not field data or a directly comparable improvement over the earlier unthrottled live-site measurement.
- The existing language switcher passed both translated-article navigation and the blog-index fallback when no translation exists.
- The PDF endpoint returns HTTP 200 with a downloadable two-page PDF (799,915 bytes). Local Windows previews now use installed Chrome; Linux production retains the existing Chromium integration.

To repeat browser checks, start the production preview and run `node scripts/check-portfolio.mjs http://127.0.0.1:3100`. Set `CHROME_PATH` when Puppeteer's default browser is unavailable. The PDF server can use `PUPPETEER_EXECUTABLE_PATH` for an installed local Chrome. Screenshots and machine-readable results are written under `.cache/portfolio-validation`.

Set `NUXT_PUBLIC_LOAD_PLAUSIBLE=true` (or `1`) **before building/deploying**, because prerendered homepages embed public configuration. Also configure the site URL and existing Plausible proxy destination for the deployed site. Analytics remains disabled by default. Confirm production proxy requests and PDF generation after deployment, then begin the four-week engagement review.
