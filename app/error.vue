<template>
  <UApp>
    <div class="error-page">
      <UContainer>
        <div class="error-content">
          <!-- Animated Icon -->
          <div class="error-icon-wrapper">
            <div class="error-icon-bg"></div>
            <UIcon :name="errorIcon" class="error-icon" />
          </div>

          <!-- Status Code -->
          <h1 class="error-code">
            {{ statusCode }}
          </h1>

          <!-- Title -->
          <h2 class="error-title">
            {{ errorTitle }}
          </h2>

          <!-- Message -->
          <p class="error-message">
            {{ message }}
          </p>

          <!-- Actions -->
          <div class="error-actions">
            <UButton to="/" size="lg" color="primary" icon="i-heroicons-home" class="error-button">
              {{ $t('common.backToHome') }}
            </UButton>

            <UButton @click="handleGoBack" size="lg" color="gray" variant="ghost" icon="i-heroicons-arrow-left"
              class="error-button">
              {{ $t('common.goBack') }}
            </UButton>
          </div>

          <!-- Additional Help -->
          <UCard v-if="statusCode === 404" class="error-help">
            <template #header>
              <div class="flex items-center gap-2">
                <UIcon name="i-heroicons-light-bulb" class="text-primary" />
                <span class="font-semibold">{{ $t('error.helpTitle') }}</span>
              </div>
            </template>

            <ul class="error-suggestions">
              <li>{{ $t('error.suggestion1') }}</li>
              <li>{{ $t('error.suggestion2') }}</li>
              <li>{{ $t('error.suggestion3') }}</li>
            </ul>
          </UCard>
        </div>
      </UContainer>
    </div>
  </UApp>
</template>

<script setup lang="ts">
/**
 * Error Page
 * 
 * This page is displayed when an error occurs during rendering.
 * It handles both 404 (Not Found) and 500 (Server Error) cases.
 * 
 * Learn more: https://nuxt.com/docs/getting-started/error-handling
 */

interface ErrorProps {
  error: {
    statusCode: number
    statusMessage?: string
    message?: string
  }
}

const props = defineProps<ErrorProps>()
const { t } = useI18n()
const router = useRouter()

const statusCode = computed(() => props.error?.statusCode || 500)

const errorIcon = computed(() => {
  switch (statusCode.value) {
    case 404:
      return 'i-heroicons-magnifying-glass'
    case 403:
      return 'i-heroicons-lock-closed'
    case 500:
      return 'i-heroicons-exclamation-triangle'
    default:
      return 'i-heroicons-x-circle'
  }
})

const errorTitle = computed(() => {
  switch (statusCode.value) {
    case 404:
      return t('error.notFoundTitle')
    case 403:
      return t('error.forbiddenTitle')
    case 500:
      return t('error.serverErrorTitle')
    default:
      return t('error.defaultTitle')
  }
})

const message = computed(() => {
  if (props.error?.message) {
    return props.error.message
  }

  switch (statusCode.value) {
    case 404:
      return t('error.notFoundMessage')
    case 403:
      return t('error.forbiddenMessage')
    case 500:
      return t('error.serverErrorMessage')
    default:
      return t('error.defaultMessage')
  }
})

const handleGoBack = () => {
  if (window.history.length > 1) {
    router.back()
  } else {
    router.push('/')
  }
}
</script>

<style scoped>
.error-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
  background: linear-gradient(135deg, rgb(var(--color-gray-50)) 0%, rgb(var(--color-gray-100)) 100%);
}

:global(.dark) .error-page {
  background: linear-gradient(135deg, rgb(var(--color-gray-950)) 0%, rgb(var(--color-gray-900)) 100%);
}

.error-content {
  text-align: center;
  max-width: 600px;
  width: 100%;
  margin: auto !important;
  padding: 0 1rem;
  animation: fadeInUp 0.6s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.error-icon-wrapper {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
}

.error-icon-bg {
  position: absolute;
  width: 120px;
  height: 120px;
  background: rgb(var(--color-primary-500) / 0.1);
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {

  0%,
  100% {
    transform: scale(1);
    opacity: 0.5;
  }

  50% {
    transform: scale(1.1);
    opacity: 0.3;
  }
}

.error-icon {
  position: relative;
  font-size: 4rem;
  color: rgb(var(--color-primary-500));
  z-index: 1;
}

.error-code {
  font-size: 6rem;
  font-weight: 800;
  line-height: 1;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, rgb(var(--color-primary-500)), rgb(var(--color-primary-600)));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.error-title {
  font-size: 2rem !important;
  font-weight: 700 !important;
  margin-bottom: 1rem !important;
  color: rgb(var(--color-gray-900));
}

:global(.dark) .error-title {
  color: rgb(var(--color-gray-100));
}

.error-message {
  font-size: 1.125rem;
  line-height: 1.75;
  margin-bottom: 2.5rem !important;
  color: rgb(var(--color-gray-600));
}

:global(.dark) .error-message {
  color: rgb(var(--color-gray-400));
}

.error-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem !important;
  justify-content: center;
  margin-bottom: 3rem !important;
}

.error-button {
  min-width: 140px;
}

.error-help {
  margin-top: 0;
  text-align: start;
  animation: fadeIn 0.8s ease-out 0.3s both;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.error-suggestions {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.error-suggestions li {
  position: relative;
  padding-left: 2.5rem !important;
  padding-right: 1rem !important;
  color: rgb(var(--color-gray-700));
  line-height: 1.7;
  text-align: start;
}

:global(.dark) .error-suggestions li {
  color: rgb(var(--color-gray-300));
}

.error-suggestions li::before {
  content: "→";
  position: absolute;
  left: 0.75rem;
  top: 0;
  color: rgb(var(--color-primary-500));
  font-weight: 600;
  font-size: 1.1rem;
}

@media (max-width: 640px) {
  .error-code {
    font-size: 4rem;
  }

  .error-title {
    font-size: 1.5rem;
  }

  .error-message {
    font-size: 1rem;
  }

  .error-actions {
    flex-direction: column;
  }

  .error-button {
    width: 100%;
  }
}
</style>
