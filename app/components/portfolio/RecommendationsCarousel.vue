<template>
  <section ref="sectionEl" class="section-spacing">
    <UContainer>
      <div class="section-header">
        <!-- <div
          class="p-2 rounded-lg bg-gradient-to-br from-blue-500/10 to-indigo-500/10 dark:from-blue-400/20 dark:to-indigo-400/20">
        </div> -->
        <div class="flex items-center gap-3 flex-1 min-w-0">
          <UIcon name="i-twemoji-left-speech-bubble" class="text-2xl" />
          <h2 class="section-title flex items-center gap-2 truncate">
            <span>{{ t("sections.recommendations") }}</span>
          </h2>
        </div>
      </div>

      <template v-if="shouldRenderCarousel">
        <div class="relative">
          <UCarousel
            ref="carouselRef"
            v-slot="{ item }"
            dots
            arrows
            loop
            :align="rtl ? 'end' : 'start'"
            :items="recs"
            :ui="carouselUi"
            :breakpoints="carouselBreakpoints"
          >
            <div
              class="w-full flex flex-col bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl p-6 select-none cursor-grab active:cursor-grabbing transition-all duration-300 hover:shadow-xl hover:border-primary dark:hover:border-primary"
            >
              <!-- Header -->
              <div class="flex items-start gap-3 mb-4">
                <div
                  class="shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-[#0A66C2] to-[#004182] flex items-center justify-center shadow-md"
                >
                  <UIcon
                    name="i-simple-icons-linkedin"
                    class="text-2xl text-white"
                  />
                </div>
                <div class="min-w-0 flex-1">
                  <p
                    class="font-semibold text-sm leading-tight text-gray-900 dark:text-gray-100"
                  >
                    {{ item.author }}
                  </p>
                  <p
                    class="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-2"
                  >
                    {{ item.author_title }}
                  </p>
                </div>
              </div>

              <!-- Meta Info -->
              <div
                class="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-gray-500 dark:text-gray-400 mb-4 pb-3 border-b border-gray-200 dark:border-gray-700"
              >
                <div class="flex items-center gap-1">
                  <UIcon name="i-twemoji-briefcase" class="text-sm" />
                  <span>{{ item.relationship }}</span>
                </div>
                <span class="text-gray-300 dark:text-gray-600">|</span>
                <div class="flex items-center gap-1">
                  <UIcon name="i-twemoji-calendar" class="text-sm" />
                  <span>{{ formatDate(item.date) }}</span>
                </div>
              </div>

              <!-- Quote Content -->
              <div class="flex-1 mb-4 min-h-[120px]">
                <blockquote
                  class="text-sm leading-relaxed text-gray-700 dark:text-gray-300 line-clamp-6"
                >
                  {{ item.text }}
                </blockquote>
              </div>

              <!-- Footer Buttons -->
              <div
                class="flex items-center gap-2 pt-3 mt-auto border-t border-gray-200 dark:border-gray-700"
              >
                <UButton
                  :to="item.linkedin_url"
                  target="_blank"
                  size="xs"
                  class="flex-1 justify-center bg-[#0A66C2] hover:bg-[#004182] text-white border-0 font-medium"
                >
                  <UIcon
                    name="i-simple-icons-linkedin"
                    class="text-base text-white"
                  />
                  <span class="ml-1.5">{{ linkedinText(item.author) }}</span>
                </UButton>
                <UButton
                  :to="item.recommendation_url"
                  target="_blank"
                  color="gray"
                  variant="soft"
                  size="xs"
                  icon="i-lucide-external-link"
                  class="flex-1 justify-center hover-ring-tint"
                >
                  {{ t("recommendations.viewFull") }}
                </UButton>
              </div>
            </div>
          </UCarousel>
          <!-- <div class="absolute inset-0 z-50 flex items-center justify-between pointer-events-none px-2 sm:px-4">
              <UButton icon="i-lucide-chevron-left" variant="soft" color="gray" size="sm"
                class="pointer-events-auto rounded-full bg-white/90 dark:bg-gray-900/70 ring-1 ring-gray-300/60 dark:ring-gray-700/60 shadow-md"
                aria-label="Previous recommendation" @click="goToPrev" />
              <UButton icon="i-lucide-chevron-right" variant="soft" color="gray" size="sm"
                class="pointer-events-auto rounded-full bg-white/90 dark:bg-gray-900/70 ring-1 ring-gray-300/60 dark:ring-gray-700/60 shadow-md"
                aria-label="Next recommendation" @click="goToNext" />
            </div> -->
        </div>
      </template>
      <template v-else>
        <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <article
            v-for="item in recs.slice(0, 3)"
            :key="item.author"
            class="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800/50"
          >
            <p class="text-sm font-semibold">{{ item.author }}</p>
            <p class="mt-1 text-xs text-gray-600 dark:text-gray-300">
              {{ item.author_title }}
            </p>
            <p class="mt-2 text-xs text-gray-600 dark:text-gray-300">
              {{ item.relationship }} · {{ formatDate(item.date) }}
            </p>
            <blockquote
              class="my-4 line-clamp-6 text-sm leading-relaxed text-gray-700 dark:text-gray-300"
            >
              {{ item.text }}
            </blockquote>
            <a
              :href="item.recommendation_url"
              target="_blank"
              rel="noopener"
              class="inline-flex min-h-11 items-center text-sm font-medium underline"
              >{{ t("recommendations.viewFull") }} · LinkedIn</a
            >
          </article>
        </div>
      </template>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
import { recommendations as recs } from "@/data/recommendations";
import { useSocialText } from "@/composables/useSocialText";
import { useElementVisibility } from "@vueuse/core";

const { t, locale } = useI18n();
const rtl = computed(() => locale.value === "fa");
const { linkedinText } = useSocialText();
const sectionEl = ref<HTMLElement | null>(null);
const hasEntered = ref(false);
const carouselUi = {
  root: "relative overflow-hidden  select-none",
  viewport: "overflow-visible",
  container: "py-2 !ms-0 gap-3 ps-3 sm:ps-4 pe-3 sm:pe-4 items-stretch",
  item: "basis-full sm:basis-1/2 lg:basis-1/3 flex",
  /* Position left/right, centered vertically, above content */
  prev: "absolute start-0 top-1/2",
  next: "absolute end-0 top-1/2",
  /* Ensure buttons are always visible and touch-friendly on all sizes */
  prevButton:
    "opacity-100 pointer-events-auto flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 dark:bg-gray-900/70 ring-1 ring-gray-300/60 dark:ring-gray-700/60 shadow-md hover:bg-white dark:hover:bg-gray-900 transition",
  nextButton:
    "opacity-100 pointer-events-auto flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 dark:bg-gray-900/70 ring-1 ring-gray-300/60 dark:ring-gray-700/60 shadow-md hover:bg-white dark:hover:bg-gray-900 transition",
  dots: "!static mt-6 flex justify-center gap-2",
} as const;

type CarouselInstance = {
  emblaApi?: {
    scrollPrev: () => void;
    scrollNext: () => void;
  };
};

const carouselRef = ref<CarouselInstance | null>(null);

if (import.meta.client) {
  const visibility = useElementVisibility(sectionEl, { threshold: 0.25 });
  watch(
    visibility,
    (visible) => {
      if (visible) {
        hasEntered.value = true;
      }
    },
    { immediate: true },
  );
}

const shouldRenderCarousel = computed(
  () => import.meta.client && hasEntered.value,
);

const carouselBreakpoints = computed<Record<string, any>>(() => {
  return rtl.value
    ? { "(min-width: 0px)": { direction: "rtl" } }
    : { "(min-width: 0px)": { direction: "ltr" } };
});

watch(
  [rtl, shouldRenderCarousel],
  async ([isRtl, canMount]) => {
    if (!import.meta.client || !canMount) return;
    await nextTick();
    const api = carouselRef.value?.emblaApi as any;
    if (api && typeof api.reInit === "function") {
      api.reInit({ direction: isRtl ? "rtl" : "ltr" });
    }
  },
  { immediate: true },
);

const formatDate = (d: string) => {
  try {
    const dt = new Date(d);
    const opts: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
    };
    return new Intl.DateTimeFormat(
      locale.value === "fa" ? "fa-IR" : "en-US",
      opts,
    ).format(dt);
  } catch {
    return d;
  }
};

const goToPrev = () => carouselRef.value?.emblaApi?.scrollPrev();
const goToNext = () => carouselRef.value?.emblaApi?.scrollNext();
</script>
