// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: 'app',

  // Enable View Transitions API for smooth page transitions
  experimental: {
    viewTransition: true
  },

  // Configure page and layout transitions
  app: {
    baseURL: '/',
    buildAssetsDir: '/_nuxt/',
    cdnURL: '/',
    pageTransition: {
      name: 'page',
      mode: 'out-in'
    },
    layoutTransition: {
      name: 'layout',
      mode: 'out-in'
    }
  },

  modules: [
    '@nuxt/content',
    '@nuxt/fonts',
    '@nuxt/ui',
    '@nuxtjs/i18n',
    '@nuxtjs/color-mode',
    '@nuxt/image',
    '@nuxtjs/sitemap'
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
    }
  },
  fonts: {
    defaults: {
      preload: true,
      weights: [300, 400, 500, 600, 700],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: {
        'sans-serif': ['system-ui', 'Segoe UI', 'sans-serif'],
        serif: ['Georgia', 'Times New Roman', 'serif']
      }
    },
    families: [
      { name: 'Fraunces', provider: 'google', weights: [600, 700] },
      { name: 'Inter', provider: 'google', weights: [400, 500, 600, 700] },
      { name: 'Outfit', provider: 'google', weights: [300, 400, 500, 600, 700] }
    ]
  },

  runtimeConfig: {
    public: {
      loadPlausible: "", // overrided by env,
      siteUrl: 'https://aliarghyani.vercel.app' // Used for sitemap and RSS generation
    },
  },

  // Site configuration for sitemap
  site: {
    url: 'https://aliarghyani.vercel.app'
  } as any,

  // Sitemap configuration
  sitemap: {
    gzip: true,
    exclude: [],
    defaults: {
      changefreq: 'monthly',
      priority: 0.8
    }
  } as any,

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
    formats: ['webp', 'jpg']
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

  // Prerender blog routes
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/blog', '/fa/blog'],
      failOnError: false,
      ignore: ['/_vercel/image']
    },
  },



  // Route rules for caching and optimization
  routeRules: {
    // Blog routes caching
    '/blog': { swr: 3600 },
    '/fa/blog': { swr: 3600 },
    '/blog/**': { swr: 3600 },
    '/fa/blog/**': { swr: 3600 }
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
