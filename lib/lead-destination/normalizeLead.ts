import type { NormalizedLead } from './types'

type JsonRecord = Record<string, unknown>

const isRecord = (value: unknown): value is JsonRecord => {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

const textValue = (value: unknown) => {
  if (typeof value !== 'string') {
    return undefined
  }

  const trimmedValue = value.trim()
  return trimmedValue.length > 0 ? trimmedValue : undefined
}

const textFromRecord = (record: JsonRecord | undefined, key: string) => {
  return record ? textValue(record[key]) : undefined
}

const firstText = (values: Array<unknown>) => {
  for (const value of values) {
    const normalizedValue = textValue(value)

    if (normalizedValue) {
      return normalizedValue
    }
  }

  return undefined
}

const stringArray = (value: unknown) => {
  if (!Array.isArray(value)) {
    return undefined
  }

  const values = value
    .filter((item): item is string => typeof item === 'string')
    .map((item) => item.trim())
    .filter(Boolean)

  return values.length > 0 ? values : undefined
}

export const normalizeLeadForDestination = (params: {
  payload: unknown
  leadId: string
  receivedAt: string
}): NormalizedLead => {
  if (!isRecord(params.payload)) {
    throw new Error('Lead payload must be an object.')
  }

  const payload = params.payload
  const page = isRecord(payload.page) ? payload.page : undefined
  const locale = isRecord(payload.locale) ? payload.locale : undefined
  const fields = isRecord(payload.fields) ? payload.fields : undefined
  const lead = isRecord(payload.lead) ? payload.lead : undefined
  const conversionIntent = isRecord(payload.conversionIntent) ? payload.conversionIntent : undefined
  const demoContext = isRecord(payload.demoContext) ? payload.demoContext : undefined
  const rawShape = lead ? 'lead' : 'fields'

  return {
    leadId: params.leadId,
    receivedAt: params.receivedAt,
    submittedAt: textValue(payload.submittedAt) || params.receivedAt,
    pageType: textFromRecord(page, 'pageType') || 'unknown',
    eventPrefix: textFromRecord(page, 'eventPrefix'),
    slug: textFromRecord(page, 'slug') || '/',
    source: textValue(payload.source) || 'unknown',
    market: firstText([
      locale?.market,
      locale?.regionLabel
    ]),
    language: textFromRecord(locale, 'language'),
    audience: stringArray(locale?.audiences) || stringArray(locale?.audience),
    businessType: lead
      ? textFromRecord(lead, 'businessType')
      : firstText([
          fields?.businessType,
          fields?.category,
          fields?.industry
        ]),
    targetMarket: lead
      ? textFromRecord(lead, 'targetMarket')
      : firstText([
          fields?.targetMarket,
          fields?.market
        ]),
    growthGoal: lead
      ? textFromRecord(lead, 'growthGoal')
      : firstText([
          fields?.growthGoal,
          fields?.goal
        ]),
    suggestedPath: firstText([
      conversionIntent?.suggestedPath,
      conversionIntent?.recommendedPath,
      conversionIntent?.pathLabel,
      demoContext?.recommendedPath,
      demoContext?.defaultPath
    ]),
    rawShape
  }
}
