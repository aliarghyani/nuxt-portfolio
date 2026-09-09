<template>
  <UInput :model-value="modelValue" :placeholder="t('blog.searchPlaceholder')" icon="i-heroicons-magnifying-glass"
    size="lg" @update:model-value="handleInput">
    <template v-if="modelValue" #trailing>
      <UButton color="neutral" variant="link" icon="i-heroicons-x-mark-20-solid" :padded="false" @click="clearSearch" />
    </template>
  </UInput>
</template>

<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core'

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const { t } = useI18n()

// Debounced input handler
const debouncedEmit = useDebounceFn((value: string) => {
  emit('update:modelValue', value)
}, 300)

const handleInput = (value: string) => {
  debouncedEmit(value)
}

const clearSearch = () => {
  emit('update:modelValue', '')
}
</script>
