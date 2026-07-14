<script setup lang="ts">
import type { CommerceSectionItem } from '~/types/commerce'

const props = defineProps<{
  title: string
  items: CommerceSectionItem[]
  description?: string
}>()
</script>

<template>
  <section v-if="props.items.length" class="mx-auto max-w-6xl px-6 py-10 sm:px-10">
    <h2 class="text-2xl font-semibold text-dopa-text">
      {{ title }}
    </h2>
    <p v-if="description" class="mt-3 max-w-3xl text-sm leading-6 text-dopa-muted">
      {{ description }}
    </p>
    <div class="mt-5 grid gap-4 md:grid-cols-3">
      <article v-for="item in items" :key="item.title" class="rounded-lg border border-dopa-border bg-dopa-card p-5">
        <h3 class="text-lg font-semibold text-dopa-text">
          {{ item.title }}
        </h3>
        <p class="mt-3 text-sm leading-6 text-dopa-muted">
          {{ item.description }}
        </p>
      </article>
    </div>
  </section>
</template>
