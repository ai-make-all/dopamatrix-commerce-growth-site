<script setup lang="ts">
import type { CommerceLeadConfig, CommerceLeadContext, CommerceLeadField, CommerceLeadPayload } from '~/types/commerce'

const props = defineProps<{
  lead: CommerceLeadConfig
  context: CommerceLeadContext
}>()

const formValues = reactive<Record<string, string>>(
  Object.fromEntries(props.lead.fields.map((field) => [field.key, '']))
)
const submitStatus = ref<'idle' | 'error' | 'success'>('idle')
const errorMessage = ref('')
const mockPayload = ref<CommerceLeadPayload | null>(null)

const mockPayloadPreview = computed(() => {
  if (!mockPayload.value) {
    return ''
  }

  return JSON.stringify(mockPayload.value, null, 2)
})

const inputType = (field: CommerceLeadField) => {
  if (field.type === 'email' || field.type === 'tel') {
    return field.type
  }

  return 'text'
}

const handleSubmit = () => {
  const hasMissingRequiredField = props.lead.fields.some((field) => {
    return field.required && !formValues[field.key]?.trim()
  })

  if (hasMissingRequiredField) {
    submitStatus.value = 'error'
    errorMessage.value = 'Please complete all required fields before generating the mock payload.'
    mockPayload.value = null
    return
  }

  submitStatus.value = 'success'
  errorMessage.value = ''
  mockPayload.value = {
    mode: 'mock',
    submittedAt: new Date().toISOString(),
    source: 'commerce_lead_capture',
    page: {
      pageType: props.context.pageType,
      eventPrefix: props.context.eventPrefix,
      slug: props.context.slug
    },
    locale: props.context.locale,
    demoContext: props.context.demoContext,
    fields: { ...formValues }
  }
}

const resetMockPayload = () => {
  submitStatus.value = 'idle'
  errorMessage.value = ''
  mockPayload.value = null
}
</script>

<template>
  <section id="lead" class="mx-auto max-w-6xl px-6 py-16 sm:px-10">
    <div class="rounded-lg border border-dopa-border bg-dopa-panel p-6 shadow-glow">
      <div class="max-w-3xl">
        <p class="text-xs font-semibold uppercase tracking-wide text-dopa-muted">
          Lead Capture
        </p>
        <h2 class="mt-2 text-2xl font-semibold text-dopa-text">
          {{ lead.title }}
        </h2>
        <p class="mt-3 text-sm leading-6 text-dopa-muted">
          {{ lead.description }}
        </p>
        <p class="mt-4 rounded-md border border-dopa-border bg-dopa-bg px-4 py-3 text-xs leading-5 text-dopa-muted">
          This is a static lead capture preview. Backend submission will be added later.
        </p>
      </div>

      <form class="mt-6 grid gap-4 lg:grid-cols-3" novalidate @submit.prevent="handleSubmit">
        <label v-for="field in lead.fields" :key="field.key" class="flex flex-col gap-2">
          <span class="text-sm font-semibold text-dopa-text">
            {{ field.label }}
            <span v-if="field.required" class="ml-1 text-dopa-cyan">*</span>
          </span>

          <textarea
            v-if="field.type === 'textarea'"
            v-model="formValues[field.key]"
            :name="field.key"
            :placeholder="field.placeholder"
            :aria-required="field.required"
            rows="4"
            class="min-h-32 rounded-md border border-dopa-border bg-dopa-bg px-3 py-3 text-sm text-dopa-text outline-none transition placeholder:text-dopa-muted focus:border-dopa-cyan/70"
          />

          <select
            v-else-if="field.type === 'select'"
            v-model="formValues[field.key]"
            :name="field.key"
            :aria-required="field.required"
            class="rounded-md border border-dopa-border bg-dopa-bg px-3 py-3 text-sm text-dopa-text outline-none transition focus:border-dopa-cyan/70"
          >
            <option value="" disabled>
              {{ field.placeholder }}
            </option>
            <option v-for="option in field.options || []" :key="option" :value="option">
              {{ option }}
            </option>
          </select>

          <input
            v-else
            v-model="formValues[field.key]"
            :type="inputType(field)"
            :name="field.key"
            :placeholder="field.placeholder"
            :aria-required="field.required"
            class="rounded-md border border-dopa-border bg-dopa-bg px-3 py-3 text-sm text-dopa-text outline-none transition placeholder:text-dopa-muted focus:border-dopa-cyan/70"
          >
        </label>

        <div class="lg:col-span-3">
          <button
            type="submit"
            class="rounded-md bg-dopa-cyan px-5 py-3 text-sm font-semibold text-dopa-bg transition hover:bg-white"
          >
            {{ lead.submitLabel }}
          </button>
          <p class="mt-3 text-xs leading-5 text-dopa-muted">
            {{ lead.helperText }}
          </p>
          <div class="mt-4 rounded-md border border-dopa-border bg-dopa-bg px-4 py-3">
            <p v-if="submitStatus === 'idle'" class="text-xs leading-5 text-dopa-muted">
              No data is submitted yet. This form only generates a local mock payload.
            </p>
            <p v-else-if="submitStatus === 'error'" class="text-xs font-semibold leading-5 text-dopa-amber">
              {{ errorMessage }}
            </p>
            <div v-else class="space-y-3">
              <div class="flex flex-wrap items-center justify-between gap-3">
                <p class="text-xs font-semibold leading-5 text-dopa-cyan">
                  Mock lead payload generated locally. Backend submission will be added later.
                </p>
                <button
                  type="button"
                  class="rounded-md border border-dopa-border px-3 py-2 text-xs font-semibold text-dopa-muted transition hover:border-dopa-cyan/70 hover:text-dopa-text"
                  @click="resetMockPayload"
                >
                  Reset preview
                </button>
              </div>
              <pre class="max-h-80 overflow-auto rounded-md border border-dopa-border bg-black/30 p-4 text-xs leading-5 text-dopa-muted"><code>{{ mockPayloadPreview }}</code></pre>
            </div>
          </div>
        </div>
      </form>
    </div>
  </section>
</template>
