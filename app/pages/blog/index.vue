<template>
  <section class="py-10">
    <UContainer>
      <div class="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p class="text-sm uppercase tracking-wide text-primary-500 dark:text-primary-300">{{ t('blog.explore') }}</p>
          <h1 class="text-3xl font-semibold">{{ t('sections.blog') }}</h1>
        </div>
      </div>

      <div class="rounded-xl border border-dashed border-gray-300 p-8 text-center text-gray-500 dark:border-gray-700 dark:text-gray-300">
        Nuxt Content is temporarily disabled. Blog will be back soon.
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
const { locale, t } = useI18n()

// Blog listing requires @nuxt/content which is disabled for now
</script>
