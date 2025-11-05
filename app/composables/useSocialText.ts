/**
 * Social text utilities for localized, consistent labels.
 * Generates LinkedIn button labels like:
 * - en: "amir's linkedin" (lowercased first name with apostrophe)
 * - fa: "لینکدین امیر"
 */

export function getFirstName(fullName: string): string {
  if (!fullName) return ''
  // Take first token, strip trailing punctuation and leading @
  const first = (fullName.trim().split(/\s+/)[0] || '')
    .replace(/[.,\-]+$/g, '')
    .replace(/^@/, '')

  return first
}

export function useSocialText() {
  // i18n is auto-imported by Nuxt (via #imports)
  const { locale } = useI18n()

  /**
   * Build a localized LinkedIn label using first name.
   * - en: "{firstname}'s linkedin" all lowercase
   * - fa: "لینکدین {firstname}"
   */
  const linkedinText = (author: string): string => {
    const first = getFirstName(author)
    if (locale.value === 'fa') {
      // Persian phrasing with provided first name as-is (data uses Latin names)
      return `لینکدین ${first}`
    }
    // English lowercased per spec and with apostrophe
    return `${first.toLowerCase()}'s linkedin`
  }

  return {
    linkedinText
  }
}
