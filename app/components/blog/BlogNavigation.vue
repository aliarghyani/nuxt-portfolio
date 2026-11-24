<script setup lang="ts">
import type { BlogPost } from "~/types/blog";

const props = defineProps<{
  prev: BlogPost | null;
  next: BlogPost | null;
}>();

const { t, locale } = useI18n();
const localePath = useLocalePath();
const router = useRouter();

const postPath = (post: BlogPost) =>
  localePath(post.path.replace(/^\/(?:en|fa)(?=\/)/, ""));

function handleKeydown(event: KeyboardEvent) {
  if (
    event.defaultPrevented ||
    event.altKey ||
    event.ctrlKey ||
    event.metaKey ||
    event.shiftKey
  )
    return;

  const [previousKey, nextKey] =
    locale.value === "fa"
      ? ["ArrowRight", "ArrowLeft"]
      : ["ArrowLeft", "ArrowRight"];
  const post =
    event.key === previousKey
      ? props.prev
      : event.key === nextKey
        ? props.next
        : null;
  if (!post) return;

  event.preventDefault();
  router.push(postPath(post));
}
</script>

<template>
  <nav
    class="flex justify-between items-center gap-4 mt-12 pt-8 border-t border-gray-200 dark:border-gray-800"
    @keydown="handleKeydown"
  >
    <div class="flex-1">
      <UButton
        v-if="prev"
        :to="postPath(prev)"
        color="neutral"
        variant="ghost"
        size="lg"
        class="group w-full justify-start hover:scale-105 transition-transform duration-200"
      >
        <template #leading>
          <UIcon
            name="i-heroicons-arrow-left"
            class="w-5 h-5 rtl:rotate-180 group-hover:-translate-x-1 rtl:group-hover:translate-x-1 transition-transform duration-200"
          />
        </template>
        <div class="text-start">
          <div class="text-xs text-gray-500 dark:text-gray-400 mb-1">
            {{ t("blog.previousPost") }}
          </div>
          <div
            class="text-sm font-medium text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-1"
          >
            {{ prev.title }}
          </div>
        </div>
      </UButton>
    </div>

    <div class="flex-1">
      <UButton
        v-if="next"
        :to="postPath(next)"
        color="neutral"
        variant="ghost"
        size="lg"
        class="group w-full justify-end hover:scale-105 transition-transform duration-200"
      >
        <div class="text-end">
          <div class="text-xs text-gray-500 dark:text-gray-400 mb-1">
            {{ t("blog.nextPost") }}
          </div>
          <div
            class="text-sm font-medium text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-1"
          >
            {{ next.title }}
          </div>
        </div>
        <template #trailing>
          <UIcon
            name="i-heroicons-arrow-right"
            class="w-5 h-5 rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform duration-200"
          />
        </template>
      </UButton>
    </div>
  </nav>
</template>
