"use client";

import { isStripeTestMode } from "@/lib/stripe/test-mode";

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function StripeCheckoutTestHint({
  className,
  compact,
}: {
  className?: string;
  compact?: boolean;
}) {
  if (!isStripeTestMode()) return null;

  return (
    <div
      className={cn(
        "rounded-lg border border-red-200 bg-red-50 text-sm text-zinc-600",
        compact ? "px-3 py-2" : "px-4 py-3",
        className,
      )}
    >
      <p className={cn("font-semibold text-zinc-900", compact ? "text-sm" : undefined)}>
        For demo purposes — Stripe test checkout
      </p>
      <p className={cn(compact ? "mt-1" : "mt-2")}>
        Card number:{" "}
        <span className="font-mono text-zinc-900">4242 4242 4242 4242</span>
      </p>
      <p className="mt-1">
        Use any future expiry date, any CVC, and any values in the other fields.
      </p>
    </div>
  );
}

export function StripeCheckoutTestGate({
  checkoutUrl,
  title,
  continueLabel = "Continue to Stripe",
  onCancel,
  onContinue,
}: {
  checkoutUrl?: string;
  title?: string;
  continueLabel?: string;
  onCancel: () => void;
  onContinue?: () => void;
}) {
  if (!isStripeTestMode()) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/70 p-4">
      <div
        className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="stripe-test-checkout-title"
      >
        <h2
          id="stripe-test-checkout-title"
          className="font-display text-lg font-bold text-zinc-900"
        >
          {title ?? "For demo purposes"}
        </h2>
        <p className="mt-2 text-sm text-zinc-600">
          Before Stripe test checkout, use these test payment details:
        </p>
        <StripeCheckoutTestHint className="mt-4" compact />
        <div className="mt-6 flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            className="flex-1 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
            onClick={() => {
              if (onContinue) {
                onContinue();
                return;
              }
              if (checkoutUrl) window.location.href = checkoutUrl;
            }}
          >
            {continueLabel}
          </button>
          <button
            type="button"
            className="flex-1 rounded-lg border border-zinc-300 px-4 py-2.5 text-sm font-semibold text-zinc-800 hover:bg-zinc-50"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
