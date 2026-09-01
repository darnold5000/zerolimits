import type { Metadata } from "next";
import CoachProfile from "@/components/CoachProfile";
import PageCTA from "@/components/PageCTA";
import { COACHES } from "@/content/coaches";
import { SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: "Our Coaches",
  description: `Meet the coaching staff at ${SITE.name} — experienced instructors for hitting, pitching, catching, and fielding.`,
};

export default function OurCoachesPage() {
  return (
    <>
      <section className="bg-zinc-950 py-20 text-white sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-500">
            {SITE.name}
          </p>
          <h1 className="mt-3 font-display text-5xl font-bold sm:text-6xl">Our Coaches</h1>
          <p className="mt-5 max-w-3xl text-xl leading-relaxed text-zinc-300">
            Hands-on instruction from experienced coaches who genuinely care about
            every player&apos;s development.
          </p>
        </div>
      </section>

      <section className="bg-zinc-950 py-20 text-white sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="space-y-16 sm:space-y-20">
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
