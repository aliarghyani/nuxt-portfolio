<script setup lang="ts">
interface TocLink {
  id: string
  text: string
  depth: number
  children?: TocLink[]
}

const props = defineProps<{
  toc: {
    links: TocLink[]
  }
  mobile?: boolean
}>()

const { t } = useI18n()
const activeId = ref<string>('')

// Check if TOC should be displayed (3+ headings)
const shouldShowToc = computed(() => {
  const countLinks = (links: TocLink[]): number => {
    return links.reduce((count, link) => {
      return count + 1 + (link.children ? countLinks(link.children) : 0)
    }, 0)
  }
  return countLinks(props.toc.links) >= 3
})

const setHashWithoutNavigation = (id: string) => {
  const url = new URL(window.location.href)
  url.hash = id
  window.history.replaceState(window.history.state, '', url.toString())
}

// Smooth scroll to heading with offset for sticky header
const scrollToHeading = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    const offset = 100 // Offset for sticky header
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
    const offsetPosition = elementPosition - offset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })

    activeId.value = id
    setHashWithoutNavigation(id)
  }
}

// Track active section with IntersectionObserver
onMounted(() => {
  // Handle initial hash (avoid full page navigation / transition)
  const initialId = window.location.hash.replace(/^#/, '')
  if (initialId) {
    setTimeout(() => {
      const el = document.getElementById(initialId)
      if (!el) return

      const offset = 100
      const elementPosition = el.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - offset

      window.scrollTo({ top: offsetPosition, behavior: 'auto' })
      activeId.value = initialId
    }, 0)
  }

  const headings = document.querySelectorAll('article h2, article h3, article h4')

  const observer = new IntersectionObserver(
    (entries) => {
      // Find the first intersecting heading
      const intersecting = entries.filter(entry => entry.isIntersecting)
      if (intersecting.length > 0) {
        // Sort by position and get the topmost one
        const topmost = intersecting.sort((a, b) =>
          a.boundingClientRect.top - b.boundingClientRect.top
        )[0]
        if (topmost && topmost.target.id) {
          activeId.value = topmost.target.id
        }
      }
    },
    {
      rootMargin: '-100px 0px -66% 0px',
      threshold: [0, 0.25, 0.5, 0.75, 1]
    }
  )

  // Observe all headings
  headings.forEach((heading) => observer.observe(heading))

  // Cleanup
  onUnmounted(() => {
    headings.forEach((heading) => observer.unobserve(heading))
  })
})
</script>

<template>
  <div v-if="shouldShowToc">
    <!-- Desktop TOC -->
    <div v-if="!mobile"
      class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4 max-h-[calc(100vh-7rem)] overflow-y-auto">
      <h3 class="text-sm font-semibold mb-3 text-gray-900 dark:text-gray-100 uppercase tracking-wide">
        {{ t('blog.tableOfContents') }}
      </h3>
      <nav>
        <ul class="space-y-1 text-sm">
          <template v-for="link in toc.links" :key="link.id">
            <li>
              <a :href="`#${link.id}`" :class="[
                'block py-1.5 px-2 rounded transition-all',
                activeId === link.id
                  ? 'text-primary-600 dark:text-primary-400 font-medium bg-primary-50 dark:bg-primary-900/20'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800/50'
              ]" @click.prevent="scrollToHeading(link.id)">
                {{ link.text }}
              </a>
              <!-- Nested children (h3) -->
              <ul v-if="link.children && link.children.length > 0"
                class="ml-3 mt-0.5 space-y-0.5 border-l-2 border-gray-200 dark:border-gray-700 pl-3">
                <li v-for="child in link.children" :key="child.id">
                  <a :href="`#${child.id}`" :class="[
                    'block py-1 px-2 rounded text-xs transition-all',
                    activeId === child.id
                      ? 'text-primary-600 dark:text-primary-400 font-medium bg-primary-50 dark:bg-primary-900/20'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                  ]" @click.prevent="scrollToHeading(child.id)">
                    {{ child.text }}
                  </a>
                </li>
              </ul>
            </li>
          </template>
        </ul>
      </nav>
    </div>

    <!-- Mobile: Collapsible accordion -->
    <UAccordion v-if="mobile" :items="[
      {
        label: t('blog.tableOfContents'),
        icon: 'i-heroicons-list-bullet',
        defaultOpen: false,
        slot: 'toc'
      }
    ]">
      <template #toc>
        <ul class="space-y-2 text-sm p-4">
          <template v-for="link in toc.links" :key="link.id">
            <li>
              <a :href="`#${link.id}`" :class="[
                'block py-1 transition-colors',
                activeId === link.id
                  ? 'text-primary-600 dark:text-primary-400 font-medium'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
              ]" @click.prevent="scrollToHeading(link.id)">
                {{ link.text }}
              </a>
              <!-- Nested children (h3) -->
              <ul v-if="link.children && link.children.length > 0" class="ml-4 mt-1 space-y-1">
                <li v-for="child in link.children" :key="child.id">
                  <a :href="`#${child.id}`" :class="[
                    'block py-1 transition-colors',
                    activeId === child.id
                      ? 'text-primary-600 dark:text-primary-400 font-medium'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                  ]" @click.prevent="scrollToHeading(child.id)">
                    {{ child.text }}
                  </a>
                </li>
              </ul>
            </li>
          </template>
        </ul>
      </template>
    </UAccordion>
  </div>
</template>
