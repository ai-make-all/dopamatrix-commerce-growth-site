import type {
  CommerceAnalyticsEvent,
  CommerceAnalyticsPageContext,
  CommerceAnalyticsPayload,
  CommerceLocaleContext
} from '~/types/commerce'

type CommerceAnalyticsTrackInput = {
  page: CommerceAnalyticsPageContext
  locale?: CommerceLocaleContext
  properties?: Record<string, unknown>
  timestamp?: string
}

export const useCommerceAnalytics = () => {
  const track = (
    event: CommerceAnalyticsEvent,
    input: CommerceAnalyticsTrackInput
  ): CommerceAnalyticsPayload => {
    const payload: CommerceAnalyticsPayload = {
      event,
      page: input.page,
      locale: input.locale,
      properties: input.properties || {},
      timestamp: input.timestamp || new Date().toISOString()
    }

    if (import.meta.client) {
      console.log('[Commerce Analytics]', payload)
    }

    return payload
  }

  return {
    track
  }
}
