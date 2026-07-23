# DopaMatrix Commerce Growth PostHog Dashboard Schema v1

## Purpose

This dashboard is used to analyze Commerce Growth Suite traffic, growth path selection, Demo exposure, Lead intent, and Summary generation.

It is not designed for automatic capture of every click behavior. The dashboard should focus on the explicit Commerce Analytics events defined by the site contract.

## Event Contract

Current Commerce Analytics events:

- `commerce_page_view`
- `commerce_cta_click`
- `commerce_route_select`
- `commerce_demo_start`
- `commerce_demo_complete`
- `commerce_lead_form_start`
- `commerce_lead_mock_submit`
- `commerce_lead_summary_generated`
- `commerce_lead_submit_attempt`
- `commerce_lead_submit_success`
- `commerce_lead_submit_error`

## Shared Properties

The following flattened properties should be visible in PostHog:

- `analytics_version`
- `source`
- `page_type`
- `event_prefix`
- `page_slug`
- `locale_market`
- `locale_region_label`
- `locale_language`
- `locale_language_label`
- `audience`
- `audience_label`

Some events include their own properties, for example:

- `ctaLabel` / `href` / `ctaVariant`
- `routeType` / `routeSlug`
- `demoType` / `completionMode`
- `fieldKeys` / `payloadVersion`
- `conversionIntent` / `summaryType`
- `leadId` / `errorCode`

## Phase 5-E API Preview Events

The following events are emitted only when the frontend submit adapter is explicitly switched to API preview mode with `NUXT_PUBLIC_LEAD_SUBMIT_MODE=api`:

- `commerce_lead_submit_attempt`
- `commerce_lead_submit_success`
- `commerce_lead_submit_error`

Default mock mode still emits `commerce_lead_mock_submit`. The API preview events do not replace the current mock funnel dashboard.

## Future Destination Events

Future destination adapter events may include:

- `commerce_lead_destination_attempt`
- `commerce_lead_destination_success`
- `commerce_lead_destination_error`

These events are not implemented in the current phase. They should only be emitted after a real server-side destination adapter is introduced.

The current Phase 5-F dashboard does not depend on these events.

## Dashboard

Dashboard name:

`DopaMatrix Commerce Growth Funnel v1`

## Insights

### 1. Use-case Landing Funnel

Type:
Funnels

Steps:

- `commerce_page_view`
- `commerce_demo_start`
- `commerce_demo_complete`
- `commerce_lead_form_start`
- `commerce_lead_mock_submit`
- `commerce_lead_summary_generated`

Breakdown:
`page_type`

Purpose:
Measure conversion from use-case page visit to lead summary generation.

### 2. Homepage Route Selection Funnel

Type:
Funnels

Steps:

- `commerce_page_view`
- `commerce_route_select`
- `commerce_demo_start`
- `commerce_lead_form_start`
- `commerce_lead_mock_submit`

Breakdown:
`routeType` or `routeSlug`, depending on the property available in PostHog.

Purpose:
Measure how homepage or overview visitors choose growth paths and move into lead intent.

### 3. Page Views by Page Type

Type:
Trends

Event:
`commerce_page_view`

Breakdown:
`page_type`

Purpose:
Compare traffic across home, overview, local, e-commerce, and B2B pages.

### 4. Route Selection by Target

Type:
Trends

Event:
`commerce_route_select`

Breakdown:
`routeType` or `routeSlug`

Purpose:
Understand which growth path users select.

### 5. Demo Engagement

Type:
Trends

Events:

- `commerce_demo_start`
- `commerce_demo_complete`

Breakdown:
`page_type`

Purpose:
Measure demo exposure and default growth context rendering.

### 6. Lead Intent

Type:
Trends

Events:

- `commerce_lead_form_start`
- `commerce_lead_mock_submit`
- `commerce_lead_summary_generated`

Breakdown:
`page_type`

Purpose:
Measure lead intent depth by use case.

### 7. Lead Mock Submit by Market

Type:
Trends

Event:
`commerce_lead_mock_submit`

Breakdown:
`locale_market`

Purpose:
Understand which markets produce stronger lead intent.

### 8. Lead Mock Submit by Audience

Type:
Trends

Event:
`commerce_lead_mock_submit`

Breakdown:
`audience_label`

Purpose:
Understand which audience segment produces stronger lead intent.

## Localhost vs Production Data

During local validation, events may have URLs such as `http://localhost:3000`.

For production dashboards, filter out localhost using PostHog's URL property after deployment.

Do not filter localhost in the initial dashboard while local smoke testing is ongoing.

## Dashboard Review Checklist

- `commerce_page_view` appears in Trends.
- `commerce_route_select` appears in Trends.
- `commerce_demo_start` appears in Trends.
- `commerce_lead_mock_submit` appears after submitting a lead form.
- `commerce_lead_summary_generated` appears after summary generation.
- Funnel can be built from page view to summary generated.
- Breakdown by `page_type` works.
- Breakdown by `routeType` or `routeSlug` works.
- Breakdown by `locale_market` works.
- Breakdown by `audience_label` works.

## Future Phases

Phase 4-D:
Production environment variables on Cloudflare Pages.

Phase 4-E:
Production PostHog verification.

Phase 5:
Real Lead Submission API.

Phase 6:
UTM and campaign attribution.
