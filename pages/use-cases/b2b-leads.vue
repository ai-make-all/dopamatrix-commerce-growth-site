<script setup lang="ts">
import CommerceDemoPreview from '~/components/commerce/shared/CommerceDemoPreview.vue'
import CommerceHero from '~/components/commerce/shared/CommerceHero.vue'
import CommerceSectionRenderer from '~/components/commerce/shared/CommerceSectionRenderer.vue'
import { b2bLeadsConfig as page, b2bLeadsSectionGroups } from '~/data/commerce'

useCommerceSeo(page.seo)
const sectionGroups = b2bLeadsSectionGroups
</script>

<template>
  <main class="min-h-screen bg-dopa-bg text-dopa-text">
    <CommerceHero :hero="page.hero" :locale="page.locale" />

    <CommerceDemoPreview
      v-if="page.demo"
      :demo="page.demo"
      :demo-context="page.demoContext"
    />

    <CommerceSectionRenderer
      v-for="group in sectionGroups"
      :key="group.id"
      :title="group.title"
      :description="group.description"
      :items="group.items"
      :links="group.links"
    />

    <section id="lead" class="mx-auto max-w-6xl px-6 py-16 sm:px-10">
      <div class="rounded-lg border border-dopa-border bg-dopa-panel p-6">
        <h2 class="text-2xl font-semibold">线索收集 CTA</h2>
        <p class="mt-3 text-sm leading-6 text-dopa-muted">第一阶段只预留 CTA 区域，不接真实 Lead Form 提交。</p>
      </div>
    </section>
  </main>
</template>
