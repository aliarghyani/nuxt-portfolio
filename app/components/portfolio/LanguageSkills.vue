<template>
  <section class="section-spacing">
    <UContainer>
      <div class="section-header flex-nowrap items-center gap-3 justify-start">
        <UIcon name="i-twemoji-globe-showing-europe-africa" class="text-2xl" />
        <h2 class="section-title">{{ t("sections.language") }}</h2>
      </div>

      <PortfolioAccordion
        id="languageskills-accordion"
        type="single"
        :items="accordionItems"
        default-value="language"
        :ui="accordionUi"
      >
        <template #body>
          <div class="space-y-6">
            <div class="grid gap-4 md:grid-cols-2">
              <div
                v-for="item in items"
                :key="item.key"
                class="flex flex-col gap-2 rounded-lg border border-slate-200/80 p-3 dark:border-slate-700/60"
              >
                <div class="flex items-center gap-2">
                  <img
                    v-if="item.iconType === 'image'"
                    :src="item.icon"
                    :alt="item.title"
                    class="h-6 w-6 object-contain"
                  />
                  <UIcon
                    v-else
                    :name="item.icon"
                    class="text-lg text-primary-500 dark:text-primary-400"
                  />
                  <h3
                    class="text-sm font-semibold text-gray-900 dark:text-gray-100"
                  >
                    {{ item.title }}
                  </h3>
                </div>
                <p class="text-sm text-gray-600 dark:text-gray-300">
                  {{ item.description }}
                </p>
              </div>
            </div>
          </div>
        </template>
      </PortfolioAccordion>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";

const { t } = useI18n();

// Detect mobile for accordion behavior (SSR-safe)
const isMobile = ref(true);

onMounted(() => {
  const checkMobile = () => {
    isMobile.value = window.innerWidth < 768;
  };
  checkMobile();
  window.addEventListener("resize", checkMobile);
  onUnmounted(() => {
    window.removeEventListener("resize", checkMobile);
  });
});

const items = computed(() => [
  {
    key: "ielts",
    iconType: "image" as const,
    icon: "/img/icons8-ielts-48.png",
    title: t("languageSection.items.ielts.title"),
    description: t("languageSection.items.ielts.desc"),
  },
  {
    key: "huawei",
    iconType: "icon" as const,
    icon: "i-twemoji-globe-with-meridians",
    title: t("languageSection.items.huawei.title"),
    description: t("languageSection.items.huawei.desc"),
  },
]);

const accordionItems = computed(() => [
  {
    label: t("languageSection.accordionLabel"),
    value: "language",
  },
]);

const accordionUi = {
  root: "flex flex-col",
  item: "flex flex-col rounded-2xl border border-gray-200/70 dark:border-gray-700/50 bg-white/70 dark:bg-gray-900/40 shadow-sm",
  header:
    "px-4 data-[state=open]:border-b border-gray-200/70 dark:border-gray-700/50",
  trigger: "group flex-1 items-center gap-2 py-3 text-left cursor-pointer",
  label:
    "text-sm font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300",
  leadingIcon: "shrink-0",
  trailingIcon:
    "ms-auto text-gray-500 dark:text-gray-400 transition-transform duration-200 group-data-[state=open]:rotate-180",
  content: "px-4 pb-4 pt-3 data-[state=closed]:hidden",
  body: "pt-1",
} as const;
</script>
