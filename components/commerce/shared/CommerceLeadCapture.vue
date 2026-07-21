<script setup lang="ts">
import type {
  CommerceAnalyticsContext,
  CommerceLeadConfig,
  CommerceLeadContext,
  CommerceLeadField,
  CommerceLeadPayload,
  CommerceLeadSummary
} from '~/types/commerce'

const props = defineProps<{
  lead: CommerceLeadConfig
  context: CommerceLeadContext
}>()

const formValues = reactive<Record<string, string>>(
  Object.fromEntries(props.lead.fields.map((field) => [field.key, '']))
)
const submitStatus = ref<'idle' | 'submitting' | 'error' | 'success'>('idle')
const errorMessage = ref('')
const mockPayload = ref<CommerceLeadPayload | null>(null)
const leadSummary = ref<CommerceLeadSummary | null>(null)
const showPayloadPreview = ref(false)
const hasTrackedFormStart = ref(false)
const { track } = useCommerceAnalytics()
const { submitLead } = useCommerceLeadSubmit()

const analyticsContext = computed<CommerceAnalyticsContext>(() => ({
  page: {
    pageType: props.context.pageType,
    eventPrefix: props.context.eventPrefix,
    slug: props.context.slug
  },
  locale: props.context.locale,
  audience: props.context.locale.audiences
}))

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

const getFieldValue = (fieldKey: string) => formValues[fieldKey]?.trim() || ''

const primaryGoal = computed(() => {
  return getFieldValue('goal') || getFieldValue('leadGoal') || props.lead.fields.map((field) => getFieldValue(field.key)).find(Boolean) || ''
})

const primaryOutcome = computed(() => {
  if (props.context.pageType === 'local_brands') {
    return '到店 / WhatsApp / 活动 / 复购'
  }

  if (props.context.pageType === 'ecommerce_products') {
    return 'PDP / 加购 / 下单 / ROAS'
  }

  if (props.context.pageType === 'b2b_leads') {
    return 'RFQ / Catalog / WhatsApp / 销售跟进'
  }

  return 'Commerce growth path'
})

const summaryMeta = computed(() => {
  if (props.context.pageType === 'local_brands') {
    return {
      title: 'Local Growth Summary',
      subtitle: '你的本地门店增长需求摘要',
      recommendedPath: 'Local Growth Card + WhatsApp 咨询路径'
    }
  }

  if (props.context.pageType === 'ecommerce_products') {
    return {
      title: 'Product Growth Summary',
      subtitle: '你的商品增长需求摘要',
      recommendedPath: 'SKU Selling Point Map + PDP / 加购 / 下单转化路径'
    }
  }

  if (props.context.pageType === 'b2b_leads') {
    return {
      title: 'B2B Lead Summary',
      subtitle: '你的 B2B 线索增长需求摘要',
      recommendedPath: 'Product Proof Map + RFQ / Catalog / 销售跟进路径'
    }
  }

  return {
    title: 'Lead Summary',
    subtitle: '你的增长需求摘要',
    recommendedPath: 'Commerce Growth Plan'
  }
})

const buildLeadSummary = (): CommerceLeadSummary => {
  return {
    title: summaryMeta.value.title,
    subtitle: summaryMeta.value.subtitle,
    items: props.lead.fields.map((field) => ({
      label: field.label,
      value: getFieldValue(field.key)
    })),
    recommendedPath: summaryMeta.value.recommendedPath
  }
}

const trackFormStart = () => {
  if (hasTrackedFormStart.value) {
    return
  }

  hasTrackedFormStart.value = true

  track('commerce_lead_form_start', analyticsContext.value, {
    leadType: props.context.pageType,
    fieldCount: props.lead.fields.length
  })
}

const handleSubmit = async () => {
  const hasMissingRequiredField = props.lead.fields.some((field) => {
    return field.required && !formValues[field.key]?.trim()
  })

  if (hasMissingRequiredField) {
    submitStatus.value = 'error'
    errorMessage.value = 'Please complete all required fields before generating the mock payload.'
    mockPayload.value = null
    leadSummary.value = null
    showPayloadPreview.value = false
    return
  }

  submitStatus.value = 'submitting'
  errorMessage.value = ''
  mockPayload.value = null
  leadSummary.value = null
  showPayloadPreview.value = false

  const generatedSummary = buildLeadSummary()
  const generatedPayload: CommerceLeadPayload = {
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
    conversionIntent: {
      businessGoal: primaryGoal.value,
      primaryOutcome: primaryOutcome.value
    },
    sourceContext: {
      pageTitle: props.lead.title,
      entryPoint: 'lead_capture_section'
    },
    fields: { ...formValues }
  }

  try {
    const result = await submitLead(generatedPayload)

    if (!result.ok) {
      submitStatus.value = 'error'
      errorMessage.value = result.error?.message || 'Unable to generate the mock payload. Please try again.'
      mockPayload.value = null
      leadSummary.value = null
      return
    }

    submitStatus.value = 'success'
    mockPayload.value = result.payload || generatedPayload
    leadSummary.value = generatedSummary
  } catch {
    submitStatus.value = 'error'
    errorMessage.value = 'Unable to generate the mock payload. Please try again.'
    mockPayload.value = null
    leadSummary.value = null
    return
  }

  track('commerce_lead_mock_submit', analyticsContext.value, {
    fieldKeys: Object.keys(formValues),
    payloadVersion: '1.0'
  })

  track('commerce_lead_summary_generated', analyticsContext.value, {
    conversionIntent: generatedPayload.conversionIntent,
    summaryType: generatedSummary.title
  })
}

const resetMockPayload = () => {
  submitStatus.value = 'idle'
  errorMessage.value = ''
  mockPayload.value = null
  leadSummary.value = null
  showPayloadPreview.value = false
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
            @focus="trackFormStart"
          />

          <select
            v-else-if="field.type === 'select'"
            v-model="formValues[field.key]"
            :name="field.key"
            :aria-required="field.required"
            class="rounded-md border border-dopa-border bg-dopa-bg px-3 py-3 text-sm text-dopa-text outline-none transition focus:border-dopa-cyan/70"
            @focus="trackFormStart"
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
            @focus="trackFormStart"
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
            <p v-else-if="submitStatus === 'submitting'" class="text-xs leading-5 text-dopa-muted">
              Generating mock lead payload locally...
            </p>
            <p v-else-if="submitStatus === 'error'" class="text-xs font-semibold leading-5 text-dopa-amber">
              {{ errorMessage }}
            </p>
            <div v-else class="space-y-4">
              <div v-if="leadSummary" class="rounded-md border border-dopa-cyan/40 bg-dopa-panel px-4 py-4">
                <p class="text-xs font-semibold uppercase tracking-wide text-dopa-cyan">
                  Lead Summary
                </p>
                <h3 class="mt-2 text-lg font-semibold text-dopa-text">
                  {{ leadSummary.title }}
                </h3>
                <p class="mt-1 text-xs leading-5 text-dopa-muted">
                  {{ leadSummary.subtitle }}
                </p>
                <dl class="mt-4 grid gap-3 md:grid-cols-3">
                  <div v-for="item in leadSummary.items" :key="item.label" class="rounded-md border border-dopa-border bg-dopa-bg px-3 py-3">
                    <dt class="text-xs font-semibold text-dopa-muted">
                      {{ item.label }}
                    </dt>
                    <dd class="mt-1 text-sm font-semibold text-dopa-text">
                      {{ item.value }}
                    </dd>
                  </div>
                </dl>
                <div class="mt-4 rounded-md border border-dopa-border bg-dopa-bg px-3 py-3">
                  <p class="text-xs font-semibold text-dopa-muted">
                    建议增长路径
                  </p>
                  <p class="mt-1 text-sm font-semibold text-dopa-cyan">
                    {{ leadSummary.recommendedPath }}
                  </p>
                </div>
              </div>

              <div class="rounded-md border border-dopa-border bg-dopa-panel px-4 py-4">
                <div class="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p class="text-xs font-semibold uppercase tracking-wide text-dopa-muted">
                      Developer Payload Preview
                    </p>
                    <p class="mt-1 text-xs leading-5 text-dopa-muted">
                      Mock lead payload generated locally. Backend submission will be added later.
                    </p>
                  </div>
                  <div class="flex flex-wrap gap-2">
                    <button
                      type="button"
                      class="rounded-md border border-dopa-border px-3 py-2 text-xs font-semibold text-dopa-muted transition hover:border-dopa-cyan/70 hover:text-dopa-text"
                      @click="showPayloadPreview = !showPayloadPreview"
                    >
                      {{ showPayloadPreview ? '隐藏 Payload' : '查看 Payload' }}
                    </button>
                    <button
                      type="button"
                      class="rounded-md border border-dopa-border px-3 py-2 text-xs font-semibold text-dopa-muted transition hover:border-dopa-cyan/70 hover:text-dopa-text"
                      @click="resetMockPayload"
                    >
                      Reset preview
                    </button>
                  </div>
                </div>
                <pre v-if="showPayloadPreview" class="mt-4 max-h-80 overflow-auto rounded-md border border-dopa-border bg-black/30 p-4 text-xs leading-5 text-dopa-muted"><code>{{ mockPayloadPreview }}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </section>
</template>
