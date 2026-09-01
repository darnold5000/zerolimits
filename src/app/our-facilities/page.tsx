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

      <FacilityRental />

      <PageCTA />
    </>
  );
}
