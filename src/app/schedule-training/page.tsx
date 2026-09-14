import type { Metadata } from "next";
import BookingShell from "@/components/booking/BookingShell";
import PageCTA from "@/components/PageCTA";
import { SITE } from "@/lib/content";
import { getUpperHandPortalUrl } from "@/lib/upperhand";

export const metadata: Metadata = {
  title: "Schedule Training",
  description: `Book private lessons, group training, and camps at ${SITE.name}.`,
  alternates: { canonical: "/schedule-training" },
};

export default function ScheduleTrainingPage() {
  const portalUrl = getUpperHandPortalUrl();

  return (
    <>
      <section className="py-10 sm:py-14">
        <BookingShell portalUrl={portalUrl} />
      </section>
      <PageCTA />
    </>
  );
}
