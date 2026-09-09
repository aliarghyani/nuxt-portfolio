<script setup lang="ts">
definePageMeta({ layout: false, key: "resume" });
const route = useRoute();
const { t, locale } = useI18n();
const localePath = useLocalePath();
const isPrintMode = computed(() => route.query.print === "true");
useHead(() => ({
  title: t("resume.title"),
  meta: [{ name: "robots", content: "noindex" }],
}));
</script>

<template>
  <div class="resume-page bg-gray-100">
    <div
      v-if="!isPrintMode"
      class="no-print sticky top-0 z-50 flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 bg-white/95 px-4 py-3 backdrop-blur-sm"
    >
      <NuxtLink
        :to="localePath('/')"
        class="inline-flex min-h-11 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-gray-800 ring-1 ring-gray-200 transition-colors hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-primary"
      >
        <UIcon
          :name="
            locale === 'fa'
              ? 'i-heroicons-arrow-right'
              : 'i-heroicons-arrow-left'
          "
          class="size-4"
        />
        {{ t("resume.backHome") }}
      </NuxtLink>
      <LanguageSwitcher />
    </div>
    <ResumePreview />
    <ResumeDownloadButton :is-print-mode="isPrintMode" />
  </div>
</template>

<style scoped>
@media print {
  .no-print {
    display: none !important;
  }
}
</style>
