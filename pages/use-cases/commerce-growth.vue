<script setup lang="ts">
import type { CommerceAnalyticsPageContext } from '~/types/commerce'
import CommerceFAQ from '~/components/commerce/shared/CommerceFAQ.vue'
import CommerceHero from '~/components/commerce/shared/CommerceHero.vue'
import CommerceSectionRenderer from '~/components/commerce/shared/CommerceSectionRenderer.vue'
import { commerceGrowthConfig as page, commerceGrowthSectionGroups } from '~/data/commerce'

useCommerceSeo(page.seo)
const sectionGroups = commerceGrowthSectionGroups
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

    <CommerceSectionRenderer
      v-for="group in sectionGroups"
      :key="group.id"
      :id="group.id"
      :title="group.title"
      :description="group.description"
      :items="group.items"
      :links="group.links"
      :analytics-context="analyticsContext"
    />

    <CommerceFAQ :items="page.faq" />
  </main>
</template>
