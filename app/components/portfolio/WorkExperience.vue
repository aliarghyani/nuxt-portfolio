<template>
  <section id="work" class="section-spacing scroll-mt-20">
    <UContainer>
      <div class="section-header">
        <UIcon name="i-twemoji-briefcase" class="text-2xl" />
        <h2 class="section-title">{{ t("sections.work") }}</h2>
      </div>

      <PortfolioAccordion
        id="workexperience-accordion"
        type="single"
        :items="accordionItems"
        default-value="work"
        :ui="accordionUi"
      >
        <template #body>
          <UTimeline
            :items="experiences"
            :default-value="0"
            color="primary"
            size="md"
            class="max-w-3xl"
            :ui="timelineUi"
          >
            <template #indicator="{ item }">
              <img
                v-if="item.logo"
                :src="item.logo"
                :alt="`${item.company} logo`"
                class="h-10 w-10 object-contain"
                loading="lazy"
              />
            </template>
            <template #title="{ item }">
              <div class="flex flex-col gap-1">
                <span class="font-semibold">{{ item.title }}</span>
                <span class="text-sm text-gray-600 dark:text-gray-400">{{
                  item.company
                }}</span>
              </div>
            </template>
            <template #description="{ item }">
              <ul
                v-if="item.descriptions?.length"
                class="mt-2 list-disc space-y-1 ps-5 text-sm text-gray-700 dark:text-gray-300"
              >
                <li v-for="(desc, i) in item.descriptions" :key="i">
                  {{ desc }}
                </li>
              </ul>
              <div v-if="item.icons?.length" class="mt-3 flex flex-wrap gap-2">
                <UIcon
                  v-for="(icon, i) in item.icons"
                  :key="i"
                  :name="icon"
                  class="text-xl text-primary-500 dark:text-primary-400"
                />
              </div>
            </template>
          </UTimeline>
        </template>
      </PortfolioAccordion>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { usePortfolio } from "@/composables/usePortfolio";
import type { TimelineItem } from "@nuxt/ui";
import type { CompanyExperience, Experience } from "@/types/portfolio.types";

const { t } = useI18n();
const portfolio = usePortfolio();
const presentText = computed(() => t("common.present"));

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

// Accordion config
const accordionItems = computed(() => [
  {
    label: t("sections.workAccordion"),
    value: "work",
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

const timelineUi = {
  item: "min-w-0",
  wrapper: "w-auto min-w-0 flex-1",
  title: "min-w-0 break-words",
  description: "min-w-0 break-words",
} as const;

type RichTimelineItem = TimelineItem & {
  company: string;
  descriptions?: string[];
  icons?: string[];
  logo?: string;
};

const experiences = computed<RichTimelineItem[]>(() => {
  const list = portfolio.value.experiences as Array<
    CompanyExperience | Experience
  >;
  const items: RichTimelineItem[] = [];

  list.forEach((exp: any, index: number) => {
    if (Array.isArray(exp.positions)) {
      const company = exp as CompanyExperience;
      company.positions.forEach((pos, posIndex) => {
        items.push({
          date: `${pos.start}${pos.ongoing ? ` - ${presentText.value}` : pos.end ? ` - ${pos.end}` : ""}`,
          title: pos.title,
          company: company.company,
          descriptions: pos.description,
          icons: pos.icons,
          icon: getIconForRole(pos.title),
          logo: pos.logo || company.logo || getCompanyLogo(company.company),
          value: `${index}-${posIndex}`,
        });
      });
    } else {
      const single = exp as Experience;
      items.push({
        date: `${single.start}${single.ongoing ? ` - ${presentText.value}` : single.end ? ` - ${single.end}` : ""}`,
        title: single.role,
        company: single.company,
        descriptions: single.description,
        icons: single.icons,
        icon: getIconForRole(single.role),
        logo: single.logo || getCompanyLogo(single.company),
        value: index,
      });
    }
  });

  return items;
});

function getCompanyLogo(name: string): string | undefined {
  const lower = name.toLowerCase();
  if (lower.includes("huawei")) return "/img/huawei.svg";
  if (lower.includes("nexaportal")) return "/img/NexaPortal1.png";
  return undefined;
}

function getIconForRole(position: string): string {
  const role = position.toLowerCase();

  if (role.includes("senior") || role.includes("lead")) {
    return "i-twemoji-crown";
  }
  if (role.includes("frontend") || role.includes("front-end")) {
    return "i-twemoji-laptop";
  }
  if (role.includes("backend") || role.includes("back-end")) {
    return "i-twemoji-server";
  }
  if (role.includes("fullstack") || role.includes("full-stack")) {
    return "i-twemoji-gear";
  }
  if (role.includes("developer") || role.includes("engineer")) {
    return "i-twemoji-technologist";
  }
  if (role.includes("designer")) {
    return "i-twemoji-artist-palette";
  }
  if (role.includes("manager")) {
    return "i-twemoji-people-holding-hands";
  }

  return "i-twemoji-briefcase";
}
</script>
