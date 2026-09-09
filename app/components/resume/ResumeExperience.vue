<script setup lang="ts">
const { t } = useI18n();
import type { WorkExperience } from "~/types/resume";
import { parseMarkdownBold } from "~/composables/useMarkdownText";

interface Props {
  work: WorkExperience[];
}

const props = defineProps<Props>();
const { formatDateRange } = useResumeData();

const sortedWork = computed(() => {
  return [...props.work].sort((a, b) => {
    const dateA = a.startDate || "";
    const dateB = b.startDate || "";
    return dateB.localeCompare(dateA);
  });
});
</script>

<template>
  <section class="mb-12 print:mb-12">
    <h2
      class="text-base font-bold text-blue-700 uppercase border-b-2 border-blue-600 pb-2 mb-6 print:mb-6 tracking-wide"
    >
      {{ t("resume.work") }}
    </h2>

    <div
      v-for="job in sortedWork"
      :key="job.company + job.startDate"
      class="mb-8 last:mb-0 print:mb-8"
    >
      <div
        class="flex flex-col sm:flex-row print:flex-row justify-between items-start gap-2 sm:gap-4"
      >
        <div class="flex-1 min-w-0">
          <h3 class="text-sm font-bold text-gray-900 break-words hyphens-none">
            {{ job.position }}
          </h3>
          <p class="text-sm font-medium text-gray-600">{{ job.company }}</p>
        </div>
        <span
          class="text-sm text-gray-600 whitespace-nowrap flex-shrink-0 font-medium"
        >
          {{ formatDateRange(job.startDate, job.endDate) }}
        </span>
      </div>
      <ul class="mt-4 space-y-2.5 print:mt-4 print:space-y-2.5">
        <li
          v-for="(highlight, idx) in job.highlights"
          :key="idx"
          class="text-sm text-gray-700 ps-4 relative before:content-['•'] before:absolute before:start-0 before:text-gray-500 before:font-bold print:before:text-gray-500 break-words hyphens-none leading-relaxed"
          v-html="parseMarkdownBold(highlight)"
        />
      </ul>
    </div>
  </section>
</template>

<style scoped>
.hyphens-none {
  hyphens: none;
  -webkit-hyphens: none;
  -ms-hyphens: none;
}

.break-words {
  word-break: normal;
  overflow-wrap: break-word;
}
</style>
