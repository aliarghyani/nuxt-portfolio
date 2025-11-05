import type { Ref } from 'vue'

/**
 * Performance metrics interface based on Core Web Vitals
 */
interface PerformanceMetrics {
  // Core Web Vitals
  lcp?: number // Largest Contentful Paint
  fid?: number // First Input Delay
  cls?: number // Cumulative Layout Shift
  
  // Additional metrics
  ttfb?: number // Time to First Byte
  fcp?: number // First Contentful Paint
  
  // Custom metrics (Requirements 1.1, 1.2, 1.3)
  domSize?: number
  styleRecalcTime?: number
  layoutTime?: number
  
  timestamp: Date
}

interface PerformanceState {
  metrics: Ref<PerformanceMetrics>
  isMonitoring: Ref<boolean>
  startMonitoring: () => void
  getMetricsSummary: () => any
  measureDOMSize: () => void
  measureStyleRecalc: () => void
  measureLayout: () => void
}

/**
 * Composable for monitoring performance metrics
 * Tracks Core Web Vitals and custom metrics
 * Requirements: 1.1 (DOM size), 1.2 (style recalc), 1.3 (layout)
 */
export function usePerformanceMonitoring(): PerformanceState {
  const metrics = ref<PerformanceMetrics>({
    timestamp: new Date()
  })
  
  const isMonitoring = ref(false)

  /**
   * Log metrics to console for debugging
   */
  const logMetric = (name: string, value: number, unit: string = 'ms') => {
    console.log(`[Performance] ${name}: ${value}${unit}`)
  }

  /**
   * Measure DOM size (Requirement 1.1: target < 800 elements)
   */
  const measureDOMSize = () => {
    if (!import.meta.client) return
    
    const domSize = document.querySelectorAll('*').length
    metrics.value.domSize = domSize
    logMetric('DOM Size', domSize, ' elements')
    
    if (domSize > 800) {
      console.warn(`[Performance] DOM size (${domSize}) exceeds target of 800 elements`)
    }
  }

  /**
   * Track Core Web Vitals using PerformanceObserver
   */
  const trackWebVitals = () => {
    if (!import.meta.client || !window.PerformanceObserver) return

    try {
      // Track Largest Contentful Paint (LCP)
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1] as any
        
        if (lastEntry) {
          metrics.value.lcp = lastEntry.startTime
          logMetric('LCP', lastEntry.startTime)
        }
      })
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })

      // Track First Input Delay (FID)
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry: any) => {
          metrics.value.fid = entry.processingStart - entry.startTime
          logMetric('FID', metrics.value.fid)
        })
      })
      fidObserver.observe({ entryTypes: ['first-input'] })

      // Track Cumulative Layout Shift (CLS)
      let clsValue = 0
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value
            metrics.value.cls = clsValue
            logMetric('CLS', clsValue, '')
            
            if (clsValue > 0.1) {
              console.warn(`[Performance] CLS (${clsValue.toFixed(3)}) exceeds target of 0.1`)
            }
          }
        })
      })
      clsObserver.observe({ entryTypes: ['layout-shift'] })

      // Track First Contentful Paint (FCP)
      const fcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry: any) => {
          metrics.value.fcp = entry.startTime
          logMetric('FCP', entry.startTime)
        })
      })
      fcpObserver.observe({ entryTypes: ['paint'] })

    } catch (error) {
      console.error('[Performance] Error setting up Web Vitals tracking:', error)
    }
  }

  /**
   * Measure style recalculation time (Requirement 1.2: target < 100ms)
   */
  const measureStyleRecalc = () => {
    if (!import.meta.client) return

    try {
      const perfEntries = performance.getEntriesByType('measure')
      const styleEntries = perfEntries.filter(entry => 
        entry.name.includes('style') || entry.name.includes('recalc')
      )
      
      if (styleEntries.length > 0) {
        const totalTime = styleEntries.reduce((sum, entry) => sum + entry.duration, 0)
        metrics.value.styleRecalcTime = totalTime
        logMetric('Style Recalculation', totalTime)
        
        if (totalTime > 100) {
          console.warn(`[Performance] Style recalc time (${totalTime.toFixed(2)}ms) exceeds target of 100ms`)
        }
      }
    } catch (error) {
      console.error('[Performance] Error measuring style recalc:', error)
    }
  }

  /**
   * Measure layout time (Requirement 1.3: target < 500 nodes)
   */
  const measureLayout = () => {
    if (!import.meta.client) return

    try {
      const perfEntries = performance.getEntriesByType('measure')
      const layoutEntries = perfEntries.filter(entry => 
        entry.name.includes('layout') || entry.name.includes('reflow')
      )
      
      if (layoutEntries.length > 0) {
        const totalTime = layoutEntries.reduce((sum, entry) => sum + entry.duration, 0)
        metrics.value.layoutTime = totalTime
        logMetric('Layout Time', totalTime)
      }
    } catch (error) {
      console.error('[Performance] Error measuring layout:', error)
    }
  }

  /**
   * Measure Time to First Byte (TTFB)
   */
  const measureTTFB = () => {
    if (!import.meta.client) return

    try {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      if (navigation) {
        metrics.value.ttfb = navigation.responseStart - navigation.requestStart
        logMetric('TTFB', metrics.value.ttfb)
      }
    } catch (error) {
      console.error('[Performance] Error measuring TTFB:', error)
    }
  }

  /**
   * Start monitoring all performance metrics
   */
  const startMonitoring = () => {
    if (!import.meta.client || isMonitoring.value) return

    console.log('[Performance] Starting performance monitoring...')
    isMonitoring.value = true

    // Track Web Vitals
    trackWebVitals()

    // Measure initial metrics
    measureTTFB()

    // Measure DOM and layout metrics after page load
    if (document.readyState === 'complete') {
      measureDOMSize()
      measureStyleRecalc()
      measureLayout()
    } else {
      window.addEventListener('load', () => {
        setTimeout(() => {
          measureDOMSize()
          measureStyleRecalc()
          measureLayout()
        }, 100)
      })
    }
  }

  /**
   * Get current metrics summary
   */
  const getMetricsSummary = () => {
    const summary = {
      'Core Web Vitals': {
        'LCP': metrics.value.lcp ? `${metrics.value.lcp.toFixed(2)}ms` : 'N/A',
        'FID': metrics.value.fid ? `${metrics.value.fid.toFixed(2)}ms` : 'N/A',
        'CLS': metrics.value.cls ? metrics.value.cls.toFixed(3) : 'N/A',
        'FCP': metrics.value.fcp ? `${metrics.value.fcp.toFixed(2)}ms` : 'N/A',
        'TTFB': metrics.value.ttfb ? `${metrics.value.ttfb.toFixed(2)}ms` : 'N/A'
      },
      'Custom Metrics': {
        'DOM Size': metrics.value.domSize ? `${metrics.value.domSize} elements` : 'N/A',
        'Style Recalc': metrics.value.styleRecalcTime ? `${metrics.value.styleRecalcTime.toFixed(2)}ms` : 'N/A',
        'Layout Time': metrics.value.layoutTime ? `${metrics.value.layoutTime.toFixed(2)}ms` : 'N/A'
      },
      'Timestamp': metrics.value.timestamp.toISOString()
    }
    
    console.table(summary['Core Web Vitals'])
    console.table(summary['Custom Metrics'])
    
    return summary
  }

  return {
    metrics,
    isMonitoring,
    startMonitoring,
    getMetricsSummary,
    measureDOMSize,
    measureStyleRecalc,
    measureLayout
  }
}
