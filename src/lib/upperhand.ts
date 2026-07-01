export type UpperHandLinks = {
  signup: string;
  login: string;
  events: string;
  privateLesson: string;
  memberships: string;
  creditPasses: string;
};

function envOrFallback(key: string, fallback = "#"): string {
  const value = process.env[key];
  return value && value.trim() !== "" ? value : fallback;
}

export function getUpperHandLinks(): UpperHandLinks {
  return {
    signup: envOrFallback("NEXT_PUBLIC_UPPERHAND_SIGNUP_URL"),
    login: envOrFallback(
      "NEXT_PUBLIC_UPPERHAND_LOGIN_URL",
      "https://app.upperhand.io/",
    ),
    events: envOrFallback("NEXT_PUBLIC_UPPERHAND_EVENTS_URL"),
    privateLesson: envOrFallback("NEXT_PUBLIC_UPPERHAND_PRIVATE_LESSON_URL"),
    memberships: envOrFallback("NEXT_PUBLIC_UPPERHAND_MEMBERSHIPS_URL"),
    creditPasses: envOrFallback("NEXT_PUBLIC_UPPERHAND_CREDIT_PASSES_URL"),
  };
}
