import { PRO_SHOP_COPY } from "@/config/pro-shop";

export default function ProShopDisclaimer() {
  return (
    <div className="border-t border-zinc-200 bg-white py-10">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <p className="text-sm leading-relaxed text-zinc-500">{PRO_SHOP_COPY.disclaimer}</p>
      </div>
    </div>
  );
}
