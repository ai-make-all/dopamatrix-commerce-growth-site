import type { CommerceLocaleContext, CommerceMarket } from '~/types/commerce'

type CommerceMarketContext = Pick<CommerceLocaleContext, 'market' | 'regionLabel'>

export const commerceMarkets: Record<CommerceMarket, CommerceMarketContext> = {
  philippines: {
    market: 'philippines',
    regionLabel: 'Philippines'
  },
  southeast_asia: {
    market: 'southeast_asia',
    regionLabel: 'Southeast Asia'
  }
}

export const defaultCommerceLocale: CommerceLocaleContext = {
  ...commerceMarkets.southeast_asia,
  language: 'zh',
  languageLabel: 'Chinese + English',
  audience: 'home',
  audienceLabel: 'General Commerce'
}
