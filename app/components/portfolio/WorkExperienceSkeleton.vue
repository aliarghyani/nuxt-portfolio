<template>
  <section class="py-6">
    <UContainer>
      <div class="flex items-center gap-3 mb-6">
        <div class="skeleton-icon"></div>
        <div class="skeleton-title"></div>
      </div>
      <div class="max-w-3xl space-y-6">
        <div v-for="n in 3" :key="n" class="flex gap-4">
          <div class="skeleton-timeline-indicator"></div>
          <div class="flex-1 space-y-2">
            <div class="skeleton-job-title"></div>
            <div class="skeleton-company"></div>
            <div class="skeleton-description"></div>
            <div class="skeleton-description" style="width: 85%;"></div>
          </div>
        </div>
      </div>
    </UContainer>
  </section>
</template>

<style scoped>
.skeleton-icon,
.skeleton-title,
.skeleton-timeline-indicator,
.skeleton-job-title,
.skeleton-company,
.skeleton-description {
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
:global(.dark) .skeleton-timeline-indicator,
:global(.dark) .skeleton-job-title,
:global(.dark) .skeleton-company,
:global(.dark) .skeleton-description {
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

.skeleton-timeline-indicator {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
}

.skeleton-job-title {
  width: 12rem;
  height: 1.25rem;
}

.skeleton-company {
  width: 8rem;
  height: 1rem;
}

.skeleton-description {
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
