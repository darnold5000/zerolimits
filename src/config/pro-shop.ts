import { SITE } from "@/lib/content";

/** Full Pro Shop experience (vendors, featured gear). Nav and Coming Soon always public. */
export function isProShopEnabled(): boolean {
  return process.env.NEXT_PUBLIC_PRO_SHOP_ENABLED === "true";
}

export const PRO_SHOP_ROUTE = "/pro-shop" as const;
export const PRO_SHOP_CATALOG_ROUTE = "/pro-shop/catalog" as const;

export function getProShopCatalogRoute(slug: string): string {
  return `${PRO_SHOP_CATALOG_ROUTE}/${encodeURIComponent(slug)}`;
}

/** Same-origin proxy path for partner shops that block third-party iframes. */
export function getProShopEmbedRoute(slug: string): string {
  return `/pro-shop/embed/${encodeURIComponent(slug)}`;
}

export const PRO_SHOP_COPY = {
  eyebrow: "Zero Limits Pro Shop",
  heading: "Gear Up. Play Without Limits.",
  heroBody:
    "Shop baseball equipment and gear available through Zero Limits Baseball.",
  comingSoonBody:
    "The Zero Limits Pro Shop is coming soon. We're bringing together trusted baseball brands, equipment, and exclusive gear in one place.",
  comingSoonSecondary:
    "Bats. Gloves. Catcher's gear. Training equipment. And more.",
  comingSoonCtaPrompt: "Questions about gear?",
  homepageBody:
    "Shop bats, gloves, gear, and equipment available through Zero Limits Baseball.",
  brandsLine: "Rawlings • Easton • Baseline Sports",
  homepageCta: "Visit Pro Shop",
  benefits: ["Trusted Brands", "Zero Limits Pricing", "Local Support"] as const,
  helpHeading: "Not Sure What You Need?",
  helpBody:
    "Need help choosing the right bat, glove, catcher's gear, or training equipment? Talk with Zero Limits before you order.",
  helpCta: `Call or Text ${SITE.phone}`,
  disclaimer:
    "Some Pro Shop products may be ordered or fulfilled through trusted vendor partners. Availability, pricing, shipping, and return policies may vary by vendor.",
  heroImage: "/images/catalog/easton-chili-peppers.jpg",
  heroImageAlt: "Easton baseball bats and player",
  vendorShopCta: "Shop",
  vendorCatalogCta: "Browse Catalog",
  vendorExternalCta: "Shop on Baseline Sports",
  vendorDiscountHeading: "Zero Limits Discount",
  vendorDiscountBody:
    "Use the Zero Limits discount code at checkout to receive 10% off.",
  vendorDiscountCodeLabel: "10% off discount code:",
} as const;
