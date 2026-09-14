import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = supabase ? await supabase.auth.getUser() : { data: { user: null } };

  const showNav = Boolean(user);

  async function signOut() {
    "use server";
    const client = await createSupabaseServerClient();
    if (client) await client.auth.signOut();
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-zinc-100">
      {showNav ? (
        <header className="border-b border-zinc-800 bg-zinc-950 text-white">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
            <div className="flex flex-wrap gap-4 text-sm font-medium">
              <Link href="/admin/pro-shop" className="hover:text-red-400">
                Pro Shop
              </Link>
              <Link href="/" className="text-zinc-400 hover:text-white">
                View site
              </Link>
            </div>
            <form action={signOut}>
              <button type="submit" className="text-sm text-zinc-300 hover:text-white">
                Sign out
              </button>
            </form>
          </div>
        </header>
      ) : null}
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">{children}</div>
    </div>
  );
}
