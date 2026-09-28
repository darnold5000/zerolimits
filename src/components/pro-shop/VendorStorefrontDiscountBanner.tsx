"use client";

import { useCallback, useState } from "react";
import { PRO_SHOP_COPY } from "@/config/pro-shop";

type VendorStorefrontDiscountBannerProps = {
  code: string;
  className?: string;
};

export default function VendorStorefrontDiscountBanner({
  code,
  className = "",
}: VendorStorefrontDiscountBannerProps) {
  const [copied, setCopied] = useState(false);

  const copyCode = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable — code remains visible to select manually.
    }
  }, [code]);

  const { prefix, suffix } = PRO_SHOP_COPY.vendorStorefrontDiscountBanner;

  return (
    <div
      className={[
        "w-full border-y border-red-500/30 bg-red-950/35 px-3 py-2 text-sm leading-snug text-zinc-200",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <p className="flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1 sm:justify-start">
        <span>{prefix}</span>
        <button
          type="button"
          onClick={copyCode}
          className="inline-flex items-center gap-1.5 rounded-md bg-white px-2 py-0.5 font-mono text-sm font-bold tracking-wide text-zinc-950 ring-1 ring-red-400/50 transition hover:bg-red-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400"
          aria-label={copied ? "Discount code copied" : `Copy discount code ${code}`}
        >
          {code}
          <span className="text-[10px] font-semibold uppercase tracking-wider text-red-700">
            {copied ? "Copied" : "Copy"}
          </span>
        </button>
        <span>{suffix}</span>
      </p>
    </div>
  );
}
