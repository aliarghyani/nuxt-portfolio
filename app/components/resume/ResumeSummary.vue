<script setup lang="ts">
const { t } = useI18n();
import { parseMarkdownBold } from "~/composables/useMarkdownText";

interface Props {
  summary: string;
}

const props = defineProps<Props>();

const parsedSummary = computed(() => parseMarkdownBold(props.summary));
</script>

<template>
  <section class="mb-12 print:mb-12">
    <h2
      class="text-base font-bold text-blue-700 uppercase border-b-2 border-blue-600 pb-2 mb-5 print:mb-5 tracking-wide"
    >
      {{ t("resume.summary") }}
    </h2>
    <p
      class="text-sm text-gray-800 leading-loose print:leading-loose"
      v-html="parsedSummary"
    />
  </section>
</template>
