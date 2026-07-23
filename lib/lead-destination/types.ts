export type LeadDestinationMode =
  | 'mock'
  | 'email'
  | 'sheets'
  | 'email_and_sheets'
  | 'webhook'

export interface NormalizedLead {
  leadId: string
  receivedAt: string
  submittedAt: string
  pageType: string
  eventPrefix?: string
  slug: string
  source: string
  market?: string
  language?: string
  audience?: string[]
  businessType?: string
  targetMarket?: string
  growthGoal?: string
  suggestedPath?: string
  rawShape: 'fields' | 'lead'
}

export interface LeadDestinationResult {
  ok: boolean
  mode: LeadDestinationMode
  destinationId?: string
  message?: string
  error?: {
    code: string
    message: string
  }
}

export interface LeadDestinationAdapter {
  send(lead: NormalizedLead): Promise<LeadDestinationResult>
}
