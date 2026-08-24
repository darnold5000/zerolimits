import type { Metadata } from "next";
import Image from "next/image";
import CoachProfile from "@/components/CoachProfile";
import PageCTA from "@/components/PageCTA";
import { COACHES } from "@/content/coaches";
import { SITE } from "@/lib/content";

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
          <div>
            <h2 className="font-display text-3xl font-bold text-zinc-900">Our Facility</h2>
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-zinc-600">
              Built for year-round development, Zero Limits gives athletes the space
              and equipment to train hitting, pitching, defense, and game situations.
            </p>

            <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-6 lg:gap-10">
              {[
                {
                  stat: "3",
                  title: "Full-Length Pitching Tunnels",
                  description:
                    "Premium mounds and dedicated space for instruction and game-like training.",
                },
                {
                  stat: "3",
                  title: "Full-Length Hitting Tunnels",
                  description:
                    "Spacious batting tunnels with pitching machines for individual and group training.",
                },
                {
                  stat: "Full-Size",
                  title: "Turf Infield",
                  description:
                    "Built for defensive drills, team practices, and live game situations year-round.",
                },
              ].map((feature) => (
                <article
                  key={feature.title}
                  className="border-t-4 border-red-600 pt-6"
                >
                  <p className="font-display text-7xl font-bold uppercase leading-none tracking-tight text-red-600 sm:text-8xl md:text-7xl lg:text-8xl">
                    {feature.stat}
                  </p>
                  <h3 className="mt-3 max-w-xs font-display text-2xl font-bold uppercase leading-tight tracking-wide text-zinc-900">
                    {feature.title}
                  </h3>
                  <p className="mt-4 max-w-sm leading-relaxed text-zinc-600">
                    {feature.description}
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-12 grid gap-3 min-[420px]:grid-cols-2 md:h-[480px] md:grid-cols-[3fr_2fr] md:gap-4">
              <div className="relative h-56 overflow-hidden rounded-2xl min-[420px]:col-span-2 sm:h-64 md:col-span-1 md:h-full">
                <Image
                  src="/images/facility/tunnels-wide.jpg"
                  alt="Multiple full-length training tunnels at Zero Limits Baseball"
                  fill
                  className="object-cover object-[50%_48%]"
                  sizes="(max-width: 767px) 100vw, 60vw"
                />
              </div>
              <div className="grid gap-3 min-[420px]:col-span-2 min-[420px]:grid-cols-2 md:col-span-1 md:grid-cols-1 md:grid-rows-2 md:gap-4">
                <div className="relative h-40 overflow-hidden rounded-2xl min-[420px]:h-44 md:h-auto">
                  <Image
                    src="/images/facility/turf-training.jpg"
                    alt="Athletes training on the turf at Zero Limits Baseball"
                    fill
                    className="object-cover object-[50%_52%]"
                    sizes="(max-width: 419px) 100vw, (max-width: 767px) 50vw, 40vw"
                  />
                </div>
                <div className="relative h-40 overflow-hidden rounded-2xl min-[420px]:h-44 md:h-auto">
                  <Image
                    src="/images/facility/catching-training.jpg"
                    alt="Catching instruction inside a Zero Limits training tunnel"
                    fill
                    className="object-cover object-[50%_58%]"
                    sizes="(max-width: 419px) 100vw, (max-width: 767px) 50vw, 40vw"
                  />
                </div>
              </div>
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

      <section id="our-coaches" className="scroll-mt-24 bg-zinc-950 py-20 text-white sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">Our Coaches</h2>
          <p className="mt-4 max-w-3xl text-lg text-zinc-400">
            Hands-on instruction from experienced coaches who genuinely care about
            every player&apos;s development.
          </p>
          <div className="mt-14 space-y-16 sm:space-y-20">
            {COACHES.map((coach, index) => (
              <CoachProfile
                key={coach.id}
                coach={coach}
                reverse={index % 2 === 1}
                priority={index === 0}
              />
            ))}
          </div>
        </div>
      </section>

      <PageCTA />
    </>
  );
}
