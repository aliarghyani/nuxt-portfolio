<template>
  <div
    class="ms-auto w-full md:w-auto flex flex-row-reverse items-center gap-1 overflow-x-auto no-scrollbar whitespace-nowrap px-1 py-1"
    role="toolbar" aria-label="Skill filters">
    <UButton :icon="filterButtonIcon" size="xs" :variant="filterButtonVariant" :color="filterButtonColor"
      class="filter-toggle rounded-full shrink-0 mx-1"
      :class="{ 'is-open': filtersOpen, 'has-selection': hasSelection }" :aria-label="filterButtonLabel"
      :aria-expanded="hasSelection ? undefined : filtersOpen" aria-controls="skill-filter-group"
      @click="handlePrimaryAction" />
    <Transition name="filter-panel">
      <div v-if="filtersOpen" id="skill-filter-group" class="flex items-center gap-1">
        <TransitionGroup name="filter-chip" tag="div" class="flex flex-row-reverse items-center gap-1">
          <div v-for="(type, index) in resolvedOptions" :key="type" class="filter-chip"
            :style="transitionVars(index, totalVisible)">
            <UTooltip :text="meta(type).label" :arrow="true" :delay-duration="0.5"
              :content="{ side: 'bottom', sideOffset: 8, collisionPadding: 12 }">
              <UButton :icon="meta(type).icon" size="xs" :variant="isSelected(type) ? 'solid' : 'soft'" color="primary"
                class="rounded-full shrink-0" :aria-pressed="isSelected(type)"
                :aria-label="`Filter by ${meta(type).label}`" :title="meta(type).label" @click="toggle(type)" />
            </UTooltip>
          </div>
        </TransitionGroup>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { SkillType } from '@/types/portfolio.types'
import { SKILL_TYPES } from '@/types/portfolio.types'

// Map each SkillType to an icon and label for tooltips
const TYPE_META: Record<SkillType, { icon: string; label: string }> = {
  Language: { icon: 'i-mdi-code-tags', label: 'Language' },
  Framework: { icon: 'i-mdi-layers', label: 'Framework' },
  Library: { icon: 'i-mdi-book-outline', label: 'Library' },
  Tool: { icon: 'i-mdi-wrench', label: 'Tool' },
  Service: { icon: 'i-mdi-cloud-outline', label: 'Service' },
  DevOps: { icon: 'i-mdi-cogs', label: 'DevOps' },
  Testing: { icon: 'i-mdi-flask-outline', label: 'Testing' },
  Data: { icon: 'i-mdi-database-outline', label: 'Data' }
}

const meta = (type: SkillType) => TYPE_META[type]

const props = defineProps<{
  modelValue: SkillType[]
  options?: readonly SkillType[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: SkillType[]): void
}>()

const resolvedOptions = computed(() => props.options ?? SKILL_TYPES)
const hasSelection = computed(() => (props.modelValue?.length ?? 0) > 0)
const filtersOpen = ref(true)
const totalVisible = computed(() => resolvedOptions.value.length)

const isSelected = (type: SkillType) => props.modelValue?.includes(type)

const toggle = (type: SkillType) => {
  const current = props.modelValue ?? []
  if (current.includes(type)) {
    emit('update:modelValue', current.filter(t => t !== type))
  } else {
    emit('update:modelValue', [...current, type])
  }
}

const clear = () => {
  emit('update:modelValue', [])
  filtersOpen.value = false
}

const handlePrimaryAction = () => {
  if (hasSelection.value) {
    clear()
    return
  }
  filtersOpen.value = !filtersOpen.value
}

watch(
  hasSelection,
  value => {
    if (value) {
      filtersOpen.value = true
    }
  }
)

const filterButtonIcon = computed(() =>
  hasSelection.value ? 'i-mdi-filter-remove' : 'i-mdi-filter-variant'
)
const filterButtonLabel = computed(() =>
  hasSelection.value
    ? 'Clear skill filters'
    : filtersOpen.value
      ? 'Hide skill filters'
      : 'Show skill filters'
)
const filterButtonVariant = computed(() =>
  hasSelection.value ? 'solid' : filtersOpen.value ? 'soft' : 'ghost'
)
const filterButtonColor = computed(() =>
  hasSelection.value ? 'error' : 'neutral'
)


const transitionVars = (index: number, total: number) =>
  ({
    '--filter-index': `${index}`,
    '--filter-order': `${Math.max(total - index, 0)}`
  }) as Record<string, string>
</script>

<style scoped>
/* On small screens show a single horizontal row with scroll.
   On md+ the header already has enough space and this container is auto-sized. */
.filter-toggle {
  transition: transform 200ms ease, box-shadow 220ms ease, filter 220ms ease;
}

.filter-toggle.has-selection {
  box-shadow: 0 12px 28px -12px rgba(220, 38, 38, 0.45);
}

.filter-toggle.is-open:not(.has-selection) :deep([class*='i-mdi']) {
  transform: rotate(180deg);
  transition: transform 220ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

.filter-panel-enter-active,
.filter-panel-leave-active {
  transition: opacity 200ms ease, transform 240ms cubic-bezier(0.34, 1.56, 0.64, 1);
  transform-origin: right center;
}

.filter-panel-enter-from,
.filter-panel-leave-to {
  opacity: 0;
  transform: translateX(0.75rem) scale(0.92);
}

.filter-chip-enter-active,
.filter-chip-leave-active {
  transition: opacity 200ms ease, transform 260ms cubic-bezier(0.34, 1.56, 0.64, 1);
  transform-origin: right center;
}

.filter-chip-enter-active {
  transition-delay: calc(var(--filter-index, 0) * 45ms);
}

.filter-chip-leave-active {
  transition-delay: calc(var(--filter-order, 0) * 35ms);
}

.filter-chip-enter-from,
.filter-chip-leave-to {
  opacity: 0;
  transform: translateX(0.5rem) scale(0.85);
}

.filter-chip-move {
  transition: transform 200ms ease;
}
</style>
