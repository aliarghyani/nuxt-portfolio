<template>
  <section id="ai-stack" class="section-spacing scroll-mt-20">
    <UContainer>
      <div class="section-header flex-nowrap justify-between">
        <div class="flex items-center gap-3 min-w-0">
          <UIcon name="twemoji:robot" class="text-2xl" />
          <h2 class="section-title">{{ t("skills.aiStack") }}</h2>
        </div>

        <div
          class="ms-auto flex flex-row-reverse items-center gap-1 overflow-x-auto no-scrollbar whitespace-nowrap px-1 py-1 min-w-0"
          role="toolbar"
          aria-label="AI Stack group filters"
        >
          <UButton
            :icon="filterButtonIcon"
            size="xs"
            :variant="filterButtonVariant"
            :color="filterButtonColor"
            class="filter-toggle cursor-pointer rounded-full shrink-0 mx-1"
            :class="{ 'is-open': filtersOpen, 'has-selection': hasSelection }"
            :aria-label="filterButtonLabel"
            :aria-expanded="hasSelection ? undefined : filtersOpen"
            aria-controls="ai-group-filter-group"
            @click="handlePrimaryAction"
          />
          <Transition name="filter-panel">
            <div
              v-if="filtersOpen"
              id="ai-group-filter-group"
              class="flex items-center gap-1"
            >
              <TransitionGroup
                name="filter-chip"
                tag="div"
                class="flex flex-row-reverse items-center gap-1"
              >
                <div
                  v-for="(opt, index) in groupOptions"
                  :key="opt.value"
                  class="filter-chip"
                  :style="transitionVars(index, groupOptions.length)"
                >
                  <UTooltip
                    :text="opt.label"
                    :arrow="true"
                    :delay-duration="0.5"
                    :content="{
                      side: 'bottom',
                      sideOffset: 8,
                      collisionPadding: 12,
                    }"
                  >
                    <UButton
                      :icon="opt.icon"
                      size="xs"
                      :variant="isSelected(opt.value) ? 'solid' : 'soft'"
                      color="primary"
                      class="cursor-pointer rounded-full shrink-0"
                      :aria-pressed="isSelected(opt.value)"
                      :aria-label="`Filter by ${opt.label}`"
                      :title="opt.label"
                      @click="toggleGroup(opt.value)"
                    />
                  </UTooltip>
                </div>
              </TransitionGroup>
            </div>
          </Transition>
        </div>
      </div>

      <PortfolioAccordion
        id="aistack-accordion"
        type="single"
        :items="accordionItems"
        default-value="ai-stack"
        :ui="accordionUi"
      >
        <template #body>
          <div class="flex flex-wrap gap-1.5">
            <div
              v-for="item in filtered"
              :key="item.id"
              class="inline-flex items-stretch"
            >
              <UTooltip
                :arrow="true"
                :delay-duration="0.5"
                :text="item.shortWhy || item.name"
                :content="{ side: 'top', sideOffset: 8, collisionPadding: 12 }"
              >
                <UBadge variant="soft" class="chip-base">
                  <span class="inline-flex items-center gap-1.5">
                    <UIcon
                      v-if="item.icon"
                      :name="item.icon"
                      class="h-4 w-4 min-h-4 min-w-4 text-base"
                    />
                    <span class="text-xs font-medium cursor-default">{{
                      item.name
                    }}</span>
                  </span>
                </UBadge>
              </UTooltip>
            </div>
          </div>
        </template>
      </PortfolioAccordion>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from "vue";
import { AI_GROUPS, aiStackItems, type AiGroup } from "@/data/aiStack";
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

type GroupMeta = { labelKey: string; icon: string };
const GROUP_META: Record<AiGroup, GroupMeta> = {
  ide_dev: { labelKey: "ai_stack.group.ide_dev", icon: "i-mdi-laptop" },
  protocols: {
    labelKey: "ai_stack.group.protocols",
    icon: "i-mdi-server-network",
  },
  concepts: {
    labelKey: "ai_stack.group.concepts",
    icon: "i-mdi-lightbulb-outline",
  },
  approaches: {
    labelKey: "ai_stack.group.approaches",
    icon: "i-mdi-compass-outline",
  },
};

const groupOptions = computed(() =>
  AI_GROUPS.map((g) => ({
    value: g,
    label: t(GROUP_META[g].labelKey),
    icon: GROUP_META[g].icon,
  })),
);

const selectedGroups = ref<AiGroup[]>([]);
const filtersOpen = ref(true);

const isSelected = (g: AiGroup) => selectedGroups.value.includes(g);
const toggleGroup = (g: AiGroup) => {
  const cur = selectedGroups.value;
  selectedGroups.value = isSelected(g)
    ? cur.filter((x) => x !== g)
    : [...cur, g];
};
const clear = () => {
  selectedGroups.value = [];
  filtersOpen.value = false;
};

const hasSelection = computed(() => selectedGroups.value.length > 0);

const filterButtonIcon = computed(() =>
  hasSelection.value ? "i-mdi-filter-remove" : "i-mdi-filter-variant",
);
const filterButtonLabel = computed(() =>
  hasSelection.value
    ? "Clear AI stack filters"
    : filtersOpen.value
      ? "Hide AI stack filters"
      : "Show AI stack filters",
);
const filterButtonVariant = computed(() =>
  hasSelection.value ? "solid" : filtersOpen.value ? "soft" : "ghost",
);
const filterButtonColor = computed(() =>
  hasSelection.value ? "error" : "neutral",
);

const handlePrimaryAction = () => {
  if (hasSelection.value) {
    clear();
    return;
  }
  filtersOpen.value = !filtersOpen.value;
};

const transitionVars = (index: number, total: number) =>
  ({
    "--filter-index": `${index}`,
    "--filter-order": `${Math.max(total - index, 0)}`,
  }) as Record<string, string>;

const filtered = computed(() => {
  if (selectedGroups.value.length === 0) return aiStackItems;
  return aiStackItems.filter((i) => selectedGroups.value.includes(i.group));
});

const headerTitle = computed(() => {
  if (selectedGroups.value.length === 1)
    return t(GROUP_META[selectedGroups.value[0]!].labelKey);
  return t(
    "ai_stack.subtitle",
    "Methods, tools, rules, and MCPs that power my AI workflow",
  );
});

const accordionItems = computed(() => [
  {
    label: headerTitle.value,
    value: "ai-stack",
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

<style scoped>
.filter-toggle {
  transition:
    transform 200ms ease,
    box-shadow 220ms ease,
    filter 220ms ease;
}

.filter-toggle.has-selection {
  box-shadow: 0 12px 28px -12px rgba(220, 38, 38, 0.45);
}

.filter-toggle.is-open:not(.has-selection) :deep([class*="i-mdi"]) {
  transform: rotate(180deg);
  transition: transform 220ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

.filter-panel-enter-active,
.filter-panel-leave-active {
  transition:
    opacity 200ms ease,
    transform 240ms cubic-bezier(0.34, 1.56, 0.64, 1);
  transform-origin: right center;
}

.filter-panel-enter-from,
.filter-panel-leave-to {
  opacity: 0;
  transform: translateX(0.75rem) scale(0.92);
}

.filter-chip-enter-active,
.filter-chip-leave-active {
  transition:
    opacity 200ms ease,
    transform 260ms cubic-bezier(0.34, 1.56, 0.64, 1);
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
