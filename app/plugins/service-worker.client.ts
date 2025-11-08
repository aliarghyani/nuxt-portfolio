// Service Worker registration plugin - Requirement 2.3
export default defineNuxtPlugin(() => {
  if (import.meta.client && 'serviceWorker' in navigator) {
    // Register service worker after page load to avoid blocking
    window.addEventListener('load', async () => {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js', {
          scope: '/'
        })
        
        console.log('Service Worker registered successfully:', registration.scope)
        
        // Handle updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // New service worker available, could notify user
                console.log('New service worker available')
              }
            })
          }
        })
      } catch (error) {
        console.error('Service Worker registration failed:', error)
      }
    })
  }
})
