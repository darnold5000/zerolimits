-- Migration 001: Zero Limits admin users, Pro Shop content, and storage.

begin;

create table if not exists public.zl_admin_users (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users (id) on delete cascade,
  role text not null default 'admin' check (role in ('admin')),
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.pro_shop_vendors (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  title text not null default '',
  description text not null default '',
  image_url text,
  shop_url text,
  discount_code text,
  fulfillment_note text,
  catalog_url text,
  enabled boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists pro_shop_vendors_sort_idx
  on public.pro_shop_vendors (sort_order asc, created_at asc);

create table if not exists public.pro_shop_products (
  id uuid primary key default gen_random_uuid(),
  vendor_id uuid references public.pro_shop_vendors (id) on delete set null,
  name text not null,
  brand text not null default '',
  description text not null default '',
  image_url text,
  destination_url text,
  badge text,
  enabled boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists pro_shop_products_sort_idx
  on public.pro_shop_products (sort_order asc, created_at asc);

create index if not exists pro_shop_products_vendor_idx
  on public.pro_shop_products (vendor_id);

create or replace function public.zl_set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger zl_admin_users_updated_at
  before update on public.zl_admin_users
  for each row execute function public.zl_set_updated_at();

create trigger pro_shop_vendors_updated_at
  before update on public.pro_shop_vendors
  for each row execute function public.zl_set_updated_at();

create trigger pro_shop_products_updated_at
  before update on public.pro_shop_products
  for each row execute function public.zl_set_updated_at();

create or replace function public.zl_is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.zl_admin_users a
    where a.user_id = auth.uid()
      and a.active = true
  );
$$;

alter table public.zl_admin_users enable row level security;
alter table public.pro_shop_vendors enable row level security;
alter table public.pro_shop_products enable row level security;

create policy zl_admin_users_self_read on public.zl_admin_users
  for select using (public.zl_is_admin() or user_id = auth.uid());

create policy zl_admin_users_admin_write on public.zl_admin_users
  for all using (public.zl_is_admin()) with check (public.zl_is_admin());

create policy pro_shop_vendors_public_read on public.pro_shop_vendors
  for select using (enabled = true);

create policy pro_shop_vendors_admin_all on public.pro_shop_vendors
  for all using (public.zl_is_admin()) with check (public.zl_is_admin());

create policy pro_shop_products_public_read on public.pro_shop_products
  for select using (enabled = true and coalesce(trim(destination_url), '') <> '');

create policy pro_shop_products_admin_all on public.pro_shop_products
  for all using (public.zl_is_admin()) with check (public.zl_is_admin());

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'zl-pro-shop',
  'zl-pro-shop',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
on conflict (id) do nothing;

create policy zl_pro_shop_storage_public_read
  on storage.objects for select
  using (bucket_id = 'zl-pro-shop');

create policy zl_pro_shop_storage_admin_write
  on storage.objects for all
  using (bucket_id = 'zl-pro-shop' and public.zl_is_admin())
  with check (bucket_id = 'zl-pro-shop' and public.zl_is_admin());

insert into public.pro_shop_vendors (
  slug,
  name,
  title,
  description,
  image_url,
  shop_url,
  catalog_url,
  discount_code,
  fulfillment_note,
  enabled,
  sort_order
)
values
  (
    'rawlings-easton',
    'Rawlings + Easton',
    'Spring 2027 Collection',
    'Browse the latest Rawlings and Easton baseball gear available through Zero Limits Baseball.',
    '/images/catalog/easton-chili-peppers.jpg',
    null,
    'https://publuu.com/flip-book/873704/2439687/page/76',
    null,
    'Call or text (765) 341-9070 for pricing and orders.',
    true,
    1
  ),
  (
    'baseline-sports',
    'Baseline Sports',
    'Baseline Sports',
    'Shop baseball gear through Zero Limits Baseball.',
    null,
    null,
    null,
    null,
    'Purchases are fulfilled by Baseline Sports.',
    false,
    2
  )
on conflict (slug) do nothing;

grant usage on schema public to anon, authenticated, service_role;
grant select on public.pro_shop_vendors, public.pro_shop_products to anon, authenticated;
grant all on public.pro_shop_vendors, public.pro_shop_products, public.zl_admin_users to service_role;

commit;
