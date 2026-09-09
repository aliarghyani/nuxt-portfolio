<script setup lang="ts">
const { t } = useI18n();
import type { Language, Certification } from "~/types/resume";

interface Props {
  languages?: Language[];
  certifications?: Certification[];
}

const props = defineProps<Props>();
</script>

<template>
  <section class="mb-12 print:mb-12">
    <h2
      class="text-base font-bold text-blue-700 uppercase border-b-2 border-blue-600 pb-2 mb-6 print:mb-6 tracking-wide"
    >
      {{
        t(
          certifications?.length
            ? "resume.languagesCertifications"
            : "resume.languages",
        )
      }}
    </h2>

    <!-- Languages -->
    <div v-if="languages?.length" class="mb-2 print:mb-2">
      <span class="text-sm font-bold text-gray-900"
        >{{ t("resume.languages") }}:
      </span>
      <span class="text-sm text-gray-700">
        <template v-for="(lang, idx) in languages" :key="lang.language">
          {{ lang.language }} ({{ lang.fluency }})<template
            v-if="idx < languages.length - 1"
            >,
          </template>
        </template>
      </span>
    </div>

    <!-- Certifications -->
    <div v-if="certifications?.length">
      <span class="text-sm font-bold text-gray-900"
        >{{ t("resume.certifications") }}:
      </span>
      <span class="text-sm text-gray-700">
        <template v-for="(cert, idx) in certifications" :key="cert.name">
          {{ cert.issuer }} - {{ cert.summary
          }}<template v-if="idx < certifications.length - 1">, </template>
        </template>
      </span>
    </div>
  </section>
</template>
