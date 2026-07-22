# Zero Limits Baseball — Demo Website

A Next.js demo rebuild of [zerolimitsbaseball.com](https://zerolimitsbaseball.com/) for Vercel hosting. Marketing pages live here; customer accounts, scheduling, payments, and memberships are handled by [Upper Hand](https://upperhand.com).

## Pages

- `/` — Home
- `/about` — About
- `/schedule-training` — Embedded booking (lesson sessions, availability, browse events, camps). Also `/book` and `/schedule`.
- `/gallery` — Facility photos
- `/contact` — Contact form (mailto demo)

## Local Development

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Upper Hand URLs

Copy `.env.example` to `.env.local` and set four booking embed URLs:

- `NEXT_PUBLIC_UPPERHAND_PRIVATE_LESSONS_URL`
- `NEXT_PUBLIC_UPPERHAND_GROUP_LESSONS_URL`
- `NEXT_PUBLIC_UPPERHAND_CAMPS_URL`
- `NEXT_PUBLIC_UPPERHAND_BROWSE_EVENTS_URL`

For embedded booking, use customer-facing portal URLs (`app.upperhand.io` or `app.dbathub.com`). Raw `api.*` endpoints require an `X-Customer-Id` header and cannot load inside an iframe.

## Deploy to Vercel

1. Push this repo to GitHub (e.g. `zero-limits-demo`).
2. Import the repo at [vercel.com/new](https://vercel.com/new).
3. Add environment variables from `.env.example`.
4. Deploy — Vercel auto-detects Next.js.

Demo URL example: `zero-limits-demo.vercel.app`

## Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- No database, login, or payment processing on this site
