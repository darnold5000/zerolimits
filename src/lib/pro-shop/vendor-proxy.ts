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
  target.search = search || "";

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

/** Affiliate query params apply only at hosted checkout — not on embed browse/cart (auto-discount). */
export function shopReferralContext(
  shopUrl: string,
  referralUrl?: string | null,
): {
  browseOrigin: URL;
  referralParams: URLSearchParams;
} {
  const configured = upstreamShopOrigin(shopUrl);
  const browseOrigin = new URL(configured.origin);
  const referralSource = referralUrl?.trim() || shopUrl;
  try {
    return {
      browseOrigin,
      referralParams: new URL(referralSource).searchParams,
    };
  } catch {
    return {
      browseOrigin,
      referralParams: new URLSearchParams(configured.search),
    };
  }
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

  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><title>Checkout</title><script>(function(){var dest="${safeUrl}";var nav=window.top===window.self?window.location:window.top.location;nav.replace(dest);})();</script></head><body style="margin:0;background:#111;color:#fff;font-family:system-ui,sans-serif"><p style="padding:1.5rem">Redirecting to secure checkout…</p><p style="padding:0 1.5rem"><a href="${safeHref}" style="color:#6eb6ff">Continue to checkout</a></p></body></html>`;
}

const EMBED_IFRAME_CHECKOUT_SCRIPT = `<script>(function(){function go(url){var nav=window.top===window.self?window.location:window.top.location;try{nav.replace(url);}catch(e){nav.href=url;}}document.addEventListener("click",function(ev){var a=ev.target&&ev.target.closest?ev.target.closest("a[href]"):null;if(!a)return;var href=a.getAttribute("href")||"";if(!/checkout/i.test(href))return;ev.preventDefault();ev.stopPropagation();go(a.href);},true);if(/checkout/i.test(window.location.pathname)){go(window.location.href);}})();</script>`;

/** Theme AJAX (InstantClick) blocks remove/qty updates in the embed; use full cart form navigation. */
const EMBED_CART_FALLBACK_SCRIPT = `<script>(function(){document.addEventListener("click",function(ev){var link=ev.target&&ev.target.closest?ev.target.closest("a[data-cartitem-remove],a.cart-item--remove-link"):null;if(!link||!link.href)return;ev.preventDefault();ev.stopImmediatePropagation();window.location.href=link.href;},true);document.addEventListener("change",function(ev){var input=ev.target;if(!input||!input.closest)return;var form=input.closest('form[action*="/cart"]');if(!form||input.name!=="updates[]")return;ev.preventDefault();ev.stopImmediatePropagation();form.submit();},true);})();</script>`;

const SHOP_EMBED_PATH_PREFIX =
  "(?:cart|account|checkout|checkouts|collections|products|pages|search|blogs)";

export function rewriteEmbedShopPathsInText(text: string, embedPath: string): string {
  const base = normalizedEmbedBase(embedPath);
  const prefixPath = (path: string) => {
    if (path === base || path.startsWith(`${base}/`)) return path;
    return `${base}${path}`;
  };

  let out = text.replace(
    new RegExp(`"(/${SHOP_EMBED_PATH_PREFIX}[^"]*)"`, "g"),
    (_match, path: string) => `"${prefixPath(path)}"`,
  );

  out = out.replace(
    new RegExp(`"\\\\/(${SHOP_EMBED_PATH_PREFIX}[^"]*)"`, "g"),
    (_match, path: string) => {
      const prefixed = prefixPath(`/${path}`);
      return `"\\/${prefixed.slice(1).replace(/\//g, "\\/")}"`;
    },
  );

  return out;
}

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

function isShopCheckoutPath(pathSegments: string[]): boolean {
  const root = pathSegments[0]?.toLowerCase() ?? "";
  return root === "checkout" || root === "checkouts";
}

function ensureShopReferralParams(
  target: URL,
  referralParams: URLSearchParams,
): URL {
  const next = new URL(target.toString());
  referralParams.forEach((value, key) => {
    if (!next.searchParams.has(key)) {
      next.searchParams.set(key, value);
    }
  });
  return next;
}

function externalShopCheckoutUrl(
  browseOrigin: URL,
  pathSegments: string[],
  search: string,
  referralParams: URLSearchParams,
): string {
  return ensureShopReferralParams(
    resolveProxyTarget(browseOrigin, pathSegments, search),
    referralParams,
  ).toString();
}

function finalizeHandoffCheckoutUrl(
  checkoutUrl: string,
  referralParams: URLSearchParams,
): string {
  return ensureShopReferralParams(new URL(checkoutUrl), referralParams).toString();
}

function parseCookieJar(cookieHeader: string | null): Map<string, string> {
  const jar = new Map<string, string>();
  if (!cookieHeader) return jar;
  for (const part of cookieHeader.split(";")) {
    const trimmed = part.trim();
    if (!trimmed) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    jar.set(trimmed.slice(0, eq), trimmed.slice(eq + 1));
  }
  return jar;
}

function cookieHeaderFromJar(jar: Map<string, string>): string | null {
  if (jar.size === 0) return null;
  return [...jar.entries()].map(([name, value]) => `${name}=${value}`).join("; ");
}

function absorbShopifySetCookies(jar: Map<string, string>, response: Headers): void {
  for (const raw of upstreamSetCookies(response)) {
    const nameValue = raw.split(";")[0]?.trim();
    if (!nameValue) continue;
    const eq = nameValue.indexOf("=");
    if (eq === -1) continue;
    const name = nameValue.slice(0, eq);
    const value = nameValue.slice(eq + 1);
    if (!value) jar.delete(name);
    else jar.set(name, value);
  }
}

function buildHandoffFetchHeaders(
  request: Request,
  jar: Map<string, string>,
): Headers {
  const headers = buildUpstreamRequestHeaders(request);
  const cookie = cookieHeaderFromJar(jar);
  if (cookie) headers.set("cookie", cookie);
  return headers;
}

async function followShopifyHandoff(
  request: Request,
  browseOrigin: URL,
  referralParams: URLSearchParams,
  startUrl: URL,
  method: "GET" | "HEAD" = "GET",
): Promise<{ url: string; headers: Headers } | null> {
  const jar = parseCookieJar(request.headers.get("cookie"));
  let current = startUrl;
  let lastHeaders = new Headers();

  for (let hop = 0; hop <= MAX_PROXY_REDIRECTS; hop += 1) {
    const upstream = await fetch(current.toString(), {
      method,
      headers: buildHandoffFetchHeaders(request, jar),
      redirect: "manual",
      cache: "no-store",
    });
    absorbShopifySetCookies(jar, upstream.headers);
    lastHeaders = upstream.headers;

    if (upstream.status >= 300 && upstream.status < 400) {
      const location = upstream.headers.get("location");
      const next = location ? resolveRedirectUrl(location, current) : null;
      if (!next || !isAllowedProxyUrl(next, browseOrigin)) return null;
      if (next.pathname.startsWith("/checkouts")) {
        return {
          url: finalizeHandoffCheckoutUrl(next.toString(), referralParams),
          headers: upstream.headers,
        };
      }
      current = next;
      continue;
    }

    if (current.pathname.startsWith("/checkouts")) {
      return {
        url: finalizeHandoffCheckoutUrl(current.toString(), referralParams),
        headers: lastHeaders,
      };
    }

    break;
  }

  return null;
}

/** Shopify checkout pages cannot be proxied (403/Forbidden HTML). Resolve cart checkout and send shoppers to the live shop. */
async function proxyCheckoutHandoff(
  request: Request,
  pathSegments: string[],
  browseOrigin: URL,
  referralParams: URLSearchParams,
  embedPath: string,
  requestSearch: string,
): Promise<Response> {
  const method = request.method === "HEAD" ? "HEAD" : "GET";

  const start = resolveProxyTarget(browseOrigin, pathSegments, requestSearch);
  const resolved = await followShopifyHandoff(
    request,
    browseOrigin,
    referralParams,
    start,
    method,
  );

  return externalCheckoutBreakoutResponse(
    resolved?.url ??
      externalShopCheckoutUrl(
        browseOrigin,
        pathSegments,
        requestSearch,
        referralParams,
      ),
    resolved?.headers ?? new Headers(),
    embedPath,
  );
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

  if (!out.includes("stopImmediatePropagation();window.location.href=link.href")) {
    out = out.replace(/<\/head>/i, `${EMBED_CART_FALLBACK_SCRIPT}</head>`);
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
  out = rewriteShopifyClientRoutes(out, embedPath);
  out = rewriteEmbedShopPathsInText(out, embedPath);

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
  referralUrl?: string | null;
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
  const { browseOrigin, referralParams } = shopReferralContext(
    vendor.shopUrl,
    vendor.referralUrl,
  );
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

  if (isShopCheckoutPath(pathSegments) && method !== "POST") {
    return proxyCheckoutHandoff(
      request,
      pathSegments,
      browseOrigin,
      referralParams,
      embedPath,
      requestUrl.search,
    );
  }

  let target = resolveProxyTarget(browseOrigin, pathSegments, requestUrl.search);
  let upstreamResponse: Response | null = null;
  let rewriteOrigin = browseOrigin;

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

    if (!isAllowedProxyUrl(next, browseOrigin)) {
      return externalCheckoutBreakoutResponse(
        ensureShopReferralParams(next, referralParams).toString(),
        upstreamResponse.headers,
        embedPath,
      );
    }

    if (next.pathname.startsWith("/checkouts")) {
      return externalCheckoutBreakoutResponse(
        finalizeHandoffCheckoutUrl(next.toString(), referralParams),
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
    if (external && !isAllowedProxyUrl(external, browseOrigin)) {
      return externalCheckoutBreakoutResponse(
        ensureShopReferralParams(external, referralParams).toString(),
        upstreamResponse.headers,
        embedPath,
      );
    }
  }

  if (location) {
    headers.set(
      "location",
      rewriteProxyLocationHeader(location, browseOrigin, embedPath),
    );
  }

  if (method === "HEAD") {
    return new Response(null, { status: upstreamResponse.status, headers });
  }

  if (contentType.includes("text/html")) {
    const html = await upstreamResponse.text();
    const body = rewriteShopHtml(html, rewriteOrigin, embedPath);
    headers.set("content-type", contentType);

    if (
      pathSegments[0] === "cart" &&
      pathSegments[1] === "change" &&
      method === "GET" &&
      upstreamResponse.status >= 200 &&
      upstreamResponse.status < 400
    ) {
      headers.set("location", `${normalizedEmbedBase(embedPath)}/cart`);
      return new Response(null, { status: 302, headers });
    }

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
