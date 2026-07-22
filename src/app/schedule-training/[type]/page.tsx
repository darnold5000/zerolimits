import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BookingShell from "@/components/booking/BookingShell";
import PageCTA from "@/components/PageCTA";
import {
  BOOKING_TYPES,
  DEFAULT_BOOKING_SLUG,
  type BookingSlug,
  isBookingSlug,
} from "@/lib/booking";
import { SITE } from "@/lib/content";
import { getUpperHandLinks } from "@/lib/upperhand";

type PageProps = {
  params: Promise<{ type: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { type } = await params;
  const slug = isBookingSlug(type) ? type : DEFAULT_BOOKING_SLUG;
  const label = BOOKING_TYPES[slug].label;

  return {
    title: `Book ${label}`,
    description: `Book ${label.toLowerCase()} at ${SITE.name}.`,
  };
}

export function generateStaticParams() {
  return Object.keys(BOOKING_TYPES).map((type) => ({ type }));
}

export default async function BookingTypePage({ params }: PageProps) {
  const { type } = await params;

  if (!isBookingSlug(type)) {
    notFound();
  }

  const links = getUpperHandLinks();

  return (
    <>
      <section className="py-10 sm:py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <BookingShell activeSlug={type as BookingSlug} links={links} />
        </div>
      </section>
      <PageCTA />
    </>
  );
}
