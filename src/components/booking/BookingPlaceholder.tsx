import Link from "next/link";
import { SITE } from "@/lib/content";

type BookingPlaceholderProps = {
  title: string;
  description: string;
};

export default function BookingPlaceholder({
  title,
  description,
}: BookingPlaceholderProps) {
  return (
    <div className="flex min-h-[min(52vh,640px)] flex-col items-center justify-center rounded-b-2xl border-t border-zinc-100 bg-zinc-50 px-6 py-16 text-center">
      <div className="max-w-md">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-600">
          Online booking
        </p>
        <h2 className="mt-3 font-display text-2xl font-bold text-zinc-900">{title}</h2>
        <p className="mt-3 text-base leading-relaxed text-zinc-600">{description}</p>
        <p className="mt-6 text-sm text-zinc-500">
          Our online scheduler is being connected. Call or message us and we&apos;ll get you
          on the calendar right away.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href={SITE.phoneHref}
            className="inline-flex rounded-md bg-red-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-500"
          >
            Call {SITE.phone}
          </a>
          <Link
            href="/contact"
            className="inline-flex rounded-md border border-zinc-300 bg-white px-6 py-3 text-sm font-semibold text-zinc-900 transition hover:border-red-300 hover:bg-red-50"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
