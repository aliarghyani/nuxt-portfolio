<template>
  <section class="py-6">
    <UContainer>
      <div class="flex items-center gap-3 mb-3">
        <UIcon name="i-twemoji-graduation-cap" class="text-2xl" />
        <h2 class="text-lg font-semibold text-start">{{ t('sections.education') }}</h2>
      </div>
      <div class="space-y-4">
        <UCard v-for="(edu, i) in portfolio.education" :key="i"
          class="border border-gray-200/60 shadow-none dark:border-gray-700/40">
          <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div class="flex items-start gap-3 space-y-1">
              <div class="w-12 h-12 rounded-lg object-contain shrink-0 flex items-center justify-center">
                <ClientOnly>
                  <NuxtImg v-if="edu.logo" :src="edu.logo" :alt="edu.school" class="max-w-full max-h-full" />
                </ClientOnly>
              </div>
              <div>
                <h3 class="text-base font-semibold">{{ edu.school }}</h3>
                <p class="text-sm text-gray-600 dark:text-gray-300">{{ edu.degree }}</p>
                <p class="text-xs text-gray-500">{{ edu.start }} - {{ edu.end }}</p>
              </div>
            </div>
            <div class="flex shrink-0 flex-wrap items-center gap-1 text-primary-500 dark:text-primary-300">
              <UIcon v-for="(ic, k) in edu.icons" :key="k" :name="ic" class="text-xl" />
            </div>
          </div>
        </UCard>
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
import { usePortfolio } from '@/composables/usePortfolio'
const portfolio = usePortfolio()
const { t } = useI18n()
</script>
