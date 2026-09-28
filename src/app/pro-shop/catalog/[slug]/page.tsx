import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PRO_SHOP_ROUTE } from "@/config/pro-shop";
import { SITE } from "@/lib/content";
import VendorDiscountCallout from "@/components/pro-shop/VendorDiscountCallout";
import VendorShopEmbedFrame from "@/components/pro-shop/VendorShopEmbedFrame";
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

  /** Tall viewport embed; scroll stays inside the iframe (cross-origin storefront). */
  const storefrontEmbedHeight =
    "h-[calc(100dvh-13rem)] min-h-[26rem] " +
    "sm:h-[calc(100dvh-12rem)] sm:min-h-[30rem] " +
    "md:h-[calc(100dvh-11rem)] md:min-h-[34rem] " +
    "lg:h-[calc(100vh-5rem)] lg:min-h-[900px] " +
    "xl:min-h-[1100px] " +
    "2xl:min-h-[1200px]";

  return (
    <section className="bg-zinc-950 pt-4 text-white sm:pt-5">
      <div className="mx-auto w-full max-w-[100rem] px-3 sm:px-5 lg:px-6">
        <Link
          href={PRO_SHOP_ROUTE}
          className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-300 transition hover:text-white"
        >
          <span aria-hidden>&larr;</span>
          Back to Pro Shop
        </Link>

        <header className="mt-3 max-w-4xl">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-500 sm:text-sm">
            Zero Limits Pro Shop
          </p>
          <h1 className="mt-2 font-display text-2xl font-bold leading-tight sm:text-4xl lg:text-[2.75rem]">
            {vendor.name} — {catalogTitle}
          </h1>
          {vendor.subtitle ? (
            <p className="mt-1 text-sm italic text-zinc-400 sm:text-base">{vendor.subtitle}</p>
          ) : null}
          {vendor.fulfillmentNote ? (
            <p className="mt-2 max-w-3xl text-sm text-zinc-300 sm:text-base">
              {noteWithPhone(vendor.fulfillmentNote)}
            </p>
          ) : null}
          {vendor.discountCode ? (
            <VendorDiscountCallout
              code={vendor.discountCode}
              variant="dark"
              className="!mt-3 py-3 sm:py-4"
            />
          ) : null}
        </header>

        <div className="mt-4 w-full border-t border-white/10">
          <VendorShopEmbedFrame
            src={embedUrl}
            title={`${vendor.name} ${catalogTitle}`}
            className={`${storefrontEmbedHeight} bg-white`}
          />
        </div>
      </div>
    </section>
  );
}
