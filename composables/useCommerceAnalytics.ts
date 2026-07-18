import type {
  CommerceAnalyticsContext,
  CommerceAnalyticsEvent,
  CommerceAnalyticsPayload
} from '~/types/commerce'

const analyticsVersion = '1.0'

const toPostHogProperties = (payload: CommerceAnalyticsPayload) => {
  return {
    analytics_version: payload.analyticsVersion,
    source: 'commerce_growth_site',

    page_type: payload.context.page.pageType,
    event_prefix: payload.context.page.eventPrefix,
    page_slug: payload.context.page.slug,

    locale_market: payload.context.locale?.market,
    locale_region_label: payload.context.locale?.regionLabel,
    locale_language: payload.context.locale?.language,
    locale_language_label: payload.context.locale?.languageLabel,

    audience: payload.context.audience || payload.context.locale?.audiences || [],
    audience_label: payload.context.locale?.audienceLabel,

    ...payload.properties
  }
}

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

      const nuxtApp = useNuxtApp() as any
      const posthogClient = nuxtApp.$commercePosthog

      if (posthogClient) {
        posthogClient.capture(payload.event, toPostHogProperties(payload))
      }
    }

    return payload
  }

  return {
    track
  }
}
