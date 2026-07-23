import type { CommerceLeadPayload, LeadSubmitMode } from '~/types/commerce'
import { createApiLeadAdapter } from '~/composables/adapters/apiLeadAdapter'
import { mockLeadAdapter } from '~/composables/adapters/mockLeadAdapter'

export const useCommerceLeadSubmit = () => {
  const config = useRuntimeConfig()

  const getLeadSubmitMode = (): LeadSubmitMode => {
    return String(config.public.leadSubmitMode || 'mock') === 'api' ? 'api' : 'mock'
  }

  const submitLead = async (payload: CommerceLeadPayload) => {
    const leadSubmitMode = getLeadSubmitMode()

    if (leadSubmitMode === 'api') {
      const leadApiPath = String(config.public.leadApiPath || '/api/leads')
      return createApiLeadAdapter(leadApiPath).submit(payload)
    }

    return mockLeadAdapter.submit(payload)
  }

  return {
    getLeadSubmitMode,
    submitLead
  }
}
