<script setup lang="ts">
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

const sectionGroups = [
  { id: 'pain', title: '转化终点先分清', items: page.painPoints },
  { id: 'workflow', title: '统一工作流', items: page.solution },
  { id: 'routes', title: '三类增长场景', items: page.outcomes },
  { id: 'matrix', title: '内容矩阵差异', items: page.matrix },
  { id: 'attribution', title: '归因口径差异', items: page.attribution },
  { id: 'assets', title: '业务资产入库', items: page.assets }
]

const routeMap: Record<string, string> = {
  'Local Brands': '/use-cases/local-brands',
  'E-commerce Products': '/use-cases/ecommerce-products',
  'B2B Leads': '/use-cases/b2b-leads'
}

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
      <p class="text-sm font-semibold uppercase tracking-[0.24em] text-dopa-cyan">
        {{ page.hero.eyebrow }}
      </p>
      <h1 class="mt-5 max-w-5xl text-4xl font-semibold leading-tight sm:text-6xl">
        {{ page.hero.title }}
      </h1>
      <p class="mt-6 max-w-3xl text-lg leading-8 text-dopa-muted">
        {{ page.hero.subtitle }}
      </p>

      <div class="mt-8 flex flex-wrap gap-3">
        <a
          :href="page.hero.primaryCta.href"
          :class="ctaClass(page.hero.primaryCta.variant)"
          class="rounded-md px-5 py-3 text-sm font-semibold transition"
        >
          {{ page.hero.primaryCta.label }}
        </a>
        <NuxtLink
          v-for="cta in page.hero.secondaryCtas"
          :key="cta.label"
          :to="cta.href"
          :class="ctaClass(cta.variant)"
          class="rounded-md px-5 py-3 text-sm font-semibold transition"
        >
          {{ cta.label }}
        </NuxtLink>
      </div>

      <div class="mt-10 flex flex-wrap gap-2">
        <span
          v-for="badge in page.hero.badges"
          :key="badge"
          class="rounded-full border border-dopa-border bg-dopa-panel px-3 py-1 text-sm text-dopa-muted"
        >
          {{ badge }}
        </span>
      </div>
    </section>

    <section
      v-for="group in sectionGroups"
      :id="group.id"
      :key="group.id"
      class="mx-auto max-w-6xl px-6 py-10 sm:px-10"
    >
      <h2 class="text-2xl font-semibold text-dopa-text">
        {{ group.title }}
      </h2>
      <div class="mt-5 grid gap-4 md:grid-cols-3">
        <NuxtLink
          v-for="item in group.items"
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

    <section class="mx-auto max-w-6xl px-6 py-16 sm:px-10">
      <div class="rounded-lg border border-dopa-border bg-dopa-panel p-6">
        <h2 class="text-2xl font-semibold">FAQ</h2>
        <div class="mt-5 grid gap-4 md:grid-cols-2">
          <article v-for="item in page.faq" :key="item.question">
            <h3 class="font-semibold text-dopa-text">{{ item.question }}</h3>
            <p class="mt-2 text-sm leading-6 text-dopa-muted">{{ item.answer }}</p>
          </article>
        </div>
      </div>
    </section>
  </main>
</template>
