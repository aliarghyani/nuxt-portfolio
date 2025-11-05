<template>
  <UCard>
    <template #header>
      <div class="flex items-center gap-2">
        <UIcon v-if="iconName" :name="iconName" class="text-lg" />
        <h3 class="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">{{ title ||
          group.title }}</h3>
      </div>
    </template>
    <div class="flex flex-wrap gap-2">
      <template v-for="(item, idx) in group.items" :key="idx">
        <ClientTooltip v-if="item.description" :text="item.description">
          <UBadge variant="soft" class="chip-base cursor-default"
            :class="colorful ? chipClass(idx) : neutralChipTone">
            <span class="inline-flex items-center gap-1.5">
              <UIcon v-if="item.icon" :name="item.icon" class="text-base sm:text-lg" />
              {{ item.label }}
            </span>
          </UBadge>
        </ClientTooltip>
        <UBadge v-else variant="soft" class="chip-base cursor-default"
          :class="colorful ? chipClass(idx) : neutralChipTone">
          <span class="inline-flex items-center gap-1.5">
            <UIcon v-if="item.icon" :name="item.icon" class="text-base sm:text-lg" />
            {{ item.label }}
          </span>
        </UBadge>
      </template>
    </div>
  </UCard>
</template>

<script setup lang="ts">
import type { TagGroup } from '@/types/portfolio.types'
import { chipTones, neutralChipTone } from '@/utils/chipTones'
const props = defineProps<{ group: TagGroup; title?: string; colorful?: boolean; icon?: string }>()

const iconName = computed(() => {
  if (props.icon) return props.icon
  const title = (props.title || props.group.title).toLowerCase()
  if (title.includes('main') && title.includes('tool')) return 'i-twemoji-toolbox'
  if (title.includes('role')) return 'i-twemoji-briefcase'
  if (title.includes('value')) return 'i-twemoji-sparkles'
  return ''
})

const chipClass = (idx: number) => chipTones[idx % chipTones.length]
</script>
