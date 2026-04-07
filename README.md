# Kelel IT Solution

Marketing website and internal lead inbox for Kelel IT Solution, built with Next.js.

## What is included

- Public company website
- Contact form with saved lead submissions
- Protected internal inbox
- Lead status, notes, owner assignment, follow-up dates, archive workflow
- Audit trail and per-user workload views
- Email notifications for new leads and assignee updates
- Optional Google Sheets sync
- Manual and scheduled reminder digests

## Local development

1. Install dependencies:

```bash
npm install
```

2. Create a local environment file:

```bash
copy .env.example .env
```

For production-style deployment prep, use:

```bash
copy .env.production.example .env
```

3. Start the app:

```bash
npm run dev
```

4. Open:

- Public site: `http://localhost:3000`
- Inbox: `http://localhost:3000/inbox`

## Deployment validation

Run this before publishing with production env values loaded:

```bash
npm run check:env
```

It verifies required variables and shows which optional integrations are configured.

## Secret generation

Generate strong values for production secrets with:

```bash
npm run generate:secrets
```

This prints fresh values for:

- `INBOX_SESSION_SECRET`
- `REMINDER_DIGEST_SECRET`

## Required environment variables

At minimum, set these before any shared or production deployment:

- `INBOX_USERS`
- `INBOX_SESSION_SECRET`

`INBOX_USERS` format:

```text
username:password:name:role:email|username2:password2:name2:role2:email2
```

Example:

```text
getnet:strong-password:Getnet Amdu Belay:admin:info@kelelitsolution.com
```

Allowed roles:

- `viewer`
- `editor`
- `admin`

## Optional integrations

### SMTP email

Enable lead notifications and reminder digests with:

- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE`
- `SMTP_USER`
- `SMTP_PASS`
- `LEAD_NOTIFICATION_FROM`
- `LEAD_NOTIFICATION_TO`

### Google Sheets sync

Enable lead sync with:

- `GOOGLE_SHEETS_WEBHOOK_URL`
- `GOOGLE_SHEETS_WEBHOOK_SECRET`

### Reminder digests

Enable protected scheduled digests with:

- `REMINDER_DIGEST_SECRET`

## Deployment checklist

1. Add all required environment variables on the host.
2. Start from [.env.production.example](/C:/Projects/kelel%20It%20solution/.env.production.example) when preparing production values.
2. Add SMTP values if you want notifications and digests.
3. Add Google Sheets webhook values if you want spreadsheet sync.
4. Set a strong `INBOX_SESSION_SECRET`.
5. Replace example inbox users with real credentials.
6. Confirm `/api/health` returns `ok`.
7. Confirm the contact form saves a lead in production.
8. Confirm inbox sign-in works with a real configured user.
9. Confirm reminder digests work from `/inbox` as an admin.

Recommended secret quality:

- use long random values for `INBOX_SESSION_SECRET`
- use a different strong random value for `REMINDER_DIGEST_SECRET`
- replace all example user passwords before deployment

## Health check

Use:

```text
/api/health
```

This endpoint returns basic status plus whether key integrations are configured.

## Reminder digest trigger

Manual admin trigger from the inbox UI is supported.

For scheduled runs, call:

```text
POST /api/reminders/digest?cadence=daily
POST /api/reminders/digest?cadence=weekly
```

Authorize either with:

- an active admin inbox session, or
- `x-reminder-secret: <REMINDER_DIGEST_SECRET>`
- `?secret=<REMINDER_DIGEST_SECRET>` in the request URL for schedulers that cannot send custom headers

## Vercel deployment

This repo now includes [vercel.json](/C:/Projects/kelel%20It%20solution/vercel.json) with example daily and weekly cron jobs for reminder digests.

Before using it:

1. Add all environment variables in the Vercel project settings.
2. Set `REMINDER_DIGEST_SECRET`.
3. Review the default cron times and adjust if needed.
4. Confirm assignee emails are present in `INBOX_USERS`.

## Production notes

- Lead data is currently stored in local JSON files under `data/`.
- For multi-instance or long-term production use, move lead storage to a database or managed backend.
- Scheduled digests depend on your hosting platform's cron or scheduler support.
- Email and Sheets sync fail safely, so lead submission still succeeds even if those integrations are unavailable.
