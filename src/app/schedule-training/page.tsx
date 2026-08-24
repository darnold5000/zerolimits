import type { Metadata } from "next";
import BookingShell from "@/components/booking/BookingShell";
import PageCTA from "@/components/PageCTA";
import { SITE } from "@/lib/content";
import { getUpperHandPortalUrl } from "@/lib/upperhand";

export const metadata: Metadata = {
  title: "Schedule Training",
  description: `Book private lessons, group training, and camps at ${SITE.name}.`,
};

export default function ScheduleTrainingPage() {
  const portalUrl = getUpperHandPortalUrl();

  return (
    <>
      <section className="py-10 sm:py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <BookingShell portalUrl={portalUrl} />
        </div>
      </section>
      <PageCTA />
    </>
  );
}
