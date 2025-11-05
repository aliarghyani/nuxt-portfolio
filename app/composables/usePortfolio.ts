import type { Ref } from 'vue'
import type { PortfolioData } from '@/types/portfolio.types'
import en from '@/data/portfolio.en'
import fa from '@/data/portfolio.fa'

export function usePortfolio(): Ref<PortfolioData> {
  const { locale } = useI18n()
  return computed(() => (locale.value === 'fa' ? fa : en))
}
