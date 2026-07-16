const HOME_SECTION_HASHES = new Set([
  "#hero",
  "#mentorship",
  "#skills",
  "#work",
  "#projects",
]);

export default defineNuxtPlugin((nuxtApp) => {
  const router = useRouter();
  const localePath = useLocalePath();

  const scrollToHomeSection = () => {
    const currentRoute = router.currentRoute.value;
    if (currentRoute.path !== localePath("/")) return;

    const hash = currentRoute.hash;
    if (!HOME_SECTION_HASHES.has(hash)) return;

    const sectionId = hash.slice(1);
    const retryUntil = performance.now() + 5000;

    const scrollWhenReady = () => {
      if (router.currentRoute.value.hash !== hash) return;

      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "auto", block: "start" });
        return;
      }

      if (performance.now() < retryUntil) {
        requestAnimationFrame(scrollWhenReady);
      }
    };

    requestAnimationFrame(scrollWhenReady);
  };

  router.afterEach(scrollToHomeSection);
  nuxtApp.hook("page:finish", scrollToHomeSection);

  if (document.readyState === "complete") {
    scrollToHomeSection();
  } else {
    window.addEventListener("load", scrollToHomeSection, { once: true });
  }
});
