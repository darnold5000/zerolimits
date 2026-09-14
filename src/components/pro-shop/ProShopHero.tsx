import Image from "next/image";
import { PRO_SHOP_COPY } from "@/config/pro-shop";

export default function ProShopHero() {
  return (
    <section className="border-b border-zinc-800 bg-zinc-950 text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-20">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-500">
            {PRO_SHOP_COPY.eyebrow}
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold leading-tight sm:text-5xl">
            {PRO_SHOP_COPY.heading}
          </h1>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-zinc-300">
            {PRO_SHOP_COPY.heroBody}
          </p>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
            {PRO_SHOP_COPY.benefits.map((benefit) => (
              <li
                key={benefit}
                className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-zinc-200"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-red-500" aria-hidden />
                {benefit}
              </li>
            ))}
          </ul>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 shadow-xl shadow-black/30 lg:aspect-[5/4]">
          <Image
            src={PRO_SHOP_COPY.heroImage}
            alt={PRO_SHOP_COPY.heroImageAlt}
            fill
            className="object-cover object-center"
            sizes="(min-width: 1024px) 45vw, 100vw"
            priority
          />
        </div>
      </div>
    </section>
  );
}
