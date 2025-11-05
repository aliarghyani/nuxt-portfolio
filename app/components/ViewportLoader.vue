<template>
  <div ref="elementRef">
    <component :is="skeleton" v-if="!hasEntered && skeleton" />
    <slot v-if="isVisible || hasEntered" />
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
