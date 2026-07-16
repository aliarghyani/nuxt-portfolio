import type { BlogPost } from '~/types/blog'

export function useBlog() {
  const { locale } = useI18n()

  /**
   * Calculate reading time from word count
   * @param content - Blog post content
   * @returns Reading time in minutes
   */
  const calculateReadingTime = (content: any): number => {
    const body = content?.body
    if (!body) return 0

    const extractText = (node: any): string => {
      if (typeof node === 'string') return node

      if (Array.isArray(node)) {
        // Nuxt Content v3 uses minimark nodes shaped as [tag, attributes, ...children].
        const children = typeof node[0] === 'string' && typeof node[1] === 'object'
          ? node.slice(2)
          : node
        return children.map(extractText).join(' ')
      }

      if (node && typeof node === 'object') {
        if (typeof node.value === 'string') return node.value
        if (Array.isArray(node.children)) return node.children.map(extractText).join(' ')
      }

      return ''
    }

    // Support both Nuxt Content v3 minimark and the legacy children-based AST.
    const text = extractText(body.value ?? body.children).trim()
    if (!text) return 0

    const wordCount = text.split(/\s+/u).length
    return Math.max(1, Math.ceil(wordCount / 200)) // 200 words per minute
  }

  /**
   * Format date for display
   * @param dateString - ISO 8601 date string
   * @returns Formatted date string
   */
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat(locale.value, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date)
  }

  /**
   * Get all unique tags from posts
   * @param posts - Array of blog posts
   * @returns Sorted array of unique tags
   */
  const extractUniqueTags = (posts: BlogPost[]): string[] => {
    const tagSet = new Set<string>()
    posts.forEach(post => {
      post.tags?.forEach(tag => tagSet.add(tag))
    })
    return Array.from(tagSet).sort()
  }

  /**
   * Get blog path for current locale
   * @returns Locale-aware blog path
   */
  const getBlogPath = (): string => {
    return `${locale.value}/blog`
  }

  /**
   * Filter posts by search query
   */

  const filterPostsBySearch = (posts: BlogPost[], query: string): BlogPost[] => {
    if (!query) return posts

    const lowerQuery = query.toLowerCase()
    return posts.filter(post =>
      post.title?.toLowerCase().includes(lowerQuery) ||
      post.description?.toLowerCase().includes(lowerQuery) ||
      post.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))
    )
  }

  /**
   * Filter posts by tag
   * @param posts - Array of blog posts
   * @param tag - Tag to filter by
   * @returns Filtered array of posts
   */
  const filterPostsByTag = (posts: BlogPost[], tag: string | null): BlogPost[] => {
    if (!tag) return posts
    return posts.filter(post => post.tags?.includes(tag))
  }

  return {
    calculateReadingTime,
    formatDate,
    extractUniqueTags,
    getBlogPath,
    filterPostsBySearch,
    filterPostsByTag
  }
}
