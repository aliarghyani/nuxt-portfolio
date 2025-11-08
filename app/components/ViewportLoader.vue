<template>
  <div ref="elementRef" class="viewport-loader" suppressHydrationWarning>
    <!-- Render skeleton during SSR and before intersection on client -->
    <component :is="skeleton" v-if="!hasEntered && skeleton" />

    <!-- Render content after intersection -->
    <slot v-if="hasEntered" />
  </div>
</template>

<script setup lang="ts">
import { useLazyLoad } from '@/composables/useLazyLoad'
import type { Component } from 'vue'

interface Props {
  threshold?: number
  rootMargin?: string
  skeleton?: Component
}

const props = withDefaults(defineProps<Props>(), {
  threshold: 0.1,
  rootMargin: '50px'
})

const { isVisible, elementRef, hasEntered } = useLazyLoad({
  threshold: props.threshold,
  rootMargin: props.rootMargin,
  once: true
})
</script>
