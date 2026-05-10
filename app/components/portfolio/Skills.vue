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

      <UAccordion type="multiple" :unmount-on-hide="false" :items="skillSections" :default-value="openSkillSections"
        :ui="accordionUi">
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
    </UContainer>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
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

const accordionUi = {
  root: 'flex flex-col gap-3 md:grid md:grid-cols-2 xl:grid-cols-3 md:gap-4 md:items-stretch',
  item: 'flex flex-col rounded-lg border border-gray-200/70 dark:border-gray-700/50 bg-white/70 dark:bg-gray-900/40 shadow-sm md:self-stretch data-[state=open]:md:h-full data-[state=open]:md:min-h-[240px]',
  header: 'px-4 border-b border-gray-200/70 dark:border-gray-700/50',
  trigger: 'group flex-1 items-center gap-2 py-3 text-left cursor-pointer',
  label: 'text-sm font-semibold text-slate-700 dark:text-slate-200',
  leadingIcon: 'shrink-0',
  trailingIcon: 'ms-auto text-gray-500 dark:text-gray-400 transition-transform duration-200 group-data-[state=open]:rotate-180',
  content: 'px-4 pb-4 pt-1 data-[state=closed]:hidden',
  body: 'pt-1'
} as const
</script>
