import type { Metadata } from "next";
import Link from "next/link";
import {
  PRO_SHOP_CATALOG_VENDOR_SLUG,
  PRO_SHOP_ROUTE,
} from "@/config/pro-shop";
import { SITE } from "@/lib/content";
import { getCatalogUrls } from "@/lib/pro-shop/catalog";
import { fetchPublicProShopVendorBySlug } from "@/lib/pro-shop/queries";

export const metadata: Metadata = {
  title: "Rawlings + Easton Spring 2027 Catalog",
  description: `Browse the Rawlings and Easton Spring 2027 baseball catalog through ${SITE.name}.`,
  alternates: { canonical: "/pro-shop/catalog" },
};

export default async function ProShopCatalogPage() {
  const vendor = await fetchPublicProShopVendorBySlug(PRO_SHOP_CATALOG_VENDOR_SLUG);
  const catalog = getCatalogUrls(vendor?.catalogUrl ?? null);

  return (
    <section className="bg-zinc-950 py-10 text-white sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Link
          href={PRO_SHOP_ROUTE}
          className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-300 transition hover:text-white"
        >
          <span aria-hidden>&larr;</span>
          Back to Pro Shop
        </Link>

        <div className="mt-6">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-500">
            Zero Limits Pro Shop
          </p>
          <h1 className="mt-3 max-w-4xl font-display text-3xl font-bold leading-tight sm:text-5xl">
            Rawlings + Easton — Spring 2027 Catalog
          </h1>
          <p className="mt-4 text-base text-zinc-300 sm:text-lg">
            See something you like? Call or text{" "}
            <a
              href={SITE.phoneHref}
              className="font-bold text-white underline decoration-red-500 decoration-2 underline-offset-4 transition hover:text-red-400"
            >
              {SITE.phone}
            </a>{" "}
            for pricing and ordering.
          </p>
        </div>

        {catalog ? (
          <>
            <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 shadow-2xl shadow-black/30">
              <iframe
                src={catalog.embedUrl}
                title="Rawlings and Easton Spring 2027 catalog"
                className="h-[72svh] min-h-[30rem] w-full bg-zinc-900 sm:h-[76vh] sm:min-h-[38rem] lg:h-[calc(100vh-10rem)] lg:min-h-[44rem]"
                allow="fullscreen"
                allowFullScreen
                loading="eager"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>

            <div className="mt-5 flex flex-col gap-3 rounded-xl border border-white/10 bg-zinc-900/70 p-4 text-sm text-zinc-300 sm:flex-row sm:items-center sm:justify-between sm:px-5">
              <p>If the catalog does not load, you can open it directly on Publuu.</p>
              <a
                href={catalog.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 justify-center rounded-md border border-zinc-600 px-5 py-2.5 font-bold uppercase tracking-wide text-white transition hover:border-red-500 hover:bg-red-600"
              >
                Open Catalog Externally
              </a>
            </div>
          </>
        ) : (
          <div className="mt-8 rounded-2xl border border-white/10 bg-zinc-900 p-8 text-center sm:p-12">
            <h2 className="font-display text-2xl font-bold">Catalog temporarily unavailable</h2>
            <p className="mt-3 text-zinc-300">
              Please call or text{" "}
              <a href={SITE.phoneHref} className="font-semibold text-white underline">
                {SITE.phone}
              </a>{" "}
              for help with gear and ordering.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
