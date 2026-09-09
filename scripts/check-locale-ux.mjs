import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import puppeteer from "puppeteer";

const base = process.argv[2] || "http://127.0.0.1:3000";
assert.ok(["localhost", "127.0.0.1"].includes(new URL(base).hostname));
const output = ".cache/locale-ux";
await mkdir(output, { recursive: true });
const browser = await puppeteer.launch({
  headless: true,
  ...(process.env.CHROME_PATH
    ? { executablePath: process.env.CHROME_PATH }
    : {}),
});
const errors = [];
async function ready(page, path) {
  const response = await page.goto(base + path, {
    waitUntil: "domcontentloaded",
    timeout: 90000,
  });
  assert.equal(response.status(), 200, path);
  await page.waitForSelector(".language-select select", { timeout: 90000 });
  await page.evaluate(() => document.fonts.ready);
}
async function switchTo(page, language) {
  await page.waitForSelector(".language-select select:not([disabled])");
  await page.select(".language-select select", language);
  await page.waitForFunction(
    (lang) =>
      document.documentElement.lang.startsWith(lang) &&
      !document.documentElement.classList.contains("locale-switching"),
    {},
    language,
  );
}
async function readingPosition(page, id) {
  return page.$eval(`#${id}`, (el) => {
    const rect = el.getBoundingClientRect();
    return { top: rect.top, fraction: (96 - rect.top) / rect.height };
  });
}
try {
  for (const language of ["en", "fa"])
    for (const theme of ["light", "dark"])
      for (const width of [360, 768, 1440]) {
        const context = await browser.createBrowserContext();
        const page = await context.newPage();
        page.on("pageerror", (error) => errors.push(error.message));
        await page.setViewport({ width, height: 1000 });
        await page.evaluateOnNewDocument(
          (mode) => localStorage.setItem("nuxt-color-mode", mode),
          theme,
        );
        await ready(page, language === "fa" ? "/fa/resume" : "/resume");
        const state = await page.evaluate(() => ({
          heading: document.querySelector("h1").textContent,
          summary: document.querySelector("#resume-summary").textContent,
          direction: document.querySelector("[data-resume-ready]").dir,
          overflow: document.documentElement.scrollWidth > innerWidth,
          phone: document.querySelector('a[href^="tel:"] bdi').dir,
          skills: document.querySelector("#resume-skills").textContent,
          home: document.querySelector(".resume-page a").getAttribute("href"),
        }));
        assert.equal(state.direction, language === "fa" ? "rtl" : "ltr");
        assert.equal(/[\u0600-\u06FF]/.test(state.heading), language === "fa");
        assert.equal(/[\u0600-\u06FF]/.test(state.summary), language === "fa");
        assert.equal(
          state.overflow,
          false,
          JSON.stringify({ language, width }),
        );
        assert.equal(state.phone, "ltr");
        assert.ok(
          state.skills.includes("Vue.js") &&
            state.skills.includes("TypeScript"),
        );
        assert.equal(
          state.home.replace(/\/$/, "") || "/",
          language === "fa" ? "/fa" : "/",
        );
        if (width !== 768)
          await page.screenshot({
            path: `${output}/resume-${language}-${theme}-${width}.png`,
          });
        console.log(`Resume passed: ${language}/${theme}/${width}`);
        await context.close();
      }
  for (const width of [360, 1440]) {
    const context = await browser.createBrowserContext();
    const page = await context.newPage();
    page.on("pageerror", (error) => errors.push(error.message));
    await page.setViewport({ width, height: 900 });
    await ready(page, "/?source=locale-check#projects");
    for (const id of ["mentorship", "projects", "ai-stack"]) {
      await page.waitForSelector(`#${id}`);
      await page.$eval(`#${id}`, (el) =>
        scrollTo({
          top:
            scrollY +
            el.getBoundingClientRect().top +
            el.getBoundingClientRect().height * 0.15 -
            96,
          behavior: "instant",
        }),
      );
      const before = await readingPosition(page, id);
      await switchTo(page, "fa");
      let after = await readingPosition(page, id);
      assert.ok(
        Math.abs(before.fraction - after.fraction) < 0.03,
        `Lost ${id} EN→FA at ${width}: ${JSON.stringify({ before, after })}`,
      );
      assert.ok(page.url().includes("source=locale-check"));
      await switchTo(page, "en");
      after = await readingPosition(page, id);
      assert.ok(
        Math.abs(before.fraction - after.fraction) < 0.03,
        `Lost ${id} FA→EN at ${width}`,
      );
    }
    // The hero link keeps the selected locale, and browser Back restores navigation.
    await switchTo(page, "fa");
    await page.$eval("#hero", (el) =>
      el.scrollIntoView({ behavior: "instant" }),
    );
    await page
      .waitForSelector(".resume-view-button", { timeout: 5000 })
      .catch(async (error) => {
        console.log(
          "Hero diagnostic",
          page.url(),
          await page.$eval("#hero", (el) => el.innerHTML.slice(0, 6500)),
        );
        throw error;
      });
    await page.click(".resume-view-button");
    await page.waitForSelector("[data-resume-ready]");
    assert.equal(new URL(page.url()).pathname, "/fa/resume");
    await page.$eval("#resume-work", (el) =>
      scrollTo({
        top: scrollY + el.getBoundingClientRect().top - 96,
        behavior: "instant",
      }),
    );
    const resumeBefore = await readingPosition(page, "resume-work");
    await switchTo(page, "en");
    const resumePosition = await readingPosition(page, "resume-work");
    assert.ok(
      Math.abs(resumeBefore.fraction - resumePosition.fraction) < 0.03,
      `Lost resume work FA→EN at ${width}: ${JSON.stringify({ resumeBefore, resumePosition })}`,
    );
    await page.goBack({ waitUntil: "domcontentloaded" });
    await page.waitForSelector("#hero");
    assert.equal(new URL(page.url()).pathname.replace(/\/$/, ""), "/fa");
    assert.equal(
      new URL(page.url()).searchParams.get("source"),
      "locale-check",
    );
    await context.close();
    console.log(
      `Section preservation passed at ${width}, both directions, homepage and résumé.`,
    );
  }
  const context = await browser.createBrowserContext();
  const page = await context.newPage();
  for (const [slug, target] of [
    [
      "career-change-huawei-to-frontend",
      "/fa/blog/career-change-huawei-to-frontend",
    ],
    ["getting-started-with-nuxt-content", "/fa/blog"],
  ]) {
    await ready(page, `/blog/${slug}`);
    await switchTo(page, "fa");
    assert.equal(new URL(page.url()).pathname, target);
  }
  await context.close();
  assert.deepEqual(errors, []);
  for (const locale of ["en", "fa"]) {
    const response = await fetch(
      `${base}/api/resume/pdf?locale=${locale}&download=true`,
    );
    assert.equal(
      response.status,
      200,
      await response
        .clone()
        .text()
        .then((t) => t.slice(0, 250)),
    );
    assert.equal(response.headers.get("content-language"), locale);
    assert.ok(
      response.headers
        .get("content-disposition")
        .includes(`_${locale.toUpperCase()}_`),
    );
    const pdf = Buffer.from(await response.arrayBuffer());
    assert.equal(pdf.subarray(0, 4).toString(), "%PDF");
    const pages = pdf.toString("latin1").match(/\/Type\s*\/Page\b/g)?.length;
    assert.equal(pages, 2, `${locale} PDF page count`);
    await writeFile(`${output}/resume-${locale}.pdf`, pdf);
    console.log(`${locale} PDF passed: ${pdf.length} bytes, ${pages} pages.`);
  }
  assert.equal(
    (await fetch(`${base}/api/resume/pdf?locale=unsupported`)).status,
    400,
  );
  console.log(
    "Localized résumés, PDF generation, section preservation, blog fallbacks and language controls passed.",
  );
} finally {
  await browser.close();
}
