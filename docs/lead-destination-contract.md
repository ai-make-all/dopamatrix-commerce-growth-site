# Lead Destination Contract

## Destination Adapter Goals

- Provide one interface for different lead destinations.
- Isolate Email, Sheets, CRM, and webhook differences from `/api/leads`.
- Keep the `/api/leads` main logic focused on validation, normalization, and response handling.
- Support future server-side environment based switching.

## Future Destination Modes

Future server-side environment variable:

```env
LEAD_DESTINATION_MODE=mock
LEAD_DESTINATION_MODE=email
LEAD_DESTINATION_MODE=sheets
LEAD_DESTINATION_MODE=email_and_sheets
LEAD_DESTINATION_MODE=webhook
```

This must not be a `NUXT_PUBLIC_*` variable. It belongs to Cloudflare server-side environment configuration.

This phase only documents the modes. It does not implement code or enable a provider.

## Destination Adapter Interface Draft

Draft only:

```ts
type LeadDestinationMode =
  | 'mock'
  | 'email'
  | 'sheets'
  | 'email_and_sheets'
  | 'webhook'

interface NormalizedLead {
  leadId: string
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
  rawShape: 'fields' | 'lead'
}

interface LeadDestinationResult {
  ok: boolean
  mode: LeadDestinationMode
  destinationId?: string
  error?: {
    code: string
    message: string
  }
}

interface LeadDestinationAdapter {
  send(lead: NormalizedLead): Promise<LeadDestinationResult>
}
```

## Normalization Rules

- Do not send the full raw payload to a destination by default.
- Extract only business fields needed for follow-up.
- Do not send debug-only fields.
- Do not send the full attribution object unless a later phase explicitly requires it.
- Keep `leadId` for troubleshooting.
- Keep `pageType`, `slug`, market, business type, target market, and growth goal.

## Email Notification Draft

Subject:

```text
New DopaMatrix Commerce Lead - {pageType} - {market}
```

Body fields:

- Lead ID.
- Submitted At.
- Use Case Page.
- Business Type / Category / Industry.
- Target Market.
- Growth Goal.
- Suggested Growth Path.
- Source URL.
- Environment.

Do not put real recipients or provider keys in this document.

## Google Sheets Row Draft

Suggested columns:

- `lead_id`
- `submitted_at`
- `page_type`
- `slug`
- `source`
- `market`
- `language`
- `business_type`
- `target_market`
- `growth_goal`
- `suggested_path`
- `environment`
- `status`
- `owner`
- `notes`

## Error Handling Draft

- A destination send failure must not silently lose a validation-passed lead.
- Without persistence, real destination integration must be enabled carefully.
- Without a queue or database, avoid enabling real destinations broadly in production.
- Future reliability options include Cloudflare Queues, D1, R2, or an external CRM.

## Privacy and Logging Rules

- Do not `console.log` the full payload.
- Do not echo the full lead in error responses.
- Do not put secrets in `NUXT_PUBLIC_*`.
- Do not write user-submitted content to public logs.
- Do not send the raw payload directly to multiple third parties.

## Review Checklist

- Server-side environment variables only.
- Provider secret exists in the server-side environment.
- No public token leakage.
- Validation passes before destination send.
- Normalization passes before destination send.
- Failure response is safe.
- No raw payload logging.
- Production default remains mock until approved.
