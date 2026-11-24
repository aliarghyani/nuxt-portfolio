import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import puppeteer from "puppeteer";

const origin = process.argv[2] ?? "http://127.0.0.1:3136";
const url = new URL(origin);
assert.ok(["127.0.0.1", "localhost"].includes(url.hostname));
assert.equal(url.origin, origin);
const contactDialog = '[role="dialog"]';
const closeButton = contactDialog + ' [data-slot="close"]';
const copyButton = contactDialog + ' [data-slot="footer"] button';
const emailLink = contactDialog + ' [data-slot="body"] a[href^="mailto:"]';
const heroTrigger = "#hero button";
const browser = await puppeteer.launch({
  headless: true,
  executablePath: process.env.CHROME_PATH,
});
const errors = [];
const safeError = (error) =>
  error.message.replace(/[\w.+-]+@[\w.-]+\.[a-z]{2,}/gi, "[redacted]");
const labels = Object.fromEntries(
  await Promise.all(
    ["en", "fa"].map(async (locale) => [
      locale,
      JSON.parse(
        await readFile(
          new URL("../i18n/locales/" + locale + ".json", import.meta.url),
          "utf8",
        ),
      ),
    ]),
  ),
);

async function openPage(page, path) {
  const response = await page.goto(origin + path, {
    waitUntil: "domcontentloaded",
    timeout: 40000,
  });
  assert.equal(response.status(), 200, path);
  await page.waitForSelector(".language-select:not([disabled])");
}

async function dialogIsOpen(page) {
  await page.waitForSelector(contactDialog, { visible: true });
  await page.waitForFunction(
    (selector) =>
      document.querySelector(selector)?.contains(document.activeElement),
    {},
    contactDialog,
  );
}

async function expectRestoredFocus(page, selector) {
  await page.waitForSelector(contactDialog, { hidden: true });
  await page.waitForFunction(
    (target) => document.activeElement === document.querySelector(target),
    {},
    selector,
  );
}

async function pressTab(page, reverse = false) {
  if (reverse) await page.keyboard.down("Shift");
  try {
    await page.keyboard.press("Tab");
  } finally {
    if (reverse) await page.keyboard.up("Shift");
  }
}

async function expectStatus(page, label) {
  await page.waitForFunction(
    (expected) =>
      document
        .querySelector('[role="dialog"] [role="status"]')
        ?.textContent.trim() === expected,
    {},
    label,
  );
}

async function contactCase(locale, width, theme) {
  const context = await browser.createBrowserContext();
  const key = [locale, width, theme].join("/");
  try {
    const page = await context.newPage();
    page.setDefaultTimeout(12000);
    await page.setViewport({
      width,
      height: 800,
      isMobile: width < 768,
      hasTouch: width < 768,
    });
    await page.emulateMediaFeatures([
      { name: "prefers-reduced-motion", value: "reduce" },
    ]);
    await page.evaluateOnNewDocument((mode) => {
      localStorage.setItem("nuxt-color-mode", mode);
      window.__contactQa = { mode: "success", sawExpected: false };
      Object.defineProperty(navigator, "clipboard", {
        configurable: true,
        value: {
          writeText(value) {
            const state = window.__contactQa;
            const address = document.querySelector(
              '[role="dialog"] [data-slot="body"] a[href^="mailto:"]',
            );
            state.sawExpected =
              !!address &&
              decodeURIComponent(new URL(address.href).pathname) === value;
            if (state.mode === "denied") {
              return Promise.reject(
                new DOMException("Denied", "NotAllowedError"),
              );
            }
            if (state.mode === "pending") {
              return new Promise((resolve) => {
                state.complete = resolve;
              });
            }
            return Promise.resolve();
          },
        },
      });
    }, theme);
    await openPage(page, locale === "fa" ? "/fa" : "/");
    await page.waitForFunction(
      (mode) =>
        document.documentElement.classList.contains("dark") ===
        (mode === "dark"),
      {},
      theme,
    );
    assert.equal(
      await page.$eval("html", (el) => el.dir),
      locale === "fa" ? "rtl" : "ltr",
    );

    let dialogIconRequests = 0;
    page.on("request", (request) => {
      const parsed = new URL(request.url());
      if (
        parsed.pathname.includes("/_nuxt_icon/") &&
        (parsed.searchParams.get("icons") ?? "")
          .split(",")
          .some((name) => ["x", "content-copy"].includes(name))
      ) {
        dialogIconRequests++;
      }
    });
    await page.focus(heroTrigger);
    await page.keyboard.press("Enter");
    await dialogIsOpen(page);

    const translations = labels[locale];
    const metadata = await page.$eval(
      contactDialog,
      (el, expected) => ({
        title:
          document
            .getElementById(el.getAttribute("aria-labelledby"))
            ?.textContent.trim() === expected.title,
        description:
          document
            .getElementById(el.getAttribute("aria-describedby"))
            ?.textContent.trim() === expected.description,
      }),
      translations.contact,
    );
    assert.deepEqual(metadata, { title: true, description: true });
    assert.equal(
      await page.$eval(closeButton, (el) => el.getAttribute("aria-label")),
      translations.hero.close,
    );
    for (const selector of [closeButton, copyButton]) {
      assert.ok(
        await page.$eval(selector, (el) => {
          const rect = el.getBoundingClientRect();
          return (
            rect.width >= 24 &&
            rect.height >= 24 &&
            !!el.querySelector('svg[aria-hidden="true"] path')
          );
        }),
        "Icon paint or pointer target",
      );
    }
    assert.ok(
      await page.$eval(emailLink, (link) => {
        const address = new URL(link.href);
        const subject = address.searchParams.get("subject");
        const action = link
          .closest('[role="dialog"]')
          .querySelector('[data-slot="footer"] a');
        return (
          address.protocol === "mailto:" &&
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
            decodeURIComponent(address.pathname),
          ) &&
          !!subject &&
          address.search === "?subject=" + encodeURIComponent(subject) &&
          action?.href === link.href
        );
      }),
      "Email destination and subject encoding",
    );

    for (let i = 0; i < 8; i++) {
      if (await page.$eval(emailLink, (el) => el === document.activeElement))
        break;
      await pressTab(page);
    }
    assert.ok(
      await page.$eval(emailLink, (el) => {
        const style = getComputedStyle(el);
        return (
          el === document.activeElement &&
          el.matches(":focus-visible") &&
          style.outlineStyle !== "none" &&
          parseFloat(style.outlineWidth) >= 2
        );
      }),
      "Address link has visible keyboard focus",
    );
    for (const reverse of [false, true]) {
      for (let i = 0; i < 5; i++) {
        await pressTab(page, reverse);
        assert.ok(
          await page.$eval(contactDialog, (el) =>
            el.contains(document.activeElement),
          ),
          "Dialog focus remains contained",
        );
      }
    }

    await page.click(copyButton);
    await expectStatus(page, translations.contact.copied);
    assert.ok(await page.evaluate(() => window.__contactQa.sawExpected));
    await page.evaluate(() => (window.__contactQa.mode = "denied"));
    await page.click(copyButton);
    await expectStatus(page, translations.contact.copyFailed);

    await page.evaluate(() => (window.__contactQa.mode = "pending"));
    await page.click(copyButton);
    await page.waitForFunction(
      () => typeof window.__contactQa.complete === "function",
    );
    await page.keyboard.press("Escape");
    await expectRestoredFocus(page, heroTrigger);

    await page.click(heroTrigger);
    await dialogIsOpen(page);
    await page.evaluate(async () => {
      window.__contactQa.complete();
      await new Promise((resolve) => requestAnimationFrame(resolve));
    });
    await expectStatus(page, "");
    await page.click(closeButton);
    await expectRestoredFocus(page, heroTrigger);
    assert.equal(
      dialogIconRequests,
      0,
      "Contact controls require no icon request",
    );
    console.log("PASS contact", key);
  } catch (error) {
    errors.push({ key, reason: safeError(error) });
  } finally {
    await context.close();
  }
}

const articleCases = [
  [
    "/blog/getting-started-with-nuxt-content",
    "/fa/blog/nuxt-content-introduction",
  ],
  [
    "/fa/blog/nuxt-content-introduction",
    "/blog/getting-started-with-nuxt-content",
  ],
  [
    "/blog/graphify-vs-codebase-memory-mcp",
    "/fa/blog/graphify-to-codebase-memory-mcp",
  ],
  [
    "/fa/blog/graphify-to-codebase-memory-mcp",
    "/blog/graphify-vs-codebase-memory-mcp",
  ],
  ["/blog/typescript-best-practices", "/fa/blog"],
];

async function articleCase(path, expected) {
  const context = await browser.createBrowserContext();
  try {
    const page = await context.newPage();
    page.setDefaultTimeout(15000);
    await page.setViewport({
      width: path.startsWith("/fa") ? 390 : 1350,
      height: 850,
    });
    const markedPath = path + "?source=contact-qa#top";
    await openPage(page, markedPath);
    const breadcrumb = await page.$('main nav[aria-label="breadcrumb"] ol');
    assert.ok(breadcrumb, "Breadcrumb list present");
    assert.equal(
      await breadcrumb.$$eval('[data-slot="item"]', (items) => items.length),
      3,
      "Home, blog and current article",
    );
    const neighbors = "main nav.mt-12";
    assert.equal(
      (await page.$$(neighbors + " a button")).length,
      0,
      "No nested interactive control",
    );
    assert.ok((await page.$$(neighbors + " a[href]")).length);
    await page.focus(".language-select");
    await page.keyboard.press("ArrowLeft");
    await page.keyboard.press("ArrowRight");
    assert.equal(new URL(page.url()).pathname, path);

    const previous = await page.$(neighbors + " > div:first-child > a[href]");
    const neighbor = previous ?? (await page.$(neighbors + " a[href]"));
    const destination = await neighbor.evaluate(
      (link) => new URL(link.href).pathname,
    );
    const rtl = path.startsWith("/fa");
    await neighbor.focus();
    await page.keyboard.press(
      Boolean(previous) !== rtl ? "ArrowLeft" : "ArrowRight",
    );
    await page.waitForFunction(
      (target) => location.pathname === target,
      {},
      destination,
    );
    await openPage(page, markedPath);
    const trigger = await page.$(".language-select");
    await trigger.focus();
    await page.keyboard.press("Enter");
    const id = await trigger.evaluate((el) => el.getAttribute("aria-controls"));
    const options = '[id="' + id + '"] [role="option"]';
    await page.waitForSelector(options, { visible: true });
    const choices = await page.$$(options);
    await choices[expected.startsWith("/fa") ? 1 : 0].click();
    await page.waitForFunction(
      (next) =>
        location.pathname === next &&
        document.documentElement.dir ===
          (next.startsWith("/fa") ? "rtl" : "ltr"),
      {},
      expected,
    );
    if (expected.endsWith("/blog")) {
      assert.equal(new URL(page.url()).search, "");
    } else {
      assert.equal(new URL(page.url()).search, "?source=contact-qa");
      assert.equal(new URL(page.url()).hash, "#top");
    }
    console.log("PASS article", path);
  } catch (error) {
    errors.push({ key: path, reason: safeError(error) });
  } finally {
    await context.close();
  }
}

async function sectionCase(locale, width, route, section) {
  const context = await browser.createBrowserContext();
  try {
    const page = await context.newPage();
    page.setDefaultTimeout(15000);
    const mobile = width < 768;
    await page.setViewport({
      width,
      height: 800,
      isMobile: mobile,
      hasTouch: mobile,
    });
    await page.emulateMediaFeatures([
      { name: "prefers-reduced-motion", value: "reduce" },
    ]);
    const prefix = locale === "fa" ? "/fa" : "";
    await openPage(page, prefix + route);
    const trigger = mobile
      ? await page.$('nav [aria-controls="' + section + '"]')
      : (
          await page.evaluateHandle(
            (label) =>
              [
                ...document.querySelectorAll("nav[data-section-header] button"),
              ].find((button) => button.getAttribute("aria-label") === label),
            labels[locale].nav.mentorship,
          )
        ).asElement();
    assert.ok(trigger, "Section control present");
    await trigger.focus();
    await page.keyboard.press("Enter");
    await page.waitForFunction(
      (home, id) => {
        const target = document.getElementById(id)?.getBoundingClientRect();
        const header = document
          .querySelector("nav[data-section-header]")
          ?.getBoundingClientRect();
        return (
          location.pathname === home &&
          location.hash === "#" + id &&
          !!target &&
          !!header &&
          target.top >= header.bottom - 2 &&
          target.top < innerHeight / 2
        );
      },
      {},
      prefix || "/",
      section,
    );
    console.log("PASS section", locale, width, route, section);
  } catch (error) {
    errors.push({
      key: [locale, width, route, section].join("/"),
      reason: safeError(error),
    });
  } finally {
    await context.close();
  }
}

try {
  for (const locale of ["en", "fa"])
    for (const theme of ["light", "dark"])
      for (const width of [360, 390, 768, 1350])
        await contactCase(locale, width, theme);

  for (const [path, expected] of articleCases)
    await articleCase(path, expected);

  for (const [locale, width] of [
    ["en", 1350],
    ["fa", 768],
  ]) {
    await sectionCase(
      locale,
      width,
      "/blog/career-change-huawei-to-frontend",
      "mentorship",
    );
    await sectionCase(locale, width, "/blog", "mentorship");
  }
  for (const [locale, width] of [
    ["en", 360],
    ["fa", 390],
  ]) {
    for (const section of ["projects", "skills"]) {
      await sectionCase(
        locale,
        width,
        "/blog/career-change-huawei-to-frontend",
        section,
      );
    }
  }
} finally {
  await browser.close();
}
if (errors.length) {
  console.error(JSON.stringify(errors));
  process.exitCode = 1;
}
