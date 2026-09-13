import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/Hero";
import PageCTA from "@/components/PageCTA";
import PricingCard from "@/components/PricingCard";
import TestimonialCard from "@/components/TestimonialCard";
import TrainingPillars from "@/components/TrainingPillars";
import WhyChoose from "@/components/WhyChoose";
import {
  PRICING,
  PRICING_NOTE,
  PRICING_NOTE_RESTRICTION,
  SITE,
  TESTIMONIALS,
} from "@/lib/content";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />

      <section
        id="catalog-promotion"
        aria-labelledby="catalog-heading"
        className="bg-zinc-950 py-6 text-white sm:py-8"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 shadow-xl shadow-black/20 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:items-stretch">
            <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-500">
                RAWLINGS + EASTON
              </p>
              <h2
                id="catalog-heading"
                className="mt-3 font-display text-3xl font-bold sm:text-4xl"
              >
                Spring 2027 Collection
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-300 sm:text-lg">
                Browse the latest Rawlings and Easton baseball gear available through
                Zero Limits Baseball.
              </p>
              <p className="mt-3 text-sm font-medium text-zinc-300 sm:text-base">
                Call or text{" "}
                <a
                  href={SITE.phoneHref}
                  className="font-semibold text-white underline decoration-red-500 decoration-2 underline-offset-4 transition hover:text-red-400"
                >
                  {SITE.phone}
                </a>{" "}
                for pricing and orders.
              </p>
              <div className="mt-6">
                <a
                  href="https://publuu.com/flip-book/873704/2439687/page/76"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex rounded-md bg-red-600 px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-red-500"
                >
                  View Catalog
                </a>
              </div>
            </div>

            <div className="relative aspect-[4/3] overflow-hidden border-t border-white/10 lg:aspect-auto lg:min-h-72 lg:border-l lg:border-t-0">
              <Image
                src="/images/catalog/easton-chili-peppers.jpg"
                alt="Easton Chili Peppers baseball bats and player"
                fill
                className="object-cover object-center"
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-zinc-950/20 to-transparent lg:from-zinc-950/30" />
            </div>
          </div>
        </div>
      </section>

      <TrainingPillars />
      <WhyChoose />

      <section id="pricing" className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-600">
              Programs &amp; Pricing
            </p>
            <h2 className="mt-3 font-display text-4xl font-bold text-zinc-900 sm:text-5xl">
              Training Prices
            </h2>
            <p className="mt-3 text-lg text-zinc-600">
              Private and group lessons for every schedule and budget.
            </p>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {PRICING.map((item) => (
              <PricingCard
                key={item.id}
                category={item.category}
                rates={item.rates}
              />
            ))}
          </div>
          <div className="mt-6 text-center text-sm text-zinc-600">
            <p>
              <span className="font-semibold text-zinc-900">Sibling Discount:</span>{" "}
              {PRICING_NOTE}
            </p>
            <p className="mt-1 italic">{PRICING_NOTE_RESTRICTION}</p>
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/schedule-training"
              className="inline-flex rounded-md bg-red-600 px-8 py-4 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-red-500"
            >
              Schedule Training
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-display text-3xl font-bold text-zinc-900 sm:text-4xl">
            Training Philosophy
          </h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {[
              {
                title: "Player-First Coaching",
                body: "Our coaches take the time to understand each athlete's goals and build a plan that fits their level and schedule.",
              },
              {
                title: "Consistent Development",
                body: "Year-round indoor training means players keep improving through every season — not just when the weather cooperates.",
              },
              {
                title: "Accessible Pricing",
                body: "Private and group lesson options help families train on a regular regimen without breaking the bank.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-zinc-200 bg-zinc-50 p-8">
                <h3 className="font-display text-xl font-bold text-zinc-900">{item.title}</h3>
                <p className="mt-3 leading-relaxed text-zinc-600">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-zinc-50 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-display text-3xl font-bold text-zinc-900 sm:text-4xl">Who We Serve</h2>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-zinc-600">
            Zero Limits Baseball works with players of all ages and abilities —
            youth athletes learning the fundamentals, high school players sharpening
            their skills, and anyone serious about getting better at hitting,
            pitching, catching, or fielding.
          </p>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-600">
              Parent Reviews
            </p>
            <h2 className="mt-3 font-display text-4xl font-bold text-zinc-900 sm:text-5xl">
              What Families Are Saying
            </h2>
          </div>
          <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
            {TESTIMONIALS.map((testimonial) => (
              <TestimonialCard
                key={testimonial.author}
                quote={testimonial.quote}
                author={testimonial.author}
              />
            ))}
          </div>
        </div>
      </section>

      <PageCTA />
    </>
  );
}
