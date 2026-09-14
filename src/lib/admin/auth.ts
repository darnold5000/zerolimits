import { redirect } from "next/navigation";
import { TABLES } from "@/lib/supabase/client";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function requireAdmin() {
  const supabase = await createSupabaseServerClient();
  if (!supabase) redirect("/admin/login?error=config");

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login");

  const { data: admin } = await supabase
    .from(TABLES.adminUsers)
    .select("id, role, active")
    .eq("user_id", user.id)
    .eq("active", true)
    .maybeSingle();

  if (!admin) redirect("/admin/login?error=unauthorized");

  return { supabase, user, admin };
}
