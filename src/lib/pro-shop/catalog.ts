export type CatalogUrls = {
  embedUrl: string;
  externalUrl: string;
};

export function getCatalogUrls(value: string | null): CatalogUrls | null {
  if (!value) return null;

  try {
    const external = new URL(value);
    if (external.protocol !== "https:" && external.protocol !== "http:") return null;

    const isPubluu =
      external.hostname === "publuu.com" || external.hostname.endsWith(".publuu.com");

    if (!isPubluu) {
      return { embedUrl: external.toString(), externalUrl: external.toString() };
    }

    external.searchParams.delete("embed");
    const externalUrl = external.toString();
    const hashIndex = externalUrl.indexOf("#");
    const baseUrl = hashIndex >= 0 ? externalUrl.slice(0, hashIndex) : externalUrl;
    const hash = hashIndex >= 0 ? externalUrl.slice(hashIndex) : "";
    const separator = baseUrl.includes("?") ? "&" : "?";

    return {
      embedUrl: `${baseUrl}${separator}embed${hash}`,
      externalUrl,
    };
  } catch {
    return null;
  }
}
