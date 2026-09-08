export function usePortfolioSeo() {
  const config = useRuntimeConfig();
  const siteUrl = String(config.public.siteUrl).replace(/\/$/, "");
  const absoluteUrl = (path: string) => new URL(path, `${siteUrl}/`).href;
  const languageLinks = (paths: Partial<Record<"en" | "fa", string>>) =>
    Object.entries(paths).map(([language, path]) => ({
      rel: "alternate",
      hreflang: language === "fa" ? "fa-IR" : "en-US",
      href: absoluteUrl(path!),
    }));
  return { siteUrl, absoluteUrl, languageLinks };
}
