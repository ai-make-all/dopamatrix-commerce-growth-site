type JsonRecord = Record<string, unknown>

type FunctionContext = {
  request: Request
}

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

const hasLeadData = (payload: JsonRecord) => {
  return isRecord(payload.fields) || isRecord(payload.lead)
}

const isValidLeadPayload = (payload: unknown) => {
  if (!isRecord(payload)) {
    return false
  }

  if (!hasText(payload.payloadVersion) && payload.mode !== 'mock') {
    return false
  }

  if (!hasText(payload.source) || !hasText(payload.submittedAt)) {
    return false
  }

  if (!isRecord(payload.page)) {
    return false
  }

  if (!hasText(payload.page.pageType) || !hasText(payload.page.slug)) {
    return false
  }

  return hasLeadData(payload)
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

  if (!isValidLeadPayload(payload)) {
    return jsonResponse(
      {
        ok: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid lead payload'
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
    message: 'Mock lead received by Cloudflare Pages Function.'
  })
}
