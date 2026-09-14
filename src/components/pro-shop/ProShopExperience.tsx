import FeaturedGear from "@/components/pro-shop/FeaturedGear";
import GearHelpCTA from "@/components/pro-shop/GearHelpCTA";
import ProShopDisclaimer from "@/components/pro-shop/ProShopDisclaimer";
import ProShopHero from "@/components/pro-shop/ProShopHero";
import VendorCard from "@/components/pro-shop/VendorCard";
import type { PublicProShopProduct, PublicProShopVendor } from "@/lib/pro-shop/queries";

type ProShopExperienceProps = {
  vendors: PublicProShopVendor[];
  products: PublicProShopProduct[];
};

export default function ProShopExperience({ vendors, products }: ProShopExperienceProps) {
  return (
    <>
      <ProShopHero />

      {vendors.length > 0 ? (
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-6xl space-y-12 px-4 sm:px-6 sm:space-y-16">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-600">
                Shop by Brand
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold text-zinc-900 sm:text-4xl">
                Vendor Partners
              </h2>
            </div>
            {vendors.map((vendor, index) => (
              <VendorCard key={vendor.id} vendor={vendor} reverse={index % 2 === 1} />
            ))}
          </div>
        </section>
      ) : null}

      <FeaturedGear products={products} />
      <GearHelpCTA />
      <ProShopDisclaimer />
    </>
  );
}
