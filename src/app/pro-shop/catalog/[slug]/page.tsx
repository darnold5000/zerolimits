import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PRO_SHOP_ROUTE } from "@/config/pro-shop";
import { SITE } from "@/lib/content";
import VendorShopEmbedFrame from "@/components/pro-shop/VendorShopEmbedFrame";
import VendorStorefrontDiscountBanner from "@/components/pro-shop/VendorStorefrontDiscountBanner";
import { getVendorEmbedUrl } from "@/lib/pro-shop/catalog";
import { fetchPublicProShopVendorBySlug } from "@/lib/pro-shop/queries";
import {
  vendorStorefrontSubline,
  vendorStorefrontTitle,
} from "@/lib/pro-shop/storefront-header";

type CatalogPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: CatalogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const vendor = await fetchPublicProShopVendorBySlug(slug);

  if (!vendor) return { title: "Pro Shop Catalog" };

  return {
    title: vendorStorefrontTitle(vendor),
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
  const pageTitle = vendorStorefrontTitle(vendor);
  const subline = vendorStorefrontSubline(vendor);

  /** Fill viewport below site header + compact storefront header (~150–180px on desktop). */
  const storefrontEmbedHeight =
    "h-[calc(100dvh-11.5rem)] min-h-[26rem] " +
    "sm:h-[calc(100dvh-11rem)] sm:min-h-[30rem] " +
    "md:h-[calc(100dvh-10.5rem)] md:min-h-[34rem] " +
    "lg:h-[calc(100vh-15.5rem)] lg:min-h-[900px] " +
    "xl:min-h-[1100px] " +
    "2xl:min-h-[1200px]";

  return (
    <section className="bg-zinc-950 pb-0 pt-1.5 text-white sm:pt-2">
      <div className="mx-auto w-full max-w-[100rem] px-3 sm:px-5 lg:px-6">
        <Link
          href={PRO_SHOP_ROUTE}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-400 transition hover:text-white sm:text-sm"
        >
          <span aria-hidden>&larr;</span>
          Back to Pro Shop
        </Link>

        <header className="mt-1 max-w-5xl">
          <h1 className="font-display text-xl font-bold leading-tight tracking-tight sm:text-2xl lg:text-[1.75rem]">
            {pageTitle}
          </h1>
          {subline ? (
            <p className="mt-0.5 text-xs leading-snug text-zinc-500 sm:text-sm">{subline}</p>
          ) : null}
          {vendor.discountCode ? (
            <VendorStorefrontDiscountBanner code={vendor.discountCode} className="mt-2" />
          ) : null}
        </header>

        <div className="mt-2 w-full">
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
