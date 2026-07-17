<script setup lang="ts">
import type {
  CommerceAnalyticsContext,
  CommerceDemoConfig,
  CommerceDemoContext
} from '~/types/commerce'

const props = defineProps<{
  demo: CommerceDemoConfig
  demoContext?: CommerceDemoContext
  analyticsContext?: CommerceAnalyticsContext
}>()

const { track } = useCommerceAnalytics()

const accent = computed(() => {
  if (props.demo.eventPrefix === 'local') {
    return 'green'
  }

  if (props.demo.eventPrefix === 'ecom') {
    return 'amber'
  }

  return 'cyan'
})

const isSelectedOption = (stepKey: string, optionValue: string) => {
  return props.demoContext?.selectedOptions?.[stepKey]?.includes(optionValue) || false
}

const isHighlightedOutput = (label: string) => {
  return props.demoContext?.highlightedOutputs?.includes(label) || false
}

const selectedOptionClass = computed(() => {
  if (accent.value === 'green') {
    return 'border-dopa-green/70 bg-dopa-green/10 text-dopa-green'
  }

  if (accent.value === 'amber') {
    return 'border-dopa-amber/70 bg-dopa-amber/10 text-dopa-amber'
  }

  return 'border-dopa-cyan/70 bg-dopa-cyan/10 text-dopa-cyan'
})

const highlightedOutputClass = computed(() => {
  if (accent.value === 'green') {
    return 'border-dopa-green/60 bg-dopa-green/10 text-dopa-text'
  }

  if (accent.value === 'amber') {
    return 'border-dopa-amber/60 bg-dopa-amber/10 text-dopa-text'
  }

  return 'border-dopa-cyan/60 bg-dopa-cyan/10 text-dopa-text'
})

const optionClass = (stepKey: string, optionValue: string) => {
  return isSelectedOption(stepKey, optionValue)
    ? selectedOptionClass.value
    : 'bg-dopa-bg text-dopa-muted'
}

const outputClass = (label: string) => {
  return isHighlightedOutput(label)
    ? highlightedOutputClass.value
    : 'border-dopa-border text-dopa-muted'
}

onMounted(() => {
  if (!props.analyticsContext) {
    return
  }

  track('commerce_demo_start', props.analyticsContext, {
    demoType: props.demo.title,
    eventPrefix: props.demo.eventPrefix
  })

  if (props.demoContext) {
    track('commerce_demo_complete', props.analyticsContext, {
      demoType: props.demo.title,
      completionMode: 'default_context_rendered'
    })
  }
})
</script>

<template>
  <section id="demo" class="mx-auto max-w-6xl px-6 py-10 sm:px-10">
    <div class="rounded-lg border border-dopa-border bg-dopa-panel p-6 shadow-glow">
      <h2 class="text-2xl font-semibold">
        {{ demo.title }}
      </h2>
      <p class="mt-3 max-w-3xl text-sm leading-6 text-dopa-muted">
        {{ demo.description }}
      </p>

      <div v-if="demoContext" class="mt-4 rounded-md border border-dopa-border bg-dopa-bg px-4 py-3">
        <p class="text-xs font-semibold uppercase tracking-wide text-dopa-muted">
          Growth Context
        </p>
        <h3 class="mt-1 text-sm font-semibold text-dopa-text">
          {{ demoContext.title }}
        </h3>
        <p class="mt-1 text-xs leading-5 text-dopa-muted">
          {{ demoContext.description }}
        </p>
      </div>

      <div class="mt-6 grid gap-4 lg:grid-cols-3">
        <article v-for="step in demo.steps" :key="step.key" class="rounded-lg border border-dopa-border bg-dopa-card p-4">
          <h3 class="font-semibold text-dopa-text">
            {{ step.title }}
          </h3>
          <div class="mt-3 flex flex-wrap gap-2">
            <span
              v-for="option in step.options"
              :key="option.value"
              class="rounded-full border border-transparent px-3 py-1 text-xs font-medium"
              :class="optionClass(step.key, option.value)"
            >
              {{ option.label }}
            </span>
          </div>
        </article>
      </div>
      <div v-if="demo.resultLabels.length" class="mt-6 flex flex-wrap gap-2">
        <span
          v-for="output in demo.resultLabels"
          :key="output"
          class="rounded-md border px-3 py-2 text-xs"
          :class="outputClass(output)"
        >
          {{ output }}
        </span>
      </div>
    </div>
  </section>
</template>
