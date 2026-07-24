# Lead Email Environment Checklist

## Purpose

This checklist defines server-side environment variables required for future real email notification.

## Current Phase

- Phase 5-I does not set these variables.
- Phase 5-I does not send email.
- Variables below are future Cloudflare server-side variables.
- They must not use `NUXT_PUBLIC_*`.

## Future Resend Variables

```env
LEAD_DESTINATION_MODE=mock
LEAD_EMAIL_PROVIDER=resend
LEAD_EMAIL_TO=
LEAD_EMAIL_FROM=
LEAD_EMAIL_REPLY_TO=
RESEND_API_KEY=
```

- `LEAD_DESTINATION_MODE` should remain `mock` by default.
- Set `LEAD_DESTINATION_MODE=email` only during an explicit smoke test.
- `RESEND_API_KEY` must be server-side only.
- Never expose `RESEND_API_KEY` through `NUXT_PUBLIC_*`.
- `LEAD_EMAIL_TO` should point to the internal operator inbox.
- `LEAD_EMAIL_FROM` must use a verified sender or domain.
- `LEAD_EMAIL_REPLY_TO` can point to the business-facing contact address.

## Future Cloudflare Email Service Variables / Binding

If Cloudflare Email Service is selected later, it may require a Cloudflare Email Service binding rather than a third-party API key.

Draft names:

```env
LEAD_DESTINATION_MODE=email
LEAD_EMAIL_PROVIDER=cloudflare_email_service
LEAD_EMAIL_TO=
LEAD_EMAIL_FROM=
LEAD_EMAIL_REPLY_TO=
```

- Binding configuration should be documented separately before implementation.
- Do not implement binding in Phase 5-I.

## Future Postmark Variables

```env
LEAD_DESTINATION_MODE=email
LEAD_EMAIL_PROVIDER=postmark
LEAD_EMAIL_TO=
LEAD_EMAIL_FROM=
LEAD_EMAIL_REPLY_TO=
POSTMARK_SERVER_TOKEN=
```

- `POSTMARK_SERVER_TOKEN` must be server-side only.
- Workers implementation should use `fetch`, not require Postmark Node SDK.

## Safe Defaults

Recommended current Cloudflare Production defaults:

```env
LEAD_DESTINATION_MODE=mock
NUXT_PUBLIC_LEAD_SUBMIT_MODE=mock
NUXT_PUBLIC_POSTHOG_ENABLED=false
NUXT_PUBLIC_POSTHOG_DEBUG=false
```

- Do not set `RESEND_API_KEY` in production until Phase 5-J.
- Do not set `LEAD_DESTINATION_MODE=email` until explicit review.
- Do not enable PostHog production analytics unless explicitly approved.

## Preview Smoke Test Defaults

Future Phase 5-J Preview smoke test values:

```env
LEAD_DESTINATION_MODE=email
LEAD_EMAIL_PROVIDER=resend
LEAD_EMAIL_TO=<masked internal inbox>
LEAD_EMAIL_FROM=<verified sender>
LEAD_EMAIL_REPLY_TO=<reply address>
RESEND_API_KEY=<server-side secret>
NUXT_PUBLIC_LEAD_SUBMIT_MODE=api
```

- Preview only.
- Mask secrets in screenshots.
- After smoke test, revert Preview `LEAD_DESTINATION_MODE` to `mock`.

## Security Checklist

- No secret in `NUXT_PUBLIC_*`.
- No secret in Git.
- No `.env` commit.
- No raw payload logging.
- No `normalizedLead` logging.
- No provider error body exposed directly to frontend.
- No real email mode enabled before validation.
- No production real email mode before preview smoke test.
