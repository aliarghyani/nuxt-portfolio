<template>
  <div class="layout-default" :key="layoutKey">
    <a href="#main-content" class="skip-link">{{ t("nav.skipToContent") }}</a>
    <TopNav />
    <main id="main-content" tabindex="-1">
      <slot />
    </main>
    <FooterCopyright />
  </div>
</template>

<script setup lang="ts">
import TopNav from "@/components/common/TopNav.vue";
import FooterCopyright from "@/components/common/FooterCopyright.vue";

/**
 * Default Layout
 *
 * Main layout for the application including TopNav and Footer.
 * This layout is used by default for all pages unless specified otherwise.
 */

const route = useRoute();
const { t } = useI18n();

// Force re-render when navigating back from pages with layout: false
const layoutKey = computed(() => route.fullPath);
</script>

<style scoped>
.layout-default {
  /* Layout wrapper */
}
</style>
