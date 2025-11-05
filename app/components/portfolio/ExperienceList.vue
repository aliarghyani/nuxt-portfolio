<template>
  <section class="py-6">
    <UContainer>
      <div class="flex items-center gap-3 mb-3">
        <UIcon name="i-twemoji-briefcase" class="text-2xl" />
        <h2 class="text-lg font-semibold text-start">{{ t('sections.work') }}</h2>
      </div>

      <div class="space-y-6">
        <!-- Company cards -->
        <UCard v-for="(company, i) in companies" :key="i"
          class="border border-gray-200/60 shadow-none dark:border-gray-700/40">
          <!-- Header: company name + meta -->
          <div class="flex items-start gap-4">
            <div v-if="company.logo"
              class="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-200/70 dark:bg-slate-900 dark:ring-gray-700/60">
              <img :src="company.logo" :alt="`${company.company} logo`" class="h-10 w-10 object-contain" loading="lazy" />
            </div>
            <div class="min-w-0 flex-1">
              <div class="flex flex-wrap items-center gap-2 text-gray-800 dark:text-gray-100">
                <a v-if="company.link" :href="company.link" target="_blank" :aria-label="company.company"
                  class="text-base font-semibold link-hover-clean">
                  {{ company.company }}
                </a>
                <h3 v-else class="text-base font-semibold">{{ company.company }}</h3>
                <span v-if="company.type" class="text-xs text-gray-400">•</span>
                <p v-if="company.type" class="text-xs text-gray-500">{{ company.type }}</p>
              </div>
              <p v-if="company.location" class="mt-1 text-xs text-gray-500">{{ company.location }}</p>
            </div>
          </div>

          <!-- Timeline -->
          <div class="relative mt-4">
            <div :class="[
              'absolute top-2 bottom-2 w-px bg-gray-200 dark:bg-gray-700',

            ]" />

            <div v-for="(pos, j) in company.positions" :key="j" class="relative flex items-start gap-4">
              <div :class="['shrink-0', isRTL ? 'translate-x-[50%]' : 'translate-x-[-50%]']">
                <div class="mt-2 h-2 w-2 rounded-full bg-primary-500 ring-4 ring-primary-100 dark:ring-primary-950">
                </div>
              </div>
              <div :class="['min-w-0 flex-1', j !== company.positions.length - 1 ? 'pb-6' : '']">
                <div class="flex flex-wrap items-center gap-2">
                  <p class="text-sm font-medium text-gray-900 dark:text-gray-100">{{ pos.title }}</p>
                </div>
                <p class="mt-0.5 text-xs text-gray-500">
                  {{ pos.start }}
                  <template v-if="pos.ongoing"> - {{ presentText }}</template>
                  <template v-else-if="pos.end"> - {{ pos.end }}</template>
                </p>
                <ul :class="[
                  'mt-2 list-disc space-y-1 text-sm text-gray-700 dark:text-gray-200',
                  isRTL ? 'pr-5 text-right marker:text-primary-300' : 'pl-5 text-left marker:text-primary-500'
                ]">
                  <li v-for="(line, k) in pos.description" :key="k">{{ line }}</li>
                </ul>
                <div v-if="pos.icons?.length"
                  class="mt-2 flex flex-wrap items-center gap-1 text-primary-500 dark:text-primary-300">
                  <UIcon v-for="(ic, k) in pos.icons" :key="k" :name="ic" class="text-xl" />
                </div>
              </div>
            </div>
          </div>
        </UCard>
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
import { usePortfolio } from '@/composables/usePortfolio'
import type { CompanyExperience, Experience } from '@/types/portfolio.types'

const { t, locale } = useI18n()
const portfolio = usePortfolio()
const isRTL = computed(() => locale.value === 'fa')
const presentText = computed(() => t('common.present'))

// Normalize experiences into company groups so we can render a timeline per company
type Normalized = Required<Pick<CompanyExperience, 'company' | 'positions'>> &
  Pick<CompanyExperience, 'link' | 'logo' | 'location' | 'type'>

const companies = computed<Normalized[]>(() => {
  const list = portfolio.value.experiences as Array<CompanyExperience | Experience>
  return list.map((exp: any) => {
    if (Array.isArray(exp.positions)) {
      return exp as Normalized
    }
    const single = exp as Experience
    return {
      company: single.company,
      location: single.location,
      type: single.type,
      logo: single.logo,
      positions: [
        {
          title: single.role,
          start: single.start,
          end: single.end,
          ongoing: single.ongoing,
          description: single.description,
          icons: single.icons,
          location: single.location,
          type: single.type,
          link: single.link,
        },
      ],
    }
  })
})
</script>

