import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PRO_SHOP_ROUTE } from "@/config/pro-shop";
import { SITE } from "@/lib/content";
import { getVendorEmbedUrl } from "@/lib/pro-shop/catalog";
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
  if (!embedUrl) notFound();

  const catalogTitle = vendor.catalogTitle ?? vendor.title ?? "Catalog";

  return (
    <section className="bg-zinc-950 py-6 text-white sm:py-8">
      <div className="mx-auto w-full max-w-[100rem] px-3 sm:px-5 lg:px-6">
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

        <div className="mt-6 overflow-hidden rounded-xl border border-white/10 bg-zinc-900 shadow-2xl shadow-black/30 sm:rounded-2xl">
          <iframe
            src={embedUrl}
            title={`${vendor.name} ${catalogTitle}`}
            className="h-[min(88dvh,56rem)] min-h-[32rem] w-full bg-zinc-900 sm:h-[min(90dvh,60rem)] sm:min-h-[36rem] lg:h-[calc(100dvh-11rem)] lg:min-h-[42rem]"
            allow="fullscreen"
            allowFullScreen
            loading="eager"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      </div>
    </section>
  );
}
