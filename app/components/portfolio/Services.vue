<template>
  <section
    v-if="services.length"
    id="services"
    class="section-spacing scroll-mt-20"
    aria-labelledby="workflow-heading"
  >
    <UContainer>
      <div
        class="workflow-map overflow-hidden rounded-3xl border border-gray-200 dark:border-gray-700/60"
      >
        <div
          class="relative grid gap-5 px-5 pt-7 sm:px-8 sm:pt-9 lg:grid-cols-2 lg:items-end lg:gap-12"
        >
          <div>
            <p
              class="mb-3 flex items-center gap-2 text-xs font-semibold tracking-widest text-primary-700 uppercase dark:text-primary-300"
            >
              <span
                class="size-2 rounded-full bg-primary-500"
                aria-hidden="true"
              />
              {{ t("sections.services") }}
            </p>
            <h2
              id="workflow-heading"
              class="max-w-xl text-2xl font-semibold leading-tight text-gray-950 sm:text-3xl dark:text-gray-50"
            >
              {{ t("services.title") }}
            </h2>
          </div>
          <p
            class="max-w-xl text-sm leading-relaxed text-gray-600 dark:text-gray-300"
          >
            {{ t("services.subtitle") }}
          </p>
        </div>
        <ol
          class="relative grid gap-6 px-5 py-8 sm:px-8 lg:grid-cols-3 lg:gap-5 lg:py-10"
        >
          <li
            v-for="(service, index) in services"
            :key="service.step"
            class="workflow-stage flex min-w-0 flex-col"
          >
            <div class="mb-5 flex items-center gap-3" aria-hidden="true">
              <span
                class="flex size-10 shrink-0 items-center justify-center rounded-full border border-primary-300/70 bg-white font-mono text-sm text-primary-700 dark:border-primary-500/50 dark:bg-gray-900 dark:text-primary-300"
                >{{ String(index + 1).padStart(2, "0") }}</span
              >
              <span
                class="text-sm font-semibold text-gray-700 dark:text-gray-200"
                >{{ service.step }}</span
              >
              <span
                class="ms-1 flex-1 border-t border-dashed border-primary-300/80 dark:border-primary-500/40"
              />
              <UIcon
                v-if="index < services.length - 1"
                name="i-mdi-arrow-right"
                class="size-4 shrink-0 text-primary-500 rtl:rotate-180"
              />
              <UIcon
                v-else
                name="i-mdi-check"
                class="size-4 shrink-0 text-primary-500"
              />
            </div>
            <article
              class="stage-card relative flex flex-1 flex-col rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700/70 dark:bg-gray-900 sm:p-6"
            >
              <div class="mb-5 flex items-start justify-between gap-4">
                <UIcon
                  :name="service.icon || 'i-mdi-check-circle-outline'"
                  class="size-8 shrink-0 text-primary-600 dark:text-primary-300"
                  aria-hidden="true"
                />
                <span class="text-xs text-gray-500 dark:text-gray-400">{{
                  service.step
                }}</span>
              </div>
              <h3
                class="min-h-14 text-xl font-semibold leading-snug text-gray-950 dark:text-gray-50"
              >
                {{ service.question }}
              </h3>
              <p
                class="mt-4 text-sm font-semibold leading-relaxed text-primary-700 dark:text-primary-300"
              >
                {{ service.title }}
              </p>
              <p
                class="mt-2 text-sm leading-7 text-gray-600 dark:text-gray-300"
              >
                {{ service.description }}
              </p>
              <div class="mt-auto pt-5">
                <p class="text-xs font-medium text-gray-500 dark:text-gray-400">
                  {{ t("services.outputs") }}
                </p>
                <ul class="mt-2 flex flex-wrap gap-2">
                  <li
                    v-for="output in service.outputs"
                    :key="output"
                    class="rounded-md bg-gray-100 px-2 py-1 text-xs leading-relaxed text-gray-700 dark:bg-gray-800 dark:text-gray-200"
                  >
                    {{ output }}
                  </li>
                </ul>
                <div
                  class="mt-5 border-t border-gray-200 pt-4 dark:border-gray-700"
                >
                  <p
                    class="text-xs leading-relaxed text-gray-500 dark:text-gray-400"
                  >
                    {{ service.emphasis }}
                  </p>
                  <a
                    v-if="service.to && service.linkLabel"
                    :href="service.to"
                    class="mt-1 inline-flex min-h-11 items-center gap-2 rounded text-sm font-medium text-primary-700 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary dark:text-primary-300"
                  >
                    {{ service.linkLabel
                    }}<UIcon
                      name="i-mdi-arrow-top-right"
                      class="size-4 shrink-0 rtl:-rotate-90"
                      aria-hidden="true"
                    />
                  </a>
                </div>
              </div>
            </article>
          </li>
        </ol>
        <div
          class="relative flex flex-col gap-3 border-t border-gray-200/80 bg-white/70 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8 dark:border-gray-700/60 dark:bg-gray-900/60"
        >
          <p
            class="flex items-center gap-2 text-sm font-medium text-gray-800 dark:text-gray-100"
          >
            <UIcon
              name="i-mdi-account-check-outline"
              class="size-5 shrink-0 text-primary-600 dark:text-primary-300"
              aria-hidden="true"
            />{{ t("services.oversight") }}
          </p>
          <p
            class="flex items-center gap-2 text-xs leading-relaxed text-gray-600 dark:text-gray-400"
          >
            <UIcon
              name="i-mdi-arrow-u-left-top"
              class="size-4 shrink-0 rtl:scale-x-[-1]"
              aria-hidden="true"
            />{{ t("services.iteration") }}
          </p>
        </div>
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { usePortfolio } from "@/composables/usePortfolio";
const portfolio = usePortfolio();
const { t } = useI18n();
const services = computed(() => portfolio.value.services ?? []);
</script>

<style scoped>
.workflow-map {
  background-color: color-mix(in srgb, var(--ui-bg) 94%, var(--ui-primary));
  background-image: radial-gradient(
    color-mix(in srgb, var(--ui-primary) 16%, transparent) 0.8px,
    transparent 0.8px
  );
  background-size: 18px 18px;
}
.stage-card {
  border-block-start: 3px solid
    color-mix(in srgb, var(--ui-primary) 55%, transparent);
}
</style>
