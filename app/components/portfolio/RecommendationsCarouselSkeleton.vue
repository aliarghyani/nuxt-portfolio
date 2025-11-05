<template>
  <section class="py-8">
    <UContainer>
      <div class="flex flex-wrap items-center gap-3 mb-8">
        <div class="flex items-center gap-3 flex-1 min-w-0">
          <div class="skeleton-icon"></div>
          <div class="skeleton-title"></div>
        </div>
      </div>

      <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <div v-for="n in 3" :key="n"
          class="h-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 p-6 space-y-4">
          <!-- Header -->
          <div class="flex items-start gap-3">
            <div class="skeleton-rec-avatar"></div>
            <div class="flex-1 space-y-2">
              <div class="skeleton-rec-author"></div>
              <div class="skeleton-rec-title"></div>
            </div>
          </div>

          <!-- Meta Info -->
          <div class="flex items-center gap-2 pb-3 border-b border-gray-200 dark:border-gray-700">
            <div class="skeleton-rec-meta"></div>
            <div class="skeleton-rec-meta"></div>
          </div>

          <!-- Quote Content -->
          <div class="space-y-2 min-h-[120px]">
            <div class="skeleton-rec-text"></div>
            <div class="skeleton-rec-text"></div>
            <div class="skeleton-rec-text" style="width: 80%;"></div>
          </div>

          <!-- Footer Buttons -->
          <div class="flex items-center gap-2 pt-3 border-t border-gray-200 dark:border-gray-700">
            <div class="skeleton-rec-button"></div>
            <div class="skeleton-rec-button"></div>
          </div>
        </div>
      </div>
    </UContainer>
  </section>
</template>

<style scoped>
.skeleton-icon,
.skeleton-title,
.skeleton-rec-avatar,
.skeleton-rec-author,
.skeleton-rec-title,
.skeleton-rec-meta,
.skeleton-rec-text,
.skeleton-rec-button {
  background: linear-gradient(90deg,
      rgb(var(--color-gray-200)) 0%,
      rgb(var(--color-gray-100)) 50%,
      rgb(var(--color-gray-200)) 100%);
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
  border-radius: 0.375rem;
}

:global(.dark) .skeleton-icon,
:global(.dark) .skeleton-title,
:global(.dark) .skeleton-rec-avatar,
:global(.dark) .skeleton-rec-author,
:global(.dark) .skeleton-rec-title,
:global(.dark) .skeleton-rec-meta,
:global(.dark) .skeleton-rec-text,
:global(.dark) .skeleton-rec-button {
  background: linear-gradient(90deg,
      rgb(var(--color-gray-800)) 0%,
      rgb(var(--color-gray-700)) 50%,
      rgb(var(--color-gray-800)) 100%);
  background-size: 200% 100%;
}

.skeleton-icon {
  width: 2rem;
  height: 2rem;
}

.skeleton-title {
  width: 12rem;
  height: 1.5rem;
}

.skeleton-rec-avatar {
  width: 3rem;
  height: 3rem;
  border-radius: 0.5rem;
}

.skeleton-rec-author {
  width: 8rem;
  height: 0.875rem;
}

.skeleton-rec-title {
  width: 10rem;
  height: 0.75rem;
}

.skeleton-rec-meta {
  width: 5rem;
  height: 0.75rem;
}

.skeleton-rec-text {
  width: 100%;
  height: 0.875rem;
}

.skeleton-rec-button {
  flex: 1;
  height: 2rem;
  border-radius: 0.375rem;
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }

  100% {
    background-position: -200% 0;
  }
}
</style>
