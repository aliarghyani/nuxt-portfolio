<template>
  <div class="animate-pulse" :class="containerClass">
    <slot>
      <!-- Default skeleton content -->
      <div v-for="n in rows" :key="n" class="skeleton-row" :class="rowClass">
        <div class="skeleton-item" :style="{ width: getWidth(n), height }"></div>
      </div>
    </slot>
  </div>
</template>

<script setup lang="ts">
interface Props {
  rows?: number
  height?: string
  containerClass?: string
  rowClass?: string
  variant?: 'default' | 'card' | 'list'
}

const props = withDefaults(defineProps<Props>(), {
  rows: 3,
  height: '1rem',
  containerClass: '',
  rowClass: 'mb-3',
  variant: 'default'
})

const getWidth = (index: number): string => {
  // Vary widths for more natural skeleton appearance
  const widths = ['100%', '95%', '90%', '85%', '100%']
  return widths[(index - 1) % widths.length] || '100%'
}
</script>

<style scoped>
.skeleton-item {
  position: relative;
  overflow: hidden;
  background-color: rgb(var(--color-gray-200));
  border-radius: 0.375rem;
  /* GPU acceleration */
  transform: translateZ(0);
  backface-visibility: hidden;
}

:global(.dark) .skeleton-item {
  background-color: rgb(var(--color-gray-800));
}

/* Shimmer effect using ::after pseudo-element with transform (GPU-friendly) */
.skeleton-item::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg,
      transparent 0%,
      rgba(255, 255, 255, 0.3) 50%,
      transparent 100%);
  animation: shimmer-slide 2s ease-in-out infinite;
  will-change: transform;
  /* GPU acceleration */
  transform: translateZ(0) translateX(-100%);
  backface-visibility: hidden;
}

:global(.dark) .skeleton-item::after {
  background: linear-gradient(90deg,
      transparent 0%,
      rgba(255, 255, 255, 0.1) 50%,
      transparent 100%);
}

@keyframes shimmer-slide {
  0% {
    transform: translateZ(0) translateX(-100%);
  }

  100% {
    transform: translateZ(0) translateX(200%);
  }
}

.skeleton-row {
  display: flex;
  gap: 0.5rem;
}
</style>
