<script setup lang="ts">
import type { CommerceFaqItem } from '~/types/commerce'

defineProps<{
  items: CommerceFaqItem[]
}>()
</script>

<template>
  <section v-if="items.length" class="mx-auto max-w-6xl px-6 py-16 sm:px-10">
    <div class="rounded-lg border border-dopa-border bg-dopa-panel p-6">
      <h2 class="text-2xl font-semibold text-dopa-text">
        FAQ
      </h2>
      <div class="mt-5 grid gap-4 md:grid-cols-2">
        <article v-for="item in items" :key="item.question">
          <h3 class="font-semibold text-dopa-text">
            {{ item.question }}
          </h3>
          <p class="mt-2 text-sm leading-6 text-dopa-muted">
            {{ item.answer }}
          </p>
        </article>
      </div>
    </div>
  </section>
</template>
