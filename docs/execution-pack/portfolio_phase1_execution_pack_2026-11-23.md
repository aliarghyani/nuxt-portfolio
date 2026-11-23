# Portfolio Phase 01 — Stability, Measurement & Release Quality

**Owner:** Ali Arghyani  
**Date:** 2026-11-23  
**Repository:** `aliarghyani/nuxt-portfolio`  
**Vercel project:** `nuxt-portfolio-aliarghyani` (team: `ali-arghyanis-projects`)  
**Primary domain:** `https://aliarghyani.ir`  
**Previous production baseline:** `main` at `82d57719f85fc8a911489a3adfd6ba23d3524082` (always recheck at story start)

## Objective / هدف

Stabilize the existing bilingual production portfolio without rebranding, adding new editorial content, buying services, changing hosting, or changing indexing policy. The pending advice from Amir Farrashi may inform the next phase; do not silently fold it into an ongoing story.

### In scope

- Secondary-host redirects and production safety checks
- Automated SEO and application smoke checks
- Existing analytics integration audit and privacy-safe event validation
- Reproducible performance baseline, then only evidence-backed optimizations
- Conversion/contact usability, accessibility, external-link integrity
- Published-content technical quality inventory (without editorial rewrites)
- Final production validation and handoff

### Explicitly out of scope

- Changing professional title, homepage promise/H1, business positioning, SEO keyword strategy
- Publishing, rewriting or removing articles without editorial approval
- New paid services, changing hosting provider, migrating away from Nuxt/Vercel
- Enabling indexing of HTML or PDF resumes; changing robots/noindex policy
- Creating speculative service pages, a bulk case-study framework, or `llms.txt` without evidence
- A repository-wide reformat, major dependency upgrade or unrelated refactor

## Manual Vercel steps (before Codex)

### V-01 — www to apex redirect

1. Project > Domains > Add Existing: `www.aliarghyani.ir`.
2. Select **Redirect to Another Domain**, target `aliarghyani.ir`, status **308 Permanent**. If the UI requires adding the domain first, edit it immediately afterward to set 308.
3. Do **not** select an option that redirects the apex to `www`.
4. Keep both the existing apex domain and the legacy `aliarghyani.vercel.app` 308 redirect.
5. If Vercel asks for DNS configuration, use exactly its project-specific DNS instructions; do not touch IRNIC nameservers or unrelated records. Verify the configuration and TLS.
6. In Windows PowerShell:
   ```powershell
   curl.exe -I "https://www.aliarghyani.ir/fa/blog?source=www"
   curl.exe -I "https://aliarghyani.ir/"
   curl.exe -I "https://aliarghyani.vercel.app/fa/blog?source=legacy"
   ```
   Expect respectively: **308** with matching path/query to `.ir`, **200**, and **308** to `.ir`. Pause on a mismatch.

### V-02 — Existing analytics account decision

1. Check whether there is an actual Plausible dashboard/site already managed by Ali (do not purchase anything).
2. In Vercel Project > Environment Variables confirm the **presence and applicable environment** of `NUXT_PUBLIC_LOAD_PLAUSIBLE`. You may note true/false, but do not share secrets or paste env exports.
3. If Plausible exists, check its site-domain setting and whether live events are visible for `aliarghyani.ir`. Do not create a new paid account.
4. Record one of: `existing+working`, `configured+not-working`, `not-active`, `unknown`. This informs ST-02. Do not make speculative changes.

### Operational risk — Vercel Hobby plan (not a code change)

Vercel's published Hobby terms restrict that tier to personal, non-commercial use. Because this portfolio openly invites freelance/contract inquiries, confirm through Vercel's policy/support whether its actual use qualifies. Do not assume that either the presence of a portfolio or a CTA automatically proves a violation. This is a separate account/compliance decision, not something Codex should silently change, and it is **not** permission to buy a plan or migrate hosts.

## Release workflow (mandatory for every Codex story)

1. Re-read repository and `main` HEAD before editing. Create a dedicated feature branch from the **latest** `main`; never work directly on `main`.
2. Finish **one story only**; no unrelated refactor, content rewrite, paid provider integration, credentials, or silent SEO-policy change.
3. Run relevant `pnpm typecheck`, `pnpm build`, existing Puppeteer/browser checks and narrow new tests where possible. Existing repository-wide formatting debt is not a reason to mass-reformat; check only changed files.
4. Submit a report with: branch + base SHA, changed files, factual findings, test commands/results, screenshots/logs when relevant, risks/limitations, any manual Vercel steps. Do not claim unrun tests passed.
5. **Stop for human review. Do not push, merge, deploy, or begin another story without approval.** After review: push/PR, merge only upon explicit approval, wait for production READY, verify production and then begin the next story.
6. Any feedback from Amir Farrashi is triaged separately as: `blocking confirmed technical problem`, `Phase 01 possible improvement`, or `deferred positioning/content decision`. Do not change the active story without approval.

## ST-01 — Reproducible release and regression checks

**Goal:** establish repeatable tests that protect the already-working domain, bilingual routes and PDF/resume behavior.

**Codex prompt:**

> Work in `aliarghyani/nuxt-portfolio`. Start a feature branch `phase01/st-01-release-regression` from the latest `main`. The approved baseline of this phase was commit `82d57719f85fc8a911489a3adfd6ba23d3524082`, but verify the latest SHA before editing.
>
> Audit the existing `scripts/check-portfolio.mjs`, Nuxt/Nitro setup, `package.json`, SEO composables and routes. Add or extend a **low-maintenance, deterministic regression/smoke check** that verifies: both home locales, blog indexes and representative localized articles; correct canonical and reciprocal hreflang; sitemap and robots pointing only to `https://aliarghyani.ir`; non-indexability of the HTML resume and PDF endpoints; no accidental `aliarghyani.vercel.app` references in the generated SEO outputs; functioning PDF generation; and old-host redirect + optional `www` redirect in a separate production-only smoke mode. Avoid hardcoding the current sitemap URL count as a forever-invariant.
>
> Keep the test harness lightweight and compatible with the existing Node/pnpm toolchain. Preserve server runtime, Nuxt i18n, existing files/routes and publication behavior. Do not add broad CI machinery or massive new dependencies unless essential. Document local and post-deploy commands. Run `pnpm typecheck`, `pnpm build`, existing relevant browser checks, and new checks. Do not modify the site copy, content, current indexing policy or current Vercel settings. Do not reformat the whole repository. Return branch, base SHA, changed files, test evidence, and failures or limitations. **Stop before push/merge/deployment and await review.**

**Acceptance:** repeatable documented checks, no regressions, clean changed-file format, no unrelated edits.

## ST-02 — Existing Plausible and conversion-event audit

**Goal:** determine whether the current analytics is genuinely operational and correct it only where justified.

**Codex prompt:**

> Start `phase01/st-02-analytics` from the latest `main`. Inspect `app/plugins/analytics.client.ts`, `app/composables/usePortfolioAnalytics.ts`, `vercel.json`, modal/contact interactions and tracking call sites. Treat the human-reported V-02 status as authoritative for whether a Plausible account is actually active; do not guess from environment variable presence.
>
> Audit event names and triggers: `Contact Open`, `Email Open`, `Email Copy`, `Resume Download`, `Project Details`, `Mentorship Inquiry`. Verify whether scripts initialize at most once, respect configuration, handle SPA navigation, avoid tracking personal information, and degrade harmlessly if disabled, blocked or unavailable. If existing Plausible is active, provide a reproducible live-browser event verification procedure and fix actual code defects only. If it is not active, **do not introduce or purchase a new provider**; provide a small decision note and leave the site functional with tracking disabled.
>
> Preserve privacy, accessibility, existing event contracts, and performance. Add minimal tests only if a defect or fragility is identified. Run appropriate build/typecheck/tests. Report observed versus inferred behavior, exact changes and a manual verification checklist. **Do not push/merge/deploy or start the next story.**

**Acceptance:** explicit yes/no/unknown tracking result, no PII, no redundant scripts, no new paid vendor.

## ST-03 — Performance baseline (measure first, no premature refactor)

**Goal:** establish trustworthy mobile/desktop baselines and identify at most three evidence-backed bottlenecks.

**Codex prompt:**

> Start `phase01/st-03-performance-baseline` from the latest `main`. Run or gather reproducible performance audits of production `https://aliarghyani.ir` for `/`, `/fa`, `/blog`, `/fa/blog`, and one representative article and resume route on both mobile and desktop. Use Lighthouse/PageSpeed or other supported measurement tools if available, and document the environment, throttling, cold/warm runs, and whether metrics are lab or field data. Do not invent scores, and distinguish Lighthouse TBT from the field INP metric.
>
> Inspect evidence for LCP, CLS, JS cost, hydration, font and image behavior, background effects, duplicate requests, bundle/caching, excessive initial HTML and the Nuxt app's SSR output. Produce a prioritized table: bottleneck, supporting evidence, user impact, exact file/route, risk, and candidate fix. Establish a baseline artifact and exact reproduction steps. This story is **diagnostic**: do not implement speculative optimizations or redesign UI. Run any necessary sanity checks. Stop for review, with a maximum of three proposed improvements and clear do-nothing-if-good assessment. **No push/merge/deployment without approval.**

**Acceptance:** inspectable baseline, repeatable method, maximum three justified proposed changes.

## ST-04 — Targeted performance remediation

**Goal:** apply only fixes authorized after ST-03 and quantify improvements.

**Codex prompt:**

> Start `phase01/st-04-performance-fixes` from the latest `main`, only after ST-03 has been reviewed and its accepted bottleneck list supplied. Implement **only the top one or two approved fixes** with the smallest safe change set. Prioritize real LCP/CLS/JS/hydration/image/font issues; do not optimize guessed bottlenecks, do not re-architect Nuxt, and do not compromise SSR, SEO metadata, locale switching, RTL, animations or PDF runtime. Preserve user-visible design unless explicitly approved.
>
> Provide before/after measurement using the same method/environment and explain uncertainty. Test mobile and desktop, English and Persian, browser navigation, docs/resume PDFs, `pnpm build` and `pnpm typecheck`. If evidence shows acceptable performance or the fix causes regression, recommend no change or revert. Report exact changed files and measurements. **Stop before push/merge/deploy.**

**Acceptance:** same-method before/after evidence, no regressions, documented tradeoffs; skip if unnecessary.

## ST-05 — Contact, project navigation and accessibility QA

**Goal:** maximize the chance that a serious recruiter or prospective collaborator can act successfully.

**Codex prompt:**

> Start `phase01/st-05-conversion-usability` from the latest `main`. Inspect the hero and contact entry points, contact modal (including focus return), copy email, mailto fallback, resume CTAs, project details/accordion behavior, mobile navigation, external project and social links, and both RTL/LTR flows. Test actual behavior with browser automation wherever available: mobile widths, keyboard-only access, focus order, accessible names, hit targets, visible errors, external `target=_blank` safety and missing/404 URLs.
>
> Fix only confirmed interaction, accessibility or broken-link defects. Do not modify marketing copy, professional claims, information architecture, external service selection or lead collection model. Never log inquiry text, email or clipboard values to analytics. Preserve styling and current functionality. Run browser checks, typecheck and build. Return a concise before/after defect list with reproduction steps and proof. **Stop before push/merge/deploy.**

**Acceptance:** verified key user journeys in both locales and mobile, no broken primary CTA, no privacy regression.

## ST-06 — Existing articles and technical content quality inventory

**Goal:** give Amir and Ali an evidence-based content backlog without publishing new editorial decisions.

**Codex prompt:**

> Start `phase01/st-06-content-audit` from the latest `main`. Inventory **all currently published** English and Persian blog posts and their actual public routes/sitemap entries. Review technical issues only: inaccessible images, invalid internal/external links, missing or conflicting canonical/alternate links, heading hierarchy, schema validity, inaccurate version-sensitive code examples, incorrect language/RTL metadata, draft accidentally published, and clearly unverifiable claims. Compare each issue with actual repository source and relevant authoritative documentation. Label each finding confirmed, needs manual verification, or editorial recommendation.
>
> Deliver `docs/phase01-content-audit.md` as an actionable evidence table with severity, URL, exact source file, proof, recommended fix and whether Amir's advice is needed. You may fix only tiny, unambiguous technical errors separately identified for approval; **do not** bulk edit article text, change publication dates, remove content, change index/noindex, rewrite titles, publish new material, or change keyword targets. Run typecheck/build only if code changed. Return audit and any narrow test evidence. **No push/merge/deployment without approval.**

**Acceptance:** exhaustive current-publication inventory, no invented search demand, clear editorial backlog.

## ST-07 — Phase closeout and production verification

**Goal:** confirm each accepted story is live and leave a clear handoff for the subsequent strategic/content phase.

**Codex prompt:**

> Start `phase01/st-07-final-acceptance` from the latest `main` only after ST-01 through ST-06 and manual V-01/V-02 are reviewed. Recheck source `main` SHA against active Vercel Production deployment; verify the apex 200 and legacy/www 308 redirects with preserved paths and query parameters; English/Farsi homepage, blog and article HTML; canonical/hreflang/OG/JSON-LD; `robots.txt`, sitemap/RSS, PDF downloads and noindex policy; contact/links/navigation; and analytics status without secret exposure. Rerun the approved regression suite and collect performance before/after artifacts.
>
> Produce `docs/phase01-handoff.md` summarizing baseline, final SHA, delivered work, actual test results, live evidence, remaining known issues, manual configuration, rollback guidance and deferred decisions for Amir Farrashi (branding/SEO keywords, new articles, case studies, HTML resume indexability). Do not invent a passing test, auto-change SEO policy, start new feature work or make unrelated edits. Report release readiness explicitly as PASS/BLOCKED with reasons. **Stop for review; no push/merge/deploy without approval.**

**Acceptance:** release proof and closed issue list, future decisions separated from defects.

## Response template for each Codex story

```text
Story ID:
Branch / base SHA:
Status: PASS | PARTIAL | BLOCKED
Confirmed findings:
Files changed:
Tests run (command + result):
Live checks (URL + HTTP status when applicable):
Risks / unresolved questions:
Manual Vercel or provider action:
Commit / PR (only after approval):
Recommended next decision:
```

## Review gate / ترتیب تأیید

Ali posts the complete Codex story report here. ChatGPT reviews factual evidence and changes. If repairs are necessary, ChatGPT supplies a **correction prompt for the same story**. Once accepted, Ali authorizes commit/PR/merge/deploy and posts the production result; ChatGPT verifies production before the next story is issued. New Amir Farrashi advice is triaged and may update the remaining backlog, not retroactively rewrite an approved story unless required by a confirmed defect.
