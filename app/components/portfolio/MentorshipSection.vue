<template>
  <section
    id="mentorship"
    class="section-spacing scroll-mt-20"
    aria-labelledby="mentorship-title"
  >
    <UContainer>
      <div
        class="rounded-lg border border-gray-200/70 bg-white/75 p-4 shadow-sm dark:border-gray-700/50 dark:bg-gray-900/45"
      >
        <div
          class="grid gap-4 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:items-start"
        >
          <div class="space-y-3">
            <div>
              <UBadge
                color="primary"
                variant="soft"
                size="sm"
                class="mb-2.5 rounded-full"
              >
                {{ content.eyebrow }}
              </UBadge>

              <div class="mb-2.5 flex items-start gap-3 text-start">
                <UIcon
                  name="i-mdi-account-supervisor-outline"
                  class="mt-0.5 shrink-0 text-xl text-primary-500 dark:text-primary-300"
                  aria-hidden="true"
                />
                <h2 id="mentorship-title" class="section-title">
                  {{ content.title }}
                </h2>
              </div>

              <div
                class="max-w-xl space-y-1.5 text-start text-sm leading-relaxed text-gray-700 dark:text-gray-300"
              >
                <p>{{ content.introduction }}</p>
                <p class="text-gray-600 dark:text-gray-400">
                  {{ content.support }}
                </p>
              </div>
            </div>

            <ul
              class="grid gap-1.5 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3"
              :aria-label="content.attributesLabel"
            >
              <li
                v-for="attribute in content.attributes"
                :key="attribute.label"
                class="flex items-center gap-2 rounded-lg border border-gray-200/50 bg-gray-50/60 px-2.5 py-1.5 text-sm font-medium text-gray-800 dark:border-gray-700/35 dark:bg-gray-950/20 dark:text-gray-200"
              >
                <UIcon
                  :name="attribute.icon"
                  class="shrink-0 text-base text-primary-600 dark:text-primary-300"
                  aria-hidden="true"
                />
                <span>{{ attribute.label }}</span>
              </li>
            </ul>

            <div>
              <UButton
                :to="mentorshipMailTo"
                icon="i-mdi-email-outline"
                color="primary"
                size="md"
                class="w-full justify-center rounded-lg px-5 font-semibold shadow-sm transition-shadow hover:shadow-md sm:w-auto"
              >
                {{ content.ctaLabel }}
              </UButton>
            </div>
          </div>

          <div class="grid gap-1.5 sm:grid-cols-2">
            <article
              v-for="area in content.areas"
              :key="area.title"
              class="h-full"
            >
              <UCard :ui="areaCardUi" class="h-full">
                <div class="flex h-full gap-2.5 text-start">
                  <div
                    class="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary-500/10 text-primary-600 dark:bg-primary-400/10 dark:text-primary-300"
                    aria-hidden="true"
                  >
                    <UIcon :name="area.icon" class="text-base" />
                  </div>
                  <div class="min-w-0">
                    <h3
                      class="text-sm font-semibold leading-snug text-gray-950 dark:text-gray-50"
                    >
                      {{ area.title }}
                    </h3>
                    <p
                      class="mt-1 text-xs leading-relaxed text-gray-600 dark:text-gray-300"
                    >
                      {{ area.description }}
                    </p>
                  </div>
                </div>
              </UCard>
            </article>
          </div>
        </div>

        <div
          class="mt-3 border-t border-gray-200/60 pt-3 dark:border-gray-700/40"
        >
          <div class="mb-2 flex items-center gap-2 text-start">
            <UIcon
              name="i-mdi-compass-outline"
              class="text-lg text-primary-600 dark:text-primary-300"
              aria-hidden="true"
            />
            <h3 class="text-sm font-semibold text-gray-900 dark:text-gray-100">
              {{ content.processTitle }}
            </h3>
          </div>

          <ol class="grid gap-1.5 sm:grid-cols-3">
            <li v-for="(step, index) in content.processSteps" :key="step.title">
              <UCard :ui="processCardUi" class="h-full">
                <div class="flex h-full gap-2.5 text-start">
                  <span
                    class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-500/10 text-xs font-semibold text-primary-700 dark:bg-primary-400/10 dark:text-primary-200"
                    aria-hidden="true"
                  >
                    {{ index + 1 }}
                  </span>
                  <span class="min-w-0">
                    <span
                      class="block text-sm font-semibold text-gray-950 dark:text-gray-50"
                    >
                      {{ step.title }}
                    </span>
                    <span
                      class="mt-1 block text-xs leading-relaxed text-gray-600 dark:text-gray-300"
                    >
                      {{ step.description }}
                    </span>
                  </span>
                </div>
              </UCard>
            </li>
          </ol>
        </div>

        <aside
          class="mt-2 text-start text-xs leading-relaxed text-gray-600 dark:text-gray-300"
          role="note"
        >
          {{ content.expectationsNote }}
        </aside>
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
import { mentorshipContent } from "@/data/mentorship";

const { locale } = useI18n();

const content = computed(() =>
  locale.value === "fa" ? mentorshipContent.fa : mentorshipContent.en,
);

const mentorshipMailTo =
  "mailto:aliarghyani@gmail.com?subject=Mentorship%20fit%20discussion";

const areaCardUi = {
  root: "h-full rounded-lg border border-gray-200/45 bg-white/70 shadow-none ring-0 dark:border-gray-700/30 dark:bg-gray-900/45",
  body: "h-full p-2.5 sm:p-2.5",
} as const;

const processCardUi = {
  root: "h-full rounded-lg border border-gray-200/40 bg-gray-50/50 shadow-none ring-0 dark:border-gray-700/30 dark:bg-gray-950/20",
  body: "h-full p-2.5 sm:p-2.5",
} as const;
</script>
