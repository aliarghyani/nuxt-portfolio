import { SITE_URL } from "~~/shared/utils/site";

export default defineNitroPlugin((nitro) => {
  nitro.hooks.hook("sitemap:resolved", ({ urls }) => {
    for (const entry of urls) {
      for (const image of entry.images ?? []) {
        // Index the original asset instead of a provider-specific transform URL.
        const url = new URL(image.loc.replaceAll("&amp;", "&"), SITE_URL);
        if (url.origin !== SITE_URL) continue;

        const source =
          url.pathname === "/_vercel/image"
            ? url.searchParams.get("url")
            : url.pathname.startsWith("/_ipx/")
              ? url.pathname.replace(/^\/_ipx\/[^/]+(?=\/)/, "")
              : null;

        if (source?.startsWith("/") && !source.startsWith("//")) {
          image.loc = new URL(source, SITE_URL).href;
        }
      }
    }
  });
});
