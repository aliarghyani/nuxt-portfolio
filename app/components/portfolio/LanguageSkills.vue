<template>
  <section class="py-6">
    <UContainer>
      <div class="flex items-center gap-3 mb-4">
        <UIcon name="i-twemoji-globe-showing-europe-africa" class="text-2xl" />
        <h2 class="text-lg font-semibold">{{ t('sections.language') }}</h2>
      </div>

      <UCard>
        <div class="space-y-6">
          <div class="flex flex-wrap items-center justify-between gap-4">
            <p class="text-sm text-gray-600 dark:text-gray-300 max-w-3xl">
              {{ t('languageSection.tagline') }}
            </p>
            <UBadge
              size="lg"
              color="primary"
              variant="soft"
              class="inline-flex items-center gap-2"
            >
              <UIcon
                name="simple-icons:duolingo"
                class="text-xl text-[#58CC02] dark:text-[#58CC02]"
              />
              <span>
                {{ t('languageSection.duolingo.label') }}: {{ t('languageSection.duolingo.value') }}
              </span>
            </UBadge>
          </div>

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
                <h3 class="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  {{ item.title }}
                </h3>
              </div>
              <p class="text-sm text-gray-600 dark:text-gray-300">
                {{ item.description }}
              </p>
            </div>
          </div>
        </div>
      </UCard>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const { t } = useI18n()

const items = computed(() => [
  {
    key: 'ielts',
    iconType: 'image' as const,
    icon: '/img/icons8-ielts-48.png',
    title: t('languageSection.items.ielts.title'),
    description: t('languageSection.items.ielts.desc'),
  },
  {
    key: 'huawei',
    iconType: 'icon' as const,
    icon: 'i-twemoji-globe-with-meridians',
    title: t('languageSection.items.huawei.title'),
    description: t('languageSection.items.huawei.desc'),
  },
])
</script>
