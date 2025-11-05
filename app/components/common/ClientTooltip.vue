<template>
  <ClientOnly>
    <UTooltip :delay-duration="0" v-bind="tooltipProps">
      <slot />

      <template
        v-for="slotName in namedSlots"
        :key="slotName"
        v-slot:[slotName]
      >
        <slot :name="slotName" />
      </template>
    </UTooltip>

    <template #fallback>
      <slot />
    </template>
  </ClientOnly>
</template>

<script setup lang="ts">
import { computed, useAttrs, useSlots } from 'vue'
import type { TooltipProps } from '@nuxt/ui/components/Tooltip.vue'

const props = defineProps<TooltipProps>()
const attrs = useAttrs()
const slots = useSlots()

const tooltipProps = computed(() => ({
  ...attrs,
  ...props,
}) as TooltipProps & Record<string, unknown>)

const namedSlots = computed(() =>
  Object.keys(slots).filter((name) => name !== 'default'),
)
</script>
