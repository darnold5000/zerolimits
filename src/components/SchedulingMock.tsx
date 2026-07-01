import Link from "next/link";
import PricingCard from "@/components/PricingCard";
import UpperHandCTA from "@/components/UpperHandCTA";
import { PRICING } from "@/lib/content";
import { isPlaceholderLink } from "@/lib/links";
import type { UpperHandLinks } from "@/lib/upperhand";

type SchedulingMockProps = {
  links: UpperHandLinks;
};

const BOOKING_OPTIONS = [
  {
    title: "Private Lesson",
    description: "One-on-one instruction for hitting, pitching, catching, or fielding.",
    hrefKey: "privateLesson" as const,
  },
  {
    title: "Group Lesson",
    description: "Small-group training sessions at a great value.",
    hrefKey: "events" as const,
  },
  {
    title: "Memberships",
    description: "Recurring training packages for dedicated players.",
    hrefKey: "memberships" as const,
  },
  {
    title: "Credit Passes",
    description: "Flexible credits you can use toward sessions.",
    hrefKey: "creditPasses" as const,
  },
];

export default function SchedulingMock({ links }: SchedulingMockProps) {
  return (
    <div className="space-y-16">
      <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-10">
        <h2 className="font-display text-3xl font-bold text-zinc-900 sm:text-4xl">
          Book Your Training
        </h2>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-zinc-600">
          Create your account, choose a program, and book your lesson — all in one
          place. Payments, scheduling, and memberships are handled securely online.
        </p>
        <div className="mt-10">
          <UpperHandCTA links={links} />
        </div>
      </section>

      <section id="programs">
        <h2 className="font-display text-3xl font-bold text-zinc-900">Choose Your Program</h2>
        <p className="mt-2 text-lg text-zinc-600">
          Select the training option that fits your athlete&apos;s goals.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {BOOKING_OPTIONS.map((option) => (
            <div
              key={option.title}
              className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm transition hover:shadow-md"
            >
              <h3 className="font-display text-xl font-bold text-zinc-900">{option.title}</h3>
              <p className="mt-2 text-zinc-600">{option.description}</p>
              {isPlaceholderLink(links[option.hrefKey]) ? (
                <Link
                  href="/schedule-training"
                  className="mt-6 inline-flex rounded-md bg-red-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-500"
                >
                  Book Now
                </Link>
              ) : (
                <a
                  href={links[option.hrefKey]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex rounded-md bg-red-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-500"
                >
                  Book Now
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      <section id="pricing">
        <h2 className="font-display text-3xl font-bold text-zinc-900">Training Prices</h2>
        <p className="mt-2 text-lg text-zinc-600">
          Hitting, pitching, catching, fielding &amp; throwing — training center rates.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PRICING.map((item) => (
            <PricingCard
              key={item.id}
              category={item.category}
              title={item.title}
              price={item.price}
              note={item.note}
              bookHref={
                item.upperHandKey === "privateLesson"
                  ? links.privateLesson
                  : links.events
              }
            />
          ))}
        </div>
      </section>
    </div>
  );
}
