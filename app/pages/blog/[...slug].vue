<script setup lang="ts">
const { locale, t } = useI18n()
const localePath = useLocalePath()
const route = useRoute()

const slugParts = computed(() => {
  const raw = route.params.slug
  const parts = Array.isArray(raw) ? raw : [raw]
  return parts.filter((p): p is string => typeof p === 'string' && p.length > 0)
})

// Fetch current post
const { data: post, error: postError } = await useAsyncData(
  () => `blog-post-${locale.value}-${slugParts.value.join('/')}`,
  async () => {
    return await queryCollection('blog')
      .where('path', '=', `/${locale.value}/blog/${slugParts.value.join('/')}`)
      .first()
  },
  {
    watch: [locale, slugParts],
    server: true
  }
)

if (process.server && (!post.value || postError.value)) {
  throw createError({
    statusCode: 404,
    message: 'Blog post not found',
    fatal: true
  })
}

// Fetch all posts for prev/next navigation
const { data: allPosts } = await useAsyncData(
  () => `blog-posts-nav-${locale.value}`,
  async () => {
    const posts = await queryCollection('blog')
      .where('draft', '<>', true)
      .order('date', 'DESC')
      .all()

    // Filter by locale and posts without draft field
    return posts.filter((p: any) =>
      p.path?.startsWith(`/${locale.value}/blog/`) &&
      (p.draft === false || p.draft === undefined)
    )
  },
  {
    watch: [locale],
    server: true
  }
)

// Calculate adjacent posts
const currentIndex = computed(() => {
  if (!allPosts.value || !post.value) return -1
  return allPosts.value.findIndex((p: any) => p.path === post.value!.path)
})

const prevPost = computed(() => {
  if (currentIndex.value === -1 || !allPosts.value) return null
  return allPosts.value[currentIndex.value + 1] || null
})

const nextPost = computed(() => {
  if (currentIndex.value === -1 || !allPosts.value) return null
  return allPosts.value[currentIndex.value - 1] || null
})

// SEO meta tags
const siteUrl = 'https://aliarghyani.vercel.app' // TODO: Move to runtime config
const defaultSocialImage = '/img/blog/default-cover.svg'

// Content paths include the locale, while public English routes omit the default-locale prefix.
// Persian routes must keep `/fa` so canonical and share URLs resolve to the localized post.
const getPublicBlogPath = (contentPath?: string) =>
  contentPath?.replace(/^\/en(?=\/)/, '') || ''

// Custom meta tags
if (post.value) {
  const postData = post.value as any
  const canonicalPath = getPublicBlogPath(postData.path)
  const canonicalUrl = canonicalPath ? `${siteUrl}${canonicalPath}` : siteUrl

  useSeoMeta({
    title: `${postData.title} | ${t('blog.title')}`,
    description: postData.description,
    ogTitle: postData.title,
    ogDescription: postData.description,
    ogImage: postData.image || defaultSocialImage,
    ogType: 'article',
    ogUrl: canonicalUrl,
    twitterCard: 'summary_large_image',
    twitterTitle: postData.title,
    twitterDescription: postData.description,
    twitterImage: postData.image || defaultSocialImage,
    articlePublishedTime: postData.date,
    articleModifiedTime: postData.updatedAt || postData.date,
    articleAuthor: [postData.author || 'Ali Arghyani'],
    articleTag: postData.tags
  })

  // JSON-LD structured data
  useHead({
    link: canonicalPath
      ? [
          {
            rel: 'canonical',
            href: canonicalUrl
          }
        ]
      : [],
    script: [
      {
        type: 'application/ld+json',
        textContent: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: postData.title,
          description: postData.description,
          image: postData.image
            ? `${siteUrl}${postData.image}`
            : `${siteUrl}${defaultSocialImage}`,
          datePublished: postData.date,
          dateModified: postData.updatedAt || postData.date,
          author: {
            '@type': 'Person',
            name: postData.author || 'Ali Arghyani'
          },
          publisher: {
            '@type': 'Person',
            name: 'Ali Arghyani'
          }
        })
      }
    ]
  })
}
</script>

<template>
  <UContainer>
    <div v-if="post" class="pt-24 pb-12">
      <!-- Breadcrumb Navigation -->
      <UBreadcrumb :links="[
        { label: t('nav.home'), to: localePath('/') },
        { label: t('blog.title'), to: localePath('/blog') },
        { label: (post as any).title }
      ]" class="mb-6" />

      <!-- Back to Blog Link -->
      <NuxtLink :to="localePath('/blog')"
        class="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors mb-8">
        <UIcon name="i-heroicons-arrow-left" class="w-4 h-4" />
        {{ t('blog.backToBlog') }}
      </NuxtLink>

      <!-- Mobile TOC -->
      <div v-if="(post as any).body?.toc?.links?.length" class="lg:hidden mb-8">
        <BlogTableOfContents :toc="(post as any).body.toc" :mobile="true" />
      </div>

      <!-- Main Content Layout -->
      <div class="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8 lg:gap-12">
        <!-- Main Content -->
        <div class="min-w-0 overflow-x-hidden">
          <!-- Blog Post Metadata -->
          <BlogPost :post="post" />

          <!-- Content Renderer -->
          <article :dir="locale === 'fa' ? 'rtl' : 'ltr'"
            :class="['blog-content', locale === 'fa' ? 'blog-content-rtl' : 'blog-content-ltr']"
            suppressHydrationWarning>
            <ContentRenderer v-if="(post as any).body" :value="(post as any).body" />
          </article>

          <!-- Share Buttons -->
          <BlogShare :title="(post as any).title"
            :url="`${siteUrl}${getPublicBlogPath((post as any).path)}`" />

          <!-- Blog Navigation (Prev/Next) -->
          <BlogNavigation :prev="prevPost" :next="nextPost" />
        </div>

        <!-- Sidebar: Table of Contents (Desktop) -->
        <aside v-if="(post as any).body?.toc?.links?.length" class="hidden lg:block">
          <div class="sticky top-24">
            <BlogTableOfContents :toc="(post as any).body.toc" />
          </div>
        </aside>
      </div>
    </div>
  </UContainer>
</template>
