import Link from "next/link";
import { redirect } from "next/navigation";
import AdminLoginForm from "@/components/admin/AdminLoginForm";
import { TABLES } from "@/lib/supabase/client";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return (
      <div className="mx-auto max-w-md py-16 text-center">
        <h1 className="font-display text-3xl font-bold">Staff Login</h1>
        <p className="mt-4 text-sm text-zinc-600">
          Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and
          NEXT_PUBLIC_SUPABASE_ANON_KEY to the environment.
        </p>
        <Link href="/" className="mt-6 inline-block text-sm text-red-600 hover:text-red-500">
          Back to site
        </Link>
      </div>
    );
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const { data: admin } = await supabase
      .from(TABLES.adminUsers)
      .select("id")
      .eq("user_id", user.id)
      .eq("active", true)
      .maybeSingle();
    if (admin) redirect("/admin/pro-shop");
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-16">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-600">
        Zero Limits Admin
      </p>
      <h1 className="mt-2 font-display text-4xl font-bold">Staff Login</h1>
      <p className="mt-3 text-sm text-zinc-600">Sign in to manage the Pro Shop.</p>
      {params.error === "unauthorized" ? (
        <p className="mt-4 rounded-md bg-red-50 px-4 py-3 text-sm text-red-700">
          This account does not have admin access.
        </p>
      ) : null}
      {params.error === "config" ? (
        <p className="mt-4 rounded-md bg-amber-50 px-4 py-3 text-sm text-amber-900">
          Admin backend is not configured.
        </p>
      ) : null}
      <AdminLoginForm />
      <Link href="/" className="mt-6 text-center text-sm text-zinc-500 hover:text-zinc-800">
        Back to site
      </Link>
    </div>
  );
}
