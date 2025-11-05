<template>
  <footer class="py-10">
    <UContainer>
      <div class="flex flex-col items-center gap-4 text-center text-sm text-gray-600 dark:text-gray-400">
        <NuxtImg :src="logoSrc" alt="Ali Arghyani logo" width="64" height="64" class="h-12 w-12" format="png"
          loading="lazy" />
        <p>&copy; {{ currentYear }}, <span class="font-semibold text-gray-900 dark:text-gray-100">AliArghyani</span> -
          All rights reserved.</p>
        <a href="https://github.com/aliarghyani" target="_blank" rel="noopener noreferrer"
          class="inline-flex items-center gap-2 text-sm font-medium text-primary-600 transition hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300">
          <UIcon name="i-mdi-github" class="text-base" />
          <span>GitHub</span>
          <UIcon name="i-mdi-open-in-new" class="text-sm opacity-80" />
        </a>
      </div>
    </UContainer>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const colorMode = useColorMode()

const currentYear = computed(() => new Date().getFullYear())
const logoSrc = computed(() => {
  if (colorMode.unknown) {
    return '/favicon/android-chrome-192x192.png'
  }
  return colorMode.value === 'dark'
    ? '/favicon/android-chrome-192x192-dark.png'
    : '/favicon/android-chrome-192x192.png'
})
</script>
