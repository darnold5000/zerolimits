#!/usr/bin/env node
/**
 * Grant Zero Limits admin access to existing Supabase Auth user(s).
 *
 * Usage (email):
 *   STAFF_EMAIL=derek@example.com npm run db:staff
 *
 * Usage (auth user id — one or comma-separated):
 *   STAFF_USER_ID=9e8b0da7-5f59-48c9-b3cf-f2506e2bb89c npm run db:staff
 *   STAFF_USER_ID=uuid1,uuid2 npm run db:staff
 *
 * Requires NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in the environment
 * (e.g. from .env.local — export them before running, or use dotenv in your shell).
 */

import { createClient } from "@supabase/supabase-js";

const email = process.env.STAFF_EMAIL?.trim().toLowerCase();
const userIdsRaw = process.env.STAFF_USER_ID?.trim();
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!email && !userIdsRaw) {
  console.error("Set STAFF_EMAIL or STAFF_USER_ID (comma-separated UUIDs).");
  process.exit(1);
}

if (!url || !serviceKey) {
  console.error("Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}

const supabase = createClient(url, serviceKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

async function grantAdmin(userId, label) {
  const { error: upsertError } = await supabase.from("zl_admin_users").upsert(
    {
      user_id: userId,
      role: "admin",
      active: true,
    },
    { onConflict: "user_id" },
  );

  if (upsertError) {
    console.error(`${label}: ${upsertError.message}`);
    process.exit(1);
  }

  console.log(`Admin access granted for ${label} (${userId}).`);
}

if (userIdsRaw) {
  const ids = userIdsRaw
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);

  for (const id of ids) {
    if (!/^[0-9a-f-]{36}$/i.test(id)) {
      console.error(`Invalid STAFF_USER_ID: ${id}`);
      process.exit(1);
    }
    await grantAdmin(id, id);
  }
  process.exit(0);
}

const { data: list, error: listError } = await supabase.auth.admin.listUsers({
  page: 1,
  perPage: 1000,
});

if (listError) {
  console.error(listError.message);
  process.exit(1);
}

const user = list.users.find((u) => u.email?.toLowerCase() === email);

if (!user) {
  console.error(`No auth user found for ${email}. Create the user in Supabase Auth first.`);
  process.exit(1);
}

await grantAdmin(user.id, email);
