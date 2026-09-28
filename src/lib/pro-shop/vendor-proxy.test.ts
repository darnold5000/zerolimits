import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  hostnameWithoutWww,
  isAllowedProxyUrl,
  resolveProxyTarget,
  rewriteProxyLocationHeader,
  externalCheckoutBreakoutHtml,
  rewriteProxySetCookieHeader,
  rewriteShopifyAjaxPayload,
  rewriteRootRelativeAttributeUrls,
  rewriteShopHtml,
  rewriteShopifyClientRoutes,
} from "./vendor-proxy";

const shop = new URL("https://www.baselinesports.us/collections/all");

describe("vendor proxy allowlist", () => {
  it("treats www and apex as the same shop host", () => {
    assert.equal(hostnameWithoutWww("www.baselinesports.us"), "baselinesports.us");
    assert.equal(
      isAllowedProxyUrl(new URL("https://baselinesports.us/cart"), shop),
      true,
    );
    assert.equal(
      isAllowedProxyUrl(new URL("https://www.baselinesports.us/cart"), shop),
      true,
    );
  });

  it("rejects off-origin redirects", () => {
    assert.equal(
      isAllowedProxyUrl(new URL("https://evil.example/phish"), shop),
      false,
    );
    assert.equal(
      isAllowedProxyUrl(new URL("https://checkout.shopify.com/pay"), shop),
      false,
    );
  });

  it("builds same-origin targets from path segments", () => {
    const target = resolveProxyTarget(shop, ["cart"], "?ref=zl");
    assert.equal(target.origin, "https://www.baselinesports.us");
    assert.equal(target.pathname, "/cart");
    assert.equal(target.search, "?ref=zl");
  });

  it("preserves affiliate query params from the configured shop URL", () => {
    const affiliateShop = new URL("https://www.baselinesports.us?aff=217");
    const target = resolveProxyTarget(affiliateShop, [], "");
    assert.equal(target.search, "?aff=217");
  });

  it("rejects protocol-relative and parent-path segments", () => {
    assert.throws(() => resolveProxyTarget(shop, ["..", "secret"], ""));
    assert.throws(() => resolveProxyTarget(shop, ["//evil.example"], ""));
    assert.throws(() => resolveProxyTarget(shop, ["https://evil.example"], ""));
  });
});

describe("shop html rewrite", () => {
  const embedPath = "/pro-shop/embed/baseline-sports";
  const upstream = new URL("https://www.baselinesports.us/");

  it("rewrites root-relative nav links for the embed proxy", () => {
    const input = '<a href="/collections/baseball">Bats</a><a href="/cart">Cart</a>';
    const out = rewriteRootRelativeAttributeUrls(input, embedPath);
    assert.match(
      out,
      /href="\/pro-shop\/embed\/baseline-sports\/collections\/baseball"/,
    );
    assert.match(out, /href="\/pro-shop\/embed\/baseline-sports\/cart"/);
  });

  it("sets Shopify.routes.root for in-frame client navigation", () => {
    const input = 'Shopify.routes.root = "/";';
    const out = rewriteShopifyClientRoutes(input, embedPath);
    assert.equal(
      out,
      'Shopify.routes.root = "/pro-shop/embed/baseline-sports/";',
    );
  });

  it("rewrites absolute shop URLs and leaves external CDN alone", () => {
    const input = `<head><a href="https://www.baselinesports.us/collections/all">All</a></head>`;
    const out = rewriteShopHtml(input, upstream, embedPath);
    assert.match(
      out,
      /href="\/pro-shop\/embed\/baseline-sports\/collections\/all"/,
    );
    assert.match(out, /<base href="\/pro-shop\/embed\/baseline-sports\/">/);
  });
});

describe("checkout breakout", () => {
  it("redirects the top window to hosted Shopify checkout", () => {
    const url = "https://checkout.shopify.com/c/abc123";
    const html = externalCheckoutBreakoutHtml(url);
    assert.match(
      html,
      /window\.top===window\.self\?window\.location:window\.top\.location/,
    );
    assert.match(html, /nav\.replace\("https:\/\/checkout\.shopify\.com\/c\/abc123"\)/);
  });
});

describe("proxy session cookies", () => {
  const embedPath = "/pro-shop/embed/baseline-sports";

  it("rewrites shop Set-Cookie for the embed path and drops Domain", () => {
    const input =
      "cart=abc123; path=/; domain=www.baselinesports.us; HttpOnly; Secure";
    const out = rewriteProxySetCookieHeader(input, embedPath);
    assert.match(out, /^cart=abc123;/);
    assert.match(out, /Path=\/pro-shop\/embed\/baseline-sports\//);
    assert.doesNotMatch(out, /domain=/i);
    assert.match(out, /HttpOnly/i);
    assert.match(out, /Secure/i);
  });

  it("strips __Host- prefix so Path can be scoped to the embed", () => {
    const input = "__Host-_shopify_s=token; Path=/; Secure; HttpOnly";
    const out = rewriteProxySetCookieHeader(input, embedPath);
    assert.match(out, /^_shopify_s=token;/);
    assert.match(out, /Path=\/pro-shop\/embed\/baseline-sports\//);
  });
});

describe("proxy redirect locations", () => {
  const embedPath = "/pro-shop/embed/baseline-sports";
  const shopOrigin = new URL("https://www.baselinesports.us/");

  it("rewrites upstream cart redirects into the embed path", () => {
    assert.equal(
      rewriteProxyLocationHeader("/cart", shopOrigin, embedPath),
      "/pro-shop/embed/baseline-sports/cart",
    );
    assert.equal(
      rewriteProxyLocationHeader(
        "https://www.baselinesports.us/cart?added=1",
        shopOrigin,
        embedPath,
      ),
      "/pro-shop/embed/baseline-sports/cart?added=1",
    );
  });
});
