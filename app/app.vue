<template>
  <UApp :toaster="{ expand: false }">
    <NuxtLoadingIndicator
      color="#6366F1"
      :height="3"
      :throttle="100"
      :duration="2000"
    />
    <ProjectContactDialog />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<script setup lang="ts">
const { locale, locales } = useI18n();

const activeLocale = computed(
  () =>
    locales.value.find((item) => item.code === locale.value) ??
    locales.value[0],
);
const langAttr = computed(
  () => (activeLocale.value as any)?.language ?? locale.value,
);
const dirAttr = computed(() => activeLocale.value?.dir ?? "ltr");
const vazirVar = "/fonts/vazirmatn/webfonts/Vazirmatn[wght].woff2";

useHead(() => ({
  htmlAttrs: {
    lang: langAttr.value,
    dir: dirAttr.value,
  },
  link:
    locale.value === "fa"
      ? [
          {
            rel: "preload",
            as: "font",
            type: "font/woff2",
            href: vazirVar,
            crossorigin: "anonymous",
          },
        ]
      : [],
}));

if (import.meta.client) {
  watchEffect(() => {
    document.documentElement.lang = langAttr.value;
    document.documentElement.dir = dirAttr.value;
  });
}
</script>
