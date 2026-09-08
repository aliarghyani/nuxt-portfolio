export default defineEventHandler((event) => {
  const siteUrl = String(useRuntimeConfig(event).public.siteUrl).replace(
    /\/$/,
    "",
  );
  setHeader(event, "Content-Type", "text/plain; charset=utf-8");
  return `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`;
});
