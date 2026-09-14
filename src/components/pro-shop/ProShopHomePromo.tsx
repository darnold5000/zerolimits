import Image from "next/image";
import Link from "next/link";
import { PRO_SHOP_COPY, PRO_SHOP_ROUTE } from "@/config/pro-shop";

export default function ProShopHomePromo() {
  return (
    <section
      id="pro-shop-promo"
      aria-labelledby="pro-shop-promo-heading"
      className="bg-zinc-950 py-6 text-white sm:py-8"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 shadow-xl shadow-black/20 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:items-stretch">
          <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-500">
              {PRO_SHOP_COPY.eyebrow}
            </p>
            <h2
              id="pro-shop-promo-heading"
              className="mt-3 font-display text-3xl font-bold sm:text-4xl"
            >
              {PRO_SHOP_COPY.heading}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-300 sm:text-lg">
              {PRO_SHOP_COPY.homepageBody}
            </p>
            <p className="mt-3 text-sm font-semibold uppercase tracking-wide text-zinc-400">
              {PRO_SHOP_COPY.brandsLine}
            </p>
            <div className="mt-6">
              <Link
                href={PRO_SHOP_ROUTE}
                className="inline-flex rounded-md bg-red-600 px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-red-500"
              >
                {PRO_SHOP_COPY.homepageCta}
              </Link>
            </div>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden border-t border-white/10 lg:aspect-auto lg:min-h-72 lg:border-l lg:border-t-0">
            <Image
              src={PRO_SHOP_COPY.heroImage}
              alt={PRO_SHOP_COPY.heroImageAlt}
              fill
              className="object-cover object-center"
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-zinc-950/20 to-transparent lg:from-zinc-950/30" />
          </div>
        </div>
      </div>
    </section>
  );
}
