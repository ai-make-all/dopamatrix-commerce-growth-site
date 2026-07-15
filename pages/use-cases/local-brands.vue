<script setup lang="ts">
import CommerceDemoPreview from '~/components/commerce/shared/CommerceDemoPreview.vue'
import CommerceHero from '~/components/commerce/shared/CommerceHero.vue'
import CommerceLeadCapture from '~/components/commerce/shared/CommerceLeadCapture.vue'
import CommerceSectionRenderer from '~/components/commerce/shared/CommerceSectionRenderer.vue'
import { localBrandsConfig as page, localBrandsSectionGroups } from '~/data/commerce'

useCommerceSeo(page.seo)
const sectionGroups = localBrandsSectionGroups
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

    <CommerceLeadCapture v-if="page.lead" :lead="page.lead" />
  </main>
</template>
