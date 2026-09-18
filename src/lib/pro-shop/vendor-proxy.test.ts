import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  hostnameWithoutWww,
  isAllowedProxyUrl,
  resolveProxyTarget,
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

  it("rejects protocol-relative and parent-path segments", () => {
    assert.throws(() => resolveProxyTarget(shop, ["..", "secret"], ""));
    assert.throws(() => resolveProxyTarget(shop, ["//evil.example"], ""));
    assert.throws(() => resolveProxyTarget(shop, ["https://evil.example"], ""));
  });
});
