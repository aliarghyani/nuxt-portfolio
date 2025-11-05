/**
 * Demo Route Middleware
 * 
 * This is a non-global route middleware example that demonstrates
 * Nuxt's middleware system without affecting actual navigation.
 * 
 * To use this middleware on a specific page, add:
 * definePageMeta({ middleware: 'demo' })
 * 
 * For global middleware, create a file with .global.ts extension.
 * 
 * Learn more: https://nuxt.com/docs/guide/directory-structure/middleware
 */

export default defineNuxtRouteMiddleware((to, from) => {
  // Example: Log navigation (no-op for demo purposes)
  if (import.meta.dev) {
    console.log('[Demo Middleware] Navigating from:', from.path, 'to:', to.path)
  }
  
  // Example: Conditional redirect (commented out to avoid side effects)
  // if (to.path === '/restricted') {
  //   return navigateTo('/')
  // }
  
  // Allow navigation to continue
})
