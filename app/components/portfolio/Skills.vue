<template>
  <section id="skills" class="section-spacing scroll-mt-20">
    <UContainer>
      <div class="section-header flex-nowrap justify-between">
        <div class="flex items-center gap-3 min-w-0">
          <UIcon name="i-twemoji-hammer-and-wrench" class="text-2xl" />
          <div>
            <h2 class="section-title">{{ t('sections.skills') }}</h2>
            <p class="mt-1 max-w-2xl text-sm text-gray-600 dark:text-gray-300">
              {{ translate('skills.subtitle', 'Grouped by how the tools support CRM, SaaS, admin, and API-heavy frontend work.') }}
            </p>
          </div>
        </div>
      </div>

      <UAccordion
        type="single"
        collapsible
        :unmount-on-hide="true"
        :items="skillsAccordionItems"
        default-value="skills"
        :ui="outerAccordionUi"
      >
        <template #body>
          <UAccordion
            :model-value="openSkillValues"
            type="multiple"
            collapsible
            :unmount-on-hide="true"
            :items="skillSections"
            :ui="accordionUi"
            @update:model-value="syncOpenSkillRows"
          >
            <template #leading="{ item }">
              <UIcon v-if="item.icon" :name="item.icon" class="text-base text-primary-500 dark:text-primary-300" />
            </template>
            <template #body="{ item }">
              <p v-if="item.description" class="mb-3 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                {{ item.description }}
              </p>
              <SkillGrid :items="sectionItems[item.value as string] || []" />
            </template>
          </UAccordion>
        </template>
      </UAccordion>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import type { Tag } from '@/types/portfolio.types'
import { expert, proficient, usedBefore } from '@/data/skills'
import { usePortfolio } from '@/composables/usePortfolio'
import SkillGrid from '@/components/portfolio/SkillGrid.vue'

const { t, te } = useI18n()
const portfolio = usePortfolio()

function translate(key: string, fallback: string): string {
  return te(key) ? t(key) : fallback
}

type StackGroupView = {
  title: string
  value: string
  icon: string
  description?: string
  items: Tag[]
}

const fallbackGroups = computed<StackGroupView[]>(() => ([
  { title: t('skills.expert'), value: 'expert', icon: 'i-twemoji-military-medal', items: expert },
  { title: t('skills.proficient'), value: 'proficient', icon: 'i-twemoji-rocket', items: proficient },
  { title: t('skills.usedBefore'), value: 'usedBefore', icon: 'i-twemoji-toolbox', items: usedBefore }
]))

const groups = computed<StackGroupView[]>(() => {
  if (portfolio.value.stackGroups?.length) {
    return portfolio.value.stackGroups.map((group, index) => ({
      title: group.title,
      value: `stack-${index}`,
      icon: iconForStackGroup(group.title),
      description: group.description,
      items: group.items,
    }))
  }

  return fallbackGroups.value
})

const sectionItems = computed<Record<string, Tag[]>>(() =>
  Object.fromEntries(groups.value.map(group => [group.value, group.items]))
)

const skillSections = computed(() =>
  groups.value.map(group => ({
    label: group.title,
    value: group.value,
    icon: group.icon,
    description: group.description,
  }))
)

const openSkillSections = computed(() => skillSections.value.map(section => section.value))
const openSkillValues = ref<string[]>([])
const skillGridColumns = ref(1)

const skillsAccordionItems = computed(() => [{
  label: translate('skills.accordionLabel', 'Purpose-grouped frontend stack for CRM, SaaS, admin, and API-heavy products.'),
  value: 'skills'
}])

function iconForStackGroup(title: string): string {
  const lower = title.toLowerCase()
  if (lower.includes('core')) return 'i-mdi-monitor-dashboard'
  if (lower.includes('ui')) return 'i-mdi-palette-outline'
  if (lower.includes('api') || lower.includes('data')) return 'i-mdi-database-outline'
  if (lower.includes('dashboard')) return 'i-mdi-view-dashboard-outline'
  if (lower.includes('testing')) return 'i-mdi-source-branch-check'
  if (lower.includes('expanding')) return 'i-mdi-progress-wrench'
  return 'i-twemoji-hammer-and-wrench'
}

function updateSkillGridColumns() {
  if (!import.meta.client) return
  const width = window.innerWidth
  if (width >= 1280) {
    skillGridColumns.value = 3
  } else if (width >= 768) {
    skillGridColumns.value = 2
  } else {
    skillGridColumns.value = 1
  }
}

function syncOpenSkillRows(value: string | string[] | undefined) {
  const nextValues = Array.isArray(value) ? value : value ? [value] : []

  if (skillGridColumns.value <= 1) {
    openSkillValues.value = nextValues
    return
  }

  const openedValues = nextValues.filter(value => !openSkillValues.value.includes(value))
  const collapsedValues = openSkillValues.value.filter(value => !nextValues.includes(value))
  if (!openedValues.length && !collapsedValues.length) {
    openSkillValues.value = nextValues
    return
  }

  const normalizedValues = new Set(nextValues)
  for (const value of openedValues) {
    const index = skillSections.value.findIndex(section => section.value === value)
    if (index === -1) continue

    const rowStart = Math.floor(index / skillGridColumns.value) * skillGridColumns.value
    const rowEnd = rowStart + skillGridColumns.value
    skillSections.value.slice(rowStart, rowEnd).forEach(section => normalizedValues.add(section.value))
  }

  const valuesToClose = new Set<string>()
  for (const value of collapsedValues) {
    const index = skillSections.value.findIndex(section => section.value === value)
    if (index === -1) continue

    const rowStart = Math.floor(index / skillGridColumns.value) * skillGridColumns.value
    const rowEnd = rowStart + skillGridColumns.value
    skillSections.value.slice(rowStart, rowEnd).forEach(section => valuesToClose.add(section.value))
  }

  openSkillValues.value = skillSections.value
    .map(section => section.value)
    .filter(value => normalizedValues.has(value) && !valuesToClose.has(value))
}

watch(
  openSkillSections,
  (values) => {
    openSkillValues.value = [...values]
  },
  { immediate: true }
)

onMounted(() => {
  updateSkillGridColumns()
  window.addEventListener('resize', updateSkillGridColumns)
})

onUnmounted(() => {
  if (!import.meta.client) return
  window.removeEventListener('resize', updateSkillGridColumns)
})

const accordionUi = {
  root: 'flex flex-col gap-3 md:grid md:grid-cols-2 xl:grid-cols-3 md:gap-4 md:items-stretch',
  item: 'flex flex-col rounded-lg border border-gray-200/70 dark:border-gray-700/50 bg-white/70 dark:bg-gray-900/40 shadow-sm data-[state=open]:md:min-h-[240px]',
  header: 'px-4 data-[state=open]:border-b border-gray-200/70 dark:border-gray-700/50',
  trigger: 'group flex-1 items-center gap-2 py-3 text-left cursor-pointer',
  label: 'text-sm font-semibold text-slate-700 dark:text-slate-200',
  leadingIcon: 'shrink-0',
  trailingIcon: 'ms-auto text-gray-500 dark:text-gray-400 transition-transform duration-200 group-data-[state=open]:rotate-180',
  content: 'px-4 pb-4 pt-1 data-[state=closed]:hidden',
  body: 'pt-1'
} as const

const outerAccordionUi = {
  root: 'flex flex-col',
  item: 'flex flex-col rounded-2xl border border-gray-200/70 dark:border-gray-700/50 bg-white/70 dark:bg-gray-900/40 shadow-sm',
  header: 'sticky top-[60px] z-30 px-3 data-[state=open]:border-b border-gray-200/70 dark:border-gray-700/50 rounded-t-2xl bg-white/95 shadow-sm backdrop-blur-md dark:bg-gray-950/95 sm:top-[60px]',
  trigger: 'group flex-1 h-9 min-h-0 items-center gap-2 py-0 text-left cursor-pointer',
  label: 'text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 sm:text-sm',
  leadingIcon: 'shrink-0',
  trailingIcon: 'ms-auto text-gray-500 dark:text-gray-400 transition-transform duration-200 group-data-[state=open]:rotate-180',
  content: 'px-4 pb-4 pt-3 data-[state=closed]:hidden',
  body: 'pt-1'
} as const
</script>
