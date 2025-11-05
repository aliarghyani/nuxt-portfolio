<template>
  <section class="py-4">
    <UContainer>
      <div class="grid gap-4 md:grid-cols-3">
        <TagGroupCard :group="portfolio.mainTools" :title="t('sections.mainTools')" />
        <TagGroupCard :group="portfolio.roles" :title="t('sections.roles')"  />
        <TagGroupCard :group="portfolio.values" :title="t('sections.values')"  />
      </div>
    </UContainer>
  </section>
  
</template>

<script setup lang="ts">
import { usePortfolio } from '@/composables/usePortfolio'
import TagGroupCard from '@/components/portfolio/TagGroupCard.vue'
const portfolio = usePortfolio()
const { t } = useI18n()
</script>
