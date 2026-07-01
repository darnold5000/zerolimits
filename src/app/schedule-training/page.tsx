import type { Metadata } from "next";
import PageCTA from "@/components/PageCTA";
import SchedulingMock from "@/components/SchedulingMock";
import UpperHandCTA from "@/components/UpperHandCTA";
import { SITE } from "@/lib/content";
import { getUpperHandLinks } from "@/lib/upperhand";

export const metadata: Metadata = {
  title: "Schedule Training",
  description: `Book private lessons and group training at ${SITE.name}.`,
};

export default function ScheduleTrainingPage() {
  const links = getUpperHandLinks();

  return (
    <>
      <section className="bg-zinc-950 py-20 text-white sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-500">
            Book Online
          </p>
          <h1 className="mt-3 font-display text-5xl font-bold sm:text-6xl">
            Schedule Training
          </h1>
          <p className="mt-5 max-w-3xl text-xl leading-relaxed text-zinc-300">
            Book private lessons, group sessions, memberships, and credit passes
            online. Your account, payments, and schedule — all in one place.
          </p>
          <div className="mt-8">
            <UpperHandCTA links={links} variant="compact" />
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SchedulingMock links={links} />
        </div>
      </section>

      <PageCTA />
    </>
  );
}
