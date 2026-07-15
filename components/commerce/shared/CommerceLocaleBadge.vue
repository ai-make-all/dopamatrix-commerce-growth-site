<script setup lang="ts">
import type { CommerceLocaleContext } from '~/types/commerce'

defineProps<{
  locale: CommerceLocaleContext
}>()
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <span class="rounded-md border border-dopa-border bg-dopa-panel px-3 py-2 text-xs font-semibold text-dopa-muted">
      {{ locale.regionLabel }}
    </span>
    <span class="rounded-md border border-dopa-border bg-dopa-panel px-3 py-2 text-xs font-semibold text-dopa-muted">
      {{ locale.languageLabel }}
    </span>
    <span class="rounded-md border border-dopa-border bg-dopa-panel px-3 py-2 text-xs font-semibold text-dopa-muted">
      {{ locale.audienceLabel }}
    </span>
  </div>
</template>
