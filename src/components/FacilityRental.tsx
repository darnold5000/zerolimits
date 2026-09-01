import Link from "next/link";
import { FACILITY_RENTAL } from "@/lib/content";

type FacilityRentalProps = {
  showContactLink?: boolean;
};

export default function FacilityRental({ showContactLink = true }: FacilityRentalProps) {
  return (
    <section className="bg-zinc-50 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-600">
            Facility Rental
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
            Facility Rental Pricing
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-zinc-600">
            Rent our indoor training buildings for practices, team workouts, or private sessions.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {FACILITY_RENTAL.map((option) => (
            <div
              key={option.id}
              className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:shadow-md sm:p-8"
            >
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-red-600">
                {option.shortName}
              </p>
              <h3 className="mt-2 font-display text-2xl font-bold text-zinc-900">
                {option.name}
              </h3>
              <p className="mt-1 text-base text-zinc-600">{option.building}</p>
              <p className="mt-6 font-display text-5xl font-bold text-zinc-900">
                <span className="text-2xl font-medium text-zinc-400">$</span>
                {option.pricePerHour}
                <span className="ml-1 text-lg font-semibold text-zinc-500">/hr</span>
              </p>
            </div>
          ))}
        </div>

        {showContactLink ? (
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex rounded-md bg-red-600 px-8 py-4 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-red-500"
            >
              Contact Us
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}
