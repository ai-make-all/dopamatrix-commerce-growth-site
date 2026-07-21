import type { CommerceLeadPayload, LeadSubmitAdapter, LeadSubmitResult } from '~/types/commerce'

export const mockLeadAdapter: LeadSubmitAdapter = {
  async submit(payload: CommerceLeadPayload): Promise<LeadSubmitResult> {
    return {
      ok: true,
      mode: 'mock',
      payload
    }
  }
}
