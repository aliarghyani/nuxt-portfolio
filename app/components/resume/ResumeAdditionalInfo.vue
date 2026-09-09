<script setup lang="ts">
const { locale, t } = useI18n();
import type { Skill } from "~/types/resume";

interface Props {
  skills: Skill[];
}

const props = defineProps<Props>();
</script>

<template>
  <section class="mb-12 print:mb-12">
    <h2
      class="text-base font-bold text-blue-700 uppercase border-b-2 border-blue-600 pb-2 mb-6 print:mb-6 tracking-wide"
    >
      {{ t("resume.skills") }}
    </h2>

    <!-- Technical Skills (categorized) -->
    <div v-if="skills?.length">
      <div class="space-y-3 print:space-y-3">
        <div v-for="skill in skills" :key="skill.name" class="text-sm">
          <template v-if="locale === 'fa'">
            <span class="block font-bold text-gray-900">{{ skill.name }}:</span>
            <span dir="ltr" class="mt-0.5 block pl-12 text-right text-gray-700">
              {{ skill.keywords.join(", ") }}
            </span>
          </template>
          <template v-else>
            <span class="font-bold text-gray-900">{{ skill.name }}:&nbsp;</span>
            <span class="text-gray-700">{{ skill.keywords.join(", ") }}</span>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>
