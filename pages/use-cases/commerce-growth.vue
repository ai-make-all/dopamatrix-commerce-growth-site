<script setup lang="ts">
import CommerceFAQ from '~/components/commerce/shared/CommerceFAQ.vue'
import CommerceHero from '~/components/commerce/shared/CommerceHero.vue'
import CommerceSectionRenderer from '~/components/commerce/shared/CommerceSectionRenderer.vue'
import { commerceGrowthConfig as page, commerceGrowthSectionGroups } from '~/data/commerce'

useCommerceSeo(page.seo)
const sectionGroups = commerceGrowthSectionGroups
</script>

<template>
  <main class="min-h-screen bg-dopa-bg text-dopa-text">
    <CommerceHero :hero="page.hero" :locale="page.locale" />

    <CommerceSectionRenderer
      v-for="group in sectionGroups"
      :key="group.id"
      :title="group.title"
      :description="group.description"
      :items="group.items"
      :links="group.links"
    />

    <CommerceFAQ :items="page.faq" />
  </main>
</template>
