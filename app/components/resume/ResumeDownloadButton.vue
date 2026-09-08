<script setup lang="ts">
interface Props {
  isPrintMode?: boolean;
}

defineProps<Props>();

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
    aria-label="Download résumé PDF"
    class="fixed bottom-6 right-6 shadow-lg no-print z-50"
    @click="downloadPdf"
  >
    <span class="hidden sm:inline">Download PDF</span>
  </UButton>
</template>

<style scoped>
@media print {
  .no-print {
    display: none !important;
  }
}
</style>
