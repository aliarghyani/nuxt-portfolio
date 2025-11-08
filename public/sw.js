// Service Worker for caching strategy - Requirement 2.3
const CACHE_VERSION = 'v1'
const STATIC_CACHE = `static-${CACHE_VERSION}`
const IMAGE_CACHE = `images-${CACHE_VERSION}`
const API_CACHE = `api-${CACHE_VERSION}`

// Cache strategies configuration
const CACHE_STRATEGIES = {
  staticAssets: {
    name: STATIC_CACHE,
    pattern: /\.(js|css|woff2|woff|ttf|eot|svg|ico)$/,
    strategy: 'CacheFirst',
    maxAge: 31536000, // 1 year
    maxEntries: 100
  },
  images: {
    name: IMAGE_CACHE,
    pattern: /\.(png|jpg|jpeg|webp|avif|gif)$|_vercel\/image/,
    strategy: 'CacheFirst',
    maxAge: 2592000, // 30 days
    maxEntries: 60
  },
  api: {
    name: API_CACHE,
    pattern: /\/api\//,
    strategy: 'NetworkFirst',
    maxAge: 300, // 5 minutes
    maxEntries: 50
  }
}

// Install event - cache critical assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      return cache.addAll([
        '/',
        '/favicon/favicon.ico'
      ])
    }).then(() => self.skipWaiting())
  )
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => {
            return name.startsWith('static-') || 
                   name.startsWith('images-') || 
                   name.startsWith('api-')
          })
          .filter((name) => {
            return name !== STATIC_CACHE && 
                   name !== IMAGE_CACHE && 
                   name !== API_CACHE
          })
          .map((name) => caches.delete(name))
      )
    }).then(() => self.clients.claim())
  )
})

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return
  }

  // Skip chrome-extension and other non-http(s) requests
  if (!url.protocol.startsWith('http')) {
    return
  }

  // Determine cache strategy
  let strategy = null
  let cacheName = null

  if (CACHE_STRATEGIES.staticAssets.pattern.test(url.pathname)) {
    strategy = CACHE_STRATEGIES.staticAssets.strategy
    cacheName = CACHE_STRATEGIES.staticAssets.name
  } else if (CACHE_STRATEGIES.images.pattern.test(url.pathname)) {
    strategy = CACHE_STRATEGIES.images.strategy
    cacheName = CACHE_STRATEGIES.images.name
  } else if (CACHE_STRATEGIES.api.pattern.test(url.pathname)) {
    strategy = CACHE_STRATEGIES.api.strategy
    cacheName = CACHE_STRATEGIES.api.name
  }

  if (strategy && cacheName) {
    if (strategy === 'CacheFirst') {
      event.respondWith(cacheFirst(request, cacheName))
    } else if (strategy === 'NetworkFirst') {
      event.respondWith(networkFirst(request, cacheName))
    }
  }
})

// CacheFirst strategy - for static assets
async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName)
  const cached = await cache.match(request)
  
  if (cached) {
    return cached
  }

  try {
    const response = await fetch(request)
    if (response.ok) {
      cache.put(request, response.clone())
    }
    return response
  } catch (error) {
    console.error('Fetch failed:', error)
    throw error
  }
}

// NetworkFirst strategy - for API calls
async function networkFirst(request, cacheName) {
  const cache = await caches.open(cacheName)
  
  try {
    const response = await fetch(request)
    if (response.ok) {
      cache.put(request, response.clone())
    }
    return response
  } catch (error) {
    const cached = await cache.match(request)
    if (cached) {
      return cached
    }
    throw error
  }
}

// Error handling
self.addEventListener('error', (event) => {
  console.error('Service Worker error:', event.error)
})

self.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection in SW:', event.reason)
})
