<script setup lang="ts">
const props = defineProps<{
  title: string
  description: string
  groups: Array<{
    title: string
    options: string[]
  }>
  outputs: string[]
}>()

const accent = computed(() => {
  const title = props.title.toLowerCase()

  if (title.includes('local')) {
    return 'green'
  }

  if (title.includes('product')) {
    return 'amber'
  }

  return 'cyan'
})

const outputClass = computed(() => {
  if (accent.value === 'green') {
    return 'border-dopa-green/40'
  }

  if (accent.value === 'amber') {
    return 'border-dopa-amber/40'
  }

  return 'border-dopa-cyan/40'
})
</script>

<template>
  <section id="demo" class="mx-auto max-w-6xl px-6 py-10 sm:px-10">
    <div class="rounded-lg border border-dopa-border bg-dopa-panel p-6 shadow-glow">
      <h2 class="text-2xl font-semibold">
        {{ title }}
      </h2>
      <p class="mt-3 max-w-3xl text-sm leading-6 text-dopa-muted">
        {{ description }}
      </p>
      <div class="mt-6 grid gap-4 lg:grid-cols-3">
        <article v-for="group in groups" :key="group.title" class="rounded-lg border border-dopa-border bg-dopa-card p-4">
          <h3 class="font-semibold text-dopa-text">
            {{ group.title }}
          </h3>
          <div class="mt-3 flex flex-wrap gap-2">
            <span v-for="option in group.options" :key="option" class="rounded-full bg-dopa-bg px-3 py-1 text-xs text-dopa-muted">
              {{ option }}
            </span>
          </div>
        </article>
      </div>
      <div v-if="outputs.length" class="mt-6 flex flex-wrap gap-2">
        <span
          v-for="output in outputs"
          :key="output"
          class="rounded-md border px-3 py-2 text-xs text-dopa-text"
          :class="outputClass"
        >
          {{ output }}
        </span>
      </div>
    </div>
  </section>
</template>
