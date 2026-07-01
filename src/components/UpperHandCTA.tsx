import type { UpperHandLinks } from "@/lib/upperhand";
import { externalLinkProps, isPlaceholderLink } from "@/lib/links";

type UpperHandCTAProps = {
  links: UpperHandLinks;
  variant?: "compact" | "journey";
};

const NEW_CUSTOMER_STEPS = [
  { label: "Create Account", key: "signup" as const },
  { label: "Choose Training", key: "events" as const },
  { label: "Book Lesson", key: "privateLesson" as const },
  { label: "Pay", key: "events" as const },
  { label: "Receive Confirmation", key: "events" as const },
];

function ActionButton({
  href,
  label,
  primary = false,
}: {
  href: string;
  label: string;
  primary?: boolean;
}) {
  const placeholder = isPlaceholderLink(href);
  const baseClass = primary
    ? "rounded-md bg-red-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-500"
    : "rounded-md border border-zinc-300 bg-white px-6 py-3 text-sm font-semibold text-zinc-900 transition hover:border-red-300 hover:bg-red-50";

  if (placeholder) {
    return (
      <span
        className={`${baseClass} cursor-not-allowed opacity-60`}
        aria-disabled="true"
      >
        {label}
      </span>
    );
  }

  return (
    <a {...externalLinkProps(href)} className={baseClass}>
      {label}
    </a>
  );
}

export default function UpperHandCTA({ links, variant = "journey" }: UpperHandCTAProps) {
  if (variant === "compact") {
    return (
      <div className="flex flex-wrap gap-3">
        <ActionButton href={links.signup} label="Create Account" primary />
        <ActionButton href={links.login} label="Log In" />
        <ActionButton href={links.events} label="View Sessions" />
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <div className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-600">
          New to Zero Limits?
        </p>
        <h3 className="mt-3 font-display text-2xl font-bold text-zinc-900">
          Get started in five steps
        </h3>
        <ol className="mt-8 space-y-0">
          {NEW_CUSTOMER_STEPS.map((step, index) => (
            <li key={step.label} className="relative flex items-start gap-4 pb-8 last:pb-0">
              {index < NEW_CUSTOMER_STEPS.length - 1 && (
                <span
                  className="absolute left-5 top-10 h-full w-px bg-zinc-200"
                  aria-hidden="true"
                />
              )}
              <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-sm font-bold text-white">
                {index + 1}
              </span>
              <div className="flex flex-1 flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
                <span className="font-semibold text-zinc-900">{step.label}</span>
                {index === 0 && (
                  <ActionButton href={links.signup} label="Create Account" primary />
                )}
                {index === 1 && (
                  <ActionButton href={links.events} label="View Programs" />
                )}
                {index === 2 && (
                  <ActionButton href={links.privateLesson} label="Book Lesson" primary />
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
          Returning Customers
        </p>
        <h3 className="mt-3 font-display text-2xl font-bold text-zinc-900">
          Already have an account?
        </h3>
        <p className="mt-3 text-zinc-600">
          Log in to book sessions, manage memberships, and view your schedule.
        </p>
        <div className="mt-8 flex flex-col gap-3">
          <ActionButton href={links.login} label="Log In" primary />
          <ActionButton href={links.events} label="View Sessions" />
          <ActionButton href={links.memberships} label="Manage Membership" />
          <ActionButton href={links.creditPasses} label="Buy Credit Pass" />
        </div>
      </div>
    </div>
  );
}
