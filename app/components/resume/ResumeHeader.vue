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
    <div v-if="basics.image" class="flex-shrink-0">
      <img
        :src="basics.image"
        :alt="basics.name"
        class="w-32 h-32 object-cover rounded-full print:w-24 print:h-24"
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
            class="text-red-500 flex-shrink-0 w-4 h-4"
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
            class="text-green-600 flex-shrink-0 w-4 h-4"
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
            class="text-amber-500 flex-shrink-0 w-4 h-4"
          />
          <bdi dir="ltr">{{ basics.email }}</bdi>
        </a>

        <!-- LinkedIn -->
        <a
          v-if="basics.profiles?.find((p) => p.network === 'LinkedIn')"
          :href="basics.profiles.find((p) => p.network === 'LinkedIn')!.url"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-1.5 hover:text-blue-600 transition-colors whitespace-nowrap"
        >
          <UIcon
            name="i-mdi-linkedin"
            class="text-[#0A66C2] flex-shrink-0 w-4 h-4"
          />
          LinkedIn
        </a>

        <!-- GitHub -->
        <a
          v-if="basics.profiles?.find((p) => p.network === 'GitHub')"
          :href="basics.profiles.find((p) => p.network === 'GitHub')!.url"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-1.5 hover:text-blue-600 transition-colors whitespace-nowrap"
        >
          <UIcon
            name="i-mdi-github"
            class="text-gray-800 flex-shrink-0 w-4 h-4"
          />
          GitHub
        </a>
      </div>

      <!-- Line 2: Website Only - Larger & Bolder -->
      <div class="mt-1.5 flex items-center print:mt-1.5">
        <!-- Website (Portfolio) - Prominent Display -->
        <a
          v-if="basics.profiles?.find((p) => p.network === 'Portfolio')"
          :href="basics.profiles.find((p) => p.network === 'Portfolio')!.url"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-1.5 text-md font-bold text-blue-600 hover:text-blue-700 transition-colors print:text-md print:font-bold"
        >
          <UIcon
            name="i-heroicons-globe-alt"
            class="text-blue-600 flex-shrink-0 w-4 h-4 print:w-4 print:h-4"
          />
          {{ t("resume.website") }}
        </a>
      </div>
    </div>
  </div>
</template>
