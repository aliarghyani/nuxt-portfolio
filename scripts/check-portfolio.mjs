import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import puppeteer from "puppeteer";

// Run against a local production preview: node scripts/check-portfolio.mjs http://127.0.0.1:3100
const base = process.argv[2] || "http://127.0.0.1:3100";
assert.ok(
  ["127.0.0.1", "localhost"].includes(new URL(base).hostname),
  "Use a local preview",
);
const output = ".cache/portfolio-validation";
await mkdir(output, { recursive: true });
const browser = await puppeteer.launch({
  headless: true,
  ...(process.env.CHROME_PATH
    ? { executablePath: process.env.CHROME_PATH }
    : {}),
});
const results = [];
const errors = [];
try {
  for (const locale of ["en", "fa"]) {
    for (const theme of ["light", "dark"]) {
      for (const width of [320, 375, 390, 768, 1024, 1440]) {
        const context = await browser.createBrowserContext();
        const page = await context.newPage();
        page.on("pageerror", (error) => errors.push(error.message));
        await page.setViewport({ width, height: 900 });
        await page.evaluateOnNewDocument((mode) => {
          localStorage.setItem("nuxt-color-mode", mode);
        }, theme);
        const response = await page.goto(
          `${base}${locale === "fa" ? "/fa" : "/"}`,
          { waitUntil: "domcontentloaded", timeout: 90000 },
        );
        assert.equal(response.status(), 200);
        await page.waitForSelector("nav .language-select:not([disabled])");
        await page.evaluate(() => document.fonts.ready);
        const state = await page.evaluate(() => ({
          width: document.documentElement.scrollWidth,
          viewport: innerWidth,
          dir: document.documentElement.dir,
          dark: document.documentElement.classList.contains("dark"),
          sections: [...document.querySelectorAll("main section[id]")].map(
            (e) => e.id,
          ),
          h1: document.querySelector("h1")?.textContent,
          heroBadgeTop: document
            .querySelector("#hero .rounded-full")
            .getBoundingClientRect().top,
          navBottom: document.querySelector("nav").getBoundingClientRect()
            .bottom,
          badAria: [...document.querySelectorAll("main button[aria-controls]")]
            .filter(
              (e) => !document.getElementById(e.getAttribute("aria-controls")),
            )
            .map((e) => ({
              label: e.textContent.trim(),
              target: e.getAttribute("aria-controls"),
            })),
          analytics: [...document.scripts].some((s) =>
            s.src.includes("/stats/js/"),
          ),
          canonical: document.querySelector('link[rel="canonical"]')?.href,
          alternates: [...document.querySelectorAll("link[hreflang]")].map(
            (e) => e.hreflang,
          ),
        }));
        assert.ok(
          state.width <= state.viewport,
          `Overflow: ${locale}/${theme}/${width}`,
        );
        assert.equal(state.dir, locale === "fa" ? "rtl" : "ltr");
        assert.equal(state.dark, theme === "dark");
        assert.deepEqual(state.sections.slice(0, 4), [
          "hero",
          "services",
          "projects",
          "work",
        ]);
        assert.ok(state.sections.includes("contact"));
        assert.equal(
          state.h1.trim(),
          locale === "fa"
            ? "راهکارهای عملی برای گردش‌کارهای پیچیده"
            : "Practical solutions for complex workflows",
        );
        assert.ok(
          state.heroBadgeTop >= state.navBottom,
          `Navigation overlaps hero badges: ${locale}/${theme}/${width}`,
        );
        assert.deepEqual(
          state.badAria,
          [],
          `Broken accordion ARIA: ${JSON.stringify(state.badAria)}`,
        );
        assert.equal(
          state.analytics,
          false,
          "Analytics must be disabled by default",
        );
        assert.ok(state.canonical);
        assert.deepEqual(state.alternates.sort(), ["en-US", "fa-IR"]);
        assert.equal(
          await page.$$eval("#services article", (els) => els.length),
          3,
        );
        const stages = await page.$$eval("#services article", (els) =>
          els.map((el) => {
            const rect = el.getBoundingClientRect();
            const link = el.querySelector("a");
            return {
              x: rect.x,
              y: rect.y,
              linkedEvidence: Boolean(
                document.querySelector(link.getAttribute("href")),
              ),
            };
          }),
        );
        assert.ok(stages.every((stage) => stage.linkedEvidence));
        if (width >= 1024) {
          assert.ok(
            stages.every((stage) => Math.abs(stage.y - stages[0].y) < 1),
          );
          assert.equal(
            stages[0].x < stages[1].x,
            locale === "en",
            "Workflow follows locale reading order",
          );
        } else {
          assert.ok(
            stages[0].y < stages[1].y && stages[1].y < stages[2].y,
            "Workflow stacks on narrow screens",
          );
        }
        assert.equal(
          await page.$$eval("#projects article", (els) => els.length),
          4,
          "Four curated cases",
        );
        await page.click('[data-project-filter="all"]');
        await page.waitForFunction(
          () => document.querySelectorAll("#projects article").length === 9,
        );
        await page.click('[data-project-filter="selected"]');
        await page.waitForFunction(
          () => document.querySelectorAll("#projects article").length === 4,
        );
        assert.equal(await page.$$eval("h1", (els) => els.length), 1);
        const notes = await page.$$eval("#ai-stack a[href*='/blog/']", (els) =>
          els.map((el) => el.getAttribute("href")),
        );
        assert.equal(notes.length, 2, "Two published engineering notes");
        assert.ok(
          notes.every((path) =>
            path.startsWith(locale === "fa" ? "/fa/blog/" : "/blog/"),
          ),
        );
        const profile = await page.$eval(
          'script[type="application/ld+json"]',
          (el) => JSON.parse(el.textContent),
        );
        assert.equal(profile["@type"], "ProfilePage");
        assert.equal(profile.mainEntity["@type"], "Person");

        await page.$eval('#hero a[href="#ai-stack"]', (el) =>
          el.scrollIntoView({ block: "center", behavior: "instant" }),
        );
        await page.click('#hero a[href="#ai-stack"]');
        await page.waitForFunction(() => {
          const section = document.getElementById("ai-stack");
          const top = section.getBoundingClientRect().top;
          const offset =
            parseFloat(
              getComputedStyle(document.documentElement).scrollPaddingTop,
            ) + parseFloat(getComputedStyle(section).scrollMarginTop);
          return (
            top >=
              document.querySelector("nav").getBoundingClientRect().bottom &&
            top <= offset + 4
          );
        });

        // Inspect both ways into the shared contact dialog and restore the actual trigger.
        for (const selector of ["#hero button", "#contact button"]) {
          await page.$eval(selector, (el) =>
            el.scrollIntoView({ block: "center", behavior: "instant" }),
          );
          await page.click(selector);
          await page.waitForSelector('[role="dialog"]', { visible: true });
          assert.equal(
            await page.$eval(
              '[role="dialog"] a[href^="mailto:"]',
              (e) => e.textContent,
            ),
            "aliarghyani@gmail.com",
          );
          await page.keyboard.press("Escape");
          await page.waitForSelector('[role="dialog"]', { hidden: true });
          assert.equal(
            await page.evaluate(
              (sel) => document.activeElement === document.querySelector(sel),
              selector,
            ),
            true,
          );
        }
        // Exercise open/close while retaining the controls' referenced content nodes.
        await page.click("#projects button");
        await page.click("#projects button");
        assert.equal(
          await page.$eval("#projects button", (e) =>
            e.getAttribute("aria-expanded"),
          ),
          "true",
        );
        await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
        if (width === 320 || width === 390 || width === 1440)
          await page.screenshot({
            path: `${output}/${locale}-${theme}-${width}.png`,
          });
        if (width === 320 || width === 1440) {
          for (const id of ["services", "ai-stack"]) {
            const section = await page.$(`#${id}`);
            await section.screenshot({
              path: `${output}/${locale}-${theme}-${width}-${id}.png`,
            });
          }
        }
        results.push({ locale, theme, width, passed: true });
        console.log(`Passed ${locale}/${theme}/${width}`);
        await context.close();
      }
    }
  }

  const page = await browser.newPage();
  for (const path of [
    "/blog",
    "/fa/blog",
    "/blog/career-change-huawei-to-frontend",
    "/fa/blog/career-change-huawei-to-frontend",
    "/blog/getting-started-with-nuxt-content",
    "/blog/using-graphify-as-a-project-map",
    "/fa/blog/using-graphify-as-a-project-map",
    "/blog/graphify-vs-codebase-memory-mcp",
    "/fa/blog/graphify-to-codebase-memory-mcp",
  ]) {
    const response = await page.goto(`${base}${path}`, {
      waitUntil: "domcontentloaded",
    });
    assert.equal(response.status(), 200, path);
    const meta = await page.evaluate(() => ({
      title: document.title,
      description: document.querySelector('meta[name="description"]')?.content,
      canonical: document.querySelector('link[rel="canonical"]')?.href,
      h1: document.querySelectorAll("h1").length,
      alternates: [...document.querySelectorAll("link[hreflang]")].map(
        (e) => e.hreflang,
      ),
    }));
    assert.ok(meta.title && meta.description && meta.canonical, path);
    assert.equal(meta.h1, 1, `One H1 on ${path}`);
    if (
      path.endsWith("getting-started-with-nuxt-content") ||
      path.endsWith("graphify-vs-codebase-memory-mcp")
    )
      assert.deepEqual(meta.alternates, ["en-US"]);
    else if (path.endsWith("graphify-to-codebase-memory-mcp"))
      assert.deepEqual(meta.alternates, ["fa-IR"]);
    else assert.deepEqual(meta.alternates.sort(), ["en-US", "fa-IR"]);
    results.push({ path, passed: true });
  }
  assert.equal((await page.goto(`${base}/blog/draft-post`)).status(), 404);
  const robots = await (await fetch(`${base}/robots.txt`)).text();
  assert.match(robots, /Sitemap: https?:\/\/.+\/sitemap\.xml/);
  assert.equal((await fetch(`${base}/sitemap.xml`)).status, 200);
  // Recommendation copy must also be readable without JavaScript.
  const html = await (await fetch(`${base}/`)).text();
  assert.ok(html.includes("View full recommendation"));
  assert.equal(html.includes("media.bitterbrains.com"), false);
  assert.deepEqual(errors, []);
  await writeFile(`${output}/results.json`, JSON.stringify(results, null, 2));
  console.log(
    `Passed ${results.length} page checks plus drafts, robots, sitemap, SSR recommendations, dialogs, and accordions.`,
  );
} finally {
  await browser.close();
}
