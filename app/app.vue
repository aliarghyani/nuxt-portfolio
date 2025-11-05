<template>
  <UApp :toaster="{ expand: false }">
    <NuxtLoadingIndicator color="#6366F1" :height="3" :throttle="100" />
    <TopNav />
    <NuxtPage />
    <FooterCopyright />
    <!-- <FloatingActions /> -->
  </UApp>
</template>

<script setup lang="ts">
import FloatingActions from '@/components/portfolio/FloatingActions.vue'
import TopNav from '@/components/common/TopNav.vue'
import FooterCopyright from '@/components/common/FooterCopyright.vue'
import { usePortfolio } from '@/composables/usePortfolio'
import { useLocaleSwitching } from '@/composables/useLocaleSwitching'

const { locale, locales } = useI18n()
const portfolio = usePortfolio()
const { isLocaleSwitching } = useLocaleSwitching()

const activeLocale = computed(() => locales.value.find((item) => item.code === locale.value) ?? locales.value[0])
const langAttr = computed(() => (activeLocale.value as any)?.language ?? locale.value)
const dirAttr = computed(() => activeLocale.value?.dir ?? 'ltr')
const heroAvatar = computed(() => portfolio.value.profile.avatar ?? null)
const heroAssetType = computed(() => {
  if (!heroAvatar.value) return null
  if (heroAvatar.value.endsWith('.webp')) return 'image/webp'
  if (heroAvatar.value.endsWith('.png')) return 'image/png'
  if (heroAvatar.value.endsWith('.jpg') || heroAvatar.value.endsWith('.jpeg')) return 'image/jpeg'
  return 'image/*'
})

const roobertRegular = '/fonts/Roobert-Regular.woff2'
const roobertMedium = '/fonts/Roobert-Medium.woff2'
const roobertSemiBold = '/fonts/Roobert-SemiBold.woff2'
const vazirVar = '/fonts/vazirmatn/webfonts/Vazirmatn[wght].woff2'

const fontPreloads = computed(() => {
  const links = [
    { rel: 'preload', as: 'font', type: 'font/woff2', href: roobertRegular, crossorigin: 'anonymous' },
    { rel: 'preload', as: 'font', type: 'font/woff2', href: roobertMedium, crossorigin: 'anonymous' },
    { rel: 'preload', as: 'font', type: 'font/woff2', href: roobertSemiBold, crossorigin: 'anonymous' }
  ]
  if (locale.value === 'fa') {
    links.push({ rel: 'preload', as: 'font', type: 'font/woff2', href: vazirVar, crossorigin: 'anonymous' })
  }
  return links
})

const headLinks = computed(() => {
  const links = [...fontPreloads.value]

  if (heroAvatar.value) {
    links.push({
      rel: 'preload',
      as: 'image',
      href: heroAvatar.value,
      type: heroAssetType.value ?? 'image/*',
      crossorigin: 'anonymous'
    })
  }

  return links
})

useHead(() => ({
  htmlAttrs: {
    lang: langAttr.value,
    dir: dirAttr.value
  },
  link: headLinks.value as any
}))

if (import.meta.client) {
  watchEffect(() => {
    document.documentElement.lang = langAttr.value
    document.documentElement.dir = dirAttr.value
  })
}
</script>
