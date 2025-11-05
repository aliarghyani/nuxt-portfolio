<template>
  <ClientOnly>
    <nav class="fixed inset-x-0 top-0 z-50 pointer-events-auto" data-section-header>
      <div class="mx-auto max-w-6xl px-4 pt-2">
        <div
          class="backdrop-blur-md bg-white/80 dark:bg-slate-900/70 shadow-md rounded-2xl border border-white/30 dark:border-slate-700/50 pointer-events-auto">
          <div class="flex items-center justify-between px-2 py-2">
            <div class="flex items-center gap-3">
              <!-- Home -->
              <div class="flex items-center gap-1.5">
                <UTooltip :text="t('nav.home')">
                  <UButton class="cursor-pointer" :class="[isActive('hero') ? activeClass : inactiveClass]"
                    variant="soft" square icon="i-twemoji-house" :aria-label="t('nav.home')" @click="goTo('hero')" />
                </UTooltip>
                <button type="button" class="hidden lg:inline-flex text-sm font-medium transition-colors"
                  :class="[isActive('hero') ? labelActiveClass : labelInactiveClass]" @click="goTo('hero')">
                  {{ t('nav.home') }}
                </button>
              </div>

              <!-- Skills -->
              <div class="flex items-center gap-1.5">
                <UTooltip :text="t('sections.skills')">
                  <UButton class="cursor-pointer" :class="[isActive('skills') ? activeClass : inactiveClass]"
                    variant="soft" square icon="i-twemoji-hammer-and-wrench" :aria-label="t('sections.skills')"
                    @click="goTo('skills')" />
                </UTooltip>
                <button type="button" class="hidden lg:inline-flex text-sm font-medium transition-colors"
                  :class="[isActive('skills') ? labelActiveClass : labelInactiveClass]" @click="goTo('skills')">
                  {{ t('sections.skills') }}
                </button>
              </div>

              <!-- Work -->
              <div class="flex items-center gap-1.5">
                <UTooltip :text="t('sections.work')">
                  <UButton class="cursor-pointer" :class="[isActive('work') ? activeClass : inactiveClass]"
                    variant="soft" square icon="i-twemoji-briefcase" :aria-label="t('sections.work')"
                    @click="goTo('work')" />
                </UTooltip>
                <button type="button" class="hidden lg:inline-flex text-sm font-medium transition-colors"
                  :class="[isActive('work') ? labelActiveClass : labelInactiveClass]" @click="goTo('work')">
                  {{ t('sections.work') }}
                </button>
              </div>

              <!-- Projects -->
              <div class="flex items-center gap-1.5">
                <UTooltip :text="t('sections.projects')">
                  <UButton class="cursor-pointer" :class="[isActive('projects') ? activeClass : inactiveClass]"
                    variant="soft" square icon="i-twemoji-rocket" :aria-label="t('sections.projects')"
                    @click="goTo('projects')" />
                </UTooltip>
                <button type="button" class="hidden lg:inline-flex text-sm font-medium transition-colors"
                  :class="[isActive('projects') ? labelActiveClass : labelInactiveClass]" @click="goTo('projects')">
                  {{ t('sections.projects') }}
                </button>
              </div>
            </div>

            <div class="flex items-center gap-2">
              <LanguageSwitcher />
              <ThemeCustomizer />
            </div>
          </div>
        </div>
      </div>
    </nav>
  </ClientOnly>
</template>

<script setup lang="ts">
import ThemeCustomizer from '@/components/common/ThemeCustomizer.vue'
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'
import { useSectionObserver, type SectionId } from '@/composables/useSectionObserver'

const { t } = useI18n()
const router = useRouter()
const route = useRoute()
const localePath = useLocalePath()

const activeClass = 'ring-1 ring-primary-400/40 bg-primary-500/15 text-primary-600 dark:text-primary-400 transform scale-105'
const inactiveClass = 'text-gray-500 dark:text-gray-300 hover:text-primary-400'
const labelActiveClass = 'text-primary-700 dark:text-primary-400'
const labelInactiveClass = 'text-gray-600 dark:text-gray-300 hover:text-primary-400'

const sectionIds = ['hero', 'skills', 'work', 'projects'] as const
type Target = typeof sectionIds[number]

const isHome = computed(() => route.path === localePath('/'))

const { activeSection, scrollToSection } = useSectionObserver({
  ids: [...sectionIds] as SectionId[],
  headerSelector: 'nav[data-section-header]',
  offset: 80,
  enabled: isHome
})

const isActive = (id: Target) => activeSection.value === id

async function goTo(id: Target) {
  const homePath = localePath('/')
  if (route.path !== homePath) {
    await router.push(homePath)
    await nextTick()
    requestAnimationFrame(() => scrollToSection(id))
  } else {
    scrollToSection(id)
  }
}
</script>
