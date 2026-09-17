"use client";

import { useMemo, useState, useTransition } from "react";
import type { DbProShopProduct, DbProShopVendor } from "@/lib/supabase/client";
import {
  deleteProduct,
  deleteVendor,
  moveProduct,
  moveVendor,
  saveProduct,
  saveVendor,
  setProductEnabled,
  setVendorEnabled,
  uploadProShopImage,
  type ProductFormInput,
  type VendorFormInput,
} from "@/lib/pro-shop/actions";

type Props = {
  vendors: DbProShopVendor[];
  products: DbProShopProduct[];
  vendorOptions: { id: string; name: string }[];
};

const emptyVendor: VendorFormInput = {
  slug: "",
  name: "",
  subtitle: "",
  title: "",
  catalogTitle: "",
  description: "",
  imageUrl: "",
  shopUrl: "",
  catalogUrl: "",
  embedUrl: "",
  referralUrl: "",
  embedInternally: false,
  discountCode: "",
  fulfillmentNote: "",
  enabled: false,
};

const emptyProduct: ProductFormInput = {
  vendorId: "",
  name: "",
  brand: "",
  description: "",
  imageUrl: "",
  destinationUrl: "",
  badge: "",
  enabled: false,
};

function StatusBadge({ enabled }: { enabled: boolean }) {
  return (
    <span
      className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
        enabled ? "bg-green-100 text-green-800" : "bg-zinc-200 text-zinc-600"
      }`}
    >
      {enabled ? "Enabled" : "Disabled"}
    </span>
  );
}

function ImageField({
  label,
  value,
  onChange,
  folder,
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
  folder: "vendors" | "products";
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleUpload(file: File | null) {
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.set("file", file);
      formData.set("folder", folder);
      const { url } = await uploadProShopImage(formData);
      onChange(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-zinc-800">{label}</label>
      <input
        type="url"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Image URL or upload below"
        className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm"
      />
      <div className="flex flex-wrap items-center gap-3">
        <label className="cursor-pointer rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm font-medium hover:bg-zinc-50">
          {uploading ? "Uploading…" : "Upload image"}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            disabled={uploading}
            onChange={(e) => handleUpload(e.target.files?.[0] ?? null)}
          />
        </label>
        {value ? (
          <button
            type="button"
            className="text-sm text-red-600 hover:text-red-500"
            onClick={() => onChange("")}
          >
            Remove
          </button>
        ) : null}
      </div>
      {value ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={value} alt="" className="h-24 w-24 rounded-lg border object-cover" />
      ) : null}
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </div>
  );
}

export default function ProShopAdminPanel({ vendors, products, vendorOptions }: Props) {
  const [tab, setTab] = useState<"vendors" | "products">("vendors");
  const [message, setMessage] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const [editingVendor, setEditingVendor] = useState<VendorFormInput | null>(null);
  const [editingProduct, setEditingProduct] = useState<ProductFormInput | null>(null);

  const sortedVendors = useMemo(
    () => [...vendors].sort((a, b) => a.sort_order - b.sort_order),
    [vendors],
  );
  const sortedProducts = useMemo(
    () => [...products].sort((a, b) => a.sort_order - b.sort_order),
    [products],
  );

  function run(action: () => Promise<void>) {
    setMessage(null);
    startTransition(async () => {
      try {
        await action();
        setMessage("Saved.");
        setEditingVendor(null);
        setEditingProduct(null);
      } catch (err) {
        setMessage(err instanceof Error ? err.message : "Something went wrong.");
      }
    });
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold text-zinc-900">Pro Shop</h1>
        <p className="mt-2 text-sm text-zinc-600">
          Manage vendor links, discount codes, and featured gear for the public Pro Shop page.
        </p>
      </div>

      {message ? (
        <p className="rounded-md border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-800">
          {message}
        </p>
      ) : null}

      <div className="flex gap-2 border-b border-zinc-200">
        {(["vendors", "products"] as const).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setTab(key)}
            className={`border-b-2 px-4 py-2 text-sm font-semibold capitalize ${
              tab === key
                ? "border-red-600 text-red-600"
                : "border-transparent text-zinc-500 hover:text-zinc-800"
            }`}
          >
            {key === "vendors" ? "Vendors" : "Featured Products"}
          </button>
        ))}
      </div>

      {tab === "vendors" ? (
        <div className="space-y-6">
          <button
            type="button"
            disabled={pending}
            className="rounded-md bg-red-600 px-4 py-2 text-sm font-bold uppercase tracking-wide text-white hover:bg-red-500 disabled:opacity-60"
            onClick={() => setEditingVendor({ ...emptyVendor })}
          >
            + Add Vendor
          </button>

          {editingVendor ? (
            <form
              className="space-y-4 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm"
              onSubmit={(e) => {
                e.preventDefault();
                run(() => saveVendor(editingVendor));
              }}
            >
              <h2 className="text-lg font-semibold">
                {editingVendor.id ? "Edit vendor" : "New vendor"}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {(
                  [
                    ["Vendor Name", "name"],
                    ["Slug", "slug"],
                    ["Vendor Card Title", "title"],
                    ["Vendor Subtitle", "subtitle"],
                    ["Catalog Page Heading", "catalogTitle"],
                    ["Vendor / Shop URL", "shopUrl"],
                    ["Catalog URL", "catalogUrl"],
                    ["Embed URL", "embedUrl"],
                    ["Referral / External Checkout URL", "referralUrl"],
                    ["Discount Code", "discountCode"],
                  ] as const
                ).map(([label, key]) => (
                  <label key={key} className="block text-sm">
                    <span className="font-medium text-zinc-800">{label}</span>
                    <input
                      required={key === "name"}
                      type={key.endsWith("Url") ? "url" : "text"}
                      value={editingVendor[key]}
                      onChange={(e) =>
                        setEditingVendor({ ...editingVendor, [key]: e.target.value })
                      }
                      className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2"
                    />
                  </label>
                ))}
              </div>
              <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 text-sm leading-relaxed text-zinc-600">
                <p>
                  <strong className="text-zinc-900">Embed URL:</strong> loaded inside the
                  Zero Limits catalog page when internal embedding is enabled. If blank,
                  the Catalog URL is used; Publuu catalog links automatically receive
                  embed mode.
                </p>
                <p className="mt-2">
                  <strong className="text-zinc-900">Referral URL:</strong> used first when
                  internal embedding is disabled or unavailable and customers are sent to
                  the vendor. Its full query string is preserved for attribution and
                  checkout tracking.
                </p>
              </div>
              <label className="block text-sm">
                <span className="font-medium text-zinc-800">Description</span>
                <textarea
                  rows={3}
                  value={editingVendor.description}
                  onChange={(e) =>
                    setEditingVendor({ ...editingVendor, description: e.target.value })
                  }
                  className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2"
                />
              </label>
              <label className="block text-sm">
                <span className="font-medium text-zinc-800">Fulfillment Note</span>
                <textarea
                  rows={2}
                  value={editingVendor.fulfillmentNote}
                  onChange={(e) =>
                    setEditingVendor({ ...editingVendor, fulfillmentNote: e.target.value })
                  }
                  className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2"
                />
              </label>
              <ImageField
                label="Image"
                folder="vendors"
                value={editingVendor.imageUrl}
                onChange={(url) => setEditingVendor({ ...editingVendor, imageUrl: url })}
              />
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={editingVendor.embedInternally}
                  onChange={(e) =>
                    setEditingVendor({
                      ...editingVendor,
                      embedInternally: e.target.checked,
                    })
                  }
                />
                Embed catalog inside Zero Limits
              </label>
              <p className="-mt-2 text-xs text-zinc-500">
                Enable only after confirming the configured embed or catalog URL permits
                iframe embedding. Otherwise customers will use the referral or shop URL.
              </p>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={editingVendor.enabled}
                  onChange={(e) =>
                    setEditingVendor({ ...editingVendor, enabled: e.target.checked })
                  }
                />
                Enabled on public Pro Shop
              </label>
              <div className="flex flex-wrap gap-2">
                <button
                  type="submit"
                  disabled={pending}
                  className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-semibold text-white"
                >
                  Save vendor
                </button>
                <button
                  type="button"
                  className="rounded-md border border-zinc-300 px-4 py-2 text-sm"
                  onClick={() => setEditingVendor(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : null}

          <ul className="space-y-3">
            {sortedVendors.map((vendor, index) => (
              <li
                key={vendor.id}
                className="flex flex-col gap-4 rounded-xl border border-zinc-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center"
              >
                {vendor.image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={vendor.image_url}
                    alt=""
                    className="h-16 w-16 shrink-0 rounded-lg object-cover"
                  />
                ) : (
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-xs text-zinc-500">
                    No image
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold text-zinc-900">{vendor.name}</p>
                    <StatusBadge enabled={vendor.enabled} />
                  </div>
                  <p className="text-sm text-zinc-600">{vendor.title}</p>
                  <p className="mt-1 text-xs text-zinc-500">
                    Slug: {vendor.slug} · Shop: {vendor.shop_url ? "Yes" : "None"} ·
                    Catalog: {vendor.catalog_url ? "Yes" : "None"} · Embed:{" "}
                    {vendor.embed_url ? "Yes" : "None"} · Referral:{" "}
                    {vendor.referral_url ? "Yes" : "None"} · Mode:{" "}
                    {vendor.embed_internally ? "Internal" : "External"}
                    {vendor.discount_code ? ` · Code: ${vendor.discount_code}` : ""}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    disabled={pending || index === 0}
                    className="rounded border px-2 py-1 text-xs"
                    onClick={() => run(() => moveVendor(vendor.id, "up"))}
                  >
                    Up
                  </button>
                  <button
                    type="button"
                    disabled={pending || index === sortedVendors.length - 1}
                    className="rounded border px-2 py-1 text-xs"
                    onClick={() => run(() => moveVendor(vendor.id, "down"))}
                  >
                    Down
                  </button>
                  <button
                    type="button"
                    className="rounded border px-2 py-1 text-xs"
                    onClick={() =>
                      setEditingVendor({
                        id: vendor.id,
                        slug: vendor.slug,
                        name: vendor.name,
                        subtitle: vendor.subtitle ?? "",
                        title: vendor.title,
                        catalogTitle: vendor.catalog_title ?? "",
                        description: vendor.description,
                        imageUrl: vendor.image_url ?? "",
                        shopUrl: vendor.shop_url ?? "",
                        catalogUrl: vendor.catalog_url ?? "",
                        embedUrl: vendor.embed_url ?? "",
                        referralUrl: vendor.referral_url ?? "",
                        embedInternally: vendor.embed_internally,
                        discountCode: vendor.discount_code ?? "",
                        fulfillmentNote: vendor.fulfillment_note ?? "",
                        enabled: vendor.enabled,
                      })
                    }
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="rounded border px-2 py-1 text-xs"
                    onClick={() =>
                      run(() => setVendorEnabled(vendor.id, !vendor.enabled))
                    }
                  >
                    {vendor.enabled ? "Disable" : "Enable"}
                  </button>
                  <button
                    type="button"
                    className="rounded border border-red-200 px-2 py-1 text-xs text-red-600"
                    onClick={() => {
                      if (confirm(`Delete ${vendor.name}?`)) {
                        run(() => deleteVendor(vendor.id));
                      }
                    }}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="space-y-6">
          <button
            type="button"
            disabled={pending}
            className="rounded-md bg-red-600 px-4 py-2 text-sm font-bold uppercase tracking-wide text-white hover:bg-red-500 disabled:opacity-60"
            onClick={() => setEditingProduct({ ...emptyProduct })}
          >
            + Add Featured Product
          </button>

          {editingProduct ? (
            <form
              className="space-y-4 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm"
              onSubmit={(e) => {
                e.preventDefault();
                run(() => saveProduct(editingProduct));
              }}
            >
              <h2 className="text-lg font-semibold">
                {editingProduct.id ? "Edit product" : "New featured product"}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm">
                  <span className="font-medium">Product Name</span>
                  <input
                    required
                    value={editingProduct.name}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, name: e.target.value })
                    }
                    className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2"
                  />
                </label>
                <label className="block text-sm">
                  <span className="font-medium">Brand</span>
                  <input
                    value={editingProduct.brand}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, brand: e.target.value })
                    }
                    className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2"
                  />
                </label>
                <label className="block text-sm sm:col-span-2">
                  <span className="font-medium">Destination URL</span>
                  <input
                    value={editingProduct.destinationUrl}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        destinationUrl: e.target.value,
                      })
                    }
                    className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2"
                  />
                </label>
                <label className="block text-sm">
                  <span className="font-medium">Badge</span>
                  <input
                    value={editingProduct.badge}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, badge: e.target.value })
                    }
                    className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2"
                  />
                </label>
                <label className="block text-sm">
                  <span className="font-medium">Vendor</span>
                  <select
                    value={editingProduct.vendorId}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, vendorId: e.target.value })
                    }
                    className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2"
                  >
                    <option value="">None</option>
                    {vendorOptions.map((v) => (
                      <option key={v.id} value={v.id}>
                        {v.name}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <label className="block text-sm">
                <span className="font-medium">Description</span>
                <textarea
                  rows={3}
                  value={editingProduct.description}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, description: e.target.value })
                  }
                  className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2"
                />
              </label>
              <ImageField
                label="Image"
                folder="products"
                value={editingProduct.imageUrl}
                onChange={(url) => setEditingProduct({ ...editingProduct, imageUrl: url })}
              />
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={editingProduct.enabled}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, enabled: e.target.checked })
                  }
                />
                Enabled on public Pro Shop
              </label>
              <div className="flex flex-wrap gap-2">
                <button
                  type="submit"
                  disabled={pending}
                  className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-semibold text-white"
                >
                  Save product
                </button>
                <button
                  type="button"
                  className="rounded-md border border-zinc-300 px-4 py-2 text-sm"
                  onClick={() => setEditingProduct(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : null}

          <ul className="space-y-3">
            {sortedProducts.map((product, index) => (
              <li
                key={product.id}
                className="flex flex-col gap-4 rounded-xl border border-zinc-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center"
              >
                {product.image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={product.image_url}
                    alt=""
                    className="h-16 w-16 shrink-0 rounded-lg object-cover"
                  />
                ) : (
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-xs text-zinc-500">
                    No image
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold text-zinc-900">{product.name}</p>
                    <StatusBadge enabled={product.enabled} />
                  </div>
                  <p className="text-sm text-zinc-600">{product.brand}</p>
                  <p className="mt-1 text-xs text-zinc-500">
                    Link: {product.destination_url ? "Yes" : "None"}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    disabled={pending || index === 0}
                    className="rounded border px-2 py-1 text-xs"
                    onClick={() => run(() => moveProduct(product.id, "up"))}
                  >
                    Up
                  </button>
                  <button
                    type="button"
                    disabled={pending || index === sortedProducts.length - 1}
                    className="rounded border px-2 py-1 text-xs"
                    onClick={() => run(() => moveProduct(product.id, "down"))}
                  >
                    Down
                  </button>
                  <button
                    type="button"
                    className="rounded border px-2 py-1 text-xs"
                    onClick={() =>
                      setEditingProduct({
                        id: product.id,
                        vendorId: product.vendor_id ?? "",
                        name: product.name,
                        brand: product.brand,
                        description: product.description,
                        imageUrl: product.image_url ?? "",
                        destinationUrl: product.destination_url ?? "",
                        badge: product.badge ?? "",
                        enabled: product.enabled,
                      })
                    }
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="rounded border px-2 py-1 text-xs"
                    onClick={() =>
                      run(() => setProductEnabled(product.id, !product.enabled))
                    }
                  >
                    {product.enabled ? "Disable" : "Enable"}
                  </button>
                  <button
                    type="button"
                    className="rounded border border-red-200 px-2 py-1 text-xs text-red-600"
                    onClick={() => {
                      if (confirm(`Delete ${product.name}?`)) {
                        run(() => deleteProduct(product.id));
                      }
                    }}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
