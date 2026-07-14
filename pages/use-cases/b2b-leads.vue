<script setup lang="ts">
import CommerceDemoPreview from '~/components/commerce/shared/CommerceDemoPreview.vue'
import CommerceHero from '~/components/commerce/shared/CommerceHero.vue'
import CommerceSectionGrid from '~/components/commerce/shared/CommerceSectionGrid.vue'
import { b2bLeadsConfig as page } from '~/data/commerce'

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

const sectionGroups = [
  { id: 'pain', title: 'B2B 获客痛点', items: page.painPoints },
  { id: 'solution', title: 'B2B Leads 解决方案', items: page.solution },
  { id: 'outcomes', title: 'B2B 线索成果物', items: page.outcomes },
  { id: 'matrix', title: '产品线索内容矩阵', items: page.matrix },
  { id: 'attribution', title: 'RFQ / WhatsApp / Catalog 归因', items: page.attribution },
  { id: 'assets', title: 'B2B 资产入库', items: page.assets }
]

const demoGroups = page.demo?.steps.map((step) => ({
  title: step.title,
  options: step.options.map((option) => option.label)
})) || []
</script>

<template>
  <main class="min-h-screen bg-dopa-bg text-dopa-text">
    <CommerceHero :hero="page.hero" :locale="page.locale" />

    <CommerceDemoPreview
      v-if="page.demo"
      :title="page.demo.title"
      :description="page.demo.description"
      :groups="demoGroups"
      :outputs="page.demo.resultLabels"
    />

    <CommerceSectionGrid v-for="group in sectionGroups" :key="group.id" :title="group.title" :items="group.items" />

    <section id="lead" class="mx-auto max-w-6xl px-6 py-16 sm:px-10">
      <div class="rounded-lg border border-dopa-border bg-dopa-panel p-6">
        <h2 class="text-2xl font-semibold">线索收集 CTA</h2>
        <p class="mt-3 text-sm leading-6 text-dopa-muted">第一阶段只预留 CTA 区域，不接真实 Lead Form 提交。</p>
      </div>
    </section>
  </main>
</template>
