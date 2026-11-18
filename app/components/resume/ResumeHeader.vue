<script setup lang="ts">
const { t } = useI18n();
import type { ResumeBasics } from "~/types/resume";

interface Props {
  basics: ResumeBasics;
}

defineProps<Props>();
</script>

<template>
  <div
    class="flex flex-col sm:flex-row print:flex-row gap-4 sm:gap-6 mb-8 print:mb-8 print:pb-2"
  >
    <!-- Profile Photo (if provided) -->
    <div v-if="basics.image" class="flex-shrink-0 print:hidden">
      <img
        :src="basics.image"
        :alt="basics.name"
        class="w-32 h-32 object-cover rounded-full"
      />
    </div>

    <!-- Name + Contact Info -->
    <div class="flex-1 min-w-0">
      <h1 class="text-3xl font-bold text-gray-900 print:text-xl print:mb-0.5">
        {{ basics.name }}
      </h1>
      <p class="text-xl text-gray-600 mt-1 print:text-base print:mt-0">
        {{ basics.label }}
      </p>

      <!-- Line 1: Location, Phone, Email, LinkedIn, GitHub -->
      <div
        class="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-gray-700 print:mt-2 print:text-xs print:gap-x-4"
      >
        <!-- Location -->
        <span class="inline-flex items-center gap-1.5 whitespace-nowrap">
          <UIcon
            name="i-heroicons-map-pin"
            class="text-red-500 flex-shrink-0 w-4 h-4 print:hidden"
          />
          {{ basics.location.city }}, {{ basics.location.country }}
        </span>

        <!-- Phone -->
        <a
          :href="`tel:${basics.phone}`"
          class="inline-flex items-center gap-1.5 hover:text-blue-600 transition-colors whitespace-nowrap"
        >
          <UIcon
            name="i-heroicons-phone"
            class="text-green-600 flex-shrink-0 w-4 h-4 print:hidden"
          />
          <bdi dir="ltr">{{ basics.phone }}</bdi>
        </a>

        <!-- Email -->
        <a
          :href="`mailto:${basics.email}`"
          class="inline-flex items-center gap-1.5 hover:text-blue-600 transition-colors whitespace-nowrap"
        >
          <UIcon
            name="i-heroicons-envelope"
            class="text-amber-500 flex-shrink-0 w-4 h-4 print:hidden"
          />
          <bdi dir="ltr">{{ basics.email }}</bdi>
        </a>

        <div
          v-for="profile in basics.profiles"
          :key="profile.network"
          :class="{ 'basis-full print:basis-auto': profile.network === 'Portfolio' }"
        >
          <a
            :href="profile.url"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-1.5 whitespace-nowrap hover:text-blue-600"
            :class="{ 'font-bold text-blue-600 print:font-normal': profile.network === 'Portfolio' }"
          >
            <UIcon v-if="profile.icon" :name="profile.icon" class="size-4 print:hidden" />
            <span class="print:hidden">{{ profile.network === "Portfolio" ? t("resume.website") : profile.network }}</span>
            <bdi dir="ltr" class="hidden print:inline">{{ profile.url.replace(/^https?:\/\//, "") }}</bdi>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
