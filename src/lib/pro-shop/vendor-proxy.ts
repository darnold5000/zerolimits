const STRIP_RESPONSE_HEADERS = new Set([
  "content-encoding",
  "content-length",
  "content-security-policy",
  "content-security-policy-report-only",
  "cross-origin-embedder-policy",
  "cross-origin-opener-policy",
  "cross-origin-resource-policy",
  "permissions-policy",
  "set-cookie",
  "transfer-encoding",
  "x-frame-options",
]);

const MAX_PROXY_REDIRECTS = 5;

function stripHopByHopHeaders(headers: Headers): Headers {
  const next = new Headers();
  headers.forEach((value, key) => {
    if (!STRIP_RESPONSE_HEADERS.has(key.toLowerCase())) {
      next.set(key, value);
    }
  });
  return next;
}

export function hostnameWithoutWww(host: string): string {
  return host.replace(/^www\./i, "").toLowerCase();
}

export function isAllowedProxyUrl(candidate: URL, shopOrigin: URL): boolean {
  if (candidate.protocol !== "https:" && candidate.protocol !== "http:") {
    return false;
  }
  return hostnameWithoutWww(candidate.host) === hostnameWithoutWww(shopOrigin.host);
}

export function resolveProxyTarget(
  shopOrigin: URL,
  pathSegments: string[],
  search: string,
): URL {
  const raw = pathSegments.filter((segment) => segment.length > 0);
  if (
    raw.some(
      (segment) =>
        segment === "." ||
        segment === ".." ||
        segment.includes("\\") ||
        segment.includes("://") ||
        segment.startsWith("//"),
    )
  ) {
    throw new Error("Invalid proxy path");
  }

  const target = new URL(shopOrigin.origin);
  target.pathname =
    raw.length > 0 ? `/${raw.join("/")}` : shopOrigin.pathname || "/";
  target.search = search;

  if (!isAllowedProxyUrl(target, shopOrigin)) {
    throw new Error("Proxy target not allowed");
  }
  return target;
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

function proxyUnavailable(): Response {
  return new Response(JSON.stringify({ error: "Embed unavailable" }), {
    status: 502,
    headers: { "content-type": "application/json" },
  });
}

export async function proxyVendorShopRequest(
  vendor: VendorShopProxyInput,
  request: Request,
  pathSegments: string[],
): Promise<Response> {
  const shopOrigin = upstreamShopOrigin(vendor.shopUrl);
  const embedPath = embedBasePath(vendor.slug);
  const requestUrl = new URL(request.url);
  const method = request.method === "HEAD" ? "HEAD" : "GET";

  let target = resolveProxyTarget(shopOrigin, pathSegments, requestUrl.search);
  let upstreamResponse: Response | null = null;
  let rewriteOrigin = shopOrigin;

  for (let hop = 0; hop <= MAX_PROXY_REDIRECTS; hop += 1) {
    upstreamResponse = await fetch(target.toString(), {
      method,
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

    if (upstreamResponse.status < 300 || upstreamResponse.status >= 400) {
      rewriteOrigin = target;
      break;
    }

    const location = upstreamResponse.headers.get("location");
    if (!location) return proxyUnavailable();

    let next: URL;
    try {
      next = new URL(location, target);
    } catch {
      return proxyUnavailable();
    }

    if (!isAllowedProxyUrl(next, shopOrigin)) {
      return proxyUnavailable();
    }

    target = next;
    rewriteOrigin = next;
    if (hop === MAX_PROXY_REDIRECTS) return proxyUnavailable();
  }

  if (!upstreamResponse) return proxyUnavailable();

  const headers = stripHopByHopHeaders(upstreamResponse.headers);
  const contentType = upstreamResponse.headers.get("content-type") ?? "";

  if (method === "HEAD") {
    return new Response(null, { status: upstreamResponse.status, headers });
  }

  if (contentType.includes("text/html")) {
    const html = await upstreamResponse.text();
    const body = rewriteShopHtml(html, rewriteOrigin, embedPath);
    headers.set("content-type", contentType);
    return new Response(body, { status: upstreamResponse.status, headers });
  }

  return new Response(upstreamResponse.body, {
    status: upstreamResponse.status,
    headers,
  });
}
