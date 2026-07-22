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
