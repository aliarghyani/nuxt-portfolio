import { computed, isRef, onBeforeUnmount, onMounted, ref, watch, type Ref } from 'vue'
import { useEventListener, useIntersectionObserver } from '@vueuse/core'

const DEFAULT_SECTION_IDS = ['hero', 'skills', 'work', 'projects'] as const

export type SectionId = (typeof DEFAULT_SECTION_IDS)[number] | string

type EnabledSource = boolean | Ref<boolean> | (() => boolean)

export interface SectionObserverOptions {
  ids?: SectionId[]
  offset?: number
  headerSelector?: string
  enabled?: EnabledSource
}

type ResolvedOptions = {
  ids: SectionId[]
  offset: number
  headerSelector?: string
}

const activeState = () => useState<SectionId | null>('section-observer:active', () => null)
const usersState = () => useState<number>('section-observer:users', () => 0)
const manualScrollState = () => useState<boolean>('section-observer:manual', () => false)
const optionsState = () =>
  useState<ResolvedOptions>('section-observer:options', () => ({
    ids: [...DEFAULT_SECTION_IDS],
    offset: 80,
    headerSelector: undefined
  }))

function computeOffset(headerSelector: string | undefined, fallback: number): number {
  if (!import.meta.client) return fallback
  if (!headerSelector) return fallback
  const el = document.querySelector<HTMLElement>(headerSelector)
  const height = el?.getBoundingClientRect().height
  return height && !Number.isNaN(height) ? Math.round(height) : fallback
}

function updateActiveFromScroll(options: ResolvedOptions, active: Ref<SectionId | null>) {
  if (!import.meta.client) return
  const offset = computeOffset(options.headerSelector, options.offset)
  const topAnchor = offset + 8

  let closest: { id: SectionId; distance: number } | null = null

  for (const id of options.ids) {
    const el = document.getElementById(id)
    if (!el) continue
    const rect = el.getBoundingClientRect()
    const distance = Math.abs(rect.top - offset)
    const aboveTop = rect.top <= topAnchor
    const notPassed = rect.bottom > topAnchor
    if (aboveTop && notPassed) {
      if (!closest || distance < closest.distance) {
        closest = { id, distance }
      }
    }
  }

  if (!closest) {
    // Fallback: choose the first section below the offset when none intersect
    for (const id of options.ids) {
      const el = document.getElementById(id)
      if (!el) continue
      const rect = el.getBoundingClientRect()
      if (rect.top >= offset - 40) {
        closest = { id, distance: Math.abs(rect.top - offset) }
        break
      }
    }
  }

  if (closest) {
    active.value = closest.id
  }
}

function refreshObserver(options: ResolvedOptions) {
  if (!import.meta.client) return
  const active = activeState()
  // Stop observing previous targets
  const disposables = useState<(() => void)[]>('section-observer:disposables', () => [])
  disposables.value.forEach((stop) => stop())
  disposables.value = []

  const offset = computeOffset(options.headerSelector, options.offset)

  options.ids.forEach((id) => {
    const el = document.getElementById(id)
    if (!el) return
    const observer = useIntersectionObserver(
      el,
      (entries) => {
        const entry = entries[0]
        if (!entry) return
        if (entry.isIntersecting) {
          active.value = id
        }
      },
      {
        threshold: 0.1,
        rootMargin: `-${offset}px 0px -55% 0px`
      }
    )
    disposables.value.push(observer.stop)
  })

  requestAnimationFrame(() => updateActiveFromScroll(options, active))
}

function teardownObserver() {
  if (!import.meta.client) return
  const disposables = useState<(() => void)[]>('section-observer:disposables', () => [])
  disposables.value.forEach((stop) => stop())
  disposables.value = []
}

export function useSectionObserver(options: SectionObserverOptions = {}) {
  const active = activeState()
  const users = usersState()
  const manual = manualScrollState()
  const storedOptions = optionsState()

  const ids = computed<SectionId[]>(() => options.ids ?? storedOptions.value.ids ?? [...DEFAULT_SECTION_IDS])
  const offset = computed(() => options.offset ?? storedOptions.value.offset ?? 80)
  const headerSelector = computed(() => options.headerSelector ?? storedOptions.value.headerSelector)
const resolveEnabled = (source?: EnabledSource): boolean => {
  if (isRef(source)) return !!source.value
  if (typeof source === 'function') return !!(source as () => unknown)()
  return (source ?? true) === true
}

const enabled = computed(() => resolveEnabled(options.enabled))

  const localEnabled = ref(false)

  const scrollStop = ref<(() => void) | null>(null)

  function setup() {
    if (!import.meta.client) return
    storedOptions.value = {
      ids: [...ids.value],
      offset: offset.value,
      headerSelector: headerSelector.value
    }
    refreshObserver(storedOptions.value)
    scrollStop.value = useEventListener(
      window,
      'scroll',
      () => {
        if (manual.value) return
        requestAnimationFrame(() => updateActiveFromScroll(optionsState().value, activeState()))
      },
      { passive: true }
    )
  }

  function disable() {
    if (!import.meta.client) return
    teardownObserver()
    active.value = null
    scrollStop.value?.()
    scrollStop.value = null
  }

  onMounted(() => {
    watch(
      [enabled, ids, offset, headerSelector],
      ([isEnabled]) => {
        if (!import.meta.client) return
        if (isEnabled) {
          if (!localEnabled.value) {
            localEnabled.value = true
            if (users.value === 0) {
              setup()
            } else {
              storedOptions.value = {
                ids: [...ids.value],
                offset: offset.value,
                headerSelector: headerSelector.value
              }
              refreshObserver(storedOptions.value)
            }
            users.value += 1
          } else {
            storedOptions.value = {
              ids: [...ids.value],
              offset: offset.value,
              headerSelector: headerSelector.value
            }
            refreshObserver(storedOptions.value)
          }
        } else if (localEnabled.value) {
          localEnabled.value = false
          users.value = Math.max(0, users.value - 1)
          if (users.value === 0) {
            disable()
          }
        }
      },
      { immediate: true }
    )
  })

  onBeforeUnmount(() => {
    if (!import.meta.client) return
    if (localEnabled.value) {
      localEnabled.value = false
      users.value = Math.max(0, users.value - 1)
      if (users.value === 0) {
        disable()
      }
    }
  })

  function scrollToSection(id: SectionId, behavior: ScrollBehavior = 'smooth') {
    if (!import.meta.client) return
    const el = document.getElementById(id)
    if (!el) return
    manual.value = true
    active.value = id
    el.scrollIntoView({ behavior, block: 'start', inline: 'nearest' })
    window.setTimeout(() => {
      manual.value = false
      updateActiveFromScroll(storedOptions.value, active)
    }, behavior === 'auto' ? 50 : 650)
  }

  function setActive(id: SectionId | null) {
    active.value = id
  }

  return {
    activeSection: active,
    scrollToSection,
    setActiveSection: setActive
  }
}
