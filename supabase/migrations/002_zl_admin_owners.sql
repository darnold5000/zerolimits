-- Grant Zero Limits admin access to initial owners (must exist in auth.users).

begin;

insert into public.zl_admin_users (user_id, role, active)
values
  ('9e8b0da7-5f59-48c9-b3cf-f2506e2bb89c'::uuid, 'admin', true),
  ('fd8e30f5-173f-4c95-983d-950ce1b2af6a'::uuid, 'admin', true)
on conflict (user_id) do update
  set role = excluded.role,
      active = excluded.active,
      updated_at = now();

commit;
