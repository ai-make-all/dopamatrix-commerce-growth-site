<script setup lang="ts">
import CommerceHero from '~/components/commerce/shared/CommerceHero.vue'
import CommerceSectionGrid from '~/components/commerce/shared/CommerceSectionGrid.vue'
import { ecommerceProductsConfig as page } from '~/data/commerce'

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
  { id: 'pain', title: '电商商品增长痛点', items: page.painPoints },
  { id: 'solution', title: 'E-commerce Products 解决方案', items: page.solution },
  { id: 'outcomes', title: '商品增长成果物', items: page.outcomes },
  { id: 'matrix', title: '商品内容矩阵', items: page.matrix },
  { id: 'attribution', title: 'PDP、加购、下单归因', items: page.attribution },
  { id: 'assets', title: 'SKU 资产入库', items: page.assets }
]
</script>

<template>
  <main class="min-h-screen bg-dopa-bg text-dopa-text">
    <CommerceHero :hero="page.hero" :locale="page.locale" />

    <section v-if="page.demo" id="demo" class="mx-auto max-w-6xl px-6 py-10 sm:px-10">
      <div class="rounded-lg border border-dopa-border bg-dopa-panel p-6 shadow-glow">
        <h2 class="text-2xl font-semibold">{{ page.demo.title }}</h2>
        <p class="mt-3 max-w-3xl text-sm leading-6 text-dopa-muted">{{ page.demo.description }}</p>
        <div class="mt-6 grid gap-4 lg:grid-cols-3">
          <article v-for="step in page.demo.steps" :key="step.key" class="rounded-lg border border-dopa-border bg-dopa-card p-4">
            <h3 class="font-semibold text-dopa-text">{{ step.title }}</h3>
            <div class="mt-3 flex flex-wrap gap-2">
              <span v-for="option in step.options" :key="option.value" class="rounded-full bg-dopa-bg px-3 py-1 text-xs text-dopa-muted">{{ option.label }}</span>
            </div>
          </article>
        </div>
        <div class="mt-6 flex flex-wrap gap-2">
          <span v-for="label in page.demo.resultLabels" :key="label" class="rounded-md border border-dopa-amber/40 px-3 py-2 text-xs text-dopa-text">
            {{ label }}
          </span>
        </div>
      </div>
    </section>

    <CommerceSectionGrid v-for="group in sectionGroups" :key="group.id" :title="group.title" :items="group.items" />

    <section id="lead" class="mx-auto max-w-6xl px-6 py-16 sm:px-10">
      <div class="rounded-lg border border-dopa-border bg-dopa-panel p-6">
        <h2 class="text-2xl font-semibold">线索收集 CTA</h2>
        <p class="mt-3 text-sm leading-6 text-dopa-muted">第一阶段只预留 CTA 区域，不接真实 Lead Form 提交。</p>
      </div>
    </section>
  </main>
</template>
