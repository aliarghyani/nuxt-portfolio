/**
 * Composable for testing lazy loading performance
 * Used to verify Requirements 6.2 - lazy loading effectiveness
 */
export function usePerformanceTest() {
  if (!import.meta.client) return

  const measureDOMSize = () => {
    const domSize = document.querySelectorAll('*').length
    console.log('📊 DOM Size:', domSize)
    return domSize
  }

  const measureVisibleComponents = () => {
    const sections = document.querySelectorAll('section')
    const visibleSections: string[] = []
    
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect()
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0
      if (isVisible && section.id) {
        visibleSections.push(section.id)
      }
    })
    
    console.log('👁️ Visible sections:', visibleSections)
    return visibleSections
  }

  const testIntersectionObserver = () => {
    if (!window.IntersectionObserver) {
      console.error('❌ IntersectionObserver not supported')
      return false
    }
    console.log('✅ IntersectionObserver supported')
    return true
  }

  const logPerformanceMetrics = () => {
    if (!window.performance) return

    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
    if (navigation) {
      console.log('⚡ Performance Metrics:')
      console.log('  - DOM Content Loaded:', Math.round(navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart), 'ms')
      console.log('  - Load Complete:', Math.round(navigation.loadEventEnd - navigation.loadEventStart), 'ms')
    }

    // Check for LCP
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      const lastEntry = entries[entries.length - 1] as any
      console.log('🎯 LCP:', Math.round(lastEntry.startTime), 'ms')
    })
    observer.observe({ entryTypes: ['largest-contentful-paint'] })
  }

  return {
    measureDOMSize,
    measureVisibleComponents,
    testIntersectionObserver,
    logPerformanceMetrics
  }
}
