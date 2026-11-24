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
    <template #close="{ ui }">
      <UButton
        color="neutral"
        variant="ghost"
        square
        :aria-label="t('hero.close')"
        data-slot="close"
        :class="ui.close()"
      >
        <svg
          aria-hidden="true"
          focusable="false"
          class="size-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
        >
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </UButton>
    </template>
    <template #body>
      <p class="text-sm text-gray-700 dark:text-gray-300">
        {{ t("contact.prompt") }}
      </p>
      <div class="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
        <p class="mb-2 text-sm font-medium">{{ t("hero.emailAddress") }}</p>
        <a
          :href="mailTo"
          dir="ltr"
          class="break-all font-semibold underline focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-primary"
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
        @click="copyEmail"
      >
        <template #leading>
          <svg
            aria-hidden="true"
            focusable="false"
            class="size-5 shrink-0"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              d="M19 21H8V7h11m0-2H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2m-3-4H4a2 2 0 0 0-2 2v14h2V3h12z"
            />
          </svg>
        </template>
        {{ t("contact.copy") }}
      </UButton>
      <UButton
        :to="mailTo"
        class="min-h-11 bg-primary-700 hover:bg-primary-800 active:bg-primary-800 dark:bg-primary dark:hover:bg-primary/75 dark:active:bg-primary/75"
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
let copyAttempt = 0;
watch(
  isOpen,
  () => {
    copyAttempt++;
    message.value = "";
  },
  { flush: "sync" },
);

async function copyEmail() {
  const attempt = ++copyAttempt;
  try {
    await navigator.clipboard.writeText(contact.email);
    if (attempt === copyAttempt) message.value = t("contact.copied");
    track("Email Copy");
  } catch {
    if (attempt === copyAttempt) message.value = t("contact.copyFailed");
  }
}
</script>
