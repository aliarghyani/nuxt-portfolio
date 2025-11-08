<template>
  <section class="py-6 min-h-[26rem]">
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

.skeleton-card-header {
  width: 10rem;
  height: 1rem;
  min-height: 1rem;
}

.skeleton-badge {
  width: 5rem;
  height: 1.75rem;
  min-height: 1.75rem;
  border-radius: 9999px;
}
</style>
