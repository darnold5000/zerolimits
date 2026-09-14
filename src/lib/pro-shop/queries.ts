import type { DbProShopProduct, DbProShopVendor } from "@/lib/supabase/client";
import { TABLES, isSupabaseConfigured } from "@/lib/supabase/client";
import { createSupabaseServiceClient } from "@/lib/supabase/client";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type PublicProShopVendor = {
  id: string;
  name: string;
  title: string;
  description: string;
  imageUrl: string | null;
  shopUrl: string | null;
  catalogUrl: string | null;
  discountCode: string | null;
  fulfillmentNote: string | null;
};

export type PublicProShopProduct = {
  id: string;
  brand: string;
  name: string;
  description: string;
  badge: string | null;
  imageUrl: string | null;
  destinationUrl: string;
  ctaLabel: string;
};

function mapVendor(row: DbProShopVendor): PublicProShopVendor {
  return {
    id: row.id,
    name: row.name,
    title: row.title,
    description: row.description,
    imageUrl: row.image_url,
    shopUrl: row.shop_url?.trim() ? row.shop_url.trim() : null,
    catalogUrl: row.catalog_url?.trim() ? row.catalog_url.trim() : null,
    discountCode: row.discount_code?.trim() ? row.discount_code.trim() : null,
    fulfillmentNote: row.fulfillment_note?.trim() ? row.fulfillment_note.trim() : null,
  };
}

function mapProduct(row: DbProShopProduct): PublicProShopProduct {
  return {
    id: row.id,
    brand: row.brand,
    name: row.name,
    description: row.description,
    badge: row.badge?.trim() ? row.badge.trim() : null,
    imageUrl: row.image_url,
    destinationUrl: row.destination_url!.trim(),
    ctaLabel: "View Product",
  };
}

export async function fetchPublicProShopVendors(): Promise<PublicProShopVendor[]> {
  if (!isSupabaseConfigured()) return [];

  const supabase = await createSupabaseServerClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from(TABLES.vendors)
    .select("*")
    .eq("enabled", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error || !data) return [];
  return (data as DbProShopVendor[]).map(mapVendor);
}

export async function fetchPublicProShopProducts(): Promise<PublicProShopProduct[]> {
  if (!isSupabaseConfigured()) return [];

  const supabase = await createSupabaseServerClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from(TABLES.products)
    .select("*")
    .eq("enabled", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error || !data) return [];

  return (data as DbProShopProduct[])
    .filter((row) => row.destination_url?.trim())
    .map(mapProduct);
}

export async function fetchAdminProShopVendors(): Promise<DbProShopVendor[]> {
  const supabase = createSupabaseServiceClient();
  const { data, error } = await supabase
    .from(TABLES.vendors)
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) throw new Error(error.message);
  return (data ?? []) as DbProShopVendor[];
}

export async function fetchAdminProShopProducts(): Promise<DbProShopProduct[]> {
  const supabase = createSupabaseServiceClient();
  const { data, error } = await supabase
    .from(TABLES.products)
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) throw new Error(error.message);
  return (data ?? []) as DbProShopProduct[];
}

export async function fetchAdminVendorOptions(): Promise<{ id: string; name: string }[]> {
  const supabase = createSupabaseServiceClient();
  const { data } = await supabase
    .from(TABLES.vendors)
    .select("id, name")
    .order("sort_order", { ascending: true });
  return (data ?? []) as { id: string; name: string }[];
}
