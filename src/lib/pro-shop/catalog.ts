import { getProShopCatalogRoute, getProShopEmbedRoute } from "@/config/pro-shop";

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

function getVendorPartnerShopUrl(vendor: VendorCatalogConfiguration): string | null {
  return validHttpUrl(vendor.shopUrl) ?? validHttpUrl(vendor.referralUrl);
}

export function getVendorEmbedUrl(vendor: VendorCatalogConfiguration): string | null {
  const configuredEmbed = validHttpUrl(vendor.embedUrl);
  const legacyCatalog = validHttpUrl(vendor.catalogUrl);
  const catalogCandidate = configuredEmbed ?? legacyCatalog;

  if (catalogCandidate) {
    // Publuu catalogs are always embeddable (legacy Rawlings behavior).
    if (!vendor.embedInternally && !isPubluuUrl(catalogCandidate)) return null;
    return publuuEmbedUrl(catalogCandidate);
  }

  const partnerShop = getVendorPartnerShopUrl(vendor);
  if (partnerShop && vendor.embedInternally) {
    return getProShopEmbedRoute(vendor.slug);
  }

  return null;
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

export function getVendorCatalogAction(
  vendor: VendorCatalogConfiguration,
): VendorCatalogAction {
  const embedUrl = getVendorEmbedUrl(vendor);
  if (!embedUrl) return null;

  return {
    kind: "internal",
    href: getProShopCatalogRoute(vendor.slug),
    embedUrl,
  };
}
