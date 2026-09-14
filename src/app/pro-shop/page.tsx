import type { Metadata } from "next";
import ProShopComingSoon from "@/components/pro-shop/ProShopComingSoon";
import ProShopExperience from "@/components/pro-shop/ProShopExperience";
import { isProShopEnabled } from "@/config/pro-shop";
import { SITE } from "@/lib/content";
import {
  fetchPublicProShopProducts,
  fetchPublicProShopVendors,
} from "@/lib/pro-shop/queries";

export const metadata: Metadata = {
  title: "Pro Shop",
  description: `Baseball equipment and gear through ${SITE.name} — bats, gloves, and trusted brands.`,
  alternates: { canonical: "/pro-shop" },
};

export default async function ProShopPage() {
  if (!isProShopEnabled()) {
    return <ProShopComingSoon />;
  }

  const [vendors, products] = await Promise.all([
    fetchPublicProShopVendors(),
    fetchPublicProShopProducts(),
  ]);

  return <ProShopExperience vendors={vendors} products={products} />;
}
