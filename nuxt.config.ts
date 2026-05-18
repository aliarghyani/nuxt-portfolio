// https://nuxt.com/docs/api/configuration/nuxt-config
const isGenerate = process.env.npm_lifecycle_event === 'generate'

const prerenderIgnore = ['/_vercel/image']
// When generating a static site, we must not ignore internal endpoints/assets that the client fetches at runtime.
if (!isGenerate) prerenderIgnore.push('/_ipx', '/_nuxt', '/_i18n', '/__nuxt_content')

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

  devServer: {
    host: '0.0.0.0',
    port: 5000
  },
  fonts: {
    defaults: {
      preload: true,
      weights: [300, 400, 500, 600, 700, 800],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: {
        'sans-serif': ['system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        serif: ['Georgia', 'Times New Roman', 'serif']
      }
    },
    families: [
      { name: 'Geist', provider: 'google', weights: [400, 500, 600, 700] },
      { name: 'Space Grotesk', provider: 'google', weights: [500, 600, 700] },
      { name: 'DM Sans', provider: 'google', weights: [400, 500, 600, 700] }
    ]
  },

  runtimeConfig: {
    public: {
      loadPlausible: "", // overrided by env,
      siteName: 'AliArghyani',
      siteUrl: 'https://aliarghyani.vercel.app', // Used for sitemap and RSS generation
      githubToken: '' // GitHub API token - set via NUXT_PUBLIC_GITHUB_TOKEN env variable
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




  // Nuxt Content configuration
  content: {
    markdown: {
      mdc: true,
      toc: {
        depth: 3,
        searchDepth: 3
      }
    },
    documentDriven: false,
    respectPathCase: true
  } as any,

  i18n: {
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    locales: [
      { code: 'en', language: 'en-US', name: 'English', dir: 'ltr', file: 'en.json' },
      { code: 'fa', language: 'fa-IR', name: 'فارسی', dir: 'rtl', file: 'fa.json' },
    ],
    langDir: '../i18n/locales',
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
      routes: ['/', '/blog', '/fa/blog', '/blog/rss.xml', '/fa/blog/rss.xml'],
      failOnError: false,
      // Avoid crawling internal endpoints during SSR builds (speeds up builds significantly)
      ignore: prerenderIgnore
    },
    devProxy: {
      host: '0.0.0.0'
    }
  },



  // Route rules for caching and optimization
  routeRules: {
    // IMPORTANT:
    // Do NOT cache HTML pages for blog routes on Vercel/CDNs.
    // Caching `/blog` or `/blog/<slug>` can serve stale HTML that references old `/_nuxt/*.js` chunks,
    // causing client-side navigation to intermittently 404 until a refresh loads the new HTML.
    '/blog': { headers: { 'cache-control': 'no-store' } },
    '/fa/blog': { headers: { 'cache-control': 'no-store' } },
    '/blog/**': { headers: { 'cache-control': 'no-store' } },
    '/fa/blog/**': { headers: { 'cache-control': 'no-store' } },

    // These endpoints are safe to cache: they are versioned via query params/build ids.
    '/blog/_payload.json': { swr: 3600 },
    '/fa/blog/_payload.json': { swr: 3600 },
    '/blog/rss.xml': { swr: 3600 },
    '/fa/blog/rss.xml': { swr: 3600 }
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
