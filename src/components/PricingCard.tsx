type PricingCardProps = {
  category: string;
  rates: ReadonlyArray<{
    duration: string;
    price: number;
  }>;
};

export default function PricingCard({
  category,
  rates,
}: PricingCardProps) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:shadow-md sm:p-8">
      <p className="text-xs font-bold uppercase tracking-[0.15em] text-red-600">
        {category}
      </p>
      <div className="mt-6 grid grid-cols-3 divide-x divide-zinc-200">
        {rates.map((rate) => (
          <div key={rate.duration} className="px-2 text-center first:pl-0 last:pr-0 sm:px-4">
            <h3 className="font-display text-base font-bold uppercase tracking-wide text-zinc-600 sm:text-lg">
              {rate.duration}
            </h3>
            <p className="mt-2 font-display text-4xl font-bold text-zinc-900 sm:text-5xl">
              <span className="text-xl font-medium text-zinc-400 sm:text-2xl">$</span>
              {rate.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
