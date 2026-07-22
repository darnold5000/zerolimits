import { isPlaceholderLink } from "@/lib/links";
import { getUpperHandLinks, type UpperHandLinks } from "@/lib/upperhand";

export const BOOKING_TYPES = {
  "private-lessons": {
    label: "Private Lessons",
    description: "One-on-one hitting, pitching, catching, or fielding instruction.",
    linkKey: "privateLessons" as const,
  },
  "group-lessons": {
    label: "Group Lessons",
    description: "Small-group training sessions at a great value.",
    linkKey: "groupLessons" as const,
  },
  camps: {
    label: "Camps & Clinics",
    description: "Seasonal camps, clinics, and specialty training events.",
    linkKey: "camps" as const,
  },
  "browse-events": {
    label: "Browse Events",
    description: "View all training programs, lessons, cages, and events.",
    linkKey: "browseEvents" as const,
  },
} as const;

export type BookingSlug = keyof typeof BOOKING_TYPES;

export type LessonPricingKey = "privateLesson" | "groupLesson";

export const BOOKING_SLUGS = Object.keys(BOOKING_TYPES) as BookingSlug[];

export const DEFAULT_BOOKING_SLUG: BookingSlug = "private-lessons";

export function isBookingSlug(value: string): value is BookingSlug {
  return value in BOOKING_TYPES;
}

export function getBookingPath(slug: BookingSlug): string {
  return `/schedule-training/${slug}`;
}

export function pricingKeyToSlug(key: LessonPricingKey): BookingSlug {
  return key === "privateLesson" ? "private-lessons" : "group-lessons";
}

export function getEmbedUrl(
  slug: BookingSlug,
  links: UpperHandLinks = getUpperHandLinks(),
): string {
  return links[BOOKING_TYPES[slug].linkKey];
}

export function isBookingConfigured(
  slug: BookingSlug,
  links: UpperHandLinks = getUpperHandLinks(),
): boolean {
  return !isPlaceholderLink(getEmbedUrl(slug, links));
}

export function hasAnyBookingConfigured(
  links: UpperHandLinks = getUpperHandLinks(),
): boolean {
  return BOOKING_SLUGS.some((slug) => isBookingConfigured(slug, links));
}
