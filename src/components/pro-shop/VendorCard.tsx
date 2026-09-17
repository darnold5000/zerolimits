import Image from "next/image";
import Link from "next/link";
import type { PublicProShopVendor } from "@/lib/pro-shop/queries";
import { PRO_SHOP_COPY } from "@/config/pro-shop";
import { SITE } from "@/lib/content";
import { getVendorCatalogAction } from "@/lib/pro-shop/catalog";

type VendorCardProps = {
  vendor: PublicProShopVendor;
  reverse?: boolean;
};

function noteWithPhone(note: string) {
  if (!note.includes(SITE.phone)) return note;
  const [before, after] = note.split(SITE.phone);
  return (
    <>
      {before}
      <a href={SITE.phoneHref} className="font-semibold text-red-600 hover:text-red-500">
        {SITE.phone}
      </a>
      {after}
    </>
  );
}

export default function VendorCard({ vendor, reverse = false }: VendorCardProps) {
  const catalogAction = getVendorCatalogAction(vendor);

  return (
    <article className="grid overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-lg shadow-zinc-200/50 lg:grid-cols-2 lg:items-stretch">
      <div
        className={`flex flex-col justify-center p-6 sm:p-8 lg:p-10 ${reverse ? "lg:order-2" : ""}`}
      >
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-600">
          {vendor.name}
        </p>
        {vendor.subtitle ? (
          <p className="mt-2 text-sm italic text-zinc-500">{vendor.subtitle}</p>
        ) : null}
        <h2 className="mt-3 font-display text-3xl font-bold text-zinc-900 sm:text-4xl">
          {vendor.title}
        </h2>
        <p className="mt-4 text-base leading-relaxed text-zinc-600 sm:text-lg">
          {vendor.description}
        </p>
        {vendor.discountCode ? (
          <p className="mt-3 text-sm font-semibold text-zinc-800">
            Use code{" "}
            <span className="rounded bg-zinc-100 px-2 py-0.5 font-mono text-red-600">
              {vendor.discountCode}
            </span>
          </p>
        ) : null}
        {vendor.fulfillmentNote ? (
          <p className="mt-3 text-sm text-zinc-600">{noteWithPhone(vendor.fulfillmentNote)}</p>
        ) : null}
        {catalogAction ? (
          <div className="mt-6 flex flex-wrap gap-3">
            {catalogAction.kind === "internal" ? (
              <Link
                href={catalogAction.href}
                className="inline-flex rounded-md bg-red-600 px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-red-500"
              >
                {PRO_SHOP_COPY.vendorCatalogCta}
              </Link>
            ) : (
              <a
                href={catalogAction.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex rounded-md bg-red-600 px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-red-500"
              >
                {PRO_SHOP_COPY.vendorExternalCta}
                <span className="sr-only"> (opens the vendor website in a new tab)</span>
              </a>
            )}
          </div>
        ) : null}
      </div>

      <div
        className={`relative min-h-[16rem] overflow-hidden border-t border-zinc-100 lg:min-h-[20rem] lg:border-l lg:border-t-0 ${reverse ? "lg:order-1" : ""}`}
      >
        {vendor.imageUrl ? (
          <Image
            src={vendor.imageUrl}
            alt={vendor.name}
            fill
            className="object-cover object-center"
            sizes="(min-width: 1024px) 50vw, 100vw"
            unoptimized={vendor.imageUrl.startsWith("http")}
          />
        ) : (
          <div className="flex h-full min-h-[16rem] items-center justify-center bg-zinc-100 px-6 text-center lg:min-h-full">
            <p className="font-display text-2xl font-bold uppercase tracking-wide text-zinc-400">
              {vendor.name}
            </p>
          </div>
        )}
      </div>
    </article>
  );
}
