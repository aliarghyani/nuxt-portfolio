// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: 'app',
  modules: [
    '@nuxt/fonts',
    '@nuxt/ui',
    '@nuxtjs/i18n',
    '@nuxtjs/color-mode',
    '@nuxt/image'
  ],
  css: [
    '~/assets/css/main.css'
  ],
  postcss: {
    plugins: {
      '@csstools/postcss-oklab-function': { preserve: false },
      '@csstools/postcss-relative-color-syntax': { preserve: false },
      '@csstools/postcss-color-mix-function': { preserve: false },
      'postcss-preset-env': {
        stage: 0,
        features: {
          'nesting-rules': true
        }
      },
      autoprefixer: {}
    }
  },
  vite: {
    css: {
      lightningcss: {
        targets: {
          safari: 15
        }
      }
    },
    build: {
      // Enable code splitting for better caching
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            // Vendor chunks for better caching
            if (id.includes('node_modules')) {
              // Split large vendor libraries into separate chunks
              if (id.includes('@nuxt/ui')) {
                return 'vendor-nuxt-ui'
              }
              if (id.includes('vue') || id.includes('@vue')) {
                return 'vendor-vue'
              }
              if (id.includes('@nuxtjs/i18n')) {
                return 'vendor-i18n'
              }
              return 'vendor'
            }
          }
        }
      },
      // Minification settings
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: process.env.NODE_ENV === 'production',
          drop_debugger: process.env.NODE_ENV === 'production',
          pure_funcs: process.env.NODE_ENV === 'production' ? ['console.log', 'console.debug'] : []
        }
      },
      // Chunk size warnings
      chunkSizeWarningLimit: 500
    }
  },
  fonts: {
    defaults: {
      preload: true,
      weights: [400, 600],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: {
        'sans-serif': ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        serif: ['Georgia', 'Times New Roman', 'serif']
      }
    },
    families: [
      { name: 'Fraunces', provider: 'google', weights: [600] },
      { name: 'Inter', provider: 'google', weights: [400, 600] },
      { name: 'Outfit', provider: 'google', weights: [400, 600] }
    ]
  },

  runtimeConfig: {
    public: {
      loadPlausible: "", // overrided by env,
    },
  },

  image: {
    quality: 80,
    domains: [],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      '2xl': 1536
    },
    formats: ['webp', 'jpg', 'png']
  },
  typescript: {
    shim: false,
    tsConfig: {
      compilerOptions: {
        // https://nuxt.com/blog/v3-5#bundler-module-resolution
        moduleResolution: "bundler",
        paths: {
          "@": ["./app"],
          "@/*": ["./app/*"],
        },
      },
    },
  },

  colorMode: {
    classSuffix: "",
    preference: "dark",
    fallback: "dark",
    storageKey: "nuxt-color-mode",
  },

  //


  i18n: {
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    locales: [
      { code: 'en', language: 'en-US', name: 'English', dir: 'ltr', file: 'en.json' },
      { code: 'fa', language: 'fa-IR', name: 'فارسی', dir: 'rtl', file: 'fa.json' },
    ],
    langDir: 'locales',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      alwaysRedirect: false,
      redirectOn: 'root'
    },
    // Keep runtime vue-i18n options (legacy, warnings)
    vueI18n: '~/i18n.config.ts'
  },

  // Avoid Windows prerender issues and speed up local builds
  nitro: {
    prerender: {
      crawlLinks: false,
      routes: [],
    },
    // Enable compression for production
    compressPublicAssets: true,
    // Minify output
    minify: true,
  },

  // Build optimizations - Requirement 6.3
  build: {
    // Analyze bundle size (set to true to generate report)
    analyze: process.env.ANALYZE === 'true',
    // Transpile specific packages if needed
    transpile: []
  },

  // Experimental features for better performance
  experimental: {
    // Reduce payload size
    payloadExtraction: true,
    // View transitions API
    viewTransition: true
  },

  // Route rules for caching and optimization
  routeRules: {
    // Cache static pages
    '/': { 
      swr: 3600, // Stale-while-revalidate for 1 hour
      prerender: false 
    }
  },

  devtools: { enabled: false },
  compatibilityDate: "2024-07-10",

  components: {
    dirs: [
      {
        path: '~/components',
        pathPrefix: false
      }
    ]
  }
})
