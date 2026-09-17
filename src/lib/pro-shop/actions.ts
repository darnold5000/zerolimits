"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin/auth";
import {
  PRO_SHOP_STORAGE_BUCKET,
  TABLES,
  createSupabaseServiceClient,
} from "@/lib/supabase/client";

const PRO_SHOP_PATH = "/pro-shop";
const PRO_SHOP_CATALOG_PATH = "/pro-shop/catalog";
const ADMIN_PATH = "/admin/pro-shop";

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

async function assertAdmin() {
  await requireAdmin();
  return createSupabaseServiceClient();
}

async function revalidateProShop() {
  revalidatePath(PRO_SHOP_PATH);
  revalidatePath(PRO_SHOP_CATALOG_PATH);
  revalidatePath(ADMIN_PATH);
}

export type VendorFormInput = {
  id?: string;
  name: string;
  title: string;
  description: string;
  imageUrl: string;
  shopUrl: string;
  catalogUrl: string;
  discountCode: string;
  fulfillmentNote: string;
  enabled: boolean;
};

export type ProductFormInput = {
  id?: string;
  vendorId: string;
  name: string;
  brand: string;
  description: string;
  imageUrl: string;
  destinationUrl: string;
  badge: string;
  enabled: boolean;
};

export async function saveVendor(input: VendorFormInput) {
  const supabase = await assertAdmin();
  const payload = {
    name: input.name.trim(),
    title: input.title.trim(),
    description: input.description.trim(),
    image_url: input.imageUrl.trim() || null,
    shop_url: input.shopUrl.trim() || null,
    catalog_url: input.catalogUrl.trim() || null,
    discount_code: input.discountCode.trim() || null,
    fulfillment_note: input.fulfillmentNote.trim() || null,
    enabled: input.enabled,
  };

  if (input.id) {
    const { error } = await supabase
      .from(TABLES.vendors)
      .update(payload)
      .eq("id", input.id);
    if (error) throw new Error(error.message);
  } else {
    const baseSlug = slugify(input.name) || "vendor";
    let slug = baseSlug;
    let attempt = 0;
    while (attempt < 5) {
      const { data: maxRow } = await supabase
        .from(TABLES.vendors)
        .select("sort_order")
        .order("sort_order", { ascending: false })
        .limit(1)
        .maybeSingle();
      const nextOrder = (maxRow?.sort_order ?? 0) + 1;
      const { error } = await supabase.from(TABLES.vendors).insert({
        ...payload,
        slug,
        sort_order: nextOrder,
      });
      if (!error) break;
      if (error.code === "23505") {
        attempt += 1;
        slug = `${baseSlug}-${attempt}`;
        continue;
      }
      throw new Error(error.message);
    }
  }

  await revalidateProShop();
}

export async function deleteVendor(id: string) {
  const supabase = await assertAdmin();
  const { error } = await supabase.from(TABLES.vendors).delete().eq("id", id);
  if (error) throw new Error(error.message);
  await revalidateProShop();
}

export async function setVendorEnabled(id: string, enabled: boolean) {
  const supabase = await assertAdmin();
  const { error } = await supabase.from(TABLES.vendors).update({ enabled }).eq("id", id);
  if (error) throw new Error(error.message);
  await revalidateProShop();
}

export async function moveVendor(id: string, direction: "up" | "down") {
  const supabase = await assertAdmin();
  const { data: rows, error } = await supabase
    .from(TABLES.vendors)
    .select("id, sort_order")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error || !rows) throw new Error(error?.message ?? "Failed to load vendors");

  const index = rows.findIndex((row) => row.id === id);
  if (index < 0) return;

  const swapIndex = direction === "up" ? index - 1 : index + 1;
  if (swapIndex < 0 || swapIndex >= rows.length) return;

  const current = rows[index];
  const neighbor = rows[swapIndex];

  const { error: e1 } = await supabase
    .from(TABLES.vendors)
    .update({ sort_order: neighbor.sort_order })
    .eq("id", current.id);
  const { error: e2 } = await supabase
    .from(TABLES.vendors)
    .update({ sort_order: current.sort_order })
    .eq("id", neighbor.id);

  if (e1 || e2) throw new Error(e1?.message ?? e2?.message ?? "Reorder failed");
  await revalidateProShop();
}

export async function saveProduct(input: ProductFormInput) {
  const supabase = await assertAdmin();
  const payload = {
    vendor_id: input.vendorId.trim() || null,
    name: input.name.trim(),
    brand: input.brand.trim(),
    description: input.description.trim(),
    image_url: input.imageUrl.trim() || null,
    destination_url: input.destinationUrl.trim() || null,
    badge: input.badge.trim() || null,
    enabled: input.enabled,
  };

  if (input.id) {
    const { error } = await supabase
      .from(TABLES.products)
      .update(payload)
      .eq("id", input.id);
    if (error) throw new Error(error.message);
  } else {
    const { data: maxRow } = await supabase
      .from(TABLES.products)
      .select("sort_order")
      .order("sort_order", { ascending: false })
      .limit(1)
      .maybeSingle();
    const nextOrder = (maxRow?.sort_order ?? 0) + 1;
    const { error } = await supabase.from(TABLES.products).insert({
      ...payload,
      sort_order: nextOrder,
    });
    if (error) throw new Error(error.message);
  }

  await revalidateProShop();
}

export async function deleteProduct(id: string) {
  const supabase = await assertAdmin();
  const { error } = await supabase.from(TABLES.products).delete().eq("id", id);
  if (error) throw new Error(error.message);
  await revalidateProShop();
}

export async function setProductEnabled(id: string, enabled: boolean) {
  const supabase = await assertAdmin();
  const { error } = await supabase.from(TABLES.products).update({ enabled }).eq("id", id);
  if (error) throw new Error(error.message);
  await revalidateProShop();
}

export async function moveProduct(id: string, direction: "up" | "down") {
  const supabase = await assertAdmin();
  const { data: rows, error } = await supabase
    .from(TABLES.products)
    .select("id, sort_order")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error || !rows) throw new Error(error?.message ?? "Failed to load products");

  const index = rows.findIndex((row) => row.id === id);
  if (index < 0) return;

  const swapIndex = direction === "up" ? index - 1 : index + 1;
  if (swapIndex < 0 || swapIndex >= rows.length) return;

  const current = rows[index];
  const neighbor = rows[swapIndex];

  const { error: e1 } = await supabase
    .from(TABLES.products)
    .update({ sort_order: neighbor.sort_order })
    .eq("id", current.id);
  const { error: e2 } = await supabase
    .from(TABLES.products)
    .update({ sort_order: current.sort_order })
    .eq("id", neighbor.id);

  if (e1 || e2) throw new Error(e1?.message ?? e2?.message ?? "Reorder failed");
  await revalidateProShop();
}

export async function uploadProShopImage(formData: FormData): Promise<{ url: string }> {
  await requireAdmin();
  const file = formData.get("file");
  const folder = String(formData.get("folder") ?? "misc");

  if (!(file instanceof File) || file.size === 0) {
    throw new Error("Choose an image file to upload.");
  }

  if (!file.type.startsWith("image/")) {
    throw new Error("Only image files are allowed.");
  }

  const supabase = createSupabaseServiceClient();
  const safeFolder = folder === "products" ? "products" : "vendors";
  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const path = `${safeFolder}/${crypto.randomUUID()}.${ext}`;

  const buffer = Buffer.from(await file.arrayBuffer());
  const { error } = await supabase.storage.from(PRO_SHOP_STORAGE_BUCKET).upload(path, buffer, {
    contentType: file.type,
    upsert: false,
  });

  if (error) throw new Error(error.message);

  const { data } = supabase.storage.from(PRO_SHOP_STORAGE_BUCKET).getPublicUrl(path);
  return { url: data.publicUrl };
}
