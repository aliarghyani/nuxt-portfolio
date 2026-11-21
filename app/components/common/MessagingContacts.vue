<script setup lang="ts">
import { contact } from "~/data/contact";
</script>

<template>
  <a
    :href="`https://t.me/${contact.telegramUsername}`"
    class="inline-flex items-center gap-1.5 whitespace-nowrap hover:underline"
    target="_blank"
    rel="noopener noreferrer"
  >
    <UIcon name="i-logos-telegram" class="size-4 print:hidden" />
    <span class="sr-only print:not-sr-only">Telegram</span>
    <bdi dir="ltr">@{{ contact.telegramUsername }}</bdi>
  </a>
  <span class="inline-flex items-center gap-1.5 whitespace-nowrap">
    <UIcon name="i-logos-whatsapp-icon" class="size-4 print:hidden" />
    <span class="sr-only print:not-sr-only">WhatsApp</span>
    <bdi dir="ltr" class="select-all">{{ contact.whatsappUsername }}</bdi>
  </span>
</template>
