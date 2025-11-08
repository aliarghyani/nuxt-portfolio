<template>
  <section class="py-6 min-h-[42rem]">
    <UContainer>
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
        <div class="flex items-center gap-3">
          <div class="skeleton-icon"></div>
          <div class="skeleton-title"></div>
        </div>
      </div>

      <div class="grid gap-4 md:grid-cols-3">
        <UCard v-for="n in 3" :key="n">
          <template #header>
            <div class="skeleton-card-header"></div>
          </template>
          <div class="grid grid-cols-2 gap-2">
            <div v-for="i in 6" :key="i" class="skeleton-skill-item"></div>
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
  width: 6rem;
  height: 1rem;
  min-height: 1rem;
}

.skeleton-skill-item {
  width: 100%;
  height: 2rem;
  min-height: 2rem;
}
</style>
