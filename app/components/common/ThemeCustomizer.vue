<template>
  <ClientOnly>
    <UPopover v-model:open="isOpen" :teleport="true" :popper="{ strategy: 'fixed', placement: 'bottom-end', offset: 8 }"
      :ui="{ content: 'z-[120]' }">
      <template #default>
        <UButton variant="soft" color="primary" square :icon="triggerIcon" :aria-label="t('theme.customizer')"
          class="transition-colors duration-200 cursor-pointer" @click="openCustomizer" />
      </template>

      <template #content>
        <div class="p-3 w-80 md:w-96 lg:w-[18rem] space-y-3">
          <div class="text-sm font-medium">{{ t('theme.customizer') }}</div>

          <div>
            <div class="text-xs text-gray-500 dark:text-gray-400 mb-2">
              {{ t('nav.theme') }}
            </div>
            <div class="flex items-center gap-2">
              <UTooltip :text="t('theme.mode.system')">
                <UButton :color="isModeActive('system') ? 'primary' : 'neutral'" variant="soft" size="sm" square
                  :class="isModeActive('system') ? 'ring-1 ring-primary-400/40 bg-primary-500/10 dark:bg-primary-400/10' : ''"
                  icon="i-twemoji-desktop-computer" :aria-label="t('theme.mode.system')"
                  @click="setMode($event, 'system')" />
              </UTooltip>

              <UTooltip :text="t('theme.mode.light')">
                <UButton :color="isModeActive('light') ? 'primary' : 'neutral'" variant="soft" size="sm" square
                  :class="isModeActive('light') ? 'ring-1 ring-primary-400/40 bg-primary-500/10 dark:bg-primary-400/10' : ''"
                  icon="i-twemoji-sun" :aria-label="t('theme.mode.light')" @click="setMode($event, 'light')" />
              </UTooltip>

              <UTooltip :text="t('theme.mode.dark')">
                <UButton :color="isModeActive('dark') ? 'primary' : 'neutral'" variant="soft" size="sm" square
                  :class="isModeActive('dark') ? 'ring-1 ring-primary-400/40 bg-primary-500/10 dark:bg-primary-400/10' : ''"
                  icon="i-twemoji-crescent-moon" :aria-label="t('theme.mode.dark')" @click="setMode($event, 'dark')" />
              </UTooltip>
            </div>
          </div>

          <div>
            <div class="text-xs text-gray-500 dark:text-gray-400 mb-2">
              {{ t('theme.primary.label') }}
            </div>
            <div class="grid grid-cols-3 gap-2">
              <UButton v-for="p in primaryItems" :key="p.key" :color="isPrimaryActive(p.key) ? 'primary' : 'neutral'"
                variant="soft" size="sm"
                :class="['justify-start', isPrimaryActive(p.key) ? 'ring-1 ring-primary-400/40 bg-primary-500/10 dark:bg-primary-400/10' : '']"
                :aria-label="`Primary: ${p.label}`" @click="setPrimary($event, p.key)">
                <span class="inline-flex items-center gap-2">
                  <span class="size-3 rounded-full" :class="colorClassMap[p.key]" />
                  <span class="text-xs capitalize">{{ p.label }}</span>
                </span>
              </UButton>
            </div>
          </div>
        </div>
      </template>
    </UPopover>
  </ClientOnly>
</template>

<script setup lang="ts">
import { useI18n, useColorMode, useAppConfig, computed, onMounted, ref, nextTick, useViewTransitionRipple } from '#imports'
const { t } = useI18n()
const colorMode = useColorMode()
const appConfig = useAppConfig()
const isOpen = ref(false)
const openCustomizer = async () => {
  isOpen.value = true
  await nextTick()
}

const primaryItems: Array<{ key: PrimaryColor; label: string }> = [
  { key: 'red', label: 'Red' },
  { key: 'orange', label: 'Orange' },
  { key: 'amber', label: 'Amber' },
  { key: 'yellow', label: 'Yellow' },
  { key: 'lime', label: 'Lime' },
  { key: 'green', label: 'Green' },
  { key: 'emerald', label: 'Emerald' },
  { key: 'teal', label: 'Teal' },
  { key: 'cyan', label: 'Cyan' },
  { key: 'sky', label: 'Sky' },
  { key: 'blue', label: 'Blue' },
  { key: 'indigo', label: 'Indigo' },
  { key: 'violet', label: 'Violet' },
  { key: 'purple', label: 'Purple' },
  { key: 'fuchsia', label: 'Fuchsia' },
  { key: 'pink', label: 'Pink' },
  { key: 'rose', label: 'Rose' }
]

const triggerIcon = computed(() => 'i-twemoji-artist-palette')

type Mode = 'system' | 'light' | 'dark'
const isModeActive = (m: Mode) => (colorMode.preference as Mode) === m
const { runRipple } = useViewTransitionRipple()
const setMode = (ev: MouseEvent, m: Mode) => {
  runRipple(ev, () => {
    colorMode.preference = m
  }, { duration: 500, easing: 'ease-in-out' })
}

const primaryOptions = [
  'black',
  'red',
  'orange',
  'amber',
  'yellow',
  'lime',
  'green',
  'emerald',
  'teal',
  'cyan',
  'sky',
  'blue',
  'indigo',
  'violet',
  'purple',
  'fuchsia',
  'pink',
  'rose'
] as const
type PrimaryColor = typeof primaryOptions[number]

const STORAGE_KEY = 'ui:primary'

const colorClassMap: Record<PrimaryColor, string> = {
  black: 'bg-black',
  red: 'bg-red-500',
  orange: 'bg-orange-500',
  amber: 'bg-amber-500',
  yellow: 'bg-yellow-500',
  lime: 'bg-lime-500',
  green: 'bg-green-500',
  emerald: 'bg-emerald-500',
  teal: 'bg-teal-500',
  cyan: 'bg-cyan-500',
  sky: 'bg-sky-500',
  blue: 'bg-blue-500',
  indigo: 'bg-indigo-500',
  violet: 'bg-violet-500',
  purple: 'bg-purple-500',
  fuchsia: 'bg-fuchsia-500',
  pink: 'bg-pink-500',
  rose: 'bg-rose-500',
}

const setPrimary = (ev: MouseEvent | null, p: PrimaryColor) => {
  runRipple(ev, () => {
    // Update both shortcuts supported by Nuxt UI
    ; (appConfig.ui as any).primary = p
      ; (appConfig.ui as any).colors = {
        ...((appConfig.ui as any).colors || {}),
        primary: p,
      }
    if (import.meta.client) {
      localStorage.setItem(STORAGE_KEY, p)
    }
  }, { duration: 500, easing: 'ease-in-out' })
}

onMounted(() => {
  if (import.meta.client) {
    const saved = (localStorage.getItem(STORAGE_KEY) as PrimaryColor | null)
    if (saved && primaryOptions.includes(saved)) {
      setPrimary(null, saved)
    }
  }
})

const isPrimaryActive = (p: PrimaryColor) =>
  ((appConfig.ui as any)?.primary === p) || ((appConfig.ui as any)?.colors?.primary === p)

const activeClass = 'bg-primary-500/10 text-primary-600 dark:text-primary-400'
const inactiveClass = 'text-gray-500 dark:text-gray-300 hover:text-primary-400'
</script>
