# Zero Limits Baseball — Demo Website

A Next.js demo rebuild of [zerolimitsbaseball.com](https://zerolimitsbaseball.com/) for Vercel hosting. Marketing pages live here; customer accounts, scheduling, payments, and memberships are handled by [Upper Hand](https://upperhand.com).

## Pages

- `/` — Home
- `/pro-shop` — Pro Shop (Coming Soon until `NEXT_PUBLIC_PRO_SHOP_ENABLED=true`)
- `/pro-shop/catalog/[slug]` — Embedded vendor catalog (when enabled per vendor)
- `/our-facilities` — Facilities (ZL1 / ZL2)
- `/our-coaches` — Coaches
- `/schedule-training` — Embedded Upper Hand portal (`/book` and `/schedule` redirect here)
- `/gallery` — Facility photos
- `/contact` — Contact
- `/admin/pro-shop` — Staff Pro Shop content admin (Supabase)

## Pro Shop

- Public flag: `NEXT_PUBLIC_PRO_SHOP_ENABLED` (`false` = branded Coming Soon at `/pro-shop`)
- Editable vendors and featured products live in Supabase (`pro_shop_vendors`, `pro_shop_products`)
- Vendor catalog, embed, referral, and fulfillment settings are managed per vendor
- Config/copy helpers: `src/config/pro-shop.ts`

After applying `supabase/migrations/001_zl_admin_pro_shop.sql` and setting Supabase env vars:

```bash
STAFF_EMAIL=you@example.com npm run db:staff
# or by auth user id:
STAFF_USER_ID=<uuid> npm run db:staff
npm run db:owners   # initial owners (see migration 002)
```

Then sign in at `/admin/login`.

## Local Development

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Upper Hand URLs

Copy `.env.example` to `.env.local` and set the Upper Hand customer portal URL (all four vars can use the same events page):

- `NEXT_PUBLIC_UPPERHAND_PRIVATE_LESSONS_URL`
- `NEXT_PUBLIC_UPPERHAND_GROUP_LESSONS_URL`
- `NEXT_PUBLIC_UPPERHAND_CAMPS_URL`
- `NEXT_PUBLIC_UPPERHAND_BROWSE_EVENTS_URL`

Production portal: `https://app.upperhand.io/customers/2841-zero-limits/events`

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
- Supabase (Pro Shop admin content only)
- No checkout or inventory on this site
