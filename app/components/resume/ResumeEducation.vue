<script setup lang="ts">
const { t } = useI18n();
import type { Education } from "~/types/resume";

interface Props {
  education: Education[];
}

defineProps<Props>();
const { formatDateRange } = useResumeData();
</script>

<template>
  <section class="mb-12 print:mb-12">
    <h2
      class="text-base font-bold text-blue-700 uppercase border-b-2 border-blue-600 pb-2 mb-6 print:mb-6 tracking-wide"
    >
      {{ t("resume.education") }}
    </h2>

    <div
      v-for="edu in education"
      :key="edu.institution + edu.startDate"
      class="mb-4 last:mb-0 print:mb-4"
    >
      <div
        class="flex flex-col sm:flex-row print:flex-row justify-between items-start gap-2"
      >
        <div>
          <h3 class="text-sm font-bold text-gray-900">
            {{ t("resume.degree", { degree: edu.studyType, area: edu.area }) }}
          </h3>
          <p class="text-sm font-medium text-gray-600">{{ edu.institution }}</p>
        </div>
        <span class="text-sm text-gray-600 whitespace-nowrap font-medium">
          {{ formatDateRange(edu.startDate, edu.endDate) }}
        </span>
      </div>
    </div>
  </section>
</template>
