export default defineI18nConfig(() => ({
  legacy: false,
  warnHtmlMessage: false,
  fallbackLocale: 'en',
  // Messages are loaded lazily from `langDir` configured in nuxt.config.ts
}))
