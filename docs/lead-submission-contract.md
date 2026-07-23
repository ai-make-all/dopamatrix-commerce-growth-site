# DopaMatrix Commerce Growth Lead Submission Contract v1

## Purpose

This file defines the data contract, server boundary, security requirements, and future integration direction from the Commerce Growth Suite frontend Lead Capture flow to a future server-side Lead Submission API.

The current phase remains mock submit only. No real lead data is submitted.

## Current State

- Lead Capture UI exists.
- Mock submit exists.
- Payload preview exists.
- Lead Summary exists.
- PostHog analytics is connected.
- Real Lead API is not implemented.
- The current frontend does not submit real data.

## Lead Submission Endpoint Proposal

Future endpoint:

```http
POST /api/leads
```

If deployed with Cloudflare Pages Functions, the future path can be:

```text
functions/api/leads.ts
```

Phase 5-C adds a mock Cloudflare Pages Function at this path. It defines and validates the server entry point, but it still does not store lead data or forward lead data to any destination.

## Phase 5-C Mock Endpoint Status

- A Cloudflare Pages Function mock endpoint has been created.
- Function file path: `functions/api/leads.ts`.
- HTTP path: `POST /api/leads`.
- The endpoint currently returns a mock response only.
- The endpoint does not store leads.
- The endpoint does not forward leads to CRM.
- The endpoint does not send email.
- The endpoint does not replace the frontend mock adapter.
- The frontend still defaults to `mockLeadAdapter`.
- A frontend API adapter should be introduced in a later phase before this endpoint is used by the Lead Capture UI.

## Phase 5-D Server-side Validation Status

- The `/api/leads` mock endpoint now includes server-side validation hardening.
- The endpoint currently supports both the current frontend `fields` shape and the future API contract `lead` shape.
- The endpoint validates `page`, `source`, `submittedAt`, payload version or mock mode, and lead intent fields.
- The endpoint returns structured validation errors with a bounded `details` array.
- The endpoint does not echo the full submitted payload in responses.
- The endpoint does not store, forward, or send lead data.
- The frontend still defaults to `mockLeadAdapter`.
- A frontend API adapter or real destination integration should be introduced only in a later phase.

## Phase 5-E Frontend API Adapter Preview Status

- `apiLeadAdapter` has been added as a frontend submit adapter.
- `useCommerceLeadSubmit` now selects the adapter from public runtime config.
- The default submit mode is `NUXT_PUBLIC_LEAD_SUBMIT_MODE=mock`.
- The frontend only posts to `/api/leads` when `NUXT_PUBLIC_LEAD_SUBMIT_MODE=api`.
- `NUXT_PUBLIC_LEAD_API_PATH` defaults to `/api/leads`.
- `mockLeadAdapter` remains the default path.
- Production should remain `mock` unless a manual API preview smoke test is planned.
- The API adapter is preview-only and still targets the mock endpoint.
- No CRM, Email, Google Sheets, or database destination is connected.

## Request Payload Contract

Payload v1 structure:

```json
{
  "payloadVersion": "1.0",
  "source": "commerce_growth_site",
  "submittedAt": "ISO timestamp",
  "page": {
    "pageType": "local_brands | ecommerce_products | b2b_leads | commerce_growth | home",
    "eventPrefix": "local | ecom | b2b | commerce | home",
    "slug": "/use-cases/local-brands"
  },
  "locale": {
    "market": "philippines | southeast_asia | middle_east | global",
    "regionLabel": "Philippines",
    "language": "zh",
    "languageLabel": "Chinese + English",
    "audiences": ["chinese_founder"],
    "audienceLabel": "Chinese founders + local operators"
  },
  "lead": {
    "businessType": "",
    "targetMarket": "",
    "growthGoal": ""
  },
  "conversionIntent": {
    "primaryGoal": "store_visit | ecommerce_order | b2b_inquiry",
    "suggestedPath": ""
  },
  "attribution": {
    "utmSource": "",
    "utmMedium": "",
    "utmCampaign": "",
    "landingPage": "",
    "referrer": ""
  },
  "meta": {
    "mode": "production",
    "userAgent": "",
    "url": ""
  }
}
```

Field naming should remain consistent within each object. The current analytics adapter uses flattened PostHog fields such as `page_type`, but the API payload can use structured objects.

## Required Fields

Minimum server-side required fields:

- `payloadVersion`
- `source`
- `submittedAt`
- `page.pageType`
- `page.slug`
- `lead.businessType`
- `lead.targetMarket`
- `lead.growthGoal`

## Validation Rules

Future server-side validation should enforce:

- `payloadVersion` must be `1.0`.
- `source` must be `commerce_growth_site`.
- `page.pageType` must be an allowed enum value.
- `lead.businessType`, `lead.targetMarket`, and `lead.growthGoal` must not be empty.
- String length limits must be enforced.
- HTML or script injection must be rejected or sanitized.
- Frontend-provided `submittedAt` must not be trusted as the server receive time. The server should generate `receivedAt`.
- Frontend-provided IP or `userAgent` must not be trusted. The server should read these from the request.

## Security Boundary

- Frontend `NUXT_PUBLIC_*` variables are public.
- Private tokens must never enter the frontend.
- Future CRM, Email, or Google Sheets tokens must be stored in Cloudflare server-side environment variables.
- The browser must not call private third-party CRM APIs directly.
- Future abuse protection should include Turnstile or a honeypot.
- The server should include rate limiting or basic abuse protection.

## Response Contract

Future success response:

```json
{
  "ok": true,
  "leadId": "lead_xxx",
  "receivedAt": "ISO timestamp",
  "mode": "production"
}
```

Future failure response:

```json
{
  "ok": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid lead payload"
  }
}
```

## PostHog Relationship

After the real API succeeds, the frontend should continue sending:

- `commerce_lead_submit_attempt`
- `commerce_lead_submit_success`
- `commerce_lead_submit_error`

The current analytics contract already includes:

- `commerce_lead_mock_submit`
- `commerce_lead_summary_generated`

Future phases must not directly remove existing events. Mock and real submission behavior should be distinguished by version fields and event semantics.

## Integration Roadmap

Phase 5-B:
Frontend lead submit adapter design.

Phase 5-C:
Cloudflare Pages Function mock endpoint.

Phase 5-D:
Server-side validation.

Phase 5-E:
Frontend API adapter preview behind an environment flag.

Phase 5-F:
Real destination integration, such as email, Google Sheets, or CRM.

Phase 6:
UTM and campaign attribution.

## Review Checklist

- Contract does not include secrets.
- Mock endpoint exists at functions/api/leads.ts.
- Real destination integration is not implemented.
- Existing frontend mock submit behavior remains unchanged.
- Required fields are clear.
- Server boundary is clear.
- Security rules are documented.
- Existing mock submit behavior remains unchanged.
- Existing PostHog events remain unchanged.
- Docs file is included in `review-files.txt`.
