// Real User Monitoring (RUM) plugin - Requirements 1.1, 1.2, 1.3
// Tracks Core Web Vitals and custom metrics in production

interface RUMMetrics {
  // Core Web Vitals
  lcp?: number
  fid?: number
  cls?: number
  fcp?: number
  ttfb?: number
  
  // Custom metrics
  domSize?: number
  styleRecalcTime?: number
  layoutTime?: number
  
  // Context
  url: string
  userAgent: string
  timestamp: number
}

export default defineNuxtPlugin(() => {
  if (!import.meta.client) return

  const config = useRuntimeConfig()
  const metrics: Partial<RUMMetrics> = {
    url: window.location.href,
    userAgent: navigator.userAgent,
    timestamp: Date.now()
  }

  /**
   * Send metrics to analytics endpoint
   * In production, this would send to your analytics service
   */
  const sendMetrics = (metricName: string, value: number, rating?: string) => {
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[RUM] ${metricName}:`, value, rating ? `(${rating})` : '')
    }

    // Send to analytics in production
    // Example: Google Analytics, Plausible, or custom endpoint
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'web_vitals', {
        event_category: 'Performance',
        event_label: metricName,
        value: Math.round(value),
        rating: rating,
        non_interaction: true
      })
    }

    // Example: Send to custom analytics endpoint
    // fetch('/api/analytics/performance', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     metric: metricName,
    //     value,
    //     rating,
    //     url: metrics.url,
    //     timestamp: metrics.timestamp
    //   })
    // }).catch(err => console.error('Failed to send metrics:', err))
  }

  /**
   * Get rating for metric value
   */
  const getRating = (metric: string, value: number): string => {
    const thresholds: Record<string, { good: number; needsImprovement: number }> = {
      LCP: { good: 2500, needsImprovement: 4000 },
      FID: { good: 100, needsImprovement: 300 },
      CLS: { good: 0.1, needsImprovement: 0.25 },
      FCP: { good: 1800, needsImprovement: 3000 },
      TTFB: { good: 800, needsImprovement: 1800 }
    }

    const threshold = thresholds[metric]
    if (!threshold) return 'unknown'

    if (value <= threshold.good) return 'good'
    if (value <= threshold.needsImprovement) return 'needs-improvement'
    return 'poor'
  }

  /**
   * Track Core Web Vitals
   */
  const trackWebVitals = () => {
    if (!window.PerformanceObserver) return

    try {
      // Track Largest Contentful Paint (LCP)
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1] as any
        
        if (lastEntry) {
          const value = lastEntry.startTime
          metrics.lcp = value
          const rating = getRating('LCP', value)
          sendMetrics('LCP', value, rating)
        }
      })
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })

      // Track First Input Delay (FID)
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry: any) => {
          const value = entry.processingStart - entry.startTime
          metrics.fid = value
          const rating = getRating('FID', value)
          sendMetrics('FID', value, rating)
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
            metrics.cls = clsValue
          }
        })
      })
      clsObserver.observe({ entryTypes: ['layout-shift'] })

      // Send final CLS value when page is hidden
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden' && metrics.cls !== undefined) {
          const rating = getRating('CLS', metrics.cls)
          sendMetrics('CLS', metrics.cls, rating)
        }
      })

      // Track First Contentful Paint (FCP)
      const fcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry: any) => {
          if (entry.name === 'first-contentful-paint') {
            const value = entry.startTime
            metrics.fcp = value
            const rating = getRating('FCP', value)
            sendMetrics('FCP', value, rating)
          }
        })
      })
      fcpObserver.observe({ entryTypes: ['paint'] })

    } catch (error) {
      console.error('[RUM] Error tracking Web Vitals:', error)
    }
  }

  /**
   * Track custom metrics - Requirements 1.1, 1.2, 1.3
   */
  const trackCustomMetrics = () => {
    // Wait for page to be fully loaded
    window.addEventListener('load', () => {
      setTimeout(() => {
        // Measure DOM size (Requirement 1.1: target < 800 elements)
        const domSize = document.querySelectorAll('*').length
        metrics.domSize = domSize
        sendMetrics('DOM_Size', domSize, domSize < 800 ? 'good' : 'poor')

        // Measure TTFB
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
        if (navigation) {
          const ttfb = navigation.responseStart - navigation.requestStart
          metrics.ttfb = ttfb
          const rating = getRating('TTFB', ttfb)
          sendMetrics('TTFB', ttfb, rating)
        }

        // Note: Style recalc and layout time are harder to measure directly
        // These would typically be measured using Chrome DevTools Performance API
        // or through custom instrumentation
      }, 100)
    })
  }

  /**
   * Track navigation timing
   */
  const trackNavigationTiming = () => {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
        if (navigation) {
          // DNS lookup time
          const dnsTime = navigation.domainLookupEnd - navigation.domainLookupStart
          sendMetrics('DNS_Time', dnsTime)

          // TCP connection time
          const tcpTime = navigation.connectEnd - navigation.connectStart
          sendMetrics('TCP_Time', tcpTime)

          // Request time
          const requestTime = navigation.responseStart - navigation.requestStart
          sendMetrics('Request_Time', requestTime)

          // Response time
          const responseTime = navigation.responseEnd - navigation.responseStart
          sendMetrics('Response_Time', responseTime)

          // DOM processing time
          const domProcessing = navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart
          sendMetrics('DOM_Processing', domProcessing)

          // Page load time
          const loadTime = navigation.loadEventEnd - navigation.loadEventStart
          sendMetrics('Page_Load_Time', loadTime)
        }
      }, 0)
    })
  }

  /**
   * Track resource timing
   */
  const trackResourceTiming = () => {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[]
        
        // Group resources by type
        const resourcesByType: Record<string, number[]> = {}
        
        resources.forEach(resource => {
          const type = resource.initiatorType
          if (!resourcesByType[type]) {
            resourcesByType[type] = []
          }
          resourcesByType[type].push(resource.duration)
        })

        // Send average load time per resource type
        Object.entries(resourcesByType).forEach(([type, durations]) => {
          const avgDuration = durations.reduce((a, b) => a + b, 0) / durations.length
          sendMetrics(`Resource_${type}_Avg`, avgDuration)
          sendMetrics(`Resource_${type}_Count`, durations.length)
        })
      }, 1000)
    })
  }

  /**
   * Track cache hit rates - Requirement 1.1
   */
  const trackCacheHitRate = () => {
    window.addEventListener('load', () => {
      setTimeout(async () => {
        try {
          // Check service worker cache
          if ('caches' in window) {
            const cacheNames = await caches.keys()
            let totalCached = 0
            
            for (const cacheName of cacheNames) {
              const cache = await caches.open(cacheName)
              const keys = await cache.keys()
              totalCached += keys.length
            }
            
            sendMetrics('Cache_Total_Items', totalCached)
          }

          // Calculate cache hit rate from resources
          const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[]
          let cachedResources = 0
          let totalResources = resources.length

          resources.forEach(resource => {
            // Resources loaded from cache have very small transfer size
            if (resource.transferSize === 0 && resource.decodedBodySize > 0) {
              cachedResources++
            }
          })

          const cacheHitRate = totalResources > 0 
            ? (cachedResources / totalResources) * 100 
            : 0

          sendMetrics('Cache_Hit_Rate', cacheHitRate, cacheHitRate > 80 ? 'good' : 'poor')
          sendMetrics('Cache_Hits', cachedResources)
          sendMetrics('Total_Resources', totalResources)
        } catch (error) {
          console.error('[RUM] Error tracking cache hit rate:', error)
        }
      }, 1500)
    })
  }

  /**
   * Track component load times - Requirement 1.1
   */
  const trackComponentLoadTimes = () => {
    // Track when components become visible (lazy loaded)
    if ('PerformanceObserver' in window) {
      try {
        const componentObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          entries.forEach((entry) => {
            // Track custom component marks
            if (entry.name.startsWith('component-')) {
              sendMetrics(`Component_Load_${entry.name}`, entry.duration)
            }
          })
        })
        componentObserver.observe({ entryTypes: ['measure'] })
      } catch (error) {
        console.error('[RUM] Error tracking component load times:', error)
      }
    }
  }

  // Initialize tracking
  trackWebVitals()
  trackCustomMetrics()
  trackNavigationTiming()
  trackResourceTiming()
  trackCacheHitRate()
  trackComponentLoadTimes()

  // Provide metrics to the app
  return {
    provide: {
      rum: {
        getMetrics: () => metrics,
        sendCustomMetric: sendMetrics
      }
    }
  }
})
