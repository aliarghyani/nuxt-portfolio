import { useState } from '#imports'

export function useLocaleSwitching() {
  const isLocaleSwitching = useState<boolean>('is-locale-switching', () => false)

  let timer: number | null = null

  const startLocaleSwitching = (duration = 600) => {
    if (!import.meta.client) return
    isLocaleSwitching.value = true
    document.documentElement.classList.add('locale-switching')
    if (timer) {
      window.clearTimeout(timer)
      timer = null
    }
    timer = window.setTimeout(() => {
      isLocaleSwitching.value = false
      document.documentElement.classList.remove('locale-switching')
      timer = null
    }, duration)
  }

  return {
    isLocaleSwitching,
    startLocaleSwitching
  }
}
