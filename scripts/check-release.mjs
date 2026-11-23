import assert from "node:assert/strict";

const origin = "https://aliarghyani.ir";
const legacyHost = /aliarghyani\.vercel\.app/i;
const base = new URL(process.argv[2] ?? "http://127.0.0.1:3100");
assert.ok(
  ["http:", "https:"].includes(base.protocol) &&
    ["localhost", "127.0.0.1", "[::1]"].includes(base.hostname) &&
    base.href === `${base.origin}/`,
  "Use a loopback production preview origin",
);

const routeGroups = [
  ["/", "/fa"],
  ["/blog", "/fa/blog"],
  [
    "/blog/career-change-huawei-to-frontend",
    "/fa/blog/career-change-huawei-to-frontend",
  ],
  [
    "/blog/getting-started-with-nuxt-content",
    "/fa/blog/nuxt-content-introduction",
  ],
  ["/blog/nuxt-ui-components"],
];
const resumes = ["/resume", "/fa/resume"];
const draft = "/blog/draft-post";
const languages = ["en-US", "fa-IR"];
const publicUrl = (path) => new URL(path, origin).href;

async function request(path, { status = 200, timeout = 15000 } = {}) {
  const url = new URL(path, base);
  assert.equal(url.origin, base.origin, `${path}: preview request origin`);
  const response = await fetch(url, {
    redirect: "manual",
    headers: { "accept-language": "en-US" },
    signal: AbortSignal.timeout(timeout),
  });
  assert.equal(response.status, status, path);
  return response;
}

// Inspect the generated head and sitemap tags without starting a browser or
// executing the app. The browser suite also parses the sitemap as XML.
function attributes(tag) {
  return Object.fromEntries(
    [...tag.matchAll(/\s([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)].map(
      ([, name, doubleQuoted, singleQuoted]) => [
        name.toLowerCase(),
        doubleQuoted ?? singleQuoted,
      ],
    ),
  );
}

function alternateUrls(links, path) {
  const alternates = {};
  for (const { rel, hreflang, href } of links) {
    assert.equal(rel, "alternate", `${path}: hreflang link relation`);
    assert.ok(
      [...languages, "x-default"].includes(hreflang),
      `${path}: unexpected hreflang ${hreflang}`,
    );
    assert.ok(
      !Object.hasOwn(alternates, hreflang),
      `${path}: duplicate ${hreflang}`,
    );
    assert.equal(new URL(href).origin, origin, `${path}: ${hreflang} origin`);
    alternates[hreflang] = href;
  }
  return alternates;
}

function hasNoindex(value = "") {
  return /(?:^|[\s,])(?:noindex|none)(?:$|[\s,])/i.test(value);
}

async function checkPage(
  path,
  { sitemapAlternates, expectedAlternates, resume = false } = {},
) {
  const response = await request(path);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^text\/html\b/,
    path,
  );
  const html = await response.text();
  const [, head] = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i) ?? [];
  assert.ok(head, `${path}: missing SSR head`);
  assert.doesNotMatch(head, legacyHost, `${path}: legacy hostname in SSR head`);

  const htmlTag = attributes(html.match(/<html\b[^>]*>/i)?.[0] ?? "");
  const isPersian = path === "/fa" || path.startsWith("/fa/");
  assert.equal(htmlTag.lang, isPersian ? "fa-IR" : "en-US", `${path}: lang`);
  assert.equal(htmlTag.dir, isPersian ? "rtl" : "ltr", `${path}: dir`);

  const links = [...head.matchAll(/<link\b[^>]*>/gi)].map(([tag]) =>
    attributes(tag),
  );
  const meta = [...head.matchAll(/<meta\b[^>]*>/gi)].map(([tag]) =>
    attributes(tag),
  );
  const canonical = publicUrl(path);
  assert.deepEqual(
    links.filter(({ rel }) => rel === "canonical").map(({ href }) => href),
    [canonical],
    `${path}: canonical`,
  );
  const ogUrls = meta
    .filter(({ property }) => property === "og:url")
    .map(({ content }) => content);
  if (expectedAlternates || ogUrls.length) {
    assert.deepEqual(ogUrls, [canonical], `${path}: Open Graph URL`);
  }

  const robots = meta.filter(({ name }) => name?.toLowerCase() === "robots");
  if (resume) {
    assert.ok(
      robots.some(({ content }) => content?.trim().toLowerCase() === "noindex"),
      `${path}: missing robots noindex`,
    );
    assert.match(
      html,
      /\bdata-resume-ready\b/,
      `${path}: missing resume markup`,
    );
    return;
  }
  assert.ok(
    !robots.some(({ content }) => hasNoindex(content)) &&
      !hasNoindex(response.headers.get("x-robots-tag") ?? ""),
    `${path}: public URL is marked noindex`,
  );

  const alternates = alternateUrls(
    links.filter(({ hreflang }) => hreflang !== undefined),
    path,
  );
  if (expectedAlternates) {
    assert.deepEqual(alternates, expectedAlternates, `${path}: HTML hreflang`);
  }
  // The sitemap module may supply its own x-default for the default locale.
  const { "x-default": sitemapDefault, ...sitemapLanguages } =
    sitemapAlternates;
  const { "x-default": htmlDefault, ...htmlLanguages } = alternates;
  assert.deepEqual(
    sitemapLanguages,
    htmlLanguages,
    `${path}: sitemap/HTML hreflang`,
  );
  if (htmlDefault !== undefined) {
    assert.equal(
      sitemapDefault,
      htmlDefault,
      `${path}: sitemap/HTML x-default`,
    );
  }
}

async function checkSitemap() {
  const robots = await (await request("/robots.txt")).text();
  assert.doesNotMatch(robots, legacyHost, "robots.txt legacy hostname");
  assert.deepEqual(
    [...robots.matchAll(/^sitemap:[ \t]*(\S+)[ \t]*\r?$/gim)].map(
      ([, url]) => url,
    ),
    [publicUrl("/sitemap.xml")],
    "robots.txt sitemap declaration",
  );

  const sitemap = await (await request("/sitemap.xml")).text();
  assert.doesNotMatch(sitemap, legacyHost, "sitemap legacy hostname");
  const sitemapMarkup = sitemap.replace(/<!--[\s\S]*?-->/g, "");
  const [, sitemapEntries] =
    sitemapMarkup.match(/<urlset\b[^>]*>([\s\S]*?)<\/urlset>\s*$/) ?? [];
  assert.ok(sitemapEntries, "sitemap urlset");
  const entries = new Map();
  for (const [, entry] of sitemapEntries.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
    const locs = [...entry.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/g)];
    assert.equal(locs.length, 1, "sitemap entry must have one page URL");
    const url = new URL(locs[0][1]);
    assert.equal(url.origin, origin, `${url.href}: sitemap page origin`);
    assert.equal(
      url.href,
      origin + url.pathname,
      `${url.href}: sitemap page URL`,
    );
    assert.ok(!entries.has(url.href), `${url.href}: duplicate sitemap entry`);
    const links = [...entry.matchAll(/<xhtml:link\b[^>]*>/g)].map(([tag]) =>
      attributes(tag),
    );
    entries.set(url.href, alternateUrls(links, url.pathname));
  }
  assert.ok(entries.size, "sitemap is empty");
  for (const [, loc] of sitemapEntries.matchAll(
    /<image:loc>\s*([^<]+?)\s*<\/image:loc>/g,
  )) {
    assert.equal(new URL(loc).origin, origin, `${loc}: sitemap image origin`);
  }
  for (const path of [...resumes, "/api/resume/pdf", draft]) {
    assert.ok(!entries.has(publicUrl(path)), `${path}: excluded from sitemap`);
  }
  for (const [url, alternates] of entries) {
    for (const target of Object.values(alternates)) {
      assert.deepEqual(
        entries.get(target),
        alternates,
        `${url} ↔ ${target}: reciprocal sitemap hreflang`,
      );
    }
  }
  return entries;
}

async function checkFeed(blog, locale) {
  const path = `${blog}/rss.xml`;
  const response = await request(path);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^application\/rss\+xml\b/i,
    path,
  );
  const feed = await response.text();
  assert.doesNotMatch(feed, legacyHost, `${path}: legacy hostname`);
  assert.ok(
    feed.includes(`<language>${locale}</language>`),
    `${path}: language`,
  );
  const self = feed.match(/<atom:link\b[^>]*>/)?.[0] ?? "";
  assert.equal(attributes(self).href, publicUrl(path), `${path}: feed URL`);
  const links = [...feed.matchAll(/<link>\s*([^<]+?)\s*<\/link>/g)].map(
    ([, url]) => url,
  );
  assert.equal(links[0], publicUrl(blog), `${path}: blog URL`);
  assert.ok(links.length > 1, `${path}: no article URLs`);
  for (const link of links.slice(1)) {
    assert.ok(
      link.startsWith(publicUrl(`${blog}/`)),
      `${path}: article URL ${link}`,
    );
  }
}

async function checkPdf(locale) {
  const path = `/api/resume/pdf?locale=${locale}&download=true`;
  const response = await request(path, { timeout: 90000 });
  assert.match(
    response.headers.get("content-type") ?? "",
    /^application\/pdf\b/i,
    path,
  );
  assert.equal(response.headers.get("content-language"), locale, path);
  assert.match(
    response.headers.get("content-disposition") ?? "",
    /^attachment;\s*filename="[^"]+\.pdf"$/i,
    path,
  );
  assert.equal(
    response.headers.get("x-robots-tag"),
    "noindex",
    `${path}: X-Robots-Tag`,
  );
  const pdf = Buffer.from(await response.arrayBuffer());
  assert.match(pdf.subarray(0, 12).toString("ascii"), /^%PDF-\d\.\d/, path);
  assert.match(
    pdf.subarray(-32).toString("ascii"),
    /%%EOF\s*$/,
    `${path}: truncated PDF`,
  );
  console.log(`PASS ${path} (${pdf.length} bytes)`);
}

const sitemap = await checkSitemap();
const knownAlternates = new Map();
for (const group of routeGroups) {
  const expected = Object.fromEntries(
    group.map((path, index) => [languages[index], publicUrl(path)]),
  );
  for (const path of group) {
    assert.ok(sitemap.has(publicUrl(path)), `${path}: missing from sitemap`);
    knownAlternates.set(path, expected);
  }
}
for (const [url, sitemapAlternates] of sitemap) {
  const { pathname } = new URL(url);
  await checkPage(pathname, {
    sitemapAlternates,
    expectedAlternates: knownAlternates.get(pathname),
  });
}
console.log(
  `PASS robots.txt, sitemap and SSR metadata for ${sitemap.size} indexed pages`,
);

await checkFeed("/blog", "en");
await checkFeed("/fa/blog", "fa");
console.log("PASS English and Persian RSS metadata");

for (const path of resumes) await checkPage(path, { resume: true });
await (await request(draft, { status: 404 })).body?.cancel();
console.log("PASS HTML resumes, resume noindex and draft exclusion");
for (const locale of ["en", "fa"]) await checkPdf(locale);
