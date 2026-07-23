export type CommercePageType =
  | 'home'
  | 'commerce_growth'
  | 'local_brands'
  | 'ecommerce_products'
  | 'b2b_leads'

export type CommerceEventPrefix = 'home' | 'commerce' | 'local' | 'ecom' | 'b2b'

export type CommerceAnalyticsEvent =
  | 'commerce_page_view'
  | 'commerce_cta_click'
  | 'commerce_route_select'
  | 'commerce_demo_start'
  | 'commerce_demo_complete'
  | 'commerce_lead_form_start'
  | 'commerce_lead_mock_submit'
  | 'commerce_lead_summary_generated'
  | 'commerce_lead_submit_attempt'
  | 'commerce_lead_submit_success'
  | 'commerce_lead_submit_error'

export type CommerceMarket = 'philippines' | 'southeast_asia'

export type CommerceLanguage = 'zh' | 'en'

export type CommerceAudience =
  | 'chinese_founder'
  | 'overseas_marketing_team'
  | 'local_operator'
  | 'regional_buyer'
  | 'b2b_procurement'
  | 'channel_partner'

export interface CommerceLocaleContext {
  market: CommerceMarket
  regionLabel: string
  language: CommerceLanguage
  languageLabel: string
  audiences: CommerceAudience[]
  audienceLabel: string
}

export interface CommerceAnalyticsPageContext {
  pageType: CommercePageType
  eventPrefix: CommerceEventPrefix
  slug: string
}

export interface CommerceAnalyticsContext {
  page: CommerceAnalyticsPageContext
  locale?: CommerceLocaleContext
  audience?: string[]
}

export interface CommerceAnalyticsPayload {
  event: CommerceAnalyticsEvent
  timestamp: string
  analyticsVersion: string
  context: CommerceAnalyticsContext
  properties?: Record<string, unknown>
}

export interface CommerceCta {
  label: string
  href: string
  variant?: 'primary' | 'secondary' | 'ghost'
}

export interface CommerceSeoConfig {
  title: string
  description: string
  canonicalPath: string
  ogTitle: string
  ogDescription: string
  ogImage: string
  keywords: string[]
}

export interface CommerceHeroConfig {
  eyebrow: string
  title: string
  subtitle: string
  primaryCta: CommerceCta
  secondaryCtas: CommerceCta[]
  badges: string[]
}

export interface CommerceSectionItem {
  title: string
  description: string
}

export interface CommerceDemoOption {
  label: string
  value: string
  description?: string
}

export interface CommerceDemoStep {
  key: string
  title: string
  options: CommerceDemoOption[]
}

export interface CommerceDemoConfig {
  title: string
  description: string
  eventPrefix: CommerceEventPrefix
  steps: CommerceDemoStep[]
  resultLabels: string[]
}

export interface CommerceDemoContext {
  title: string
  description: string
  selectedOptions: Record<string, string[]>
  highlightedOutputs: string[]
}

export interface CommerceLeadField {
  key: string
  label: string
  placeholder: string
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select'
  required?: boolean
  options?: string[]
}

export interface CommerceLeadConfig {
  title: string
  description: string
  submitLabel: string
  helperText: string
  fields: CommerceLeadField[]
}

export interface CommerceLeadContext {
  pageType: CommercePageType
  eventPrefix: CommerceEventPrefix
  slug: string
  locale: CommerceLocaleContext
  demoContext?: CommerceDemoContext
}

export interface CommerceLeadSummary {
  title: string
  subtitle: string
  items: Array<{
    label: string
    value: string
  }>
  recommendedPath: string
}

export interface CommerceLeadPayload {
  mode: 'mock'
  submittedAt: string
  source: 'commerce_lead_capture'
  page: {
    pageType: CommercePageType
    eventPrefix: CommerceEventPrefix
    slug: string
  }
  locale: CommerceLocaleContext
  demoContext?: CommerceDemoContext
  conversionIntent?: {
    businessGoal: string
    primaryOutcome: string
  }
  sourceContext?: {
    pageTitle?: string
    entryPoint?: string
  }
  fields: Record<string, string>
}

export type LeadSubmitMode = 'mock' | 'api'

export interface LeadSubmitResult {
  ok: boolean
  mode: LeadSubmitMode
  payload?: CommerceLeadPayload
  leadId?: string
  error?: {
    code: string
    message: string
    details?: unknown
  }
}

export interface LeadSubmitAdapter {
  submit(payload: CommerceLeadPayload): Promise<LeadSubmitResult>
}

export interface LeadApiSuccessResponse {
  ok: true
  mode: 'mock_function'
  leadId: string
  receivedAt: string
  message: string
  validationSummary?: {
    acceptedShape?: string
    pageType?: string
    source?: string
  }
}

export interface LeadApiErrorResponse {
  ok: false
  error: {
    code: string
    message: string
    details?: unknown
  }
}

export type LeadApiResponse = LeadApiSuccessResponse | LeadApiErrorResponse

export interface CommerceFaqItem {
  question: string
  answer: string
}

export interface CommerceBreadcrumbItem {
  name: string
  path: string
}

export interface CommercePageConfig {
  pageType: CommercePageType
  eventPrefix: CommerceEventPrefix
  slug: string
  locale: CommerceLocaleContext
  seo: CommerceSeoConfig
  hero: CommerceHeroConfig
  painPoints: CommerceSectionItem[]
  solution: CommerceSectionItem[]
  outcomes: CommerceSectionItem[]
  matrix: CommerceSectionItem[]
  attribution: CommerceSectionItem[]
  assets: CommerceSectionItem[]
  workModes?: CommerceSectionItem[]
  demo?: CommerceDemoConfig
  demoContext?: CommerceDemoContext
  lead?: CommerceLeadConfig
  faq: CommerceFaqItem[]
  breadcrumbs: CommerceBreadcrumbItem[]
}
