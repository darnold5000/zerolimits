import { NextResponse } from "next/server";
import { proxyVendorShopRequest } from "@/lib/pro-shop/vendor-proxy";
import { fetchPublicProShopVendorBySlug } from "@/lib/pro-shop/queries";

type RouteContext = {
  params: Promise<{ slug: string; path?: string[] }>;
};

function partnerShopUrl(vendor: {
  shopUrl: string | null;
  referralUrl: string | null;
}): string | null {
  const shop = vendor.shopUrl?.trim() || vendor.referralUrl?.trim();
  return shop || null;
}

export async function GET(request: Request, context: RouteContext) {
  const { slug, path } = await context.params;
  const vendor = await fetchPublicProShopVendorBySlug(slug);

  if (!vendor?.embedInternally) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const shopUrl = partnerShopUrl(vendor);
  if (!shopUrl) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  try {
    return await proxyVendorShopRequest(
      { slug: vendor.slug, shopUrl },
      request,
      path ?? [],
    );
  } catch {
    return NextResponse.json({ error: "Embed unavailable" }, { status: 502 });
  }
}

export async function HEAD(request: Request, context: RouteContext) {
  return GET(request, context);
}
