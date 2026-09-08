<template>
  <UModal
    v-model:open="isOpen"
    :title="t('contact.title')"
    :description="t('contact.description')"
    :content="{ onCloseAutoFocus: restoreFocus }"
    :ui="{
      content: 'sm:max-w-md',
      body: 'space-y-4',
      footer: 'flex-wrap justify-end gap-2',
    }"
  >
    <template #body>
      <p class="text-sm text-gray-700 dark:text-gray-300">
        {{ t("contact.prompt") }}
      </p>
      <div class="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
        <p class="mb-2 text-sm font-medium">{{ t("hero.emailAddress") }}</p>
        <a
          :href="mailTo"
          dir="ltr"
          class="break-all font-semibold underline"
          @click="track('Email Open')"
          >{{ contact.email }}</a
        >
      </div>
      <p
        role="status"
        aria-live="polite"
        class="text-sm text-gray-700 dark:text-gray-300"
      >
        {{ message }}
      </p>
    </template>
    <template #footer>
      <UButton
        color="neutral"
        variant="soft"
        class="min-h-11"
        icon="i-mdi-content-copy"
        @click="copyEmail"
        >{{ t("contact.copy") }}</UButton
      >
      <UButton
        :to="mailTo"
        class="min-h-11"
        icon="i-mdi-email-outline"
        @click="track('Email Open')"
        >{{ t("hero.openEmailApp") }}</UButton
      >
    </template>
  </UModal>
</template>

<script setup lang="ts">
import { contact } from "@/data/contact";
const { t } = useI18n();
const { isOpen, restoreFocus } = useProjectContact();
const track = usePortfolioAnalytics();
const message = ref("");
const mailTo = `mailto:${contact.email}?subject=${encodeURIComponent(contact.projectSubject)}`;
watch(isOpen, () => {
  message.value = "";
});
async function copyEmail() {
  try {
    await navigator.clipboard.writeText(contact.email);
    message.value = t("contact.copied");
    track("Email Copy");
  } catch {
    message.value = t("contact.copyFailed");
  }
}
</script>
