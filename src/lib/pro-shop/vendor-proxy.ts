const STRIP_RESPONSE_HEADERS = new Set([
  "content-encoding",
  "content-length",
  "content-security-policy",
  "content-security-policy-report-only",
  "cross-origin-embedder-policy",
  "cross-origin-opener-policy",
  "cross-origin-resource-policy",
  "permissions-policy",
  "transfer-encoding",
  "x-frame-options",
]);

function stripHopByHopHeaders(headers: Headers): Headers {
  const next = new Headers();
  headers.forEach((value, key) => {
    if (!STRIP_RESPONSE_HEADERS.has(key.toLowerCase())) {
      next.set(key, value);
    }
  });
  return next;
}

function upstreamShopOrigin(shopUrl: string): URL {
  const parsed = new URL(shopUrl);
  if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
    throw new Error("Invalid shop URL");
  }
  return parsed;
}

function embedBasePath(slug: string): string {
  return `/pro-shop/embed/${encodeURIComponent(slug)}`;
}

function rewriteUpstreamLocation(
  location: string,
  upstream: URL,
  embedPath: string,
): string {
  try {
    const resolved = new URL(location, upstream.origin);
    if (resolved.origin !== upstream.origin) return location;
    const suffix = `${resolved.pathname}${resolved.search}${resolved.hash}`;
    return `${embedPath}${suffix.startsWith("/") ? suffix : `/${suffix}`}`;
  } catch {
    return location;
  }
}

function rewriteShopHtml(html: string, upstream: URL, embedPath: string): string {
  const host = upstream.host;
  const origin = upstream.origin;
  let out = html;

  out = out.replaceAll(`${origin}/`, `${embedPath}/`);
  out = out.replaceAll(`${origin}"`, `${embedPath}"`);
  out = out.replaceAll(`${origin}'`, `${embedPath}'`);
  out = out.replaceAll(`//${host}/`, `${embedPath}/`);
  out = out.replaceAll(`//${host}"`, `${embedPath}"`);
  out = out.replaceAll(`//${host}'`, `${embedPath}'`);

  const baseHref = `${embedPath}/`;
  if (!/<base\s/i.test(out)) {
    out = out.replace(/<head(\s[^>]*)?>/i, `<head$1><base href="${baseHref}">`);
  }

  return out;
}

export type VendorShopProxyInput = {
  slug: string;
  shopUrl: string;
};

export async function proxyVendorShopRequest(
  vendor: VendorShopProxyInput,
  request: Request,
  pathSegments: string[],
): Promise<Response> {
  const upstream = upstreamShopOrigin(vendor.shopUrl);
  const embedPath = embedBasePath(vendor.slug);
  const requestUrl = new URL(request.url);

  const upstreamPath =
    pathSegments.length > 0 ? `/${pathSegments.join("/")}` : upstream.pathname || "/";
  const target = new URL(`${upstreamPath}${requestUrl.search}`, upstream.origin);

  const upstreamResponse = await fetch(target.toString(), {
    method: request.method === "HEAD" ? "HEAD" : "GET",
    headers: {
      Accept: request.headers.get("accept") ?? "*/*",
      "Accept-Language": request.headers.get("accept-language") ?? "en-US,en;q=0.9",
      "User-Agent":
        request.headers.get("user-agent") ??
        "Mozilla/5.0 (compatible; ZeroLimitsProShop/1.0)",
    },
    redirect: "manual",
    cache: "no-store",
  });

  if (upstreamResponse.status >= 300 && upstreamResponse.status < 400) {
    const location = upstreamResponse.headers.get("location");
    if (location) {
      const rewritten = rewriteUpstreamLocation(location, upstream, embedPath);
      return Response.redirect(new URL(rewritten, requestUrl.origin), upstreamResponse.status);
    }
  }

  const headers = stripHopByHopHeaders(upstreamResponse.headers);
  const contentType = upstreamResponse.headers.get("content-type") ?? "";

  if (request.method === "HEAD") {
    return new Response(null, { status: upstreamResponse.status, headers });
  }

  if (contentType.includes("text/html")) {
    const html = await upstreamResponse.text();
    const body = rewriteShopHtml(html, upstream, embedPath);
    headers.set("content-type", contentType);
    return new Response(body, { status: upstreamResponse.status, headers });
  }

  return new Response(upstreamResponse.body, {
    status: upstreamResponse.status,
    headers,
  });
}
