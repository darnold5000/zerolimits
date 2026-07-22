import Hero from "@/components/Hero";
import PageCTA from "@/components/PageCTA";
import PricingCard from "@/components/PricingCard";
import TestimonialCard from "@/components/TestimonialCard";
import TrainingPillars from "@/components/TrainingPillars";
import TrustBar from "@/components/TrustBar";
import WhyChoose from "@/components/WhyChoose";
import { getBookingPath, pricingKeyToSlug } from "@/lib/booking";
import { PRICING, TESTIMONIALS } from "@/lib/content";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
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
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
          <div className="mt-12 grid gap-6 md:grid-cols-3">
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
