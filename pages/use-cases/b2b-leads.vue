<script setup lang="ts">
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

const ctaClass = (variant = 'primary') => {
  if (variant === 'secondary') {
    return 'border border-dopa-cyan/50 bg-dopa-cyan/10 text-dopa-text hover:bg-dopa-cyan/20'
  }

  if (variant === 'ghost') {
    return 'border border-dopa-border bg-transparent text-dopa-muted hover:border-dopa-cyan/60 hover:text-dopa-text'
  }

  return 'bg-dopa-cyan text-dopa-bg hover:bg-white'
}
</script>

<template>
  <main class="min-h-screen bg-dopa-bg text-dopa-text">
    <section class="mx-auto max-w-6xl px-6 py-20 sm:px-10">
      <p class="text-sm font-semibold uppercase tracking-[0.24em] text-dopa-cyan">{{ page.hero.eyebrow }}</p>
      <h1 class="mt-5 max-w-5xl text-4xl font-semibold leading-tight sm:text-6xl">{{ page.hero.title }}</h1>
      <p class="mt-6 max-w-3xl text-lg leading-8 text-dopa-muted">{{ page.hero.subtitle }}</p>
      <div class="mt-8 flex flex-wrap gap-3">
        <a :href="page.hero.primaryCta.href" :class="ctaClass(page.hero.primaryCta.variant)" class="rounded-md px-5 py-3 text-sm font-semibold transition">
          {{ page.hero.primaryCta.label }}
        </a>
        <a v-for="cta in page.hero.secondaryCtas" :key="cta.label" :href="cta.href" :class="ctaClass(cta.variant)" class="rounded-md px-5 py-3 text-sm font-semibold transition">
          {{ cta.label }}
        </a>
      </div>
      <div class="mt-10 flex flex-wrap gap-2">
        <span v-for="badge in page.hero.badges" :key="badge" class="rounded-full border border-dopa-border bg-dopa-panel px-3 py-1 text-sm text-dopa-muted">
          {{ badge }}
        </span>
      </div>
    </section>

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
          <span v-for="label in page.demo.resultLabels" :key="label" class="rounded-md border border-dopa-cyan/40 px-3 py-2 text-xs text-dopa-text">
            {{ label }}
          </span>
        </div>
      </div>
    </section>

    <section v-for="group in sectionGroups" :id="group.id" :key="group.id" class="mx-auto max-w-6xl px-6 py-10 sm:px-10">
      <h2 class="text-2xl font-semibold text-dopa-text">{{ group.title }}</h2>
      <div class="mt-5 grid gap-4 md:grid-cols-3">
        <article v-for="item in group.items" :key="item.title" class="rounded-lg border border-dopa-border bg-dopa-card p-5">
          <h3 class="text-lg font-semibold text-dopa-text">{{ item.title }}</h3>
          <p class="mt-3 text-sm leading-6 text-dopa-muted">{{ item.description }}</p>
        </article>
      </div>
    </section>

    <section id="lead" class="mx-auto max-w-6xl px-6 py-16 sm:px-10">
      <div class="rounded-lg border border-dopa-border bg-dopa-panel p-6">
        <h2 class="text-2xl font-semibold">线索收集 CTA</h2>
        <p class="mt-3 text-sm leading-6 text-dopa-muted">第一阶段只预留 CTA 区域，不接真实 Lead Form 提交。</p>
      </div>
    </section>
  </main>
</template>
