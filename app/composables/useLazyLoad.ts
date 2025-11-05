import { ref, onMounted, onUnmounted, type Ref } from 'vue'

export interface LazyLoadConfig {
  threshold?: number // Intersection observer threshold (default: 0.1)
  rootMargin?: string // Root margin for early loading (default: '50px')
  once?: boolean // Only trigger once (default: true)
}

export interface LazyLoadComposable {
  isVisible: Ref<boolean>
  elementRef: Ref<HTMLElement | null>
  hasEntered: Ref<boolean>
  error: Ref<Error | null>
}

/**
 * Composable for lazy loading components using Intersection Observer
 * Implements Requirements 6.1 and 6.2 for lazy loading below-the-fold components
 */
export function useLazyLoad(config: LazyLoadConfig = {}): LazyLoadComposable {
  const {
    threshold = 0.1,
    rootMargin = '50px',
    once = true
  } = config

  const isVisible = ref(false)
  const hasEntered = ref(false)
  const elementRef = ref<HTMLElement | null>(null)
  const error = ref<Error | null>(null)

  let observer: IntersectionObserver | null = null

  onMounted(() => {
    // Check if IntersectionObserver is supported
    if (!window.IntersectionObserver) {
      // Fallback: show content immediately if not supported
      error.value = new Error('IntersectionObserver not supported')
      isVisible.value = true
      hasEntered.value = true
      return
    }

    try {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              isVisible.value = true
              hasEntered.value = true

              // If once is true, disconnect after first intersection
              if (once && observer) {
                observer.disconnect()
              }
            } else if (!once) {
              // If not once, update visibility when leaving viewport
              isVisible.value = false
            }
          })
        },
        {
          threshold,
          rootMargin
        }
      )

      if (elementRef.value) {
        observer.observe(elementRef.value)
      }
    } catch (e) {
      error.value = e as Error
      console.error('Failed to initialize IntersectionObserver:', e)
      // Fallback: show content immediately on error
      isVisible.value = true
      hasEntered.value = true
    }
  })

  onUnmounted(() => {
    if (observer) {
      observer.disconnect()
      observer = null
    }
  })

  return {
    isVisible,
    elementRef,
    hasEntered,
    error
  }
}
