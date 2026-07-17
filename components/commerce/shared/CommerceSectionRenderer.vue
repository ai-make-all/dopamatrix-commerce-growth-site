<script setup lang="ts">
import type { CommerceAnalyticsPageContext, CommerceSectionItem } from '~/types/commerce'

const props = defineProps<{
  title: string
  items: CommerceSectionItem[]
  description?: string
  links?: Record<string, string>
  analyticsContext?: CommerceAnalyticsPageContext
}>()

const getItemHref = (item: CommerceSectionItem) => props.links?.[item.title]

const routeTargetByHref: Record<string, string> = {
  '/use-cases/local-brands': 'local_brands',
  '/use-cases/ecommerce-products': 'ecommerce_products',
  '/use-cases/b2b-leads': 'b2b_leads'
}

const { track } = useCommerceAnalytics()

const trackRouteSelect = (href?: string) => {
  if (!props.analyticsContext || !href) {
    return
  }

  const targetRoute = routeTargetByHref[href]

  if (!targetRoute) {
    return
  }

  track('commerce_route_select', {
    page: props.analyticsContext,
    properties: {
      targetRoute
    }
  })
}
</script>

<template>
  <section v-if="props.items.length" class="mx-auto max-w-6xl px-6 py-10 sm:px-10">
    <h2 class="text-2xl font-semibold text-dopa-text">
      {{ title }}
    </h2>
    <p v-if="description" class="mt-3 max-w-3xl text-sm leading-6 text-dopa-muted">
      {{ description }}
    </p>
    <div class="mt-5 grid gap-4 md:grid-cols-3">
      <template v-for="item in items" :key="item.title">
        <NuxtLink
          v-if="getItemHref(item)"
          :to="getItemHref(item)"
          class="rounded-lg border border-dopa-border bg-dopa-card p-5 transition hover:border-dopa-cyan/70"
          @click="trackRouteSelect(getItemHref(item))"
        >
          <h3 class="text-lg font-semibold text-dopa-text">
            {{ item.title }}
          </h3>
          <p class="mt-3 text-sm leading-6 text-dopa-muted">
            {{ item.description }}
          </p>
        </NuxtLink>
        <article v-else class="rounded-lg border border-dopa-border bg-dopa-card p-5">
          <h3 class="text-lg font-semibold text-dopa-text">
            {{ item.title }}
          </h3>
          <p class="mt-3 text-sm leading-6 text-dopa-muted">
            {{ item.description }}
          </p>
        </article>
      </template>
    </div>
  </section>
</template>
