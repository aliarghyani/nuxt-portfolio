<template>
  <div class="layout-default">
    <a href="#main-content" class="skip-link">{{ t("nav.skipToContent") }}</a>
    <TopNav />
    <main id="main-content" tabindex="-1">
      <slot />
    </main>
    <FooterCopyright />
    <BottomNav />
  </div>
</template>

<script setup lang="ts">
import TopNav from "@/components/common/TopNav.vue";
import BottomNav from "@/components/common/BottomNav.vue";
import FooterCopyright from "@/components/common/FooterCopyright.vue";

/**
 * Default Layout
 *
 * Main layout for the application including TopNav and Footer.
 * This layout is used by default for all pages unless specified otherwise.
 */

const { t } = useI18n();
</script>

<style scoped>
.layout-default {
  /* Layout wrapper */
}
</style>
