<template>
  <section v-if="cta" id="contact" class="section-spacing scroll-mt-20">
    <UContainer>
      <div class="rounded-lg border border-primary-300/40 bg-primary-50/80 p-5 shadow-sm dark:border-primary-700/40 dark:bg-primary-950/20 sm:p-6">
        <div class="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div class="max-w-3xl">
            <h2 class="text-xl font-semibold leading-tight text-gray-950 dark:text-gray-50 sm:text-2xl">
              {{ cta.title }}
            </h2>
            <p class="mt-2 text-sm leading-relaxed text-gray-700 dark:text-gray-300 sm:text-base">
              {{ cta.description }}
            </p>
          </div>

          <div class="flex flex-wrap gap-2">
            <UButton
              :to="mailTo"
              icon="i-mdi-email-outline"
              color="primary"
              size="md"
              class="rounded-lg"
            >
              {{ t('buttons.contactMe') }}
            </UButton>
            <UButton
              to="#projects"
              icon="i-mdi-folder-multiple-outline"
              color="neutral"
              variant="soft"
              size="md"
              class="rounded-lg"
            >
              {{ t('buttons.viewProjects') }}
            </UButton>
            <UButton
              v-if="socials.linkedin"
              :to="socials.linkedin"
              target="_blank"
              icon="i-logos-linkedin-icon"
              color="neutral"
              variant="soft"
              size="md"
              class="rounded-lg"
            >
              LinkedIn
            </UButton>
            <UButton
              v-if="socials.github"
              :to="socials.github"
              target="_blank"
              icon="i-mdi-github"
              color="neutral"
              variant="soft"
              size="md"
              class="rounded-lg"
            >
              GitHub
            </UButton>
          </div>
        </div>
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { usePortfolio } from '@/composables/usePortfolio'

const portfolio = usePortfolio()
const { t } = useI18n()

const cta = computed(() => portfolio.value.cta)
const socials = computed(() => portfolio.value.profile.socials ?? {})
const mailTo = 'mailto:aliarghyani@gmail.com?subject=Frontend%20project%20inquiry'
</script>
