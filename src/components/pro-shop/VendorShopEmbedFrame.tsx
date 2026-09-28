"use client";

import { useEffect, useRef } from "react";

type VendorShopEmbedFrameProps = {
  src: string;
  title: string;
  className?: string;
};

/** Same-origin embed: send checkout navigation to the top window for Shopify handoff. */
export default function VendorShopEmbedFrame({
  src,
  title,
  className,
}: VendorShopEmbedFrameProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const promoteCheckoutToTopWindow = () => {
      try {
        const frameWindow = iframe.contentWindow;
        if (!frameWindow) return;
        const path = frameWindow.location.pathname;
        if (!/checkout/i.test(path)) return;
        const target = frameWindow.location.href;
        if (window.location.href !== target) {
          window.location.assign(target);
        }
      } catch {
        // Cross-origin navigation (hosted checkout) — nothing to read.
      }
    };

    iframe.addEventListener("load", promoteCheckoutToTopWindow);
    return () => iframe.removeEventListener("load", promoteCheckoutToTopWindow);
  }, [src]);

  return (
    <iframe
      ref={iframeRef}
      src={src}
      title={title}
      className={className}
      allow="fullscreen"
      allowFullScreen
      loading="eager"
      referrerPolicy="strict-origin-when-cross-origin"
    />
  );
}
