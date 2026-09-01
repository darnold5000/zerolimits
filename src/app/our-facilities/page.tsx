import type { Metadata } from "next";
import FacilityRental from "@/components/FacilityRental";
import FacilityShowcase from "@/components/FacilityShowcase";
import PageCTA from "@/components/PageCTA";
import { SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: "Our Facilities",
  description: `Explore ${SITE.name} indoor training facilities — ZL1 and ZL2 in Mooresville, Indiana.`,
};

export default function OurFacilitiesPage() {
  return (
    <>
      <section className="bg-zinc-950 py-20 text-white sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-500">
            Train With Us
          </p>
          <h1 className="mt-3 font-display text-5xl font-bold sm:text-6xl">Our Facilities</h1>
          <p className="mt-5 max-w-3xl text-xl leading-relaxed text-zinc-300">
            {SITE.heroRegionLine}
          </p>
        </div>
      </section>

      <FacilityShowcase />

      <section className="bg-zinc-50 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-display text-3xl font-bold text-zinc-900">Training Philosophy</h2>
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
              <div key={item.title} className="rounded-2xl bg-white p-8 shadow-sm">
                <h3 className="font-display text-xl font-bold text-zinc-900">{item.title}</h3>
                <p className="mt-3 leading-relaxed text-zinc-600">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-display text-3xl font-bold text-zinc-900">Who We Serve</h2>
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
