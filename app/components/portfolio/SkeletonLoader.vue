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
  background: linear-gradient(90deg,
      rgb(var(--color-gray-200)) 0%,
      rgb(var(--color-gray-100)) 50%,
      rgb(var(--color-gray-200)) 100%);
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
  border-radius: 0.375rem;
}

:global(.dark) .skeleton-item {
  background: linear-gradient(90deg,
      rgb(var(--color-gray-800)) 0%,
      rgb(var(--color-gray-700)) 50%,
      rgb(var(--color-gray-800)) 100%);
  background-size: 200% 100%;
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }

  100% {
    background-position: -200% 0;
  }
}

.skeleton-row {
  display: flex;
  gap: 0.5rem;
}
</style>
