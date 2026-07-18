import posthog from 'posthog-js'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const enabled = config.public.posthogEnabled === true
  const key = String(config.public.posthogKey || '')
  const host = String(config.public.posthogHost || 'https://us.i.posthog.com')

  if (!enabled || !key) {
    console.info('[PostHog Adapter] disabled')
    return {
      provide: {
        commercePosthog: null,
        commercePosthogReady: false
      }
    }
  }

  posthog.init(key, {
    api_host: host,
    capture_pageview: false,
    autocapture: false,
    disable_session_recording: true
  })

  console.info('[PostHog Adapter] initialized')

  return {
    provide: {
      commercePosthog: posthog,
      commercePosthogReady: true
    }
  }
})
