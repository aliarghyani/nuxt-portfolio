<template>
  <div class="max-w-6xl mx-auto pt-24">
    <!-- Above-the-fold content only (improves LCP by reducing initial render work) -->
    <Hero />

    <!-- Below-the-fold sections rendered on server for SEO (SSR) -->
    <!-- <TagGroups /> -->
    <Skills />
    <AIStack />
    <SoftSkills />
    <LanguageSkills />
    <WorkExperience />
    <EducationList />
    <RecommendationsCarousel />
    <ProjectsList />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineAsyncComponent } from 'vue'
import Hero from '@/components/portfolio/Hero.vue'
const TagGroups = defineAsyncComponent(() => import('@/components/portfolio/TagGroups.vue'))
const Skills = defineAsyncComponent(() => import('@/components/portfolio/Skills.vue'))
const AIStack = defineAsyncComponent(() => import('@/components/portfolio/AIStack.vue'))
const SoftSkills = defineAsyncComponent(() => import('@/components/portfolio/SoftSkills.vue'))
const LanguageSkills = defineAsyncComponent(() => import('@/components/portfolio/LanguageSkills.vue'))
const WorkExperience = defineAsyncComponent(() => import('@/components/portfolio/WorkExperience.vue'))
const EducationList = defineAsyncComponent(() => import('@/components/portfolio/EducationList.vue'))
const RecommendationsCarousel = defineAsyncComponent(() => import('@/components/portfolio/RecommendationsCarousel.vue'))
const ProjectsList = defineAsyncComponent(() => import('@/components/portfolio/ProjectsList.vue'))
import { usePortfolio } from '@/composables/usePortfolio'

const appConfig = useAppConfig()
const portfolio = usePortfolio()
const { t, locale } = useI18n()


const siteTitle = computed(() => `${portfolio.value.profile.name} — ${t('meta.portfolioTitleSuffix')}`)
const description = computed(() => `${portfolio.value.profile.title}. ${portfolio.value.profile.summary}`)

useHead(() => ({
  title: siteTitle.value,
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon/newlogo.png' },
  ],
}))

useSeoMeta({
  title: () => siteTitle.value,
  description: () => description.value,
  ogTitle: () => siteTitle.value,
  ogDescription: () => description.value,
  ogType: 'website',
  ogLocale: () => (locale.value === 'fa' ? 'fa_IR' : 'en_US'),
})
</script>
