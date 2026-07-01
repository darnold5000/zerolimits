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
        className="h-72 w-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
      <div className="border-t border-zinc-100 px-5 py-4">
        <p className="text-sm font-semibold text-zinc-900">Location</p>
        <p className="mt-1 font-medium text-zinc-800">{SITE.address.venue}</p>
        <p className="mt-1 text-sm text-zinc-600">
          {SITE.address.street}
          <br />
          {SITE.address.city}, {SITE.address.state} {SITE.address.zip}
        </p>
        <ul className="mt-4 space-y-3 border-t border-zinc-100 pt-4">
          {SITE.facilityLocations.map((location) => (
            <li key={location.name} className="text-sm text-zinc-600">
              <span className="font-semibold text-zinc-900">{location.name}</span>
              <span className="mt-0.5 block">{location.description}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
