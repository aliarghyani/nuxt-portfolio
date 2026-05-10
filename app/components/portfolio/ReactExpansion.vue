<template>
  <section v-if="reactExpansion" id="react-next" class="section-spacing scroll-mt-20">
    <UContainer>
      <div class="rounded-lg border border-gray-200/70 bg-white/75 p-4 shadow-sm dark:border-gray-700/50 dark:bg-gray-900/45 sm:p-5">
        <div class="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div class="max-w-3xl">
            <div class="mb-2 flex items-center gap-2 text-sm font-semibold text-primary-600 dark:text-primary-300">
              <UIcon name="i-mdi-progress-wrench" class="text-lg" />
              <span>{{ t('sections.currentlyExpanding') }}</span>
            </div>
            <h2 class="text-lg font-semibold leading-tight text-gray-950 dark:text-gray-50">
              {{ reactExpansion.title }}
            </h2>
            <p class="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
              {{ reactExpansion.description }}
            </p>
          </div>

          <div class="flex shrink-0 flex-wrap gap-1.5 md:max-w-sm md:justify-end">
            <UBadge v-for="item in reactExpansion.items" :key="item.label" variant="soft" class="chip-base">
              <span class="inline-flex items-center gap-1.5">
                <UIcon v-if="item.icon" :name="item.icon" class="h-4 w-4 text-base" />
                <span class="text-xs">{{ item.label }}</span>
              </span>
            </UBadge>
          </div>
        </div>
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { usePortfolio } from '@/composables/usePortfolio'

const portfolio = usePortfolio()
const { t } = useI18n()

const reactExpansion = computed(() => portfolio.value.reactExpansion)
</script>
