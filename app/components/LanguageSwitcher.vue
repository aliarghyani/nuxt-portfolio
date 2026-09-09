<template>
  <ClientOnly>
    <label
      class="language-select relative inline-flex min-h-11 items-center rounded-full border border-gray-200 bg-gray-100/90 text-sm text-gray-800 shadow-sm transition-colors hover:border-primary-400 hover:bg-primary-50 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-primary dark:border-gray-700 dark:bg-gray-800/90 dark:text-gray-100 dark:hover:border-primary-500 dark:hover:bg-gray-800"
    >
      <UIcon
        :name="selectedIcon"
        class="pointer-events-none absolute start-3 size-4"
        aria-hidden="true"
      />
      <select
        :value="locale"
        :disabled="isLocaleSwitching"
        :aria-label="t('nav.languageSelector')"
        class="min-h-11 cursor-pointer appearance-none rounded-full bg-transparent ps-9 pe-8 font-medium outline-none disabled:cursor-wait disabled:opacity-60"
        @change="changeLanguage(($event.target as HTMLSelectElement).value)"
      >
        <option value="en">English</option>
        <option value="fa">فارسی</option>
      </select>
      <UIcon
        name="i-mdi-chevron-down"
        class="pointer-events-none absolute end-2.5 size-4 text-gray-500 dark:text-gray-400"
        aria-hidden="true"
      />
    </label>
  </ClientOnly>
</template>

<script setup lang="ts">
const { locale, setLocaleCookie, t } = useI18n();
const router = useRouter();
const switchLocalePath = useSwitchLocalePath();
const localePath = useLocalePath();
const loading = useLoadingIndicator();
const toast = useToast();
const { isLocaleSwitching, begin, restore, end } = useLocaleSwitching();
const selectedIcon = computed(() =>
  locale.value === "fa"
    ? "i-twemoji-flag-iran"
    : "i-twemoji-flag-united-states",
);

async function changeLanguage(value: unknown) {
  if (
    (value !== "en" && value !== "fa") ||
    value === locale.value ||
    isLocaleSwitching.value
  )
    return;
  const previousLocale = locale.value;
  const current = router.currentRoute.value;
  const normalizedPath =
    current.path.replace(/^\/(en|fa)(?=\/|$)/, "").replace(/\/$/, "") || "/";
  begin();
  loading.start();
  try {
    let target = switchLocalePath(value);
    let preserve = true;
    if (normalizedPath.startsWith("/blog/")) {
      const translatedPost = await queryCollection("blog")
        .where("path", "=", `/${value}${normalizedPath}`)
        .first();
      if (!translatedPost || translatedPost.draft === true) {
        target = localePath("/blog", value);
        preserve = false;
      }
    }
    if (!target) throw new Error("Missing locale route");
    setLocaleCookie(value);
    // One navigation loads messages and updates the locale through Nuxt i18n middleware.
    // A locale choice changes the current view. Replacing it keeps the Back
    // button useful instead of adding every language toggle to browser history.
    const failure = await router.replace(target);
    if (failure) throw failure;
    await restore(preserve);
  } catch {
    setLocaleCookie(previousLocale);
    toast.add({ title: t("nav.languageChangeError"), color: "error" });
  } finally {
    end();
    loading.finish();
  }
}
</script>
