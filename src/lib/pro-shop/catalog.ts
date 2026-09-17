import { getProShopCatalogRoute } from "@/config/pro-shop";

export type VendorCatalogConfiguration = {
  slug: string;
  shopUrl: string | null;
  catalogUrl: string | null;
  embedUrl: string | null;
  referralUrl: string | null;
  embedInternally: boolean;
};

export type VendorCatalogAction =
  | { kind: "internal"; href: string; embedUrl: string | null }
  | null;

function validHttpUrl(value: string | null): string | null {
  const candidate = value?.trim();
  if (!candidate) return null;

  try {
    const url = new URL(candidate);
    if (url.protocol !== "https:" && url.protocol !== "http:") return null;
    return candidate;
  } catch {
    return null;
  }
}

function isPubluuUrl(value: string): boolean {
  try {
    const parsed = new URL(value);
    return parsed.hostname === "publuu.com" || parsed.hostname.endsWith(".publuu.com");
  } catch {
    return false;
  }
}

function publuuEmbedUrl(value: string): string {
  if (!isPubluuUrl(value) || /(?:[?&])embed(?:[=&]|$)/.test(value)) return value;

  const hashIndex = value.indexOf("#");
  const baseUrl = hashIndex >= 0 ? value.slice(0, hashIndex) : value;
  const hash = hashIndex >= 0 ? value.slice(hashIndex) : "";
  const separator = baseUrl.includes("?") ? "&" : "?";
  return `${baseUrl}${separator}embed${hash}`;
}

export function getVendorEmbedUrl(vendor: VendorCatalogConfiguration): string | null {
  const configuredEmbed = validHttpUrl(vendor.embedUrl);
  const legacyCatalog = validHttpUrl(vendor.catalogUrl);
  const candidate = configuredEmbed ?? legacyCatalog;
  if (!candidate) return null;

  // Publuu catalogs are always embeddable (legacy Rawlings behavior).
  // Other URLs require the admin "Embed catalog inside Zero Limits" flag.
  if (!vendor.embedInternally && !isPubluuUrl(candidate)) return null;

  return publuuEmbedUrl(candidate);
}

export function getVendorExternalUrl(
  vendor: VendorCatalogConfiguration,
): string | null {
  return (
    validHttpUrl(vendor.referralUrl) ??
    validHttpUrl(vendor.shopUrl) ??
    validHttpUrl(vendor.catalogUrl) ??
    validHttpUrl(vendor.embedUrl)
  );
}

/**
 * Prefer an on-site Zero Limits catalog page whenever the vendor has any
 * shop/catalog destination. External checkout happens from that page when
 * the partner site cannot be iframes (e.g. Shopify).
 */
export function getVendorCatalogAction(
  vendor: VendorCatalogConfiguration,
): VendorCatalogAction {
  const embedUrl = getVendorEmbedUrl(vendor);
  const externalUrl = getVendorExternalUrl(vendor);
  if (!embedUrl && !externalUrl) return null;

  return {
    kind: "internal",
    href: getProShopCatalogRoute(vendor.slug),
    embedUrl,
  };
}
