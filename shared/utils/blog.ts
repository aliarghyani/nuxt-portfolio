const translations = [
  ["getting-started-with-nuxt-content", "nuxt-content-introduction"],
  ["graphify-vs-codebase-memory-mcp", "graphify-to-codebase-memory-mcp"],
];

export function localizedBlogSlug(slug: string, locale: "en" | "fa"): string {
  const pair = translations.find((entry) => entry.includes(slug));
  return pair?.[locale === "en" ? 0 : 1] ?? slug;
}
