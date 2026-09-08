<template>
  <section id="github-activity" class="section-spacing scroll-mt-20">
    <UContainer>
      <!-- Section Header (consistent with other sections) -->
      <div class="section-header">
        <UIcon name="i-twemoji-chart-increasing" class="text-2xl" />
        <h2 class="section-title">{{ t("sections.githubActivity") }}</h2>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex items-center justify-center py-20">
        <UIcon
          name="i-mdi-loading"
          class="animate-spin text-4xl text-primary-500"
        />
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-20">
        <UIcon name="i-mdi-alert-circle" class="text-5xl text-red-500 mb-3" />
        <p class="text-gray-600 dark:text-gray-400">
          {{ t("portfolio.githubActivity.error") }}
        </p>
      </div>

      <!-- GitHub Calendar Accordion -->
      <PortfolioAccordion
        id="githubactivity-accordion"
        v-else-if="calendar"
        type="single"
        :items="accordionItems"
        default-value="github"
        :ui="accordionUi"
      >
        <template #body>
          <div class="flex flex-col gap-4">
            <!-- Scrollable Graph Container (only the graph scrolls) -->
            <div class="overflow-x-auto pb-4 lg:overflow-visible">
              <div class="min-w-[940px] max-w-full w-fit mx-auto">
                <!-- Month Labels Row -->
                <div class="flex mb-2">
                  <div class="w-8 flex-shrink-0"></div>
                  <div class="flex flex-1">
                    <div
                      v-for="(month, index) in monthLabels"
                      :key="index"
                      class="text-xs text-gray-500 dark:text-gray-400"
                      :style="{ flex: `0 0 ${month.width}%` }"
                    >
                      {{ month.name }}
                    </div>
                  </div>
                </div>

                <!-- Grid Container -->
                <div class="flex gap-1">
                  <!-- Day Labels -->
                  <div class="flex flex-col gap-[3px] w-8 flex-shrink-0">
                    <span
                      class="h-[11px] text-[11px] text-gray-500 dark:text-gray-400 text-right pr-1"
                    ></span>
                    <span
                      class="h-[11px] text-[11px] text-gray-500 dark:text-gray-400 text-right pr-1"
                      >Mon</span
                    >
                    <span
                      class="h-[11px] text-[11px] text-gray-500 dark:text-gray-400 text-right pr-1"
                    ></span>
                    <span
                      class="h-[11px] text-[11px] text-gray-500 dark:text-gray-400 text-right pr-1"
                      >Wed</span
                    >
                    <span
                      class="h-[11px] text-[11px] text-gray-500 dark:text-gray-400 text-right pr-1"
                    ></span>
                    <span
                      class="h-[11px] text-[11px] text-gray-500 dark:text-gray-400 text-right pr-1"
                      >Fri</span
                    >
                    <span
                      class="h-[11px] text-[11px] text-gray-500 dark:text-gray-400 text-right pr-1"
                    ></span>
                  </div>

                  <!-- Weeks Grid -->
                  <div class="flex flex-1 justify-between gap-[3px]">
                    <div
                      v-for="(week, weekIndex) in calendar.weeks"
                      :key="weekIndex"
                      class="flex flex-col gap-[3px]"
                    >
                      <div
                        v-for="(day, dayIndex) in week.contributionDays"
                        :key="dayIndex"
                        class="w-[11px] h-[11px] rounded-[2px] cursor-pointer transition-transform hover:scale-110"
                        :class="getContributionClass(day.contributionCount)"
                        @mouseenter="hoveredDay = day"
                        @mouseleave="hoveredDay = null"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Footer: Legend + Hover Info (always visible) -->
            <div class="flex flex-wrap items-center justify-between gap-3">
              <div
                class="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400"
              >
                <span>Less</span>
                <div class="flex gap-[3px] mx-1">
                  <div
                    v-for="(cls, idx) in legendClasses"
                    :key="idx"
                    class="w-[11px] h-[11px] rounded-[2px]"
                    :class="cls"
                  />
                </div>
                <span>More</span>
              </div>

              <div
                class="text-xs text-gray-600 dark:text-gray-300 min-h-[32px] flex flex-col justify-center text-right"
              >
                <template v-if="hoveredDay">
                  <span class="font-semibold text-gray-900 dark:text-white">
                    {{ hoveredDay.contributionCount }} contribution{{
                      hoveredDay.contributionCount !== 1 ? "s" : ""
                    }}
                  </span>
                  <span class="text-gray-500 dark:text-gray-400">
                    {{ formatDateFull(hoveredDay.date) }}
                  </span>
                </template>
              </div>
            </div>
          </div>
        </template>
      </PortfolioAccordion>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from "vue";
import type {
  GitHubContributionCalendar,
  GitHubContributionDay,
} from "@/types/github";

const { t } = useI18n();
const { fetchContributions } = useGitHubContributions();

// Props
interface Props {
  username: string;
}

const props = withDefaults(defineProps<Props>(), {
  username: "aliarghyani",
});

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

// State
const calendar = ref<GitHubContributionCalendar | null>(null);
const loading = ref(true);
const error = ref(false);
const hoveredDay = ref<GitHubContributionDay | null>(null);

// Accordion config
const accordionItems = computed(() => [
  {
    label: t("portfolio.githubActivity.subtitle"),
    value: "github",
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

// Get contribution level class - uses CSS utility classes from main.css
// that reference Nuxt UI's dynamic --ui-color-primary-* variables
const getContributionClass = (count: number): string => {
  if (count === 0) return "contrib-level-0";
  if (count <= 3) return "contrib-level-1";
  if (count <= 6) return "contrib-level-2";
  if (count <= 9) return "contrib-level-3";
  return "contrib-level-4";
};

// Legend classes array for v-for
const legendClasses = [
  "contrib-level-0",
  "contrib-level-1",
  "contrib-level-2",
  "contrib-level-3",
  "contrib-level-4",
];

// Format date for hover display (full format like "Monday, October 6, 2025")
const formatDateFull = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

// Generate month labels
const monthLabels = computed(() => {
  if (!calendar.value?.weeks) return [];

  const totalWeeks = calendar.value.weeks.length;
  const labels: Array<{ name: string; width: number }> = [];
  let currentMonth = -1;
  let startWeek = 0;

  calendar.value.weeks.forEach((week, index) => {
    const firstDay = week.contributionDays[0];
    if (!firstDay) return;

    const date = new Date(firstDay.date);
    const month = date.getMonth();

    if (month !== currentMonth) {
      if (currentMonth !== -1) {
        const monthName = new Date(2024, currentMonth).toLocaleDateString(
          "en-US",
          { month: "short" },
        );
        const weeksInMonth = index - startWeek;
        labels.push({
          name: monthName,
          width: (weeksInMonth / totalWeeks) * 100,
        });
      }
      currentMonth = month;
      startWeek = index;
    }
  });

  // Add last month
  if (currentMonth !== -1) {
    const monthName = new Date(2024, currentMonth).toLocaleDateString("en-US", {
      month: "short",
    });
    const weeksInMonth = calendar.value.weeks.length - startWeek;
    labels.push({
      name: monthName,
      width: (weeksInMonth / totalWeeks) * 100,
    });
  }

  return labels;
});

// Fetch data on mount
onMounted(async () => {
  try {
    const data = await fetchContributions(props.username);
    if (data) {
      calendar.value = data;
    } else {
      error.value = true;
    }
  } catch (e) {
    error.value = true;
  } finally {
    loading.value = false;
  }
});
</script>
