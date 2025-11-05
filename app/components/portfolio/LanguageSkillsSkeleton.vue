<template>
  <section class="py-6">
    <UContainer>
      <div class="flex items-center gap-3 mb-4">
        <div class="skeleton-icon"></div>
        <div class="skeleton-title"></div>
      </div>

      <UCard>
        <div class="space-y-6">
          <div class="flex flex-wrap items-center justify-between gap-4">
            <div class="skeleton-tagline"></div>
            <div class="skeleton-badge-large"></div>
          </div>

          <div class="grid gap-4 md:grid-cols-2">
            <div v-for="n in 2" :key="n"
              class="flex flex-col gap-2 rounded-lg border border-slate-200/80 p-3 dark:border-slate-700/60">
              <div class="flex items-center gap-2">
                <div class="skeleton-lang-icon"></div>
                <div class="skeleton-lang-title"></div>
              </div>
              <div class="skeleton-lang-description"></div>
            </div>
          </div>
        </div>
      </UCard>
    </UContainer>
  </section>
</template>

<style scoped>
.skeleton-icon,
.skeleton-title,
.skeleton-tagline,
.skeleton-badge-large,
.skeleton-lang-icon,
.skeleton-lang-title,
.skeleton-lang-description {
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
:global(.dark) .skeleton-tagline,
:global(.dark) .skeleton-badge-large,
:global(.dark) .skeleton-lang-icon,
:global(.dark) .skeleton-lang-title,
:global(.dark) .skeleton-lang-description {
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
  width: 8rem;
  height: 1.5rem;
}

.skeleton-tagline {
  width: 20rem;
  height: 1rem;
}

.skeleton-badge-large {
  width: 10rem;
  height: 2rem;
  border-radius: 9999px;
}

.skeleton-lang-icon {
  width: 1.5rem;
  height: 1.5rem;
}

.skeleton-lang-title {
  width: 8rem;
  height: 1rem;
}

.skeleton-lang-description {
  width: 100%;
  height: 0.875rem;
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
