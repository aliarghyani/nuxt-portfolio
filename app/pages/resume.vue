<script setup lang="ts">
definePageMeta({
  layout: false,
  scrollToTop: true
})

const route = useRoute()
const colorMode = useColorMode()
const isPrintMode = computed(() => route.query.print === 'true')

useHead({
  title: 'Resume - Ali Arghyani',
  meta: [
    { name: 'robots', content: 'noindex' }
  ]
})

// Reset scroll position on mount
onMounted(() => {
  const savedMode = localStorage.getItem('nuxt-color-mode')
  if (savedMode === 'dark') {
    colorMode.preference = 'dark'
  }
  window.scrollTo(0, 0)
})
</script>

<template>
  <div class="bg-white dark:bg-gray-900 print:bg-white" :class="{ dark: colorMode.value === 'dark' }">
    <!-- Back to Home Button -->
    <NuxtLink v-if="!isPrintMode" to="/" class="fixed top-4 right-4 z-50 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium
        bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700
        text-gray-700 dark:text-gray-200 rounded-full shadow-lg
        transition-all duration-200 hover:scale-105 no-print">
      <UIcon name="i-heroicons-arrow-left" class="text-base" />
      <span>Back to Home</span>
    </NuxtLink>

    <ResumePreview />
    <ResumeDownloadButton :is-print-mode="isPrintMode" />
  </div>
</template>

<style scoped>
@media print {
  .no-print {
    display: none !important;
  }
}
</style>
