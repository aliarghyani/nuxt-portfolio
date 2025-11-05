<template>
  <ClientOnly>
    <!-- Nuxt UI Select-based language picker -->
    <USelect v-model="model" :items="items" value-key="value" size="sm" color="primary" variant="soft"
      :highlight="false" arrow :trailing="true" placeholder="Language"
      class="px-1 w-[64px] sm:w-[76px] rounded-full ring-1 ring-gray-200/70 dark:ring-gray-700/60 backdrop-blur-md shadow-sm h-[25px]"
      :ui="{
        base: 'rounded-full',
        value: 'sr-only',
        trailingIcon: 'text-dimmed group-data-[state=open]:rotate-180 transition-transform duration-200',
        content: 'min-w-fit'
      }" aria-label="Language selector">

      <!-- Leading icon in trigger (already provided by :icon via selectedIcon) -->
      <template #leading="{ ui }">
        <UIcon :name="selectedIcon" class="text-[16px]" />
      </template>
      <template #item-leading="{ item }">
        <UIcon :name="item.icon" class="text-[16px]" />
      </template>
      <template #item-label="{ item }">
        <span>{{ item.label }}</span>
      </template>
    </USelect>
  </ClientOnly>
</template>

<script setup lang="ts">
import { ref, computed, watch } from '#imports'
import { useLocaleSwitching, useLoadingIndicator } from '#imports'

const { locale, setLocale } = useI18n()

type LangValue = 'en' | 'fa'
type Item = { label: string; value: LangValue; icon: string }

const items = ref<Item[]>([
  { label: 'en', value: 'en', icon: 'i-twemoji-flag-united-states' },
  { label: 'fa', value: 'fa', icon: 'i-twemoji-flag-iran' }
])

const model = ref<LangValue>(locale.value as LangValue)

// Keep model in sync if locale changes elsewhere
watch(locale, (val) => {
  if ((val as LangValue) !== model.value) {
    model.value = val as LangValue
  }
})

const selectedIcon = computed<string>(() => items.value.find(i => i.value === model.value)?.icon ?? 'i-twemoji-flag-united-states')

const { startLocaleSwitching } = useLocaleSwitching()
const loading = useLoadingIndicator()

// On selection change, run visual feedback and update i18n
watch(model, (val, oldVal) => {
  if (val === oldVal) return
  startLocaleSwitching(600)
  if (loading) {
    loading.start()
    setTimeout(() => loading.finish(), 600)
  }
  setLocale(val)
})
</script>
