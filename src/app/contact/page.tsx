import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import FacilityMap from "@/components/FacilityMap";
import PageCTA from "@/components/PageCTA";
import { SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Contact ${SITE.name} — call ${SITE.phone} or send a message.`,
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-zinc-950 py-20 text-white sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-500">
            Get in Touch
          </p>
          <h1 className="mt-3 font-display text-5xl font-bold sm:text-6xl">Contact Us</h1>
          <p className="mt-5 text-xl text-zinc-300">
            Questions about training? We&apos;re here to help.
          </p>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-3xl font-bold text-zinc-900">Reach Out</h2>
              <p className="mt-4 text-lg leading-relaxed text-zinc-600">
                Have questions about training options, pricing, or availability?
                Call us or send a message — we&apos;ll get back to you promptly.
              </p>

              <div className="mt-8 space-y-6">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
                    Phone
                  </p>
                  <a
                    href={SITE.phoneHref}
                    className="mt-1 block text-2xl font-bold text-red-600 hover:text-red-500"
                  >
                    {SITE.phone}
                  </a>
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
                    Location
                  </p>
                  <p className="mt-1 text-lg font-semibold text-zinc-900">
                    {SITE.address.venue}
                  </p>
                  <p className="mt-1 text-lg text-zinc-700">
                    {SITE.address.street}
                    <br />
                    {SITE.address.city}, {SITE.address.state} {SITE.address.zip}
                  </p>
                  <ul className="mt-4 space-y-3 rounded-xl border border-zinc-200 bg-zinc-50 p-4">
                    {SITE.facilityLocations.map((location) => (
                      <li key={location.name} className="text-sm text-zinc-600">
                        <span className="font-semibold text-zinc-900">{location.name}</span>
                        <span className="mt-0.5 block leading-relaxed">
                          {location.description}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
                    Scheduling
                  </p>
                  <Link
                    href="/schedule-training"
                    className="mt-1 inline-block text-lg font-semibold text-red-600 hover:text-red-500"
                  >
                    Book your lesson online →
                  </Link>
                </div>
              </div>

              <div className="mt-10">
                <FacilityMap />
              </div>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
              <h2 className="font-display text-2xl font-bold text-zinc-900">Send a Message</h2>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      <PageCTA />
    </>
  );
}
