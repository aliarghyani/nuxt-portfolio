<template>
  <section class="py-6 min-h-[140rem]">
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
.skeleton-icon {
  width: 2rem;
  height: 2rem;
  min-height: 2rem;
  min-width: 2rem;
}

.skeleton-title {
  width: 10rem;
  height: 1.5rem;
  min-height: 1.5rem;
}

.skeleton-timeline-indicator {
  width: 2.5rem;
  height: 2.5rem;
  min-height: 2.5rem;
  min-width: 2.5rem;
  border-radius: 50%;
  aspect-ratio: 1/1;
}

.skeleton-job-title {
  width: 12rem;
  height: 1.25rem;
  min-height: 1.25rem;
}

.skeleton-company {
  width: 8rem;
  height: 1rem;
  min-height: 1rem;
}

.skeleton-description {
  width: 100%;
  height: 0.875rem;
  min-height: 0.875rem;
}
</style>
