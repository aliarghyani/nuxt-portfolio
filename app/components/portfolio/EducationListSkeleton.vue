<template>
  <section class="py-6 min-h-[12rem]">
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

.skeleton-edu-logo {
  width: 3rem;
  height: 3rem;
  min-height: 3rem;
  min-width: 3rem;
  border-radius: 0.5rem;
  aspect-ratio: 1/1;
}

.skeleton-edu-school {
  width: 12rem;
  height: 1rem;
  min-height: 1rem;
}

.skeleton-edu-degree {
  width: 10rem;
  height: 0.875rem;
  min-height: 0.875rem;
}

.skeleton-edu-date {
  width: 8rem;
  height: 0.75rem;
  min-height: 0.75rem;
}

.skeleton-edu-icon {
  width: 1.25rem;
  height: 1.25rem;
  min-height: 1.25rem;
  min-width: 1.25rem;
}
</style>
