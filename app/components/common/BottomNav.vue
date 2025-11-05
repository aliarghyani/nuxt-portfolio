<template>
  <div v-if="!hideNav" class="fixed inset-x-0 bottom-0 z-60 md:hidden pointer-events-none">
    <div class="pointer-events-auto mx-auto max-w-6xl px-4 pb-2" style="padding-bottom: env(safe-area-inset-bottom);">
      <div
        class="rounded-2xl bg-white/80 dark:bg-slate-900/70 backdrop-blur-md shadow-lg border border-white/30 dark:border-slate-700/50">
        <nav role="navigation" aria-label="Primary bottom navigation"
          class="flex items-center justify-between gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-2 overflow-x-auto no-scrollbar flex-nowrap snap-x snap-mandatory">

          <UButton :class="[homeActive ? activePillClass : inactivePillClass]" color="emerald" variant="soft" size="md"
            icon="i-twemoji-house"
            class="h-10 sm:h-11 px-3 sm:px-4 rounded-full focus-visible:ring-2 focus-visible:ring-emerald-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900 snap-center"
            aria-label="Home" :aria-current="homeActive ? 'page' : undefined" @click="goHome">
            <span class="hidden sm:inline text-sm">{{ t('nav.home') }}</span>
          </UButton>

          <UButton :class="[inactivePillClass]" color="emerald" variant="soft" size="md"
            icon="i-twemoji-hammer-and-wrench"
            class="h-10 sm:h-11 px-3 sm:px-4 rounded-full focus-visible:ring-2 focus-visible:ring-emerald-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900 snap-center"
            aria-label="Skills" aria-controls="skills" @click="goSkills">
            <span class="hidden sm:inline text-sm">{{ t('nav.skills') }}</span>
          </UButton>

          <UButton :class="[blogActive ? activePillClass : inactivePillClass]" color="emerald" variant="soft" size="md"
            icon="i-twemoji-newspaper"
            class="h-10 sm:h-11 px-3 sm:px-4 rounded-full focus-visible:ring-2 focus-visible:ring-emerald-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900 snap-center"
            aria-label="Blog" :aria-current="blogActive ? 'page' : undefined" @click="goBlog">
            <span class="hidden sm:inline text-sm">{{ t('nav.blog') }}</span>
          </UButton>

          <UButton :class="[inactivePillClass]" color="emerald" variant="soft" size="md" icon="i-twemoji-e-mail"
            class="h-10 sm:h-11 px-3 sm:px-4 rounded-full focus-visible:ring-2 focus-visible:ring-emerald-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900 snap-center"
            aria-label="Contact" @click="goContact">
            <span class="hidden sm:inline text-sm">{{ t('nav.contact') }}</span>
          </UButton>


        </nav>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSectionObserver } from '@/composables/useSectionObserver'

const { t, locale } = useI18n()
const appConfig = useAppConfig()
const route = useRoute()
const router = useRouter()
const localePath = useLocalePath()

const blogIndexPath = computed(() => localePath('/blog'))
const homePath = computed(() => localePath('/'))
const isHome = computed(() => route.path === homePath.value)

const { scrollToSection } = useSectionObserver({
  enabled: isHome,
  headerSelector: 'nav[data-section-header]'
})

// Hide on blog detail pages, show elsewhere
const hideNav = computed(() => {
  const p = route.path
  // If route path contains '/blog/' segment, it's a detail page.
  // This works regardless of locale prefix.
  return p.includes('/blog/') && p !== blogIndexPath.value
})

// Active states
const homeActive = computed(() => route.path === homePath.value)
const blogActive = computed(() => route.path.startsWith(blogIndexPath.value) && !hideNav.value)

// Navigation actions
const goHome = () => {
  if (!homeActive.value) {
    router.push(homePath.value)
  }
}

const goBlog = () => {
  if (!blogActive.value) {
    router.push(blogIndexPath.value)
  }
}

const goContact = () => {
  // External contact URL in new tab
  if (import.meta.client) {
    window.open(appConfig.myContactUrl, '_blank', 'noopener')
  }
}

const goSkills = async () => {
  const targetId = 'skills'
  const scrollToSkills = () => {
    scrollToSection(targetId)
  }

  if (route.path === homePath.value) {
    // Already on home: smooth scroll
    if (import.meta.client) scrollToSkills()
  } else {
    await router.push(homePath.value)
    // Ensure DOM updated before scroll
    if (import.meta.client) requestAnimationFrame(scrollToSkills)
  }
}

// Styles
const activePillClass = 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 ring-1 ring-emerald-400/40'
const inactivePillClass = 'text-slate-700 dark:text-slate-200 hover:bg-emerald-500/10'
</script>
