import { SITE_URL } from "~~/shared/utils/site";

export function usePortfolioSeo() {
  const absoluteUrl = (path: string) => new URL(path, SITE_URL).href;
  const languageLinks = (paths: Partial<Record<"en" | "fa", string>>) =>
    Object.entries(paths).map(([language, path]) => ({
      rel: "alternate",
      hreflang: language === "fa" ? "fa-IR" : "en-US",
      href: absoluteUrl(path!),
    }));
  return { absoluteUrl, languageLinks, personId: absoluteUrl("/#person") };
}
