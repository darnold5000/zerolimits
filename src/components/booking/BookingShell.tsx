"use client";

import Link from "next/link";
import BookingEmbed from "@/components/booking/BookingEmbed";
import BookingPlaceholder from "@/components/booking/BookingPlaceholder";
import PricingCard from "@/components/PricingCard";
import {
  BOOKING_SLUGS,
  BOOKING_TYPES,
  type BookingSlug,
  getBookingPath,
  getEmbedUrl,
  isBookingConfigured,
  pricingKeyToSlug,
} from "@/lib/booking";
import { PRICING, SITE } from "@/lib/content";
import type { UpperHandLinks } from "@/lib/upperhand";

type BookingShellProps = {
  activeSlug: BookingSlug;
  links: UpperHandLinks;
};

export default function BookingShell({ activeSlug, links }: BookingShellProps) {
  const active = BOOKING_TYPES[activeSlug];
  const embedUrl = getEmbedUrl(activeSlug, links);
  const configured = isBookingConfigured(activeSlug, links);

  return (
    <div className="space-y-16">
      <section className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
        <div className="border-b border-zinc-200 bg-zinc-950 px-4 py-8 text-white sm:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-500">
            Book Online
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
            Schedule Training
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-zinc-300 sm:text-lg">
            Choose your program, pick a time, and complete your booking — all right here.
            Need help? Call{" "}
            <a href={SITE.phoneHref} className="font-semibold text-white hover:text-red-400">
              {SITE.phone}
            </a>
            .
          </p>
        </div>

        <nav
          className="flex gap-1 overflow-x-auto border-b border-zinc-200 bg-zinc-50 px-2 py-2 sm:px-4"
          aria-label="Booking categories"
        >
          {BOOKING_SLUGS.map((slug) => {
            const tab = BOOKING_TYPES[slug];
            return (
              <Link
                key={slug}
                href={getBookingPath(slug)}
                className={`shrink-0 rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
                  slug === activeSlug
                    ? "bg-white text-zinc-900 shadow-sm ring-1 ring-zinc-200"
                    : "text-zinc-600 hover:bg-white/70 hover:text-zinc-900"
                }`}
                aria-current={slug === activeSlug ? "page" : undefined}
              >
                {tab.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-b border-zinc-100 bg-white px-4 py-5 sm:px-8">
          <h2 className="font-display text-xl font-bold text-zinc-900">{active.label}</h2>
          <p className="mt-1 text-sm text-zinc-600 sm:text-base">{active.description}</p>
        </div>

        {configured ? (
          <BookingEmbed src={embedUrl} title={`${SITE.name} — ${active.label}`} />
        ) : (
          <BookingPlaceholder title={active.label} description={active.description} />
        )}
      </section>

      <section id="pricing" className="scroll-mt-24">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-600">
            Pricing
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-zinc-900 sm:text-4xl">
            Training Rates
          </h2>
          <p className="mt-3 text-lg text-zinc-600">
            Hitting, pitching, catching, fielding &amp; throwing — all at the training center.
          </p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PRICING.map((item) => (
            <PricingCard
              key={item.id}
              category={item.category}
              title={item.title}
              price={item.price}
              note={item.note}
              bookPath={getBookingPath(pricingKeyToSlug(item.lessonKey))}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
