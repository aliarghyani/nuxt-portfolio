import assert from "node:assert/strict";

const primary = "https://aliarghyani.ir";
const redirects = [
  "https://aliarghyani.vercel.app",
  "https://www.aliarghyani.ir",
];
const paths = ["/", "/fa/blog?source=release-smoke&term=a%2Bb&term=c"];

async function check(origin, path, status) {
  const url = origin + path;
  const response = await fetch(url, {
    redirect: "manual",
    headers: { "accept-language": "en-US" },
    signal: AbortSignal.timeout(20000),
  }).catch((error) => {
    throw new Error(`Request failed for ${url}`, { cause: error });
  });
  await response.body?.cancel();
  assert.equal(response.status, status, url);
  if (status === 308) {
    assert.equal(
      response.headers.get("location"),
      primary + path,
      `${url}: Location`,
    );
  }
  return `PASS ${response.status} ${url}${status === 308 ? ` → ${primary + path}` : ""}`;
}

const checks = [
  ...paths.map((path) => check(primary, path, 200)),
  ...redirects.flatMap((origin) =>
    paths.map((path) => check(origin, path, 308)),
  ),
];
const results = await Promise.allSettled(checks);
for (const result of results) {
  if (result.status === "fulfilled") {
    console.log(result.value);
  } else {
    console.error(result.reason);
    process.exitCode = 1;
  }
}
