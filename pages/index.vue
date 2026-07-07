<script setup lang="ts">
import { homeConfig as page } from '~/data/commerce'

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
  <main class="min-h-screen overflow-hidden bg-dopa-bg">
    <section class="mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-6 py-16 sm:px-10">
      <div class="max-w-4xl">
        <p class="text-sm font-semibold uppercase tracking-[0.24em] text-dopa-cyan">
          {{ page.hero.eyebrow }}
        </p>
        <h1 class="mt-5 text-5xl font-semibold leading-tight text-dopa-text sm:text-7xl">
          {{ page.hero.title }}
        </h1>
        <p class="mt-6 max-w-3xl text-lg leading-8 text-dopa-muted">
          {{ page.hero.subtitle }}
        </p>

        <div class="mt-8 flex flex-wrap gap-3">
          <NuxtLink
            :to="page.hero.primaryCta.href"
            :class="ctaClass(page.hero.primaryCta.variant)"
            class="rounded-md px-5 py-3 text-sm font-semibold transition"
          >
            {{ page.hero.primaryCta.label }}
          </NuxtLink>
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
      </div>

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
