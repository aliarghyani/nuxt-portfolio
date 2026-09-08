<template>
  <section class="section-spacing">
    <UContainer>
      <div class="section-header flex-nowrap items-center gap-3 justify-start">
        <UIcon name="i-twemoji-brain" class="text-2xl" />
        <h2 class="section-title">{{ t("sections.softSkills") }}</h2>
      </div>

      <PortfolioAccordion
        id="softskills-accordion"
        type="single"
        :items="accordionItems"
        default-value="soft-skills"
        :ui="accordionUi"
      >
        <template #body>
          <div class="flex flex-wrap gap-1.5">
            <template v-for="(s, i) in resolved" :key="s.key">
              <UTooltip
                :arrow="true"
                :delay-duration="0.5"
                :text="s.description"
              >
                <UBadge
                  variant="soft"
                  class="chip-base select-none"
                  :class="chipClass(i)"
                >
                  <span class="inline-flex items-center gap-1.5">
                    <UIcon :name="s.icon" class="text-sm" />
                    <span class="text-xs">{{ s.label }}</span>
                  </span>
                </UBadge>
              </UTooltip>
            </template>
          </div>
        </template>
      </PortfolioAccordion>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { chipTones } from "@/utils/chipTones";

type SoftKey =
  | "problemSolving"
  | "attentionToDetail"
  | "teamwork"
  | "teamLeadership"
  | "communication"
  | "teamPerformance"
  | "customerFocus"
  | "projectManagement"
  | "adaptability";

const { t } = useI18n();

// Detect mobile for accordion behavior (SSR-safe)
const isMobile = ref(true);

onMounted(() => {
  const checkMobile = () => {
    isMobile.value = window.innerWidth < 768;
  };
  checkMobile();
  window.addEventListener("resize", checkMobile);
  onUnmounted(() => {
    window.removeEventListener("resize", checkMobile);
  });
});

const base: { key: SoftKey; icon: string }[] = [
  { key: "problemSolving", icon: "i-twemoji-light-bulb" },
  { key: "attentionToDetail", icon: "i-twemoji-magnifying-glass-tilted-left" },
  { key: "teamwork", icon: "i-twemoji-people-holding-hands" },
  { key: "teamLeadership", icon: "i-twemoji-crown" },
  { key: "communication", icon: "i-twemoji-speech-balloon" },
  { key: "teamPerformance", icon: "i-twemoji-chart-increasing" },
  { key: "customerFocus", icon: "i-twemoji-handshake" },
  { key: "projectManagement", icon: "i-twemoji-spiral-calendar" },
  { key: "adaptability", icon: "i-twemoji-counterclockwise-arrows-button" },
];

const resolved = computed(() =>
  base.map((s) => ({
    ...s,
    label: t(`softSkills.${s.key}.label`),
    description: t(`softSkills.${s.key}.desc`),
  })),
);

const chipClass = (i: number) => chipTones[i % chipTones.length];

const accordionItems = computed(() => [
  {
    label: t("softSkillsAccordion.label"),
    value: "soft-skills",
  },
]);

const accordionUi = {
  root: "flex flex-col",
  item: "flex flex-col rounded-2xl border border-gray-200/70 dark:border-gray-700/50 bg-white/70 dark:bg-gray-900/40 shadow-sm",
  header:
    "px-4 data-[state=open]:border-b border-gray-200/70 dark:border-gray-700/50",
  trigger: "group flex-1 items-center gap-2 py-3 text-left cursor-pointer",
  label:
    "text-sm font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300",
  leadingIcon: "shrink-0",
  trailingIcon:
    "ms-auto text-gray-500 dark:text-gray-400 transition-transform duration-200 group-data-[state=open]:rotate-180",
  content: "px-4 pb-4 pt-3 data-[state=closed]:hidden",
  body: "pt-1",
} as const;
</script>
