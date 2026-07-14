<script setup lang="ts">
defineProps<{
  label: string
}>()
</script>

<template>
  <span class="rounded-full border border-dopa-border bg-dopa-panel px-3 py-1 text-sm text-dopa-muted">
    {{ label }}
  </span>
</template>
