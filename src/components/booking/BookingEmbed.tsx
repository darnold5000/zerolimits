"use client";

import { useEffect, useState } from "react";

type BookingEmbedProps = {
  src: string;
  title: string;
};

export default function BookingEmbed({ src, title }: BookingEmbedProps) {
  const [loaded, setLoaded] = useState(false);
  const [frameKey, setFrameKey] = useState(0);

  useEffect(() => {
    setLoaded(false);
    setFrameKey((key) => key + 1);
  }, [src]);

  return (
    <div className="relative min-h-[min(72vh,900px)] w-full overflow-hidden rounded-b-2xl bg-white">
      {!loaded && (
        <div
          className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-white"
          aria-hidden={loaded}
        >
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-zinc-200 border-t-red-600" />
          <p className="text-sm font-medium text-zinc-500">Loading your booking portal…</p>
        </div>
      )}

      <iframe
        key={frameKey}
        src={src}
        title={title}
        className="min-h-[min(72vh,900px)] w-full border-0 bg-white"
        loading="eager"
        allow="payment *; geolocation *"
        referrerPolicy="strict-origin-when-cross-origin"
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
