<template>
  <div class="layout-marketing">
    <!-- Marketing layout with centered content -->
    <div class="marketing-container">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * Marketing Layout
 * 
 * Example layout for marketing pages with centered content.
 * To use this layout in a page, add: definePageMeta({ layout: 'marketing' })
 * 
 * Learn more: https://nuxt.com/docs/guide/directory-structure/layouts
 */
</script>

<style scoped>
.layout-marketing {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.marketing-container {
  max-width: 1200px;
  width: 100%;
  padding: 2rem;
}
</style>
