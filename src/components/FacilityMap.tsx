import { SITE } from "@/lib/content";

function getMapEmbedUrl(): string {
  const custom = process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL;
  if (custom && custom.trim() !== "") return custom;

  const query = encodeURIComponent(SITE.address.mapQuery);
  return `https://maps.google.com/maps?q=${query}&t=&z=16&ie=UTF8&iwloc=&output=embed`;
}

export default function FacilityMap() {
  return (
    <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
      <iframe
        title="Zero Limits Baseball at Core Fitness Club, Mooresville"
        src={getMapEmbedUrl()}
        className="h-full min-h-[28rem] w-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}
