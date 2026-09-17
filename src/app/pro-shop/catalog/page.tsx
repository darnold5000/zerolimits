import { redirect } from "next/navigation";
import { getProShopCatalogRoute } from "@/config/pro-shop";

export default function LegacyProShopCatalogPage() {
  redirect(getProShopCatalogRoute("rawlings-easton"));
}
