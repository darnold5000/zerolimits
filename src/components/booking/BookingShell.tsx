"use client";

import BookingEmbed from "@/components/booking/BookingEmbed";
import BookingPlaceholder from "@/components/booking/BookingPlaceholder";
import { BookingDemoPaymentHints } from "@/components/booking/BookingDemoPaymentHints";
import PricingCard from "@/components/PricingCard";
import { isPlaceholderLink } from "@/lib/links";
import { PRICING, SITE } from "@/lib/content";

type BookingShellProps = {
  portalUrl: string;
};

export default function BookingShell({ portalUrl }: BookingShellProps) {
  const configured = !isPlaceholderLink(portalUrl);

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
            Browse programs, pick a time, and complete your booking in our Upper Hand
            portal. Need help? Call{" "}
            <a href={SITE.phoneHref} className="font-semibold text-white hover:text-red-400">
              {SITE.phone}
            </a>
            .
          </p>
        </div>

        <BookingDemoPaymentHints />

        {configured ? (
          <BookingEmbed src={portalUrl} title={`${SITE.name} — Schedule Training`} />
        ) : (
          <BookingPlaceholder
            title="Schedule Training"
            description="Private lessons, group lessons, camps, and events."
          />
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
            />
          ))}
        </div>
      </section>
    </div>
  );
}
