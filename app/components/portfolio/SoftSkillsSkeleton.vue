<template>
  <section class="py-6">
    <UContainer>
      <div class="flex items-center gap-3 mb-4">
        <div class="skeleton-icon"></div>
        <div class="skeleton-title"></div>
      </div>

      <UCard>
        <div class="flex flex-wrap gap-1.5">
          <div v-for="i in 9" :key="i" class="skeleton-badge"></div>
        </div>
      </UCard>
    </UContainer>
  </section>
</template>

<style scoped>
.skeleton-icon,
.skeleton-title,
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

.skeleton-badge {
  width: 7rem;
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
