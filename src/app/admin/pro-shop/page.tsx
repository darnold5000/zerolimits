import ProShopAdminPanel from "@/components/admin/ProShopAdminPanel";
import { requireAdmin } from "@/lib/admin/auth";
import {
  fetchAdminProShopProducts,
  fetchAdminProShopVendors,
  fetchAdminVendorOptions,
} from "@/lib/pro-shop/queries";

async function loadAdminProShopData() {
  try {
    const [vendors, products, vendorOptions] = await Promise.all([
      fetchAdminProShopVendors(),
      fetchAdminProShopProducts(),
      fetchAdminVendorOptions(),
    ]);
    return { ok: true as const, vendors, products, vendorOptions };
  } catch {
    return { ok: false as const };
  }
}

export default async function AdminProShopPage() {
  await requireAdmin();

  const data = await loadAdminProShopData();

  if (!data.ok) {
    return (
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-950">
        <p className="font-semibold">Supabase service role required</p>
        <p className="mt-2">
          Add SUPABASE_SERVICE_ROLE_KEY and run migration{" "}
          <code className="rounded bg-white px-1">001_zl_admin_pro_shop.sql</code> in your Zero
          Limits Supabase project.
        </p>
      </div>
    );
  }

  return (
    <ProShopAdminPanel
      vendors={data.vendors}
      products={data.products}
      vendorOptions={data.vendorOptions}
    />
  );
}
