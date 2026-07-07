export default defineNuxtConfig({
  ssr: true,

  modules: ['@nuxtjs/tailwindcss', '@vueuse/nuxt'],

  css: ['~/assets/css/tailwind.css'],

  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://dopamatrix.com',
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || '',
      posthogKey: process.env.NUXT_PUBLIC_POSTHOG_KEY || '',
      posthogHost: process.env.NUXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
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
