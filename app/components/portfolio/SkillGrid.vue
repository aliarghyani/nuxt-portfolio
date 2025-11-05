<template>
  <div class="flex flex-wrap gap-1.5">
    <component
      v-for="item in items"
      :key="item.label"
      :is="item.to ? 'a' : 'span'"
      :href="item.to || undefined"
      target="_blank"
      rel="noopener noreferrer"
      class="inline-block"
      :aria-label="item.to ? `Open ${item.label}` : undefined"
    >
      <UBadge
        variant="soft"
        :class="[
          'chip-base',
          item.to ? 'cursor-pointer transition-colors hover:bg-primary-500/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 dark:hover:bg-primary-400/10' : ''
        ]"
      >
        <span class="inline-flex items-center gap-1.5">
          <UIcon v-if="item.icon" :name="item.icon" class="h-4 w-4 min-h-4 min-w-4 text-base" />
          <span class="text-xs">{{ item.label }}</span>
        </span>
      </UBadge>
    </component>
  </div>

</template>

<script setup lang="ts">
import type { Tag } from '@/types/portfolio.types'
defineProps<{ items: Tag[] }>()
</script>
