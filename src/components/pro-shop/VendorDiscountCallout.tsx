import { PRO_SHOP_COPY } from "@/config/pro-shop";

type VendorDiscountCalloutProps = {
  code: string;
  variant?: "light" | "dark";
};

export default function VendorDiscountCallout({
  code,
  variant = "light",
}: VendorDiscountCalloutProps) {
  const isDark = variant === "dark";

  return (
    <div
      className={
        isDark
          ? "mt-5 rounded-xl border border-red-500/40 bg-red-600/10 px-4 py-4 sm:px-5 sm:py-5"
          : "mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-4 sm:px-5 sm:py-5"
      }
    >
      <p
        className={
          isDark
            ? "text-sm font-bold uppercase tracking-wide text-red-400"
            : "text-sm font-bold uppercase tracking-wide text-red-700"
        }
      >
        {PRO_SHOP_COPY.vendorDiscountHeading}
      </p>
      <p
        className={
          isDark
            ? "mt-2 text-sm leading-relaxed text-zinc-200 sm:text-base"
            : "mt-2 text-sm leading-relaxed text-zinc-700 sm:text-base"
        }
      >
        {PRO_SHOP_COPY.vendorDiscountBody}
      </p>
      <p
        className={
          isDark
            ? "mt-3 text-sm font-semibold text-zinc-100"
            : "mt-3 text-sm font-semibold text-zinc-900"
        }
      >
        {PRO_SHOP_COPY.vendorDiscountCodeLabel}{" "}
        <span
          className={
            isDark
              ? "rounded bg-white px-2.5 py-1 font-mono text-sm text-zinc-950"
              : "rounded bg-white px-2.5 py-1 font-mono text-sm text-red-700 ring-1 ring-red-200"
          }
        >
          {code}
        </span>
      </p>
    </div>
  );
}
