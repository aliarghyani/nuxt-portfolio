<template>
  <section id="hero" class="scroll-mt-20 pt-3 pb-8 sm:pt-6 sm:pb-10">
    <UContainer>
      <div class="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div class="text-center sm:text-start lg:col-span-2">
          <div class="mb-4 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
            <UBadge color="primary" variant="soft" class="rounded-full">
              {{ portfolio.profile.name }}
            </UBadge>
            <UBadge v-if="portfolio.profile.availability" color="emerald" variant="soft" class="rounded-full">
              {{ portfolio.profile.availability }}
            </UBadge>
          </div>

          <h1 class="mb-4 max-w-6xl text-3xl font-bold leading-tight tracking-normal text-gray-950 dark:text-gray-50 sm:text-5xl lg:text-6xl">
            {{ portfolio.profile.headline || portfolio.profile.title }}
          </h1>

          <p class="max-w-4xl text-base leading-relaxed text-gray-700 dark:text-gray-300 sm:text-lg">
            {{ portfolio.profile.summary }}
          </p>
        </div>

        <div class="text-center sm:text-start">
          <div v-if="portfolio.profile.focusAreas?.length" class="mb-6 flex flex-wrap justify-center gap-2 sm:justify-start">
            <UBadge v-for="area in portfolio.profile.focusAreas" :key="area" color="neutral" variant="soft" class="rounded-full">
              {{ area }}
            </UBadge>
          </div>

          <div class="mb-6 flex flex-wrap items-center justify-center gap-3 sm:justify-start">
            <UButton icon="i-mdi-email-outline" color="primary" size="lg" class="rounded-lg" @click="copyEmail">
              {{ translate('buttons.contactMe', 'Contact Me') }}
            </UButton>
            <UButton to="#projects" icon="i-mdi-folder-multiple-outline" color="neutral" variant="soft" size="lg" class="rounded-lg">
              {{ translate('buttons.viewProjects', 'View Projects') }}
            </UButton>
            <NuxtLink to="/resume" class="resume-gradient-button" @click="preserveColorModeForResume">
              <UIcon name="i-heroicons-document-text" class="text-lg" />
              <span>{{ t('hero.viewResume') }}</span>
              <UIcon name="i-heroicons-sparkles" class="text-sm opacity-80" />
            </NuxtLink>
          </div>

          <div v-if="portfolio.profile.location || currentRole" class="mb-5 flex flex-col items-center gap-3 text-sm text-gray-600 dark:text-gray-300 sm:items-start">
            <div v-if="currentRole" class="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
              <img
                v-if="currentRole.companyLogo"
                :src="currentRole.companyLogo"
                :alt="`${currentRole.company} logo`"
                class="h-7 w-7 rounded-md object-contain"
                loading="lazy"
              />
              <span>{{ t('hero.currently') }}</span>
              <a
                v-if="currentRole.companyLink"
                :href="currentRole.companyLink"
                target="_blank"
                rel="noopener"
                class="font-semibold company-name hover:underline"
              >
                {{ currentRole.company }}
              </a>
              <span v-else class="font-semibold company-name">{{ currentRole.company }}</span>
            </div>
            <div v-if="portfolio.profile.location" class="flex items-center gap-2">
              <UIcon name="i-mdi-map-marker-outline" class="text-base text-primary-600 dark:text-primary-300" />
              <span class="leading-relaxed">{{ portfolio.profile.location }}</span>
            </div>
          </div>

          <div class="flex flex-wrap items-center justify-center gap-3 sm:justify-start">
            <ClientTooltip :text="emailTooltip">
              <UButton icon="i-twemoji-e-mail" :square="true" color="gray" variant="ghost"
                class="chip-button cursor-pointer" aria-label="Email" title="Email" @click="copyEmail" />
            </ClientTooltip>
            <ClientTooltip text="GitHub" v-if="portfolio.profile.socials?.github">
              <UButton :to="portfolio.profile.socials.github" target="_blank" icon="i-mdi-github" :square="true"
                color="gray" variant="ghost" class="chip-button" aria-label="GitHub" title="GitHub" />
            </ClientTooltip>
            <ClientTooltip text="LinkedIn" v-if="portfolio.profile.socials?.linkedin">
              <UButton :to="portfolio.profile.socials.linkedin" target="_blank" icon="i-logos-linkedin-icon"
                :square="true" color="gray" variant="ghost" class="chip-button" aria-label="LinkedIn"
                title="LinkedIn" />
            </ClientTooltip>
            <ClientTooltip text="X" v-if="portfolio.profile.socials?.x || portfolio.profile.socials?.twitter">
              <UButton :to="portfolio.profile.socials?.x || portfolio.profile.socials?.twitter" target="_blank"
                icon="i-logos-twitter" :square="true" color="gray" variant="ghost" class="chip-button" aria-label="X"
                title="X" />
            </ClientTooltip>
            <ClientTooltip text="Telegram" v-if="portfolio.profile.socials?.telegram">
              <UButton :to="portfolio.profile.socials.telegram" target="_blank" icon="i-logos-telegram" :square="true"
                color="gray" variant="ghost" class="chip-button" aria-label="Telegram" title="Telegram" />
            </ClientTooltip>
            <ClientTooltip text="WhatsApp" v-if="portfolio.profile.socials?.whatsapp">
              <UButton :to="portfolio.profile.socials.whatsapp" target="_blank" icon="i-logos-whatsapp-icon"
                :square="true" color="gray" variant="ghost" class="chip-button" aria-label="WhatsApp"
                title="WhatsApp" />
            </ClientTooltip>
            <ClientTooltip text="Spotify" v-if="portfolio.profile.socials?.spotify">
              <UButton :to="portfolio.profile.socials.spotify" target="_blank" :square="true" color="gray"
                variant="ghost" class="chip-button" aria-label="Spotify" title="Spotify">
                <UIcon name="i-simple-icons-spotify" class="text-[#1DB954] text-lg" />
              </UButton>
            </ClientTooltip>
            <ClientTooltip text="Bento" v-if="portfolio.profile.socials?.bento">
              <UButton :to="portfolio.profile.socials.bento" target="_blank" icon="i-simple-icons-bento" :square="true"
                color="gray" variant="ghost" class="chip-button" aria-label="Bento" title="Bento" />
            </ClientTooltip>
            <ClientTooltip text="Instagram" v-if="portfolio.profile.socials?.instagram">
              <UButton :to="portfolio.profile.socials.instagram" target="_blank" :square="true" color="gray"
                variant="ghost" class="chip-button" aria-label="Instagram" title="Instagram">
                <span
                  class="inline-flex h-5 w-5 items-center justify-center overflow-hidden rounded-[6px] bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]">
                  <UIcon name="i-mdi-instagram" class="text-white text-sm" />
                </span>
              </UButton>
            </ClientTooltip>
            <ClientTooltip text="Email" v-if="portfolio.profile.socials?.email">
              <UButton :to="portfolio.profile.socials.email" icon="i-twemoji-e-mail" :square="true" color="gray"
                variant="ghost" class="chip-button" aria-label="Email" title="Email" />
            </ClientTooltip>
          </div>
        </div>

        <div class="mx-auto w-full max-w-[280px]">
          <div class="rounded-lg border border-gray-200/70 bg-white/75 p-4 shadow-sm dark:border-gray-700/50 dark:bg-gray-900/45">
            <div class="mx-auto h-36 w-36 overflow-hidden rounded-full ring-4 ring-primary-400/35 dark:ring-primary-300/25">
              <NuxtImg
                :src="portfolio.profile.avatar || undefined"
                :alt="portfolio.profile.name"
                sizes="144px"
                width="144"
                height="144"
                class="h-full w-full object-cover"
                format="webp"
                preload
              />
            </div>
            <div class="mt-4 text-center">
              <p class="text-sm font-semibold text-gray-950 dark:text-gray-50">{{ portfolio.profile.title }}</p>
              <p class="mt-1 text-xs leading-relaxed text-gray-600 dark:text-gray-400">
                {{ translate('hero.cardSummary', 'CRM, SaaS dashboards, admin panels, and API-integrated frontend systems.') }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </UContainer>

    <UModal
      v-model:open="emailDialogOpen"
      :title="translate('hero.contactTitle', 'Contact Ali')"
      :description="translate('hero.contactDescription', 'Use this email for freelance, part-time, or contract frontend project inquiries.')"
      :ui="{ content: 'sm:max-w-md', body: 'space-y-4', footer: 'justify-between gap-2' }"
    >
      <template #body>
        <div class="rounded-lg border border-gray-200/70 bg-gray-50/80 p-3 dark:border-gray-700/60 dark:bg-gray-900/70">
          <div class="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-200">
            <UIcon name="i-mdi-email-outline" class="text-base text-primary-500 dark:text-primary-300" />
            <span>{{ translate('hero.emailAddress', 'Email address') }}</span>
          </div>
          <div class="flex items-center justify-between gap-3">
            <code class="min-w-0 break-all text-sm font-semibold text-gray-950 dark:text-gray-50">{{ emailAddress }}</code>
            <UButton
              icon="i-mdi-content-copy"
              color="primary"
              variant="soft"
              size="sm"
              class="shrink-0 rounded-lg"
              @click="handleModalCopy"
            >
              {{ translate('hero.copy', 'Copy') }}
            </UButton>
          </div>
        </div>

        <p v-if="emailDialogMessage" class="text-sm text-amber-600 dark:text-amber-300">
          {{ emailDialogMessage }}
        </p>
      </template>

      <template #footer="{ close }">
        <UButton
          color="neutral"
          variant="ghost"
          class="rounded-lg"
          @click="close"
        >
          {{ translate('hero.close', 'Close') }}
        </UButton>
        <UButton
          :to="`mailto:${emailAddress}?subject=Frontend%20project%20inquiry`"
          icon="i-mdi-send-outline"
          color="primary"
          class="rounded-lg"
          @click="close"
        >
          {{ translate('hero.openEmailApp', 'Open Email App') }}
        </UButton>
      </template>
    </UModal>
  </section>

</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { usePortfolio } from '@/composables/usePortfolio'
import type { CompanyExperience, Experience } from '@/types/portfolio.types'

const { t, te } = useI18n()
const portfolio = usePortfolio()
const toast = useToast()
const colorMode = useColorMode()

function translate(key: string, fallback: string): string {
  return te(key) ? t(key) : fallback
}

const currentRole = computed(() => {
  const experiences = portfolio.value.experiences as Array<CompanyExperience | Experience>

  const formatLinkLabel = (url?: string) => {
    if (!url) return undefined
    try {
      return new URL(url).hostname.replace(/^www\./, '')
    } catch {
      return undefined
    }
  }

  for (const exp of experiences) {
    if ('positions' in exp) {
      const active = exp.positions.find(pos => pos.ongoing)
      if (active) {
        const companyLink = exp.link || active.link
        const projectLink = active.link || undefined
        return {
          company: exp.company,
          title: active.title,
          companyLink,
          companyLogo: active.logo || exp.logo,
          projectLink,
          projectLabel: active.linkLabel || formatLinkLabel(projectLink),
        }
      }
    } else if (exp.ongoing) {
      return {
        company: exp.company,
        title: exp.role,
        companyLink: exp.link,
        companyLogo: exp.logo,
      }
    }
  }

  return null
})

/**
 * Email copy-to-clipboard for Hero quick action
 */
const emailAddress = 'aliarghyani@gmail.com'
const emailTooltip = ref('Email')
const emailDialogOpen = ref(false)
const emailDialogMessage = ref('')

async function copyEmail() {
  const copied = await tryCopyEmail()
  if (!copied) {
    emailDialogOpen.value = true
  }
}

async function tryCopyEmail(): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(emailAddress)
    emailTooltip.value = 'Copied'
    emailDialogMessage.value = ''
    setTimeout(() => { emailTooltip.value = 'Email' }, 1500)

    toast.add({
      title: t('toasts.emailCopied.title'),
      description: t('toasts.emailCopied.desc', { email: emailAddress }),
      icon: 'i-mdi-clipboard-check',
      color: 'emerald'
    })
    return true
  } catch {
    emailDialogMessage.value = translate('hero.clipboardBlocked', 'Clipboard access is blocked by the browser on this address. You can still select the email or open your email app.')
    return false
  }
}

async function handleModalCopy() {
  await tryCopyEmail()
}

function preserveColorModeForResume() {
  if (!import.meta.client) return
  if (colorMode.value === 'dark') {
    colorMode.preference = 'dark'
    localStorage.setItem('nuxt-color-mode', 'dark')
  }
}
</script>

<style>
.company-name {
  color: var(--ui-color-primary-600);
}

.dark .company-name {
  color: var(--ui-color-primary-300);
}

/* Resume button with primary color gradient */
.resume-button {
  background: linear-gradient(to right,
      var(--ui-color-primary-600),
      var(--ui-color-primary-500),
      var(--ui-color-primary-400));
  box-shadow: 0 10px 15px -3px color-mix(in oklch, var(--ui-color-primary-500) 25%, transparent);
}

.resume-button:hover {
  background: linear-gradient(to right,
      var(--ui-color-primary-700),
      var(--ui-color-primary-600),
      var(--ui-color-primary-500));
  box-shadow: 0 20px 25px -5px color-mix(in oklch, var(--ui-color-primary-500) 40%, transparent);
}

/* Override Tailwind ring color variable for chip buttons */
:deep(.chip-button) {
  --tw-ring-color: var(--ui-color-primary-500) !important;
}

:deep(.dark .chip-button) {
  --tw-ring-color: var(--ui-color-primary-400) !important;
}

/* Also override on hover and focus states */
:deep(.chip-button:hover),
:deep(.chip-button:focus),
:deep(.chip-button:focus-visible) {
  --tw-ring-color: var(--ui-color-primary-500) !important;
}

:deep(.dark .chip-button:hover),
:deep(.dark .chip-button:focus),
:deep(.dark .chip-button:focus-visible) {
  --tw-ring-color: var(--ui-color-primary-400) !important;
}
</style>
