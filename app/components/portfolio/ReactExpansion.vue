<template>
  <section v-if="reactExpansion" id="react-next" class="mb-8 scroll-mt-20">
    <UContainer>
      <details
        class="rounded-xl border border-gray-200/70 bg-white/60 px-4 dark:border-gray-700/50 dark:bg-gray-900/40"
      >
        <summary
          class="min-h-11 cursor-pointer py-3 text-sm font-medium text-gray-600 focus-visible:outline-2 focus-visible:outline-primary dark:text-gray-300"
        >
          {{ t("sections.currentlyExpanding") }} · {{ reactExpansion.title }}
        </summary>
        <p
          class="max-w-3xl pb-3 text-sm leading-relaxed text-gray-600 dark:text-gray-300"
        >
          {{ reactExpansion.description }}
        </p>
        <div class="flex flex-wrap gap-2 pb-4">
          <UBadge
            v-for="item in reactExpansion.items"
            :key="item.label"
            variant="soft"
            >{{ item.label }}</UBadge
          >
        </div>
      </details>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
const portfolio = usePortfolio();
const { t } = useI18n();
const reactExpansion = computed(() => portfolio.value.reactExpansion);
</script>
