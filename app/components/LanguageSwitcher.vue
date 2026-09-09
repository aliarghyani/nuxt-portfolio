<template>
  <USelect
    :model-value="locale"
    :items="localeItems"
    value-key="value"
    label-key="label"
    :icon="selectedIcon"
    :disabled="!isMounted || isLocaleSwitching"
    :loading="isLocaleSwitching"
    :aria-label="t('nav.languageSelector')"
    color="primary"
    variant="subtle"
    size="lg"
    :portal="false"
    class="language-select min-h-11 w-36 cursor-pointer rounded-full font-semibold shadow-sm"
    :content="{
      align: 'start',
      sideOffset: 8,
      collisionPadding: 12,
      bodyLock: false,
    }"
    :ui="{
      base: 'rounded-full transition-shadow hover:ring-primary/60 focus-visible:ring-2 focus-visible:ring-primary',
      content: 'relative z-[70] rounded-xl shadow-xl ring ring-default',
      group: 'p-1.5',
      item: 'min-h-10 cursor-pointer rounded-lg px-2.5',
      itemLeadingIcon: 'size-4.5',
      itemTrailingIcon: 'text-primary',
      trailingIcon:
        'transition-transform duration-200 group-data-[state=open]:rotate-180',
    }"
    @update:model-value="changeLanguage"
  />
</template>

<script setup lang="ts">
const { locale, setLocaleCookie, t } = useI18n();
const router = useRouter();
const switchLocalePath = useSwitchLocalePath();
const localePath = useLocalePath();
const loading = useLoadingIndicator();
const toast = useToast();
const { isLocaleSwitching, begin, restore, end } = useLocaleSwitching();
const isMounted = ref(false);
const localeItems = [
  {
    label: "English",
    value: "en",
    icon: "i-twemoji-flag-united-states",
  },
  {
    label: "فارسی",
    value: "fa",
    icon: "i-twemoji-flag-iran",
  },
];
const selectedIcon = computed(() =>
  locale.value === "fa"
    ? "i-twemoji-flag-iran"
    : "i-twemoji-flag-united-states",
);

onMounted(() => {
  isMounted.value = true;
});

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
