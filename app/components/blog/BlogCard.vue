<template>
  <NuxtLink :to="localePath(getRoutePath((post as any).path))" class="block h-full">
    <UCard class="h-full overflow-hidden hover:shadow-lg transition-shadow duration-300"
      :ui="{ body: { base: 'p-0' } as any }">
      <div
        class="relative rounded-lg aspect-video w-full overflow-hidden bg-gradient-to-br from-primary-500 to-primary-700 dark:from-primary-600 dark:to-primary-900">
        <img
          v-if="imageLoaded"
          ref="coverImage"
          :src="post.image"
          :alt="post.title"
          class="h-full w-full object-cover"
          :loading="prioritizeImage ? 'eager' : 'lazy'"
          :fetchpriority="prioritizeImage ? 'high' : undefined"
          @error="handleImageError"
        />
        <div v-else class="flex h-full w-full items-center justify-center">
          <div class="text-center text-white/90 p-6">
            <UIcon name="i-heroicons-document-text" class="mx-auto h-12 w-12 mb-2 opacity-80" />
            <p class="text-sm font-medium line-clamp-2">{{ post.title }}</p>
          </div>
        </div>
      </div>

      <div class="p-6">

        <h2 class="mb-2 text-xl font-semibold text-gray-900 dark:text-gray-100">
          {{ post.title }}
        </h2>

        <p class="mb-4 line-clamp-2 text-gray-600 dark:text-gray-400">
          {{ post.description }}
        </p>

        <div class="mb-4 flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-500">
          <time :datetime="post.date">{{ formatDate(post.date) }}</time>
          <span>•</span>
          <span>{{ t('blog.readingTime', { minutes: calculateReadingTime(post) }) }}</span>
        </div>

        <div v-if="post.tags && post.tags.length > 0" class="flex flex-wrap gap-2">
          <UBadge v-for="tag in post.tags" :key="tag" variant="subtle" size="sm">
            {{ tag }}
          </UBadge>
        </div>
      </div>
    </UCard>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { BlogPost } from '~/types/blog'

const props = defineProps<{
  post: BlogPost
  prioritizeImage?: boolean
}>()

const { t, locale } = useI18n()
const localePath = useLocalePath()
const { formatDate, calculateReadingTime } = useBlog()

// Image loading state
const coverImage = ref<HTMLImageElement | null>(null)
const imageLoaded = ref(!!props.post.image)
const handleImageError = () => {
  imageLoaded.value = false
}

if (props.prioritizeImage) {
  onMounted(() => {
    // The eager SSR image can fail before hydration attaches the error handler.
    const image = coverImage.value
    if (image?.complete && image.naturalWidth === 0) handleImageError()
  })
}

// Convert collection path to route path (remove locale prefix)
const getRoutePath = (path: string) => {
  // Remove any locale prefix from path: /en/blog/... or /fa/blog/... -> /blog/...
  return path.replace(/^\/(en|fa)/, '')
}
</script>
