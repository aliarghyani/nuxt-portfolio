<template>
  <section id="projects" class="section-spacing scroll-mt-20">
    <UContainer>
      <div class="section-header">
        <UIcon name="i-twemoji-rocket" class="text-2xl" />
        <h2 class="section-title text-start">{{ t('sections.projects') }}</h2>
      </div>

      <UAccordion type="single" :unmount-on-hide="false" :items="accordionItems" default-value="projects"
        :ui="accordionUi">
        <template #body>
          <div v-for="g in nonEmptyCategoryList" :key="g.cat" class="space-y-3 mb-5">
            <div class="flex items-center gap-2">
              <UIcon name="i-twemoji-open-book" class="text-xl" />
              <h3 class="text-base font-semibold text-gray-900 dark:text-gray-100">{{ tCategory(g.cat) }}</h3>
            </div>

            <div class="grid gap-4 lg:grid-cols-2">
              <UCard v-for="(p, i) in g.items" :key="`${g.cat}-${i}-${p.name}`"
                class="flex h-full flex-col border border-gray-200/60 shadow-none transition hover:-translate-y-0.5 hover:shadow-md dark:border-gray-700/40">
                <article class="flex h-full flex-col gap-4">
                  <div class="flex gap-3">
                    <NuxtImg
                      v-if="p.thumbnail"
                      :src="p.thumbnail"
                      :alt="`${p.name} logo`"
                      class="h-14 w-14 rounded-lg border border-gray-200/70 bg-white object-contain p-1 shadow-sm dark:border-gray-700/40 dark:bg-slate-900"
                      width="112"
                      height="112"
                      sizes="112px"
                      format="webp"
                      loading="lazy"
                    />
                    <div
                      v-else
                      class="flex h-14 w-14 items-center justify-center rounded-lg border border-gray-200/70 bg-primary-500/10 text-primary-600 shadow-sm dark:border-gray-700/40 dark:bg-primary-400/10 dark:text-primary-200"
                    >
                      <UIcon :name="getProjectIcon(p)" class="text-2xl" />
                    </div>
                    <div class="flex flex-1 flex-col gap-3">
                      <div>
                        <h3 class="text-base font-semibold leading-snug text-gray-950 dark:text-gray-50">{{ p.name }}</h3>
                        <div v-if="p.status || p.opensource" class="mt-2 flex flex-wrap items-center gap-2">
                          <UBadge v-if="p.status" color="primary" variant="soft" class="rounded-full capitalize">
                            {{ p.status }}
                          </UBadge>
                          <UBadge v-if="p.opensource" color="emerald" variant="soft" class="rounded-full">
                            <UIcon name="i-mdi-source-branch" class="mr-1" />
                            {{ t('projectLabels.openSource') }}
                          </UBadge>
                        </div>
                      </div>
                      <p class="text-sm leading-relaxed text-gray-700 dark:text-gray-200">{{ p.description }}</p>
                    </div>
                  </div>

                  <div v-if="hasCaseStudyContent(p)" class="grid gap-3 text-sm">
                    <div v-if="p.context">
                      <h4 class="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">{{ t('projectLabels.context') }}</h4>
                      <p class="mt-1 leading-relaxed text-gray-700 dark:text-gray-300">{{ p.context }}</p>
                    </div>
                    <div v-if="p.role">
                      <h4 class="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">{{ t('projectLabels.role') }}</h4>
                      <p class="mt-1 leading-relaxed text-gray-700 dark:text-gray-300">{{ p.role }}</p>
                    </div>
                    <div v-if="p.features?.length">
                      <h4 class="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">{{ t('projectLabels.keyFeatures') }}</h4>
                      <div class="mt-2 flex flex-wrap gap-1.5">
                        <UBadge v-for="feature in p.features" :key="feature" color="neutral" variant="soft" class="rounded-full">
                          {{ feature }}
                        </UBadge>
                      </div>
                    </div>
                    <div v-if="p.stack?.length">
                      <h4 class="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">{{ t('projectLabels.techStack') }}</h4>
                      <div class="mt-2 flex flex-wrap gap-1.5">
                        <UBadge v-for="item in p.stack" :key="item" color="primary" variant="soft" class="rounded-full">
                          {{ item }}
                        </UBadge>
                      </div>
                    </div>
                    <div v-if="p.outcome">
                      <h4 class="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">{{ t('projectLabels.outcome') }}</h4>
                      <p class="mt-1 leading-relaxed text-gray-700 dark:text-gray-300">{{ p.outcome }}</p>
                    </div>
                  </div>

                  <div class="mt-auto flex flex-col gap-3 pt-1">
                    <div v-if="p.icons?.length" class="flex flex-wrap items-center gap-2 text-primary-500 dark:text-primary-300">
                      <UIcon v-for="(ic, k) in p.icons" :key="k" :name="ic" class="text-xl" />
                    </div>
                    <div v-if="p.links?.length" class="flex flex-wrap gap-2">
                      <UButton
                        v-for="(l, j) in p.links"
                        :key="j"
                        :to="l.to"
                        target="_blank"
                        size="xs"
                        color="primary"
                        variant="soft"
                        trailing-icon="i-mdi-arrow-top-right-thin"
                        class="hover-ring-tint rounded-lg"
                        :aria-label="l.label"
                      >
                        <UIcon v-if="l.icon" :name="l.icon" class="mr-1" />
                        {{ l.label }}
                      </UButton>
                    </div>
                  </div>
                </article>
              </UCard>
            </div>
          </div>
        </template>
      </UAccordion>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { usePortfolio } from '@/composables/usePortfolio'
import type { Project } from '@/types/portfolio.types'

const portfolio = usePortfolio()
const { t } = useI18n()

// Detect mobile for accordion behavior (SSR-safe)
const isMobile = ref(true)

onMounted(() => {
  const checkMobile = () => {
    isMobile.value = window.innerWidth < 768
  }
  checkMobile()
  window.addEventListener('resize', checkMobile)
  onUnmounted(() => {
    window.removeEventListener('resize', checkMobile)
  })
})

// Accordion config
const accordionItems = computed(() => [{
  label: t('sections.projectsAccordion'),
  value: 'projects'
}])

const accordionUi = {
  root: 'flex flex-col',
  item: 'flex flex-col rounded-2xl border border-gray-200/70 dark:border-gray-700/50 bg-white/70 dark:bg-gray-900/40 shadow-sm',
  header: 'px-4 data-[state=open]:border-b border-gray-200/70 dark:border-gray-700/50',
  trigger: 'group flex-1 items-center gap-2 py-3 text-left cursor-pointer',
  label: 'text-sm font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300',
  leadingIcon: 'shrink-0',
  trailingIcon: 'ms-auto text-gray-500 dark:text-gray-400 transition-transform duration-200 group-data-[state=open]:rotate-180',
  content: 'px-4 pb-4 pt-3 data-[state=closed]:hidden',
  body: 'pt-1'
} as const

type Category = NonNullable<Project['category']>
const categories: Category[] = ['current', 'freelance', 'public']

const projectsByCategory = computed<Record<Category, Project[]>>(() => {
  const acc: Record<Category, Project[]> = { current: [], freelance: [], public: [] }
  for (const p of portfolio.value.projects) {
    const cat = (p.category ?? 'freelance') as Category
    acc[cat].push(p)
  }
  return acc
})

const categoryList = computed<Array<{ cat: Category; items: Project[] }>>(() => {
  return categories.map((c) => ({ cat: c as Category, items: projectsByCategory.value[c as Category] }))
})

const nonEmptyCategoryList = computed<Array<{ cat: Category; items: Project[] }>>(() => {
  return categoryList.value.filter(g => g.items.length > 0)
})

function tCategory(cat: Category): string {
  return t(`projectCategories.${cat}`)
}

function getProjectIcon(project: Project): string {
  if (project.thumbnail) return ''

  const hasGitLink = project.links?.some(link =>
    link.icon === 'i-mdi-github' ||
    /github/i.test(link.label) ||
    /github\.com/i.test(link.to)
  )

  if (project.opensource || hasGitLink) {
    return 'i-mdi-github'
  }

  return 'i-twemoji-rocket'
}

function hasCaseStudyContent(project: Project): boolean {
  return Boolean(
    project.context ||
    project.role ||
    project.features?.length ||
    project.stack?.length ||
    project.outcome
  )
}
</script>
