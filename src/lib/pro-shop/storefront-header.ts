type VendorStorefrontHeaderFields = {
  name: string;
  subtitle: string | null;
  fulfillmentNote: string | null;
};

export function vendorStorefrontTitle(vendor: Pick<VendorStorefrontHeaderFields, "name">): string {
  return `Shop ${vendor.name}`;
}

/** One subdued line under the catalog title (subtitle + fulfillment). */
export function vendorStorefrontSubline(vendor: VendorStorefrontHeaderFields): string | null {
  if (vendor.subtitle?.trim()) {
    return `${vendor.subtitle.trim()} · Orders fulfilled by ${vendor.name}`;
  }
  if (vendor.fulfillmentNote?.trim()) {
    return vendor.fulfillmentNote.trim();
  }
  return null;
}
