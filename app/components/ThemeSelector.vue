<template>
  <ClientOnly>
    <UTooltip v-if="!colorMode.unknown" :text="tooltip">
      <UButton :class="btnClass" class="cursor-pointer" square variant="soft" color="primary" :icon="icon"
        :title="label" :aria-label="label" :size="btnSize" @click="toggle($event)" />
    </UTooltip>
    <UButton v-else :class="btnClass" class="cursor-pointer" square variant="soft" color="primary" :icon="icon"
      :title="label" :aria-label="label" :size="btnSize" @click="toggle($event)" />
  </ClientOnly>
</template>

<script setup lang="ts">
import { useViewTransitionRipple } from '#imports'
const props = defineProps<{ mobileVisible?: boolean; size?: 'sm' | 'md' | 'lg' }>()

const colorMode = useColorMode()

const modeOrder = ['system', 'light', 'dark'] as const
type Mode = (typeof modeOrder)[number]

const currentPref = computed<Mode>(() => {
  const pref = colorMode.preference as string | undefined
  return (pref === 'light' || pref === 'dark' || pref === 'system') ? (pref as Mode) : 'system'
})

const nextMap: Record<Mode, Mode> = {
  system: 'light',
  light: 'dark',
  dark: 'system'
}

const nextPref = computed<Mode>(() => nextMap[currentPref.value])

const { runRipple } = useViewTransitionRipple()

const toggle = (ev?: MouseEvent) => {
  runRipple(ev ?? null, () => {
    colorMode.preference = nextPref.value
  }, { duration: 500, easing: 'ease-in-out' })
}

const icon = computed(() => {
  switch (currentPref.value) {
    // Use colorful Twemoji icons for better visual appeal on mobile
    case 'dark': return 'i-twemoji-crescent-moon'
    case 'light': return 'i-twemoji-sun'
    default: return 'i-twemoji-desktop-computer'
  }
})

const label = computed(() => `Switch to ${nextPref.value}`)
const tooltip = computed(() => `Theme: ${currentPref.value} — Click to switch to ${nextPref.value}`)

// Visibility and sizing — ThemeSelector itself always renders; page decides mobile/desktop visibility
const btnClass = computed(() => 'inline-flex')
const btnSize = computed(() => props.size ?? 'md')
</script>
