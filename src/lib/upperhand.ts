import { isPlaceholderLink } from "@/lib/links";

export type UpperHandLinks = {
  privateLessons: string;
  groupLessons: string;
  camps: string;
  browseEvents: string;
};

function envOrFallback(key: string, fallback = "#"): string {
  const value = process.env[key];
  return value && value.trim() !== "" ? value : fallback;
}

export function getUpperHandLinks(): UpperHandLinks {
  return {
    privateLessons: envOrFallback("NEXT_PUBLIC_UPPERHAND_PRIVATE_LESSONS_URL"),
    groupLessons: envOrFallback("NEXT_PUBLIC_UPPERHAND_GROUP_LESSONS_URL"),
    camps: envOrFallback("NEXT_PUBLIC_UPPERHAND_CAMPS_URL"),
    browseEvents: envOrFallback("NEXT_PUBLIC_UPPERHAND_BROWSE_EVENTS_URL"),
  };
}

/** Single customer portal URL for embedded booking (class types live in Upper Hand). */
export function getUpperHandPortalUrl(): string {
  const links = getUpperHandLinks();
  const candidates = [
    links.browseEvents,
    links.privateLessons,
    links.groupLessons,
    links.camps,
  ];
  return candidates.find((url) => !isPlaceholderLink(url)) ?? "#";
}

export function isUpperHandConfigured(): boolean {
  return !isPlaceholderLink(getUpperHandPortalUrl());
}
