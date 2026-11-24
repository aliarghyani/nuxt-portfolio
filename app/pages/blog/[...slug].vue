<script setup lang="ts">
import { localizedBlogSlug } from "~~/shared/utils/blog";

const { locale, t } = useI18n();
const localePath = useLocalePath();
const route = useRoute();

const slugParts = computed(() => {
  const raw = route.params.slug;
  const parts = Array.isArray(raw) ? raw : [raw];
  return parts.filter(
    (p): p is string => typeof p === "string" && p.length > 0,
  );
});

// Fetch current post
const { data: post, error: postError } = await useAsyncData(
  () => `blog-post-${locale.value}-${slugParts.value.join("/")}`,
  async () => {
    const result = await queryCollection("blog")
      .where("path", "=", `/${locale.value}/blog/${slugParts.value.join("/")}`)
      .first();
    return result?.draft ? null : result;
  },
  {
    watch: [locale, slugParts],
    server: true,
  },
);

if (!post.value || postError.value) {
  throw createError({
    statusCode: 404,
    message: "Blog post not found",
    fatal: true,
  });
}

// Fetch all posts for prev/next navigation
const { data: allPosts } = await useAsyncData(
  () => `blog-posts-nav-${locale.value}`,
  async () => {
    const posts = await queryCollection("blog")
      .where("draft", "<>", true)
      .order("date", "DESC")
      .all();

    // Filter by locale and posts without draft field
    return posts.filter(
      (p: any) =>
        p.path?.startsWith(`/${locale.value}/blog/`) &&
        (p.draft === false || p.draft === undefined),
    );
  },
  {
    watch: [locale],
    server: true,
  },
);

// Calculate adjacent posts
const currentIndex = computed(() => {
  if (!allPosts.value || !post.value) return -1;
  return allPosts.value.findIndex((p: any) => p.path === post.value!.path);
});

const prevPost = computed(() => {
  if (currentIndex.value === -1 || !allPosts.value) return null;
  return allPosts.value[currentIndex.value + 1] || null;
});

const nextPost = computed(() => {
  if (currentIndex.value === -1 || !allPosts.value) return null;
  return allPosts.value[currentIndex.value - 1] || null;
});

const { absoluteUrl, languageLinks, personId } = usePortfolioSeo();
const getPublicBlogPath = (path?: string) =>
  path?.replace(/^\/en(?=\/)/, "") || "";
const canonicalUrl = computed(() =>
  absoluteUrl(getPublicBlogPath(post.value?.path)),
);
const socialImage = computed(() =>
  absoluteUrl(post.value?.image || "/img/portfolio-og.png"),
);
const socialTitle = computed(
  () => post.value?.socialTitle?.trim() || post.value?.title,
);
const authorName = computed(() => post.value?.author || "Ali Arghyani");
const authorId = computed(() =>
  ["Ali Arghyani", "علی ارغیانی"].includes(authorName.value)
    ? personId
    : undefined,
);

// Only advertise alternate articles that are actually published.
const { data: translations } = await useAsyncData(
  () => `blog-translations-${slugParts.value.join("/")}`,
  async () => {
    const slug = slugParts.value.join("/");
    const enSlug = localizedBlogSlug(slug, "en");
    const faSlug = localizedBlogSlug(slug, "fa");
    const matches = await queryCollection("blog")
      .where("path", "IN", [`/en/blog/${enSlug}`, `/fa/blog/${faSlug}`])
      .all();
    return matches.filter((item) => item.draft !== true);
  },
  { watch: [slugParts], default: () => [] },
);
const alternatePaths = computed(() =>
  Object.fromEntries(
    translations.value.map((item) => [
      item.path.startsWith("/fa/") ? "fa" : "en",
      getPublicBlogPath(item.path),
    ]),
  ),
);
useSeoMeta({
  title: () => `${post.value?.title} | ${t("blog.title")}`,
  description: () => post.value?.description,
  ogTitle: () => socialTitle.value,
  ogDescription: () => post.value?.description,
  ogImage: () => socialImage.value,
  ogType: "article",
  ogUrl: () => canonicalUrl.value,
  ogLocale: () => (locale.value === "fa" ? "fa_IR" : "en_US"),
  twitterCard: "summary_large_image",
  twitterTitle: () => socialTitle.value,
  twitterDescription: () => post.value?.description,
  twitterImage: () => socialImage.value,
  articlePublishedTime: () => post.value?.date,
  articleModifiedTime: () => post.value?.updatedAt || post.value?.date,
  articleAuthor: () => (authorId.value ? [authorId.value] : undefined),
  articleTag: () => post.value?.tags,
});
useHead(() => ({
  link: [
    { rel: "canonical", href: canonicalUrl.value },
    ...languageLinks(alternatePaths.value),
  ],
  script: [
    {
      type: "application/ld+json",
      textContent: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "@id": `${canonicalUrl.value}#article`,
        url: canonicalUrl.value,
        mainEntityOfPage: canonicalUrl.value,
        inLanguage: locale.value === "fa" ? "fa-IR" : "en-US",
        headline: post.value?.title,
        description: post.value?.description,
        image: socialImage.value,
        datePublished: post.value?.date,
        dateModified: post.value?.updatedAt || post.value?.date,
        author: {
          "@type": "Person",
          "@id": authorId.value,
          name: authorName.value,
        },
        publisher: { "@type": "Person", "@id": personId, name: "Ali Arghyani" },
      }).replace(/</g, "\\u003c"),
    },
  ],
}));
// Frontmatter supplies the page H1; remove its repeated Markdown title without editing authored files.
const articleBody = computed(() => {
  const body = post.value?.body;
  if (!body) return body;
  const textOf = (node: unknown): string => {
    if (typeof node === "string") return node;
    return Array.isArray(node) ? node.slice(2).map(textOf).join("") : "";
  };
  return {
    ...body,
    value: body.value.flatMap((node: any) => {
      if (!Array.isArray(node) || node[0] !== "h1") return [node];
      return textOf(node).trim() === post.value?.title?.trim()
        ? []
        : [["h2", ...node.slice(1)]];
    }),
  };
});
</script>

<template>
  <UContainer>
    <div v-if="post" class="pt-24 pb-12">
      <!-- Breadcrumb Navigation -->
      <UBreadcrumb
        :items="[
          { label: t('nav.home'), to: localePath('/') },
          { label: t('blog.title'), to: localePath('/blog') },
          { label: (post as any).title },
        ]"
        class="mb-6"
      />

      <!-- Back to Blog Link -->
      <NuxtLink
        :to="localePath('/blog')"
        class="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors mb-8"
      >
        <UIcon name="i-heroicons-arrow-left" class="w-4 h-4" />
        {{ t("blog.backToBlog") }}
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
          <article
            :dir="locale === 'fa' ? 'rtl' : 'ltr'"
            :class="[
              'blog-content',
              locale === 'fa' ? 'blog-content-rtl' : 'blog-content-ltr',
            ]"
            suppressHydrationWarning
          >
            <ContentRenderer v-if="articleBody" :value="articleBody" />
          </article>

          <!-- Share Buttons -->
          <BlogShare :title="(post as any).title" :url="canonicalUrl" />

          <!-- Blog Navigation (Prev/Next) -->
          <BlogNavigation :prev="prevPost" :next="nextPost" />
        </div>

        <!-- Sidebar: Table of Contents (Desktop) -->
        <aside
          v-if="(post as any).body?.toc?.links?.length"
          class="hidden lg:block"
        >
          <div class="sticky top-24">
            <BlogTableOfContents :toc="(post as any).body.toc" />
          </div>
        </aside>
      </div>
    </div>
  </UContainer>
</template>
