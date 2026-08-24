type PricingCardProps = {
  category: string;
  title: string;
  price: number;
  note?: string;
};

export default function PricingCard({
  category,
  title,
  price,
  note,
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
    </div>
  );
}
