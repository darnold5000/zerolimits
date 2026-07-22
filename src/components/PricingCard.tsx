import Link from "next/link";

type PricingCardProps = {
  category: string;
  title: string;
  price: number;
  note?: string;
  bookPath?: string;
  bookLabel?: string;
};

export default function PricingCard({
  category,
  title,
  price,
  note,
  bookPath = "/schedule-training",
  bookLabel = "Book Now",
}: PricingCardProps) {
  return (
    <div className="flex flex-col rounded-2xl border border-zinc-200 bg-white p-7 shadow-sm transition hover:shadow-md">
      <p className="text-xs font-bold uppercase tracking-[0.15em] text-red-600">
        {category}
      </p>
      <h3 className="mt-2 font-display text-xl font-bold text-zinc-900">{title}</h3>
      <p className="mt-4 font-display text-5xl font-bold text-zinc-900">
        <span className="text-2xl font-medium text-zinc-400">$</span>
        {price}
      </p>
      {note && (
        <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-500">{note}</p>
      )}
      <Link
        href={bookPath}
        className="mt-6 inline-flex items-center justify-center rounded-md bg-red-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-500"
      >
        {bookLabel}
      </Link>
    </div>
  );
}
