import type {
  CommerceAnalyticsContext,
  CommerceAnalyticsEvent,
  CommerceAnalyticsPayload
} from '~/types/commerce'

const analyticsVersion = '1.0'

export const useCommerceAnalytics = () => {
  const track = (
    event: CommerceAnalyticsEvent,
    context: CommerceAnalyticsContext,
    properties: Record<string, unknown> = {}
  ): CommerceAnalyticsPayload => {
    const normalizedContext: CommerceAnalyticsContext = {
      ...context,
      audience: context.audience || context.locale?.audiences
    }

    const payload: CommerceAnalyticsPayload = {
      event,
      timestamp: new Date().toISOString(),
      analyticsVersion,
      context: normalizedContext,
      properties
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
