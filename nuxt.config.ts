export default defineNuxtConfig({
  compatibilityDate: '2026-07-08',

  ssr: true,

  modules: ['@nuxtjs/tailwindcss', '@vueuse/nuxt'],

  css: ['~/assets/css/tailwind.css'],

  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://dopamatrix.com',
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || '',
      posthogKey: process.env.NUXT_PUBLIC_POSTHOG_KEY || '',
      posthogHost: process.env.NUXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
      posthogEnabled: process.env.NUXT_PUBLIC_POSTHOG_ENABLED === 'true',
      leadSubmitMode: process.env.NUXT_PUBLIC_LEAD_SUBMIT_MODE || 'mock',
      leadApiPath: process.env.NUXT_PUBLIC_LEAD_API_PATH || '/api/leads',
      whatsappUrl: process.env.NUXT_PUBLIC_WHATSAPP_URL || '',
      telegramUrl: process.env.NUXT_PUBLIC_TELEGRAM_URL || ''
    }
  },

  nitro: {
    prerender: {
      routes: [
        '/',
        '/use-cases/commerce-growth',
        '/use-cases/local-brands',
        '/use-cases/ecommerce-products',
        '/use-cases/b2b-leads'
      ]
    }
  },

  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        { name: 'theme-color', content: '#080A12' }
      ]
    }
  }
})
