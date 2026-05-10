<template>
  <section v-if="services.length" id="services" class="section-spacing scroll-mt-20">
    <UContainer>
      <div class="section-header">
        <UIcon name="i-mdi-briefcase-check-outline" class="text-2xl text-primary-500 dark:text-primary-300" />
        <div>
          <h2 class="section-title">{{ t('sections.services') }}</h2>
          <p class="mt-1 max-w-2xl text-sm text-gray-600 dark:text-gray-300">
            {{ t('services.subtitle') }}
          </p>
        </div>
      </div>

      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="service in services"
          :key="service.title"
          class="rounded-lg border border-gray-200/70 bg-white/75 p-4 shadow-sm dark:border-gray-700/50 dark:bg-gray-900/45"
        >
          <div class="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-500/10 text-primary-600 dark:bg-primary-400/10 dark:text-primary-300">
            <UIcon :name="service.icon || 'i-mdi-check-circle-outline'" class="text-xl" />
          </div>
          <h3 class="text-base font-semibold leading-snug text-gray-950 dark:text-gray-50">
            {{ service.title }}
          </h3>
          <p class="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
            {{ service.description }}
          </p>
        </article>
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { usePortfolio } from '@/composables/usePortfolio'

const portfolio = usePortfolio()
const { t } = useI18n()

const services = computed(() => portfolio.value.services ?? [])
</script>
