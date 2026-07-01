# Zero Limits Baseball Website Demo — Technical Implementation Plan

## Goal

Create a Vercel-hosted demo version of the current Zero Limits Baseball website that:

1. Matches the current website look and structure closely.
2. Removes unused/demo/template content.
3. Keeps customer accounts, booking, payments, memberships, and scheduling inside Upper Hand.
4. Adds a mocked scheduling experience showing how Upper Hand links/buttons would work.
5. Does not modify the live website.

**Reference:** [zerolimitsbaseball.com](https://zerolimitsbaseball.com/)  
**Upper Hand docs:** [Incorporating Upper Hand into your website](https://help.upperhand.com/incorporating-upper-hand-into-your-website)

## Status

- [x] Next.js + TypeScript + Tailwind scaffold
- [x] Pages: `/`, `/about`, `/schedule-training`, `/gallery`, `/contact`
- [x] Redirects: `/book`, `/schedule` → `/schedule-training`
- [x] Reusable components (Header, Footer, Hero, pricing, testimonials, Upper Hand mock)
- [x] Environment variables for Upper Hand URLs
- [x] Gallery images from current public site
- [ ] Deploy to Vercel (pending GitHub push + import)
- [ ] Replace placeholder Upper Hand URLs with real links from owner

## Architecture

- Next.js App Router, static pages, Vercel hosting
- No database, website login, payments, or scheduling backend
- Upper Hand external links for all customer actions

## Routes

| Route | Purpose |
|-------|---------|
| `/` | Home — hero, facility, training, pricing, testimonials |
| `/about` | Facility, philosophy, coaches placeholder |
| `/schedule-training` | Upper Hand scheduling mock |
| `/gallery` | Approved facility photos |
| `/contact` | Contact form (mailto demo), phone, map placeholder |

## Vercel Deployment

1. Push to GitHub repo `zero-limits-demo`
2. Import into Vercel
3. Set `NEXT_PUBLIC_UPPERHAND_*` env vars
4. Share demo URL with gym owner
5. Custom domain only after approval

## Production Cutover (post-approval)

1. DNS access + real Upper Hand URLs
2. Add custom domain in Vercel
3. Verify pages, mobile, SSL, Upper Hand links
4. Retire old Rok Online hosting after grace period
