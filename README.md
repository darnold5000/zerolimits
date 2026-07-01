# Zero Limits Baseball — Demo Website

A Next.js demo rebuild of [zerolimitsbaseball.com](https://zerolimitsbaseball.com/) for Vercel hosting. Marketing pages live here; customer accounts, scheduling, payments, and memberships are handled by [Upper Hand](https://upperhand.com).

## Pages

- `/` — Home
- `/about` — About
- `/schedule-training` — Upper Hand scheduling mock (also `/book`, `/schedule`)
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

Copy `.env.example` to `.env.local` and set your Upper Hand links from the gym dashboard. Missing values fall back to `#` (login defaults to `https://app.upperhand.io/`).

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
