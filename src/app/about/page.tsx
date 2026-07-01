import type { Metadata } from "next";
import Image from "next/image";
import PageCTA from "@/components/PageCTA";
import { COACHES, SITE } from "@/lib/content";
import { IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "About",
  description: `Learn about ${SITE.name} — our facility, training philosophy, and who we serve.`,
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-zinc-950 py-20 text-white sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-500">
            About Us
          </p>
          <h1 className="mt-3 font-display text-5xl font-bold sm:text-6xl">About Zero Limits</h1>
          <p className="mt-5 max-w-3xl text-xl leading-relaxed text-zinc-300">
            {SITE.heroRegionLine}
          </p>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid items-start gap-12 lg:grid-cols-2">
            {/* <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src={IMAGES.about}
                alt="Zero Limits Baseball facility"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div> */}
            <div>
              <h2 className="font-display text-3xl font-bold text-zinc-900">Our Facility</h2>
              <p className="mt-4 text-lg leading-relaxed text-zinc-600">
                {SITE.facilityDescription}
              </p>
              <p className="mt-4 text-lg leading-relaxed text-zinc-600">
                Whether you need tunnel work for hitting and pitching or open space
                for fielding drills, rotational power training, and arm care, Zero
                Limits Baseball is built for year-round development.
              </p>
            </div>
          </div>
        </div>
      </section>

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

      <section className="bg-zinc-950 py-20 text-white sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">Our Coaches</h2>
          <p className="mt-4 max-w-3xl text-lg text-zinc-400">
            Hands-on instruction from experienced coaches who genuinely care about
            every player&apos;s development.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {COACHES.map((coach) => (
              <div
                key={coach.name}
                className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-center"
              >
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-600 font-display text-2xl font-bold text-white">
                  {coach.name.replace("Coach ", "").charAt(0)}
                </div>
                <h3 className="mt-5 font-display text-xl font-bold">{coach.name}</h3>
                <p className="mt-2 text-sm font-medium uppercase tracking-wide text-red-400">
                  {coach.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PageCTA />
    </>
  );
}
