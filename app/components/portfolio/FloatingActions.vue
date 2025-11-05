<template>
  <div class="pointer-events-none hidden lg:block">
    <div class="fixed left-4 bottom-4 z-40 pointer-events-auto">
      <UButton :to="localePath('/blog')" color="primary" icon="i-twemoji-newspaper" variant="soft"
        class="shadow-lg cursor-pointer">
        {{ t('buttons.blog') }}
      </UButton>
    </div>

  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
</script>
