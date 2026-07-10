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
  | 'home'
  | 'commerce_growth'
  | 'local_brands'
  | 'ecommerce_products'
  | 'b2b_leads'

export interface CommerceLocaleContext {
  market: CommerceMarket
  regionLabel: string
  language: CommerceLanguage
  languageLabel: string
  audience: CommerceAudience
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
  faq: CommerceFaqItem[]
  breadcrumbs: CommerceBreadcrumbItem[]
}
