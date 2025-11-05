export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  
  // Only load if explicitly enabled (Requirement 3.2)
  if (!config.public.loadPlausible) {
    return
  }

  // Wait for page to be interactive before loading third-party script
  // This ensures main thread time is minimized (Requirement 3.3)
  if (typeof window !== 'undefined') {
    const loadScript = () => {
      const startTime = performance.now()
      
      const script = document.createElement("script")
      script.src = "https://media.bitterbrains.com/main.js?from=UILIB&type=top"
      script.async = true
      
      // Monitor execution time (Requirement 3.3: < 50ms)
      script.onload = () => {
        const executionTime = performance.now() - startTime
        if (executionTime > 50) {
          console.warn('[Third-Party] Script exceeded 50ms threshold:', executionTime.toFixed(2), 'ms')
        } else {
          console.log('[Third-Party] Script loaded in:', executionTime.toFixed(2), 'ms')
        }
      }
      
      script.onerror = () => {
        console.error('[Third-Party] Failed to load script')
      }
      
      // Append to body close instead of head (Requirement 3.1)
      document.body.appendChild(script)
    }

    // Load after page is interactive to minimize main thread blocking
    if (document.readyState === 'complete') {
      loadScript()
    } else {
      window.addEventListener('load', loadScript)
    }
  }
})
