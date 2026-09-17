import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PRO_SHOP_COPY, PRO_SHOP_ROUTE } from "@/config/pro-shop";
import { SITE } from "@/lib/content";
import { getVendorEmbedUrl, getVendorExternalUrl } from "@/lib/pro-shop/catalog";
import { fetchPublicProShopVendorBySlug } from "@/lib/pro-shop/queries";

type CatalogPageProps = {
  params: Promise<{ slug: string }>;
};

function noteWithPhone(note: string) {
  if (!note.includes(SITE.phone)) return note;
  const [before, after] = note.split(SITE.phone);
  return (
    <>
      {before}
      <a
        href={SITE.phoneHref}
        className="font-bold text-white underline decoration-red-500 decoration-2 underline-offset-4 transition hover:text-red-400"
      >
        {SITE.phone}
      </a>
      {after}
    </>
  );
}

export async function generateMetadata({ params }: CatalogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const vendor = await fetchPublicProShopVendorBySlug(slug);

  if (!vendor) return { title: "Pro Shop Catalog" };

  const catalogTitle = vendor.catalogTitle ?? vendor.title ?? "Catalog";
  return {
    title: `${vendor.name} ${catalogTitle}`,
    description: `Browse ${vendor.name} baseball gear through ${SITE.name}.`,
    alternates: { canonical: `/pro-shop/catalog/${vendor.slug}` },
  };
}

export default async function VendorCatalogPage({ params }: CatalogPageProps) {
  const { slug } = await params;
  const vendor = await fetchPublicProShopVendorBySlug(slug);
  if (!vendor) notFound();

  const embedUrl = getVendorEmbedUrl(vendor);
  const externalUrl = getVendorExternalUrl(vendor);
  if (!embedUrl && !externalUrl) notFound();

  const catalogTitle = vendor.catalogTitle ?? vendor.title ?? "Catalog";

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
          <h1 className="mt-3 max-w-5xl font-display text-3xl font-bold leading-tight sm:text-5xl">
            {vendor.name} — {catalogTitle}
          </h1>
          {vendor.subtitle ? (
            <p className="mt-2 text-base italic text-zinc-400 sm:text-lg">
              {vendor.subtitle}
            </p>
          ) : null}
          {vendor.fulfillmentNote ? (
            <p className="mt-4 max-w-3xl text-base text-zinc-300 sm:text-lg">
              {noteWithPhone(vendor.fulfillmentNote)}
            </p>
          ) : null}
          {vendor.discountCode ? (
            <div className="mt-5 inline-flex items-center gap-3 rounded-lg border border-red-500/40 bg-red-600/15 px-4 py-3">
              <span className="text-sm font-semibold text-zinc-200">Discount code</span>
              <strong className="rounded bg-white px-3 py-1 font-mono text-sm text-zinc-950">
                {vendor.discountCode}
              </strong>
            </div>
          ) : null}
        </div>

        {embedUrl ? (
          <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 shadow-2xl shadow-black/30">
            <iframe
              src={embedUrl}
              title={`${vendor.name} ${catalogTitle}`}
              className="h-[72svh] min-h-[30rem] w-full bg-zinc-900 sm:h-[76vh] sm:min-h-[38rem] lg:h-[calc(100vh-10rem)] lg:min-h-[44rem]"
              allow="fullscreen"
              allowFullScreen
              loading="eager"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        ) : (
          <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 shadow-2xl shadow-black/30">
            <div className="grid gap-8 p-6 sm:p-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-500">
                  Partner Shop
                </p>
                <h2 className="mt-3 font-display text-2xl font-bold sm:text-3xl">
                  Browse {vendor.name} without leaving Zero Limits
                </h2>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-zinc-300 sm:text-lg">
                  This partner store is hosted on their own site, so checkout happens there.
                  Start from Zero Limits, then continue into the {vendor.name} shop when you are
                  ready.
                </p>
                {externalUrl ? (
                  <a
                    href={externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex rounded-md bg-red-600 px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-red-500"
                  >
                    {PRO_SHOP_COPY.vendorExternalCta}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ) : null}
              </div>
              <div className="relative mx-auto flex min-h-[14rem] w-full max-w-md items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white p-8 sm:min-h-[18rem]">
                {vendor.imageUrl ? (
                  <Image
                    src={vendor.imageUrl}
                    alt={vendor.name}
                    width={480}
                    height={240}
                    className="h-auto w-full object-contain"
                    unoptimized={vendor.imageUrl.startsWith("http")}
                  />
                ) : (
                  <p className="font-display text-2xl font-bold uppercase tracking-wide text-zinc-400">
                    {vendor.name}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
