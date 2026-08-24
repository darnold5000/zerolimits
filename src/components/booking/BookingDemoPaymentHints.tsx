"use client";

import { useEffect, useState } from "react";
import {
  StripeCheckoutTestGate,
  StripeCheckoutTestHint,
} from "@/components/StripeCheckoutTestHint";
import { isStripeTestMode } from "@/lib/stripe/test-mode";

const SESSION_KEY = "zerolimits-stripe-demo-hint-seen";

export function BookingDemoPaymentHints() {
  const [showGate, setShowGate] = useState(false);

  useEffect(() => {
    if (!isStripeTestMode()) return;
    if (sessionStorage.getItem(SESSION_KEY) === "1") return;
    setShowGate(true);
  }, []);

  if (!isStripeTestMode()) return null;

  function dismissGate() {
    sessionStorage.setItem(SESSION_KEY, "1");
    setShowGate(false);
  }

  return (
    <>
      {showGate ? (
        <StripeCheckoutTestGate
          continueLabel="Continue to booking"
          onContinue={dismissGate}
          onCancel={dismissGate}
        />
      ) : null}
      <div className="border-b border-zinc-100 bg-zinc-50 px-4 py-4 sm:px-8">
        <StripeCheckoutTestHint />
      </div>
    </>
  );
}
