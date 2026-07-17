<script setup lang="ts">
import type { CommerceAnalyticsContext } from '~/types/commerce'
import CommerceHero from '~/components/commerce/shared/CommerceHero.vue'
import { homeConfig as page } from '~/data/commerce'

useCommerceSeo(page.seo)

const analyticsContext: CommerceAnalyticsContext = {
  page: {
    pageType: page.pageType,
    eventPrefix: page.eventPrefix,
    slug: page.slug
  },
  locale: page.locale,
  audience: page.locale.audiences
}
const { track } = useCommerceAnalytics()

const routeCardMeta: Record<string, { href: string; targetRoute: string }> = {
  'Local Brands': {
    href: '/use-cases/local-brands',
    targetRoute: 'local_brands'
  },
  'E-commerce Products': {
    href: '/use-cases/ecommerce-products',
    targetRoute: 'ecommerce_products'
  },
  'B2B Leads': {
    href: '/use-cases/b2b-leads',
    targetRoute: 'b2b_leads'
  }
}

const routeCards = page.painPoints.map((item) => ({
  ...item,
  ...routeCardMeta[item.title]
}))

const trackRouteSelect = (targetRoute: string) => {
  track('commerce_route_select', analyticsContext, {
    routeType: targetRoute,
    routeSlug: routeCards.find((item) => item.targetRoute === targetRoute)?.href || ''
  })
}

onMounted(() => {
  track('commerce_page_view', analyticsContext, {
    pageTitle: page.seo.title,
    canonicalPath: page.seo.canonicalPath
  })
})
</script>

<template>
  <main class="min-h-screen overflow-hidden bg-dopa-bg">
    <CommerceHero
      :hero="page.hero"
      :locale="page.locale"
      :analytics-context="analyticsContext"
    />
    <section id="routes" class="mx-auto w-full max-w-6xl px-6 pb-16 sm:px-10">
      <div class="mt-4 inline-flex rounded-full border border-dopa-border bg-dopa-panel px-3 py-1 text-sm text-dopa-muted">
        选择你的增长路径
      </div>
      <div class="mt-14 grid gap-4 md:grid-cols-3">
        <NuxtLink
          v-for="item in routeCards"
          :key="item.title"
          :to="item.href"
          class="rounded-lg border border-dopa-border bg-dopa-panel p-5 transition hover:border-dopa-cyan/70"
          @click="trackRouteSelect(item.targetRoute)"
        >
          <h2 class="text-lg font-semibold text-dopa-text">
            {{ item.title }}
          </h2>
          <p class="mt-3 text-sm leading-6 text-dopa-muted">
            {{ item.description }}
          </p>
        </NuxtLink>
      </div>
    </section>
  </main>
</template>
