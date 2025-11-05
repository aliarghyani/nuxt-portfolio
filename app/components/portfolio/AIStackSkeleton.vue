<template>
  <section class="py-6">
    <UContainer>
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
        <div class="flex items-center gap-3">
          <div class="skeleton-icon"></div>
          <div class="skeleton-title"></div>
        </div>
      </div>

      <div class="grid gap-4 md:grid-cols-3">
        <UCard class="md:col-span-3">
          <template #header>
            <div class="skeleton-card-header"></div>
          </template>
          <div class="flex flex-wrap gap-1.5">
            <div v-for="i in 12" :key="i" class="skeleton-badge"></div>
          </div>
        </UCard>
      </div>
    </UContainer>
  </section>
</template>

<style scoped>
.skeleton-icon,
.skeleton-title,
.skeleton-card-header,
.skeleton-badge {
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
:global(.dark) .skeleton-card-header,
:global(.dark) .skeleton-badge {
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

.skeleton-card-header {
  width: 10rem;
  height: 1rem;
}

.skeleton-badge {
  width: 5rem;
  height: 1.75rem;
  border-radius: 9999px;
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
