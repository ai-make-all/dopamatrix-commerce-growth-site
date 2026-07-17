<script setup lang="ts">
import type { CommerceAnalyticsContext } from '~/types/commerce'
import CommerceDemoPreview from '~/components/commerce/shared/CommerceDemoPreview.vue'
import CommerceHero from '~/components/commerce/shared/CommerceHero.vue'
import CommerceLeadCapture from '~/components/commerce/shared/CommerceLeadCapture.vue'
import CommerceSectionRenderer from '~/components/commerce/shared/CommerceSectionRenderer.vue'
import { b2bLeadsConfig as page, b2bLeadsSectionGroups } from '~/data/commerce'

useCommerceSeo(page.seo)
const sectionGroups = b2bLeadsSectionGroups
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

onMounted(() => {
  track('commerce_page_view', analyticsContext, {
    pageTitle: page.seo.title,
    canonicalPath: page.seo.canonicalPath
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
        ...analyticsContext.page,
        locale: page.locale,
        demoContext: page.demoContext
      }"
    />
  </main>
</template>
