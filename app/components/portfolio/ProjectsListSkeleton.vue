<template>
  <section class="py-6">
    <UContainer>
      <div class="flex items-center gap-3 mb-3">
        <div class="skeleton-icon"></div>
        <div class="skeleton-title"></div>
      </div>

      <div class="space-y-6">
        <div v-for="cat in 2" :key="cat" class="space-y-3">
          <div class="flex items-center gap-2">
            <div class="skeleton-category-icon"></div>
            <div class="skeleton-category-title"></div>
          </div>

          <div class="grid gap-4 md:grid-cols-2">
            <UCard v-for="n in 2" :key="n" class="flex h-full flex-col">
              <div class="flex gap-3">
                <div class="skeleton-project-thumbnail"></div>
                <div class="flex-1 space-y-3">
                  <div class="skeleton-project-title"></div>
                  <div class="skeleton-project-description"></div>
                  <div class="skeleton-project-description" style="width: 80%;"></div>
                </div>
              </div>
            </UCard>
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
  width: 8rem;
  height: 1.5rem;
  min-height: 1.5rem;
}

.skeleton-category-icon {
  width: 1.5rem;
  height: 1.5rem;
  min-height: 1.5rem;
  min-width: 1.5rem;
}

.skeleton-category-title {
  width: 10rem;
  height: 1.25rem;
  min-height: 1.25rem;
}

.skeleton-project-thumbnail {
  width: 3rem;
  height: 3rem;
  min-height: 3rem;
  min-width: 3rem;
  border-radius: 0.75rem;
  aspect-ratio: 1/1;
}

.skeleton-project-title {
  width: 10rem;
  height: 1.25rem;
  min-height: 1.25rem;
}

.skeleton-project-description {
  width: 100%;
  height: 0.875rem;
  min-height: 0.875rem;
}
</style>
