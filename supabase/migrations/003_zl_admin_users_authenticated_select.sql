-- Allow signed-in staff to read their own admin row (requireAdmin + login redirect).

begin;

grant select on public.zl_admin_users to authenticated;

commit;
