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
const roobertRegular = "/fonts/Roobert-Regular.woff2";
const roobertMedium = "/fonts/Roobert-Medium.woff2";
const roobertSemiBold = "/fonts/Roobert-SemiBold.woff2";
const vazirVar = "/fonts/vazirmatn/webfonts/Vazirmatn[wght].woff2";

const fontPreloads = computed(() => {
  const links = [
    {
      rel: "preload",
      as: "font",
      type: "font/woff2",
      href: roobertRegular,
      crossorigin: "anonymous",
    },
    {
      rel: "preload",
      as: "font",
      type: "font/woff2",
      href: roobertMedium,
      crossorigin: "anonymous",
    },
    {
      rel: "preload",
      as: "font",
      type: "font/woff2",
      href: roobertSemiBold,
      crossorigin: "anonymous",
    },
  ];
  if (locale.value === "fa") {
    links.push({
      rel: "preload",
      as: "font",
      type: "font/woff2",
      href: vazirVar,
      crossorigin: "anonymous",
    });
  }
  return links;
});

const headLinks = fontPreloads;

useHead(() => ({
  htmlAttrs: {
    lang: langAttr.value,
    dir: dirAttr.value,
  },
  link: headLinks.value as any,
}));

if (import.meta.client) {
  watchEffect(() => {
    document.documentElement.lang = langAttr.value;
    document.documentElement.dir = dirAttr.value;
  });
}
</script>
