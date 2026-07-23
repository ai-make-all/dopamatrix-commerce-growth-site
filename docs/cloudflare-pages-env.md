# DopaMatrix Commerce Growth Cloudflare Pages Environment Variables

## Purpose

This file records how to configure Production and Preview environment variables for the DopaMatrix Commerce Growth Site on Cloudflare Pages.

Local `.env` is only used for development and must not be committed to Git.

Production secrets and variables are managed by Cloudflare Pages.

## Local Development

Example local `.env`:

```env
NUXT_PUBLIC_SITE_URL=http://localhost:3000
NUXT_PUBLIC_API_BASE_URL=
NUXT_PUBLIC_WHATSAPP_URL=
NUXT_PUBLIC_TELEGRAM_URL=
NUXT_PUBLIC_POSTHOG_ENABLED=false
NUXT_PUBLIC_POSTHOG_DEBUG=true
NUXT_PUBLIC_POSTHOG_KEY=
NUXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
NUXT_PUBLIC_LEAD_SUBMIT_MODE=mock
NUXT_PUBLIC_LEAD_API_PATH=/api/leads
```

Local development does not send real PostHog data by default.

When real validation is needed, temporarily set `NUXT_PUBLIC_POSTHOG_ENABLED=true` and fill in the Project token. After validation, change it back to `false`.

## Cloudflare Pages Production Variables

Production variables:

```env
NUXT_PUBLIC_SITE_URL=https://dopamatrix.com
NUXT_PUBLIC_API_BASE_URL=
NUXT_PUBLIC_WHATSAPP_URL=
NUXT_PUBLIC_TELEGRAM_URL=
NUXT_PUBLIC_POSTHOG_ENABLED=true
NUXT_PUBLIC_POSTHOG_DEBUG=false
NUXT_PUBLIC_POSTHOG_KEY=phc_xxxxxxxxxxxxxxxxx
NUXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
NUXT_PUBLIC_LEAD_SUBMIT_MODE=mock
NUXT_PUBLIC_LEAD_API_PATH=/api/leads
NODE_VERSION=22
```

If the production custom domain has not been resolved yet, use the default Cloudflare Pages `pages.dev` URL as `NUXT_PUBLIC_SITE_URL` first.

After the custom domain is ready, update `NUXT_PUBLIC_SITE_URL` and redeploy.

## Cloudflare Pages Preview Variables

Preview variables:

```env
NUXT_PUBLIC_SITE_URL=
NUXT_PUBLIC_API_BASE_URL=
NUXT_PUBLIC_WHATSAPP_URL=
NUXT_PUBLIC_TELEGRAM_URL=
NUXT_PUBLIC_POSTHOG_ENABLED=false
NUXT_PUBLIC_POSTHOG_DEBUG=false
NUXT_PUBLIC_POSTHOG_KEY=
NUXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
NUXT_PUBLIC_LEAD_SUBMIT_MODE=mock
NUXT_PUBLIC_LEAD_API_PATH=/api/leads
NODE_VERSION=22
```

Preview deployments do not send real PostHog data by default. This avoids polluting Production analytics from PR or branch deployments.

For manual API adapter preview testing, temporarily set `NUXT_PUBLIC_LEAD_SUBMIT_MODE=api` in a Preview environment. Production should remain `mock` unless an explicit smoke test is planned.

`NUXT_PUBLIC_LEAD_API_PATH` is public and should only contain the same-origin mock endpoint path, such as `/api/leads`. Do not put private tokens or destination credentials in any `NUXT_PUBLIC_*` variable.

The Lead API endpoint is still a mock endpoint. It does not connect to CRM, Email, Google Sheets, or a database.

## Build Settings

Cloudflare Pages build settings:

- Framework preset: Nuxt
- Build command: `npm run generate`
- Build output directory: `dist`
- Node version: 22

In the Cloudflare Pages Nuxt preset used by this project, `npm run generate` outputs `dist` in the Cloudflare build environment. Use `dist` as the Build output directory.

## Security Rules

- `.env` must not be committed to Git.
- `.env.example` can be committed.
- `NUXT_PUBLIC_POSTHOG_KEY` is a frontend Project token, not a Personal API Key.
- Personal API Key, database passwords, CRM tokens, and OpenAI secret keys must not be placed in `NUXT_PUBLIC_*`.
- Future private tokens for the real Lead API should be placed in non-public runtime config.

## Verification Checklist

- Production variables configured in Cloudflare.
- Preview variables configured in Cloudflare.
- `NODE_VERSION` set to 22 if Cloudflare UI does not expose Node selection.
- Production deploy succeeds.
- Production page loads.
- Browser console does not show `POSTHOG_DEBUG` logs when `debug=false`.
- PostHog receives `commerce_page_view` from production URL.
- Preview deployment does not send PostHog events by default.

## Future Phases

Phase 4-E:
Production PostHog verification.

Phase 5:
Real Lead Submission API.

Phase 6:
UTM and campaign attribution.
