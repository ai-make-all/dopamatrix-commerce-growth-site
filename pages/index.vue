<script setup lang="ts">
import CommerceHero from '~/components/commerce/shared/CommerceHero.vue'
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
</script>

<template>
  <main class="min-h-screen overflow-hidden bg-dopa-bg">
    <CommerceHero :hero="page.hero" :locale="page.locale" />
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
