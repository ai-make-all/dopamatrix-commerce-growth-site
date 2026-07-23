import type { LeadDestinationAdapter, LeadDestinationResult, NormalizedLead } from './types'

export const createMockDestinationAdapter = (): LeadDestinationAdapter => ({
  async send(lead: NormalizedLead): Promise<LeadDestinationResult> {
    return {
      ok: true,
      mode: 'mock',
      destinationId: `mock_destination_${lead.leadId}`,
      message: 'Mock destination accepted normalized lead.'
    }
  }
})
