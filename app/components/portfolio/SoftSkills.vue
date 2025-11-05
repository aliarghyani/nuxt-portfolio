<template>
  <section class="py-6">
    <UContainer>
      <div class="flex items-center gap-3 mb-4">
        <UIcon name="i-twemoji-brain" class="text-2xl" />
        <h2 class="text-lg font-semibold">{{ t('sections.softSkills') }}</h2>
      </div>

      <UCard>
        <div class="flex flex-wrap gap-1.5">
          <template v-for="(s, i) in resolved" :key="s.key">
            <UTooltip :arrow="true" :delay-duration="0.5" :text="s.description">
              <UBadge variant="soft" class="chip-base select-none" :class="chipClass(i)">
                <span class="inline-flex items-center gap-1.5">
                  <UIcon :name="s.icon" class="text-sm" />
                  <span class="text-xs">{{ s.label }}</span>
                </span>
              </UBadge>
            </UTooltip>
          </template>
        </div>
      </UCard>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
type SoftKey =
  | 'problemSolving'
  | 'attentionToDetail'
  | 'teamwork'
  | 'teamLeadership'
  | 'communication'
  | 'teamPerformance'
  | 'customerFocus'
  | 'projectManagement'
  | 'adaptability'

import { chipTones } from '@/utils/chipTones'

const base: { key: SoftKey; icon: string }[] = [
  { key: 'problemSolving', icon: 'i-twemoji-light-bulb' },
  { key: 'attentionToDetail', icon: 'i-twemoji-magnifying-glass-tilted-left' },
  { key: 'teamwork', icon: 'i-twemoji-people-holding-hands' },
  { key: 'teamLeadership', icon: 'i-twemoji-crown' },
  { key: 'communication', icon: 'i-twemoji-speech-balloon' },
  { key: 'teamPerformance', icon: 'i-twemoji-chart-increasing' },
  { key: 'customerFocus', icon: 'i-twemoji-handshake' },
  { key: 'projectManagement', icon: 'i-twemoji-spiral-calendar' },
  { key: 'adaptability', icon: 'i-twemoji-counterclockwise-arrows-button' },
]

const { t } = useI18n()
const resolved = computed(() =>
  base.map(s => ({
    ...s,
    label: t(`softSkills.${s.key}.label`),
    description: t(`softSkills.${s.key}.desc`),
  }))
)

const chipClass = (i: number) => chipTones[i % chipTones.length]
</script>
