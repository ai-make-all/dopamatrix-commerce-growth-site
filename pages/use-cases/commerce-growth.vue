<script setup lang="ts">
import CommerceFAQ from '~/components/commerce/shared/CommerceFAQ.vue'
import CommerceHero from '~/components/commerce/shared/CommerceHero.vue'
import CommerceSectionGrid from '~/components/commerce/shared/CommerceSectionGrid.vue'
import { commerceGrowthConfig as page } from '~/data/commerce'

const runtimeConfig = useRuntimeConfig()
const siteUrl = String(runtimeConfig.public.siteUrl).replace(/\/$/, '')

useSeoMeta({
  title: page.seo.title,
  description: page.seo.description,
  ogTitle: page.seo.ogTitle,
  ogDescription: page.seo.ogDescription,
  ogImage: `${siteUrl}${page.seo.ogImage}`,
  twitterCard: 'summary_large_image'
})

useHead({
  link: [{ rel: 'canonical', href: `${siteUrl}${page.seo.canonicalPath}` }]
})

const beforeRouteGroups = [
  { id: 'pain', title: '转化终点先分清', items: page.painPoints },
  { id: 'workflow', title: '统一工作流', items: page.solution }
]

const afterRouteGroups = [
  { id: 'matrix', title: '内容矩阵差异', items: page.matrix },
  { id: 'attribution', title: '归因口径差异', items: page.attribution },
  { id: 'assets', title: '业务资产入库', items: page.assets }
]

const routeGroup = { id: 'routes', title: '三类增长场景', items: page.outcomes }

const routeMap: Record<string, string> = {
  'Local Brands': '/use-cases/local-brands',
  'E-commerce Products': '/use-cases/ecommerce-products',
  'B2B Leads': '/use-cases/b2b-leads'
}
</script>

<template>
  <main class="min-h-screen bg-dopa-bg text-dopa-text">
    <CommerceHero :hero="page.hero" :locale="page.locale" />

    <CommerceSectionGrid v-for="group in beforeRouteGroups" :key="group.id" :title="group.title" :items="group.items" />

    <section
      :id="routeGroup.id"
      class="mx-auto max-w-6xl px-6 py-10 sm:px-10"
    >
      <h2 class="text-2xl font-semibold text-dopa-text">
        {{ routeGroup.title }}
      </h2>
      <div class="mt-5 grid gap-4 md:grid-cols-3">
        <NuxtLink
          v-for="item in routeGroup.items"
          :key="item.title"
          :to="routeMap[item.title] || page.slug"
          class="rounded-lg border border-dopa-border bg-dopa-card p-5 transition hover:border-dopa-cyan/70"
        >
          <h3 class="text-lg font-semibold text-dopa-text">
            {{ item.title }}
          </h3>
          <p class="mt-3 text-sm leading-6 text-dopa-muted">
            {{ item.description }}
          </p>
        </NuxtLink>
      </div>
    </section>

    <CommerceSectionGrid v-for="group in afterRouteGroups" :key="group.id" :title="group.title" :items="group.items" />

    <CommerceFAQ :items="page.faq" />
  </main>
</template>
