<script setup lang="ts">
import type { CommerceAnalyticsPageContext } from '~/types/commerce'
import CommerceDemoPreview from '~/components/commerce/shared/CommerceDemoPreview.vue'
import CommerceHero from '~/components/commerce/shared/CommerceHero.vue'
import CommerceLeadCapture from '~/components/commerce/shared/CommerceLeadCapture.vue'
import CommerceSectionRenderer from '~/components/commerce/shared/CommerceSectionRenderer.vue'
import { ecommerceProductsConfig as page, ecommerceProductsSectionGroups } from '~/data/commerce'

useCommerceSeo(page.seo)
const sectionGroups = ecommerceProductsSectionGroups
const analyticsContext: CommerceAnalyticsPageContext = {
  pageType: page.pageType,
  eventPrefix: page.eventPrefix,
  slug: page.slug
}
const { track } = useCommerceAnalytics()

onMounted(() => {
  track('commerce_page_view', {
    page: analyticsContext,
    locale: page.locale,
    properties: {
      seoTitle: page.seo.title,
      canonicalPath: page.seo.canonicalPath
    }
  })
})
</script>

<template>
  <main class="min-h-screen bg-dopa-bg text-dopa-text">
    <CommerceHero
      :hero="page.hero"
      :locale="page.locale"
      :analytics-context="analyticsContext"
    />

    <CommerceDemoPreview
      v-if="page.demo"
      :demo="page.demo"
      :demo-context="page.demoContext"
      :analytics-context="analyticsContext"
      :locale="page.locale"
    />

    <CommerceSectionRenderer
      v-for="group in sectionGroups"
      :key="group.id"
      :title="group.title"
      :description="group.description"
      :items="group.items"
      :links="group.links"
    />

    <CommerceLeadCapture
      v-if="page.lead"
      :lead="page.lead"
      :context="{
        ...analyticsContext,
        locale: page.locale,
        demoContext: page.demoContext
      }"
    />
  </main>
</template>
