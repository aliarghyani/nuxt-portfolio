<template>
  <section id="ai-stack" class="py-6 scroll-mt-20">
    <UContainer>
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
        <div class="flex items-center gap-3">
          <UIcon name="twemoji:robot" class="text-2xl" />
          <h2 class="text-lg font-semibold">{{ t('skills.aiStack') }}</h2>
        </div>

        <div
          class="ms-auto w-full md:w-auto flex flex-row-reverse items-center gap-1 overflow-x-auto no-scrollbar whitespace-nowrap px-1 py-1"
          role="toolbar" aria-label="AI Stack group filters">
          <UButton :icon="filterButtonIcon" size="xs" :variant="filterButtonVariant" :color="filterButtonColor"
            class="filter-toggle rounded-full shrink-0 mx-1"
            :class="{ 'is-open': filtersOpen, 'has-selection': hasSelection }" :aria-label="filterButtonLabel"
            :aria-expanded="hasSelection ? undefined : filtersOpen" aria-controls="ai-group-filter-group"
            @click="handlePrimaryAction" />
          <Transition name="filter-panel">
            <div v-if="filtersOpen" id="ai-group-filter-group" class="flex items-center gap-1">
              <TransitionGroup name="filter-chip" tag="div" class="flex flex-row-reverse items-center gap-1">
                <div v-for="(opt, index) in groupOptions" :key="opt.value" class="filter-chip"
                  :style="transitionVars(index, groupOptions.length)">
                  <UTooltip :text="opt.label" :arrow="true" :delay-duration="0.5"
                    :content="{ side: 'bottom', sideOffset: 8, collisionPadding: 12 }">
                    <UButton :icon="opt.icon" size="xs" :variant="isSelected(opt.value) ? 'solid' : 'soft'"
                      color="primary" class="rounded-full shrink-0" :aria-pressed="isSelected(opt.value)"
                      :aria-label="`Filter by ${opt.label}`" :title="opt.label" @click="toggleGroup(opt.value)" />
                  </UTooltip>
                </div>
              </TransitionGroup>
            </div>
          </Transition>
        </div>
      </div>

      <div class="grid gap-4 md:grid-cols-3">
        <UCard class="md:col-span-3">
          <template #header>
            <div class="flex items-center justify-between">
              <h3 class="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {{ headerTitle }}
              </h3>
            </div>
          </template>

          <div class="flex flex-wrap gap-1.5">
            <div v-for="item in filtered" :key="item.id" class="inline-flex items-stretch">
              <UTooltip :arrow="true" :delay-duration="0.5" :text="item.shortWhy || item.name"
                :content="{ side: 'top', sideOffset: 8, collisionPadding: 12 }">
                <UBadge variant="soft" class="chip-base">
                  <span class="inline-flex items-center gap-1.5">
                    <UIcon v-if="item.icon" :name="item.icon" class="h-4 w-4 min-h-4 min-w-4 text-base" />
                    <span class="text-xs font-medium cursor-default">{{ item.name }}</span>
                    <!-- <UBadge size="xs" color="neutral" variant="subtle" class="ml-1">{{ groupLabel(item.group) }}
                    </UBadge> -->
                  </span>
                </UBadge>
              </UTooltip>
            </div>
          </div>
        </UCard>
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { AI_GROUPS, aiStackItems, type AiGroup } from '@/data/aiStack'
const { t } = useI18n()

type GroupMeta = { labelKey: string; icon: string }
const GROUP_META: Record<AiGroup, GroupMeta> = {
  ide_dev: { labelKey: 'ai_stack.group.ide_dev', icon: 'i-mdi-laptop' },
  protocols: { labelKey: 'ai_stack.group.protocols', icon: 'i-mdi-server-network' },
  concepts: { labelKey: 'ai_stack.group.concepts', icon: 'i-mdi-lightbulb-outline' },
  approaches: { labelKey: 'ai_stack.group.approaches', icon: 'i-mdi-compass-outline' }
}

const groupOptions = computed(() => AI_GROUPS.map(g => ({
  value: g,
  label: t(GROUP_META[g].labelKey),
  icon: GROUP_META[g].icon
})))

const selectedGroups = ref<AiGroup[]>([])
const filtersOpen = ref(true)

const isSelected = (g: AiGroup) => selectedGroups.value.includes(g)
const toggleGroup = (g: AiGroup) => {
  const cur = selectedGroups.value
  selectedGroups.value = isSelected(g) ? cur.filter(x => x !== g) : [...cur, g]
}
const clear = () => {
  selectedGroups.value = []
  filtersOpen.value = false
}

const hasSelection = computed(() => selectedGroups.value.length > 0)

const filterButtonIcon = computed(() => hasSelection.value ? 'i-mdi-filter-remove' : 'i-mdi-filter-variant')
const filterButtonLabel = computed(() =>
  hasSelection.value
    ? 'Clear AI stack filters'
    : filtersOpen.value
      ? 'Hide AI stack filters'
      : 'Show AI stack filters'
)
const filterButtonVariant = computed(() => hasSelection.value ? 'solid' : filtersOpen.value ? 'soft' : 'ghost')
const filterButtonColor = computed(() => hasSelection.value ? 'error' : 'neutral')

const handlePrimaryAction = () => {
  if (hasSelection.value) {
    clear()
    return
  }
  filtersOpen.value = !filtersOpen.value
}

const transitionVars = (index: number, total: number) =>
  ({
    '--filter-index': `${index}`,
    '--filter-order': `${Math.max(total - index, 0)}`
  }) as Record<string, string>

const filtered = computed(() => {
  if (selectedGroups.value.length === 0) return aiStackItems
  return aiStackItems.filter(i => selectedGroups.value.includes(i.group))
})

const groupLabel = (g: AiGroup) => t(GROUP_META[g].labelKey)

const headerTitle = computed(() => {
  if (selectedGroups.value.length === 1) return groupLabel(selectedGroups.value[0]!)
  return t('ai_stack.subtitle', 'Methods, tools, rules, and MCPs that power my AI workflow')
})

</script>

<style scoped>
/* Adopt SkillFilters transition styles for smooth group filter UX */
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
