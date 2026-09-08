export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  if (!["true", "1"].includes(String(config.public.loadPlausible))) return;
  type Plausible = ((...args: unknown[]) => void) & { q?: unknown[][] };
  const browser = window as Window & { plausible?: Plausible };
  browser.plausible =
    browser.plausible ||
    Object.assign(
      (...args: unknown[]) => {
        browser.plausible!.q!.push(args);
      },
      { q: [] as unknown[][] },
    );
  const script = document.createElement("script");
  script.defer = true;
  script.dataset.domain = new URL(String(config.public.siteUrl)).hostname;
  script.dataset.api = "/stats/api/event";
  script.src = "/stats/js/script.js";
  document.head.appendChild(script);
});
