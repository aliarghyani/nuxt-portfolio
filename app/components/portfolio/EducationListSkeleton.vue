<template>
  <section class="py-6">
    <UContainer>
      <div class="flex items-center gap-3 mb-3">
        <div class="skeleton-icon"></div>
        <div class="skeleton-title"></div>
      </div>
      <div class="space-y-4">
        <UCard v-for="n in 2" :key="n" class="border border-gray-200/60 shadow-none dark:border-gray-700/40">
          <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div class="flex items-start gap-3 space-y-1">
              <div class="skeleton-edu-logo"></div>
              <div class="space-y-2">
                <div class="skeleton-edu-school"></div>
                <div class="skeleton-edu-degree"></div>
                <div class="skeleton-edu-date"></div>
              </div>
            </div>
            <div class="flex shrink-0 flex-wrap items-center gap-1">
              <div v-for="i in 3" :key="i" class="skeleton-edu-icon"></div>
            </div>
          </div>
        </UCard>
      </div>
    </UContainer>
  </section>
</template>

<style scoped>
.skeleton-icon,
.skeleton-title,
.skeleton-edu-logo,
.skeleton-edu-school,
.skeleton-edu-degree,
.skeleton-edu-date,
.skeleton-edu-icon {
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
:global(.dark) .skeleton-edu-logo,
:global(.dark) .skeleton-edu-school,
:global(.dark) .skeleton-edu-degree,
:global(.dark) .skeleton-edu-date,
:global(.dark) .skeleton-edu-icon {
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
  width: 10rem;
  height: 1.5rem;
}

.skeleton-edu-logo {
  width: 3rem;
  height: 3rem;
  border-radius: 0.5rem;
}

.skeleton-edu-school {
  width: 12rem;
  height: 1rem;
}

.skeleton-edu-degree {
  width: 10rem;
  height: 0.875rem;
}

.skeleton-edu-date {
  width: 8rem;
  height: 0.75rem;
}

.skeleton-edu-icon {
  width: 1.25rem;
  height: 1.25rem;
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
