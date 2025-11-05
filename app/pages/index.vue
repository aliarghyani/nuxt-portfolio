<template>
  <div class="max-w-6xl mx-auto pt-24">
    <!-- Above-the-fold content only (improves LCP by reducing initial render work) -->
    <Hero />

    <!-- Below-the-fold sections with lazy loading (Requirements 6.1, 6.2, 1.4) -->
    <ViewportLoader :threshold="0.1" :root-margin="'50px'" :skeleton="SkillsSkeleton">
      <Skills />
    </ViewportLoader>

    <ViewportLoader :threshold="0.1" :root-margin="'50px'" :skeleton="AIStackSkeleton">
      <AIStack />
    </ViewportLoader>

    <ViewportLoader :threshold="0.1" :root-margin="'50px'" :skeleton="SoftSkillsSkeleton">
      <SoftSkills />
    </ViewportLoader>

    <ViewportLoader :threshold="0.1" :root-margin="'50px'" :skeleton="LanguageSkillsSkeleton">
      <LanguageSkills />
    </ViewportLoader>

    <ViewportLoader :threshold="0.1" :root-margin="'50px'" :skeleton="WorkExperienceSkeleton">
      <WorkExperience />
    </ViewportLoader>

    <ViewportLoader :threshold="0.1" :root-margin="'50px'" :skeleton="EducationListSkeleton">
      <EducationList />
    </ViewportLoader>

    <ViewportLoader :threshold="0.1" :root-margin="'50px'" :skeleton="RecommendationsCarouselSkeleton">
      <RecommendationsCarousel />
    </ViewportLoader>

    <ViewportLoader :threshold="0.1" :root-margin="'50px'" :skeleton="ProjectsListSkeleton">
      <ProjectsList />
    </ViewportLoader>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import Hero from '@/components/portfolio/Hero.vue'
import ViewportLoader from '~/components/ViewportLoader.vue'

// Lazy load below-the-fold components (Requirement 6.2)
const Skills = defineAsyncComponent(() => import('@/components/portfolio/Skills.vue'))
const AIStack = defineAsyncComponent(() => import('@/components/portfolio/AIStack.vue'))
const SoftSkills = defineAsyncComponent(() => import('@/components/portfolio/SoftSkills.vue'))
const LanguageSkills = defineAsyncComponent(() => import('@/components/portfolio/LanguageSkills.vue'))
const WorkExperience = defineAsyncComponent(() => import('@/components/portfolio/WorkExperience.vue'))
const EducationList = defineAsyncComponent(() => import('@/components/portfolio/EducationList.vue'))
const RecommendationsCarousel = defineAsyncComponent(() => import('@/components/portfolio/RecommendationsCarousel.vue'))
const ProjectsList = defineAsyncComponent(() => import('@/components/portfolio/ProjectsList.vue'))

// Skeleton loaders (Requirement 5.3)
const SkillsSkeleton = defineAsyncComponent(() => import('@/components/portfolio/SkillsSkeleton.vue'))
const AIStackSkeleton = defineAsyncComponent(() => import('@/components/portfolio/AIStackSkeleton.vue'))
const SoftSkillsSkeleton = defineAsyncComponent(() => import('@/components/portfolio/SoftSkillsSkeleton.vue'))
const LanguageSkillsSkeleton = defineAsyncComponent(() => import('@/components/portfolio/LanguageSkillsSkeleton.vue'))
const WorkExperienceSkeleton = defineAsyncComponent(() => import('@/components/portfolio/WorkExperienceSkeleton.vue'))
const EducationListSkeleton = defineAsyncComponent(() => import('@/components/portfolio/EducationListSkeleton.vue'))
const RecommendationsCarouselSkeleton = defineAsyncComponent(() => import('@/components/portfolio/RecommendationsCarouselSkeleton.vue'))
const ProjectsListSkeleton = defineAsyncComponent(() => import('@/components/portfolio/ProjectsListSkeleton.vue'))

import { usePortfolio } from '@/composables/usePortfolio'
import { usePerformanceTest } from '@/composables/usePerformanceTest'

const portfolio = usePortfolio()
const { t, locale } = useI18n()

// Performance testing (Requirement 6.2 - verify lazy loading)
if (import.meta.client) {
  onMounted(() => {
    const perfTest = usePerformanceTest()
    if (perfTest) {
      perfTest.testIntersectionObserver()
      perfTest.measureDOMSize()
      perfTest.measureVisibleComponents()
      perfTest.logPerformanceMetrics()

      // Measure again after scroll to verify lazy loading
      setTimeout(() => {
        window.scrollTo(0, document.body.scrollHeight)
        setTimeout(() => {
          console.log('📈 After scroll:')
          perfTest.measureDOMSize()
          perfTest.measureVisibleComponents()
        }, 1000)
      }, 2000)
    }
  })
}

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
