<template>
  <section class="pt-20 pb-10">
    <UContainer>
      <div class="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p
            class="text-sm uppercase tracking-wide text-primary-500 dark:text-primary-300"
          >
            {{ t("blog.explore") }}
          </p>
          <h1 class="text-3xl font-semibold">{{ t("sections.blog") }}</h1>
        </div>
      </div>

      <BlogSearch v-model="searchQuery" />

      <BlogTagFilter v-model="selectedTag" :tags="allTags" class="my-6" />

      <div
        v-if="filteredPosts.length > 0"
        class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        <BlogCard
          v-for="post in filteredPosts"
          :key="(post as any).path"
          :post="post"
        />
      </div>

      <BlogEmpty v-else />
    </UContainer>
  </section>
</template>

<script setup lang="ts">
import type { BlogPost } from "~/types/blog";

const { t, locale } = useI18n();
const localePath = useLocalePath();
const { absoluteUrl, languageLinks } = usePortfolioSeo();
useSeoMeta({
  title: () =>
    `${t("blog.title")} — ${locale.value === "fa" ? "علی ارغیانی" : "Ali Arghyani"}`,
  description: () => t("blog.metaDescription"),
  ogTitle: () => `${t("blog.title")} — Ali Arghyani`,
  ogDescription: () => t("blog.metaDescription"),
  ogUrl: () => absoluteUrl(localePath("/blog")),
  ogType: "website",
  ogLocale: () => (locale.value === "fa" ? "fa_IR" : "en_US"),
  ogImage: absoluteUrl("/img/portfolio-og.png"),
  twitterCard: "summary_large_image",
  twitterTitle: () => `${t("blog.title")} — Ali Arghyani`,
  twitterDescription: () => t("blog.metaDescription"),
  twitterImage: absoluteUrl("/img/portfolio-og.png"),
});
useHead(() => ({
  link: [
    { rel: "canonical", href: absoluteUrl(localePath("/blog")) },
    ...languageLinks({ en: "/blog", fa: "/fa/blog" }),
  ],
}));
const { extractUniqueTags, filterPostsBySearch, filterPostsByTag } = useBlog();

// Fetch posts using queryCollection (Nuxt Content v3 API)
const { data: posts } = await useAsyncData<any[]>(
  () => `blog-posts-${locale.value}`,
  async () => {
    try {
      // Use queryCollection for Nuxt Content v3
      const result = await queryCollection("blog").all();

      if (!result || result.length === 0) {
        return [];
      }

      // Filter by locale and draft status, then sort by date
      return result
        .filter(
          (post: any) =>
            post.path?.startsWith(`/${locale.value}/blog/`) &&
            post.draft !== true,
        )
        .sort(
          (a: any, b: any) =>
            new Date(b.date).getTime() - new Date(a.date).getTime(),
        );
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      return [];
    }
  },
  {
    default: () => [],
    watch: [locale],
    server: true,
    lazy: false,
  },
);

// Extract unique tags from all posts
const allTags = computed(() => {
  return posts.value && Array.isArray(posts.value)
    ? extractUniqueTags(posts.value)
    : [];
});

// Reactive refs for search and filter
const searchQuery = ref("");
const selectedTag = ref<string | null>(null);

// Filtered posts based on search and tag
const filteredPosts = computed<BlogPost[]>(() => {
  if (!posts.value || !Array.isArray(posts.value) || posts.value.length === 0)
    return [];

  let filtered: BlogPost[] = [...posts.value];
  filtered = filterPostsBySearch(filtered, searchQuery.value);
  filtered = filterPostsByTag(filtered, selectedTag.value);

  return filtered;
});
</script>
