import type { CommerceLeadPayload } from '~/types/commerce'
import { mockLeadAdapter } from '~/composables/adapters/mockLeadAdapter'

export const useCommerceLeadSubmit = () => {
  const submitLead = async (payload: CommerceLeadPayload) => {
    return mockLeadAdapter.submit(payload)
  }

  return {
    submitLead
  }
}
