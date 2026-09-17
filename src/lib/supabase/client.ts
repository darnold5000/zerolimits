import { createBrowserClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";

export const TABLES = {
  adminUsers: "zl_admin_users",
  vendors: "pro_shop_vendors",
  products: "pro_shop_products",
} as const;

export const PRO_SHOP_STORAGE_BUCKET = "zl-pro-shop";

export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}

export function createSupabaseBrowserClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new Error("Supabase is not configured");
  }
  return createBrowserClient(url, key);
}

export function createSupabaseServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error("Supabase service role is not configured");
  }
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export type DbProShopVendor = {
  id: string;
  slug: string;
  name: string;
  subtitle: string | null;
  title: string;
  catalog_title: string | null;
  description: string;
  image_url: string | null;
  shop_url: string | null;
  embed_url: string | null;
  referral_url: string | null;
  embed_internally: boolean;
  discount_code: string | null;
  fulfillment_note: string | null;
  catalog_url: string | null;
  enabled: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type DbProShopProduct = {
  id: string;
  vendor_id: string | null;
  name: string;
  brand: string;
  description: string;
  image_url: string | null;
  destination_url: string | null;
  badge: string | null;
  enabled: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};
