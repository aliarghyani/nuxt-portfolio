<script setup lang="ts">
interface Props {
  isPrintMode?: boolean;
}

defineProps<Props>();

const { t } = useI18n();
const { isGenerating, downloadPdf } = useResumePdf();
</script>

<template>
  <UButton
    v-if="!isPrintMode"
    icon="i-heroicons-arrow-down-tray"
    size="lg"
    color="primary"
    :loading="isGenerating"
    :disabled="isGenerating"
    :aria-label="t('resume.downloadLabel')"
    class="fixed bottom-6 end-6 min-h-11 shadow-lg no-print z-50"
    @click="downloadPdf"
  >
    <span>{{ t("resume.download") }}</span>
  </UButton>
</template>

<style scoped>
@media print {
  .no-print {
    display: none !important;
  }
}
</style>
