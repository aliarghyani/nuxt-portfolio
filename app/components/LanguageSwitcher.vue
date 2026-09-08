<template>
  <ClientOnly>
    <!-- Nuxt UI Select-based language picker -->
    <USelect v-model="model" :items="items" value-key="value" size="sm" color="primary" variant="soft"
      :highlight="false" arrow :trailing="true" placeholder="Language"
      class="cursor-pointer px-1 w-[64px] sm:w-[78px] rounded-full ring-1 ring-gray-200/70 dark:ring-gray-700/60 backdrop-blur-md shadow-sm h-[25px] hover:ring-primary-500/50 hover:shadow-md transition-all duration-200"
      :ui="{
        base: 'rounded-full cursor-pointer',
        trailingIcon: 'text-dimmed group-data-[state=open]:rotate-180 transition-transform duration-200',
        content: 'min-w-fit scale-fade-in'
      }" :aria-label="t('nav.languageSelector')">

      <!-- Leading icon in trigger -->
      <template #leading>
        <UIcon :name="selectedIcon" class="text-[16px]" />
      </template>
      <template #item-leading="{ item }">
        <UIcon :name="item.icon" class="text-[16px]" />
      </template>
      <template #item-label="{ item }">
        <!-- <span>{{ item.label }}</span> -->
      </template>
    </USelect>
  </ClientOnly>
</template>

<script setup lang="ts">
import { ref, computed, watch } from '#imports'
import { useLocaleSwitching, useLoadingIndicator } from '#imports'

const { locale, setLocale, t } = useI18n()
const router = useRouter()

type LangValue = 'en' | 'fa'
type Item = { label: string; value: LangValue; icon: string }

const items = ref<Item[]>([
  { label: 'en', value: 'en', icon: 'i-twemoji-flag-united-states' },
  { label: 'fa', value: 'fa', icon: 'i-twemoji-flag-iran' }
])

const model = ref<LangValue>(locale.value as LangValue)

// Keep model in sync if locale changes elsewhere
watch(locale, (val) => {
  if ((val as LangValue) !== model.value) {
    model.value = val as LangValue
  }
})

const selectedIcon = computed<string>(() => items.value.find(i => i.value === model.value)?.icon ?? 'i-twemoji-flag-united-states')

const { startLocaleSwitching } = useLocaleSwitching()
const loading = useLoadingIndicator()

// On selection change, navigate first then update locale
watch(model, async (val, oldVal) => {
  if (val === oldVal) return

  // Preserve scroll position
  const scrollY = window.scrollY

  startLocaleSwitching(600)
  if (loading) {
    loading.start()
  }

  // Get the current route path without locale prefix
  const currentPath = router.currentRoute.value.path
  const pathWithoutLocale = currentPath.replace(/^\/(en|fa)/, '')
  const normalizedPath = pathWithoutLocale.length > 1
    ? pathWithoutLocale.replace(/\/+$/, '')
    : pathWithoutLocale

  // Check if we're on a blog post page
  const isBlogPost = normalizedPath.startsWith('/blog/') && normalizedPath !== '/blog'

  let newPath: string

  if (isBlogPost) {
    const slug = normalizedPath.slice('/blog/'.length)
    const translatedPost = await queryCollection('blog')
      .where('path', '=', `/${val}/blog/${slug}`)
      .first()

    // Keep the reader on the same article when a published translation exists.
    // Otherwise, use the target locale's blog listing instead of showing a 404.
    newPath =
      translatedPost && translatedPost.draft !== true
        ? `${val === 'en' ? '' : `/${val}`}${normalizedPath}`
        : val === 'en'
          ? '/blog'
          : `/${val}/blog`
  } else {
    // For other pages, try to navigate to the equivalent page
    const newLocalePrefix = val === 'en' ? '' : `/${val}`
    newPath = `${newLocalePrefix}${pathWithoutLocale || '/'}`
  }

  // Navigate to new path FIRST (before setLocale to avoid RTL/LTR flash)
  if (newPath !== currentPath) {
    await router.push(newPath)
  }

  // Update locale AFTER navigation
  await setLocale(val)

  // Restore scroll position after navigation (blog translations start at the top)
  await nextTick()
  if (!isBlogPost) {
    window.scrollTo(0, scrollY)
  } else {
    window.scrollTo(0, 0)
  }

  if (loading) {
    setTimeout(() => loading.finish(), 600)
  }
})
</script>
