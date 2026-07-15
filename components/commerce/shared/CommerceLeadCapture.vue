<script setup lang="ts">
import type { CommerceLeadConfig, CommerceLeadField } from '~/types/commerce'

defineProps<{
  lead: CommerceLeadConfig
}>()

const previewSubmitted = ref(false)

const inputType = (field: CommerceLeadField) => {
  if (field.type === 'email' || field.type === 'tel') {
    return field.type
  }

  return 'text'
}

const handleSubmit = () => {
  previewSubmitted.value = true
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

      <form class="mt-6 grid gap-4 lg:grid-cols-3" @submit.prevent="handleSubmit">
        <label v-for="field in lead.fields" :key="field.key" class="flex flex-col gap-2">
          <span class="text-sm font-semibold text-dopa-text">
            {{ field.label }}
            <span v-if="field.required" class="ml-1 text-dopa-cyan">*</span>
          </span>

          <textarea
            v-if="field.type === 'textarea'"
            :name="field.key"
            :placeholder="field.placeholder"
            :required="field.required"
            rows="4"
            class="min-h-32 rounded-md border border-dopa-border bg-dopa-bg px-3 py-3 text-sm text-dopa-text outline-none transition placeholder:text-dopa-muted focus:border-dopa-cyan/70"
          />

          <select
            v-else-if="field.type === 'select'"
            :name="field.key"
            :required="field.required"
            class="rounded-md border border-dopa-border bg-dopa-bg px-3 py-3 text-sm text-dopa-text outline-none transition focus:border-dopa-cyan/70"
          >
            <option value="" disabled selected>
              {{ field.placeholder }}
            </option>
            <option v-for="option in field.options || []" :key="option" :value="option">
              {{ option }}
            </option>
          </select>

          <input
            v-else
            :type="inputType(field)"
            :name="field.key"
            :placeholder="field.placeholder"
            :required="field.required"
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
          <p v-if="previewSubmitted" class="mt-3 text-xs font-semibold text-dopa-cyan">
            Preview only. No data was submitted.
          </p>
        </div>
      </form>
    </div>
  </section>
</template>
