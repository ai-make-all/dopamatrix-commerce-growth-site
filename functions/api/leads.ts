type JsonRecord = Record<string, unknown>

type FunctionContext = {
  request: Request
}

type ValidationIssue = {
  field: string
  message: string
}

type ValidationSuccess = {
  ok: true
  acceptedShape: 'fields' | 'lead'
  pageType: string
  source: string
}

type ValidationFailure = {
  ok: false
  errors: ValidationIssue[]
}

type ValidationResult = ValidationSuccess | ValidationFailure

const allowedPageTypes = ['home', 'commerce_growth', 'local_brands', 'ecommerce_products', 'b2b_leads']
const allowedEventPrefixes = ['home', 'commerce', 'local', 'ecom', 'b2b']
const allowedPayloadVersions = ['1.0']
const allowedSources = ['commerce_lead_capture', 'commerce_growth_site']
const allowedModes = ['mock']
const fieldsIntentKeys = [
  'businessType',
  'market',
  'goal',
  'category',
  'channel',
  'industry',
  'targetMarket',
  'growthGoal'
]
const leadIntentKeys = ['businessType', 'targetMarket', 'growthGoal']
const unsafeFragments = ['<script', '</script', 'javascript:', 'onerror=', 'onload=']
const maxValidationDetails = 10
const isoLikeDatePattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/

const jsonHeaders = {
  'content-type': 'application/json; charset=utf-8'
}

const jsonResponse = (body: unknown, status = 200) => {
  return new Response(JSON.stringify(body), {
    status,
    headers: jsonHeaders
  })
}

const isRecord = (value: unknown): value is JsonRecord => {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

const hasText = (value: unknown) => {
  return typeof value === 'string' && value.trim().length > 0
}

const isIsoLikeDate = (value: unknown) => {
  return typeof value === 'string' && isoLikeDatePattern.test(value.trim()) && !Number.isNaN(Date.parse(value))
}

const containsUnsafeHtml = (value: string) => {
  const normalizedValue = value.toLowerCase()
  return unsafeFragments.some((fragment) => normalizedValue.includes(fragment))
}

const addIssue = (errors: ValidationIssue[], field: string, message: string) => {
  errors.push({ field, message })
}

const validateStringField = (
  errors: ValidationIssue[],
  field: string,
  value: unknown,
  options: {
    required?: boolean
    maxLength?: number
    allowed?: string[]
    mustStartWithSlash?: boolean
    isoLikeDate?: boolean
  } = {}
) => {
  const maxLength = options.maxLength || 500

  if (value !== undefined && typeof value !== 'string') {
    addIssue(errors, field, `${field} must be a string.`)
    return
  }

  if (!hasText(value)) {
    if (options.required) {
      addIssue(errors, field, `${field} is required.`)
    }
    return
  }

  const textValue = value.trim()

  if (textValue.length > maxLength) {
    addIssue(errors, field, `${field} must be ${maxLength} characters or fewer.`)
  }

  if (containsUnsafeHtml(textValue)) {
    addIssue(errors, field, `${field} contains unsafe content.`)
  }

  if (options.allowed && !options.allowed.includes(textValue)) {
    addIssue(errors, field, `${field} is not supported.`)
  }

  if (options.mustStartWithSlash && !textValue.startsWith('/')) {
    addIssue(errors, field, `${field} must start with /.`)
  }

  if (options.isoLikeDate && !isIsoLikeDate(textValue)) {
    addIssue(errors, field, `${field} must be a valid timestamp.`)
  }
}

const validateStringValues = (errors: ValidationIssue[], objectField: string, value: JsonRecord) => {
  Object.entries(value).forEach(([key, nestedValue]) => {
    if (typeof nestedValue === 'string') {
      validateStringField(errors, `${objectField}.${key}`, nestedValue, {
        maxLength: 500
      })
    }
  })
}

const validatePage = (errors: ValidationIssue[], page: unknown) => {
  if (!isRecord(page)) {
    addIssue(errors, 'page', 'page is required.')
    return
  }

  validateStringField(errors, 'page.pageType', page.pageType, {
    required: true,
    maxLength: 80,
    allowed: allowedPageTypes
  })
  validateStringField(errors, 'page.eventPrefix', page.eventPrefix, {
    maxLength: 40,
    allowed: allowedEventPrefixes
  })
  validateStringField(errors, 'page.slug', page.slug, {
    required: true,
    maxLength: 200,
    mustStartWithSlash: true
  })
}

const validateFieldsShape = (errors: ValidationIssue[], fields: unknown) => {
  if (!isRecord(fields)) {
    addIssue(errors, 'fields', 'fields must be an object.')
    return
  }

  validateStringValues(errors, 'fields', fields)

  const filledIntentFieldCount = fieldsIntentKeys.filter((key) => hasText(fields[key])).length

  if (filledIntentFieldCount < 2) {
    addIssue(errors, 'fields', 'fields must include at least two non-empty lead intent fields.')
  }
}

const validateLeadShape = (errors: ValidationIssue[], lead: unknown) => {
  if (!isRecord(lead)) {
    addIssue(errors, 'lead', 'lead must be an object.')
    return
  }

  validateStringValues(errors, 'lead', lead)

  leadIntentKeys.forEach((key) => {
    validateStringField(errors, `lead.${key}`, lead[key], {
      required: true,
      maxLength: 500
    })
  })
}

const validatePayload = (payload: unknown): ValidationResult => {
  const errors: ValidationIssue[] = []

  if (!isRecord(payload)) {
    return {
      ok: false,
      errors: [
        {
          field: 'payload',
          message: 'payload must be an object.'
        }
      ]
    }
  }

  validateStringField(errors, 'source', payload.source, {
    required: true,
    maxLength: 80,
    allowed: allowedSources
  })
  validateStringField(errors, 'submittedAt', payload.submittedAt, {
    required: true,
    maxLength: 80,
    isoLikeDate: true
  })
  validateStringField(errors, 'payloadVersion', payload.payloadVersion, {
    maxLength: 20,
    allowed: allowedPayloadVersions
  })
  validateStringField(errors, 'mode', payload.mode, {
    maxLength: 20,
    allowed: allowedModes
  })

  if (!hasText(payload.payloadVersion) && payload.mode !== 'mock') {
    addIssue(errors, 'payloadVersion', 'payloadVersion is required unless mode is mock.')
  }

  validatePage(errors, payload.page)

  const hasFields = isRecord(payload.fields)
  const hasLead = isRecord(payload.lead)

  if (!hasFields && !hasLead) {
    addIssue(errors, 'fields', 'fields or lead is required.')
  }

  if (payload.fields !== undefined) {
    validateFieldsShape(errors, payload.fields)
  }

  if (payload.lead !== undefined) {
    validateLeadShape(errors, payload.lead)
  }

  if (errors.length > 0) {
    return {
      ok: false,
      errors
    }
  }

  const page = payload.page as JsonRecord

  return {
    ok: true,
    acceptedShape: hasLead ? 'lead' : 'fields',
    pageType: String(page.pageType),
    source: String(payload.source)
  }
}

const createMockLeadId = () => {
  const randomValue = crypto.randomUUID ? crypto.randomUUID() : String(Date.now())
  return `mock_lead_${randomValue.replaceAll('-', '').slice(0, 12)}`
}

export const onRequest = async ({ request }: FunctionContext) => {
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: jsonHeaders
    })
  }

  if (request.method !== 'POST') {
    return jsonResponse(
      {
        ok: false,
        error: {
          code: 'METHOD_NOT_ALLOWED',
          message: 'Only POST is supported.'
        }
      },
      405
    )
  }

  let payload: unknown

  try {
    payload = await request.json()
  } catch {
    return jsonResponse(
      {
        ok: false,
        error: {
          code: 'INVALID_JSON',
          message: 'Invalid JSON body.'
        }
      },
      400
    )
  }

  const validationResult = validatePayload(payload)

  if (!validationResult.ok) {
    return jsonResponse(
      {
        ok: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid lead payload',
          details: validationResult.errors.slice(0, maxValidationDetails)
        }
      },
      400
    )
  }

  return jsonResponse({
    ok: true,
    mode: 'mock_function',
    leadId: createMockLeadId(),
    receivedAt: new Date().toISOString(),
    message: 'Mock lead received by Cloudflare Pages Function.',
    validationSummary: {
      acceptedShape: validationResult.acceptedShape,
      pageType: validationResult.pageType,
      source: validationResult.source
    }
  })
}
