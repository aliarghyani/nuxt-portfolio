<template>
  <section id="ai-stack" class="section-spacing scroll-mt-20">
    <UContainer>
      <div class="section-header flex-wrap justify-between gap-3">
        <div class="flex items-center gap-3 min-w-0">
          <UIcon name="twemoji:robot" class="text-2xl" />
          <h2 class="section-title">{{ t("skills.aiStack") }}</h2>
        </div>
      </div>
      <div
        class="mb-5 flex flex-wrap items-center gap-2"
        role="group"
        :aria-label="t('ai_stack.groupLabel')"
      >
        <span
          class="me-1 text-sm font-medium text-gray-600 dark:text-gray-300"
          >{{ t("ai_stack.filterLabel") }}</span
        >
        <UButton
          type="button"
          :variant="selectedGroup === null ? 'solid' : 'soft'"
          :color="selectedGroup === null ? 'primary' : 'neutral'"
          :aria-pressed="selectedGroup === null"
          class="ai-filter min-h-11 cursor-pointer rounded-full px-4"
          data-ai-filter="all"
          @click="selectGroup(null)"
        >
          {{ t("ai_stack.filter.all") }}
          <span class="opacity-75" aria-hidden="true">{{
            aiStackItems.length
          }}</span>
        </UButton>
        <UButton
          v-for="opt in groupOptions"
          :key="opt.value"
          type="button"
          :variant="selectedGroup === opt.value ? 'solid' : 'soft'"
          :color="selectedGroup === opt.value ? 'primary' : 'neutral'"
          :aria-pressed="selectedGroup === opt.value"
          class="ai-filter min-h-11 cursor-pointer rounded-full px-4"
          :data-ai-filter="opt.value"
          @click="selectGroup(opt.value)"
        >
          <bdi dir="ltr">{{ opt.label }}</bdi>
          <span class="opacity-75" aria-hidden="true">{{ opt.count }}</span>
        </UButton>
      </div>

      <PortfolioAccordion
        id="aistack-accordion"
        type="single"
        :items="accordionItems"
        default-value="ai-stack"
        :ui="accordionUi"
      >
        <template #body>
          <p
            class="mb-4 max-w-3xl text-sm leading-relaxed text-gray-600 dark:text-gray-300"
          >
            {{ t("ai_stack.intro") }}
          </p>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="item in filtered"
              :id="`ai-topic-${item.id}`"
              :key="item.id"
              type="button"
              class="chip-base ai-topic min-h-11 max-w-full cursor-pointer text-start focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
              :class="{ 'ai-topic-selected': activeId === item.id }"
              :aria-expanded="activeId === item.id"
              aria-controls="ai-topic-detail"
              @click="activeId = activeId === item.id ? null : item.id"
            >
              <UIcon
                :name="item.icon"
                class="size-4 shrink-0"
                aria-hidden="true"
              />
              <bdi dir="ltr" class="min-w-0">{{ item.name }}</bdi>
              <span
                v-if="item.exploring"
                dir="auto"
                class="text-[10px] font-normal"
              >
                · {{ t("ai_stack.exploring") }}
              </span>
            </button>
          </div>
          <div
            id="ai-topic-detail"
            :hidden="!activeItem"
            role="region"
            :aria-labelledby="
              activeItem ? `ai-topic-${activeItem.id}` : undefined
            "
            class="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-950/50"
          >
            <template v-if="activeItem">
              <h3
                class="text-sm font-semibold text-gray-900 dark:text-gray-100"
              >
                <bdi dir="ltr">{{ activeItem.name }}</bdi>
              </h3>
              <p
                class="mt-2 max-w-3xl text-sm leading-relaxed text-gray-700 dark:text-gray-300"
              >
                {{ activeItem.shortWhy }}
              </p>
              <a
                :href="activeItem.source"
                target="_blank"
                rel="noopener noreferrer"
                class="mt-2 inline-flex min-h-11 items-center gap-1.5 rounded text-sm font-medium text-primary-700 underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary dark:text-primary-300"
              >
                {{ t("ai_stack.reference") }}
                <UIcon
                  name="i-mdi-open-in-new"
                  class="size-4"
                  aria-hidden="true"
                />
              </a>
            </template>
          </div>
        </template>
      </PortfolioAccordion>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { AI_GROUPS, aiStackItems, type AiGroup } from "@/data/aiStack";
const { t, locale } = useI18n();

const groupOptions = computed(() =>
  AI_GROUPS.map((group) => ({
    value: group,
    label: t(`ai_stack.group.${group}`),
    count: aiStackItems.filter((item) => item.group === group).length,
  })),
);
const selectedGroup = ref<AiGroup | null>(null);
function selectGroup(group: AiGroup | null) {
  selectedGroup.value = group;
}

const localizedItems = computed(() =>
  aiStackItems.map((item) => ({
    ...item,
    shortWhy: locale.value === "fa" ? item.fa.shortWhy : item.shortWhy,
  })),
);
const filtered = computed(() =>
  selectedGroup.value === null
    ? localizedItems.value
    : localizedItems.value.filter((item) => selectedGroup.value === item.group),
);
const activeId = ref<string | null>("context-engineering");
const activeItem = computed(() =>
  filtered.value.find((item) => item.id === activeId.value),
);
watch(selectedGroup, () => {
  // Keep the detail relevant when filtering, without moving keyboard focus.
  if (!activeItem.value) activeId.value = filtered.value[0]?.id ?? null;
});

const accordionItems = computed(() => [
  {
    label: t("ai_stack.subtitle"),
    value: "ai-stack",
  },
]);

const accordionUi = {
  root: "flex flex-col",
  item: "flex flex-col rounded-2xl border border-gray-200/70 dark:border-gray-700/50 bg-white/70 dark:bg-gray-900/40 shadow-sm",
  header:
    "px-4 data-[state=open]:border-b border-gray-200/70 dark:border-gray-700/50",
  trigger: "group flex-1 items-center gap-2 py-3 text-start cursor-pointer",
  label:
    "text-sm font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300",
  leadingIcon: "shrink-0",
  trailingIcon:
    "ms-auto text-gray-500 dark:text-gray-400 transition-transform duration-200 group-data-[state=open]:rotate-180",
  content: "px-4 pb-4 pt-3 data-[state=closed]:hidden",
  body: "pt-1",
} as const;
</script>

<style scoped>
.ai-topic-selected {
  outline: 2px solid var(--ui-primary);
  outline-offset: 2px;
}
.ai-topic {
  flex-wrap: wrap;
  overflow-wrap: anywhere;
}
@media (prefers-reduced-motion: reduce) {
  .ai-topic,
  .ai-filter {
    transition: none !important;
    transform: none !important;
  }
}
</style>
