import Hero from "@/components/Hero";
import FacilityRental from "@/components/FacilityRental";
import PageCTA from "@/components/PageCTA";
import PricingCard from "@/components/PricingCard";
import TestimonialCard from "@/components/TestimonialCard";
import TrainingPillars from "@/components/TrainingPillars";
import WhyChoose from "@/components/WhyChoose";
import { PRICING, PRICING_NOTE, TESTIMONIALS } from "@/lib/content";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <Hero />
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
          <p className="mt-6 text-center text-sm text-zinc-600">
            <span className="font-semibold text-zinc-900">Sibling discount:</span>{" "}
            {PRICING_NOTE}
          </p>
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

      <section className="bg-zinc-50 py-20 sm:py-24">
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

      <FacilityRental />

      <PageCTA />
    </>
  );
}
