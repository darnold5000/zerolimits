import Image from "next/image";
import type { PublicProShopProduct } from "@/lib/pro-shop/queries";

type FeaturedProductCardProps = {
  product: PublicProShopProduct;
};

export default function FeaturedProductCard({ product }: FeaturedProductCardProps) {
  const imageSrc = product.imageUrl ?? "/images/catalog/easton-chili-peppers.jpg";

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition hover:shadow-md">
      <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100">
        <Image
          src={imageSrc}
          alt={product.name}
          fill
          className="object-cover object-center"
          sizes="(min-width: 768px) 33vw, 100vw"
          unoptimized={imageSrc.startsWith("http")}
        />
        {product.badge ? (
          <span className="absolute left-3 top-3 rounded-md bg-red-600 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-white">
            {product.badge}
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-xs font-bold uppercase tracking-[0.15em] text-red-600">
          {product.brand}
        </p>
        <h3 className="mt-1 font-display text-xl font-bold text-zinc-900">{product.name}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-600">
          {product.description}
        </p>
        <a
          href={product.destinationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex w-fit rounded-md border-2 border-zinc-900 px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-zinc-900 transition hover:bg-zinc-900 hover:text-white"
        >
          {product.ctaLabel}
        </a>
      </div>
    </article>
  );
}
