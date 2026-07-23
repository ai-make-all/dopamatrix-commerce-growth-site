export type {
  LeadDestinationAdapter,
  LeadDestinationMode,
  LeadDestinationResult,
  NormalizedLead
} from './types'
export { normalizeLeadForDestination } from './normalizeLead'
export { createMockDestinationAdapter } from './mockDestinationAdapter'

import { createMockDestinationAdapter } from './mockDestinationAdapter'
import type { LeadDestinationResult, NormalizedLead } from './types'

export const sendLeadToDestination = async (params: {
  lead: NormalizedLead
  mode?: string
}): Promise<LeadDestinationResult> => {
  const adapter = createMockDestinationAdapter()
  return adapter.send(params.lead)
}
