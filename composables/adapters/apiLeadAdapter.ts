import type { CommerceLeadPayload, LeadApiResponse, LeadSubmitAdapter, LeadSubmitResult } from '~/types/commerce'

const defaultLeadApiPath = '/api/leads'

const parseLeadApiResponse = async (response: Response): Promise<LeadApiResponse | null> => {
  try {
    return await response.json()
  } catch {
    return null
  }
}

const normalizeApiError = (
  responseBody: LeadApiResponse | null,
  fallbackCode: string,
  fallbackMessage: string
) => {
  if (responseBody && !responseBody.ok) {
    return {
      code: responseBody.error.code || fallbackCode,
      message: responseBody.error.message || fallbackMessage,
      details: responseBody.error.details
    }
  }

  return {
    code: fallbackCode,
    message: fallbackMessage
  }
}

export const createApiLeadAdapter = (leadApiPath = defaultLeadApiPath): LeadSubmitAdapter => ({
  async submit(payload: CommerceLeadPayload): Promise<LeadSubmitResult> {
    try {
      const response = await fetch(leadApiPath || defaultLeadApiPath, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      const responseBody = await parseLeadApiResponse(response)

      if (response.ok && responseBody?.ok) {
        return {
          ok: true,
          mode: 'api',
          payload,
          leadId: responseBody.leadId
        }
      }

      return {
        ok: false,
        mode: 'api',
        payload,
        error: normalizeApiError(responseBody, 'LEAD_API_ERROR', 'Lead API request failed.')
      }
    } catch {
      return {
        ok: false,
        mode: 'api',
        payload,
        error: {
          code: 'NETWORK_ERROR',
          message: 'Lead API request failed.'
        }
      }
    }
  }
})

export const apiLeadAdapter = createApiLeadAdapter()
