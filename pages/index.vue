<script setup lang="ts">
import type { CommerceAnalyticsPageContext } from '~/types/commerce'
import CommerceHero from '~/components/commerce/shared/CommerceHero.vue'
import { homeConfig as page } from '~/data/commerce'

useCommerceSeo(page.seo)

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
  <main class="min-h-screen overflow-hidden bg-dopa-bg">
    <CommerceHero
      :hero="page.hero"
      :locale="page.locale"
      :analytics-context="analyticsContext"
    />
    <section class="mx-auto w-full max-w-6xl px-6 pb-16 sm:px-10">
      <div class="mt-14 grid gap-4 md:grid-cols-3">
        <NuxtLink
          v-for="item in page.painPoints"
          :key="item.title"
          to="/use-cases/commerce-growth"
          class="rounded-lg border border-dopa-border bg-dopa-panel p-5 transition hover:border-dopa-cyan/70"
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
