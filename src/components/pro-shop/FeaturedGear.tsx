import FeaturedProductCard from "@/components/pro-shop/FeaturedProductCard";
import type { PublicProShopProduct } from "@/lib/pro-shop/queries";

type FeaturedGearProps = {
  products: PublicProShopProduct[];
};

export default function FeaturedGear({ products }: FeaturedGearProps) {
  if (products.length === 0) {
    return null;
  }

  return (
    <section className="bg-zinc-50 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-600">
          Featured Gear
        </p>
        <h2 className="mt-3 font-display text-3xl font-bold text-zinc-900 sm:text-4xl">
          Staff Picks
        </h2>
        <p className="mt-3 max-w-2xl text-lg text-zinc-600">
          A curated selection of equipment available through Zero Limits Baseball.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <FeaturedProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
