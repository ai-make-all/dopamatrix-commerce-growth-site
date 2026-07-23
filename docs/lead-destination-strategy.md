# Lead Destination Strategy

## Current State

- The frontend defaults to `mockLeadAdapter`.
- API mode can be temporarily enabled with an environment flag.
- `/api/leads` is currently a Cloudflare Pages Function mock endpoint.
- `/api/leads` already includes server-side validation.
- The endpoint does not store, forward, or send lead data.

## Destination Decision

Recommended v1 destination:

- Primary destination: Email notification.
- Secondary destination: Google Sheets lead log.

Not v1:

- HubSpot / CRM.
- Feishu / Lark.
- Self-hosted DB.
- Generic webhook.

## Why Email First

- Minimal operational dependency.
- Fastest path to notify the business team.
- Suitable for early manual follow-up.
- Does not require the business team to set up a CRM first.
- Helps validate lead quality immediately.

## Why Google Sheets Second

- Suitable for an early lightweight lead ledger.
- Easy for operations teams to view and edit.
- Easy to summarize by `pageType`, market, business type, or goal.
- Requires a service account or external connector, which introduces secrets and permissions.
- Should not enter the main path before the email notification path is stable.

## Why CRM Later

- CRM field mapping is heavier than early lead validation needs.
- Different customers and teams may use different CRM systems.
- The lead schema is still evolving.
- Early CRM integration can create more integration cost than product validation value.

## Destination Architecture

Future chain:

```text
/api/leads
  -> validate payload
  -> normalize lead
  -> create destination event
  -> send to destination adapter
  -> return response
```

This phase only documents the design. It does not implement destination adapters or provider calls.

## Recommended Phase Plan

Phase 5-H:

- Destination adapter interface draft.
- Still no real provider call.

Phase 5-I:

- Email notification mock adapter.
- Still no real email send.

Phase 5-J:

- Real Email provider integration behind an environment flag.

Phase 5-K:

- Google Sheets logging preparation.

Phase 6:

- UTM and campaign attribution.

## Operational Notes

- After a lead is received, first review it manually.
- Record `pageType`, market, source, `submittedAt`, business type, and goal.
- Do not automatically assign CRM status in the early stage.
- Do not automatically send sales scripts in the early stage.
- Keep human review in the loop until lead quality and routing are validated.
