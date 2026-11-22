import { queryCollection } from '@nuxt/content/server'
import { SITE_URL } from '~~/shared/utils/site'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const locale = 'fa'

  // In Nitro server routes, `queryCollection` expects the H3 event as the first argument.
  const allPosts = await queryCollection(event, 'blog').all()

  const posts = allPosts
    .filter((post: any) => post.path?.startsWith('/fa/blog/') && post.draft !== true)
    .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const escapeXml = (str: string) => {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;')
  }

  const rssItems = posts
    .map((post) => {
      const link = `${SITE_URL}${post.path}`
      const pubDate = new Date(post.date).toUTCString()

      return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(link)}</link>
      <guid>${escapeXml(link)}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(post.description || '')}</description>
    </item>`
    })
    .join('')

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>وبلاگ - ${escapeXml(config.public.siteName || 'سایت من')}</title>
    <link>${SITE_URL}/fa/blog</link>
    <description>آخرین پست‌های وبلاگ</description>
    <language>${locale}</language>
    <atom:link href="${SITE_URL}/fa/blog/rss.xml" rel="self" type="application/rss+xml" />
    ${rssItems}
  </channel>
</rss>`

  event.node.res.setHeader('Content-Type', 'application/rss+xml; charset=utf-8')
  return rss
})
