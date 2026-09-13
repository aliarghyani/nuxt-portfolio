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
    class="language-select min-h-11 w-22 cursor-pointer rounded-full ps-9 pe-8 font-semibold shadow-sm sm:w-36 sm:ps-10 sm:pe-10"
    :content="{
      align: 'start',
      sideOffset: 8,
      collisionPadding: 12,
      bodyLock: false,
    }"
    :ui="{
      base: 'rounded-full transition-shadow hover:ring-primary/60 focus-visible:ring-2 focus-visible:ring-primary',
      content:
        'relative z-[70] min-w-36 rounded-xl shadow-xl ring ring-default',
      group: 'p-1.5',
      item: 'min-h-10 cursor-pointer rounded-lg px-2.5',
      itemLeadingIcon: 'size-4.5',
      itemTrailingIcon: 'text-primary',
      value: 'truncate text-sm font-semibold sm:text-base',
      trailingIcon:
        'size-4 transition-transform duration-200 group-data-[state=open]:rotate-180 sm:size-5',
    }"
    @update:model-value="changeLanguage"
  >
    <template #default="{ modelValue }">
      <span class="hidden sm:inline">{{ getLocaleLabel(modelValue) }}</span>
      <span class="sm:hidden">{{ getLocaleShortLabel(modelValue) }}</span>
    </template>
    <template #item-label="{ item }">
      <span>{{ getItemLabel(item) }}</span>
    </template>
  </USelect>
</template>

<script setup lang="ts">
type LocaleCode = "en" | "fa";
type LocaleItem = {
  label: string;
  shortLabel: string;
  value: LocaleCode;
  icon: string;
};

const { locale, setLocaleCookie, t } = useI18n();
const router = useRouter();
const switchLocalePath = useSwitchLocalePath();
const localePath = useLocalePath();
const loading = useLoadingIndicator();
const toast = useToast();
const { isLocaleSwitching, begin, restore, end } = useLocaleSwitching();
const isMounted = ref(false);
const defaultLocaleItem: LocaleItem = {
  label: "English",
  shortLabel: "EN",
  value: "en",
  icon: "i-twemoji-flag-united-states",
};
const localeItems: LocaleItem[] = [
  defaultLocaleItem,
  {
    label: "فارسی",
    shortLabel: "FA",
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

function findLocaleItem(value: unknown) {
  return localeItems.find((item) => item.value === value) ?? defaultLocaleItem;
}

function getLocaleLabel(value: unknown) {
  return findLocaleItem(value).label;
}

function getLocaleShortLabel(value: unknown) {
  return findLocaleItem(value).shortLabel;
}

function getItemLabel(item: unknown) {
  return typeof item === "object" && item && "label" in item
    ? String(item.label)
    : "";
}

async function changeLanguage(value: unknown) {
  if (
    (value !== "en" && value !== "fa") ||
    value === locale.value ||
    isLocaleSwitching.value
  )
    return;
  const nextLocale = value as LocaleCode;
  const previousLocale = locale.value;
  const current = router.currentRoute.value;
  const normalizedPath =
    current.path.replace(/^\/(en|fa)(?=\/|$)/, "").replace(/\/$/, "") || "/";
  begin();
  loading.start();
  try {
    let target = switchLocalePath(nextLocale);
    let preserve = true;
    if (normalizedPath.startsWith("/blog/")) {
      const translatedPost = await queryCollection("blog")
        .where("path", "=", `/${nextLocale}${normalizedPath}`)
        .first();
      if (!translatedPost || translatedPost.draft === true) {
        target = localePath("/blog", nextLocale);
        preserve = false;
      }
    }
    if (!target) throw new Error("Missing locale route");
    setLocaleCookie(nextLocale);
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
