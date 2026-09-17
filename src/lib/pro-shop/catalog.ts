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
  | { kind: "internal"; href: string; embedUrl: string }
  | { kind: "external"; href: string }
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

function publuuEmbedUrl(value: string): string {
  const parsed = new URL(value);
  const isPubluu =
    parsed.hostname === "publuu.com" || parsed.hostname.endsWith(".publuu.com");
  if (!isPubluu || /(?:[?&])embed(?:[=&]|$)/.test(value)) return value;

  const hashIndex = value.indexOf("#");
  const baseUrl = hashIndex >= 0 ? value.slice(0, hashIndex) : value;
  const hash = hashIndex >= 0 ? value.slice(hashIndex) : "";
  const separator = baseUrl.includes("?") ? "&" : "?";
  return `${baseUrl}${separator}embed${hash}`;
}

export function getVendorEmbedUrl(vendor: VendorCatalogConfiguration): string | null {
  if (!vendor.embedInternally) return null;

  const configuredEmbed = validHttpUrl(vendor.embedUrl);
  if (configuredEmbed) return publuuEmbedUrl(configuredEmbed);

  const legacyCatalog = validHttpUrl(vendor.catalogUrl);
  return legacyCatalog ? publuuEmbedUrl(legacyCatalog) : null;
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
  if (embedUrl) {
    return {
      kind: "internal",
      href: getProShopCatalogRoute(vendor.slug),
      embedUrl,
    };
  }

  const externalUrl = getVendorExternalUrl(vendor);
  return externalUrl ? { kind: "external", href: externalUrl } : null;
}
