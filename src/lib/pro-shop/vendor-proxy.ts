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

const MAX_PROXY_REDIRECTS = 5;

const PROXY_METHODS = new Set([
  "GET",
  "HEAD",
  "POST",
  "PUT",
  "PATCH",
  "DELETE",
]);

const FORWARD_REQUEST_HEADERS = [
  "accept",
  "accept-language",
  "content-type",
  "cookie",
  "origin",
  "referer",
  "user-agent",
  "x-requested-with",
] as const;

function stripHopByHopHeaders(headers: Headers): Headers {
  const next = new Headers();
  headers.forEach((value, key) => {
    const lower = key.toLowerCase();
    if (lower === "set-cookie") return;
    if (!STRIP_RESPONSE_HEADERS.has(lower)) {
      next.set(key, value);
    }
  });
  return next;
}

function upstreamSetCookies(headers: Headers): string[] {
  if (typeof headers.getSetCookie === "function") {
    return headers.getSetCookie();
  }
  const combined = headers.get("set-cookie");
  return combined ? [combined] : [];
}

/** Shopify sets Domain=shop; strip and scope Path to the embed so the browser keeps cart state. */
export function rewriteProxySetCookieHeader(
  setCookie: string,
  embedPath: string,
): string {
  const cookiePath = `${normalizedEmbedBase(embedPath)}/`;
  const segments = setCookie.split(";").map((part) => part.trim());
  const nameValue = segments[0];
  if (!nameValue) return setCookie;

  const eqIndex = nameValue.indexOf("=");
  let cookieName = eqIndex >= 0 ? nameValue.slice(0, eqIndex) : nameValue;
  const cookieValue = eqIndex >= 0 ? nameValue.slice(eqIndex) : "";

  if (cookieName.startsWith("__Host-")) {
    cookieName = cookieName.slice("__Host-".length);
  } else if (cookieName.startsWith("__Secure-")) {
    cookieName = cookieName.slice("__Secure-".length);
  }

  const attrs: string[] = [];
  let hasPath = false;
  let hasSecure = false;

  for (let i = 1; i < segments.length; i += 1) {
    const part = segments[i];
    const lower = part.toLowerCase();
    if (lower.startsWith("domain=")) continue;
    if (lower.startsWith("path=")) {
      attrs.push(`Path=${cookiePath}`);
      hasPath = true;
      continue;
    }
    if (lower === "secure") hasSecure = true;
    attrs.push(part);
  }

  if (!hasPath) attrs.push(`Path=${cookiePath}`);
  if (!hasSecure) attrs.push("Secure");

  return [`${cookieName}${cookieValue}`, ...attrs].join("; ");
}

function applyProxySetCookies(headers: Headers, upstream: Headers, embedPath: string): void {
  for (const cookie of upstreamSetCookies(upstream)) {
    headers.append("set-cookie", rewriteProxySetCookieHeader(cookie, embedPath));
  }
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
  target.search = search || shopOrigin.search;

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

function normalizedEmbedBase(embedPath: string): string {
  return embedPath.endsWith("/") ? embedPath.slice(0, -1) : embedPath;
}

function escapeJsString(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/'/g, "\\'")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029")
    .replace(/</g, "\\u003c");
}

/** Shopify checkout cannot run inside an iframe; send the top window to hosted checkout. */
export function externalCheckoutBreakoutHtml(checkoutUrl: string): string {
  const safeUrl = escapeJsString(checkoutUrl);
  const safeHref = checkoutUrl
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;");

  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><title>Checkout</title><script>window.top.location.replace("${safeUrl}");</script></head><body style="margin:0;background:#111;color:#fff;font-family:system-ui,sans-serif"><p style="padding:1.5rem">Redirecting to secure checkout…</p><p style="padding:0 1.5rem"><a href="${safeHref}" target="_top" style="color:#6eb6ff">Continue to checkout</a></p></body></html>`;
}

const EMBED_IFRAME_CHECKOUT_SCRIPT = `<script>(function(){if(window.top===window.self)return;function go(url){try{window.top.location.replace(url);}catch(e){window.top.location.href=url;}}document.addEventListener("click",function(ev){var a=ev.target&&ev.target.closest?ev.target.closest("a[href]"):null;if(!a)return;var href=a.getAttribute("href")||"";if(!/checkout/i.test(href))return;ev.preventDefault();ev.stopPropagation();go(a.href);},true);if(/\\/checkout/i.test(window.location.pathname)){go(window.location.href);}})();</script>`;

function responseWithProxyCookies(
  upstream: Headers,
  embedPath: string,
): Headers {
  const headers = stripHopByHopHeaders(upstream);
  applyProxySetCookies(headers, upstream, embedPath);
  headers.set("cache-control", "no-store");
  return headers;
}

function externalCheckoutBreakoutResponse(
  checkoutUrl: string,
  upstream: Headers,
  embedPath: string,
): Response {
  const headers = responseWithProxyCookies(upstream, embedPath);
  headers.set("content-type", "text/html; charset=utf-8");
  return new Response(externalCheckoutBreakoutHtml(checkoutUrl), {
    status: 200,
    headers,
  });
}

function resolveRedirectUrl(location: string, base: URL): URL | null {
  try {
    return new URL(location, base);
  } catch {
    return null;
  }
}

/** Keep cart/checkout redirects inside the embed proxy path. */
export function rewriteProxyLocationHeader(
  location: string,
  shopOrigin: URL,
  embedPath: string,
): string {
  const base = normalizedEmbedBase(embedPath);

  try {
    const resolved = new URL(location, shopOrigin.origin);
    if (!isAllowedProxyUrl(resolved, shopOrigin)) {
      return location;
    }
    return `${base}${resolved.pathname}${resolved.search}${resolved.hash}`;
  } catch {
    if (location.startsWith("/") && !location.startsWith("//")) {
      if (location === base || location.startsWith(`${base}/`)) {
        return location;
      }
      return `${base}${location}`;
    }
    return location;
  }
}

function buildUpstreamRequestHeaders(request: Request): Headers {
  const headers = new Headers();
  for (const name of FORWARD_REQUEST_HEADERS) {
    const value = request.headers.get(name);
    if (value) headers.set(name, value);
  }
  if (!headers.has("accept")) {
    headers.set("accept", "*/*");
  }
  if (!headers.has("user-agent")) {
    headers.set("user-agent", "Mozilla/5.0 (compatible; ZeroLimitsProShop/1.0)");
  }
  return headers;
}

const ROOT_RELATIVE_ATTR_RE =
  /\b(href|action|src)=(["'])\/(?!\/)([^"']*)\2/gi;

/** Shopify uses root-relative hrefs; <base> does not apply to paths starting with /. */
export function rewriteRootRelativeAttributeUrls(
  html: string,
  embedPath: string,
): string {
  const base = normalizedEmbedBase(embedPath);
  return html.replace(
    ROOT_RELATIVE_ATTR_RE,
    (match, attr: string, quote: string, rest: string) => {
      const path = `/${rest}`;
      if (path === base || path.startsWith(`${base}/`)) {
        return match;
      }
      return `${attr}=${quote}${base}${path}${quote}`;
    },
  );
}

export function rewriteShopifyClientRoutes(html: string, embedPath: string): string {
  const root = embedPath.endsWith("/") ? embedPath : `${embedPath}/`;
  const base = normalizedEmbedBase(embedPath);
  let out = html.replace(
    /Shopify\.routes\.root\s*=\s*["']\/["']\s*;/g,
    `Shopify.routes.root = "${root}";`,
  );

  out = out.replace(
    /:\s*"(\/(?:account|cart|collections|products|pages|search|blogs)[^"]*)"/g,
    (match, path: string) => {
      if (path === base || path.startsWith(`${base}/`)) return match;
      return `: "${base}${path}"`;
    },
  );

  return out;
}

export function rewriteShopHtml(html: string, upstream: URL, embedPath: string): string {
  const host = upstream.host;
  const origin = upstream.origin;
  let out = html;

  out = out.replaceAll(`${origin}/`, `${embedPath}/`);
  out = out.replaceAll(`${origin}"`, `${embedPath}"`);
  out = out.replaceAll(`${origin}'`, `${embedPath}'`);
  out = out.replaceAll(`//${host}/`, `${embedPath}/`);
  out = out.replaceAll(`//${host}"`, `${embedPath}"`);
  out = out.replaceAll(`//${host}'`, `${embedPath}'`);

  out = rewriteRootRelativeAttributeUrls(out, embedPath);
  out = rewriteShopifyClientRoutes(out, embedPath);

  const baseHref = `${embedPath}/`;
  if (!/<base\s/i.test(out)) {
    out = out.replace(/<head(\s[^>]*)?>/i, `<head$1><base href="${baseHref}">`);
  }

  if (!out.includes("window.top.location.replace")) {
    out = out.replace(/<\/head>/i, `${EMBED_IFRAME_CHECKOUT_SCRIPT}</head>`);
  }

  return out;
}

/** Cart drawer / section JSON includes HTML snippets with checkout links. */
export function rewriteShopifyAjaxPayload(
  body: string,
  upstream: URL,
  embedPath: string,
): string {
  const host = upstream.host;
  const origin = upstream.origin;
  let out = body;

  out = out.replaceAll(`${origin}/`, `${embedPath}/`);
  out = out.replaceAll(`${origin}"`, `${embedPath}"`);
  out = out.replaceAll(`${origin}'`, `${embedPath}'`);
  out = out.replaceAll(`//${host}/`, `${embedPath}/`);
  out = rewriteRootRelativeAttributeUrls(out, embedPath);

  out = out.replace(
    /href=(["'])([^"']*checkout[^"']*)\1/gi,
    (match, quote: string, href: string) => {
      if (/target\s*=/i.test(match)) return match;
      const path = href.startsWith("/") ? `${normalizedEmbedBase(embedPath)}${href}` : href;
      return `href=${quote}${path}${quote} target=${quote}_top${quote}`;
    },
  );

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
  const method = request.method.toUpperCase();
  if (!PROXY_METHODS.has(method)) {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "content-type": "application/json" },
    });
  }

  const requestBody =
    method === "GET" || method === "HEAD" ? undefined : await request.arrayBuffer();

  let target = resolveProxyTarget(shopOrigin, pathSegments, requestUrl.search);
  let upstreamResponse: Response | null = null;
  let rewriteOrigin = shopOrigin;

  for (let hop = 0; hop <= MAX_PROXY_REDIRECTS; hop += 1) {
    upstreamResponse = await fetch(target.toString(), {
      method,
      headers: buildUpstreamRequestHeaders(request),
      body: requestBody,
      redirect: "manual",
      cache: "no-store",
    });

    if (upstreamResponse.status < 300 || upstreamResponse.status >= 400) {
      rewriteOrigin = target;
      break;
    }

    const location = upstreamResponse.headers.get("location");
    if (!location) return proxyUnavailable();

    const next = resolveRedirectUrl(location, target);
    if (!next) return proxyUnavailable();

    if (!isAllowedProxyUrl(next, shopOrigin)) {
      return externalCheckoutBreakoutResponse(
        next.toString(),
        upstreamResponse.headers,
        embedPath,
      );
    }

    target = next;
    rewriteOrigin = next;
    if (hop === MAX_PROXY_REDIRECTS) return proxyUnavailable();
  }

  if (!upstreamResponse) return proxyUnavailable();

  const headers = stripHopByHopHeaders(upstreamResponse.headers);
  applyProxySetCookies(headers, upstreamResponse.headers, embedPath);
  const contentType = upstreamResponse.headers.get("content-type") ?? "";
  const location = upstreamResponse.headers.get("location");

  if (
    location &&
    upstreamResponse.status >= 300 &&
    upstreamResponse.status < 400
  ) {
    const external = resolveRedirectUrl(location, rewriteOrigin);
    if (external && !isAllowedProxyUrl(external, shopOrigin)) {
      return externalCheckoutBreakoutResponse(
        external.toString(),
        upstreamResponse.headers,
        embedPath,
      );
    }
  }

  if (location) {
    headers.set(
      "location",
      rewriteProxyLocationHeader(location, shopOrigin, embedPath),
    );
  }

  if (method === "HEAD") {
    return new Response(null, { status: upstreamResponse.status, headers });
  }

  if (contentType.includes("text/html")) {
    const html = await upstreamResponse.text();
    const body = rewriteShopHtml(html, rewriteOrigin, embedPath);
    headers.set("content-type", contentType);
    return new Response(body, { status: upstreamResponse.status, headers });
  }

  if (
    contentType.includes("application/json") ||
    contentType.includes("javascript")
  ) {
    const text = await upstreamResponse.text();
    const body = rewriteShopifyAjaxPayload(text, rewriteOrigin, embedPath);
    headers.set("content-type", contentType);
    return new Response(body, { status: upstreamResponse.status, headers });
  }

  return new Response(upstreamResponse.body, {
    status: upstreamResponse.status,
    headers,
  });
}
