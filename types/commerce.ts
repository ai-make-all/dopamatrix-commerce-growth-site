export type CommercePageType =
  | 'home'
  | 'commerce_growth'
  | 'local_brands'
  | 'ecommerce_products'
  | 'b2b_leads'

export type CommerceEventPrefix = 'home' | 'commerce' | 'local' | 'ecom' | 'b2b'

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
